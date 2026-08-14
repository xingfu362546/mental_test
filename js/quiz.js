(function (root, factory) {
  const api = factory();

  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) {
    root.SixQQuiz = api;
    if (root.document) api.mount(root.document);
  }
})(typeof window !== "undefined" ? window : null, function () {
  const QUESTIONS = [
    {
      title: "你有没有在平常的学习/工作中觉得乏力？",
      options: [
        "偶尔会有，但是又可以自己克服消化吸收，可以多多锻炼身体。天天开心哈哈",
        "有一点乏力，但是又可以自己克服消化吸收，可以多多锻炼身体",
        "有时会觉得累，需要先让自己休息一下再继续",
        "经常会有，短时间内不太容易调整过来",
        "从来没有发生",
      ],
    },
    {
      title: "你有没有在平时的学习/工作中觉得压力？",
      options: [
        "有一点",
        "偶尔会有，但是又可以自己克服消化吸收，可以多多锻炼身体。天天开心哈哈",
        "偶尔会有",
        "压力比较大，需要他人的支持",
        "从来没有发生",
      ],
    },
    {
      title: "面对计划之外的挑战时，你通常会怎么做？",
      options: [
        "先梳理问题，再一步步寻找解决方法",
        "会有些紧张，但仍愿意尝试新的办法",
        "需要一些时间，才能恢复行动状态",
        "常常因此打乱原本的节奏",
        "从来没有发生",
      ],
    },
  ];

  let index = 0;
  const answers = QUESTIONS.map(() => null);
  let renderView = function () {};
  let advanceTimer = null;

  function getState() {
    return { index, answers: answers.slice(), total: QUESTIONS.length };
  }

  function selectOption(optIndex) {
    if (!Number.isInteger(optIndex) || optIndex < 0 || optIndex >= QUESTIONS[index].options.length) {
      return "need-answer";
    }

    answers[index] = optIndex;
    renderView();

    if (index < QUESTIONS.length - 1) {
      const selectedIndex = index;
      clearTimeout(advanceTimer);
      advanceTimer = setTimeout(() => {
        if (index !== selectedIndex) return;
        index += 1;
        renderView();
      }, 180);
    }
    return "ok";
  }

  function prev() {
    if (index <= 0) return "need-answer";
    clearTimeout(advanceTimer);
    index -= 1;
    renderView();
    return "ok";
  }

  function submit() {
    if (index !== QUESTIONS.length - 1) return "need-answer";
    return answers[index] == null ? "need-answer" : "goto-result";
  }

  function mount(document) {
    const view = document.defaultView;
    const progress = document.getElementById("progress");
    const progressBar = document.getElementById("progress-bar");
    const title = document.getElementById("question-title");
    const options = document.getElementById("quiz-options");
    const btnPrev = document.getElementById("btn-prev");
    const btnSubmit = document.getElementById("btn-submit");
    const btnExit = document.getElementById("btn-exit");
    const modal = document.getElementById("exit-modal");
    const cancelExit = document.getElementById("exit-cancel");
    const confirmExit = document.getElementById("exit-ok");

    renderView = function render() {
      const question = QUESTIONS[index];
      progress.innerHTML = "<span>" + (index + 1) + "</span> / " + QUESTIONS.length;
      progressBar.style.width = ((index + 1) / QUESTIONS.length) * 100 + "%";
      title.textContent = question.title;
      options.innerHTML = question.options
        .map((option, optionIndex) => {
          const active = answers[index] === optionIndex;
          return (
            '<button class="quiz-option' +
            (active ? " is-active" : "") +
            '" type="button" role="radio" aria-checked="' +
            active +
            '" data-option="' +
            optionIndex +
            '"><span class="quiz-option__mark">' +
            String.fromCharCode(65 + optionIndex) +
            "</span><span>" +
            option +
            "</span></button>"
          );
        })
        .join("");
      btnPrev.disabled = index === 0;
      btnSubmit.hidden = index !== QUESTIONS.length - 1;
    };

    options.addEventListener("click", (event) => {
      const button = event.target.closest("[data-option]");
      if (button) selectOption(Number(button.dataset.option));
    });
    btnPrev.addEventListener("click", prev);
    btnSubmit.addEventListener("click", () => {
      if (submit() === "need-answer") view.SixQDevice.toast("请选择一项");
      else view.location.href = "aq-result.html";
    });
    btnExit.addEventListener("click", () => {
      modal.hidden = false;
    });
    cancelExit.addEventListener("click", () => {
      modal.hidden = true;
    });
    confirmExit.addEventListener("click", () => {
      view.location.href = "app-home.html";
    });

    renderView();
  }

  return { QUESTIONS, getState, selectOption, prev, submit, mount };
});
