/* Sổ tay đọc sách · thanh trên cùng, nút sáng/tối, trang chủ và trang sách.
   Dữ liệu sách nằm trong data/books.js (window.BOOKS). */
(function () {
  const KEY = "sotay-theme";
  const root = document.documentElement;

  function current() {
    const t = root.getAttribute("data-theme");
    if (t === "dark" || t === "light") return t;
    return window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function syncLabel(btn) {
    btn.textContent = current() === "dark" ? "Giao diện sáng" : "Giao diện tối";
  }
  function themeButton() {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.type = "button";
    btn.id = "theme-toggle";
    syncLabel(btn);
    btn.addEventListener("click", () => {
      const next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem(KEY, next); } catch (e) {}
      syncLabel(btn);
    });
    if (window.matchMedia) {
      matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", () => syncLabel(btn));
    }
    new MutationObserver(() => syncLabel(btn)).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return btn;
  }

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* crumbs: [{ t: "Tên", href: "đường dẫn" }]; mục cuối là trang hiện tại, không có href. */
  function bar(el, crumbs) {
    const parts = crumbs.map((c, i) => {
      const last = i === crumbs.length - 1;
      const node = c.href && !last ? `<a href="${esc(c.href)}">${esc(c.t)}</a>`
                                   : `<span${last ? ' aria-current="page"' : ""}>${esc(c.t)}</span>`;
      return (i ? '<span class="sep">/</span>' : "") + node;
    }).join("");
    el.innerHTML = `<nav class="crumbs" aria-label="Đường dẫn">${parts}</nav>`;
    el.appendChild(themeButton());
  }

  function partsDone(book) {
    return book.parts.filter(p => p.ready).length;
  }

  /* Trang chủ: danh sách mọi cuốn sách. base là đường dẫn từ trang chủ tới thư mục books/. */
  function home(el, books) {
    el.innerHTML = `
      <section class="intro">
        <div class="label">Tủ sách</div>
        <h1>Sổ tay đọc sách</h1>
        <p>Tóm tắt và dòng thời gian cho những cuốn sách đã đọc. Mỗi cuốn được chia theo phần, mỗi phần là một dòng thời gian để xem các nhân vật làm gì vào cùng một thời điểm.</p>
      </section>
      <ul class="shelf">
        ${books.map(b => `
          <li><a class="book" href="books/${esc(b.slug)}/">
            <h2>${esc(b.title)}</h2>
            ${b.original ? `<div class="orig">${esc(b.original)}</div>` : ""}
            <div class="by">${esc(b.author)}${b.translator ? ` · ${esc(b.translator)} dịch` : ""}</div>
            ${b.blurb ? `<p>${esc(b.blurb)}</p>` : ""}
            <span class="go">${partsDone(b)}/${b.parts.length} phần →</span>
          </a></li>`).join("")}
      </ul>`;
  }

  /* Trang một cuốn sách: giới thiệu, lối vào dòng thời gian và danh sách các phần. */
  function book(el, b) {
    const tl = b.timeline;
    el.innerHTML = `
      <section class="intro">
        <div class="label">${esc(b.author)}${b.translator ? ` · ${esc(b.translator)} dịch` : ""}</div>
        <h1>${esc(b.title)}</h1>
        ${b.original ? `<div class="meta">Tên gốc: ${esc(b.original)}</div>` : ""}
        ${b.blurb ? `<p>${esc(b.blurb)}</p>` : ""}
        <div><a class="btn primary" href="${esc(tl.href)}">Xem dòng thời gian ${esc(tl.years)}</a></div>
      </section>
      <h2 class="sec-title">Các phần</h2>
      <ol class="parts">
        ${b.parts.map(p => `
          <li>
            <span class="pt">${esc(p.title)}</span>
            <span class="yr">${esc(p.years || "")}</span>
            <span class="chs">${p.ch ? `Chương ${p.ch[0]}–${p.ch[1]}` : ""}</span>
            <span class="acts">${p.ready
              ? `<a class="btn" href="${esc(tl.href)}#phan-${p.n}">Dòng thời gian</a>`
              : `<span class="soon">Sắp có</span>`}</span>
          </li>`).join("")}
      </ol>`;
  }

  window.Site = { bar, home, book };
})();
