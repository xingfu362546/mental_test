### Task 2: 娴嬭瘎棣栭〉 `index.html`

**Files:**
- Create: `6q_mental_test/index.html`
- Create: `6q_mental_test/css/home.css`
- Create: `6q_mental_test/js/home.js`

**Interfaces:**
- Consumes: `SixQDevice.toast`锛涙満妗嗗３
- Produces: AQ 鍗￠摼鎺?`aq-age.html`锛沗.js-stub` 鐐瑰嚮 toast

- [ ] **Step 1: 鎼缓椤甸潰澹?+ 瀵艰埅**

缁撴瀯锛歚ios-device` 鈫?status bar锛?:41锛夆啋 `phone-frame` 鈫?`app-scroll` 鍐咃細nav锛堣繑鍥炲彲 `history.back` 鎴?noop锛? 鏍囬銆?Q娴嬭瘎銆?銆屾垜鐨勬祴璇勩€峴tub銆?

- [ ] **Step 2: 6Q 瀹牸**

`display:grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap:12px;`  
鍏崱锛欰Q/IQ/SQ/CQ/EQ/RQ锛屽悇妯悜娓愬彉 + 姘村嵃瀛楁瘝銆備粎 AQ锛歚<a class="q-card q-card--aq" href="aq-age.html">`锛涘叾浣?`button.q-card.js-stub`銆?

娓愬彉鍙傝€冿細

```css
.q-card--aq { background: linear-gradient(90deg, #ff6b5b, #ff9a7a); }
.q-card--iq { background: linear-gradient(90deg, #4a90e2, #7eb6f7); }
.q-card--sq { background: linear-gradient(90deg, #8b6bff, #b39bff); }
.q-card--cq { background: linear-gradient(90deg, #2f9e6f, #6fd6a6); }
.q-card--eq { background: linear-gradient(90deg, #e85a8c, #f3a0c0); }
.q-card--rq { background: linear-gradient(90deg, #f0a040, #f6c86a); }
```

- [ ] **Step 3: 浜斿垎绫诲浘鏍囪 + 蹇冪敾鍖哄潡**

浜旂瓑鍒?flex锛涘績鐢荤櫧鍗＄墖鍐?3 鏉°€屾剰璇嗘姇褰便€嶅垪琛?+銆屾煡鐪嬫洿澶氥€? 鍙充笅瑙?SVG mascot銆傚垪琛ㄣ€岀珛鍗虫祴璇曘€嶄笌鍒嗙被鍧囦负 `.js-stub`銆?

- [ ] **Step 4: `home.js` 缁戝畾 stub**

```js
document.querySelectorAll(".js-stub").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    SixQDevice.toast("鍗冲皢寮€鏀?);
  });
});
```

- [ ] **Step 5: 娴忚鍣ㄦ墦寮€楠岃瘉**

鎵撳紑 `index.html`锛氬鏍间笉婧㈠嚭锛涚偣 IQ toast锛涚偣 AQ 杩涘勾榫勯〉銆?

---

