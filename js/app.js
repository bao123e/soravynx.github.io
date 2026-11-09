/* SoraVynx storefront — vanilla JS, no analytics, no automatic payment or key issuing. */
"use strict";
(() => {
  const plans = Object.freeze({
    week: { name: "7 ngày", price: 29000, days: 7 },
    month: { name: "1 tháng", price: 79000, days: 30 },
    year: { name: "1 năm", price: 499000, days: 365 },
    lifetime: { name: "Vĩnh viễn", price: 999000, days: 99999 },
  });
  const CART = "soravynx.cart.v1",
    ORDERS = "soravynx.orders.v1";
  const money = (n) => new Intl.NumberFormat("vi-VN").format(n) + "đ";
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => Array.from(root.querySelectorAll(s));
  let storageOK = true,
    memory = {};
  // Web Storage module: validate persisted values and degrade safely if blocked.
  function read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      storageOK = false;
      return memory[key] || fallback;
    }
  }
  function write(key, value) {
    memory[key] = value;
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      storageOK = false;
      storageNotice();
      return false;
    }
  }
  function storageNotice() {
    const el = $("#storage-warning");
    if (el) el.hidden = storageOK;
    $$(".local-note").forEach((el) => {
      if (!storageOK)
        el.textContent =
          "Trình duyệt không cho lưu dữ liệu. Sao chép hoặc tải nội dung trước khi đóng trang.";
    });
  }
  function cart() {
    const value = read(CART, []);
    return Array.isArray(value)
      ? [...new Set(value.filter((k) => Object.hasOwn(plans, k)))].slice(0, 4)
      : [];
  }
  function orders() {
    const value = read(ORDERS, []);
    return Array.isArray(value)
      ? value
          .filter(
            (o) =>
              o &&
              typeof o.id === "string" &&
              o.id.length < 80 &&
              typeof o.discord === "string" &&
              o.discord.length <= 80 &&
              typeof o.note === "string" &&
              o.note.length <= 1000 &&
              typeof o.date === "string" &&
              !Number.isNaN(Date.parse(o.date)) &&
              Array.isArray(o.items) &&
              o.items.length > 0 &&
              o.items.length <= 4 &&
              o.items.every((k) => Object.hasOwn(plans, k)),
          )
          .slice(0, 30)
      : [];
  }
  let toastTimer;
  function toast(msg) {
    const el = $(".toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("visible"), 3300);
  }
  function count() {
    const value = cart().length;
    $$(".cart-count").forEach((el) => (el.textContent = String(value)));
    $$(".cart-link").forEach((el) =>
      el.setAttribute("aria-label", "Giỏ hàng, " + value + " gói key"),
    );
  }
  // Keep clipboard writes tied to a deliberate click. Legacy fallback supports file://.
  async function copy(text) {
    try {
      if (!navigator.clipboard) throw new Error("clipboard unavailable");
      await navigator.clipboard.writeText(text);
      toast("Đã sao chép. Dán nội dung vào Discord để gửi.");
      return;
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "");
      el.style.position = "fixed";
      el.style.left = "-9999px";
      document.body.append(el);
      el.select();
      let ok = false;
      try {
        ok = document.execCommand("copy");
      } catch {}
      el.remove();
      toast(
        ok
          ? "Đã sao chép. Dán nội dung vào Discord để gửi."
          : "Không thể sao chép tự động. Hãy chọn và sao chép nội dung đang hiển thị.",
      );
    }
  }
  function add(key) {
    if (!Object.hasOwn(plans, key)) return;
    const list = cart();
    if (list.includes(key)) {
      toast("Gói " + plans[key].name + " đã có trong giỏ hàng.");
      return;
    }
    list.push(key);
    write(CART, list);
    count();
    toast("Đã thêm gói " + plans[key].name + ". Mở giỏ hàng để tạo yêu cầu.");
  }
  $$("[data-add]").forEach((el) =>
    el.addEventListener("click", () => add(el.dataset.add)),
  );
  $$("[data-copy]").forEach((el) =>
    el.addEventListener("click", () => copy(el.dataset.copy)),
  );
  count();
  // Accessible collapsible mobile navigation.
  const menu = $(".menu-toggle");
  menu?.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Đóng menu" : "Mở menu");
    $("#main-nav").classList.toggle("open", open);
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu?.getAttribute("aria-expanded") === "true") {
      menu.click();
      menu.focus();
    }
  });
  // Product preview is illustrative and does not send commands to a game.
  const previewData = {
    player: [
      "God Mode",
      "Damage Multiplier",
      "No Cooldown",
      "Unlimited Energy",
      "Mob Vacuum",
    ],
    event: ["No Cooldown (R)", "Unlimited Energy (R)", "Score Multiplier"],
  };
  function switchPreview(button) {
    const root = button.closest(".tool-preview");
    $$(".preview-tab", root).forEach((el) => {
      const active = el === button;
      el.classList.toggle("active", active);
      el.setAttribute("aria-selected", String(active));
      el.tabIndex = active ? 0 : -1;
    });
    const panel = $(".preview-rows", root);
    panel.replaceChildren();
    panel.setAttribute(
      "aria-label",
      "Tính năng " + (button.dataset.preview === "player" ? "Player" : "Event"),
    );
    previewData[button.dataset.preview].forEach((label, i) => {
      const row = document.createElement("div");
      row.className = "preview-row";
      row.append(document.createTextNode(label));
      const status = document.createElement("span");
      status.className = "preview-toggle" + (!i ? " on" : "");
      status.textContent = i ? "OFF" : "ON";
      row.append(status);
      panel.append(row);
    });
  }
  $$(".preview-tab").forEach((button) => {
    button.addEventListener("click", () => switchPreview(button));
    button.addEventListener("keydown", (e) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
      e.preventDefault();
      const tabs = $$(".preview-tab", button.closest(".tool-preview"));
      const next =
        e.key === "Home"
          ? tabs[0]
          : e.key === "End"
            ? tabs.at(-1)
            : tabs[(tabs.indexOf(button) + 1) % tabs.length];
      next.focus();
      switchPreview(next);
    });
  });
  // Key plan choice on the detail page.
  $$("[data-choice]").forEach((button) =>
    button.addEventListener("click", () => {
      const key = button.dataset.choice,
        plan = plans[key];
      $$("[data-choice]").forEach((el) =>
        el.setAttribute("aria-pressed", String(el === button)),
      );
      $("#selected-price").textContent = money(plan.price);
      $("#selected-duration").textContent = "/ " + plan.name;
      $("#detail-add").dataset.add = key;
    }),
  );
  // Search and sorting operate on the same published catalog, not remote data.
  const search = $("#plan-search"),
    sort = $("#plan-sort");
  const normalize = (s) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d");
  function filter() {
    if (!search) return;
    const query = normalize(search.value.trim());
    let visible = 0;
    const cards = $$("[data-plan-card]");
    cards.forEach((el) => {
      const p = plans[el.dataset.planCard];
      el.hidden = !normalize(
        "SoraVynx Stella Sora Windows " + p.name + " " + money(p.price),
      ).includes(query);
      if (!el.hidden) visible++;
    });
    cards
      .sort((a, b) =>
        sort.value === "price-desc"
          ? Number(b.dataset.price) - Number(a.dataset.price)
          : sort.value === "price-asc"
            ? Number(a.dataset.price) - Number(b.dataset.price)
            : Number(a.dataset.duration) - Number(b.dataset.duration),
      )
      .forEach((el) => $("#plan-grid").append(el));
    $("#filter-count").textContent = visible + " gói key";
    $("#no-results").hidden = visible > 0;
  }
  search?.addEventListener("input", filter);
  sort?.addEventListener("change", filter);
  $("#reset-search")?.addEventListener("click", () => {
    search.value = "";
    filter();
    search.focus();
  });
  // Render cart without inserting user-controlled HTML.
  function renderCart() {
    if (!$("#cart-items")) return;
    const keys = cart(),
      empty = !keys.length;
    $("#cart-empty").hidden = !empty;
    $("#checkout-content").hidden = empty;
    $("#cart-items").replaceChildren();
    $("#summary-lines").replaceChildren();
    keys.forEach((key) => {
      const plan = plans[key],
        item = document.createElement("article");
      item.className = "cart-item";
      const image = document.createElement("img");
      image.src = "images/brand.webp";
      image.alt = "";
      image.width = 60;
      image.height = 60;
      const main = document.createElement("div");
      main.className = "cart-item-main";
      const title = document.createElement("h2");
      title.textContent = "SoraVynx · " + plan.name;
      const desc = document.createElement("p");
      desc.textContent = "Stella Sora / Windows · 1 key";
      const price = document.createElement("span");
      price.className = "item-price";
      price.textContent = money(plan.price);
      main.append(title, desc, price);
      const remove = document.createElement("button");
      remove.className = "remove-item";
      remove.setAttribute("aria-label", "Xóa gói " + plan.name);
      remove.textContent = "×";
      remove.addEventListener("click", () => {
        write(
          CART,
          cart().filter((k) => k !== key),
        );
        renderCart();
        count();
        toast("Đã xóa gói " + plan.name + " khỏi giỏ hàng.");
      });
      item.append(image, main, remove);
      $("#cart-items").append(item);
      const row = document.createElement("div");
      row.className = "summary-row";
      const n = document.createElement("span"),
        v = document.createElement("span");
      n.textContent = "Gói " + plan.name;
      v.textContent = money(plan.price);
      row.append(n, v);
      $("#summary-lines").append(row);
    });
    $("#cart-total").textContent = money(
      keys.reduce((total, k) => total + plans[k].price, 0),
    );
    storageNotice();
  }
  renderCart();
  function report(order) {
    return (
      "SORAVYNX — YÊU CẦU ĐẶT KEY\nMã: " +
      order.id +
      "\nNgày tạo: " +
      new Date(order.date).toLocaleString("vi-VN") +
      "\nDiscord khách: " +
      order.discord +
      "\nNền tảng: Windows / Stella Sora\n" +
      order.items
        .map((k) => "• " + plans[k].name + " — " + money(plans[k].price))
        .join("\n") +
      "\nTổng giá niêm yết: " +
      money(order.items.reduce((n, k) => n + plans[k].price, 0)) +
      "\nGhi chú: " +
      (order.note || "Không có") +
      "\n\nNhờ @vsc.plus xác nhận tương thích, giá, cách thanh toán và thời điểm tính hạn.\nBản nháp chưa gửi / chưa thanh toán / chưa cấp key."
    );
  }
  function download(text, id) {
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = id + ".txt";
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  let lastOrder = null;
  $("#checkout-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    const discord = $("#customer-discord").value.trim();
    if (discord.length < 2) {
      $("#customer-discord").setCustomValidity(
        "Nhập tên Discord có ít nhất 2 ký tự.",
      );
      $("#customer-discord").reportValidity();
      return;
    }
    const items = cart();
    if (!items.length) {
      renderCart();
      return;
    }
    const random = new Uint32Array(1);
    crypto.getRandomValues(random);
    lastOrder = {
      id:
        "SV-" +
        Date.now().toString(36).toUpperCase() +
        "-" +
        random[0].toString(36).slice(0, 4).toUpperCase(),
      date: new Date().toISOString(),
      discord,
      note: $("#order-note").value.trim(),
      items,
    };
    write(ORDERS, [lastOrder, ...orders()].slice(0, 30));
    write(CART, []);
    count();
    $("#checkout-content").hidden = true;
    $("#cart-empty").hidden = true;
    $("#order-success").hidden = false;
    $("#order-report").textContent = report(lastOrder);
    storageNotice();
    $("#order-success").scrollIntoView({ block: "start" });
  });
  $("#customer-discord")?.addEventListener("input", (e) =>
    e.target.setCustomValidity(""),
  );
  $("#copy-order")?.addEventListener(
    "click",
    () => lastOrder && copy(report(lastOrder)),
  );
  $("#download-order")?.addEventListener(
    "click",
    () => lastOrder && download(report(lastOrder), lastOrder.id),
  );
  // Locally saved drafts intentionally never show a fabricated payment status.
  function renderOrders() {
    if (!$("#orders-list")) return;
    const list = orders(),
      root = $("#orders-list");
    root.replaceChildren();
    $("#orders-empty").hidden = !!list.length;
    $("#orders-actions").hidden = !list.length;
    list.forEach((order) => {
      const card = document.createElement("article");
      card.className = "order-card";
      const title = document.createElement("h2");
      title.textContent = order.id;
      const status = document.createElement("span");
      status.className = "order-status";
      status.textContent = "Bản nháp · Chưa xác nhận";
      const date = document.createElement("p");
      date.textContent = new Date(order.date).toLocaleString("vi-VN");
      const body = document.createElement("pre");
      body.className = "report-box";
      body.textContent = report(order);
      const actions = document.createElement("div");
      actions.className = "actions";
      const c = document.createElement("button");
      c.className = "btn small secondary";
      c.textContent = "Sao chép yêu cầu";
      c.addEventListener("click", () => copy(report(order)));
      const d = document.createElement("button");
      d.className = "btn small secondary";
      d.textContent = "Tải bản yêu cầu";
      d.addEventListener("click", () => download(report(order), order.id));
      actions.append(c, d);
      card.append(title, status, date, body, actions);
      root.append(card);
    });
    storageNotice();
  }
  renderOrders();
  let clearing = false;
  $("#clear-orders")?.addEventListener("click", (e) => {
    if (!clearing) {
      clearing = true;
      e.target.textContent = "Bấm lần nữa để xác nhận xóa lịch sử";
      return;
    }
    write(ORDERS, []);
    renderOrders();
    toast("Đã xóa bản nháp trên trình duyệt này.");
  });
  // Practical HTML5 form module: build a support message without silently sending it.
  $("#support-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    const message = $("#support-message").value.trim();
    if (message.length < 10) {
      $("#support-message").setCustomValidity(
        "Mô tả cần ít nhất 10 ký tự có nội dung.",
      );
      $("#support-message").reportValidity();
      return;
    }
    $("#support-report").textContent =
      "SORAVYNX — HỖ TRỢ\nChủ đề: " +
      $("#support-topic").value +
      "\nMã yêu cầu: " +
      ($("#support-order").value.trim() || "Chưa có") +
      "\nNội dung: " +
      message +
      "\n\nGửi đến Discord @vsc.plus.";
    $("#support-result").hidden = false;
  });
  $("#support-message")?.addEventListener("input", (e) =>
    e.target.setCustomValidity(""),
  );
  $("#copy-support")?.addEventListener("click", () =>
    copy($("#support-report").textContent),
  );
  window.addEventListener("storage", (e) => {
    if (e.key === CART) {
      count();
      renderCart();
    }
    if (e.key === ORDERS) renderOrders();
  });
  // Canvas module: lightweight responsive star map, static to respect reduced motion.
  const canvas = $("#starfield");
  function stars() {
    if (!canvas) return;
    const box = canvas.getBoundingClientRect(),
      scale = Math.min(devicePixelRatio || 1, 2);
    canvas.width = box.width * scale;
    canvas.height = box.height * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(scale, scale);
    let seed = 19;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    for (let i = 0; i < 55; i++) {
      const x = rnd() * box.width,
        y = rnd() * box.height,
        r = rnd() > 0.9 ? 1.5 : 0.7;
      ctx.fillStyle = i % 5 ? "#a4d1ba66" : "#dfc394";
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  stars();
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(stars, 150);
  });
})();
