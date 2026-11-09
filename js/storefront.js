"use strict";
(() => {
  const prices = { week: 29000, month: 79000, year: 499000, lifetime: 999000 },
    names = {
      week: "7 ngày",
      month: "1 tháng",
      year: "1 năm",
      lifetime: "Vĩnh viễn",
    };
  const money = (n) => new Intl.NumberFormat("vi-VN").format(n) + "đ";
  const list = document.getElementById("purchase-items");
  if (list) {
    let selected = [];
    try {
      const value = JSON.parse(
        localStorage.getItem("soravynx.cart.v1") || "[]",
      );
      if (Array.isArray(value))
        selected = [...new Set(value.filter((k) => Object.hasOwn(prices, k)))];
    } catch {}
    document.getElementById("purchase-empty").hidden = selected.length > 0;
    for (const plan of selected) {
      const card = document.createElement("article");
      card.className = "checkout-panel purchase-row";
      const copy = document.createElement("div"),
        title = document.createElement("h2"),
        price = document.createElement("p");
      title.textContent = "SoraVynx · " + names[plan];
      price.textContent = money(prices[plan]) + " · Một key";
      copy.append(title, price);
      card.append(copy);
      const actions = document.createElement("div");
      actions.className = "purchase-actions";
      for (const [method, label] of [
        ["qr", "Thanh toán QR"],
        ["wallet", "Mua bằng ví"],
      ]) {
        const a = document.createElement("a");
        a.className = "btn" + (method === "wallet" ? " secondary" : "");
        a.href = "account.html?plan=" + plan + "&method=" + method;
        a.textContent = label;
        actions.append(a);
      }
      card.append(actions);
      list.append(card);
    }
  }
  const gateway = document.getElementById("account-gateway");
  if (gateway) {
    const fail = () => {
      gateway.replaceChildren();
      const h = document.createElement("h2"),
        p = document.createElement("p"),
        a = document.createElement("a");
      h.textContent = "Cổng tài khoản đang chờ kết nối.";
      p.textContent =
        "Chưa thể đăng nhập hoặc thanh toán ở thời điểm này. Bạn có thể vào Discord để được hỗ trợ.";
      a.textContent = "Vào server Discord ↗";
      a.href = "https://discord.gg/J3BevcpAxF";
      a.className = "btn";
      a.target = "_blank";
      a.rel = "noopener";
      gateway.append(h, p, a);
    };
    fetch("store-config.json", { cache: "no-store" })
      .then((r) => {
        if (!r.ok) throw Error();
        return r.json();
      })
      .then((config) => {
        if (config.version !== 1 || typeof config.apiBase !== "string")
          throw Error();
        const url = new URL(config.apiBase);
        if (
          url.protocol !== "https:" ||
          url.username ||
          url.password ||
          url.search ||
          url.hash ||
          url.pathname !== "/"
        )
          throw Error();
        url.pathname = "/account";
        const incoming = new URLSearchParams(location.search);
        for (const field of ["plan", "method", "view"]) {
          const value = incoming.get(field);
          if (value && /^[a-z]{2,12}$/.test(value))
            url.searchParams.set(field, value);
        }
        location.replace(url.href);
      })
      .catch(fail);
  }
})();
