# 心画测评 H5 版本 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `h5/` 交付独立「心画测评H5版本」（仅人生旅程），含 mock 手机号登录与进度续测；根目录「超级爸妈APP心画测评版本」保持可完整演示；功能清单同步特殊性说明。

**Architecture:** 复制旅程三页进 `h5/`；新增 `entry`/`login` 与 `h5-auth.js`/`h5-progress.js`；CSS/assets 用 `../` 引用；进度与会话按 `userId` 存 `localStorage`。

**Tech Stack:** 静态 HTML/CSS/JS；`localStorage`；现有 `JourneyAIMock` / `JourneyVoiceMock` / `JourneyPatterns`（自 `../js` 引用）。

## Global Constraints

- 旧版根目录行为不得破坏
- H5 无 App 首页、无课程/咨询入口
- 登录为 mock「微信授权手机号」
- 版本号：**H5-v1.0.0**
- 旧版产品名：**超级爸妈APP心画测评版本**；新版：**心画测评H5版本**

---

### Task 1: Auth + Progress 模块

**Files:**
- Create: `h5/js/h5-auth.js`
- Create: `h5/js/h5-progress.js`
- Create: `h5/js/h5-auth.test.js`（可用 node 断言脚本，无测试架则手写最小 assert）

**Produces:**
- `H5Auth.getSession()` → `{userId, phoneMasked, loginAt}|null`
- `H5Auth.mockLogin()` → session
- `H5Auth.clearSession()`
- `H5Auth.requireLogin(loginUrl)` → 未登录则跳转
- `H5Progress.get(userId)` → `{status, lockedDesc, imageUrl, patternId, genCount, description, ...}`
- `H5Progress.set(userId, data)`
- `H5Progress.clear(userId)`
- status ∈ `none|composing|completed`

- [ ] Step 1: 实现 `h5-auth.js` / `h5-progress.js`（键名 `xinhua_h5_session`、`xinhua_h5_progress_{userId}`）
- [ ] Step 2: 用 node 快速脚本验证 set/get/clear 与 status 默认 none
- [ ] Step 3: （可选 commit，仅用户要求时）

---

### Task 2: entry + login 页

**Files:**
- Create: `h5/login.html`
- Create: `h5/entry.html`
- Create: `h5/js/h5-entry.js`
- Create: `h5/js/h5-login.js`

- [ ] Step 1: login 页 CTA「微信授权手机号」→ `H5Auth.mockLogin()` → `entry.html`
- [ ] Step 2: entry：未登录→login；`none`→guide；`composing`→confirm 后 canvas；`completed`→result
- [ ] Step 3: 浏览器手测分流（或说明验收步骤）

---

### Task 3: 复制并改造旅程三页

**Files:**
- Create: `h5/journey-guide.html` + `h5/js/journey-guide.js`（asset 路径 `../assets/...`，返回链 `entry.html` 或去掉 App home）
- Create: `h5/journey-canvas.html` + `h5/js/journey-canvas.js`（生图后写 `composing`；去解读写 sessionStorage + `completed`）
- Create: `h5/journey-result.html` + `h5/js/journey-result.js`（去课程/咨询；完成/重新测试；读 progress 或 sessionStorage）

脚本引用：`../js/device.js`、`../js/journey-ai-mock.js`、`../js/journey-voice-mock.js`、`../js/journey-patterns.js` + 本地 h5 js。

- [ ] Step 1: 拷贝 HTML，改 CSS/JS/asset 相对路径与导航
- [ ] Step 2: canvas 恢复 composing 状态；生图/进解读写 progress
- [ ] Step 3: result 去资讯；重新测试确认后 clear → entry

---

### Task 4: 功能清单与 README

**Files:**
- Modify: `index.html`
- Modify: `docs/FEATURES.md`
- Modify: `README.md`
- Modify: `docs/superpowers/specs/2026-09-02-journey-h5-edition-design.md`（状态改为已批准/实现中）

- [ ] Step 1: index 增加 H5-v1.0.0 卡片 + 特殊性说明；旧版标题改名
- [ ] Step 2: FEATURES 增加 H5 功能表 F200+
- [ ] Step 3: README 双产品路径说明

---

## Spec coverage

| Spec 项 | Task |
|---------|------|
| h5/ 独立目录 | 1–3 |
| 仅人生旅程 | 2–3 |
| 隐藏课程/咨询 | 3 |
| 登录 mock | 1–2 |
| 续测分流 | 2–3 |
| 功能清单特殊性 | 4 |
| 旧版不动 | 全程不改根目录旅程逻辑 |
