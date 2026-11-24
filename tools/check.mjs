#!/usr/bin/env node
/* Kiểm tra toàn bộ tủ sách trước khi commit:  node tools/check.mjs
   1. Dữ liệu: data/books.js, file dữ liệu từng phần, thẻ chia sẻ trong <head>, ảnh og.png, file không được đưa lên.
   2. Hiển thị: mở từng trang bằng Chrome headless qua một server tạm trên máy,
      xem trang có hiện đúng sách và tải đủ mọi phần không.
   ✗ là lỗi, phải sửa (thoát với mã 1). ! là cảnh báo, nên xem lại. */
import { readFileSync, existsSync, statSync, readdirSync } from "node:fs";
import { createServer } from "node:http";
import { execFile } from "node:child_process";
import { join, extname, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DOMAIN = "https://tusach.buitientuan.com/";
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const read = p => readFileSync(join(ROOT, p), "utf8");
const has = p => existsSync(join(ROOT, p));

const errors = [], warns = [];
let ok = 0;
const err = (where, msg) => errors.push(`${where}: ${msg}`);
const warn = (where, msg) => warns.push(`${where}: ${msg}`);

/* Danh sách dạng nội dung lấy thẳng từ FORMATS trong assets/js/site.js để luôn khớp. */
const FORMATS = [...read("assets/js/site.js").matchAll(/\{ key: "(\w+)",\s*label: "([^"]+)",\s*dir: "([^"]+)"/g)]
  .map(m => ({ key: m[1], label: m[2], dir: m[3] }));
/* Biến toàn cục mà file dữ liệu của mỗi dạng gán vào. */
const GLOBAL = { timeline: "TL", summary: "SUM", audio: "AUDIO" };

function run(file) {
  const ctx = { window: {} };
  vm.runInNewContext(read(file), ctx, { filename: file });
  return ctx.window;
}

/* ---------- 1. Danh mục ---------- */
let BOOKS = [];
try {
  BOOKS = run("data/books.js").BOOKS || [];
  if (!BOOKS.length) err("data/books.js", "window.BOOKS rỗng");
} catch (e) { err("data/books.js", "lỗi cú pháp: " + e.message); }

/* ---------- 2. Thẻ trong <head> của một trang ---------- */
function meta(html, attr, name) {
  const m = html.match(new RegExp(`<meta ${attr}="${name}" content="([^"]*)"`));
  return m ? m[1] : null;
}
function pngSize(p) {
  const b = readFileSync(join(ROOT, p));
  return [b.readUInt32BE(16), b.readUInt32BE(20)];
}
function checkHead(dir, image) {
  const file = dir + "index.html";
  if (!has(file)) return err(file, "thiếu file");
  const html = read(file);
  const url = DOMAIN + dir;
  if (!/<title>[^<]+<\/title>/.test(html)) err(file, "thiếu <title>");
  if (!meta(html, "name", "description")) err(file, "thiếu meta description");
  if (!html.includes('rel="manifest"')) err(file, "thiếu link manifest (cài lên điện thoại)");
  if (!html.includes(`<link rel="canonical" href="${url}">`)) err(file, `canonical phải là ${url}`);
  if (meta(html, "property", "og:url") !== url) err(file, `og:url phải là ${url}`);
  if (!meta(html, "property", "og:title")) err(file, "thiếu og:title");
  if (!meta(html, "property", "og:description")) err(file, "thiếu og:description");
  if (meta(html, "property", "og:image") !== DOMAIN + image) err(file, `og:image phải là ${DOMAIN + image}`);
  /* Mọi đường dẫn nội bộ (src, href) phải trỏ tới file có thật. */
  for (const m of html.matchAll(/(?:src|href)="([^"#?]+)"/g)) {
    const ref = m[1];
    if (/^(https?:|data:|mailto:)/.test(ref) || ref.startsWith("/")) continue;
    let target = join(dir, ref);
    if (ref.endsWith("/") || ref === "." || ref === "./") target = join(target, "index.html");
    if (!has(target)) err(file, `đường dẫn "${ref}" không tồn tại`);
  }
  ok++;
}
function checkImage(p) {
  if (!has(p)) return err(p, "thiếu ảnh chia sẻ (tools/make-images.sh og …)");
  const [w, h] = pngSize(p);
  if (w !== 1200 || h !== 630) err(p, `ảnh phải 1200×630, đang là ${w}×${h}`);
  else ok++;
}

/* ---------- 3. Từng dạng nội dung ---------- */
const evs = row => ["a", "b", "both"].flatMap(k => row[k] || []);
function checkTimeline(where, P, part) {
  if (!P.people || !P.people.a || !P.people.b) return err(where, "thiếu people.a / people.b");
  for (const k of ["a", "b"]) for (const f of ["name", "short", "initial"])
    if (!P.people[k][f]) err(where, `people.${k}.${f} trống`);
  if (!Array.isArray(P.rows) || !P.rows.length) return err(where, "rows rỗng");
  P.rows.forEach((r, i) => {
    if (!r.year) err(where, `hàng ${i + 1} thiếu year`);
    const list = evs(r);
    if (!list.length && !r.aEmpty && !r.bEmpty) warn(where, `hàng ${r.year} không có sự kiện nào`);
    list.forEach(e => checkEvent(where, `${r.year} · ${e.title || "?"}`, e, part, ["when", "title", "body"]));
  });
}
function checkSummary(where, P, part) {
  if (!Array.isArray(P.chapters) || !P.chapters.length) return err(where, "chapters rỗng");
  P.chapters.forEach(c => checkEvent(where, c.title || "?", c, part, ["title", "body"]));
}
function checkEvent(where, label, e, part, need) {
  for (const f of need) if (!e[f]) err(where, `“${label}” thiếu ${f}`);
  if (e.ch && part.ch) for (const c of e.ch)
    if (c < part.ch[0] || c > part.ch[1]) warn(where, `“${label}” ghi chương ${c}, ngoài khoảng ${part.ch[0]}–${part.ch[1]} của phần`);
  if (!e.ch || !e.ch.length) warn(where, `“${label}” thiếu số chương (ch)`);
}
/* Mỗi chương trong khoảng ch của phần nên được nhắc ở ít nhất một sự kiện hay mục tóm tắt. */
function checkCoverage(where, items, part) {
  if (!part.ch) return;
  const seen = new Set(items.flatMap(e => e.ch || []));
  const miss = [];
  for (let c = part.ch[0]; c <= part.ch[1]; c++) if (!seen.has(c)) miss.push(c);
  if (miss.length) warn(where, `chưa nhắc tới chương ${miss.join(", ")}`);
}
function checkAudio(where, A, book) {
  if (!Array.isArray(A.tracks) || !A.tracks.length) return err(where, "tracks rỗng");
  for (const t of A.tracks) {
    if (!t.title) err(where, `tập ${t.n} thiếu title`);
    if (!/^https:\/\//.test(t.src || "")) err(where, `tập ${t.n}: src phải là link https tới file audio lưu ngoài repo`);
    if (t.part && !(book.parts || []).some(p => p.n === t.part && p.audio)) warn(where, `tập ${t.n} thuộc phần ${t.part} nhưng phần đó chưa có audio: true`);
  }
}
function checkText(where, src) {
  if (src.includes("—")) warn(where, "có dấu gạch ngang dài (—); quy ước dùng dấu chấm, phẩy, hai chấm");
  if (/<script/i.test(src.replace(/^[^]*?\*\//, ""))) err(where, "nội dung có thẻ <script>");
}

for (const book of BOOKS) {
  const s = book.slug, base = `books/${s}/`;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s || "")) { err("data/books.js", `slug "${s}" phải viết thường, không dấu, nối bằng gạch`); continue; }
  for (const f of ["title", "author"]) if (!book[f]) err("data/books.js", `${s}: thiếu ${f}`);
  if (!book.blurb) warn("data/books.js", `${s}: thiếu blurb (giới thiệu ngắn ở trang chủ)`);
  checkHead(base, `${base}og.png`);
  checkImage(`${base}og.png`);

  const fs = FORMATS.filter(f => book[f.key]);
  if (!fs.length) warn("data/books.js", `${s}: chưa có dạng nội dung nào`);
  const nums = (book.parts || []).map(p => p.n);
  if (new Set(nums).size !== nums.length) err("data/books.js", `${s}: số phần (n) bị trùng`);

  for (const f of FORMATS) {
    const marked = (book.parts || []).filter(p => p[f.key]);
    if (!book[f.key]) {
      if (marked.length) err("data/books.js", `${s}: có phần đánh dấu ${f.key}: true nhưng sách chưa có object ${f.key}`);
      continue;
    }
    checkHead(base + f.dir, `${base}og.png`);
    if (f.key === "audio") {
      const file = `${base}audio/data/tracks.js`;
      if (!has(file)) { err(file, "thiếu file"); continue; }
      try { checkText(file, read(file)); checkAudio(file, run(file).AUDIO || {}, book); ok++; }
      catch (e) { err(file, "lỗi cú pháp: " + e.message); }
      continue;
    }
    for (const part of marked) {
      const file = `${base}${f.dir}data/phan-${part.n}.js`;
      if (!has(file)) { err(file, `thiếu file (phần ${part.n} đang đánh dấu ${f.key}: true)`); continue; }
      try {
        const src = read(file);
        checkText(file, src);
        const P = (run(file)[GLOBAL[f.key]] || {})[part.n];
        if (!P) { err(file, `không gán window.${GLOBAL[f.key]}[${part.n}]`); continue; }
        if (f.key === "timeline") checkTimeline(file, P, part);
        if (f.key === "summary") checkSummary(file, P, part);
        checkCoverage(file, f.key === "timeline" ? P.rows.flatMap(evs) : P.chapters || [], part);
        ok++;
      } catch (e) { err(file, "lỗi cú pháp: " + e.message); }
    }
  }
  if (!read("README.md").includes(book.title)) warn("README.md", `chưa có “${book.title}” trong bảng Sách hiện có`);
}
checkHead("", "assets/img/og.png");
checkImage("assets/img/og.png");

/* ---------- 4. File không được đưa lên repo ---------- */
const BANNED = [".epub", ".azw3", ".mobi", ".pdf", ".mp3", ".m4a", ".wav", ".aac", ".ogg"];
(function walk(dir) {
  for (const name of readdirSync(join(ROOT, dir))) {
    if (name === ".git" || name === "node_modules" || name === ".DS_Store") continue;
    const p = join(dir, name), st = statSync(join(ROOT, p));
    if (st.isDirectory()) { walk(p); continue; }
    if (BANNED.includes(extname(name).toLowerCase())) err(p, "file sách/audio không được để trong repo (bản quyền, dung lượng)");
    else if (st.size > 2 * 1024 * 1024) warn(p, `file nặng ${(st.size / 1048576).toFixed(1)} MB`);
  }
})("");

/* ---------- 5. Mở thử từng trang bằng Chrome headless ---------- */
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml", ".webmanifest": "application/manifest+json" };
async function render() {
  if (!existsSync(CHROME)) { warn("hiển thị", "không thấy Google Chrome, bỏ qua bước mở thử trang"); return; }
  const server = createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, "http://x").pathname).replace(/^\/+/, "");
    if (p === "" || p.endsWith("/")) p += "index.html";
    const file = join(ROOT, p);
    if (!relative(ROOT, file).startsWith("..") && existsSync(file) && statSync(file).isFile()) {
      res.writeHead(200, { "content-type": TYPES[extname(file)] || "application/octet-stream" });
      res.end(readFileSync(file));
    } else { res.writeHead(404); res.end(); }
  });
  await new Promise(r => server.listen(0, "127.0.0.1", r));
  const origin = `http://127.0.0.1:${server.address().port}/`;
  const dump = url => new Promise(resolve => execFile(CHROME,
    ["--headless=new", "--disable-gpu", "--virtual-time-budget=6000", "--dump-dom", url],
    { timeout: 60000, maxBuffer: 64 << 20 }, (e, out) => resolve(e ? "" : out)));

  const home = await dump(origin);
  for (const b of BOOKS) if (!home.includes(b.title)) err("trang chủ", `không hiện “${b.title}”`);
  ok++;
  for (const b of BOOKS) {
    const base = `books/${b.slug}/`;
    const page = await dump(origin + base);
    if (!page || page.includes("Không tìm thấy sách")) err(base, "trang sách không hiện được cuốn này");
    else ok++;
    const searchable = FORMATS.some(f => f.key !== "audio" && b[f.key] && (b.parts || []).some(p => p[f.key]));
    if (page && searchable && !page.includes('id="find"')) err(base, "trang sách không hiện ô Tìm trong sách");
    for (const f of FORMATS.filter(f => b[f.key])) {
      const parts = (b.parts || []).filter(p => p[f.key]);
      const last = parts.length ? parts[parts.length - 1].n : null;
      const where = base + f.dir;
      const dom = await dump(origin + where + (last ? `#phan-${last}` : ""));
      if (!dom) { err(where, "Chrome không mở được trang"); continue; }
      if (dom.includes("Không tìm thấy sách")) err(where, "trang không tìm thấy cuốn sách");
      if (dom.includes("Không tải được")) err(where, "có phần không tải được dữ liệu");
      const loaded = (dom.match(/class="psec"/g) || []).length;
      if (parts.length && loaded < parts.length) err(where, `mới hiện ${loaded}/${parts.length} phần`);
      else ok++;
    }
  }
  server.close();
}
await render();

/* ---------- Kết quả ---------- */
for (const w of warns) console.log("  ! " + w);
for (const e of errors) console.log("  ✗ " + e);
console.log(`\n${ok} mục đạt · ${warns.length} cảnh báo · ${errors.length} lỗi`);
process.exit(errors.length ? 1 : 0);
