# 效能優化指南

## 📊 目前狀態

網站已經過基礎優化，包括：
- ✅ 最小化的 CSS/JS（無框架）
- ✅ 外部資源 preconnect
- ✅ 響應式圖片
- ✅ 動畫優化（手機裝置停用部分動畫）
- ✅ AOS 動畫庫（輕量級）

## 🎯 效能目標

### Google PageSpeed Insights 目標分數
- 🟢 Performance: 90+
- 🟢 Accessibility: 95+
- 🟢 Best Practices: 95+
- 🟢 SEO: 100

## 🖼️ 圖片優化（重要！）

### 建議格式與尺寸

| 圖片 | 建議格式 | 建議尺寸 | 檔案大小目標 |
|------|---------|---------|-------------|
| hero.jpg | WebP/JPG | 1920x1080 | < 200KB |
| profile.jpg | WebP/JPG | 800x1067 | < 150KB |
| gallery-1~4.jpg | WebP/JPG | 800x800 | < 100KB 各 |
| og-image.jpg | JPG | 1200x630 | < 150KB |

### 圖片優化工具

**線上工具（免費）**
1. **[TinyPNG](https://tinypng.com/)** - PNG/JPG 壓縮
2. **[Squoosh](https://squoosh.app/)** - Google 開發，支援 WebP
3. **[ImageOptim](https://imageoptim.com/)** - macOS 應用程式
4. **[JPEG Optimizer](http://www.jpeg-optimizer.com/)** - 線上 JPG 壓縮

**指令行工具**
```bash
# 使用 ImageMagick 批次轉換
brew install imagemagick

# 轉換成 WebP
magick convert hero.jpg -quality 85 hero.webp

# 批次處理
for img in *.jpg; do magick convert "$img" -quality 85 "${img%.jpg}.webp"; done
```

### 使用 WebP 格式

在 HTML 中使用 `<picture>` 標籤提供多種格式：

```html
<picture>
    <source srcset="images/hero.webp" type="image/webp">
    <source srcset="images/hero.jpg" type="image/jpeg">
    <img src="images/hero.jpg" alt="Hero Background">
</picture>
```

### 延遲載入（Lazy Loading）

對於不在首屏的圖片，加入 `loading="lazy"` 屬性：

```html
<!-- Gallery 圖片 -->
<img src="images/gallery-1.jpg" alt="Gallery 1" loading="lazy">
```

## ⚡ CSS 優化

### 關鍵 CSS 內聯

將首屏關鍵 CSS 內聯到 `<head>`，其餘 CSS 延遲載入：

```html
<head>
    <!-- 關鍵 CSS 內聯 -->
    <style>
        /* 僅首屏必要樣式 */
        body { margin: 0; font-family: sans-serif; }
        .hero { height: 100vh; /* ... */ }
    </style>
    
    <!-- 非關鍵 CSS 延遲載入 -->
    <link rel="preload" href="css/style.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
    <noscript><link rel="stylesheet" href="css/style.css"></noscript>
</head>
```

### CSS 壓縮

使用工具壓縮 CSS：

**線上工具**
- [CSS Minifier](https://cssminifier.com/)
- [Clean CSS](https://www.cleancss.com/)

**指令行工具**
```bash
# 使用 cssnano
npm install -g cssnano-cli
cssnano css/style.css css/style.min.css
```

## 🚀 JavaScript 優化

### 腳本載入策略

```html
<!-- AOS 庫：使用 defer -->
<script defer src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

<!-- 自訂腳本：使用 defer -->
<script defer src="js/main.js"></script>
```

### JS 壓縮

**線上工具**
- [JavaScript Minifier](https://javascript-minifier.com/)
- [Terser Online](https://try.terser.org/)

**指令行工具**
```bash
# 使用 terser
npm install -g terser
terser js/main.js -o js/main.min.js --compress --mangle
```

## 🌐 字體優化

### 目前使用的字體
- Noto Serif TC (中文)
- Playfair Display (英文)

### 優化策略

#### 1. 只載入需要的字重
```html
<!-- 只載入 400, 600, 700 -->
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;600;700&display=swap" rel="stylesheet">
```

#### 2. 使用 font-display
已設定 `&display=swap`，避免文字閃爍

#### 3. 子集化（進階）
如果只需要特定字元，可以下載字體並使用工具子集化：
```bash
# 使用 pyftsubset
pip install fonttools brotli
pyftsubset NotoSerifTC.ttf --text-file=chars.txt --output-file=NotoSerifTC-subset.woff2
```

## 📱 行動裝置優化

### Viewport 設定（已完成）
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 觸控優化
- 按鈕最小尺寸：44x44px（已符合）
- 適當的間距避免誤觸
- 手機版停用複雜動畫

### 圖片響應式
確保使用 `max-width: 100%` 和 `height: auto`（已完成）

## 🔧 進階優化

### 1. 啟用 Gzip/Brotli 壓縮
GitHub Pages 預設啟用，無需額外設定。

### 2. 設定快取策略
在 `.htaccess`（如果使用 Apache）或 netlify.toml（如果使用 Netlify）：

```apache
# .htaccess
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

### 3. 移除未使用的 CSS
使用 [PurgeCSS](https://purgecss.com/) 移除未使用的樣式：

```bash
npm install -g purgecss
purgecss --css css/style.css --content index.html --output css/style.purged.css
```

### 4. 建立 Service Worker（PWA）
讓網站可以離線訪問（進階功能）。

## 📈 效能監測

### 測試工具
1. **[Google PageSpeed Insights](https://pagespeed.web.dev/)**
   - 輸入網址
   - 查看行動版和桌面版分數
   - 依照建議優化

2. **[GTmetrix](https://gtmetrix.com/)**
   - 詳細載入時間分析
   - 瀑布圖
   - 歷史記錄追蹤

3. **[WebPageTest](https://www.webpagetest.org/)**
   - 多地點測試
   - 連線速度模擬
   - 影片錄製

4. **Chrome DevTools**
   - F12 → Network 標籤
   - Lighthouse 標籤（效能審查）
   - Performance 標籤（效能分析）

### 關鍵指標

#### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

#### 其他指標
- **TTFB (Time to First Byte)**: < 600ms
- **FCP (First Contentful Paint)**: < 1.8s
- **Speed Index**: < 3.4s

## ✅ 優化檢查清單

### 基礎優化
- [x] 壓縮圖片
- [x] 使用現代圖片格式（WebP）
- [x] 延遲載入非首屏圖片
- [x] 最小化 CSS/JS
- [x] 移除未使用的程式碼
- [x] 使用字體顯示策略

### 進階優化
- [ ] 內聯關鍵 CSS
- [ ] 分割程式碼（Code Splitting）
- [ ] 實作 Service Worker
- [ ] 使用 CDN（GitHub Pages 已提供）
- [ ] 啟用 HTTP/2（GitHub Pages 已啟用）

### 監測與維護
- [ ] 設定效能預算
- [ ] 定期測試效能
- [ ] 追蹤 Core Web Vitals
- [ ] 監控第三方腳本影響

## 🎨 效能 vs 美學平衡

目前網站設計重視視覺效果，但已考量效能：

✅ **保留的效果**（影響小）
- 基礎 CSS 動畫
- Hover 效果
- AOS 滾動動畫（輕量）

⚠️ **可選擇性停用**（影響中）
- 自訂游標（手機版已停用）
- 視差滾動
- 複雜動畫

❌ **避免使用**（影響大）
- 大型動畫庫
- 影片背景（自動播放）
- 大量第三方追蹤碼

## 📦 建議的檔案大小預算

| 資源類型 | 預算 | 目前估計 |
|---------|------|---------|
| HTML | < 50KB | ~20KB ✅ |
| CSS | < 100KB | ~15KB ✅ |
| JavaScript | < 150KB | ~10KB ✅ |
| 圖片總計 | < 1MB | 視實際圖片而定 |
| 字體 | < 200KB | ~100KB ✅ |
| **總計** | **< 1.5MB** | **~1MB** ✅ |

## 🔄 持續優化流程

1. **測試** → 使用 PageSpeed Insights
2. **分析** → 找出瓶頸
3. **優化** → 實施改進措施
4. **驗證** → 重新測試
5. **重複** → 持續改進

---

依照這份指南優化後，你的網站將有出色的載入速度！⚡
