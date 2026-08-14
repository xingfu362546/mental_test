# 6Q 测评原型复刻 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `6q_mental_test/` 落地可点击的 6Q 测评 App 原型：首页 → AQ 年龄 → 3 题答题 → 结果页，视觉精美且无错位溢出。

**Architecture:** 多页静态 HTML + 设计令牌 CSS + 共用 iOS 机框；`quiz.js` 持有 3 题状态机；结果页固定演示数据；插画用 CSS/SVG。子目录独立 git，父仓 ignore。

**Tech Stack:** HTML5 / CSS3（Grid/Flex）/ 原生 JS（无构建工具）/ 可选本地静态服务器打开

## Global Constraints

- Spec：`docs/superpowers/specs/2026-08-05-6q-mental-test-design.md`（全文约束）
- 可点范围：仅 AQ 全链路；首页其它入口 toast「即将开放」
- 年龄可选；用时固定 `00 : 15 : 30`；结果总分固定 `220`
- 题量 3，进度 `n/3`；点选项自动下一题；底栏 2c（每题「上一题」，题1禁用；末题右侧「提交」）
- 退出弹窗文案固定：「确定要退出测评答题？」/「退出后作答历史将不会保存」
- 插画：CSS/SVG，不裁切原截图
- 视口自检：375×812；弹层挂机框内；无横向滚动
- **Git：** 仅在用户明确要求时 commit；计划中的 commit 步骤默认跳过，改为「阶段完成口头确认」
- 父仓：修改 `D:\Cursor\testProject\.gitignore` 增加 `6q_mental_test/`

---

## File Structure

| 文件 | 职责 |
|------|------|
| `css/tokens.css` | 颜色、圆角、间距、字号、阴影、动效时长 |
| `css/ios-device.css` | 机框、状态栏、屏幕裁切 |
| `css/app.css` | reset、toast、弹层底座、防溢出 |
| `css/home.css` / `quiz.css` / `result.css` | 分页面样式 |
| `js/device.js` | 注入状态栏时间；toast 工具 |
| `js/home.js` | 桩入口绑定 |
| `js/quiz.js` | 题库、状态机、渲染、退出弹窗 |
| `js/result.js` | Tab、FAB、星级、反馈 |
| `index.html` 等四页 | 机框壳 + 业务 DOM |
| `docs/FEATURES.md` | v0.1.0 功能清单 |
| `.gitignore` / `README.md` | 子仓元数据 |

---

### Task 1: 脚手架、隔离与设计令牌

**Files:**
- Create: `6q_mental_test/.gitignore`
- Create: `6q_mental_test/README.md`
- Create: `6q_mental_test/css/tokens.css`
- Create: `6q_mental_test/css/ios-device.css`
- Create: `6q_mental_test/css/app.css`
- Create: `6q_mental_test/js/device.js`
- Create: `6q_mental_test/assets/.gitkeep`
- Modify: `D:\Cursor\testProject\.gitignore`（追加 `6q_mental_test/`）
- Shell: `git init` inside `6q_mental_test` only

**Interfaces:**
- Produces: CSS 变量 `--color-primary`, `--radius-card`, `--screen-w: 393px`, `--screen-h: 852px`；`window.SixQDevice.toast(msg)`；页面壳 class：`.ios-device` > `.ios-device__screen` > `.phone-frame`

- [ ] **Step 1: 初始化子仓并忽略于父仓**

```bash
cd D:\Cursor\testProject\6q_mental_test
git init
```

在 `D:\Cursor\testProject\.gitignore` 末尾追加一行（若不存在则创建文件）：

```
6q_mental_test/
```

子仓 `.gitignore`：

```
.DS_Store
Thumbs.db
*.log
.idea/
.vscode/
```

- [ ] **Step 2: 写入 `css/tokens.css`**

```css
:root {
  --color-bg-top: #fff8f4;
  --color-bg-bottom: #ffede5;
  --color-primary: #ff8a65;
  --color-primary-strong: #ff7a45;
  --color-text: #333333;
  --color-text-secondary: #666666;
  --color-text-muted: #999999;
  --color-card: #ffffff;
  --color-option: #f5f5f5;
  --color-option-active-bg: #fff1eb;
  --radius-card: 22px;
  --radius-pill: 999px;
  --radius-btn: 12px;
  --shadow-card: 0 8px 24px rgba(255, 122, 69, 0.08);
  --space-page: 16px;
  --font-sans: "PingFang SC", "HarmonyOS Sans", "Noto Sans SC", "Microsoft YaHei", sans-serif;
  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 180ms;
  --screen-w: 393px;
  --screen-h: 852px;
}
```

