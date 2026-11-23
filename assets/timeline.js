/* Sổ tay đọc sách · dòng thời gian hai cột.
   Timeline.render(el, T) vẽ toàn bộ trang từ một object dữ liệu (xem books/hai-so-phan/phan-1.js làm mẫu).
   Cột trái là T.people.a, cột phải là T.people.b; mỗi hàng trong T.rows có mảng sự kiện a và b. */
(function () {
  const CHEV = '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4.2 6 8l4-3.8" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function card(ev, who) {
    const ch = ev.ch && ev.ch.length ? `<div class="ch">Chương ${ev.ch.join(" · ")}</div>` : "";
    return `<details class="ev">
      <summary>
        <span class="when"><span class="tag">${who.short}</span><span class="chip">${ev.when}</span>${ev.place ? `<span>${ev.place}</span>` : ""}</span>
        <span class="ttl">${ev.title}</span>
        <span class="tease">${ev.tease || ""}</span>
        <span class="chev">${CHEV}</span>
      </summary>
      <div class="body">${ev.body}${ch}</div>
    </details>`;
  }

  function side(list, empty, who) {
    if (list && list.length) return list.map(e => card(e, who)).join("");
    return `<div class="empty">${empty || ""}</div>`;
  }

  function render(el, T) {
    const A = T.people.a, B = T.people.b;
    const born = T.born ? `
      <div class="born">
        <span class="n a">${A.short}</span><span>${T.born.a}</span>
        <span class="d">${T.born.date}</span>
        <span>${T.born.b}</span><span class="n b">${B.short}</span>
      </div>` : "";

    el.insertAdjacentHTML("beforeend", `
      <header class="hero">
        ${T.credit ? `<div class="credit">${T.credit}</div>` : ""}
        <h1>${T.book}</h1>
        <div class="part">${T.part}${T.years ? ` · ${T.years}` : ""}</div>
        ${born}
        ${T.lede ? `<p class="lede">${T.lede}</p>` : ""}
      </header>
      <div class="toolbar">
        <button class="btn" type="button" data-all="open">Mở tất cả</button>
        <button class="btn" type="button" data-all="close">Thu gọn tất cả</button>
      </div>
      <div class="heads">
        <div class="who a"><div class="mono">${A.initial}</div><div><h2>${A.name}</h2>${A.sub ? `<div class="sub">${A.sub}</div>` : ""}</div></div>
        <div class="axis-head">${T.axisLabel || "Năm"}</div>
        <div class="who b"><div class="mono">${B.initial}</div><div><h2>${B.name}</h2>${B.sub ? `<div class="sub">${B.sub}</div>` : ""}</div></div>
      </div>
      <main class="timeline">
        ${T.rows.map(r => `
          <section class="row${r.shared ? " shared" : ""}">
            <div class="side a">${side(r.a, r.aEmpty, A)}</div>
            <div class="axis"><button class="year" type="button" aria-label="Mở mọi sự kiện năm ${r.year}"><span class="y">${r.year}</span>${r.age ? `<span class="age">${r.age}</span>` : ""}</button></div>
            <div class="side b">${side(r.b, r.bEmpty, B)}</div>
          </section>
          ${r.note ? `<div class="note"><div><span class="lbl">Song hành</span><p>${r.note}</p></div></div>` : ""}`).join("")}
      </main>
      ${T.footer ? `<footer class="foot">${T.footer}</footer>` : ""}`);

    const tl = el.querySelector(".timeline");
    tl.addEventListener("click", e => {
      const btn = e.target.closest(".year");
      if (!btn) return;
      const ds = [...btn.closest(".row").querySelectorAll("details.ev")];
      const allOpen = ds.every(d => d.open);
      ds.forEach(d => { d.open = !allOpen; });
    });
    el.querySelectorAll("[data-all]").forEach(b => b.addEventListener("click", () => {
      const open = b.dataset.all === "open";
      tl.querySelectorAll("details.ev").forEach(d => { d.open = open; });
    }));
  }

  window.Timeline = { render };
})();
