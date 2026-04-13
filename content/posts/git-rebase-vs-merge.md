---
title: "Git rebase vs merge：我什麼時候用哪個"
date: 2026-03-24
tags: ["git", "工作流程"]
draft: false
---

這是一個被問爛了、答案又永遠吵不完的問題。寫下我自己的決策標準，不是要說服任何人，只是要讓自己下次少想五分鐘。

## 我的原則

**本地 feature branch 整合到 main → rebase**

```bash
git switch feature/my-thing
git rebase main
git switch main
git merge --ff-only feature/my-thing
```

- 保持線性歷史，`git log --oneline` 看起來乾淨
- PR 審查時 diff 清楚，沒有多餘的 merge commit

**已經 push 過、有其他人在用的 branch → merge**

一旦 rebase 之後 force push，其他人的本地 branch 就爆了。這時候 merge commit 的醜陋是值得的代價。

---

## 什麼時候 squash？

當一個 feature 的 commit 歷史是「試誤的過程」而不是「可讀的故事」時，squash 再 merge。

```bash
git merge --squash feature/my-thing
git commit -m "feat: 完成 XX 功能"
```

如果每個 commit 都是獨立有意義的步驟（尤其是有 commit message 解釋 why），就不要 squash，保留歷史。

---

## 一句話總結

> 本地用 rebase 保持整潔，協作用 merge 保持安全，squash 只在歷史沒有保留價值時才用。