- [ ] **Step 3: 写入精简版 `css/ios-device.css`**

复用 conference 原型关键尺寸（393×852、外框圆角 55/内 47），`body.app-body` 居中灰底；`.ios-device__screen { overflow: hidden; display:flex; flex-direction:column; }`；`.phone-frame { flex:1; min-height:0; overflow:hidden; position:relative; display:flex; flex-direction:column; }`。

- [ ] **Step 4: 写入 `css/app.css` + `js/device.js`**

`app.css`：box-sizing reset；`.app-scroll { flex:1; min-height:0; overflow-x:hidden; overflow-y:auto; -webkit-overflow-scrolling:touch; }`；`.toast` 固定在 `.phone-frame` 内底部；`.modal-mask` absolute inset 0，z-index 高。

`device.js`：

```js
window.SixQDevice = {
  toast(msg, ms = 1600) {
    const root = document.querySelector(".phone-frame") || document.body;
    let el = root.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      root.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("is-show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("is-show"), ms);
  }
};
```

- [ ] **Step 5: 写 `README.md`（如何打开四页、主路径说明）**

- [ ] **Step 6: 验证隔离**

```bash
cd D:\Cursor\testProject
git check-ignore -v 6q_mental_test/README.md
```

Expected: 输出显示被 `6q_mental_test/` 规则忽略。

- [ ] **Step 7: 阶段确认（不 commit，除非用户要求）**

---

### Task 2: 测评首页 `index.html`

**Files:**
- Create: `6q_mental_test/index.html`
- Create: `6q_mental_test/css/home.css`
- Create: `6q_mental_test/js/home.js`

**Interfaces:**
- Consumes: `SixQDevice.toast`；机框壳
- Produces: AQ 卡链接 `aq-age.html`；`.js-stub` 点击 toast

- [ ] **Step 1: 搭建页面壳 + 导航**

结构：`ios-device` → status bar（9:41）→ `phone-frame` → `app-scroll` 内：nav（返回可 `history.back` 或 noop）+ 标题「6Q测评」+「我的测评」stub。

- [ ] **Step 2: 6Q 宫格**

`display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:12px;`  
六卡：AQ/IQ/SQ/CQ/EQ/RQ，各横向渐变 + 水印字母。仅 AQ：`<a class="q-card q-card--aq" href="aq-age.html">`；其余 `button.q-card.js-stub`。

渐变参考：

```css
.q-card--aq { background: linear-gradient(90deg, #ff6b5b, #ff9a7a); }
.q-card--iq { background: linear-gradient(90deg, #4a90e2, #7eb6f7); }
.q-card--sq { background: linear-gradient(90deg, #8b6bff, #b39bff); }
.q-card--cq { background: linear-gradient(90deg, #2f9e6f, #6fd6a6); }
.q-card--eq { background: linear-gradient(90deg, #e85a8c, #f3a0c0); }
.q-card--rq { background: linear-gradient(90deg, #f0a040, #f6c86a); }
```

- [ ] **Step 3: 五分类图标行 + 心画区块**

五等分 flex；心画白卡片内 3 条「意识投影」列表 +「查看更多」+ 右下角 SVG mascot。列表「立即测试」与分类均为 `.js-stub`。

- [ ] **Step 4: `home.js` 绑定 stub**

```js
document.querySelectorAll(".js-stub").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    SixQDevice.toast("即将开放");
  });
});
```

- [ ] **Step 5: 浏览器打开验证**

打开 `index.html`：宫格不溢出；点 IQ toast；点 AQ 进年龄页。

---

### Task 3: 年龄页 `aq-age.html`

**Files:**
- Create: `6q_mental_test/aq-age.html`
- Extend: `css/quiz.css`（年龄+答题共用头图区）或 `css/home.css` 旁新建段落于 `quiz.css`

**Interfaces:**
- Produces: 「开始答题」→ `aq-quiz.html`（不强制带 age query；可选 `?age=`）

- [ ] **Step 1: 头图 SVG**

暖色背景 + 书架线稿 + 单眼 Q 仔抱书，peek 在白卡片上方。

- [ ] **Step 2: 白卡片文案 + pill 输入**

文案：「为了测试结果的准确性，请输入您的年龄：」  
placeholder：「请输入您的年龄」  
`input type="number"` 可不填。

