# SEO 優化檢查清單

## ✅ 已完成項目

### 基礎 SEO
- [x] 設定 HTML lang 屬性（zh-TW）
- [x] 包含完整的 meta tags
  - [x] title
  - [x] description
  - [x] keywords
  - [x] author
  - [x] robots
- [x] Canonical URL
- [x] Theme color

### Open Graph（Facebook/LinkedIn）
- [x] og:type
- [x] og:url
- [x] og:title
- [x] og:description
- [x] og:image
- [x] og:image:width
- [x] og:image:height

### Twitter Card
- [x] twitter:card
- [x] twitter:url
- [x] twitter:title
- [x] twitter:description
- [x] twitter:image

### 結構化資料（Schema.org）
- [x] JSON-LD 格式
- [x] MusicGroup schema
- [x] 包含社群媒體連結
- [x] 包含網站 URL

### 檔案與工具
- [x] robots.txt
- [x] sitemap.xml
- [x] .gitignore
- [x] Favicon 設定（需補充實際圖檔）

### 效能優化
- [x] Preconnect 外部資源
- [x] 字體優化載入
- [x] CSS/JS 在適當位置載入

## 📝 需要手動完成的項目

### 1. 更新 Meta 資訊
在 `index.html` 中替換以下內容：

```html
<!-- 第 8 行：標題 -->
<title>你的藝名 | 獨立音樂人 - Indie Artist & Singer-Songwriter</title>

<!-- 第 10 行：描述（影響搜尋結果摘要）-->
<meta name="description" content="替換成你的個人介紹，約 150-160 字元">

<!-- 第 11 行：關鍵字 -->
<meta name="keywords" content="你的藝名, 獨立音樂, indie music, 相關關鍵字">
```

### 2. 更新 Open Graph 圖片
- 建立 1200x630px 的社群分享圖片
- 命名為 `og-image.jpg`
- 放在 `images/` 資料夾
- 圖片應包含：
  - 你的藝名
  - 簡短標語
  - 代表性照片或設計

### 3. 更新所有 URL
將所有檔案中的 `yourusername.github.io/artist-website` 替換成你的實際網址：
- `index.html`
- `sitemap.xml`
- `.github/README.md`

### 4. 建立 Favicon
使用以下工具生成：
- [Favicon Generator](https://realfavicongenerator.net/)
- 上傳你的 logo 或照片
- 下載生成的檔案，放在根目錄

需要的檔案：
- `favicon-32x32.png`
- `favicon-16x16.png`
- `apple-touch-icon.png`

### 5. 更新結構化資料
在 `index.html` 的 JSON-LD 區塊（第 62-80 行）：

```json
{
    "name": "你的藝名",
    "url": "你的網站網址",
    "sameAs": [
        "你的實際社群媒體連結",
        "Spotify artist 頁面",
        "Apple Music artist 頁面",
        ...
    ]
}
```

## 🔍 SEO 測試工具

部署後，使用以下工具檢查：

### Google 工具
1. **[Google Search Console](https://search.google.com/search-console)**
   - 提交 sitemap.xml
   - 檢查索引狀態
   - 查看搜尋表現

2. **[Rich Results Test](https://search.google.com/test/rich-results)**
   - 測試結構化資料是否正確

3. **[PageSpeed Insights](https://pagespeed.web.dev/)**
   - 測試載入速度
   - 獲得優化建議

### 社群媒體預覽
1. **[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)**
   - 測試 Open Graph tags
   - 重新抓取分享快取

2. **[Twitter Card Validator](https://cards-dev.twitter.com/validator)**
   - 測試 Twitter Card 顯示

3. **[LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)**
   - 測試 LinkedIn 分享預覽

### 其他工具
- **[SEO Site Checkup](https://seositecheckup.com/)**
- **[SEMrush Site Audit](https://www.semrush.com/siteaudit/)**
- **[Ahrefs Webmaster Tools](https://ahrefs.com/webmaster-tools)**

## 📊 SEO 最佳實踐

### 內容優化
- ✅ 每個頁面有唯一的 title 和 description
- ✅ 使用語意化 HTML 標籤（section, article, header）
- ✅ 圖片有 alt 屬性
- ⚠️ 建議：定期更新內容（新歌發布、演出資訊等）

### 技術 SEO
- ✅ 響應式設計（Mobile-friendly）
- ✅ HTTPS（GitHub Pages 自動提供）
- ✅ 快速載入速度
- ✅ 結構化資料
- ✅ Sitemap 和 robots.txt

### 連結建設
- 📌 在所有社群媒體簡介加入網站連結
- 📌 在音樂平台個人檔案加入網站連結
- 📌 與其他音樂人交換連結
- 📌 投稿音樂部落格時附上網站連結

## 🎯 關鍵字策略

### 主要關鍵字（建議）
- 你的藝名
- 你的藝名 + 獨立音樂
- 你的藝名 + singer-songwriter
- 你的藝名 + indie artist

### 次要關鍵字
- 台灣獨立音樂
- 獨立創作歌手
- indie music taiwan
- [你的音樂風格] + 台灣
- [你的城市] + 獨立音樂

### 長尾關鍵字
- 在描述和內容中自然地加入這些詞彙
- 例：「療癒系獨立音樂」、「城市民謠創作」

## 📈 追蹤設定

### Google Analytics 4
1. 建立 [Google Analytics](https://analytics.google.com/) 帳號
2. 取得測量 ID（G-XXXXXXXXXX）
3. 在 `index.html` 的 `</head>` 前加入：

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

### 追蹤目標
- 頁面瀏覽量
- 音樂平台點擊次數
- 社群媒體連結點擊
- Contact 按鈕點擊

## ⚠️ 常見 SEO 錯誤（已避免）

- ❌ 缺少 meta description
- ❌ 重複的 title tags
- ❌ 圖片沒有 alt 屬性
- ❌ 行動裝置不友善
- ❌ 載入速度過慢
- ❌ 沒有 HTTPS
- ❌ 缺少結構化資料

## 📅 SEO 維護計畫

### 每週
- [ ] 檢查 Google Search Console 錯誤
- [ ] 查看流量報表

### 每月
- [ ] 更新內容（新作品、演出資訊）
- [ ] 檢查反向連結
- [ ] 分析關鍵字表現

### 每季
- [ ] 全面 SEO 審查
- [ ] 更新 meta 資訊
- [ ] 優化載入速度

---

完成這份檢查清單後，你的網站將具備良好的 SEO 基礎！🚀
