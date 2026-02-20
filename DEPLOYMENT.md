# GitHub Pages 部署指南

## 方式一：直接部署（推薦新手）

### 步驟 1：建立 GitHub Repository

1. 登入 [GitHub](https://github.com)
2. 點擊右上角的 `+` → `New repository`
3. Repository 名稱：
   - 如果要用自己的網域：`artist-website` 或任何名稱
   - 如果要用 `username.github.io` 網域：必須命名為 `username.github.io`（把 username 換成你的 GitHub 使用者名稱）
4. 設定為 `Public`
5. **不要**勾選 "Add a README file"
6. 點擊 `Create repository`

### 步驟 2：上傳檔案

#### 選項 A：使用 GitHub 網頁介面（最簡單，不需安裝 Git）

1. **打開你的專案資料夾**  
   在電腦上找到 `artist-website` 資料夾並打開。

2. **進入剛建立的 GitHub repository 頁面**  
   在瀏覽器打開你的 repo，例如：`https://github.com/你的帳號/artist-website`  
   此時頁面會顯示「Quick setup」或「…or push an existing repository from the command line」。

3. **點擊「uploading an existing file」**  
   在頁面中央有一段文字：「…or upload an existing file」，點擊其中的 **uploading an existing file** 連結。

4. **上傳檔案（二選一）**  
   - **拖曳上傳**：從 `artist-website` 資料夾裡，**選取所有檔案和資料夾**（`index.html`、`css`、`js`、`images`、各 `.md` 檔案、`robots.txt`、`sitemap.xml` 等），一起拖到瀏覽器中的上傳區。  
     ⚠️ 要拖「資料夾裡的內容」，不要只拖整個 `artist-website` 資料夾，否則網站會變成 `/artist-website/index.html` 路徑錯誤。
   - **或點擊「choose your files」**：一次選取多個檔案（可按住 Ctrl/Cmd 多選），選完後再點一次「choose your files」選 `css`、`js`、`images` 裡的檔案。  
     💡 建議：先上傳根目錄的檔案，再點「add file」→「upload files」上傳下一批；或直接用拖曳比較快。

5. **確認結構**  
   上傳完成後，repository 根目錄應該要有：`index.html`、`css/`、`js/`、`images/`、`README.md`、`robots.txt`、`sitemap.xml` 等。  
   點進 `css` 應看到 `style.css`，點進 `js` 應看到 `main.js`。

6. **提交變更**  
   在頁面下方「Commit changes」區塊：  
   - 第一欄輸入：`Initial commit`（或任意說明）  
   - 點擊綠色按鈕 **Commit changes**。

**若要上傳 `images` 裡的圖片**：之後可再點「Add file」→「Upload files」，選取 `images` 資料夾內的圖片上傳；若 `images` 是空的，可略過，等有圖片再傳。

#### 選項 B：使用 Git 指令（推薦，之後更新較方便）

1. **開啟終端機**  
   - Windows：在 `artist-website` 資料夾內按右鍵 → 「在終端機中開啟」或「Open in Terminal」。  
   - Mac：在 Finder 打開 `artist-website`，按右鍵 → 「服務」→「新增位於資料夾的終端機視窗」；或用 Terminal 執行 `cd` 到該資料夾。

2. **依序執行以下指令**（把 `username` 和 `repo-name` 換成你的 GitHub 帳號與 repo 名稱）：

```bash
# 初始化 Git
git init

# 加入所有檔案
git add .

# 建立第一個 commit
git commit -m "Initial commit: Artist website"

# 設定遠端 repository（替換成你的 repo 網址）
git remote add origin https://github.com/username/repo-name.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

3. **若出現登入視窗**：依畫面指示用瀏覽器或 Personal Access Token 登入 GitHub，再回到終端機重新執行 `git push`。

### 步驟 3：啟用 GitHub Pages

1. 進入 repository 頁面
2. 點擊 `Settings`（設定）
3. 在左側選單找到 `Pages`
4. 在 `Source` 區域：
   - Branch: 選擇 `main`
   - Folder: 選擇 `/ (root)`
5. 點擊 `Save`
6. 等待 1-2 分鐘，頁面會顯示網站網址

### 步驟 4：修改網址

在專案的以下檔案中，將 `yourusername.github.io/artist-website` 替換成你的實際網址：

- `index.html` (Open Graph、Twitter Card、Structured Data)
- `sitemap.xml`
- `README.md`

### 步驟 5：更新檔案

修改完後重新推送：

```bash
git add .
git commit -m "Update URLs"
git push
```

## 方式二：使用自訂網域

如果你有自己的網域名稱（例如 `vere-music.com`）：

### 步驟 1：在 GitHub Pages 設定自訂網域

1. Settings → Pages → Custom domain
2. 輸入你的網域名稱
3. 勾選 `Enforce HTTPS`

### 步驟 2：設定 DNS

在你的網域服務商（如 GoDaddy、Namecheap）設定 DNS：

**如果使用子網域（如 www.vere-music.com）：**
```
Type: CNAME
Name: www
Value: username.github.io
```

**如果使用根網域（如 vere-music.com）：**
```
Type: A
Name: @
Value: 
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
```

## 更新網站內容

每次修改檔案後：

```bash
git add .
git commit -m "描述你的修改"
git push
```

GitHub Pages 會自動重新部署，通常需要 1-5 分鐘。

## 檢查部署狀態

1. Repository → Actions
2. 查看最新的 workflow 是否成功
3. 綠色勾勾 ✓ = 部署成功
4. 紅色叉叉 ✗ = 有錯誤，點進去查看詳情

## 常見問題

### Q: 網站顯示 404 Not Found
A: 
- 確認 GitHub Pages 已啟用
- 確認 Branch 設定正確（main）
- 確認 `index.html` 在根目錄
- 等待 5-10 分鐘讓部署完成

### Q: 圖片或 CSS 沒有載入
A: 
- 檢查檔案路徑是否正確
- 確認所有檔案都已上傳
- 清除瀏覽器快取（Ctrl+Shift+R 或 Cmd+Shift+R）

### Q: 如何更新內容？
A:
- 修改本地檔案
- `git add .` → `git commit -m "..."` → `git push`
- 或直接在 GitHub 網頁上編輯檔案

### Q: 可以用 HTTPS 嗎？
A: 
- GitHub Pages 自動提供免費 HTTPS
- 在 Settings → Pages 勾選 `Enforce HTTPS`

## 進階設定（選用）

### 自動部署（已內建）
GitHub Pages 會在你推送到 main branch 時自動部署。

### 加入 Google Analytics

在 `index.html` 的 `</head>` 前加入：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 效能監控

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [GTmetrix](https://gtmetrix.com/)
- [WebPageTest](https://www.webpagetest.org/)

## 相關資源

- [GitHub Pages 官方文件](https://docs.github.com/pages)
- [自訂網域設定](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [Git 基礎教學](https://git-scm.com/book/zh-tw/v2)

---

部署成功後，記得更新社群媒體連結，分享你的網站！🎉