- [ ] **Step 3: 底栏主按钮**

```html
<a class="btn-primary" id="btn-start" href="aq-quiz.html">开始答题</a>
```

点击时若填写了年龄，可用：

```js
document.getElementById("btn-start").addEventListener("click", (e) => {
  const age = document.getElementById("age-input").value.trim();
  if (age) e.currentTarget.href = "aq-quiz.html?age=" + encodeURIComponent(age);
});
```

不校验必填。

- [ ] **Step 4: 视觉验证** — 卡片居中、按钮不贴 home indicator、无溢出。

---

### Task 4: 答题页与状态机 `aq-quiz.html` + `quiz.js`

**Files:**
- Create: `6q_mental_test/aq-quiz.html`
- Create: `6q_mental_test/css/quiz.css`
- Create: `6q_mental_test/js/quiz.js`

**Interfaces:**
- Produces:
  - `SixQQuiz.QUESTIONS` 长度 3
  - `SixQQuiz.getState()` → `{ index, answers: (number|null)[], total: 3 }`
  - `SixQQuiz.selectOption(i)` / `prev()` / `submit()` → `'ok' | 'need-answer' | 'goto-result'`
- Consumes: `SixQDevice.toast`

- [ ] **Step 1: 题库常量（占位 3 题）**

```js
const QUESTIONS = [
  {
    title: "你有没有在平常的学习/工作中觉得乏力？",
    options: [
      "偶尔会有，但是又可以自己克服消化吸收，可以多多锻炼身体。天天开心哈哈",
      "偶尔会有，但是又可以自己克服消化吸收，可以多多锻炼身体。天天开心哈哈",
      "有一点乏力，但是又可以自己克服消化吸收，可以多多锻炼身体",
      "偶尔会有，但是又可以自己克服消化吸收，可以多多锻炼身体。天天开心哈哈",
      "从没有发生"
    ]
  },
  {
    title: "你有没有在平时的学习/工作中觉得压力？",
    options: [
      "有一点",
      "偶尔会有，但是又可以自己克服消化吸收，可以多多锻炼身体。天天开心哈哈",
      "偶尔会有",
      "从没有发生",
      "从没有发生"
    ]
  },
  {
    title: "你有没有在平常的学习/工作中觉得乏力？",
    options: [
      "偶尔会有，但是又可以自己克服消化吸收，可以多多锻炼身体。天天开心哈哈",
      "偶尔会有，但是又可以自己克服消化吸收，可以多多锻炼身体。天天开心哈哈",
      "偶尔会有",
      "从没有发生",
      "从没有发生"
    ]
  }
];
```

- [ ] **Step 2: 状态机核心**

```js
let index = 0;
const answers = [null, null, null];

function selectOption(optIndex) {
  answers[index] = optIndex;
  render();
  if (index < QUESTIONS.length - 1) {
    setTimeout(() => {
      index += 1;
      render();
    }, 180);
  }
}

function prev() {
  if (index <= 0) return;
  index -= 1;
  render();
}

function submit() {
  if (answers[index] == null) return "need-answer";
  return "goto-result";
}
```

- [ ] **Step 3: 渲染 DOM**

- `#progress` → 当前题号主色，如 `<span class=" Progressive">1</span> / 3`（样式：当前数字大且橙）
- 题干、5 个 pill 选项；已选加 `.is-active`
- 用时条固定文案：`累计用时 00 : 15 : 30`
- 底栏：`#btn-prev`（index===0 时 `disabled`）；`#btn-submit` 仅 `index===2` 时显示

- [ ] **Step 4: 退出弹窗**

返回箭头打开 `#exit-modal`：

```html
<div class="modal-mask" id="exit-modal" hidden>
  <div class="modal-card" role="dialog">
    <p class="modal-title">确定要退出测评答题？</p>
    <p class="modal-desc">退出后作答历史将不会保存</p>
    <div class="modal-actions">
      <button type="button" id="exit-cancel">取消</button>
      <button type="button" id="exit-ok">确定</button>
    </div>
  </div>
</div>
```

确定 → `location.href = 'index.html'`。

- [ ] **Step 5: 提交**

```js
btnSubmit.onclick = () => {
  const r = submit();
  if (r === "need-answer") SixQDevice.toast("请选择一项");
  else location.href = "aq-result.html";
};
```

- [ ] **Step 6: 手测清单**

