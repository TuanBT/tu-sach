/* Sổ tay đọc sách · dòng thời gian toàn bộ một cuốn sách (books/<slug>/timeline/).
   Timeline.page() tìm cuốn sách theo đường dẫn, vẽ khung trang (mở đầu, thanh chọn phần, chỗ cho từng phần),
   rồi chỉ tải file dữ liệu của một phần (timeline/data/phan-N.js) khi người xem cuộn tới hoặc chọn phần đó.

   Hiệu năng:
   - Mỗi phần là một file riêng, nạp bằng thẻ <script> khi cần (chạy được cả khi mở file trực tiếp trên máy).
   - Nội dung chi tiết của sự kiện chỉ được tạo khi bấm mở thẻ, nên trang ban đầu rất nhẹ.
   - Nhảy tới phần N thì nạp trước các phần phía trên nó để trang không bị xô lệch sau khi cuộn.
   Phần nạp, đánh dấu phần đang xem và nhảy tới #phan-N dùng chung Site.lazyParts với trang tóm tắt.
   Số chương ở cuối mỗi sự kiện có link sang trang tóm tắt nếu chương đó đã được tóm tắt.

   Dữ liệu một phần: (window.TL = window.TL || {})[N] = { people: {a, b}, intro, axisLabel, rows: [...] }
   Mỗi hàng: { year, age, shared, a: [sự kiện], b: [sự kiện], both: [sự kiện chung], aEmpty, bEmpty, note }
   Sự kiện chung hiện ngay dưới năm (xảy ra trước); đặt bothLast: true nếu nó xảy ra sau các sự kiện hai bên.
   Mỗi sự kiện: { when, place, ch: [số chương], title, tease, body (HTML), tag (nhãn tùy chọn, ví dụ "Hai nhà") } */
