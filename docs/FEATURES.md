# 6Q 测评原型 · 功能清单

> 版本按时间**倒序**排列（最新在上）。当前 H5：**H5-v1.0.3**；当前 App：**v1.0.4（超级爸妈APP心画测评版本）**。

## 流程图（画板 → 模型 → 解读）

完整可交互展开版见 [`index.html#flows`](../index.html#flows)。以下为同构摘要。

### 总览（两套心画同构）

```mermaid
flowchart TB
  Home[App 首页心画入口] --> Comp[构图 composition]
  Home --> Jour[旅程 journey]
  Comp --> Guide[① 引导]
  Jour --> Guide
  Guide --> Board[② 输入或画板]
  Board --> Compose[③ compose 节点]
  Compose --> Result[④ 结果解读]
```

### 构图详细（v1.0.4）

```mermaid
flowchart TD
  Age[年龄可选] --> Comic[漫画4格·开始心画]
  Comic --> Board[客厅地图板 白底描边 □○]
  Board --> Wait[假等待：理解构图]
  Wait --> Mock[compose: description + p01<br/>imageUrl=null]
  Mock --> Result[白底回放 + 可切12模]
```

### 旅程详细（v1.0.4）

```mermaid
flowchart TD
  Comic[漫画4格·开始心画] --> Desc[语音/文字描述]
  Desc --> Check{四元素齐全？}
  Check -->|否| Desc
  Check -->|是| Confirm[确认描述]
  Confirm --> Gen[成图贴板 · 最多3张]
  Gen --> Result[展示成图与固定解读 j04]
```

## H5-v1.0.3（心画测评H5版本 · 当前）

**本迭代调整说明（2026-09-15）**

| 类别 | 调整点 |
|------|--------|
| 文案 | 引导页补知情说明与情境措辞；成图页补隐私提醒、「模拟呈现」说明；结果页改为四段标题（画面观察 / 探索线索 / 积极资源 / 觉察提示）+ 固定免责结尾 |
| 呈现 | 前台不公开海报式象征预设含义；结果页展示「参与者呈现主题」`frontTheme`，不展示后台模式名（`name`/`patternId` 仅后台） |
| 安全 | 语音/文本敏感内容检测 → 开发字段 `risk_flag` / `risk_categories` / `stop_general_analysis` + 温馨提示弹层；成图页可演示 |
| 智能体 | 更新 `dify-journey-llm-prompt.md`：四段 `user_reply`、后台有模式前台无标签、禁导购/负面定论、敏感停解析；生图提示词同步禁具象化伤害 |
| 次数/CTA | 每人仅可测试一次（`MAX_RETEST=0`）；去掉「重新测试/已用尽」；改为「去6Q超级爸妈查看更多测评」→ `app-home.html` |
| 续测（沿用） | 已生图未解读：入口仍回成图页，直至查看解读；进度按授权手机号维度落库 |

| ID | 功能 | 状态 |
|----|------|------|
| F230 | 引导/成图/结果页文案对齐业务口径（知情说明、情境、隐私提醒、四段结构与免责；不改主流程） | done |
| F231 | 前台不公开海报式象征预设含义；结果页隐藏模式类型名（既有口径强化） | done |
| F232 | 敏感内容检测：`risk_flag` / `risk_categories` / `stop_general_analysis` + 温馨提示弹层 | done |
| F233 | 智能体提示词更新：四段 `user_reply`、后台有模式前台无标签、禁导购/负面定论、敏感停解析 | done |
| F234 | 结果页展示「参与者呈现主题」`frontTheme`（不展示后台模式名） | done |
| F235 | 每人仅可测试一次：去掉重新测试/用尽按钮，改为「去6Q超级爸妈查看更多测评」 | done |

入口：[`h5/entry.html`](../h5/entry.html) · 提示词：[`docs/dify-journey-llm-prompt.md`](dify-journey-llm-prompt.md) · [`docs/dify-journey-image-prompt.md`](dify-journey-image-prompt.md)

## H5-v1.0.2（心画测评H5版本）

| ID | 功能 | 状态 |
|----|------|------|
| F220 | 登录页对齐微信「手机号快速验证」UI（允许/拒绝），不展示假手机号 | done |
| F221 | 每次从 `entry` 进入强制重新授权；会话改 sessionStorage | done |
| F222 | 进度按**授权手机号**分桶统计重新测试次数（真号未回填前会话占位） | done |
| F223 | 取消「重新生成」图片；首次测完后最多还可重新测试 **2** 次 | done |
| F224 | 已生图未解读：入口强制回成图页，直至用户查看解读 | done |
| F225 | 「分享转发」= 小程序分享卡（onShareAppMessage：title/path/imageUrl）；H5 仅占位 | done |

入口：[`h5/entry.html`](../h5/entry.html)

## H5-v1.0.1（心画测评H5版本）

| ID | 功能 | 状态 |
|----|------|------|
| F210 | 描述页：强化按住说话；解读出现后再出主 CTA；同页校验并直接生成（去掉中间确认页） | done |
| F211 | 结果页不对用户展示模式类型名称；`patternId` 仍写入进度/payload 供智能体 | done |
| F212 | 结果页主按钮「完成」改为「分享转发」（Share API / 复制链接演示） | done |
| F213 | 功能清单倒序展示最新版本；注释与 README 同步 | done |

入口：[`h5/entry.html`](../h5/entry.html)

## H5-v1.0.0（心画测评H5版本）

**特殊性说明**

1. 独立目录 `h5/`，与「超级爸妈APP心画测评版本」并存，互不影响。
2. 仅人生旅程；无 App 多测评首页、无构图/AQ 等入口。
3. 扫码落地 `h5/entry.html`：每次强制微信手机号授权 + 进度续测。
4. 结果页不展示课程/咨询资讯入口。
5. 授权页对齐微信 UI，不展示假手机号；真 `getPhoneNumber` 待接。

| ID | 功能 | 状态 |
|----|------|------|
| F200 | `h5/` 独立壳：entry / login / journey-guide / canvas / result | done |
| F201 | mock「微信授权手机号」会话（`h5-auth.js`） | done |
| F202 | 按 userId 进度 none/composing/completed（`h5-progress.js`） | done |
| F203 | entry 分流：登录门禁 + 续测提示 + 结果直达 | done |
| F204 | H5 结果页隐藏课程与咨询；完成 / 重新测试（完成已由 H5-v1.0.1 改为分享转发） | done |
| F205 | `index.html` / FEATURES / README 双产品命名与特殊性说明 | done |

入口：[`h5/entry.html`](../h5/entry.html) · 设计：[`specs/2026-09-02-journey-h5-edition-design.md`](superpowers/specs/2026-09-02-journey-h5-edition-design.md)

## v1.0.4（超级爸妈APP心画测评版本）

| ID | 功能 | 状态 |
|----|------|------|
| F140 | 旅程改为语音/文字描述；删除四象征/风景/附加图案拖拽 | done |
| F141 | 四元素关键词+别称校验；缺则提示「缺少 xx」 | done |
| F142 | 确认描述 → 假等待 → 完整旅程成图贴板；描述锁定可重生（1+2=最多3张） | done |
| F143 | 旅程漫画引导文案同步新流程 | done |
| F144 | 构图交互板+结果回放：纯白底；□○ 仅描边无填充；去颜色调节 | done |
| F145 | `index.html` / 流程图升 v1.0.4 | done |

## v1.0.3

| ID | 功能 | 状态 |
|----|------|------|
| F130 | 构图漫画引导（年龄分叉文案，4 格，不可跳过，CTA「开始心画」） | done |
| F131 | 客厅关系地图板场景 + □○ 拖转（无语音/风景） | done（视觉已由 v1.0.4 迭代） |
| F132 | 假等待「理解构图」节点；compose.imageUrl 恒 null | done |
| F133 | 统一 payload 壳 `xinhua-payload.js`（构图/旅程） | done |
| F134 | 结果默认模式 + 12 模演示条可切；客厅轻换皮 | done |
| F135 | 结果页一对一跳转心理咨询三屏（导师主页/预约详情/可约时间） | done |

## v1.0.2

| ID | 功能 | 状态 |
|----|------|------|
| F120 | 人生旅程漫画翻页引导（4 格，不可跳过，CTA「开始心画」） | done |
| F121 | 治愈旅行风场景/角色静图资源（`assets/journey/`） | done |
| F122–F125 | 草坪四象征拖拽 + 语音附加 + 成图解读 | done（已被 v1.0.4 描述成图取代） |

## v1.0.1

| ID | 功能 | 状态 |
|----|------|------|
| F110 | 心画·人生旅程入口（首页第二条） | done |
| F111–F114 | 人生旅程初版链路 | done（已被后续迭代） |

## v1.0.0

| ID | 功能 | 状态 |
|----|------|------|
| F100–F107 | 版本导航 + 构图初版链路 | done（构图体验已被后续迭代） |

## v0.1.0（基线复刻）

| ID | 功能 | 状态 |
|----|------|------|
| F001–F006 | AQ 测评主路径 + 设计令牌 | done |
