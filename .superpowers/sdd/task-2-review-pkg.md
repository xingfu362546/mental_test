# Task 2 Review Package (working tree)

## FILE: index.html
```
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>6Q 娴嬭瘎</title>
    <link rel="stylesheet" href="css/tokens.css" />
    <link rel="stylesheet" href="css/ios-device.css" />
    <link rel="stylesheet" href="css/app.css" />
    <link rel="stylesheet" href="css/home.css" />
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
            <main class="app-scroll home-page">
              <nav class="home-nav" aria-label="椤甸潰瀵艰埅">
                <button class="nav-back js-stub" type="button" aria-label="杩斿洖">鈥?/button>
                <h1>6Q 娴嬭瘎</h1>
                <button class="nav-link js-stub" type="button">鎴戠殑娴嬭瘎</button>
              </nav>

              <section class="home-hero" aria-labelledby="hero-title">
                <p class="eyebrow">璁よ瘑鑷繁锛屼粠杩欎竴鍒诲紑濮?/p>
                <h2 id="hero-title">鍙戠幇浣犵殑澶氬厓娼滆兘</h2>
                <p>鐢?6 涓淮搴︼紝鐪嬭鏇村畬鏁寸殑浣?/p>
                <span class="hero-orb hero-orb--one"></span>
                <span class="hero-orb hero-orb--two"></span>
              </section>

              <section class="q-grid" aria-label="6Q 娴嬭瘎鍏ュ彛">
                <a class="q-card q-card--aq" href="aq-age.html">
                  <span class="q-card__watermark">AQ</span><span class="q-card__label">閫嗗晢</span><span class="q-card__desc">闈㈠鎸戞垬鐨勫姏閲?/span><span class="q-card__arrow">鈫?/span>
                </a>
                <button class="q-card q-card--iq js-stub" type="button">
                  <span class="q-card__watermark">IQ</span><span class="q-card__label">鏅哄晢</span><span class="q-card__desc">鎬濈淮涓庢帹鐞嗚兘鍔?/span><span class="q-card__arrow">鈫?/span>
                </button>
                <button class="q-card q-card--sq js-stub" type="button">
                  <span class="q-card__watermark">SQ</span><span class="q-card__label">鐏靛晢</span><span class="q-card__desc">鍐呭湪瑙夊療涓庢剰涔?/span><span class="q-card__arrow">鈫?/span>
                </button>
                <button class="q-card q-card--cq js-stub" type="button">
                  <span class="q-card__watermark">CQ</span><span class="q-card__label">鍒涘晢</span><span class="q-card__desc">鍒涢€犱笌绐佺牬鑳藉姏</span><span class="q-card__arrow">鈫?/span>
                </button>
                <button class="q-card q-card--eq js-stub" type="button">
                  <span class="q-card__watermark">EQ</span><span class="q-card__label">鎯呭晢</span><span class="q-card__desc">鐞嗚В鎯呯华涓庡叧绯?/span><span class="q-card__arrow">鈫?/span>
                </button>
                <button class="q-card q-card--rq js-stub" type="button">
                  <span class="q-card__watermark">RQ</span><span class="q-card__label">闊у晢</span><span class="q-card__desc">鎸佺画鎴愰暱鐨勯煣鎬?/span><span class="q-card__arrow">鈫?/span>
                </button>
              </section>

              <section class="category-row" aria-label="娴嬭瘎鍒嗙被">
                <button class="category js-stub" type="button"><span>鈱?/span>鑷垜鎺㈢储</button>
                <button class="category js-stub" type="button"><span>鈾?/span>娼滆兘鍙戝睍</button>
                <button class="category js-stub" type="button"><span>鈽?/span>鎯呯华鍏崇郴</button>
                <button class="category js-stub" type="button"><span>鈱?/span>鎴愰暱杩涢樁</button>
                <button class="category js-stub" type="button"><span>路路路</span>鍏ㄩ儴</button>
              </section>

              <section class="mind-card" aria-labelledby="mind-title">
                <div class="mind-card__copy">
                  <p class="section-kicker">蹇冪敾涓撳尯</p>
                  <h2 id="mind-title">鎰忚瘑鎶曞奖</h2>
                  <p>璺熼殢鐩磋锛岀敾鍑烘鍒荤殑蹇冩儏</p>
                  <button class="mind-card__action js-stub" type="button">绔嬪嵆娴嬭瘯</button>
                </div>
                <svg class="mind-mascot" viewBox="0 0 110 110" aria-hidden="true">
                  <circle cx="55" cy="55" r="45" fill="#ffe5d8"/>
                  <path d="M27 55c0-21 12-34 28-34s28 13 28 34-12 34-28 34S27 76 27 55Z" fill="#ff9d76"/>
                  <path d="M40 51c3-5 8-5 11 0M60 51c3-5 8-5 11 0" fill="none" stroke="#754b45" stroke-width="3" stroke-linecap="round"/>
                  <path d="M45 65c6 5 14 5 20 0" fill="none" stroke="#754b45" stroke-width="3" stroke-linecap="round"/>
                  <path d="M38 29c3-11 25-16 34 0-8-4-25-4-34 0Z" fill="#7c5a86"/>
                  <circle cx="26" cy="37" r="6" fill="#ffd067"/><path d="m25 31 2 12m-7-5 12-2" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
              </section>

              <section class="projection-list" aria-label="鎰忚瘑鎶曞奖鎺ㄨ崘">
                <button class="projection-item js-stub" type="button"><span class="projection-item__icon">鈼?/span><span><strong>鎴戠殑鎯呯华澶╂皵</strong><small>鎹曟崏浠婂ぉ鐨勫唴蹇冪姸鎬?/small></span><b>鈥?/b></button>
                <button class="projection-item js-stub" type="button"><span class="projection-item__icon">鉁?/span><span><strong>蹇冧腑鐨勫皬瀹囧畽</strong><small>鎺㈢储浣犵殑鎯宠薄涓庤兘閲?/small></span><b>鈥?/b></button>
                <button class="more-link js-stub" type="button">鏌ョ湅鏇村 <span>鈫?/span></button>
              </section>
            </main>
            <div class="ios-home-indicator"></div>
          </div>
        </div>
      </div>
    </div>
    <script src="js/device.js"></script>
    <script src="js/home.js"></script>
  </body>
</html>

```

