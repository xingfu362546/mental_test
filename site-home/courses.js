(function () {
  const entrySwitch = document.getElementById("entry-switch");
  if (entrySwitch && window.top !== window.self) {
    entrySwitch.hidden = true;
    document.documentElement.classList.add("in-frame");
  }

  const navToggle = document.getElementById("nav-toggle");
  const siteNav = document.getElementById("site-nav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      const open = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  const grid = document.getElementById("course-grid");
  const search = document.getElementById("course-search");
  const sort = document.getElementById("course-sort");
  const clearBtn = document.getElementById("course-clear");
  if (!grid) return;

  const cards = Array.prototype.slice.call(grid.querySelectorAll(".course-card"));
  const filters = Array.prototype.slice.call(document.querySelectorAll(".courses-filter input"));

  function apply() {
    const q = (search && search.value ? search.value : "").trim().toLowerCase();
    const cats = filters.filter(function (el) { return el.checked; }).map(function (el) { return el.value; });
    cards.forEach(function (card) {
      const name = card.getAttribute("data-name") || "";
      const cat = card.getAttribute("data-cat") || "";
      const hitQ = !q || name.indexOf(q) >= 0 || (card.textContent || "").toLowerCase().indexOf(q) >= 0;
      const hitCat = !cats.length || cats.indexOf(cat) >= 0;
      card.hidden = !(hitQ && hitCat);
    });
    if (sort && sort.value === "az") {
      const visible = cards.filter(function (c) { return !c.hidden; });
      visible.sort(function (a, b) {
        return (a.getAttribute("data-name") || "").localeCompare(b.getAttribute("data-name") || "");
      });
      visible.forEach(function (card) { grid.appendChild(card); });
    }
  }

  if (search) search.addEventListener("input", apply);
  filters.forEach(function (el) { el.addEventListener("change", apply); });
  if (sort) sort.addEventListener("change", apply);
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      filters.forEach(function (el) { el.checked = false; });
      if (search) search.value = "";
      apply();
    });
  }

  const filterToggle = document.getElementById("filter-toggle");
  const side = document.getElementById("courses-side");
  if (filterToggle && side) {
    filterToggle.addEventListener("click", function () {
      const open = side.classList.toggle("is-open");
      filterToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
})();
