---
title: "OpenClaw vs Hermes：兩個 AI Agent 框架，差在哪？"
date: 2026-04-15
tags: ["AI", "agent", "工具比較"]
draft: false
---

最近在研究 AI agent，看到 OpenClaw 和 Hermes 這兩個框架，兩個都在做「幫你跑任務的 AI 助理」，但個性差很多。記下來讓自己以後不用重想。

<!-- 建議插圖：OpenClaw GitHub 頁面 + Hermes 官網並排截圖，帶出「同樣是 AI agent，路線完全不同」的感覺 -->

---

## 先用一句話定位它們

如果要我用一個比喻：

- **OpenClaw** 是個**資深助理**。你交代什麼他做什麼，動作精準，但學不學得到東西不是他在乎的事。
- **Hermes** 是個**自我進化的學徒**。前幾次可能要你帶一下，但它會把你教的東西記下來，下次自己來。主打「讓人變懶」。

這個定位差異幾乎決定了它們後面所有設計上的選擇。

---

## 它們是誰做的？

**OpenClaw** 是奧地利開發者 Peter Steinberger 在 2025 年底釋出的開源專案（原名叫 Clawdbot，後來因為商標糾紛改名），2026 年初 GitHub 衝破 10 萬星，算是在開發者圈短暫爆紅過。核心概念是讓 LLM（Claude、GPT、DeepSeek 都能接）跑在你的機器上，透過 CLI、Webhook 或訊息軟體（Signal、Telegram、Discord、WhatsApp）來操控。

