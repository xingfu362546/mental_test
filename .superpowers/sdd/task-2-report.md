# Task 2 Report: 测评首页 `index.html`

**Date:** 2026-08-05  
**Status:** ✅ Complete  
**Commit:** None (per task constraint)

## Deliverables

| File | Action | Notes |
|---|---|---|
| `index.html` | Created | iOS 设备壳、状态栏、6Q 首页、AQ 唯一可导航入口 |
| `css/home.css` | Created | 暖桃色界面、6Q 双列宫格、分类行、心画卡片和投影列表 |
| `js/home.js` | Created | `.js-stub` 点击统一显示「即将开放」 |

## Verification

- 在 Chromium 中通过本地静态服务打开 `index.html`。
- 宽度检查通过：设备屏幕 `393/393px`、宫格 `361/361px`（`clientWidth/scrollWidth`），无横向溢出。
- 确认 6 张 6Q 卡片均已渲染；AQ 的 `href` 为 `aq-age.html`。
- 点击 IQ 后创建 toast，文本为「即将开放」；其余非 AQ 入口复用同一 `.js-stub` 绑定。
- 已检查页面预览：卡片、分类与心画区域均在滚动容器内，未超出设备屏幕。

## Concerns

- `aq-age.html` 尚未由后续任务创建；AQ 链接已按约定保留，当前直接访问会得到静态服务的 404。

---

## Fix: 意识投影列表补全（Task 2 Review）

**Date:** 2026-08-05  
**Issue:** 投影列表仅 2 条 `.projection-item`，brief 要求心画白卡片内 3 条 +「查看更多」。

**Changes:**
- 将 `.projection-list` 移入 `.mind-card` 白卡片内（与 brief Step 3 一致）。
- 新增第 3 条 `.projection-item.js-stub`：潜意识涂鸦 / 通过画画测试你的潜意识。
- 调整 `home.css`：列表改为卡片内分隔线样式，移除独立半透明白底。

**Verification:**
- `index.html` 中 `.projection-item` 计数：**3**
- 「查看更多」`.more-link.js-stub` 保留于列表末尾。
- 未执行 git commit（按约束）。

---

## Final review fix: 心画测评（2026-08-06）

- 将心画区域调整为单个白色圆角卡片：标题「心画测评」、说明文字与橙色星点装饰。
- 卡片内固定 3 条投影测评行；每行含标题、潜意识说明、橙色「限时免费」与灰色人数信息。
- 每条右侧改为 CSS 渐变插画占位区，并覆盖「立即测试 ›」橙色胶囊按钮；底部保留居中「查看更多」与右下角 SVG 吉祥物。
- 6Q 宫格保持 2 × 3 渐变卡片与 AQ/IQ/SQ/CQ/EQ/RQ 水印；仅 AQ 导航，其余入口均为 `.js-stub` 显示「即将开放」。
- 修复：清空年龄后开始链接恢复为 `aq-quiz.html`；`submit()` 在非末题时返回 `need-answer`。
- 未执行 git commit（按约束）。
