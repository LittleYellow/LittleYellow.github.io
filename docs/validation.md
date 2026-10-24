# 驗證紀錄

日期：2026-10-24（Asia/Taipei）
重建分支：feat/astro-shiba-rebuild
原始版本：0af9598
正式網址：https://littleyellow.github.io/

## 本機檢查
- Astro check：0 errors、0 warnings、0 hints。
- Astro production build：8 個 HTML 頁面、RSS、sitemap。
- npm test：站內連結、錨點、metadata、RSS 與分享圖存在性。
- npm install：0 vulnerabilities。
- Playwright：1440、768、390、320 px 各測 8 頁，無水平溢出，所有頁面單一 h1，無破圖。
- 搜尋、分類、分類網址直達、清除搜尋、空狀態均正常。
- 複製文章連結成功，鍵盤第一個 Tab 可到跳至主要內容。
- 瀏覽器沒有 console errors 或 page errors。
- 人工檢視桌面首頁與手機文章；修正中文清單粗體標記。

## 上線方式
分支先建置、保留預覽產物；通過後合併到 main，由 Pages workflow 部署。
部署後再確認正式站 HTML、主要路由與資源回應。
