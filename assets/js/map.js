/* Sổ tay đọc sách · bản đồ hành trình của một cuốn sách (books/<slug>/map/).
   Map.page() tìm cuốn sách, nạp map/data/hanh-trinh.js (window.MAP) và nền bản đồ assets/js/map-land.js (window.MAP_LAND).

   Bố cục: bản đồ dính ở đầu trang, bên dưới là danh sách các chặng theo thứ tự chương. Bấm vào một chặng, hoặc cuộn
   cho chặng đó tới giữa màn hình, thì bản đồ phóng tới chặng ấy (từ điểm trước đó của cùng người). Nút "Toàn cảnh"
   thu về toàn bộ hành trình. Chặng nằm sau chương người đọc chọn ở chế độ "không lộ nội dung" bị ẩn khỏi cả bản đồ
   lẫn danh sách; đổi chương thì trang vẽ lại.

   Dữ liệu: window.MAP = { routes: [ { id, who, side: "a" | "b", stops: [ stop ] } ] }
   Mỗi chặng: { id, ch: [chương], when, place, lat, lon, text (HTML),
                via: [[lat, lon, "Tên"]] (điểm đi qua trước khi tới chặng này), sea: true (đi bằng tàu biển, nét đứt),
                meet: true (nơi hai người chạm mặt), approx: "ghi chú" (sách không cho vị trí chính xác) } */
