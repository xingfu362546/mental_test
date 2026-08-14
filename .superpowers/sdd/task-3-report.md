# Task 3 Report: AQ 年龄页 `aq-age.html`

**Date:** 2026-08-05  
**Status:** ✅ Complete  
**Commit:** None (per task constraint)

## Deliverables

| File | Action | Notes |
|---|---|---|
| `aq-age.html` | Created | iOS 设备壳内的 AQ 年龄选填页，含返回首页、Q 仔书架插图、年龄输入和开始答题入口。 |
| `css/quiz.css` | Created | AQ 年龄页与后续答题页可复用的头图区、白卡片、底部操作栏和主按钮样式。 |

## Verification

- Chromium 本地预览通过：暖桃色头图、书架与单眼 Q 仔、居中白卡片及底部按钮均在 393px 屏幕内。
- `.aq-age-page` 的 `clientWidth/scrollWidth` 为 `393/393px`，无横向溢出。
- 年龄输入框为 `type="number"`，为空时保留 `aq-quiz.html`；输入 `28` 后点击链接变为 `aq-quiz.html?age=28`。
- 返回箭头指向 `index.html`；按钮位于 home indicator 上方，未被遮挡。
- 控制台未发现运行时错误。

## Concerns

- `aq-quiz.html` 属于后续 Task 4，当前点击开始答题会按约定链接至尚未创建的页面。