1. 题1 上一题禁用  
2. 选题自动到题2  
3. 题3 出现提交  
4. 未选提交 toast  
5. 退出弹窗文案正确且不穿框  
6. 长选项换行不破布局  

---

### Task 5: 结果页 `aq-result.html`

**Files:**
- Create: `6q_mental_test/aq-result.html`
- Create: `6q_mental_test/css/result.css`
- Create: `6q_mental_test/js/result.js`

**Interfaces:**
- Consumes: `SixQDevice.toast`
- Produces: Tab 切换、`scrollTo(0)`、回首页链接

- [ ] **Step 1: 顶栏 + 用户摘要**

返回 → `index.html`；分享 stub toast。  
文案：`Kkkxxx，你的测试总分为` + **220**（主色大号）。头像用 CSS 渐变圆。

- [ ] **Step 2: 图表卡片**

Tab：「维度雷达图」/「正态分布图」。  
雷达：SVG 六边形 + 半透明填充。  
正态：SVG 钟形曲线示意（切换显示）。

- [ ] **Step 3: 解读区块（滚动拼接图5+图6）**

顺序实现：

1. 什么是心画映射测试?  
2. 整体解读  
3. 各类详解（维度A/B/C + 建议盒）  
4. 历史测评记录（6Q 和谐指数雷达 +「去完善」stub）  
5. 精选课程 / 6Q商城 Tab + 课程列表 stub  
6. 星级评分 + 反馈 textarea `0/500` +「提交反馈」

- [ ] **Step 4: FAB**

右下角两枚：回首页 → `index.html`；顶部 → `app-scroll.scrollTo({top:0,behavior:'smooth'})`。

- [ ] **Step 5: `result.js`**

Tab active class 切换；星级点击填充；textarea 计数；提交反馈 toast「感谢反馈」；stub 链 toast。

- [ ] **Step 6: 滚动与溢出自检**

整页在 `.app-scroll` 内滚动；FAB `position:absolute` 相对 `.phone-frame`；无横向条。

---

### Task 6: FEATURES.md + 全链路视觉 Review

**Files:**
- Create: `6q_mental_test/docs/FEATURES.md`
- Modify: spec 状态行改为「已实现基线 v0.1.0」（可选）

- [ ] **Step 1: 写入功能清单**

```markdown
# 6Q 测评原型 · 功能清单

## v0.1.0（基线复刻）

| ID | 功能 | 状态 |
|----|------|------|
| F001 | 测评首页视觉复刻 + AQ 入口 | done |
| F002 | 首页非 AQ 入口视觉桩 + toast | done |
| F003 | AQ 年龄页（年龄可选） | done |
| F004 | AQ 三题状态机（2c 底栏、退出弹窗、固定用时） | done |
| F005 | AQ 结果页固定演示 + Tab/FAB/评分反馈 | done |
| F006 | 设计令牌 + iOS 机框 + 防溢出 | done |

## v1.0.0

> 后续新需求按条追加于此，版本标注 v1.0.0。
```

- [ ] **Step 2: 全链路走查（必做）**

打开顺序：`index` → AQ → 开始 → 答完 3 题 → 结果 → 回首页。  
对照 spec §6 防错位清单逐条勾选。

- [ ] **Step 3: 用浏览器截图或 Playwright 核对四页无模块错位**

若发现溢出：优先修 `minmax(0,1fr)`、`min-width:0`、弹层挂载点、长文本 `word-break`。

- [ ] **Step 4: 向用户汇报可打开路径与已知限制**

---

## Spec Coverage Check

| Spec 要求 | Task |
|-----------|------|
| 目录与四页 | 1–5 |
| 父仓 ignore + 子 git | 1 |
| 年龄可选 | 3 |
| 固定用时 / 固定 220 | 4–5 |
| 3 题 n/3、2c、退出弹窗 | 4 |
| 结果轻交互 | 5 |
| CSS/SVG 插画 | 2–5 |
| FEATURES v0.1.0 | 6 |
| 防错位自检 | 4 Step6、5 Step6、6 Step2 |

## Placeholder Scan

无 TBD；提交步骤默认跳过（遵循用户「未要求不 commit」）。

---

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-08-05-6q-mental-test-impl.md`.

**Two execution options:**

1. **Subagent-Driven（推荐）** — 每任务派生子代理，任务间复查  
2. **Inline Execution** — 本会话按 executing-plans 连续做完，关键节点停顿给你看  

**Which approach?**
