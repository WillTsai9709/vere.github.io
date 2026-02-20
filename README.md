# Artist Website 獨立音樂人行銷網頁

一個為獨立音樂人/文青風格設計的單頁式行銷網站模板。

## ✨ 特色

- 🎨 **文青風格設計**：暖色調、襯線字體、留白空間
- ✨ **豐富互動效果**：自訂游標、滾動動畫、hover 效果、視差滾動
- 📱 **響應式設計**：支援桌面、平板、手機
- 🚀 **輕量化**：純 HTML/CSS/JS，無框架依賴
- 📦 **易於部署**：直接上傳 GitHub Pages 即可
- 🔍 **SEO 優化**：完整 meta tags、Open Graph、結構化資料
- ⚡ **效能優化**：快速載入、延遲載入圖片

## 📸 預覽

[點此查看範例網站](#) （部署後替換成實際網址）

## 📁 檔案結構

```
artist-website/
├── index.html              # 主頁面
├── css/
│   └── style.css           # 樣式表
├── js/
│   └── main.js             # 互動效果腳本
├── images/                 # 圖片資料夾
│   ├── hero.jpg            # Hero 背景圖
│   ├── profile.jpg         # 個人照片
│   ├── gallery-1~4.jpg     # 相簿圖片
│   └── og-image.jpg        # 社群分享圖
├── robots.txt              # SEO 爬蟲設定
├── sitemap.xml             # 網站地圖
├── .gitignore              # Git 忽略檔案
├── README.md               # 本檔案
├── DEPLOYMENT.md           # 部署指南
├── SEO_CHECKLIST.md        # SEO 檢查清單
├── PERFORMANCE.md          # 效能優化指南
├── CONTENT_GUIDE.md        # 內容更新指南
└── ANIMATION_UPDATES.md    # 動畫效果文件
```

## 🚀 快速開始

### 1. 準備圖片

將以下圖片放入 `images/` 資料夾：

| 檔案名稱 | 建議尺寸 | 說明 |
|---------|---------|------|
| `hero.jpg` | 1920x1080 或更大 | Hero 區背景圖 |
| `profile.jpg` | 800x1067 (3:4) | About 區個人照 |
| `gallery-1.jpg` ~ `gallery-4.jpg` | 800x800 (1:1) | 相簿圖片 |
| `og-image.jpg` | 1200x630 | 社群分享圖 |

**圖片優化工具**：[TinyPNG](https://tinypng.com/)

### 2. 修改內容

編輯 `index.html`：

- **藝名**：第 57 行
- **標語**：第 60 行
- **關於介紹**：第 80-84 行
- **社群媒體連結**：第 28-47 行（Hero 區）、第 170-185 行（Contact 區）
- **音樂平台連結**：第 95-130 行
- **Email**：第 167 行

詳細說明請參考 [CONTENT_GUIDE.md](CONTENT_GUIDE.md)

### 3. 嵌入 Spotify 播放器（選用）

1. 前往 Spotify 網頁版，找到你的專輯或單曲
2. 點擊「分享」→「嵌入」
3. 複製嵌入碼
4. 替換 `index.html` 中第 133-139 行的 placeholder

### 4. 本地預覽

用瀏覽器直接開啟 `index.html`，或使用本地伺服器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js (需安裝 serve)
npx serve

# 使用 PHP
php -S localhost:8000
```

然後在瀏覽器開啟 `http://localhost:8000`

## 📤 部署到 GitHub Pages

詳細步驟請參考 [DEPLOYMENT.md](DEPLOYMENT.md)

### 簡易步驟：

1. 建立 GitHub repository
2. 上傳所有檔案
3. Settings → Pages → Source 選擇 `main` branch
4. 等待 1-2 分鐘，網站即可上線

**記得更新網址**：將所有檔案中的 `yourusername.github.io/artist-website` 替換成你的實際網址。

## 🎨 自訂樣式

### 修改顏色

編輯 `css/style.css` 開頭的 CSS 變數（第 4-12 行）：

```css
:root {
    --bg-primary: #FAF8F5;      /* 主背景色 */
    --bg-secondary: #F5F2ED;    /* 次要背景色 */
    --text-primary: #2C2416;    /* 主要文字色 */
    --text-secondary: #5C5142;  /* 次要文字色 */
    --accent: #8B7355;          /* 強調色 */
    --accent-light: #C4B49A;    /* 淺強調色 */
}
```

### 深色模式配色建議

```css
:root {
    --bg-primary: #1A1A1A;
    --bg-secondary: #242424;
    --text-primary: #F5F2ED;
    --text-secondary: #A0998C;
    --accent: #C4B49A;
}
```

## 📊 SEO 優化

網站已包含完整的 SEO 優化：

- ✅ Meta tags (title, description, keywords)
- ✅ Open Graph tags (Facebook, LinkedIn)
- ✅ Twitter Card
- ✅ 結構化資料 (JSON-LD)
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URL

**部署後必做**：
1. 更新所有 meta 資訊中的網址
2. 提交 sitemap 到 [Google Search Console](https://search.google.com/search-console)
3. 測試社群分享預覽：[Facebook Debugger](https://developers.facebook.com/tools/debug/)

詳細說明請參考 [SEO_CHECKLIST.md](SEO_CHECKLIST.md)

## ⚡ 效能優化

網站已進行基礎優化：

- ✅ 最小化的 CSS/JS（無框架）
- ✅ 外部資源 preconnect
- ✅ 圖片延遲載入
- ✅ 手機裝置停用複雜動畫
- ✅ 輕量動畫庫（AOS）

**建議進一步優化**：
- 壓縮圖片（< 200KB）
- 使用 WebP 格式
- 內聯關鍵 CSS

詳細說明請參考 [PERFORMANCE.md](PERFORMANCE.md)

## 🎬 動畫效果

網站包含豐富的互動動畫：

- 🎪 頁面載入動畫
- 📊 滾動進度條
- 🎨 視差滾動效果
- ⌨️ 打字機文字效果
- 🎵 音樂圖示脈衝動畫
- 🖼️ 圖片 hover 特效
- 🌊 社群圖示浮動效果

詳細說明請參考 [ANIMATION_UPDATES.md](ANIMATION_UPDATES.md)

## 🛠️ 使用的技術與資源

- **字體**：[Google Fonts](https://fonts.google.com/) - Noto Serif TC、Playfair Display
- **動畫**：[AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)
- **圖示**：內嵌 SVG（Spotify、Apple Music、YouTube、Instagram、Facebook、X、Threads）

## 📝 更新內容

詳細的內容更新指南請參考 [CONTENT_GUIDE.md](CONTENT_GUIDE.md)

### 快速更新清單：

- [ ] 藝名和標語
- [ ] About 介紹文字
- [ ] 所有社群媒體連結
- [ ] 所有音樂平台連結
- [ ] Email
- [ ] 圖片（hero、profile、gallery x4、og-image）
- [ ] Spotify 播放器
- [ ] 網站網址（meta tags、sitemap）

## 🆘 常見問題

### Q: 圖片沒有顯示？
A: 確認檔案名稱完全一致（區分大小寫）、已上傳到 `images/` 資料夾

### Q: 修改後網站沒有更新？
A: 清除瀏覽器快取（Ctrl+Shift+R）、確認 GitHub Actions 部署成功

### Q: 如何移除某個音樂平台？
A: 在 `index.html` 中刪除對應的整個 `<a>...</a>` 區塊

### Q: 如何新增更多 Gallery 圖片？
A: 複製 `<div class="gallery-item">...</div>` 區塊，修改圖片路徑

### Q: 如何改變顏色主題？
A: 修改 `css/style.css` 開頭的 CSS 變數

## 📚 相關文件

- [DEPLOYMENT.md](DEPLOYMENT.md) - GitHub Pages 部署完整指南
- [SEO_CHECKLIST.md](SEO_CHECKLIST.md) - SEO 優化檢查清單
- [PERFORMANCE.md](PERFORMANCE.md) - 效能優化指南
- [CONTENT_GUIDE.md](CONTENT_GUIDE.md) - 內容更新詳細說明
- [ANIMATION_UPDATES.md](ANIMATION_UPDATES.md) - 動畫效果文件

## 🎯 未來可加的功能

- 深色/淺色模式切換
- 多語言切換（中/英）
- 整合 Spotify API 顯示最新曲目
- 聯絡表單（使用 Formspree 或 Netlify Forms）
- 部落格區塊
- 演出行程表

## 📄 授權

此模板可自由使用於個人或商業用途。

## 🙏 致謝

- 字體：Google Fonts
- 動畫庫：AOS by Michał Sajnóg
- 圖示：來自各平台官方

---

**部署成功後，記得分享你的網站！** 🎵✨

有任何問題歡迎提出 Issue 或參考文件。
