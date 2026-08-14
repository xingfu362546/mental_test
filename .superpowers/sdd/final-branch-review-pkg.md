# Final review package — 6q_mental_test v0.1.0 working tree
Minor carries from tasks: age href reset; submit() last-guard; home projection style vs screenshot may differ

## index.html — 7305 bytes exists=True

## aq-age.html — 6122 bytes exists=True

## aq-quiz.html — 3888 bytes exists=True

## aq-result.html — 9307 bytes exists=True

## css/tokens.css — 682 bytes exists=True

## css/ios-device.css — 3522 bytes exists=True

## css/app.css — 1045 bytes exists=True

## css/home.css — 5842 bytes exists=True

## css/quiz.css — 8410 bytes exists=True

## css/result.css — 7139 bytes exists=True

## js/device.js — 458 bytes exists=True

## js/home.js — 174 bytes exists=True

## js/quiz.js — 5076 bytes exists=True

## js/result.js — 2115 bytes exists=True

## docs/FEATURES.md — 562 bytes exists=True

## README.md — 1323 bytes exists=True

## .gitignore — 47 bytes exists=True

## FULL: js/quiz.js
```
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
      title: "浣犳湁娌℃湁鍦ㄥ钩甯哥殑瀛︿範/宸ヤ綔涓寰椾箯鍔涳紵",
      options: [
        "鍋跺皵浼氭湁锛屼絾鏄張鍙互鑷繁鍏嬫湇娑堝寲鍚告敹锛屽彲浠ュ澶氶敾鐐艰韩浣撱€傚ぉ澶╁紑蹇冨搱鍝?,
        "鏈変竴鐐逛箯鍔涳紝浣嗘槸鍙堝彲浠ヨ嚜宸卞厠鏈嶆秷鍖栧惛鏀讹紝鍙互澶氬閿荤偧韬綋",
        "鏈夋椂浼氳寰楃疮锛岄渶瑕佸厛璁╄嚜宸变紤鎭竴涓嬪啀缁х画",
        "缁忓父浼氭湁锛岀煭鏃堕棿鍐呬笉澶鏄撹皟鏁磋繃鏉?,
        "浠庢潵娌℃湁鍙戠敓",
      ],
    },
    {
      title: "浣犳湁娌℃湁鍦ㄥ钩鏃剁殑瀛︿範/宸ヤ綔涓寰楀帇鍔涳紵",
      options: [
        "鏈変竴鐐?,
        "鍋跺皵浼氭湁锛屼絾鏄張鍙互鑷繁鍏嬫湇娑堝寲鍚告敹锛屽彲浠ュ澶氶敾鐐艰韩浣撱€傚ぉ澶╁紑蹇冨搱鍝?,
        "鍋跺皵浼氭湁",
        "鍘嬪姏姣旇緝澶э紝闇€瑕佷粬浜虹殑鏀寔",
        "浠庢潵娌℃湁鍙戠敓",
      ],
    },
    {
      title: "闈㈠璁″垝涔嬪鐨勬寫鎴樻椂锛屼綘閫氬父浼氭€庝箞鍋氾紵",
      options: [
        "鍏堟⒊鐞嗛棶棰橈紝鍐嶄竴姝ユ瀵绘壘瑙ｅ喅鏂规硶",
        "浼氭湁浜涚揣寮狅紝浣嗕粛鎰挎剰灏濊瘯鏂扮殑鍔炴硶",
        "闇€瑕佷竴浜涙椂闂达紝鎵嶈兘鎭㈠琛屽姩鐘舵€?,
        "甯稿父鍥犳鎵撲贡鍘熸湰鐨勮妭濂?,
        "浠庢潵娌℃湁鍙戠敓",
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
      if (submit() === "need-answer") view.SixQDevice.toast("璇烽€夋嫨涓€椤?);
      else view.location.href = "aq-result.html";
    });
    btnExit.addEventListener("click", () => {
      modal.hidden = false;
    });
    cancelExit.addEventListener("click", () => {
      modal.hidden = true;
    });
    confirmExit.addEventListener("click", () => {
      view.location.href = "index.html";
    });

    renderView();
  }

  return { QUESTIONS, getState, selectOption, prev, submit, mount };
});

```

## FULL: js/result.js
```
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) {
    root.SixQResult = api;
    if (root.document) api.mount(root.document);
  }
})(typeof window !== "undefined" ? window : null, function () {
  function getStarState(rating) {
    return Array.from({ length: 5 }, (_, index) => index < rating);
  }

  function mount(document) {
    const view = document.defaultView;
    const scroll = document.querySelector(".app-scroll");
    const tabs = document.querySelectorAll("[data-tab]");
    const panels = document.querySelectorAll("[data-panel]");
    const stars = document.querySelectorAll("[data-star]");
    const textarea = document.getElementById("feedback");
    const count = document.getElementById("feedback-count");
    const submit = document.getElementById("submit-feedback");
    const top = document.getElementById("back-top");

    function toast(message) {
      if (view.SixQDevice) view.SixQDevice.toast(message);
    }
    function setRating(rating) {
      stars.forEach((star, index) => star.classList.toggle("is-active", index < rating));
    }

    tabs.forEach((tab) => tab.addEventListener("click", () => {
      const key = tab.dataset.tab;
      tabs.forEach((item) => item.classList.toggle("is-active", item === tab));
      panels.forEach((panel) => panel.classList.toggle("is-active", panel.dataset.panel === key));
    }));
    stars.forEach((star) => star.addEventListener("click", () => setRating(Number(star.dataset.star))));
    textarea.addEventListener("input", () => { count.textContent = textarea.value.length; });
    submit.addEventListener("click", () => {
      toast("鎰熻阿鍙嶉");
      textarea.value = "";
      count.textContent = "0";
      setRating(0);
    });
    top.addEventListener("click", () => scroll.scrollTo({ top: 0, behavior: "smooth" }));
    document.querySelectorAll("[data-stub]").forEach((item) => item.addEventListener("click", () => toast(item.dataset.stub)));
  }

  return { getStarState, mount };
});

```

## FULL: js/home.js
```
document.querySelectorAll(".js-stub").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    SixQDevice.toast("鍗冲皢寮€鏀?);
  });
});

```

