# 6Q 测评原型（`6q_mental_test`）

独立原型目录（父仓已 gitignore）。两套产品并存：

| 产品 | 版本 | 入口 |
|------|------|------|
| **心画测评H5版本** | **H5-v1.0.1**（当前） | [`h5/entry.html`](h5/entry.html) |
| 心画测评H5版本 | H5-v1.0.0 | 同上（首版独立壳） |
| **超级爸妈APP心画测评版本** | v1.0.4 | [`app-home.html`](app-home.html) |

打开 [`index.html`](index.html) 查看版本功能清单。

## 心画测评H5版本（H5-v1.0.1）

```
h5/entry.html（登录门禁 + 进度分流）
  ├─ login.html（假微信授权手机号）
  └─ journey-guide → journey-canvas → journey-result
       · 同页：语音解读 → 校验并直接生成
       · 结果不展示模式类型名（patternId 仍入库）
       · 分享转发 / 重新测试；无课程咨询入口
```

特殊性见 `docs/FEATURES.md`（清单倒序，最新在上）。

## 超级爸妈APP心画测评版本（v1.0.4）

1. 打开 `index.html` → 版本功能清单
2. 点「打开超级爸妈APP」或进入 `app-home.html`
3. **关系空间构图**：年龄 → 漫画引导 → 白底描边 □○ → 理解等待 → 解读
4. **人生旅程**：漫画引导 → 语音/文字描述 → 四元素校验 → 成图（最多3张）→ 解读
5. AQ 基线：首页 AQ 卡 → `aq-age.html` …

```
index.html（版本导航）
  ├─ h5/entry.html          ← 心画测评H5
  └─ app-home.html          ← 超级爸妈APP
       ├─ AQ：aq-age → aq-quiz → aq-result
       ├─ 心画·构图：xinhua-age → …
       └─ 心画·旅程：journey-guide → …
```

## 说明

- 统一 payload（APP 版）：`js/xinhua-payload.js`
- 旅程成图 mock：`js/journey-ai-mock.js`；四元素校验：`js/journey-voice-mock.js`
- H5 登录/进度：`h5/js/h5-auth.js`、`h5/js/h5-progress.js`
- 功能清单：`docs/FEATURES.md`
- H5 设计：`docs/superpowers/specs/2026-09-02-journey-h5-edition-design.md`
