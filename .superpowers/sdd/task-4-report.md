# Task 4 完成报告：答题页与状态机

## 实现

- 新增 `aq-quiz.html`：AQ 三题答题页、2c 底栏、机框内退出确认弹窗。
- 新增 `js/quiz.js`：暴露 `SixQQuiz.QUESTIONS`、`getState()`、`selectOption()`、`prev()`、`submit()`；非末题选项在 180ms 后自动前进。
- 扩展 `css/quiz.css`：答题卡、长选项换行胶囊、进度条、提交/回退按钮和弹窗样式，未修改年龄页既有选择器。
- 新增 `js/quiz.test.js` 状态机测试。

## 验证

- `node --test js/quiz.test.js`：4/4 通过。
- 浏览器（375×812）检查通过：Q1 回退禁用、选项自动跳至 Q2、Q3 显示提交、末题未选提示「请选择一项」、退出弹窗指定文案且位于机框内、长选项无横向溢出。
- 未创建结果页内容；提交成功路径指向 `aq-result.html`。未提交 git。
