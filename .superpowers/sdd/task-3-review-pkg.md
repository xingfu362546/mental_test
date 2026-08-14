# Task 3 Review Package

## FILE: aq-age.html
```
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>AQ 閫嗗晢娴嬭瘎锝滃～鍐欏勾榫?/title>
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
            <main class="app-scroll aq-age-page">
              <header class="quiz-header aq-age-header">
                <a class="quiz-back" href="index.html" aria-label="杩斿洖棣栭〉">鈥?/a>
                <p class="quiz-header__eyebrow">AQ 閫嗗晢娴嬭瘎</p>
                <h1>鍏堣璇嗕竴涓嬩綘</h1>
                <p class="quiz-header__hint">杩欎竴灏忔锛屼細璁╃粨鏋滄洿璐磋繎浣?/p>
                <svg class="aq-age-illustration" viewBox="0 0 360 218" role="img" aria-label="Q 浠斿湪涔︽灦鏃侀槄璇?>
                  <path d="M21 194h318" stroke="#e9a084" stroke-width="4" stroke-linecap="round"/>
                  <path d="M31 54v140M112 75v119M283 52v142M331 85v109" stroke="#d98770" stroke-width="5" stroke-linecap="round"/>
                  <path d="M19 82h96M19 132h96M281 82h58M281 132h58" stroke="#d98770" stroke-width="5" stroke-linecap="round"/>
                  <rect x="36" y="59" width="18" height="20" rx="3" fill="#ffc469"/><rect x="58" y="48" width="19" height="31" rx="3" fill="#9ed4c4"/><rect x="81" y="57" width="24" height="22" rx="3" fill="#f59d81"/>
                  <rect x="36" y="108" width="27" height="21" rx="3" fill="#a9c3ec"/><rect x="67" y="98" width="16" height="31" rx="3" fill="#f5b865"/><rect x="87" y="106" width="18" height="23" rx="3" fill="#cba5dd"/>
                  <rect x="291" y="57" width="17" height="22" rx="3" fill="#f5a986"/><rect x="312" y="45" width="17" height="34" rx="3" fill="#a9cfe0"/><rect x="292" y="105" width="24" height="24" rx="3" fill="#ffd16f"/><rect x="320" y="96" width="12" height="33" rx="3" fill="#9bcbbf"/>
                  <circle cx="190" cy="106" r="60" fill="#ffb189"/>
                  <path d="M150 127c0-42 18-69 42-69 23 0 42 24 42 58 0 25-10 47-27 58l16 16-15 13-18-19c-24-1-40-24-40-57Z" fill="#ff835f"/>
                  <path d="M164 86c8-11 19-16 31-16 16 0 27 8 34 19" fill="none" stroke="#fff1e9" stroke-width="7" stroke-linecap="round"/>
                  <ellipse cx="192" cy="112" rx="23" ry="25" fill="#fff8f3"/>
                  <circle cx="194" cy="114" r="8" fill="#5c4b4a"/><circle cx="197" cy="111" r="2.5" fill="#fff"/>
                  <path d="M176 141c9 6 20 7 29 1" fill="none" stroke="#704d4a" stroke-width="3.5" stroke-linecap="round"/>
                  <path d="m147 150 33-21 13 35-29 20Z" fill="#fff7ee" stroke="#db806a" stroke-width="3" stroke-linejoin="round"/>
                  <path d="m193 164 28-25 22 30-30 18Z" fill="#ffe0a0" stroke="#db806a" stroke-width="3" stroke-linejoin="round"/>
                  <path d="M173 144 190 163M207 150l19 19" stroke="#db806a" stroke-width="2"/>
                  <circle cx="132" cy="69" r="7" fill="#ffd36b"/><path d="m129 69 6 0m-3-3v6" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
                  <circle cx="250" cy="105" r="5" fill="#a7d9c7"/><circle cx="244" cy="61" r="4" fill="#f7b18e"/>
                </svg>
              </header>

              <section class="age-card" aria-labelledby="age-title">
                <p class="age-card__kicker">寮€濮嬪墠鐨勫皬闂</p>
                <h2 id="age-title">浣犵殑骞撮緞鏄紵</h2>
                <p>涓轰簡娴嬭瘯缁撴灉鐨勫噯纭€э紝璇疯緭鍏ユ偍鐨勫勾榫勶細</p>
                <label class="age-input" for="age-input">
                  <span class="age-input__icon" aria-hidden="true">鈱?/span>
                  <input id="age-input" type="number" inputmode="numeric" min="1" placeholder="璇疯緭鍏ユ偍鐨勫勾榫? aria-describedby="age-note" />
                  <span class="age-input__unit">宀?/span>
                </label>
                <p class="age-card__note" id="age-note">閫夊～锛屽彲鐩存帴寮€濮嬫祴璇?/p>
              </section>
            </main>
            <footer class="quiz-footer">
              <a class="btn-primary" id="btn-start" href="aq-quiz.html">寮€濮嬬瓟棰?<span aria-hidden="true">鈫?/span></a>
            </footer>
            <div class="ios-home-indicator"></div>
          </div>
        </div>
      </div>
    </div>
    <script src="js/device.js"></script>
    <script>
      document.getElementById("btn-start").addEventListener("click", (event) => {
        const age = document.getElementById("age-input").value.trim();
        if (age) event.currentTarget.href = "aq-quiz.html?age=" + encodeURIComponent(age);
      });
    </script>
  </body>
</html>

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

```

