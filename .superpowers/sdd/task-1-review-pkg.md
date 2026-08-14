# Task 1 Review Package
Base: (empty tree) Head: working tree (no commits per plan)

## Parent .gitignore (tail)
```
oa-training-prototype/
member-benefits-prototype/
axhub-make/
scripts/
tools/
*.rar
*.zip
6q_mental_test/
```

## FILE: css/tokens.css
```
:root {
  --color-bg-top: #fff8f4;
  --color-bg-bottom: #ffede5;
  --color-primary: #ff8a65;
  --color-primary-strong: #ff7a45;
  --color-text: #333333;
  --color-text-secondary: #666666;
  --color-text-muted: #999999;
  --color-card: #ffffff;
  --color-option: #f5f5f5;
  --color-option-active-bg: #fff1eb;
  --radius-card: 22px;
  --radius-pill: 999px;
  --radius-btn: 12px;
  --shadow-card: 0 8px 24px rgba(255, 122, 69, 0.08);
  --space-page: 16px;
  --font-sans: "PingFang SC", "HarmonyOS Sans", "Noto Sans SC", "Microsoft YaHei", sans-serif;
  --ease-soft: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 180ms;
  --screen-w: 393px;
  --screen-h: 852px;
}

```

## FILE: css/ios-device.css
```
/* iPhone 15 Pro 椋庢牸棰勮澶栨锛?93脳852锛?*/
:root {
  --ios-shell: #1c1c1e;
  --ios-radius-outer: 55px;
  --ios-radius-inner: 47px;
}

body.app-body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px 40px;
  background: linear-gradient(165deg, #e8eaed 0%, #d1d5db 45%, #b8bcc4 100%);
}

.ios-device {
  flex-shrink: 0;
  filter: drop-shadow(0 28px 56px rgba(0, 0, 0, 0.28))
    drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12));
}

.ios-device__shell {
  position: relative;
  width: calc(var(--screen-w) + 24px);
  padding: 12px;
  background: linear-gradient(
    145deg,
    #3a3a3c 0%,
    var(--ios-shell) 18%,
    #0a0a0a 50%,
    var(--ios-shell) 82%,
    #48484a 100%
  );
  border-radius: var(--ios-radius-outer);
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.12),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.ios-device__btn {
  position: absolute;
  background: #3a3a3c;
  border-radius: 2px;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.4);
  z-index: 2;
}

.ios-device__btn--silent {
  left: -3px;
  top: 128px;
  width: 3px;
  height: 28px;
  border-radius: 2px 0 0 2px;
}

.ios-device__btn--vol-up {
  left: -3px;
  top: 178px;
  width: 3px;
  height: 52px;
  border-radius: 2px 0 0 2px;
}

.ios-device__btn--vol-down {
  left: -3px;
  top: 242px;
  width: 3px;
  height: 52px;
  border-radius: 2px 0 0 2px;
}

.ios-device__btn--power {
  right: -3px;
  top: 200px;
  width: 3px;
  height: 72px;
  border-radius: 0 2px 2px 0;
}

.ios-device__screen {
  position: relative;
  width: var(--screen-w);
  height: var(--screen-h);
  border-radius: var(--ios-radius-inner);
  overflow: hidden;
  background: #000;
  display: flex;
  flex-direction: column;
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.85);
}

.ios-status-bar {
  flex-shrink: 0;
  height: 54px;
  padding: 14px 28px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  z-index: 20;
  background: var(--app-bg, #f5f5f5);
  color: #000;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.3px;
}

.ios-status-bar__time {
  width: 54px;
  text-align: center;
  font-variant-numeric: tabular-nums;
}

.ios-status-bar__island {
  position: absolute;
  left: 50%;
  top: 11px;
  transform: translateX(-50%);
  width: 126px;
  height: 37px;
  background: #000;
  border-radius: 20px;
  z-index: 25;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.04);
}

.ios-status-bar__icons {
  display: flex;
  align-items: center;
  gap: 5px;
  width: 68px;
  justify-content: flex-end;
}

.ios-status-bar__icons svg {
  display: block;
}

.phone-frame {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  background: var(--color-bg-top);
}

.ios-home-indicator {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 134px;
  height: 5px;
  background: rgba(0, 0, 0, 0.28);
  border-radius: 3px;
  z-index: 30;
  pointer-events: none;
}

@media (max-height: 940px) {
  body.app-body {
    padding: 12px 8px 24px;
  }
  .ios-device {
    transform: scale(0.92);
    transform-origin: top center;
  }
}

@media (max-height: 860px) {
  .ios-device {
    transform: scale(0.85);
  }
}

```

