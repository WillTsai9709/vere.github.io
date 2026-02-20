# 內容更新指南

這份文件說明如何更新網站的各個部分。不需要程式基礎，只要照著步驟操作即可！

## 📝 基本資訊更新

### 1. 藝名和標語

**檔案**：`index.html`

**位置**：第 57-61 行

```html
<h1 class="hero-title">
    你的藝名        ← 在這裡修改
</h1>
<p class="hero-subtitle">
    獨立音樂人 / Singer-Songwriter  ← 修改標語
</p>
```

### 2. About 區介紹文字

**檔案**：`index.html`

**位置**：第 80-84 行

```html
<p class="about-text">
    在這裡寫你的自我介紹。
    可以分成多段，每段之間用空行分隔。
    建議 100-200 字左右。
</p>
```

**撰寫建議**：
- 用第一人稱或第三人稱
- 提及音樂風格或影響
- 分享創作理念
- 保持真誠自然

**範例**：
```
在城市的角落裡，用音樂記錄生活的點滴。
每一首歌都是一段故事，每一個音符都承載著真實的情感。
希望我的音樂能在某個深夜裡，陪伴你度過寂靜的時光。
```

## 🔗 連結更新

### 3. 社群媒體連結（Hero 區）

**檔案**：`index.html`

**位置**：第 28-47 行

```html
<!-- Instagram -->
<a href="https://instagram.com/your_username" ...>

<!-- Facebook -->
<a href="https://facebook.com/your_page" ...>

<!-- X (Twitter) -->
<a href="https://x.com/your_username" ...>

<!-- Threads -->
<a href="https://threads.net/@your_username" ...>
```

**替換方式**：
1. 將 `your_username` 換成你的實際帳號名稱
2. 如果沒有某個平台，可以刪除整個 `<a>...</a>` 區塊

### 4. 音樂平台連結

**檔案**：`index.html`

**位置**：第 95-130 行

```html
<!-- Spotify -->
<a href="#" class="platform-link" ...>
      ↑ 替換成你的 Spotify artist 頁面

<!-- Apple Music -->
<a href="#" class="platform-link" ...>
      ↑ 替換成你的 Apple Music artist 頁面

<!-- YouTube -->
<a href="#" class="platform-link" ...>
      ↑ 替換成你的 YouTube 頻道

<!-- SoundCloud -->
<a href="#" class="platform-link" ...>
      ↑ 替換成你的 SoundCloud 個人檔案
```

**如何找到連結**：
- **Spotify**: 開啟你的 artist 頁面 → 點「分享」→ 複製連結
- **Apple Music**: 同上
- **YouTube**: 頻道頁面的網址
- **SoundCloud**: 個人檔案頁面的網址

### 5. 聯絡方式

**檔案**：`index.html`

**位置**：第 167 行

```html
<a href="mailto:artist@email.com" class="email-link">
                   ↑ 替換成你的 email
    artist@email.com  ← 這裡也要改
</a>
```

**位置**：第 170-185 行（社群媒體圖示）

與 Hero 區相同，更新連結即可。

## 🎵 Spotify 播放器嵌入

**檔案**：`index.html`

**位置**：第 133-139 行

### 步驟：

