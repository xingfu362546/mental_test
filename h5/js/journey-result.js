/**
 * H5 人生旅程结果页
 *
 * 逻辑注释（产品口径）：
 * 1) 不向用户展示后台模式类型名；展示 frontTheme（参与者呈现主题）。
 *    patternId / name 仍写入进度供智能体使用。
 * 2) 每人仅可测试一次，不提供重新测试；结果页用「去6Q超级爸妈查看更多测评」替代用尽/重测按钮。
 *    进度仍按「授权手机号」维度落库。
 * 3) 「分享转发」= 转发微信小程序卡片（参考会话里小程序分享卡：顶栏名称/图标、标题 title、封面 imageUrl、底栏「小程序」）；
 *    正式对接 onShareAppMessage / open-type=share，返回 { title, path, imageUrl }；
 *    本 H5 原型仅 toast 占位，不走系统分享链接。
 * 4) 留资（H5-v1.0.4）：非危机完整解读后、分享/CTA 前；自愿选填+提交；
 *    方向单选「亲子沟通/情绪管理/伴侣关系/其他」，默认第一项；称呼单选「先生/女士」，默认先生；勾「其他」必填自由文；
 *    手机必填，可预填授权号可改；未填手机不可提交；
 *    用途一句+提交即同意联系；成功 toast + localStorage +「已收到」锁定；
 *    危机态（journeyRiskPayload.risk_flag）整块隐藏；随单仅兴趣+手机，不绑测评上下文。
 *
 * ——— 实现 / 验收清单（交付对照，与 docs/FEATURES.md H5-v1.0.4 同步）———
 * [ ] F240 区块位置：解读区之后、分享/去超级爸妈之前
 * [ ] F241 危机态：risk_flag=true 时 #jh-lead 不展示（演示按钮可验）
 * [ ] F242 方向单选 +「其他」展开；称呼单选；placeholder 为关心的课程/方向；勾其他未填不可提
 * [ ] F243 手机必填，可预填 session.phoneE164、可改；须 11 位 1 开头
 * [ ] F244 未填手机不可提；方向/称呼默认选中第一项
 * [ ] F245 成功 toast + localStorage(journey_lead_v1) + 按钮「已收到，谢谢你」只读
 * [ ] F246 再进结果页恢复已提交态；footer CTA 仍可点；不写 patternId/frontTheme
 */