(function () {
  const CHEV = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4.2 6 8l4-3.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  const events = new Map();
  let uid = 0;
  let BOOK = null;

  function card(ev, who) {
    const id = ++uid;
    events.set(id, ev);
    return `<details class="ev" data-id="${id}">
      <summary>
        <span class="when"><span class="tag">${ev.tag || who}</span><span class="chip">${ev.when}</span>${ev.place ? `<span>${ev.place}</span>` : ""}</span>
        <span class="ttl">${ev.title}</span>
        ${ev.tease ? `<span class="tease">${ev.tease}</span>` : ""}
        <span class="chev">${CHEV}</span>
      </summary>
      <div class="body"></div>
    </details>`;
  }

  /* Tạo nội dung chi tiết lần đầu thẻ được mở. */
  function fill(d) {
    const b = d.querySelector(":scope > .body");
    if (!b || b.dataset.done) return;
    const ev = events.get(+d.dataset.id);
    if (!ev) return;
    let ch = "";
    if (ev.ch && ev.ch.length) {
      const p = BOOK && BOOK.summary && Site.partOf(BOOK, ev.ch[0]);
      const link = p && p.summary ? `<a href="../summary/#chuong-${ev.ch[0]}">Đọc tóm tắt chương ${ev.ch[0]} →</a>` : "";
      ch = `<div class="ch"><span>Chương ${ev.ch.join(" · ")}</span>${link}</div>`;
    }
    b.innerHTML = ev.body + ch;
    b.dataset.done = "1";
  }
  document.addEventListener("toggle", e => {
    const d = e.target;
    if (d.open && d.matches && d.matches("details.ev")) fill(d);
  }, true);

  function side(list, empty, who) {
    if (list && list.length) return list.map(e => card(e, who)).join("");
    return empty ? `<div class="empty">${empty}</div>` : "";
  }

  function heads(P) {
    const A = P.people.a, B = P.people.b;
    return `<div class="heads">
      <div class="who a"><div class="mono">${A.initial}</div><div><h3>${A.name}</h3>${A.sub ? `<div class="sub">${A.sub}</div>` : ""}</div></div>
      <div class="axis-head">${P.axisLabel || "Năm"}</div>
      <div class="who b"><div class="mono">${B.initial}</div><div><h3>${B.name}</h3>${B.sub ? `<div class="sub">${B.sub}</div>` : ""}</div></div>
    </div>`;
  }

  function rows(P) {
    const A = P.people.a, B = P.people.b;
    return P.rows.map(r => `
      <section class="row${r.shared ? " shared" : ""}${r.both && r.both.length && !r.bothLast ? " both-first" : ""}">
        <div class="side a">${side(r.a, r.aEmpty, A.short)}</div>
        <div class="axis"><button class="year" type="button" aria-label="Mở mọi sự kiện năm ${r.year}"><span class="y">${r.year}</span>${r.age ? `<span class="age">${r.age}</span>` : ""}</button></div>
        <div class="side b">${side(r.b, r.bEmpty, B.short)}</div>
        ${r.both && r.both.length ? `<div class="side both">${r.both.map(e => card(e, "Cả hai")).join("")}</div>` : ""}
      </section>
      ${r.note ? `<div class="note"><div><span class="lbl">Song hành</span><p>${r.note}</p></div></div>` : ""}`).join("");
  }

  function partHead(meta, intro) {
    return `<header class="phead">
      <div class="label">Phần ${meta.n} · ${meta.years}</div>
      <h2>${meta.title}</h2>
      ${meta.ch ? `<div class="pmeta">Chương ${meta.ch[0]}–${meta.ch[1]}</div>` : ""}
      ${intro ? `<p>${intro}</p>` : ""}
    </header>`;
  }

  function full(el, book) {
    BOOK = book;
    const T = book.timeline;
    const born = T.born ? `
      <div class="born">
        <span class="n a">${T.born.aName}</span><span>${T.born.a}</span>
        <span class="d">${T.born.date}</span>
        <span>${T.born.b}</span><span class="n b">${T.born.bName}</span>
      </div>` : "";

    el.innerHTML = `
      <header class="hero">
        ${T.credit ? `<div class="credit">${T.credit}</div>` : ""}
        <h1>${book.title}</h1>
        <div class="part">Dòng thời gian · ${T.years}</div>
        ${born}
        ${T.lede ? `<p class="lede">${T.lede}</p>` : ""}
      </header>
      ${Site.partNav(book, "timeline", `<div class="pnav-act">
          <button class="btn" type="button" data-all="open">Mở tất cả</button>
          <button class="btn" type="button" data-all="close">Thu gọn</button>
        </div>`)}
      ${book.parts.map(p => p.timeline
        ? `<section class="psec pending" id="phan-${p.n}" data-n="${p.n}"><div class="loading">Đang tải ${p.title}…</div></section>`
        : `<section class="psec soon" id="phan-${p.n}" data-n="${p.n}">${partHead(p, "Dòng thời gian của phần này đang được cập nhật.")}</section>`).join("")}
      ${T.footer ? `<footer class="foot">${T.footer}</footer>` : ""}`;

    Site.lazyParts(el, book, {
      key: "timeline",
      global: "TL",
      render(sec, meta, P) {
        sec.innerHTML = partHead(meta, P.intro) + heads(P) + `<div class="timeline">${rows(P)}</div>`;
      }
    });

    /* Ấn vào năm: mở/đóng mọi thẻ của hàng đó. Nút Mở tất cả / Thu gọn: áp cho các phần đã tải. */
    el.addEventListener("click", e => {
      const y = e.target.closest(".year");
      if (y) {
        const ds = [...y.closest(".row").querySelectorAll("details.ev")];
        const allOpen = ds.every(d => d.open);
        ds.forEach(d => { d.open = !allOpen; });
        return;
      }
      const all = e.target.closest("[data-all]");
      if (all) {
        const open = all.dataset.all === "open";
        el.querySelectorAll("details.ev").forEach(d => { if (open) fill(d); d.open = open; });
      }
    });
  }

  /* Trang books/<slug>/timeline/index.html */
  function page() {
    const book = Site.currentBook("../../../");
    if (!book) return;
    document.title = `${book.title} · Dòng thời gian`;
    Site.bar(document.getElementById("bar"), [
      { t: Site.SITE, href: "../../../" },
      { t: book.title, href: "../" },
      { t: "Dòng thời gian" }
    ]);
    full(document.getElementById("app"), book);
  }

  window.Timeline = { full, page };
})();
