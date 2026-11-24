/* Sổ tay đọc sách · trang nhân vật của một cuốn sách (books/<slug>/characters/).
   Characters.page() tìm cuốn sách, nạp characters/data/nhan-vat.js (window.CHARS) rồi vẽ từng nhóm nhân vật.

   Không lộ nội dung: role chỉ tả nhân vật lúc mới xuất hiện; mọi điều về sau nằm trong notes, mỗi mục gắn số chương.
   Khi người đọc chọn "đã đọc tới hết chương X": nhân vật xuất hiện sau X bị ẩn, mục ghi chú sau X bị làm mờ
   (Site.applySpoil), tên mới đổi sau X (names) chưa hiện. Đổi X thì trang vẽ lại.

   Dữ liệu: window.CHARS = { groups: [{ id, title, side }], people: [ person ] }
   Mỗi người: { id, group, side (tùy chọn, ghi đè màu nhóm), ch (chương xuất hiện đầu tiên), name, names: [{ ch, name }] (tên đổi về sau),
               role (HTML, không lộ gì sau chương ch), notes: [{ ch: [chương], text (HTML) }] } */
(function () {
  const esc = s => Site.esc(s);

  function nameAt(p, x) {
    const later = (p.names || []).filter(n => !x || n.ch <= x);
    return later.length ? later[later.length - 1].name : p.name;
  }

  function person(p, side, x) {
    const shown = nameAt(p, x);
    const aka = [p.name, ...(p.names || []).filter(n => !x || n.ch <= x).map(n => n.name)].filter(n => n !== shown);
    /* Đang che: các mốc sau chương x gộp thành một khối mờ duy nhất, bấm vào thì mở cả khối. */
    const li = n => `<li><span class="nch">Ch. ${Site.chLabel(n.ch)}</span><span>${n.text}</span></li>`;
    const all = p.notes || [];
    const now = all.filter(n => !x || Math.max(...n.ch) <= x), later = all.filter(n => x && Math.max(...n.ch) > x);
    const notes = (now.length ? `<ul class="pnotes">${now.map(li).join("")}</ul>` : "")
      + (later.length ? `<div class="pmore" data-maxch="${Math.max(...later.flatMap(n => n.ch))}" data-n="${later.length}">
          <ul class="pnotes">${later.map(li).join("")}</ul></div>` : "");
    return `<article class="person ${side}" id="nv-${p.id}">
      <header>
        <span class="mono">${esc(shown.replace(/^(Bác sĩ|Nam tước|Bà nội) /, "").charAt(0))}</span>
        <div>
          <h3>${esc(shown)}</h3>
          ${aka.length ? `<div class="aka">${aka.map(esc).join(" · ")}</div>` : ""}
        </div>
        <a class="since" href="../summary/#chuong-${p.ch}">Từ chương ${p.ch}</a>
      </header>
      <p class="role">${p.role}</p>
      ${notes}
    </article>`;
  }

  function full(el, book) {
    const C = window.CHARS, S = book.characters;
    const credit = [book.author, book.translator && `${book.translator} dịch`].filter(Boolean).join(" · ");
    const hasSum = p => Site.partOf(book, p.ch) && Site.partOf(book, p.ch).summary;

    function render() {
      const x = Site.readTo(book);
      const visible = C.people.filter(p => !x || p.ch <= x);
      const hidden = C.people.length - visible.length;
      el.innerHTML = `
        <header class="hero">
          ${credit ? `<div class="credit">${esc(credit)}</div>` : ""}
          <h1>${esc(book.title)}</h1>
          <div class="part">Nhân vật</div>
          ${S.lede ? `<p class="lede">${S.lede}</p>` : ""}
        </header>
        <nav class="nv-index" aria-label="Danh sách nhân vật">
          ${visible.map(p => `<a href="#nv-${p.id}">${esc(nameAt(p, x))}</a>`).join("")}
        </nav>
        ${hidden ? `<p class="nv-hidden">Đang che ${hidden} nhân vật xuất hiện sau chương ${x}. Đổi ở nút "Đọc tới" trên cùng.</p>` : ""}
        ${C.groups.map(g => {
          const ps = visible.filter(p => p.group === g.id);
          return ps.length ? `<section class="nv-group">
            <h2 class="sec-title">${esc(g.title)}</h2>
            <div class="nv-grid">${ps.map(p => person(p, p.side || g.side, x)).join("")}</div>
          </section>` : "";
        }).join("")}
        ${S.footer ? `<footer class="foot">${S.footer}</footer>` : ""}`;
      /* "Từ chương N" chỉ là link khi chương đó đã có tóm tắt. */
      el.querySelectorAll(".person").forEach(a => {
        const p = C.people.find(q => `nv-${q.id}` === a.id);
        if (!book.summary || !hasSum(p)) {
          const s = a.querySelector(".since");
          s.outerHTML = `<span class="since">Từ chương ${p.ch}</span>`;
        }
      });
      Site.applySpoil(book, el);
    }

    render();
    addEventListener("sotay:doc-toi", render);
    const t = location.hash && document.getElementById(location.hash.slice(1));
    if (t) requestAnimationFrame(() => t.scrollIntoView({ block: "start", behavior: "instant" }));
  }

  /* Trang books/<slug>/characters/index.html */
  async function page() {
    const book = Site.currentBook("../../../");
    if (!book) return;
    document.title = `${book.title} · Nhân vật`;
    Site.bar(document.getElementById("bar"), [
      { t: Site.SITE, href: "../../../" },
      { t: book.title, href: "../" },
      { t: "Nhân vật" }
    ], book);
    const app = document.getElementById("app");
    app.innerHTML = `<div class="loading">Đang tải danh sách nhân vật…</div>`;
    await Site.loadScript("data/nhan-vat.js");
    if (!window.CHARS) {
      app.innerHTML = `<div class="loading">Không tải được danh sách nhân vật. Hãy thử tải lại trang.</div>`;
      return;
    }
    full(app, book);
  }

  window.Characters = { full, page };
})();