(function () {
  const isDemo = /(?:^|[?&])demo=1(?:&|$)/.test(location.search);

  /**
   * 版本清单直达：写入模拟会话与旅程数据，跳过授权/引导/成图。
   * 仅 ?demo=1 时生效，正式扫码入口不受影响。
   */
  function seedDemo() {
    const phone = "13800138000";
    const session = {
      authorized: true,
      userId: "phone_" + phone,
      phoneE164: phone,
      phoneMasked: "138****8000",
      phoneSource: "wechat",
      loginAt: new Date().toISOString(),
    };
    try {
      sessionStorage.setItem("xinhua_h5_session", JSON.stringify(session));
      sessionStorage.removeItem("journeyRiskPayload");
      sessionStorage.setItem(
        "journeyPayload",
        JSON.stringify({
          figures: ["向导", "孩子", "伴侣", "自己"],
          extras: ["营地", "小路"],
          userText:
            "我和孩子走在前面，伴侣在侧后方，向导举着旗。路边有营地和一条往前的小路，天气很晴。",
          imageUrl: "../assets/journey/journey-compose-demo.png",
          description:
            "画面里四位旅伴沿小路前行：你和孩子靠得较近，伴侣略在侧后，向导在前方举旗。营地在路旁，整体光线明亮。此为演示编造的旅程描述。",
          patternId: "j04",
        })
      );
    } catch (e) {}
    return session;
  }

  const session = isDemo
    ? seedDemo()
    : window.H5Auth && window.H5Auth.requireLogin("login.html");
  if (!session) return;

  const patterns = window.JourneyPatterns || [];
  const imgEl = document.getElementById("jh-compose-img");
  const descEl = document.getElementById("jh-desc");
  const nameEl = document.getElementById("jh-name");
  const themeEl = document.getElementById("jh-theme");
  const arrangeEl = document.getElementById("jh-arrange");
  const posEl = document.getElementById("jh-positive");
  const watchEl = document.getElementById("jh-watch");
  const fbEl = document.getElementById("jh-feedback");

  const fallbackImage = "../assets/journey/journey-compose-demo.png";
  const fallbackDesc =
    "\u6a21\u578b\u5c06\u4f60\u753b\u677f\u4e0a\u7684\u65c5\u4f34\u4e0e\u98ce\u666f\u4e32\u8054\u6210\u4e00\u5e45\u5b8c\u6574\u65c5\u9014\uff08\u539f\u578b\u56fa\u5b9a\u6f14\u793a\u56fe\uff09\u3002";
  const fallbackPatternId = "j04";

  // 小程序转发卡片字段（对齐 onShareAppMessage；封面正式应用测评/活动海报）
  const MP_SHARE = {
    title: "\u5fc3\u753b\u6d4b\u8bc4\u00b7\u4eba\u751f\u65c5\u7a0b",
    path: "/pages/journey/entry",
    imageUrl: "",
  };

  let payload = null;
  try {
    payload = JSON.parse(sessionStorage.getItem("journeyPayload") || "null");
  } catch (e) {}

  const saved = window.H5Progress.get(session);
  const imageUrl = (payload && payload.imageUrl) || saved.imageUrl || fallbackImage;
  const description =
    (payload && payload.description) || saved.description || saved.lockedDesc || fallbackDesc;
  const patternId = (payload && payload.patternId) || saved.patternId || fallbackPatternId;

  imgEl.src = imageUrl;
  descEl.textContent = description;

  function stripTypeName(text) {
    if (!text) return text;
    return String(text).replace(/\u300c[^\u300d]+\u300d/g, "\u8fd9\u6bb5\u65c5\u7a0b\u5b89\u6392");
  }

  function render(id) {
    const p = patterns.find((x) => x.id === id) || patterns[0];
    if (!p) return;
    // 前台：只展示参与者呈现主题；后台类型名隐藏
    if (themeEl) {
      themeEl.textContent = p.frontTheme || "旅程中的探索主题";
      themeEl.setAttribute("data-pattern-id", p.id || id);
    }
    if (nameEl) {
      nameEl.textContent = "";
      nameEl.hidden = true;
      nameEl.setAttribute("data-pattern-id", p.id || id);
      nameEl.setAttribute("data-pattern-name", p.name || "");
    }
    arrangeEl.textContent = p.arrange || "\u2014";
    posEl.textContent = p.positive || "\u2014";
    watchEl.textContent = p.watch || "\u2014";
    fbEl.textContent =
      p.feedbackNoType ||
      stripTypeName(p.feedback) ||
      "\u7ed3\u5408\u4f60\u7684\u5b8c\u6574\u65c5\u7a0b\u56fe\u4e0e\u63cf\u8ff0\uff0c\u53ef\u4ee5\u5bf9\u7167\u4e0b\u9762\u7684\u63a2\u7d22\u7ebf\u7d22\uff0c\u518d\u7ed3\u5408\u771f\u5b9e\u611f\u53d7\u4e0e\u751f\u6d3b\u6838\u5b9e\u3002\u8fd9\u4e0d\u662f\u5fc3\u7406\u8bca\u65ad\u3002";
  }

  render(patternId);

  window.H5Progress.set(session, {
    status: "completed",
    lockedDesc: saved.lockedDesc || (payload && payload.userText) || "",
    imageUrl: imageUrl,
    patternId: patternId,
    description: description,
    genCount: saved.genCount || 1,
    retestCount: saved.retestCount || 0,
  });

  const btnShare = document.getElementById("h5-share");
  if (btnShare) {
    btnShare.addEventListener("click", () => {
      void MP_SHARE;
      SixQDevice.toast(
        "\u8bf7\u4f7f\u7528\u5c0f\u7a0b\u5e8f\u300c\u8f6c\u53d1\u300d\u5206\u4eab\u7ed9\u597d\u53cb\uff08\u539f\u578b\u5360\u4f4d\uff09"
      );
    });
  }

  /* ——— 留资 ——— */
  const LEAD_KEY = "journey_lead_v1";
  const leadRoot = document.getElementById("jh-lead");
  const surnameInput = document.getElementById("jh-lead-surname");
  const titleWrap = document.getElementById("jh-lead-titles");
  const chipWrap = document.getElementById("jh-lead-chips");
  const otherWrap = document.getElementById("jh-lead-other");
  const otherInput = document.getElementById("jh-lead-other-text");
  const phoneInput = document.getElementById("jh-lead-phone");
  const errEl = document.getElementById("jh-lead-error");
  const btnSubmit = document.getElementById("jh-lead-submit");
  const btnDemoCrisis = document.getElementById("jh-lead-demo-crisis");
  const thanksEl = document.getElementById("jh-lead-thanks");

  function readRiskFlag() {
    try {
      const risk = JSON.parse(sessionStorage.getItem("journeyRiskPayload") || "null");
      return !!(risk && risk.risk_flag);
    } catch (e) {
      return false;
    }
  }

  function readLead() {
    try {
      const raw = localStorage.getItem(LEAD_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !data.submittedAt) return null;
      return data;
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
    // 强制重启动画
    void errEl.offsetWidth;
    errEl.classList.add("is-shake");
  }

  function selectedTags() {
    if (!chipWrap) return [];
    return Array.prototype.map
      .call(chipWrap.querySelectorAll(".jh-lead__chip.is-on"), function (el) {
        return el.getAttribute("data-tag") || "";
      })
      .filter(Boolean);
  }

  function selectedTitle() {
    if (!titleWrap) return "";
    const on = titleWrap.querySelector(".jh-lead__chip.is-on");
    return on ? on.getAttribute("data-title") || "" : "";
  }

  function setChipOn(chip, on) {
    chip.classList.toggle("is-on", on);
    chip.setAttribute("aria-pressed", on ? "true" : "false");
  }

  /** 同一组内只保留当前项（单选） */
  function selectOnly(wrap, chip, attr) {
    Array.prototype.forEach.call(wrap.querySelectorAll(".jh-lead__chip"), function (el) {
      setChipOn(el, el === chip);
    });
    void attr;
  }

  function syncOtherVisibility() {
    const on = selectedTags().indexOf("其他") >= 0;
    if (otherWrap) {
      otherWrap.classList.toggle("is-open", on);
      otherWrap.setAttribute("aria-hidden", on ? "false" : "true");
    }
    if (!on && otherInput && !leadRoot.classList.contains("is-done")) {
      otherInput.value = "";
    }
  }

  function applyDone(data) {
    if (!leadRoot || !btnSubmit) return;
    leadRoot.classList.add("is-done");
    leadRoot.hidden = false;
    if (titleWrap) {
      Array.prototype.forEach.call(titleWrap.querySelectorAll(".jh-lead__chip"), function (chip) {
        setChipOn(chip, chip.getAttribute("data-title") === (data.title || ""));
      });
    }
    if (chipWrap) {
      Array.prototype.forEach.call(chipWrap.querySelectorAll(".jh-lead__chip"), function (chip) {
        const tag = chip.getAttribute("data-tag");
        const on = (data.interests || []).indexOf(tag) >= 0;
        setChipOn(chip, on);
      });
    }
    syncOtherVisibility();
    if (surnameInput) {
      surnameInput.value = data.surname || "";
      surnameInput.readOnly = true;
    }
    if (otherInput) otherInput.value = data.otherText || "";
    if (phoneInput) {
      phoneInput.value = data.phone || "";
      phoneInput.readOnly = true;
    }
    if (otherInput) otherInput.readOnly = true;
    btnSubmit.textContent = "已收到，谢谢你";
    btnSubmit.disabled = true;
    if (thanksEl) thanksEl.hidden = false;
    showError("");
  }

  function selectFirst(wrap) {
    if (!wrap) return;
    const chips = wrap.querySelectorAll(".jh-lead__chip");
    if (!chips.length) return;
    const already = wrap.querySelector(".jh-lead__chip.is-on");
    if (already) return;
    selectOnly(wrap, chips[0]);
  }

  function applyIdle() {
    if (!leadRoot || !btnSubmit) return;
    leadRoot.classList.remove("is-done");
    leadRoot.hidden = false;
    selectFirst(titleWrap);
    selectFirst(chipWrap);
    syncOtherVisibility();
    if (phoneInput) {
      phoneInput.readOnly = false;
      if (!phoneInput.value && session.phoneE164) {
        phoneInput.value = String(session.phoneE164).replace(/\D/g, "").slice(-11);
      }
    }
    if (surnameInput) surnameInput.readOnly = false;
    if (otherInput) otherInput.readOnly = false;
    btnSubmit.textContent = "提交给我";
    btnSubmit.disabled = false;
    if (thanksEl) thanksEl.hidden = true;
  }

  function hideLead() {
    if (leadRoot) leadRoot.hidden = true;
  }

  function mountLead() {
    if (!leadRoot) return;
    if (readRiskFlag()) {
      hideLead();
      return;
    }
    const existing = readLead();
    if (existing) {
      applyDone(existing);
      return;
    }
    applyIdle();
  }

  if (titleWrap) {
    titleWrap.addEventListener("click", function (ev) {
      if (leadRoot.classList.contains("is-done")) return;
      const chip = ev.target.closest(".jh-lead__chip");
      if (!chip || !titleWrap.contains(chip)) return;
      selectOnly(titleWrap, chip, "data-title");
      showError("");
    });
  }

  if (chipWrap) {
    chipWrap.addEventListener("click", function (ev) {
      if (leadRoot.classList.contains("is-done")) return;
      const chip = ev.target.closest(".jh-lead__chip");
      if (!chip || !chipWrap.contains(chip)) return;
      selectOnly(chipWrap, chip, "data-tag");
      syncOtherVisibility();
      showError("");
      if (chip.getAttribute("data-tag") === "其他" && otherInput) {
        setTimeout(function () {
          otherInput.focus();
        }, 220);
      }
    });
  }

  if (btnSubmit) {
    btnSubmit.addEventListener("click", function () {
      if (leadRoot.classList.contains("is-done") || btnSubmit.disabled) return;

      const interests = selectedTags();
      const otherText = otherInput ? String(otherInput.value || "").trim() : "";
      const phone = phoneInput ? String(phoneInput.value || "").replace(/\D/g, "") : "";

      if (!phone) {
        showError("方便的话，请留下手机号，我们才能联系你");
        return;
      }
      if (!/^1\d{10}$/.test(phone)) {
        showError("手机号好像不太对，麻烦再看一眼");
        return;
      }
      if (interests.indexOf("其他") >= 0 && !otherText) {
        showError("选了「其他」的话，麻烦写一句你关心的方向");
        return;
      }

      const record = {
        version: 1,
        submittedAt: new Date().toISOString(),
        surname: surnameInput ? String(surnameInput.value || "").trim() : "",
        title: selectedTitle(),
        interests: interests,
        otherText: interests.indexOf("其他") >= 0 ? otherText : "",
        phone: phone,
      };
      writeLead(record);
      applyDone(record);
      SixQDevice.toast("收到了，谢谢。客服会在合适的时候联系你", 2200);
    });
  }

  if (btnDemoCrisis) {
    btnDemoCrisis.addEventListener("click", function () {
      try {
        sessionStorage.setItem(
          "journeyRiskPayload",
          JSON.stringify({
            risk_flag: true,
            stop_general_analysis: true,
            risk_categories: ["demo"],
            tip_body: "演示危机态：结果页应隐藏留资区",
          })
        );
      } catch (e) {}
      hideLead();
      SixQDevice.toast("已模拟危机态，留资已隐藏");
    });
  }

  mountLead();
})();
