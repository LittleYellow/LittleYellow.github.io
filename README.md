# 小黃｜黃柴值班中

Astro 靜態品牌知識站。正式網址：https://littleyellow.github.io/

## 本機執行

Node.js 24（至少滿足 Astro 的 Node >=22.23.4 要求）。

```sh
npm ci
npm run dev
npm run check
npm run build
npm test
npm run preview
```

## 發布文章

在 `src/content/posts/` 新增 Markdown。檔名為網址 slug。
Frontmatter 必填 title、description、date、category、tags、minutes、order。
category 可為「企業 AI」「工程筆記」「值班日常」；order 越小越前面。
加入 `draft: true` 可排除文章、列表與 RSS。正式內容需自行審稿，Notion 草稿不會自動同步。
日期採 YYYY-MM-DD，顯示統一使用 UTC 日期避免時區偏移。

## 部署

重建分支 `feat/astro-shiba-rebuild` 與 PR 執行檢查、建置及產物驗證，
並保留 `astro-preview` artifact。只有 main 的成功建置會部署 GitHub Pages。
保留原本 repo、Git 歷史與 Pages 工作流程型部署，不使用強制推送。

## 品牌與素材

主要色：蜂蜜黃 #E8B455、炭灰 #34383F、奶油白 #FFF1D6。
網站透過 prefers-color-scheme 自動跟隨系統明暗模式；亮色底 #FFF9EE，深色底 #1D2025、卡片 #262A30、文字 #F4ECDC。工程柴、文章插圖與分享圖保留原色。角色沿用 Q 版工程柴：厚黑圓框眼鏡、半瞇眼、炭灰連帽衣。
`public/images/shiba.webp` 為網站主圖；頭像及分享圖皆衍生自同一素材。
產圖來源與完整 prompt：`docs/mascot-generation.md`。
社群網址確認前只提供既有 GitHub 與 RSS，沒有虛構 FB 或 Threads 帳號。

## 舊站與回復

Hugo 舊檔由重建分支的遷移 commit 移除，歷史仍在 Git 中。
舊內容未遷移；404 頁提供新文章入口。
若需回復舊版，可用 Git revert 回退部署變更後重新執行 main workflow；不要重寫歷史。
