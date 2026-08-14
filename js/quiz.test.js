const test = require("node:test");
const assert = require("node:assert/strict");

function loadQuiz() {
  delete require.cache[require.resolve("./quiz.js")];
  return require("./quiz.js");
}

test("题库固定为三题，初始状态停在第一题", () => {
  const quiz = loadQuiz();

  assert.equal(quiz.QUESTIONS.length, 3);
  assert.deepEqual(quiz.getState(), {
    index: 0,
    answers: [null, null, null],
    total: 3,
  });
});

test("选择非末题选项后自动进入下一题", async () => {
  const quiz = loadQuiz();

  assert.equal(quiz.selectOption(2), "ok");
  assert.equal(quiz.getState().answers[0], 2);
  await new Promise((resolve) => setTimeout(resolve, 200));
  assert.equal(quiz.getState().index, 1);
});

test("末题未选择时阻止提交，选择后可进入结果", async () => {
  const quiz = loadQuiz();

  quiz.selectOption(0);
  await new Promise((resolve) => setTimeout(resolve, 200));
  quiz.selectOption(1);
  await new Promise((resolve) => setTimeout(resolve, 200));

  assert.equal(quiz.getState().index, 2);
  assert.equal(quiz.submit(), "need-answer");
  assert.equal(quiz.selectOption(1), "ok");
  assert.equal(quiz.submit(), "goto-result");
});

test("上一题在第一题不可用，其他题可返回", async () => {
  const quiz = loadQuiz();

  assert.equal(quiz.prev(), "need-answer");
  quiz.selectOption(0);
  await new Promise((resolve) => setTimeout(resolve, 200));
  assert.equal(quiz.prev(), "ok");
  assert.equal(quiz.getState().index, 0);
});
