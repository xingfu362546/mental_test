### Task 3: 骞撮緞椤?`aq-age.html`

**Files:**
- Create: `6q_mental_test/aq-age.html`
- Extend: `css/quiz.css`锛堝勾榫?绛旈鍏辩敤澶村浘鍖猴級鎴?`css/home.css` 鏃佹柊寤烘钀戒簬 `quiz.css`

**Interfaces:**
- Produces: 銆屽紑濮嬬瓟棰樸€嶁啋 `aq-quiz.html`锛堜笉寮哄埗甯?age query锛涘彲閫?`?age=`锛?

- [ ] **Step 1: 澶村浘 SVG**

鏆栬壊鑳屾櫙 + 涔︽灦绾跨 + 鍗曠溂 Q 浠旀姳涔︼紝peek 鍦ㄧ櫧鍗＄墖涓婃柟銆?

- [ ] **Step 2: 鐧藉崱鐗囨枃妗?+ pill 杈撳叆**

鏂囨锛氥€屼负浜嗘祴璇曠粨鏋滅殑鍑嗙‘鎬э紝璇疯緭鍏ユ偍鐨勫勾榫勶細銆? 
placeholder锛氥€岃杈撳叆鎮ㄧ殑骞撮緞銆? 
`input type="number"` 鍙笉濉€?

- [ ] **Step 3: 搴曟爮涓绘寜閽?*

```html
<a class="btn-primary" id="btn-start" href="aq-quiz.html">寮€濮嬬瓟棰?/a>
```

鐐瑰嚮鏃惰嫢濉啓浜嗗勾榫勶紝鍙敤锛?

```js
document.getElementById("btn-start").addEventListener("click", (e) => {
  const age = document.getElementById("age-input").value.trim();
  if (age) e.currentTarget.href = "aq-quiz.html?age=" + encodeURIComponent(age);
});
```

涓嶆牎楠屽繀濉€?

- [ ] **Step 4: 瑙嗚楠岃瘉** 鈥?鍗＄墖灞呬腑銆佹寜閽笉璐?home indicator銆佹棤婧㈠嚭銆?

---

