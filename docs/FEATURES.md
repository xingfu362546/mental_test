# 6Q 测评原型 · 功能清单

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

## v1.0.4（当前演示）

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
