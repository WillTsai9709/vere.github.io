import anthropic
import os
import re
import urllib.request
import json

# #region agent log
def _dbg(payload):
    log_dir = os.path.join(os.path.dirname(__file__), ".cursor")
    os.makedirs(log_dir, exist_ok=True)
    entry = {"timestamp": __import__("time").time(), "location": "import anthropic.py", **payload}
    with open(os.path.join(log_dir, "debug.log"), "a") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")
# #endregion

# 確認 anthropic 已安裝
print(f"[環境] anthropic 版本: {anthropic.__version__}")

# 若未設定環境變數，嘗試從 set_minimax_env.sh 讀取（避免忘記 source）
def _load_env_from_sh():
    sh_path = os.path.join(os.path.dirname(__file__), "set_minimax_env.sh")
    if not os.path.isfile(sh_path):
        return
    with open(sh_path, "r") as f:
        for line in f:
            m = re.match(r'export\s+(\w+)="([^"]*)"', line) or re.match(r"export\s+(\w+)=([^\s#]+)", line)
            if m:
                # 一律以 set_minimax_env.sh 為準，覆寫既有環境變數（避免 shell 裡舊的 .com 蓋過檔案的 .io）
                os.environ[m.group(1)] = m.group(2).strip()

_load_env_from_sh()

api_key = os.environ.get("ANTHROPIC_API_KEY", "")
# #region agent log
_dbg({"hypothesisId": "H1", "message": "api_key after load", "data": {"key_len": len(api_key), "key_prefix": api_key[:8] if len(api_key) >= 8 else api_key, "key_suffix": api_key[-4:] if len(api_key) >= 4 else ""}})
# #endregion
if not api_key:
    print("錯誤：未設定 ANTHROPIC_API_KEY。請先執行： source set_minimax_env.sh")
    exit(1)

# 避免其他環境變數蓋過 MiniMax 設定（Anthropic SDK 不讀 OPENAI_*，但清除可避免其他庫/代理干擾）
cleared = [n for n in ("ANTHROPIC_AUTH_TOKEN", "OPENAI_API_KEY", "OPENAI_BASE_URL", "OPENAI_AUTH_TOKEN") if n in os.environ]
for name in cleared:
    del os.environ[name]
# #region agent log
_dbg({"hypothesisId": "H2", "message": "env cleared", "data": {"cleared": cleared}})
# #endregion

# 先用 MiniMax 原生 API 驗證 Key 是否有效（Bearer 認證）
def _check_key_native(api_key: str, use_com: bool = False) -> tuple[bool, str]:
    host = "api.minimaxi.com" if use_com else "api.minimax.io"
    url = f"https://{host}/v1/text/chatcompletion_v2"
    req = urllib.request.Request(
        url,
        data=json.dumps({
            "model": "M2-her",
            "messages": [{"role": "user", "content": "hi"}],
        }).encode(),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as r:
            return True, ""
    except urllib.error.HTTPError as e:
        body = e.read().decode() if e.fp else ""
        return False, f"HTTP {e.code}: {body[:200]}"
    except Exception as e:
        return False, str(e)

# 使用 .io 端點（你指定用 io）
base_url = os.environ.get("ANTHROPIC_BASE_URL", "https://api.minimax.io/anthropic")
use_com = "minimaxi.com" in base_url
# #region agent log
_dbg({"hypothesisId": "H5", "message": "before native check", "data": {"base_url": base_url, "use_com": use_com, "native_host": "api.minimaxi.com" if use_com else "api.minimax.io"}})
# #endregion
print(f"[環境] MiniMax 端點: {base_url}")
ok, err = _check_key_native(api_key, use_com=use_com)
# #region agent log
_dbg({"hypothesisId": "H1", "message": "native check result", "data": {"ok": ok, "err_preview": err[:150] if err else ""}})
# #endregion
if not ok:
    other_base = "https://api.minimaxi.com/anthropic" if "minimaxi.com" not in base_url else "https://api.minimax.io/anthropic"
    print("MiniMax API Key 驗證失敗（原生 API 也無法通過）：")
    print(" ", err)
    print("\n請檢查：")
    print("  1. Key 是否在 https://platform.minimax.io 或 https://platform.minimaxi.com 的「接口密鑰」創建")
    print("  2. 若在中國站申請，請在 set_minimax_env.sh 改為 ANTHROPIC_BASE_URL=https://api.minimaxi.com/anthropic")
    print("  3. 帳戶是否有餘額；必要時重新創建一組 Key 並更新 set_minimax_env.sh")
    exit(1)

# #region agent log
_dbg({"hypothesisId": "H2", "message": "Anthropic client args", "data": {"base_url": base_url, "api_key_len": len(api_key), "use_auth_token": True}})
# #endregion
# 使用 auth_token 讓 SDK 送 Authorization: Bearer（MiniMax Anthropic 端點與原生 API 同用 Bearer；api_key 會送 X-Api-Key 導致 401）
# 暫時移除 ANTHROPIC_API_KEY 避免 client 同時帶上 X-Api-Key
_saved = os.environ.pop("ANTHROPIC_API_KEY", None)
try:
    client = anthropic.Anthropic(base_url=base_url, auth_token=api_key)
finally:
    if _saved is not None:
        os.environ["ANTHROPIC_API_KEY"] = _saved

# #region agent log
_dbg({"hypothesisId": "H4", "message": "before messages.create"})
# #endregion
try:
    message = client.messages.create(
    model="MiniMax-M2.5",
    max_tokens=1000,
    system="You are a helpful assistant.",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "Hi, how are you?"
                }
            ]
        }
    ]
)
except Exception as e:
    # #region agent log
    _dbg({"hypothesisId": "H4", "message": "messages.create failed", "data": {"type": type(e).__name__, "message": str(e)[:300]}})
    # #endregion
    raise

for block in message.content:
    if block.type == "thinking":
        print(f"Thinking:\n{block.thinking}\n")
    elif block.type == "text":
        print(f"Text:\n{block.text}\n")