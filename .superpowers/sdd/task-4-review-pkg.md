# Task 4 Review Package

## FILE: aq-quiz.html
```
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AQ 閫嗗晢娴嬭瘎锝滅瓟棰?/title>
    <link rel="stylesheet" href="css/tokens.css" />
    <link rel="stylesheet" href="css/ios-device.css" />
    <link rel="stylesheet" href="css/app.css" />
    <link rel="stylesheet" href="css/quiz.css" />
  </head>
  <body class="app-body">
    <div class="ios-device">
      <div class="ios-device__shell">
        <i class="ios-device__btn ios-device__btn--silent"></i>
        <i class="ios-device__btn ios-device__btn--vol-up"></i>
        <i class="ios-device__btn ios-device__btn--vol-down"></i>
        <i class="ios-device__btn ios-device__btn--power"></i>
        <div class="ios-device__screen">
          <div class="ios-status-bar">
            <span class="ios-status-bar__time">9:41</span>
            <span class="ios-status-bar__island"></span>
            <span class="ios-status-bar__icons">
              <svg width="17" height="12" viewBox="0 0 17 12" aria-hidden="true"><path d="M1 10.5C4.2 6.8 7.8 6.8 11 10.5M4 7.5c2.1-2.4 4.9-2.4 7 0M7 4.5c.9-1 2.1-1 3 0" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              <svg width="25" height="12" viewBox="0 0 25 12" aria-hidden="true"><rect x="1" y="1" width="20" height="10" rx="3" fill="none" stroke="currentColor" stroke-width="1.2"/><path d="M23 4v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><rect x="3" y="3" width="15" height="6" rx="1.5" fill="currentColor"/></svg>
            </span>
          </div>
          <div class="phone-frame">
            <main class="app-scroll aq-quiz-page">
              <header class="quiz-page-nav">
                <button class="quiz-back" id="btn-exit" type="button" aria-label="閫€鍑虹瓟棰?>鈥?/button>
                <p>AQ 閫嗗晢娴嬭瘎</p>
                <span aria-hidden="true"></span>
              </header>
              <section class="quiz-progress" aria-label="绛旈杩涘害">
                <p id="progress"><span>1</span> / 3</p>
                <div class="quiz-progress__track" aria-hidden="true"><i id="progress-bar"></i></div>
              </section>
              <section class="quiz-card" aria-live="polite">
                <p class="quiz-card__label">璇锋牴鎹綘鐨勭湡瀹炴劅鍙椾綔绛?/p>
                <h1 id="question-title"></h1>
                <div class="quiz-options" id="quiz-options" role="radiogroup" aria-label="绛旀閫夐」"></div>
              </section>
              <p class="quiz-timer">绱鐢ㄦ椂 <strong>00 : 15 : 30</strong></p>
            </main>
            <footer class="quiz-footer quiz-footer--answer">
              <button class="btn-secondary" id="btn-prev" type="button">涓婁竴棰?/button>
              <button class="btn-primary quiz-submit" id="btn-submit" type="button" hidden>鎻愪氦 <span aria-hidden="true">鈫?/span></button>
            </footer>
            <div class="modal-mask" id="exit-modal" hidden>
              <div class="modal-card" role="dialog" aria-modal="true" aria-labelledby="exit-title" aria-describedby="exit-desc">
                <p class="modal-title" id="exit-title">纭畾瑕侀€€鍑烘祴璇勭瓟棰橈紵</p>
                <p class="modal-desc" id="exit-desc">閫€鍑哄悗浣滅瓟鍘嗗彶灏嗕笉浼氫繚瀛?/p>
                <div class="modal-actions">
                  <button type="button" id="exit-cancel">鍙栨秷</button>
                  <button type="button" id="exit-ok">纭畾</button>
                </div>
              </div>
            </div>
            <div class="ios-home-indicator"></div>
          </div>
        </div>
      </div>
    </div>
    <script src="js/device.js"></script>
    <script src="js/quiz.js"></script>
  </body>
</html>

```

## FILE: js/quiz.js
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

