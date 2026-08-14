### Task 4: 绛旈椤典笌鐘舵€佹満 `aq-quiz.html` + `quiz.js`

**Files:**
- Create: `6q_mental_test/aq-quiz.html`
- Create: `6q_mental_test/css/quiz.css`
- Create: `6q_mental_test/js/quiz.js`

**Interfaces:**
- Produces:
  - `SixQQuiz.QUESTIONS` 闀垮害 3
  - `SixQQuiz.getState()` 鈫?`{ index, answers: (number|null)[], total: 3 }`
  - `SixQQuiz.selectOption(i)` / `prev()` / `submit()` 鈫?`'ok' | 'need-answer' | 'goto-result'`
- Consumes: `SixQDevice.toast`

- [ ] **Step 1: 棰樺簱甯搁噺锛堝崰浣?3 棰橈級**

```js
const QUESTIONS = [
  {
    title: "浣犳湁娌℃湁鍦ㄥ钩甯哥殑瀛︿範/宸ヤ綔涓寰椾箯鍔涳紵",
    options: [
      "鍋跺皵浼氭湁锛屼絾鏄張鍙互鑷繁鍏嬫湇娑堝寲鍚告敹锛屽彲浠ュ澶氶敾鐐艰韩浣撱€傚ぉ澶╁紑蹇冨搱鍝?,
      "鍋跺皵浼氭湁锛屼絾鏄張鍙互鑷繁鍏嬫湇娑堝寲鍚告敹锛屽彲浠ュ澶氶敾鐐艰韩浣撱€傚ぉ澶╁紑蹇冨搱鍝?,
      "鏈変竴鐐逛箯鍔涳紝浣嗘槸鍙堝彲浠ヨ嚜宸卞厠鏈嶆秷鍖栧惛鏀讹紝鍙互澶氬閿荤偧韬綋",
      "鍋跺皵浼氭湁锛屼絾鏄張鍙互鑷繁鍏嬫湇娑堝寲鍚告敹锛屽彲浠ュ澶氶敾鐐艰韩浣撱€傚ぉ澶╁紑蹇冨搱鍝?,
      "浠庢病鏈夊彂鐢?
    ]
  },
  {
    title: "浣犳湁娌℃湁鍦ㄥ钩鏃剁殑瀛︿範/宸ヤ綔涓寰楀帇鍔涳紵",
    options: [
      "鏈変竴鐐?,
      "鍋跺皵浼氭湁锛屼絾鏄張鍙互鑷繁鍏嬫湇娑堝寲鍚告敹锛屽彲浠ュ澶氶敾鐐艰韩浣撱€傚ぉ澶╁紑蹇冨搱鍝?,
      "鍋跺皵浼氭湁",
      "浠庢病鏈夊彂鐢?,
      "浠庢病鏈夊彂鐢?
    ]
  },
  {
    title: "浣犳湁娌℃湁鍦ㄥ钩甯哥殑瀛︿範/宸ヤ綔涓寰椾箯鍔涳紵",
    options: [
      "鍋跺皵浼氭湁锛屼絾鏄張鍙互鑷繁鍏嬫湇娑堝寲鍚告敹锛屽彲浠ュ澶氶敾鐐艰韩浣撱€傚ぉ澶╁紑蹇冨搱鍝?,
      "鍋跺皵浼氭湁锛屼絾鏄張鍙互鑷繁鍏嬫湇娑堝寲鍚告敹锛屽彲浠ュ澶氶敾鐐艰韩浣撱€傚ぉ澶╁紑蹇冨搱鍝?,
      "鍋跺皵浼氭湁",
      "浠庢病鏈夊彂鐢?,
      "浠庢病鏈夊彂鐢?
    ]
  }
];
```

- [ ] **Step 2: 鐘舵€佹満鏍稿績**

```js
let index = 0;
const answers = [null, null, null];

function selectOption(optIndex) {
  answers[index] = optIndex;
  render();
  if (index < QUESTIONS.length - 1) {
    setTimeout(() => {
      index += 1;
      render();
    }, 180);
  }
}

function prev() {
  if (index <= 0) return;
  index -= 1;
  render();
}

function submit() {
  if (answers[index] == null) return "need-answer";
  return "goto-result";
}
```

- [ ] **Step 3: 娓叉煋 DOM**

- `#progress` 鈫?褰撳墠棰樺彿涓昏壊锛屽 `<span class=" Progressive">1</span> / 3`锛堟牱寮忥細褰撳墠鏁板瓧澶т笖姗欙級
- 棰樺共銆? 涓?pill 閫夐」锛涘凡閫夊姞 `.is-active`
- 鐢ㄦ椂鏉″浐瀹氭枃妗堬細`绱鐢ㄦ椂 00 : 15 : 30`
- 搴曟爮锛歚#btn-prev`锛坕ndex===0 鏃?`disabled`锛夛紱`#btn-submit` 浠?`index===2` 鏃舵樉绀?

- [ ] **Step 4: 閫€鍑哄脊绐?*

杩斿洖绠ご鎵撳紑 `#exit-modal`锛?

```html
<div class="modal-mask" id="exit-modal" hidden>
  <div class="modal-card" role="dialog">
    <p class="modal-title">纭畾瑕侀€€鍑烘祴璇勭瓟棰橈紵</p>
    <p class="modal-desc">閫€鍑哄悗浣滅瓟鍘嗗彶灏嗕笉浼氫繚瀛?/p>
    <div class="modal-actions">
      <button type="button" id="exit-cancel">鍙栨秷</button>
      <button type="button" id="exit-ok">纭畾</button>
    </div>
  </div>
</div>
```

纭畾 鈫?`location.href = 'index.html'`銆?

- [ ] **Step 5: 鎻愪氦**

```js
btnSubmit.onclick = () => {
  const r = submit();
  if (r === "need-answer") SixQDevice.toast("璇烽€夋嫨涓€椤?);
  else location.href = "aq-result.html";
};
```

- [ ] **Step 6: 鎵嬫祴娓呭崟**

1. 棰? 涓婁竴棰樼鐢? 
2. 閫夐鑷姩鍒伴2  
3. 棰? 鍑虹幇鎻愪氦  
4. 鏈€夋彁浜?toast  
5. 閫€鍑哄脊绐楁枃妗堟纭笖涓嶇┛妗? 
6. 闀块€夐」鎹㈣涓嶇牬甯冨眬  

---

