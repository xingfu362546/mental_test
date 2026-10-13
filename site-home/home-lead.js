/**
 * 官网首页复刻 · 留资
 * 口径对齐 H5-v1.0.4：自愿、兴趣多选+其他必填、手机可选校验、本地落库锁定。
 * 存储 key：journey_lead_home_v1（与 H5 结果页 key 分开，避免互相覆盖）
 */
(function () {
  const LEAD_KEY = "journey_lead_home_v1";
  const root = document.getElementById("home-lead");
  const surnameInput = document.getElementById("home-lead-surname");
  const titleWrap = document.getElementById("home-lead-titles");
  const chipWrap = document.getElementById("home-lead-chips");
  const otherWrap = document.getElementById("home-lead-other");
  const otherInput = document.getElementById("home-lead-other-text");
  const phoneInput = document.getElementById("home-lead-phone");
  const errEl = document.getElementById("home-lead-error");
  const btnSubmit = document.getElementById("home-lead-submit");
  const thanksEl = document.getElementById("home-lead-thanks");

  if (!root || !btnSubmit) return;

  function toast(msg) {
    let el = document.querySelector(".home-toast");
    if (!el) {
      el = document.createElement("div");
      el.className = "home-toast";
      document.body.appendChild(el);
      const style = document.createElement("style");
      style.textContent =
        ".home-toast{position:fixed;left:50%;bottom:28px;transform:translateX(-50%) translateY(12px);opacity:0;z-index:99;padding:12px 18px;border-radius:999px;background:rgba(40,28,24,.88);color:#fff;font-size:14px;pointer-events:none;transition:opacity .2s ease,transform .2s ease}.home-toast.is-show{opacity:1;transform:translateX(-50%) translateY(0)}";
      document.head.appendChild(style);
    }
    el.textContent = msg;
    el.classList.add("is-show");
    clearTimeout(el._t);
    el._t = setTimeout(function () {
      el.classList.remove("is-show");
    }, 2200);
  }

  function readLead() {
    try {
      const data = JSON.parse(localStorage.getItem(LEAD_KEY) || "null");
      return data && data.submittedAt ? data : null;
    } catch (e) {
      return null;
    }
  }

  function writeLead(data) {
    localStorage.setItem(LEAD_KEY, JSON.stringify(data));
  }

  function showError(msg) {
    if (!errEl) return;
    if (!msg) {
      errEl.hidden = true;
      errEl.textContent = "";
      errEl.classList.remove("is-shake");
      return;
    }
    errEl.hidden = false;
    errEl.textContent = msg;
    errEl.classList.remove("is-shake");
    void errEl.offsetWidth;
    errEl.classList.add("is-shake");
  }

  function selectedTags() {
    return Array.prototype.map
      .call(chipWrap.querySelectorAll(".home-lead__chip.is-on"), function (el) {
        return el.getAttribute("data-tag") || "";
      })
      .filter(Boolean);
  }

  function selectedTitle() {
    if (!titleWrap) return "";
    const on = titleWrap.querySelector(".home-lead__chip.is-on");
    return on ? on.getAttribute("data-title") || "" : "";
  }

  function setChipOn(chip, on) {
    chip.classList.toggle("is-on", on);
    chip.setAttribute("aria-pressed", on ? "true" : "false");
  }

  function selectOnly(wrap, chip) {
    Array.prototype.forEach.call(wrap.querySelectorAll(".home-lead__chip"), function (el) {
      setChipOn(el, el === chip);
    });
  }

  function syncOtherVisibility() {
    const on = selectedTags().indexOf("其他") >= 0;
    otherWrap.classList.toggle("is-open", on);
    otherWrap.setAttribute("aria-hidden", on ? "false" : "true");
    if (!on && otherInput && !root.classList.contains("is-done")) {
      otherInput.value = "";
    }
  }

  function applyDone(data) {
    root.classList.add("is-done");
    if (titleWrap) {
      Array.prototype.forEach.call(titleWrap.querySelectorAll(".home-lead__chip"), function (chip) {
        setChipOn(chip, chip.getAttribute("data-title") === (data.title || ""));
      });
    }
    Array.prototype.forEach.call(chipWrap.querySelectorAll(".home-lead__chip"), function (chip) {
      setChipOn(chip, (data.interests || []).indexOf(chip.getAttribute("data-tag")) >= 0);
    });
    syncOtherVisibility();
    if (surnameInput) {
      surnameInput.value = data.surname || "";
      surnameInput.readOnly = true;
    }
    if (otherInput) {
      otherInput.value = data.otherText || "";
      otherInput.readOnly = true;
    }
    if (phoneInput) {
      phoneInput.value = data.phone || "";
      phoneInput.readOnly = true;
    }
    btnSubmit.textContent = "已收到，谢谢你";
    btnSubmit.disabled = true;
    if (thanksEl) thanksEl.hidden = false;
    showError("");
  }

  function applyIdle() {
    root.classList.remove("is-done");
    if (surnameInput) surnameInput.readOnly = false;
    if (otherInput) otherInput.readOnly = false;
    if (phoneInput) phoneInput.readOnly = false;
    btnSubmit.textContent = "提交给我";
    btnSubmit.disabled = false;
    if (thanksEl) thanksEl.hidden = true;
  }

  if (titleWrap) {
    titleWrap.addEventListener("click", function (ev) {
      if (root.classList.contains("is-done")) return;
      const chip = ev.target.closest(".home-lead__chip");
      if (!chip || !titleWrap.contains(chip)) return;
      selectOnly(titleWrap, chip);
      showError("");
    });
  }

  chipWrap.addEventListener("click", function (ev) {
    if (root.classList.contains("is-done")) return;
    const chip = ev.target.closest(".home-lead__chip");
    if (!chip || !chipWrap.contains(chip)) return;
    selectOnly(chipWrap, chip);
    syncOtherVisibility();
    showError("");
    if (chip.getAttribute("data-tag") === "其他" && otherInput) {
      setTimeout(function () {
        otherInput.focus();
      }, 220);
    }
  });

  btnSubmit.addEventListener("click", function () {
    if (root.classList.contains("is-done") || btnSubmit.disabled) return;
    const interests = selectedTags();
    const otherText = String((otherInput && otherInput.value) || "").trim();
    const phone = String((phoneInput && phoneInput.value) || "").replace(/\D/g, "");

    if (!interests.length && !phone) {
      showError("兴趣或手机留一项就好；现在也可以先跳过");
      return;
    }
    if (interests.indexOf("其他") >= 0 && !otherText) {
      showError("选了「其他」的话，麻烦写一句你关心的方向");
      return;
    }
    if (phone && !/^1\d{10}$/.test(phone)) {
      showError("手机号好像不太对，麻烦再看一眼");
      return;
    }

    const record = {
      version: 1,
      source: "6qedu-home-proto",
      submittedAt: new Date().toISOString(),
      surname: surnameInput ? String(surnameInput.value || "").trim() : "",
      title: selectedTitle(),
      interests: interests,
      otherText: interests.indexOf("其他") >= 0 ? otherText : "",
      phone: phone,
    };
    writeLead(record);
    applyDone(record);
    toast("收到了，谢谢。客服会在合适的时候联系你");
  });

  const existing = readLead();
  if (existing) applyDone(existing);
  else applyIdle();
})();