## FILE: css/quiz.css
```
/* AQ 骞撮緞椤典笌鍚庣画绛旈椤靛叡鐢ㄧ殑澶村浘鍖哄拰搴曢儴鎿嶄綔鍖?*/
.aq-age-page {
  --app-bg: #fff8f4;
  padding: 0 var(--space-page) 26px;
  background: linear-gradient(180deg, #fff1e9 0, #fff9f5 45%, #fff8f4 100%);
}

.quiz-header {
  position: relative;
  min-height: 306px;
  padding: 10px 4px 0;
  overflow: hidden;
}

.quiz-back {
  position: relative;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  color: #654b47;
  background: rgba(255, 255, 255, 0.68);
  box-shadow: 0 3px 10px rgba(183, 100, 74, 0.1);
  font-size: 32px;
  line-height: 20px;
  text-decoration: none;
  transition: transform var(--dur-fast) var(--ease-soft);
}

.quiz-back:active,
.btn-primary:active {
  transform: scale(0.97);
}

.quiz-header__eyebrow,
.quiz-header h1,
.quiz-header__hint {
  position: relative;
  z-index: 1;
}

.quiz-header__eyebrow {
  margin: 15px 0 4px;
  color: #d87359;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.8px;
}

.quiz-header h1 {
  margin: 0;
  color: #3e302e;
  font-size: 26px;
  line-height: 1.25;
  letter-spacing: 0.3px;
}

.quiz-header__hint {
  margin: 7px 0 0;
  color: #9b7770;
  font-size: 13px;
}

.aq-age-illustration {
  position: absolute;
  right: -7px;
  bottom: -3px;
  width: 330px;
  max-width: 93%;
  height: auto;
}

.age-card {
  position: relative;
  z-index: 2;
  margin: -16px 0 0;
  padding: 25px 21px 22px;
  border: 1px solid rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 12px 30px rgba(199, 111, 79, 0.13);
}

.age-card__kicker {
  margin: 0 0 6px;
  color: #df8b6e;
  font-size: 12px;
  font-weight: 700;
}

.age-card h2 {
  margin: 0;
  color: #3f3331;
  font-size: 22px;
  line-height: 1.3;
}

.age-card > p:not(.age-card__kicker):not(.age-card__note) {
  margin: 9px 0 18px;
  color: var(--color-text-secondary);
  font-size: 13px;
  line-height: 1.6;
}

.age-input {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) 24px;
  align-items: center;
  min-height: 54px;
  padding: 0 14px;
  border: 1.5px solid #f3d8ce;
  border-radius: var(--radius-pill);
  background: #fffaf7;
  transition: border-color var(--dur-fast) var(--ease-soft), box-shadow var(--dur-fast) var(--ease-soft);
}

.age-input:focus-within {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(255, 138, 101, 0.12);
}

.age-input__icon {
  color: #e89072;
  font-size: 21px;
  transform: rotate(-25deg);
}

.age-input input {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  outline: 0;
  color: var(--color-text);
  background: transparent;
  font: inherit;
  font-size: 15px;
}

.age-input input::-webkit-inner-spin-button,
.age-input input::-webkit-outer-spin-button {
  appearance: none;
  margin: 0;
}

.age-input input::placeholder {
  color: #bda9a2;
}

.age-input__unit {
  color: #9c7d75;
  font-size: 14px;
  text-align: right;
}

.age-card__note {
  margin: 10px 3px 0;
  color: #b3938a;
  font-size: 11px;
}

.quiz-footer {
  flex: 0 0 auto;
  padding: 12px 16px 28px;
  background: rgba(255, 248, 244, 0.93);
  box-shadow: 0 -8px 24px rgba(216, 142, 114, 0.07);
}

.btn-primary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 52px;
  border-radius: var(--radius-btn);
  color: #fff;
  background: linear-gradient(100deg, #ff986f, #ff7854);
  box-shadow: 0 8px 16px rgba(248, 111, 74, 0.26);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.2px;
  text-decoration: none;
  transition: transform var(--dur-fast) var(--ease-soft);
}

.btn-primary span {
  font-size: 18px;
  font-weight: 400;
}

/* AQ 绛旈椤?*/
.aq-quiz-page {
  --app-bg: #fff8f4;
  padding: 0 var(--space-page) 22px;
  background:
    radial-gradient(circle at 86% 2%, rgba(255, 193, 156, 0.42), transparent 24%),
    linear-gradient(180deg, #fff1e9 0, #fff9f5 42%, #fff8f4 100%);
}

.quiz-page-nav {
  display: grid;
  grid-template-columns: 34px 1fr 34px;
  align-items: center;
  padding: 11px 4px 4px;
}

.quiz-page-nav p {
  margin: 0;
  color: #765753;
  font-size: 14px;
  font-weight: 700;
  text-align: center;
}

.quiz-page-nav .quiz-back {
  border: 0;
  cursor: pointer;
  font-family: inherit;
}

.quiz-progress {
  margin: 19px 5px 24px;
}

.quiz-progress p {
  margin: 0 0 10px;
  color: #97736d;
  font-size: 14px;
  font-weight: 600;
  text-align: right;
}

.quiz-progress p span {
  color: var(--color-primary-strong);
  font-size: 21px;
  font-weight: 800;
  vertical-align: -1px;
}

.quiz-progress__track {
  height: 7px;
  overflow: hidden;
  border-radius: var(--radius-pill);
  background: #f5ddd3;
}

.quiz-progress__track i {
  display: block;
  width: 33.333%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #ffaf8c, #ff7955);
  transition: width var(--dur-fast) var(--ease-soft);
}

.quiz-card {
  padding: 25px 20px 22px;
  border: 1px solid rgba(255, 255, 255, 0.92);
  border-radius: var(--radius-card);
  background: rgba(255, 255, 255, 0.96);
  box-shadow: var(--shadow-card);
}

.quiz-card__label {
  margin: 0 0 9px;
  color: #dc8b70;
  font-size: 12px;
  font-weight: 700;
}

.quiz-card h1 {
  margin: 0 0 22px;
  color: #413432;
  font-size: 20px;
  line-height: 1.55;
  letter-spacing: 0.1px;
}

.quiz-options {
  display: grid;
  gap: 11px;
}

.quiz-option {
  display: grid;
  grid-template-columns: 27px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 52px;
  padding: 12px 15px;
  border: 1.5px solid transparent;
  border-radius: 18px;
  color: #765e59;
  background: #fff8f5;
  cursor: pointer;
  font: inherit;
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
  overflow-wrap: anywhere;
  transition: border-color var(--dur-fast) var(--ease-soft), background var(--dur-fast) var(--ease-soft), color var(--dur-fast) var(--ease-soft), transform var(--dur-fast) var(--ease-soft);
}

.quiz-option:active {
  transform: scale(0.985);
}

.quiz-option__mark {
  display: grid;
  place-items: center;
  width: 27px;
  height: 27px;
  border-radius: 50%;
  color: #ae9289;
  background: #f2e4de;
  font-size: 12px;
  font-weight: 800;
}

.quiz-option.is-active {
  border-color: #ffae91;
  color: #dd6849;
  background: var(--color-option-active-bg);
}

.quiz-option.is-active .quiz-option__mark {
  color: #fff;
  background: var(--color-primary);
}

.quiz-timer {
  margin: 20px 0 0;
  color: #a48b84;
  font-size: 12px;
  text-align: center;
}

.quiz-timer strong {
  margin-left: 5px;
  color: #8b6d66;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}

.quiz-footer--answer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 12px;
}

.btn-secondary {
  min-height: 52px;
  border: 1.5px solid #f0c7b8;
  border-radius: var(--radius-btn);
  color: #d57458;
  background: #fff9f6;
  cursor: pointer;
  font: inherit;
  font-size: 16px;
  font-weight: 700;
}

.btn-secondary:disabled {
  border-color: #eee5e1;
  color: #cdbdb7;
  background: #f5f1ef;
  cursor: not-allowed;
}

.quiz-submit[hidden] {
  display: none;
}

.modal-mask[hidden] {
  display: none;
}

.modal-mask {
  display: grid;
  place-items: center;
  padding: 24px;
}

.modal-card {
  width: min(100%, 310px);
  overflow: hidden;
  border-radius: 22px;
  background: #fff;
  box-shadow: 0 18px 40px rgba(79, 46, 38, 0.24);
  text-align: center;
}

.modal-title {
  margin: 29px 20px 9px;
  color: #382e2c;
  font-size: 18px;
  font-weight: 800;
}

.modal-desc {
  margin: 0 20px 25px;
  color: #9d8983;
  font-size: 13px;
}

.modal-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid #f0e7e3;
}

.modal-actions button {
  min-height: 52px;
  border: 0;
  color: #8e7972;
  background: #fff;
  cursor: pointer;
  font: inherit;
  font-size: 16px;
}

.modal-actions button + button {
  border-left: 1px solid #f0e7e3;
  color: var(--color-primary-strong);
  font-weight: 800;
}

```

