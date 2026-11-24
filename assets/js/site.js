/* Sổ tay đọc sách · phần dùng chung cho mọi trang:
   thanh đường dẫn, nút sáng/tối, nút cài ứng dụng, trang chủ (tủ sách) và trang giới thiệu một cuốn sách.
   Danh mục sách nằm trong data/books.js (window.BOOKS).

   Quy ước thư mục: mỗi cuốn sách là books/<slug>/, mỗi dạng nội dung là một thư mục con
   (timeline/, summary/, audio/). Trang tự đọc slug từ đường dẫn, nên phần <body> của các file
   index.html giống hệt nhau giữa các cuốn sách; chỉ <head> khác ở tiêu đề, mô tả và ảnh chia sẻ. */
(function () {
  const KEY = "sotay-theme";
  const SITE = "Sổ tay đọc sách";
  const root = document.documentElement;

  /* Thư mục gốc của trang web, suy ra từ đường dẫn của chính file này (…/assets/js/site.js). */
  const ROOT = ((document.currentScript && document.currentScript.src) || "").replace(/assets\/js\/site\.js(\?.*)?$/, "");

  /* Service worker: cho phép cài lên điện thoại và đọc lại trang đã mở khi mất mạng. Xem sw.js. */
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    addEventListener("load", () => navigator.serviceWorker.register(ROOT + "sw.js").catch(() => {}));
  }

  /* Google Analytics 4: property "tusach" trong tài khoản GA "tuan". Mọi trang đều nạp file này nên
     tự được đếm, không dán mã GA vào từng file HTML. Chỉ chạy trên tên miền thật: mở file trên máy
     hay chạy tools/check.mjs không bị tính lượt xem. */
  const GA = "G-6YVSF3Q211";
  if (location.hostname === "tusach.buitientuan.com") {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag("js", new Date());
    gtag("config", GA);
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA;
    document.head.append(s);
  }

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
    syncThemeColor();
  }
  /* Màu thanh trạng thái trên điện thoại theo nền trang, kể cả khi người xem tự chọn sáng/tối. */
  function syncThemeColor() {
    const bg = getComputedStyle(root).getPropertyValue("--bg").trim();
    if (bg) document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.setAttribute("content", bg));
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

  /* ---------- Cài lên điện thoại ----------
     Android và Chrome máy tính: trình duyệt báo có thể cài (beforeinstallprompt), nút gọi hộp cài.
     iPhone, iPad: không có hộp cài, nút mở dòng hướng dẫn Chia sẻ → Thêm vào MH chính.
     Đang mở như ứng dụng rồi thì ẩn nút. */
  let installEvt = null;
  const standalone = () => (window.matchMedia && matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; syncInstall(); });
  addEventListener("appinstalled", () => { installEvt = null; syncInstall(); });

  function syncInstall() {
    const btn = document.getElementById("install");
    if (btn) btn.hidden = standalone() || !(installEvt || isIOS);
  }
  const SHARE = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 1.5v8.5M5 4.5l3-3 3 3M5 7H3.5v7.5h9V7H11" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function installButton(tip) {
    const btn = document.createElement("button");
    btn.className = "btn";
    btn.type = "button";
    btn.id = "install";
    btn.textContent = "Cài ứng dụng";
    btn.addEventListener("click", async () => {
      if (installEvt) {
        const e = installEvt;
        installEvt = null;
        e.prompt();
        await e.userChoice.catch(() => {});
        syncInstall();
      } else {
        tip.hidden = !tip.hidden;
      }
    });
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
    el.innerHTML = `<nav class="crumbs" aria-label="Đường dẫn">${parts}</nav><div class="tools"></div>`;

    const tip = document.createElement("p");
    tip.className = "install-tip";
    tip.hidden = true;
    tip.innerHTML = `Trên iPhone, iPad: bấm nút Chia sẻ ${SHARE} của Safari rồi chọn <b>Thêm vào MH chính</b>.`;
    el.after(tip);

    el.querySelector(".tools").append(installButton(tip), themeButton());
    syncInstall();
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

  /* Số phần đã có ít nhất một dạng nội dung. */
  function partsDone(book) {
    const fs = formatsOf(book);
    return (book.parts || []).filter(p => fs.some(f => p[f.key])).length;
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
            <span class="acts">${fs.filter(f => p[f.key]).map(f => `<a class="btn" href="${f.dir}#phan-${p.n}">${f.label}</a>`).join("")
              || `<span class="soon">Sắp có</span>`}</span>
          </li>`).join("")}
      </ol>` : ""}`;
  }

  window.Site = { SITE, FORMATS, bar, slug, currentBook, homePage, bookPage };
})();
