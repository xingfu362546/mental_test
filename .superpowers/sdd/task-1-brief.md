### Task 1: 鑴氭墜鏋躲€侀殧绂讳笌璁捐浠ょ墝

**Files:**
- Create: `6q_mental_test/.gitignore`
- Create: `6q_mental_test/README.md`
- Create: `6q_mental_test/css/tokens.css`
- Create: `6q_mental_test/css/ios-device.css`
- Create: `6q_mental_test/css/app.css`
- Create: `6q_mental_test/js/device.js`
- Create: `6q_mental_test/assets/.gitkeep`
- Modify: `D:\Cursor\testProject\.gitignore`锛堣拷鍔?`6q_mental_test/`锛?
- Shell: `git init` inside `6q_mental_test` only

**Interfaces:**
- Produces: CSS 鍙橀噺 `--color-primary`, `--radius-card`, `--screen-w: 393px`, `--screen-h: 852px`锛沗window.SixQDevice.toast(msg)`锛涢〉闈㈠３ class锛歚.ios-device` > `.ios-device__screen` > `.phone-frame`

- [ ] **Step 1: 鍒濆鍖栧瓙浠撳苟蹇界暐浜庣埗浠?*

```bash
cd D:\Cursor\testProject\6q_mental_test
git init
```

鍦?`D:\Cursor\testProject\.gitignore` 鏈熬杩藉姞涓€琛岋紙鑻ヤ笉瀛樺湪鍒欏垱寤烘枃浠讹級锛?

```
6q_mental_test/
```

瀛愪粨 `.gitignore`锛?

```
.DS_Store
Thumbs.db
*.log
.idea/
.vscode/
```

- [ ] **Step 2: 鍐欏叆 `css/tokens.css`**

```css
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

- [ ] **Step 3: 鍐欏叆绮剧畝鐗?`css/ios-device.css`**

澶嶇敤 conference 鍘熷瀷鍏抽敭灏哄锛?93脳852銆佸妗嗗渾瑙?55/鍐?47锛夛紝`body.app-body` 灞呬腑鐏板簳锛沗.ios-device__screen { overflow: hidden; display:flex; flex-direction:column; }`锛沗.phone-frame { flex:1; min-height:0; overflow:hidden; position:relative; display:flex; flex-direction:column; }`銆?

- [ ] **Step 4: 鍐欏叆 `css/app.css` + `js/device.js`**

`app.css`锛歜ox-sizing reset锛沗.app-scroll { flex:1; min-height:0; overflow-x:hidden; overflow-y:auto; -webkit-overflow-scrolling:touch; }`锛沗.toast` 鍥哄畾鍦?`.phone-frame` 鍐呭簳閮紱`.modal-mask` absolute inset 0锛寊-index 楂樸€?

`device.js`锛?

```js
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

- [ ] **Step 5: 鍐?`README.md`锛堝浣曟墦寮€鍥涢〉銆佷富璺緞璇存槑锛?*

- [ ] **Step 6: 楠岃瘉闅旂**

```bash
cd D:\Cursor\testProject
git check-ignore -v 6q_mental_test/README.md
```

Expected: 杈撳嚭鏄剧ず琚?`6q_mental_test/` 瑙勫垯蹇界暐銆?

- [ ] **Step 7: 闃舵纭锛堜笉 commit锛岄櫎闈炵敤鎴疯姹傦級**

---