**Hermes** 是 [Nous Research](https://nousresearch.com) 在 2026 年 2 月推出的框架，用 Python 寫，強調「閉環學習（Learning Loop）」——每次完成任務後自動總結流程、生成新 skill、下次直接調用。

<!-- 建議插圖：Hermes 的 Learning Loop 示意圖，顯示「執行任務 → 總結流程 → 生成 Skill → 下次自動調用」的循環 -->

---

## 核心差異逐項比

### 記憶方式：「記住了什麼」vs.「記住了怎麼做」

這是最根本的差別。

OpenClaw 用的是傳統 RAG 加上標籤化記憶——它記的是**事實**，例如「用戶叫小明」、「公司叫 ABC Corp」、「上次說要追蹤 A 專案」。這種記憶可讀性高，你可以直接打開 `SOUL.md`、`MEMORY.md`、`USER.md` 這幾個檔案看 AI 記了什麼，也可以手動改。

Hermes 主打的是**程序性記憶（Procedural Memory）**——它記的是**如何做**。你教它「每次幫我寫報價單要用這個格式、這幾個欄位」，它把這個流程存成 skill，之後不用你再說，自動套用。這種記憶對重複性任務很有感，但相對也比較黑盒，不如 Markdown 文字直觀。

---

### Skill 管理：手動維護 vs. 對話生成

OpenClaw 的 skill 要自己動手封裝成 Python 或 Plugin，或去 ClawHub（社群 skill 市集，目前有 5,700+ 個）撈現成的。好處是權限控管嚴格，可以精確限制每個 skill 能讀寫哪些資源；壞處是你得有一定的開發能力才能自訂。

Hermes 可以用**自然語言定義 skill**，直接跟它說「以後幫我做 X 的時候，按照這個步驟」，它就存起來了。也支援直接掛載外部 skill 資料夾——把 skill 丟進 `~/.hermes/skills/` 就能用，不用手動註冊。對不太會寫 code 的人更友善。

而且 Hermes 有一個蠻有趣的指令：`hermes claw migrate`，可以直接把你的 OpenClaw 配置吸進來。從 OpenClaw 換過去的遷移成本比想像中低。

<!-- 建議插圖：ClawHub 網站截圖，展示各類 skill 分類（email、calendar、browser 等），帶出「5,700+ 現成 skill」的規模感 -->

---

### MCP 支援：都支援，但深度不同

兩個框架都支援 [MCP（Model Context Protocol）](https://modelcontextprotocol.io)，但 Hermes 多了一個「Auto-activation」機制——它能根據任務內容自動判斷應該激活哪個 MCP 工具，不用你每次手動指定。OpenClaw 對 MCP 的整合也深，但要觸發哪個工具通常需要明確指令。

---

### 訊息平台整合：各有側重

OpenClaw 的強項是直接透過**各種訊息軟體**操控——Signal、Telegram、Discord、WhatsApp 都行，設定好之後手機就能下指令，對一般用戶體驗比較直覺。

Hermes 則走 **Gateway 系統**，同樣支援 Telegram、Discord、Slack 等平台，但整個架構更以 agent 本身為核心，Gateway 是它對外的接口之一，而不是整個系統的中心。

---

## 在公司電腦裝要注意什麼（DLP 場景）

這段是給在高度管控環境（比如公司 MacBook）工作的人看的，坑比較多。

**網路問題**
公司如果有 Proxy 或 SSL 憑證攔截，兩個框架都需要手動設定 `HTTPS_PROXY`。如果公司直接封 API 連線，建議改接本地跑的 [Ollama](https://ollama.com)，資料完全不出網域。

**Docker 依賴**
Hermes 預設在 Docker 裡執行（為了沙盒安全），如果公司禁用 Docker，要改用 `--local` 模式。OpenClaw 這邊相對彈性一點。

**安裝路徑**
兩個都建議用 Python venv 或 Conda 裝，不要動 `sudo`，避免觸動系統目錄的安全監控。

**資安監控（DLP 觸發）**
Agent 頻繁讀取本地檔案或執行 Shell 指令，有可能被公司的 DLP 系統標記為可疑行為。Hermes 的「自主學習」特性在授權不明確的情況下可能會去摸到你沒預期的檔案。在公司環境要用的話，**OpenClaw 會是比較安全的選擇**——它的行為邊界更容易精確定義，也不會自己去長 skill。

<!-- 建議插圖：DLP 警告通知的示意截圖，或是「哪個框架適合公司環境」的比較圖表 -->

---

## 一眼看懂的對比表

| | OpenClaw | Hermes |
|---|---|---|
| 定位 | 任務導向的資深助理 | 自我進化的學徒 |
| 記憶方式 | RAG + 標籤化（記事實） | 程序性記憶（記流程） |
| Skill 來源 | Python 手寫 / ClawHub 下載 | 自然語言定義 / 自動生成 |
| MCP 支援 | 深度支援 | 原生支援 + Auto-activation |
| 訊息平台 | Signal / Telegram / Discord / WhatsApp | Telegram / Discord / Slack（Gateway） |
| 遷移工具 | — | `hermes claw migrate` 可吃 OpenClaw 設定 |
| 公司環境 | 較易控管，推薦 | 自主性高，需謹慎 |
| 上手難度 | 快，社群資源多 | 前期需要餵任務 |

---

## 那到底選哪個？

**選 OpenClaw** 如果：

- 你需要 agent 嚴格照你寫的 Python 邏輯執行（例如整合自己的 `fastmcp` 專案）
- 你在乎透明度，想隨時知道 AI 能做什麼、不能做什麼
- 你在公司受管控的環境工作
- 你想快速接上現有訊息軟體，不想花時間設定

**選 Hermes** 如果：

- 你有大量重複性的結構化任務（像是每次都要按格式寫報告、整理資料）
- 你希望 AI 能自動記住你的習慣，而不是每次都要重新說明
- 你不想維護複雜的 Prompt 或 Plugin，希望「說一次就夠」
- 你能接受前期有點學習成本

說穿了：OpenClaw 賭的是「連結一切、隨時能用」，Hermes 賭的是「越用越懂你、越來越省事」。看你比較缺哪個。

---

*資料來源：*

- *Gemini 整理的 Hermes Agent vs. OpenClaw 對比筆記*
- *[Lushbinary: Hermes Agent vs OpenClaw: Key Differences](https://lushbinary.com/blog/hermes-vs-openclaw-key-differences-comparison/)*
- *[KDnuggets: OpenClaw Explained](https://www.kdnuggets.com/openclaw-explained-the-free-ai-agent-tool-going-viral-already-in-2026)*
- *[OpenClaw Wikipedia](https://en.wikipedia.org/wiki/OpenClaw)*
- *[The New Stack: Persistent AI Agents Compared](https://thenewstack.io/persistent-ai-agents-compared/)*
- *[Turingpost: AI 101 - Hermes Agent](https://www.turingpost.com/p/hermes)*