## FILE: css/app.css
```
*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body.app-body {
  font-family: var(--font-sans);
  color: var(--color-text);
  -webkit-font-smoothing: antialiased;
}

.app-scroll {
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.toast {
  position: absolute;
  left: 50%;
  bottom: 72px;
  transform: translateX(-50%) translateY(8px);
  max-width: calc(100% - 32px);
  padding: 10px 16px;
  background: rgba(0, 0, 0, 0.78);
  color: #fff;
  font-size: 14px;
  line-height: 1.4;
  border-radius: var(--radius-btn);
  text-align: center;
  pointer-events: none;
  opacity: 0;
  z-index: 100;
  transition: opacity var(--dur-fast) var(--ease-soft),
    transform var(--dur-fast) var(--ease-soft);
}

.toast.is-show {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.modal-mask {
  position: absolute;
  inset: 0;
  z-index: 90;
  background: rgba(0, 0, 0, 0.45);
}

```

## FILE: js/device.js
```
window.SixQDevice = {
  toast(msg, ms = 1600) {
    const root = document.querySelector(".phone-frame") || document.body;
    let el = root.querySelector(".toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "toast";
      root.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("is-show");
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove("is-show"), ms);
  }
};

```

## FILE: README.md
```
# 6Q 娴嬭瘎 App 鍘熷瀷

鐙珛闈欐€佸師鍨嬪伐绋嬶紝澶嶅埢 6Q 娴嬭瘎 App 鍏抽敭椤甸潰锛堥椤?/ AQ 骞撮緞 / AQ 绛旈 / AQ 缁撴灉锛夈€?

## 濡備綍鎵撳紑

鐩存帴鐢ㄦ祻瑙堝櫒鎵撳紑浠ヤ笅 HTML锛堟帹鑽?Chrome / Edge锛夛細

| 椤甸潰 | 鏂囦欢 | 璇存槑 |
|------|------|------|
| 娴嬭瘎棣栭〉 | `index.html` | 6Q 瀹牸鍏ュ彛 |
| AQ 骞撮緞椤?| `aq-age.html` | 骞撮緞杈撳叆涓庡紑濮嬬瓟棰?|
| AQ 绛旈椤?| `aq-quiz.html` | 3 棰樼瓟棰樻祦绋?|
| AQ 缁撴灉椤?| `aq-result.html` | 婕旂ず鍒嗘暟涓庤В璇?|

涔熷彲鍦ㄩ」鐩牴鐩綍鍚姩鏈湴闈欐€佹湇鍔″悗璁块棶锛屼緥濡傦細

```bash
npx serve .
# 鎴?
python -m http.server 8080
```

## 涓昏矾寰?

```
index.html 鈫?aq-age.html 鈫?aq-quiz.html 鈫?aq-result.html
```

棣栭〉浠?**AQ** 鍗＄墖鍙繘鍏ュ畬鏁撮摼璺紱鍏朵綑鍏ュ彛锛圛Q/SQ/CQ/EQ/RQ銆佸垎绫汇€佸績鐢汇€併€屾垜鐨勬祴璇勩€嶇瓑锛塼oast銆屽嵆灏嗗紑鏀俱€嶃€?

## 鐩綍缁撴瀯

```
css/tokens.css      璁捐浠ょ墝锛堣壊 / 鍦嗚 / 闂磋窛 / 灞忓箷灏哄锛?
css/ios-device.css  iPhone 鏈烘锛?93脳852锛?
css/app.css         鍏ㄥ眬 reset銆佹粴鍔ㄥ尯銆乼oast銆佸脊灞傚簳搴?
js/device.js        SixQDevice.toast 绛夊叡鐢ㄥ伐鍏?
assets/             棰勭暀璧勬簮鐩綍
```

## Git

鏈瓙鐩綍涓虹嫭绔?git 鏍癸紱鐖朵粨搴?`testProject` 宸查€氳繃 `.gitignore` 蹇界暐鏈洰褰曘€?

```

## FILE: .gitignore
```
.DS_Store
Thumbs.db
*.log
.idea/
.vscode/

```

## FILE: assets/.gitkeep
```

```