## FILE: css/home.css
```
.home-page {
  padding: 6px var(--space-page) 42px;
  background: linear-gradient(180deg, var(--color-bg-top), var(--color-bg-bottom));
}

.home-nav {
  height: 48px;
  display: grid;
  grid-template-columns: 72px 1fr 72px;
  align-items: center;
}

.home-nav h1 {
  margin: 0;
  text-align: center;
  font-size: 17px;
  font-weight: 700;
}

.nav-back,
.nav-link,
.category,
.projection-item,
.more-link {
  border: 0;
  font: inherit;
  color: inherit;
  background: transparent;
  cursor: pointer;
}

.nav-back {
  width: 32px;
  height: 32px;
  padding: 0;
  font-size: 32px;
  line-height: 24px;
  color: var(--color-text);
}

.nav-link {
  justify-self: end;
  padding: 5px 0;
  font-size: 13px;
  color: var(--color-primary-strong);
  white-space: nowrap;
}

.home-hero {
  position: relative;
  overflow: hidden;
  margin: 8px 0 14px;
  padding: 18px 20px;
  border-radius: var(--radius-card);
  color: #fff;
  background: linear-gradient(125deg, #ff9e7d, #ff7a68 52%, #ec6f87);
  box-shadow: 0 12px 24px rgba(237, 111, 105, 0.18);
}

.home-hero p,
.home-hero h2 {
  position: relative;
  z-index: 1;
}

.eyebrow {
  margin: 0 0 4px;
  font-size: 12px;
  opacity: 0.86;
}

.home-hero h2 {
  margin: 0;
  font-size: 23px;
  line-height: 1.3;
  letter-spacing: 0.4px;
}

.home-hero > p:last-of-type {
  margin: 7px 0 0;
  font-size: 13px;
  opacity: 0.88;
}

.hero-orb {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.16);
}

.hero-orb--one {
  width: 100px;
  height: 100px;
  top: -44px;
  right: -16px;
}

.hero-orb--two {
  width: 48px;
  height: 48px;
  right: 72px;
  bottom: -22px;
}

.q-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.q-card {
  position: relative;
  min-width: 0;
  min-height: 100px;
  overflow: hidden;
  display: block;
  padding: 17px 15px;
  border: 0;
  border-radius: 18px;
  color: #fff;
  text-align: left;
  text-decoration: none;
  font: inherit;
  box-shadow: 0 8px 16px rgba(73, 72, 93, 0.1);
  cursor: pointer;
  transition: transform var(--dur-fast) var(--ease-soft);
}

.q-card:active,
.mind-card__action:active,
.category:active,
.projection-item:active,
.more-link:active {
  transform: scale(0.97);
}

.q-card--aq { background: linear-gradient(90deg, #ff6b5b, #ff9a7a); }
.q-card--iq { background: linear-gradient(90deg, #4a90e2, #7eb6f7); }
.q-card--sq { background: linear-gradient(90deg, #8b6bff, #b39bff); }
.q-card--cq { background: linear-gradient(90deg, #2f9e6f, #6fd6a6); }
.q-card--eq { background: linear-gradient(90deg, #e85a8c, #f3a0c0); }
.q-card--rq { background: linear-gradient(90deg, #f0a040, #f6c86a); }

.q-card__watermark {
  position: absolute;
  right: 8px;
  bottom: -12px;
  font-size: 65px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -5px;
  color: rgba(255, 255, 255, 0.18);
}

.q-card__label,
.q-card__desc,
.q-card__arrow {
  position: relative;
  z-index: 1;
  display: block;
}

.q-card__label {
  font-size: 19px;
  font-weight: 700;
}

.q-card__desc {
  margin-top: 5px;
  font-size: 11px;
  white-space: nowrap;
  opacity: 0.88;
}

.q-card__arrow {
  margin-top: 9px;
  font-size: 15px;
}

.category-row {
  display: flex;
  justify-content: space-between;
  gap: 4px;
  margin: 20px -4px;
}

.category {
  flex: 1 1 0;
  min-width: 0;
  padding: 0 1px;
  font-size: 10px;
  line-height: 1.6;
  text-align: center;
  color: var(--color-text-secondary);
}

.category span {
  display: grid;
  place-items: center;
  width: 33px;
  height: 33px;
  margin: 0 auto 3px;
  border-radius: 12px;
  color: var(--color-primary-strong);
  background: #fff;
  box-shadow: 0 4px 10px rgba(255, 122, 69, 0.08);
  font-size: 16px;
}

.mind-card {
  position: relative;
  min-height: 155px;
  overflow: hidden;
  padding: 20px;
  border-radius: var(--radius-card);
  background: #fff;
  box-shadow: var(--shadow-card);
}

.mind-card__copy {
  position: relative;
  z-index: 1;
}

.section-kicker {
  margin: 0 0 5px;
  font-size: 12px;
  color: #cf8a72;
}

.mind-card h2 {
  margin: 0;
  font-size: 22px;
}

.mind-card__copy > p:not(.section-kicker) {
  margin: 7px 0 13px;
  font-size: 12px;
  color: var(--color-text-secondary);
}

.mind-card__action {
  padding: 8px 13px;
  border: 0;
  border-radius: var(--radius-pill);
  color: #fff;
  background: var(--color-primary-strong);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}

.mind-mascot {
  position: absolute;
  right: 8px;
  bottom: 4px;
  width: 122px;
  height: 122px;
}

.projection-list {
  margin-top: 12px;
  padding: 3px 14px 8px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.82);
}

.projection-item {
  width: 100%;
  display: grid;
  grid-template-columns: 38px minmax(0, 1fr) 18px;
  align-items: center;
  gap: 8px;
  padding: 11px 0;
  text-align: left;
}

.projection-item + .projection-item {
  border-top: 1px solid #f5e9e4;
}

.projection-item__icon {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 11px;
  color: #c87dcb;
  background: #f7ebfa;
  font-size: 19px;
}

.projection-item strong,
.projection-item small {
  display: block;
}

.projection-item strong {
  font-size: 13px;
  font-weight: 600;
}

.projection-item small {
  margin-top: 2px;
  font-size: 11px;
  color: var(--color-text-muted);
}

.projection-item b {
  font-size: 21px;
  font-weight: 400;
  color: #c8b5ad;
}

.more-link {
  width: 100%;
  padding: 7px 0 1px;
  color: var(--color-primary-strong);
  font-size: 12px;
}

.more-link span {
  margin-left: 3px;
}

```

## FILE: js/home.js
```
document.querySelectorAll(".js-stub").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    SixQDevice.toast("鍗冲皢寮€鏀?);
  });
});

```

