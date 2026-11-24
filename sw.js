/* Sổ tay đọc sách · service worker.
   Cho phép cài trang lên màn hình điện thoại và đọc lại những trang đã mở khi không có mạng.

   Trang của mình: luôn lấy bản mới từ mạng trước, lưu lại một bản; mất mạng mới dùng bản đã lưu.
   Vì vậy thêm sách hay sửa nội dung không cần đổi gì ở file này.
   Font Google: dùng bản đã lưu nếu có (font không đổi).
   Chỉ cần tăng CACHE khi sửa danh sách SHELL bên dưới. */
const CACHE = "sotay-v1";
const SHELL = [
  "./",
  "assets/css/style.css",
  "assets/js/site.js",
  "assets/js/timeline.js",
  "data/books.js",
  "manifest.webmanifest",
  "assets/icons/icon.svg",
  "assets/icons/icon-192.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function save(req, res) {
  if (res.ok || res.type === "opaque") {
    const copy = res.clone();
    caches.open(CACHE).then(c => c.put(req, copy));
  }
  return res;
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  const font = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";

  if (font) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => save(req, res))));
    return;
  }
  if (url.origin !== location.origin) return;

  e.respondWith(
    fetch(req)
      .then(res => save(req, res))
      .catch(() => caches.match(req, { ignoreSearch: true })
        .then(hit => hit || (req.mode === "navigate" ? caches.match("./") : Response.error())))
  );
});