(function () {
  const SVGNS = "http://www.w3.org/2000/svg";
  const esc = s => Site.esc(s);
  const top = ch => (ch && ch.length ? Math.max(...ch) : 0);
  const first = ch => (ch && ch.length ? Math.min(...ch) : 0);

  function full(el, book) {
    const L = window.MAP_LAND, M = window.MAP, S = book.map;
    const proj = (lat, lon) => [(lon + 180) * L.K * L.C, (90 - lat) * L.K];
    let filter = "all", active = null, vb = null, anim = 0;

    el.innerHTML = `
      <header class="hero">
        <div class="credit">${esc([book.author, book.translator && `${book.translator} dịch`].filter(Boolean).join(" · "))}</div>
        <h1>${esc(book.title)}</h1>
        <div class="part">Bản đồ hành trình</div>
        ${S.lede ? `<p class="lede">${S.lede}</p>` : ""}
      </header>
      <div class="map-stick">
        <div class="map-box">
          <svg class="map-svg" xmlns="${SVGNS}" preserveAspectRatio="none" aria-hidden="true">
            <path class="land" d="${L.d}"/>
            <g class="legs"></g>
          </svg>
          <div class="pins"></div>
          <div class="map-tools">
            <button class="btn" type="button" data-fit>Toàn cảnh</button>
          </div>
        </div>
        <div class="map-filter" role="radiogroup" aria-label="Xem hành trình của">
          <button type="button" data-f="all" aria-pressed="true">Cả hai</button>
          ${M.routes.map(r => `<button type="button" data-f="${r.id}" class="${r.side}" aria-pressed="false">${esc(r.who)}</button>`).join("")}
          <span class="map-key"><i class="meet"></i>Nơi hai người chạm mặt</span>
        </div>
      </div>
      <ol class="stops"></ol>
      ${S.footer ? `<footer class="foot">${S.footer}</footer>` : ""}`;

    const box = el.querySelector(".map-box"), svg = el.querySelector("svg"), legsG = el.querySelector(".legs");
    const pinsEl = el.querySelector(".pins"), list = el.querySelector(".stops");

    /* Các chặng đang hiện: lọc theo người và theo chương đang đọc. Mỗi chặng biết chặng trước của cùng người. */
    function visible() {
      const x = Site.readTo(book);
      const out = [];
      let hidden = 0;
      for (const r of M.routes) {
        let prev = null;
        for (const s of r.stops) {
          if (x && top(s.ch) > x) { hidden++; continue; }
          const p = proj(s.lat, s.lon);
          const item = { s, r, prev, x: p[0], y: p[1], via: (s.via || []).map(v => ({ name: v[2], p: proj(v[0], v[1]) })) };
          if (filter === "all" || filter === r.id) out.push(item);
          prev = item;
        }
      }
      out.sort((a, b) => first(a.s.ch) - first(b.s.ch) || (a.r.id < b.r.id ? -1 : 1));
      return { items: out, hidden, x };
    }

    /* Đường đi của một chặng: từ chặng trước, qua các điểm via, tới chặng này. Uốn nhẹ cho dễ nhìn. */
    function legPath(it) {
      const pts = [[it.prev.x, it.prev.y], ...it.via.map(v => v.p), [it.x, it.y]];
      let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
      for (let i = 1; i < pts.length; i++) {
        const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
        const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, k = 0.12;
        d += `Q${(mx - (y1 - y0) * k).toFixed(1)} ${(my + (x1 - x0) * k).toFixed(1)} ${x1.toFixed(1)} ${y1.toFixed(1)}`;
      }
      return d;
    }

    let items = [];
    function render() {
      const v = visible();
      items = v.items;
      legsG.innerHTML = items.filter(it => it.prev && (it.prev.x !== it.x || it.prev.y !== it.y || it.via.length)).map(it =>
        `<path class="leg ${it.r.side}${it.s.sea ? " sea" : ""}" data-id="${it.s.id}" d="${legPath(it)}" vector-effect="non-scaling-stroke"/>`).join("");
      pinsEl.innerHTML = items.map(it => `
        <button type="button" class="pin ${it.r.side}${it.s.meet ? " meet" : ""}${it.s.approx ? " approx" : ""}" data-id="${it.s.id}">
          <span class="lbl">${esc(it.s.place)}</span>
        </button>`).join("") + items.flatMap(it => it.via.map(v =>
        `<span class="via ${it.r.side}" data-of="${it.s.id}" data-x="${v.p[0]}" data-y="${v.p[1]}"><span class="lbl">${esc(v.name)}</span></span>`)).join("");
      list.innerHTML = items.map(it => `
        <li class="stop ${it.r.side}${it.s.meet ? " meet" : ""}" id="${it.s.id}" data-id="${it.s.id}">
          <div class="stop-h"><span class="who">${esc(it.r.who)}</span><span class="chip">${esc(it.s.when)}</span><span class="ch-n">Chương ${Site.chLabel(it.s.ch)}</span></div>
          <h3>${esc(it.s.place)}</h3>
          <div class="stop-t">${it.s.text}</div>
          ${it.s.approx ? `<p class="approx-note">${it.s.approx}</p>` : ""}
        </li>`).join("") + (v.hidden ? `<li class="stop-hidden">Đang che ${v.hidden} chặng nằm sau chương ${v.x}. Đổi ở nút "Đọc tới" trên cùng.</li>` : "");
      watch();
      if (!active || !items.some(it => it.s.id === active)) active = null;
      mark();
      go(active ? frameOf(active) : frameAll(), false);
    }

    /* ---------- Khung nhìn (viewBox) ---------- */
    function fit(x0, y0, x1, y1, pad, min) {
      let w = Math.max(x1 - x0, min), h = Math.max(y1 - y0, min * 0.45);
      const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      w *= 1 + pad; h *= 1 + pad;
      const ar = box.clientWidth / box.clientHeight || 2;
      if (w / h > ar) h = w / ar; else w = h * ar;
      return { x: cx - w / 2, y: cy - h / 2, w, h };
    }
    function bboxOf(pts) {
      const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
      return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)];
    }
    function frameAll() {
      const pts = items.flatMap(it => [[it.x, it.y], ...it.via.map(v => v.p)]);
      if (!pts.length) return fit(0, 0, L.w, L.h, 0, 10);
      const [a, b, c, d] = bboxOf(pts);
      return fit(a, b, c, d, 0.12, 40);
    }
    function frameOf(id) {
      const it = items.find(i => i.s.id === id);
      if (!it) return frameAll();
      const pts = [[it.x, it.y], ...it.via.map(v => v.p)];
      if (it.prev) pts.push([it.prev.x, it.prev.y]);
      const [a, b, c, d] = bboxOf(pts);
      return fit(a, b, c, d, 0.5, 34);
    }
    function apply(v) {
      vb = v;
      svg.setAttribute("viewBox", `${v.x} ${v.y} ${v.w} ${v.h}`);
      const W = box.clientWidth, H = box.clientHeight;
      const at = (x, y) => [((x - v.x) / v.w) * W, ((y - v.y) / v.h) * H];
      pinsEl.querySelectorAll(".pin").forEach(b => {
        const it = items.find(i => i.s.id === b.dataset.id);
        const [px, py] = at(it.x, it.y);
        b.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px)`;
        b.classList.toggle("flip", px > W * 0.62);
      });
      pinsEl.querySelectorAll(".via").forEach(s => {
        const [px, py] = at(+s.dataset.x, +s.dataset.y);
        s.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px)`;
      });
    }
    function go(target, animate) {
      cancelAnimationFrame(anim);
      const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!vb || animate === false || reduce) return apply(target);
      const from = vb, t0 = performance.now(), dur = 650;
      const ease = t => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
      const step = now => {
        const t = Math.min(1, (now - t0) / dur), e = ease(t);
        apply({ x: from.x + (target.x - from.x) * e, y: from.y + (target.y - from.y) * e,
                w: from.w + (target.w - from.w) * e, h: from.h + (target.h - from.h) * e });
        if (t < 1) anim = requestAnimationFrame(step);
      };
      anim = requestAnimationFrame(step);
    }

    function mark() {
      el.querySelectorAll(".pin, .stop, .leg").forEach(n => n.classList.toggle("on", n.dataset.id === active));
      const it = items.find(i => i.s.id === active);
      const from = it && it.prev ? it.prev.s.id : null;
      pinsEl.querySelectorAll(".pin").forEach(n => n.classList.toggle("from", n.dataset.id === from && from !== active));
      pinsEl.querySelectorAll(".via").forEach(n => n.classList.toggle("on", n.dataset.of === active));
      box.classList.toggle("zoomed", !!active);
    }
    function activate(id, animate) {
      if (id === active) return;
      active = id;
      mark();
      go(id ? frameOf(id) : frameAll(), animate);
    }

    /* Cuộn: chặng nào đi qua dải hẹp ngay dưới bản đồ thì thành chặng đang xem.
       Khi trang tự cuộn (bấm điểm trên bản đồ, mở link #chặng) thì tạm tắt để không kích hoạt nhầm chặng đi ngang qua. */
    let scrolling = 0, spy = null;
    const band = () => el.querySelector(".map-stick").getBoundingClientRect().height + 24;
    function watch() {
      if (spy) spy.disconnect();
      const t = band();
      spy = new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting && Date.now() > scrolling) activate(e.target.dataset.id, true);
      }), { rootMargin: `-${t}px 0px -${Math.max(0, innerHeight - t - 48)}px 0px` });
      list.querySelectorAll(".stop").forEach(li => spy.observe(li));
    }
    function scrollToStop(id, behavior) {
      const li = document.getElementById(id);
      if (!li) return;
      scrolling = Date.now() + 1200;
      window.scrollTo({ top: li.getBoundingClientRect().top + scrollY - band() + 4, behavior });
    }

    el.addEventListener("click", e => {
      const pin = e.target.closest(".pin");
      const li = e.target.closest(".stop");
      if (pin || (li && !e.target.closest("a"))) {
        const id = (pin || li).dataset.id;
        activate(id, true);
        scrollToStop(id, "smooth");
        return;
      }
      if (e.target.closest("[data-fit]")) { active = null; mark(); go(frameAll(), true); return; }
      const f = e.target.closest("[data-f]");
      if (f) {
        filter = f.dataset.f;
        el.querySelectorAll("[data-f]").forEach(b => b.setAttribute("aria-pressed", b === f ? "true" : "false"));
        render();
      }
    });
    addEventListener("resize", () => { go(active ? frameOf(active) : frameAll(), false); watch(); });
    addEventListener("sotay:doc-toi", render);

    render();
    const m = /^#([\w-]+)$/.exec(location.hash);
    if (m && items.some(it => it.s.id === m[1])) {
      scrolling = Date.now() + 1500;
      activate(m[1], false);
      const go1 = () => scrollToStop(m[1], "instant");
      if (document.fonts) document.fonts.ready.then(go1); else requestAnimationFrame(go1);
    }
  }

  /* Trang books/<slug>/map/index.html */
  async function page() {
    const book = Site.currentBook("../../../");
    if (!book) return;
    document.title = `${book.title} · Bản đồ hành trình`;
    Site.bar(document.getElementById("bar"), [
      { t: Site.SITE, href: "../../../" },
      { t: book.title, href: "../" },
      { t: "Bản đồ hành trình" }
    ], book);
    const app = document.getElementById("app");
    app.innerHTML = `<div class="loading">Đang tải bản đồ…</div>`;
    await Promise.all([Site.loadScript("data/hanh-trinh.js"), window.MAP_LAND ? true : Site.loadScript("../../../assets/js/map-land.js")]);
    if (!window.MAP || !window.MAP_LAND) {
      app.innerHTML = `<div class="loading">Không tải được bản đồ. Hãy thử tải lại trang.</div>`;
      return;
    }
    full(app, book);
  }

  window.MapPage = { full, page };
})();