1. **取得嵌入碼**
   - 前往 [Spotify Web Player](https://open.spotify.com/)
   - 找到你的專輯、單曲或播放清單
   - 點「分享」→「嵌入」
   - 複製 `<iframe>` 程式碼

2. **貼上程式碼**
   ```html
   <div class="spotify-embed" data-aos="fade-up" data-aos-delay="400">
       <!-- 刪除這裡的 placeholder -->
       <!-- 貼上從 Spotify 複製的 iframe -->
       <iframe style="border-radius:12px" 
               src="https://open.spotify.com/embed/..." 
               width="100%" 
               height="352" 
               frameBorder="0" 
               allowfullscreen="" 
               allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
               loading="lazy">
       </iframe>
   </div>
   ```

3. **調整樣式**（選用）
   - 修改 `height` 改變播放器高度
   - 保持 `width="100%"` 以適應不同螢幕

## 🖼️ 圖片更新

### 6. Hero 背景圖

**檔案**：`css/style.css`

**位置**：第 175 行

```css
background-image: linear-gradient(...),
                  url('../images/hero.jpg');
                                    ↑ 修改檔名
```

**圖片要求**：
- 尺寸：至少 1920x1080px
- 格式：JPG 或 WebP
- 檔案大小：< 200KB（使用 [TinyPNG](https://tinypng.com/) 壓縮）
- 內容：模糊或柔焦的照片，避免過於複雜

### 7. About 區照片

**檔案**：`index.html`

**位置**：第 75 行

```html
<img src="images/profile.jpg" alt="Artist Profile" class="profile-img">
                    ↑ 修改檔名                ↑ 修改描述
```

**圖片要求**：
- 尺寸：800x1067px（3:4 比例）
- 格式：JPG 或 WebP
- 檔案大小：< 150KB
- 內容：個人照片，建議直式

### 8. Gallery 圖片

**檔案**：`index.html`

**位置**：第 149-160 行

```html
<img src="images/gallery-1.jpg" alt="Gallery Image 1">
<img src="images/gallery-2.jpg" alt="Gallery Image 2">
<img src="images/gallery-3.jpg" alt="Gallery Image 3">
<img src="images/gallery-4.jpg" alt="Gallery Image 4">
```

**圖片要求**：
- 尺寸：800x800px（1:1 正方形）
- 格式：JPG 或 WebP
- 檔案大小：< 100KB 各
- 內容：演出照片、錄音室、專輯封面等

**新增/刪除圖片**：
- 新增：複製整個 `<div class="gallery-item">...</div>` 區塊
- 刪除：移除整個 `<div class="gallery-item">...</div>` 區塊

## 🎨 顏色主題調整

**檔案**：`css/style.css`

**位置**：第 4-12 行

```css
:root {
    --bg-primary: #FAF8F5;      /* 主背景色（米白） */
    --bg-secondary: #F5F2ED;    /* 次要背景色（淺褐） */
    --text-primary: #2C2416;    /* 主文字色（深褐） */
    --text-secondary: #5C5142;  /* 次要文字色（中褐） */
    --accent: #8B7355;          /* 強調色（暖褐） */
    --accent-light: #C4B49A;    /* 淺強調色（奶油） */
    --white: #FFFFFF;
}
```

**修改方式**：
1. 使用 [Coolors](https://coolors.co/) 或 [Adobe Color](https://color.adobe.com/) 挑選配色
2. 取得 16 進位色碼（例：#FAF8F5）
3. 替換對應的顏色值

**建議配色方向**：
- 保持背景與文字的高對比度（易讀性）
- 強調色用於連結和 hover 效果
- 整體色調統一（全暖色或全冷色）

## 📱 Section 標題修改

**檔案**：`index.html`

找到各 section 的標題，直接修改：

```html
<h2 class="section-title">About Me</h2>      ← 關於我
<h2 class="section-title">聆聽音樂</h2>      ← 音樂
<h2 class="section-title">MEDIA</h2>        ← 影像
<h2 class="section-title">聯絡方式</h2>      ← 聯絡
```

可以改成中文、英文或混用，依個人喜好。

## 🔄 如何上傳更新

### 方法一：GitHub 網頁介面

1. 前往你的 GitHub repository
2. 點擊要修改的檔案（如 `index.html`）
3. 點擊右上角的鉛筆圖示 ✏️
4. 修改內容
5. 往下拉到「Commit changes」
6. 輸入簡短描述（如「Update artist name」）
7. 點擊「Commit changes」
8. 等待 1-2 分鐘，網站會自動更新

### 方法二：本地修改後推送

```bash
# 1. 修改檔案（用任何文字編輯器）

# 2. 在終端機執行
git add .
git commit -m "描述你的修改"
git push

# 3. 等待 1-2 分鐘，網站會自動更新
```

## ✅ 更新檢查清單

部署前確認：

- [ ] 藝名已更新
- [ ] About 介紹已填寫
- [ ] 所有社群媒體連結已更新
- [ ] 所有音樂平台連結已更新
- [ ] Email 已更新
- [ ] Hero 背景圖已上傳
- [ ] Profile 照片已上傳
- [ ] Gallery 圖片已上傳（4 張）
- [ ] Spotify 播放器已嵌入（選用）
- [ ] 測試所有連結是否正常
- [ ] 手機和電腦都預覽過

## 🆘 常見問題

### Q: 修改後網站沒有更新？
A: 
1. 確認 GitHub Pages 部署狀態（Repository → Actions）
2. 清除瀏覽器快取（Ctrl+Shift+R 或 Cmd+Shift+R）
3. 等待 5 分鐘再檢查

### Q: 連結點擊後出現 404？
A: 
- 確認連結格式正確（有 `https://`）
- 確認帳號名稱無誤
- 社群媒體個人檔案必須是公開的

### Q: 圖片沒有顯示？
A: 
- 確認檔案名稱完全一致（區分大小寫）
- 確認圖片已上傳到 `images/` 資料夾
- 確認路徑正確（`images/檔名.jpg`）

### Q: 顏色改了但沒變化？
A: 
- 確認有修改 `css/style.css` 檔案
- 確認色碼格式正確（#XXXXXX）
- 清除瀏覽器快取

### Q: Spotify 播放器太大或太小？
A: 
修改 iframe 的 `height` 屬性：
```html
height="352"  ← 改成你想要的數字（單位：px）
```

## 📚 更多資源

- [HTML 基礎教學](https://www.w3schools.com/html/)
- [CSS 顏色選擇器](https://htmlcolorcodes.com/)
- [圖片壓縮工具](https://tinypng.com/)
- [Markdown 語法](https://www.markdownguide.org/)

---

有任何問題，歡迎參考 README.md 或查看其他文件！🎵
