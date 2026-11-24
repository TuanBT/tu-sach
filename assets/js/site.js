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
    { key: "characters", label: "Nhân vật",     dir: "characters/", file: "nhan-vat.js",   desc: "Ai là ai, xuất hiện từ chương nào, về sau ra sao." },
    { key: "map",      label: "Bản đồ hành trình", dir: "map/",     file: "hanh-trinh.js", desc: "Những nơi các nhân vật đã đi qua, theo đúng thứ tự trong sách." },
    { key: "audio",    label: "Audio",          dir: "audio/",    desc: "Nghe kể chuyện theo từng tập." }
  ];
  /* Dạng có file (characters, map) là dạng của cả cuốn: một file data/<file> thay vì data/phan-N.js theo từng phần. */
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
  function bar(el, crumbs, book) {
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

    const tools = el.querySelector(".tools");
    if (book && lastChapter(book)) {
      const panel = document.createElement("div");
      panel.className = "spoil-panel";
      panel.hidden = true;
      panel.append(spoilPicker(book));
      tip.after(panel);
      const btn = document.createElement("button");
      btn.className = "btn";
      btn.type = "button";
      btn.id = "doc-toi";
      btn.addEventListener("click", () => { panel.hidden = !panel.hidden; });
      tools.append(btn);
      syncSpoilButton(book);
    }
    tools.append(installButton(tip), themeButton());
    syncInstall();
  }

  /* ---------- Không lộ nội dung ----------
     Người đọc chọn "đã đọc tới hết chương X" (lưu trong trình duyệt, riêng từng cuốn). Mọi trang của cuốn sách
     che những gì xảy ra sau chương X:
     - phần tử có data-maxch > X: làm mờ (class spoil), bấm vào thì mở riêng phần tử đó;
     - phần tử có data-until > X: ẩn hẳn (class spoil-hide), dùng cho câu giới thiệu có thể lộ đoạn kết của một phần;
     - .psec có data-from > X: khóa cả phần (class locked), kèm nút "Vẫn xem phần này".
     X = 0 là không che gì: khi đó không thêm class nào (tools/check.mjs dựa vào class="psec").
     Trang vẽ nội dung theo X (nhân vật, bản đồ) nghe sự kiện "sotay:doc-toi" để vẽ lại. */
  const TOI = "sotay-doc-toi:";
  function readTo(book) {
    try { const v = parseInt(localStorage.getItem(TOI + book.slug), 10); return v > 0 ? v : 0; } catch (e) { return 0; }
  }
  const lastChapter = book => Math.max(0, ...(book.parts || []).map(p => (p.ch ? p.ch[1] : 0)));
  function setReadTo(book, x) {
    try { if (x) localStorage.setItem(TOI + book.slug, String(x)); else localStorage.removeItem(TOI + book.slug); } catch (e) {}
    document.querySelectorAll("[data-open]").forEach(el => { delete el.dataset.open; });
    document.querySelectorAll(".spoil-pick select").forEach(sel => { sel.value = String(x || 0); });
    syncSpoilButton(book);
    applySpoil(book);
    dispatchEvent(new CustomEvent("sotay:doc-toi", { detail: x }));
  }
  function syncSpoilButton(book) {
    const btn = document.getElementById("doc-toi");
    if (!btn) return;
    const x = readTo(book);
    btn.textContent = x ? `Đọc tới ch. ${x}` : "Che phần chưa đọc";
    btn.classList.toggle("on", !!x);
  }
  function applySpoil(book, root) {
    const x = readTo(book), r = root || document;
    r.querySelectorAll("[data-maxch]").forEach(el => el.classList.toggle("spoil", !!x && +el.dataset.maxch > x && !el.dataset.open));
    r.querySelectorAll("[data-until]").forEach(el => el.classList.toggle("spoil-hide", !!x && +el.dataset.until > x));
    r.querySelectorAll(".pnav-in a[data-from]").forEach(a => a.classList.toggle("locked", !!x && +a.dataset.from > x));
    r.querySelectorAll(".psec[data-from]").forEach(sec => {
      const on = !!x && +sec.dataset.from > x && !sec.dataset.open;
      sec.classList.toggle("locked", on);
      let note = sec.querySelector(":scope > .lock");
      if (!on) { if (note) note.remove(); return; }
      if (!note) { note = document.createElement("div"); note.className = "lock"; sec.prepend(note); }
      const p = (book.parts || []).find(q => q.n === +sec.dataset.n) || {};
      note.innerHTML = `<div class="label">Phần ${p.n}${p.years ? ` · ${esc(p.years)}` : ""}</div>
        <p><b>${esc(p.title || "")}</b>${p.ch ? ` (chương ${p.ch[0]}–${p.ch[1]})` : ""} nằm sau chỗ bạn đang đọc, chương ${x}.</p>
        <button class="btn" type="button" data-unlock>Vẫn xem phần này</button>`;
    });
  }
  /* Bấm vào chỗ bị che: mở riêng chỗ đó. Bắt ở pha capture để thẻ <details> không bị mở/đóng theo. */
  document.addEventListener("click", e => {
    const s = e.target.closest && e.target.closest(".spoil");
    if (s) {
      e.preventDefault();
      e.stopPropagation();
      s.dataset.open = "1";
      s.classList.remove("spoil");
      return;
    }
    const u = e.target.closest && e.target.closest("[data-unlock]");
    if (u) {
      const sec = u.closest(".psec");
      sec.dataset.open = "1";
      sec.classList.remove("locked");
      u.closest(".lock").remove();
    }
  }, true);

  /* Ô chọn "Tôi đã đọc tới hết chương …", dùng ở thanh trên cùng và trang sách. */
  function spoilPicker(book) {
    const wrap = document.createElement("label");
    wrap.className = "spoil-pick";
    const groups = (book.parts || []).filter(p => p.ch).map(p => {
      let opts = "";
      for (let c = p.ch[0]; c <= p.ch[1]; c++) opts += `<option value="${c}">chương ${c}</option>`;
      return `<optgroup label="${esc(p.title)}${p.years ? ` · ${esc(p.years)}` : ""}">${opts}</optgroup>`;
    }).join("");
    wrap.innerHTML = `<span>Tôi đã đọc tới hết</span>
      <select><option value="0">cả cuốn (không che gì)</option>${groups}</select>`;
    const sel = wrap.querySelector("select");
    sel.value = String(readTo(book));
    sel.addEventListener("change", () => setReadTo(book, +sel.value));
    return wrap;
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
  /* Phần chứa chương c (số chương theo thứ tự trong ebook). */
  const partOf = (book, c) => (book.parts || []).find(p => p.ch && c >= p.ch[0] && c <= p.ch[1]) || null;

  /* Nạp một file JS bằng thẻ <script> (chạy được cả khi mở file trực tiếp trên máy). Trả về true nếu nạp được. */
  function loadScript(src) {
    return new Promise(resolve => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.head.appendChild(s);
    });
  }

  /* ---------- Ghi nhớ chỗ đang đọc ----------
     Trang chia theo phần ghi lại phần đang xem; trang sách hiện nút "Đọc tiếp" dẫn về đúng chỗ đó. */
  const POS = "sotay-doc:";
  function remember(slug, key, n) {
    try { localStorage.setItem(POS + slug, JSON.stringify({ key, n })); } catch (e) {}
  }
  function lastPos(book) {
    try {
      const v = JSON.parse(localStorage.getItem(POS + book.slug) || "null");
      const f = v && FORMATS.find(x => x.key === v.key && book[x.key]);
      const p = f && (book.parts || []).find(x => x.n === v.n && x[f.key]);
      return p ? { f, p } : null;
    } catch (e) { return null; }
  }

  /* ---------- Trang chia theo phần (dòng thời gian, tóm tắt) ----------
     Mỗi phần đã có dữ liệu là <section class="psec pending" id="phan-N" data-n="N"> có sẵn trong el.
     - Chỉ nạp data/phan-N.js khi phần sắp cuộn tới. Nạp xong gọi render(sec, part, dữ liệu) rồi bỏ class pending
       (class chỉ còn đúng "psec", tools/check.mjs dựa vào điều này). Lỗi thì hiện "Không tải được…".
     - Đánh dấu phần đang xem trên thanh .pnav-in và ghi nhớ cho nút Đọc tiếp.
     - Mở trang với #phan-N, hoặc #chuong-N (phần tử có data-ch chứa N), thì nạp các phần từ 1 tới phần đó rồi mới cuộn,
       để trang không bị xô lệch sau khi cuộn.
     opts: { key: "timeline", global: "TL", render } */
  function lazyParts(el, book, opts) {
    const has = p => !!(p && p[opts.key]);
    const jobs = new Map();
    function load(n) {
      if (jobs.has(n)) return jobs.get(n);
      const sec = el.querySelector(`#phan-${n}`);
      const meta = book.parts.find(p => p.n === n);
      if (!sec || !has(meta)) return Promise.resolve(sec);
      const job = loadScript(`data/phan-${n}.js`).then(() => {
        const P = (window[opts.global] || {})[n];
        if (P) {
          opts.render(sec, meta, P);
          sec.classList.remove("pending");
          applySpoil(book, sec);
        } else {
          const l = sec.querySelector(".loading");
          if (l) l.textContent = "Không tải được phần này. Hãy thử tải lại trang.";
        }
        return sec;
      });
      jobs.set(n, job);
      return job;
    }

    const lazy = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { lazy.unobserve(e.target); load(+e.target.dataset.n); }
    }), { rootMargin: "1200px 0px" });
    el.querySelectorAll(".psec.pending").forEach(s => lazy.observe(s));

    const links = [...el.querySelectorAll(".pnav-in a")];
    const strip = el.querySelector(".pnav-in");
    function setCurrent(n) {
      links.forEach(a => {
        const on = +a.dataset.n === n;
        a.setAttribute("aria-current", on ? "true" : "false");
        if (on && strip) {
          const l = a.offsetLeft, r = l + a.offsetWidth;
          if (l < strip.scrollLeft || r > strip.scrollLeft + strip.clientWidth) strip.scrollLeft = l - 12;
        }
      });
    }
    const spy = new IntersectionObserver(entries => entries.forEach(e => {
      if (!e.isIntersecting) return;
      const n = +e.target.dataset.n;
      setCurrent(n);
      if (has(book.parts.find(p => p.n === n))) remember(book.slug, opts.key, n);
    }), { rootMargin: "-40% 0px -55% 0px" });
    el.querySelectorAll(".psec").forEach(s => spy.observe(s));

    /* Đánh dấu chương mở đầu của mỗi phần để chế độ "không lộ nội dung" khóa được cả phần. */
    for (const p of book.parts) if (p.ch) {
      const sec = el.querySelector(`#phan-${p.n}`), a = el.querySelector(`.pnav-in a[data-n="${p.n}"]`);
      if (sec) sec.dataset.from = p.ch[0];
      if (a) a.dataset.from = p.ch[0];
    }
    applySpoil(book, el);

    /* Lần nhảy đầu (mở trang bằng link có #) đợi font tải xong rồi nhảy thẳng, không cuộn mượt:
       font về sau làm đổi chiều cao chữ, cuộn mượt dở dang sẽ dừng sai chỗ. */
    let first = true;
    async function jump() {
      const m = /^#(phan|chuong)-(\d+)$/.exec(location.hash);
      if (!m) return;
      const part = m[1] === "phan" ? book.parts.find(p => p.n === +m[2]) : partOf(book, +m[2]);
      if (!part) return;
      await Promise.all(book.parts.filter(p => p.n <= part.n && has(p)).map(p => load(p.n)));
      if (first && document.fonts) await document.fonts.ready;
      const target = (m[1] === "chuong" && el.querySelector(`[data-ch~="${m[2]}"]`)) || el.querySelector(`#phan-${part.n}`);
      const behavior = first ? "instant" : "smooth";
      first = false;
      if (target) requestAnimationFrame(() => target.scrollIntoView({ block: "start", behavior }));
      setCurrent(part.n);
    }
    window.addEventListener("hashchange", jump);
    if (location.hash) jump(); else if (book.parts.length) setCurrent(book.parts[0].n);
    return { load };
  }

  /* Thanh chọn phần: một nút cho mỗi phần, phần chưa có dạng key thì mờ đi (class soon). */
  function partNav(book, key, extra) {
    return `<nav class="pnav" aria-label="Các phần">
      <div class="pnav-in">
        ${book.parts.map(p => `<a href="#phan-${p.n}" data-n="${p.n}"${p[key] ? "" : ' class="soon"'}><b>${p.n}</b><span>${esc(p.years || (p.ch ? `Ch. ${p.ch[0]}–${p.ch[1]}` : ""))}</span></a>`).join("")}
      </div>
      ${extra || ""}
    </nav>`;
  }

  /* ---------- Tìm trong sách ----------
     Lần đầu gõ vào ô tìm thì nạp mọi file dữ liệu đã có của cuốn sách (dòng thời gian, tóm tắt), rồi tìm ngay trên máy.
     Gõ không dấu cũng tìm được: "rosnovski", "nha tu", "zaphia". */
  const fold = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();
  const plain = h => String(h || "").replace(/<\/(p|div|li|h\d)>|<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim().normalize("NFC");

  function buildIndex(book) {
    const out = [];
    const add = (where, href, title, html, ch) => {
      const text = plain([html].flat().join(" "));
      out.push({ where, href, title: plain(title), text, f: fold(text), ft: fold(plain(title)), ch: ch || 0 });
    };
    const top = ch => (ch && ch.length ? Math.max(...ch) : 0);
    for (const p of book.parts || []) {
      const T = book.timeline && p.timeline && (window.TL || {})[p.n];
      const S = book.summary && p.summary && (window.SUM || {})[p.n];
      if (S) for (const c of S.chapters || []) {
        add(`Tóm tắt · ${p.title} · Chương ${chLabel(c.ch)}`, `summary/#chuong-${c.ch[0]}`, c.title, [c.tease, c.body, (c.points || []).join(" ")], top(c.ch));
      }
      if (T) for (const r of T.rows || []) for (const k of ["a", "b", "both"]) for (const e of r[k] || []) {
        add(`Dòng thời gian · ${p.title} · ${plain(e.when)}`, `timeline/#phan-${p.n}`, e.title, [e.tease, e.body], top(e.ch));
      }
    }
    const C = book.characters && window.CHARS;
    if (C) for (const c of C.people || []) {
      add(`Nhân vật · xuất hiện từ chương ${c.ch}`, `characters/#nv-${c.id}`, c.name, [c.role], c.ch);
      for (const n of c.names || []) add(`Nhân vật · chương ${n.ch}`, `characters/#nv-${c.id}`, `${c.name}: ${n.name}`, [n.name], n.ch);
      for (const n of c.notes || []) add(`Nhân vật · chương ${chLabel(n.ch)}`, `characters/#nv-${c.id}`, c.name, [n.text], top(n.ch));
    }
    const M = book.map && window.MAP;
    if (M) for (const r of M.routes || []) for (const st of r.stops || []) {
      add(`Bản đồ · ${r.who} · ${plain(st.when)}`, `map/#${st.id}`, st.place, [st.text], top(st.ch));
    }
    return out;
  }
  /* "7–8" cho các chương liền nhau, "1 · 3" cho các chương rời. */
  function chLabel(ch) {
    if (!ch || !ch.length) return "";
    const seq = ch.every((c, i) => !i || c === ch[i - 1] + 1);
    return ch.length > 1 && seq ? `${ch[0]}–${ch[ch.length - 1]}` : ch.join(" · ");
  }
  /* Đoạn trích quanh chỗ khớp đầu tiên, tô các từ khớp bằng <mark>. */
  function snippet(e, words) {
    const at = Math.max(0, e.f.indexOf(words[0]));
    let a = Math.max(0, at - 70), b = Math.min(e.text.length, at + 150);
    if (a > 0) a = e.text.indexOf(" ", a) + 1;
    if (b < e.text.length) b = e.text.lastIndexOf(" ", b);
    const marks = [];
    if (e.f.length === e.text.length) for (const w of words) {
      for (let i = e.f.indexOf(w, a); i >= 0 && i < b; i = e.f.indexOf(w, i + w.length)) marks.push([i, Math.min(b, i + w.length)]);
    }
    marks.sort((x, y) => x[0] - y[0]);
    let html = "", pos = a;
    for (const [s, t] of marks) {
      if (s < pos) continue;
      html += esc(e.text.slice(pos, s)) + "<mark>" + esc(e.text.slice(s, t)) + "</mark>";
      pos = t;
    }
    html += esc(e.text.slice(pos, b));
    return (a > 0 ? "… " : "") + html + (b < e.text.length ? " …" : "");
  }

  function searchBox(book) {
    const wrap = document.createElement("div");
    wrap.className = "find";
    wrap.innerHTML = `<input type="search" id="find" autocomplete="off" placeholder="Tên người, nơi chốn, sự kiện… (gõ không dấu cũng được)" aria-label="Tìm trong sách">
      <div class="find-out" aria-live="polite"></div>`;
    const input = wrap.querySelector("input"), out = wrap.querySelector(".find-out");
    let index = null, loading = null, timer = 0;

    function ready() {
      if (index) return Promise.resolve(index);
      if (!loading) {
        const files = [];
        for (const f of formatsOf(book)) {
          if (f.file) files.push(`${f.dir}data/${f.file}`);
          else if (f.key !== "audio") for (const p of book.parts || []) if (p[f.key]) files.push(`${f.dir}data/phan-${p.n}.js`);
        }
        loading = Promise.all(files.map(loadScript)).then(() => (index = buildIndex(book)));
      }
      return loading;
    }
    async function run() {
      const q = fold(input.value.trim());
      if (q.length < 2) { out.innerHTML = ""; return; }
      out.innerHTML = `<div class="find-n">Đang tìm…</div>`;
      const words = q.split(/\s+/).filter(Boolean);
      const all = await ready();
      if (fold(input.value.trim()) !== q) return;
      const x = readTo(book);
      const found = all.filter(e => words.every(w => e.f.includes(w) || e.ft.includes(w)));
      const hits = x ? found.filter(e => e.ch <= x) : found;
      const hidden = found.length - hits.length;
      const MAX = 40;
      out.innerHTML = `<div class="find-n">${hits.length ? `${hits.length} chỗ khớp${hits.length > MAX ? `, hiện ${MAX} chỗ đầu` : ""}` : "Không thấy chỗ nào khớp."}${hidden ? ` Che ${hidden} chỗ nằm sau chương ${x}.` : ""}</div>`
        + hits.slice(0, MAX).map(e => `<a class="hit" href="${esc(e.href)}">
            <div class="hit-w">${esc(e.where)}</div>
            <div class="hit-t">${esc(e.title)}</div>
            <div class="hit-s">${snippet(e, words)}</div>
          </a>`).join("");
    }
    input.addEventListener("focus", ready, { once: true });
    input.addEventListener("input", () => { clearTimeout(timer); timer = setTimeout(run, 150); });
    return wrap;
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
        <p>Dòng thời gian, tóm tắt, nhân vật và bản đồ hành trình cho những cuốn sách đã đọc.</p>
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
    bar($("bar"), [{ t: SITE, href: "../../" }, { t: b.title }], b);

    const fs = formatsOf(b);
    const pos = lastPos(b);
    const searchable = fs.some(f => f.file || (f.key !== "audio" && (b.parts || []).some(p => p[f.key])));
    $("app").innerHTML = `
      <section class="intro">
        <div class="label">${esc(b.author)}${b.translator ? ` · ${esc(b.translator)} dịch` : ""}</div>
        <h1>${esc(b.title)}</h1>
        ${b.original ? `<div class="meta">Tên gốc: ${esc(b.original)}</div>` : ""}
        ${b.blurb ? `<p>${esc(b.blurb)}</p>` : ""}
      </section>
      ${pos ? `<a class="resume" href="${pos.f.dir}#phan-${pos.p.n}"><span>Đọc tiếp</span><b>${pos.f.label} · ${esc(pos.p.title)}${pos.p.years ? ` · ${esc(pos.p.years)}` : ""} →</b></a>` : ""}
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

    if (lastChapter(b)) {
      const box = document.createElement("section");
      box.className = "spoil-box";
      box.innerHTML = `<h2 class="sec-title">Không lộ nội dung</h2>
        <p>Đang đọc dở? Chọn chương bạn đã đọc xong. Mọi trang của cuốn sách sẽ che những gì xảy ra sau đó. Bấm vào chỗ bị che để xem riêng chỗ ấy.</p>`;
      box.append(spoilPicker(b));
      ($("app").querySelector(".resume") || $("app").querySelector(".intro")).after(box);
    }

    if (searchable) {
      const title = document.createElement("h2");
      title.className = "sec-title";
      title.textContent = "Tìm trong sách";
      const at = $("app").querySelector(".formats");
      const box = searchBox(b);
      if (at) at.after(title, box); else $("app").querySelector(".intro").after(title, box);
    }
  }

  window.Site = { SITE, FORMATS, bar, slug, currentBook, homePage, bookPage, esc, partOf, chLabel, loadScript, lazyParts, partNav, readTo, applySpoil };
})();
