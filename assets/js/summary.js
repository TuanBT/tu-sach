/* Sổ tay đọc sách · tóm tắt một cuốn sách theo phần, trong mỗi phần theo chương (books/<slug>/summary/).
   Summary.page() tìm cuốn sách theo đường dẫn, vẽ khung trang (mở đầu, thanh chọn phần, chỗ cho từng phần),
   rồi chỉ tải file dữ liệu của một phần (summary/data/phan-N.js) khi người xem cuộn tới hoặc chọn phần đó.
   Phần nạp, đánh dấu phần đang xem và nhảy tới #phan-N / #chuong-N dùng chung Site.lazyParts với dòng thời gian.

   Dữ liệu một phần: (window.SUM = window.SUM || {})[N] = { intro, chapters: [...] }
   Mỗi chương: { ch: [số chương theo ebook], title, tease, body (HTML), points: ["…"] (tùy chọn, cho sách phi hư cấu) }
   Mỗi chương là một <article class="sum-ch" data-ch="…">, nên link #chuong-7 mở thẳng tới chương 7. */
(function () {
  const esc = s => Site.esc(s);

  /* real: intro thật của phần (có thể lộ đoạn kết của phần), ẩn khi chưa đọc hết phần. */
  function partHead(book, meta, intro, real) {
    const tl = book.timeline && meta.timeline
      ? `<a class="btn" href="../timeline/#phan-${meta.n}">Xem dòng thời gian phần này</a>` : "";
    return `<header class="phead">
      <div class="label">Phần ${meta.n}${meta.years ? ` · ${esc(meta.years)}` : ""}</div>
      <h2>${esc(meta.title)}</h2>
      ${meta.ch ? `<div class="pmeta">Chương ${meta.ch[0]}–${meta.ch[1]}</div>` : ""}
      ${intro ? `<p${real && meta.ch ? ` data-until="${meta.ch[1]}"` : ""}>${intro}</p>` : ""}
      ${tl}
    </header>`;
  }

  function chapter(c) {
    const ch = c.ch || [];
    return `<article class="sum-ch" data-ch="${ch.join(" ")}"${ch.length ? ` id="chuong-${ch[0]}" data-maxch="${Math.max(...ch)}"` : ""}>
      ${ch.length ? `<a class="label" href="#chuong-${ch[0]}">Chương ${Site.chLabel(ch)}</a>` : ""}
      <h3>${c.title}</h3>
      ${c.tease ? `<p class="sum-tease">${c.tease}</p>` : ""}
      <div class="sum-body">${c.body}</div>
      ${c.points && c.points.length ? `<div class="sum-pts"><h4>Ý chính</h4><ul>${c.points.map(p => `<li>${p}</li>`).join("")}</ul></div>` : ""}
    </article>`;
  }

  function full(el, book) {
    const S = book.summary;
    const credit = [book.author, book.translator && `${book.translator} dịch`].filter(Boolean).join(" · ");
    el.innerHTML = `
      <header class="hero">
        ${credit ? `<div class="credit">${esc(credit)}</div>` : ""}
        <h1>${esc(book.title)}</h1>
        <div class="part">Tóm tắt${book.timeline && book.timeline.years ? ` · ${esc(book.timeline.years)}` : ""}</div>
        ${S.lede ? `<p class="lede">${S.lede}</p>` : ""}
      </header>
      ${Site.partNav(book, "summary")}
      ${book.parts.map(p => p.summary
        ? `<section class="psec pending" id="phan-${p.n}" data-n="${p.n}"><div class="loading">Đang tải ${esc(p.title)}…</div></section>`
        : `<section class="psec soon" id="phan-${p.n}" data-n="${p.n}">${partHead(book, p, "Tóm tắt của phần này đang được viết.")}</section>`).join("")}
      ${S.footer ? `<footer class="foot">${S.footer}</footer>` : ""}`;

    Site.lazyParts(el, book, {
      key: "summary",
      global: "SUM",
      render(sec, meta, P) {
        sec.innerHTML = partHead(book, meta, P.intro, true) + `<div class="sum-list">${(P.chapters || []).map(chapter).join("")}</div>`;
      }
    });
  }

  /* Trang books/<slug>/summary/index.html */
  function page() {
    const book = Site.currentBook("../../../");
    if (!book) return;
    document.title = `${book.title} · Tóm tắt`;
    Site.bar(document.getElementById("bar"), [
      { t: Site.SITE, href: "../../../" },
      { t: book.title, href: "../" },
      { t: "Tóm tắt" }
    ], book);
    full(document.getElementById("app"), book);
  }

  window.Summary = { full, page };
})();
