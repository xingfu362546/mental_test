# 6Q 测评原型（`6q_mental_test`）

独立原型目录（父仓已 gitignore）。当前演示封版：**v1.0.4**。

## 怎么打开

1. 打开 `index.html` → **版本功能清单导航**
2. 点「打开 C 端 App」或进入 `app-home.html`
3. **关系空间构图（v1.0.4）**：年龄 → 漫画引导 → 白底描边 □○ → 理解等待 → 解读
4. **人生旅程（v1.0.4）**：漫画引导 → 语音/文字描述 → 四元素校验 → 成图（最多3张）→ 解读
5. AQ 基线：首页 AQ 卡 → `aq-age.html` …

## 主路径

```
index.html（版本导航）
  └─ app-home.html
       ├─ AQ：aq-age → aq-quiz → aq-result
       ├─ 心画·构图：xinhua-age → xinhua-guide（漫画）→ xinhua-canvas → xinhua-result
       └─ 心画·旅程：journey-guide → journey-canvas → journey-result
```

## 说明

- 统一 payload：`js/xinhua-payload.js`
- 构图理解 mock：`js/xinhua-ai-mock.js`（不出图）
- 旅程成图 mock：`js/journey-ai-mock.js`；四元素校验：`js/journey-voice-mock.js`
- 功能清单：`docs/FEATURES.md`
