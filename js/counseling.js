/**
 * 心理咨询预约演示
 * 入口：结果页 → counseling-profile → counseling-booking
 * from=xinhua|journey 用于返回来源解读页
 */
(function () {
  function qs(name) {
    try {
      return new URLSearchParams(location.search).get(name);
    } catch (e) {
      return null;
    }
  }

  function resultHref() {
    const from = qs("from") || sessionStorage.getItem("counselingFrom") || "xinhua";
    if (from === "journey") return "journey-result.html";
    return "xinhua-result.html";
  }

  function rememberFrom() {
    const from = qs("from");
    if (from) {
      try {
        sessionStorage.setItem("counselingFrom", from);
      } catch (e) {}
    }
  }

  function withFrom(url) {
    const from = qs("from") || sessionStorage.getItem("counselingFrom") || "";
    if (!from) return url;
    return url + (url.indexOf("?") >= 0 ? "&" : "?") + "from=" + encodeURIComponent(from);
  }

  rememberFrom();

  const back = document.getElementById("cs-back");
  if (back) {
    back.setAttribute("href", resultHref());
  }

  const bookNow = document.getElementById("cs-book-now");
  if (bookNow) {
    bookNow.setAttribute("href", withFrom("counseling-booking.html"));
  }

  const backBooking = document.getElementById("cs-back-booking");
  if (backBooking) {
    backBooking.setAttribute("href", withFrom("counseling-profile.html"));
  }

  document.querySelectorAll(".js-stub").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      window.SixQDevice && SixQDevice.toast("即将开放");
    });
  });

  // —— 预约详情逻辑 ——
  const calModal = document.getElementById("cs-cal-modal");
  const personModal = document.getElementById("cs-person-modal");
  if (!calModal && !personModal) return;

  const timePick = document.getElementById("cs-time-pick");
  const personPick = document.getElementById("cs-person-pick");
  const calGrid = document.getElementById("cs-cal-grid");
  const openCal = document.getElementById("cs-open-cal");
  const closeCal = document.getElementById("cs-cal-close");
  const confirmCal = document.getElementById("cs-cal-confirm");
  const openPerson = personPick;
  const closePerson = document.getElementById("cs-person-close");
  const confirmPerson = document.getElementById("cs-person-confirm");
  const submitBtn = document.getElementById("cs-submit");

  let selectedDay = null;
  let pendingDay = null;
  let selectedPerson = null;
  let pendingPerson = null;

  // 2026-08：1 号是周六 → 网格从周日开始，前空 6 格；今日按截图为 12 不可选
  const TODAY = 12;
  const DISABLED_UNTIL = 12;

  function renderCalendar() {
    if (!calGrid) return;
    calGrid.innerHTML = "";
    const lead = 6; // Aug 1 2026 is Saturday → 6 blanks if week starts Sunday
    for (let i = 0; i < lead; i++) {
      const empty = document.createElement("div");
      calGrid.appendChild(empty);
    }
    for (let d = 1; d <= 31; d++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cs-day";
      const disabled = d <= DISABLED_UNTIL;
      if (disabled) btn.classList.add("is-disabled");
      if (d === TODAY) btn.classList.add("is-today");
      if (pendingDay === d) btn.classList.add("is-selected");
      btn.innerHTML =
        "<b>" +
        d +
        "</b><small>" +
        (d === TODAY ? "今 · 不可选" : disabled ? "不可选" : "—") +
        "</small>";
      if (!disabled) {
        btn.addEventListener("click", () => {
          pendingDay = d;
          renderCalendar();
        });
      }
      calGrid.appendChild(btn);
    }
  }

  function openModal(el) {
    if (el) el.hidden = false;
  }
  function closeModal(el) {
    if (el) el.hidden = true;
  }

  if (openCal) {
    openCal.addEventListener("click", () => {
      pendingDay = selectedDay;
      renderCalendar();
      openModal(calModal);
    });
  }
  if (timePick) {
    timePick.addEventListener("click", () => {
      pendingDay = selectedDay;
      renderCalendar();
      openModal(calModal);
    });
  }
  if (closeCal) closeCal.addEventListener("click", () => closeModal(calModal));
  if (confirmCal) {
    confirmCal.addEventListener("click", () => {
      if (!pendingDay) {
        window.SixQDevice && SixQDevice.toast("请选择可约日期");
        return;
      }
      selectedDay = pendingDay;
      timePick.textContent = "2026/08/" + String(selectedDay).padStart(2, "0") + "（演示时段可再约）";
      timePick.classList.add("is-filled");
      closeModal(calModal);
    });
  }

  if (openPerson) {
    openPerson.addEventListener("click", () => {
      pendingPerson = selectedPerson;
      document.querySelectorAll("#cs-person-list button").forEach((b) => {
        b.classList.toggle("is-on", b.getAttribute("data-name") === pendingPerson);
      });
      openModal(personModal);
    });
  }
  if (closePerson) closePerson.addEventListener("click", () => closeModal(personModal));

  document.querySelectorAll("#cs-person-list button").forEach((b) => {
    b.addEventListener("click", () => {
      pendingPerson = b.getAttribute("data-name");
      document.querySelectorAll("#cs-person-list button").forEach((x) => {
        x.classList.toggle("is-on", x === b);
      });
    });
  });

  if (confirmPerson) {
    confirmPerson.addEventListener("click", () => {
      if (!pendingPerson) {
        window.SixQDevice && SixQDevice.toast("请选择服务对象");
        return;
      }
      selectedPerson = pendingPerson;
      personPick.textContent = "服务对象：" + selectedPerson;
      personPick.classList.add("is-filled");
      closeModal(personModal);
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", () => {
      if (!selectedDay) {
        window.SixQDevice && SixQDevice.toast("请先选择预约时间");
        return;
      }
      if (!selectedPerson) {
        window.SixQDevice && SixQDevice.toast("请先选择服务对象");
        return;
      }
      window.SixQDevice &&
        SixQDevice.toast("预约已提交（原型 mock，未支付）");
      setTimeout(() => {
        location.href = resultHref();
      }, 700);
    });
  }

  renderCalendar();
})();
