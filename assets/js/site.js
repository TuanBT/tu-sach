/* Sổ tay đọc sách · phần dùng chung cho mọi trang:
   thanh đường dẫn, nút sáng/tối, trang chủ (tủ sách) và trang giới thiệu một cuốn sách.
   Danh mục sách nằm trong data/books.js (window.BOOKS).

   Quy ước thư mục: mỗi cuốn sách là books/<slug>/, mỗi dạng nội dung là một thư mục con
   (timeline/, summary/, audio/). Trang tự đọc slug từ đường dẫn, nên các file index.html
   của mọi cuốn sách giống hệt nhau, chép sang sách mới không cần sửa. */
(function () {
  const KEY = "sotay-theme";
  const SITE = "Sổ tay đọc sách";
  const root = document.documentElement;

  /* Các dạng nội dung một cuốn sách có thể có. Sách có dạng nào thì trong data/books.js
     có object cùng tên (ví dụ book.timeline). dir là thư mục con trong books/<slug>/. */
  const FORMATS = [
    { key: "timeline", label: "Dòng thời gian", dir: "timeline/", desc: "Các nhân vật làm gì vào cùng một thời điểm, chia theo từng phần." },
    { key: "summary",  label: "Tóm tắt",        dir: "summary/",  desc: "Tóm tắt nội dung theo từng phần, từng chương." },
    { key: "audio",    label: "Audio",          dir: "audio/",    desc: "Nghe kể chuyện theo từng tập." }
  ];
  const formatsOf = b => FORMATS.filter(f => b[f.key]);

  /* ---------- Giao diện sáng/tối ---------- */
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
  const $ = id => document.getElementById(id);

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

  /* ---------- Tìm cuốn sách của trang hiện tại ---------- */
  /* Slug là tên thư mục ngay sau "books/" trong đường dẫn, chạy được cả trên web lẫn khi mở file trên máy. */
  function slug() {
    const seg = location.pathname.split("/").filter(Boolean).map(decodeURIComponent);
    const i = seg.lastIndexOf("books");
    return i >= 0 ? seg[i + 1] : null;
  }

  /* Trả về cuốn sách của trang này; không thấy thì hiện thông báo và trả về null.
     home là đường dẫn từ trang hiện tại về trang chủ. */
  function currentBook(home) {
    const s = slug();
    const b = (window.BOOKS || []).find(x => x.slug === s);
    if (!b) {
      bar($("bar"), [{ t: SITE, href: home }, { t: "Không tìm thấy" }]);
      $("app").innerHTML = `<section class="intro"><h1>Không tìm thấy sách</h1>
        <p>Chưa có cuốn nào với slug “${esc(s || "")}” trong <code>data/books.js</code>.</p>
        <div><a class="btn" href="${esc(home)}">Về tủ sách</a></div></section>`;
    }
    return b || null;
  }

  function partsDone(book) {
    return (book.parts || []).filter(p => p.ready).length;
  }

  /* ---------- Trang chủ: danh sách mọi cuốn sách ---------- */
  function homePage() {
    const books = window.BOOKS || [];
    document.title = SITE;
    bar($("bar"), [{ t: SITE }]);
    $("app").innerHTML = `
      <section class="intro">
        <div class="label">Tủ sách</div>
        <h1>${SITE}</h1>
        <p>Dòng thời gian, tóm tắt và audio cho những cuốn sách đã đọc.</p>
      </section>
      <ul class="shelf">
        ${books.map(b => {
          const fs = formatsOf(b);
          const n = (b.parts || []).length;
          return `
          <li><a class="book" href="books/${esc(b.slug)}/">
            <h2>${esc(b.title)}</h2>
            ${b.original ? `<div class="orig">${esc(b.original)}</div>` : ""}
            <div class="by">${esc(b.author)}${b.translator ? ` · ${esc(b.translator)} dịch` : ""}</div>
            ${b.blurb ? `<p>${esc(b.blurb)}</p>` : ""}
            ${fs.length ? `<div class="fmts">${fs.map(f => `<span>${f.label}</span>`).join("")}</div>` : ""}
            <span class="go">${n ? `${partsDone(b)}/${n} phần ` : ""}→</span>
          </a></li>`;
        }).join("")}
      </ul>`;
  }

  /* ---------- Trang một cuốn sách: giới thiệu, các dạng nội dung, danh sách phần ---------- */
  function bookPage() {
    const b = currentBook("../../");
    if (!b) return;
    document.title = `${b.title} · ${SITE}`;
    bar($("bar"), [{ t: SITE, href: "../../" }, { t: b.title }]);

    const fs = formatsOf(b);
    const tl = b.timeline;
    $("app").innerHTML = `
      <section class="intro">
        <div class="label">${esc(b.author)}${b.translator ? ` · ${esc(b.translator)} dịch` : ""}</div>
        <h1>${esc(b.title)}</h1>
        ${b.original ? `<div class="meta">Tên gốc: ${esc(b.original)}</div>` : ""}
        ${b.blurb ? `<p>${esc(b.blurb)}</p>` : ""}
      </section>
      ${fs.length ? `
      <h2 class="sec-title">Xem</h2>
      <ul class="formats">
        ${fs.map(f => `
          <li><a class="fmt" href="${f.dir}">
            <h3>${f.label}${b[f.key].years ? ` <span>${esc(b[f.key].years)}</span>` : ""}</h3>
            <p>${f.desc}</p>
          </a></li>`).join("")}
      </ul>` : ""}
      ${b.parts && b.parts.length ? `
      <h2 class="sec-title">Các phần</h2>
      <ol class="parts">
        ${b.parts.map(p => `
          <li>
            <span class="pt">${esc(p.title)}</span>
            <span class="yr">${esc(p.years || "")}</span>
            <span class="chs">${p.ch ? `Chương ${p.ch[0]}–${p.ch[1]}` : ""}</span>
            <span class="acts">${tl && p.ready
              ? `<a class="btn" href="timeline/#phan-${p.n}">Dòng thời gian</a>`
              : `<span class="soon">Sắp có</span>`}</span>
          </li>`).join("")}
      </ol>` : ""}`;
  }

  window.Site = { SITE, FORMATS, bar, slug, currentBook, homePage, bookPage };
})();
