# Sổ tay đọc sách

Tủ sách cá nhân: dòng thời gian, tóm tắt và audio cho những cuốn sách đã đọc.

Xem online: https://tusach.buitientuan.com

Trang web tĩnh chạy trên GitHub Pages, không cần cài đặt hay build. Có giao diện sáng và tối (mặc định theo máy, có nút chuyển). Cài được lên điện thoại như một ứng dụng, đọc lại được những trang đã mở khi không có mạng. Dán link vào Zalo, Messenger, Facebook sẽ hiện ảnh xem trước.

## Sách hiện có

| Sách | Tác giả | Đã có |
|---|---|---|
| Hai Số Phận (Kane and Abel) | Jeffrey Archer, Nguyễn Việt Hải dịch | Dòng thời gian đủ 8 phần, 1906–1967. Tóm tắt Phần Một (chương 1–21) |

## Cấu trúc

```
index.html                  Trang chủ: tủ sách
404.html                    Trang không tìm thấy, kiêm chuyển link cũ sang chỗ mới
CNAME                       Tên miền riêng cho GitHub Pages
manifest.webmanifest        Thông tin để cài lên điện thoại: tên, màu, icon
sw.js                       Service worker: lưu trang đã mở để đọc khi mất mạng
data/
  books.js                  Danh mục sách: tên, tác giả, các phần, có những dạng nội dung nào
assets/
  css/style.css             Giao diện dùng chung, gồm cả màu sáng/tối
  js/site.js                Thanh đường dẫn, nút sáng/tối, trang chủ, trang giới thiệu sách, Google Analytics
  js/timeline.js            Trang dòng thời gian
  js/summary.js             Trang tóm tắt
  icons/                    Icon trang web và ứng dụng (icon.svg là bản gốc)
  img/og.png                Ảnh xem trước khi chia sẻ link trang chủ
books/
  <slug>/                   Một cuốn sách, slug viết không dấu, ví dụ hai-so-phan
    index.html              Trang giới thiệu cuốn sách
    og.png                  Ảnh xem trước khi chia sẻ link của cuốn sách
    timeline/               Dòng thời gian
      index.html
      data/phan-1.js …      Dữ liệu từng phần
    summary/                Tóm tắt theo phần, theo chương
      index.html
      data/phan-1.js …      Dữ liệu từng phần
    audio/                  Audio (chưa có cuốn nào)
tools/
  check.mjs                 Kiểm tra toàn bộ trước khi commit: node tools/check.mjs
  make-images.sh            Tạo lại icon và ảnh xem trước bằng Chrome headless
  og.html                   Mẫu ảnh xem trước 1200×630
  icon-maskable.svg         Icon không bo góc cho Android và iPhone
```

URL đi theo thư mục: `tusach.buitientuan.com/books/hai-so-phan/timeline/#phan-3`.

Trang tự đọc slug từ tên thư mục rồi tìm cuốn sách trong `data/books.js`, nên phần `<body>` của các file `index.html` giống hệt nhau giữa các cuốn sách. Chỉ phần `<head>` khác nhau ở tiêu đề, mô tả và ảnh xem trước, vì Zalo hay Facebook đọc thẳng các thẻ này mà không chạy JavaScript.

## Làm cùng AI

Quy chuẩn chi tiết (văn phong, định dạng từng dạng nội dung, cách đọc ebook, kiểm tra, commit) nằm trong skill `.claude/skills/tu-sach/`. `CLAUDE.md` nhắc Claude dùng skill này cho mọi việc về nội dung sách.

Trước khi commit, chạy `node tools/check.mjs`: script kiểm tra danh mục, file dữ liệu từng phần, số chương, thẻ chia sẻ, ảnh, file không được đưa lên, rồi mở thử mọi trang bằng Chrome headless. Có lỗi (✗) thì phải sửa.

Mỗi phần trong `parts` đánh dấu dạng nào đã xong cho phần đó: `timeline: true`, `summary: true`, `audio: true`.

## Thêm một cuốn sách mới

1. Thêm một object vào mảng `window.BOOKS` trong `data/books.js` (xem mẫu Hai Số Phận). `slug` phải trùng tên thư mục.
2. Chép `books/hai-so-phan/index.html` sang `books/<slug>/index.html`. Trong `<head>`, sửa `<title>`, `description`, `canonical` và các thẻ `og:` (tên, mô tả, link, ảnh) cho cuốn mới.
3. Tạo ảnh xem trước: `tools/make-images.sh og books/<slug>/og.png "Sổ tay đọc sách" "<Tên sách>" "<Tên gốc · Tác giả>" "<Dạng nội dung>"`.
4. Với mỗi dạng nội dung cuốn sách có, tạo thư mục con tương ứng (xem bên dưới) và thêm object cùng tên vào cuốn sách trong `data/books.js`. Trang sách và trang chủ tự hiện các dạng có trong danh mục.

## Các dạng nội dung

| Dạng | Thư mục | Khóa trong `books.js` | Mã vẽ trang |
|---|---|---|---|
| Dòng thời gian | `timeline/` | `timeline: {...}` | `assets/js/timeline.js` |
| Tóm tắt | `summary/` | `summary: {...}` | `assets/js/summary.js` |
| Audio | `audio/` | `audio: {...}` | sẽ thêm `assets/js/audio.js` khi có cuốn đầu tiên |

Danh sách các dạng nằm ở `FORMATS` đầu file `assets/js/site.js`. Thêm một dạng mới: thêm một dòng vào đó, viết file JS vẽ trang trong `assets/js/`, và một `index.html` trong thư mục con của sách.

### Dòng thời gian

Thêm cho một cuốn sách:

1. Chép `books/hai-so-phan/timeline/index.html` sang `books/<slug>/timeline/index.html` và sửa các thẻ trong `<head>` như trang sách.
2. Tạo `books/<slug>/timeline/data/phan-N.js` cho từng phần.
3. Trong `data/books.js`: thêm object `timeline` (years, credit, lede, footer, born tùy chọn) và danh sách `parts`. Phần nào đã có dữ liệu thì đặt `timeline: true` cho phần đó; phần chưa có dạng nào thì hiện "Sắp có".

Định dạng dữ liệu một phần:

```js
(window.TL = window.TL || {})[1] = {
  intro: "Một hai câu giới thiệu phần này",
  axisLabel: "Năm<br>tuổi",
  people: {
    a: { name: "Nhân vật cột trái", short: "Tên ngắn", initial: "A", sub: "mô tả ngắn" },
    b: { name: "Nhân vật cột phải", short: "Tên ngắn", initial: "B", sub: "mô tả ngắn" }
  },
  rows: [
    {
      year: "1906", age: "Chào đời",           // nhãn trên trục giữa
      a: [ { when: "18/4/1906", place: "Nơi chốn", ch: [1],
             title: "Tiêu đề", tease: "Một dòng tóm tắt",
             body: "<p>Đoạn chi tiết (HTML).</p>" } ],
      b: [ /* sự kiện của cột phải */ ],
      both: [ /* sự kiện chung của cả hai, hiện ở giữa */ ],
      aEmpty: "Chữ hiện khi cột trái không có sự kiện",
      note: "Ghi chú song hành (tùy chọn)"
    }
  ]
};
```

Các trường tùy chọn: `shared` (đánh dấu hàng đặc biệt), `bothLast` (sự kiện chung xảy ra sau hai bên; mặc định nó hiện ngay dưới năm), `tag` trên một sự kiện (nhãn riêng, ví dụ "Hai nhà").

### Tóm tắt

Thêm cho một cuốn sách: chép `books/hai-so-phan/summary/index.html` sang `books/<slug>/summary/index.html` (sửa `<head>` như trang sách), thêm object `summary: { lede, footer }` vào cuốn sách trong `data/books.js`, rồi tạo `books/<slug>/summary/data/phan-N.js` cho từng phần và đặt `summary: true` cho phần đó.

```js
(window.SUM = window.SUM || {})[1] = {
  intro: "Một hai câu: phần này nói về gì",
  chapters: [
    { ch: [1], title: "Tên chương", tease: "Một câu ý chính", body: "<p>…</p>", points: ["…"] }  // points tùy chọn
  ]
};
```

`ch` là danh sách số chương theo thứ tự trong ebook (`[7, 8]` khi gộp hai chương ngắn). Mỗi chương thành một mục có link riêng `#chuong-N`.

### Audio: lưu file ở đâu

GitHub giới hạn mỗi file 100 MB và cả trang khoảng 1 GB, nên không đưa file mp3 vào repo. Một cuốn sách nói vài giờ đã vài trăm MB. Để file audio ở chỗ khác (Cloudflare R2, Google Drive, YouTube…) và trong repo chỉ lưu đường link.

## Cài lên điện thoại

- Android (Chrome) và máy tính: nút **Cài ứng dụng** ở thanh trên cùng mở hộp cài của trình duyệt.
- iPhone, iPad: không có hộp cài tự động, nút hiện hướng dẫn bấm Chia sẻ rồi chọn **Thêm vào MH chính**.
- Đang mở như ứng dụng thì nút tự ẩn.

`sw.js` luôn lấy bản mới từ mạng trước và lưu lại một bản, khi mất mạng mới dùng bản đã lưu. Vì vậy thêm sách hay sửa nội dung không cần đụng tới file này; chỉ tăng số `CACHE` khi sửa danh sách `SHELL` trong đó.

Đổi icon: sửa `assets/icons/icon.svg` (và `tools/icon-maskable.svg`), rồi chạy `tools/make-images.sh icons`.

## Ảnh xem trước khi chia sẻ link

Mỗi trang có các thẻ `og:` trong `<head>`, trỏ tới ảnh 1200×630: `assets/img/og.png` cho trang chủ, `books/<slug>/og.png` cho từng cuốn sách. Ảnh được tạo từ mẫu `tools/og.html` bằng `tools/make-images.sh og …`.

Zalo và Facebook lưu ảnh xem trước một thời gian. Nếu đổi ảnh mà link cũ vẫn hiện ảnh cũ, vào [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) và bấm "Scrape Again".

## Thống kê lượt xem

Dùng Google Analytics 4: property `tusach` (Measurement ID `G-6YVSF3Q211`) trong tài khoản GA `tuan`, luồng web `https://tusach.buitientuan.com`. Xem số liệu ở [analytics.google.com](https://analytics.google.com).

Mã GA nằm trong `assets/js/site.js`, không dán vào từng file HTML. Mọi trang đều nạp file này nên trang sách mới tự được đếm. Mã chỉ chạy khi tên miền là `tusach.buitientuan.com`, nên mở file trên máy hay chạy `tools/check.mjs` không làm sai số liệu.

## Trên trang một cuốn sách

- **Đọc tiếp**: trang dòng thời gian và tóm tắt ghi nhớ (trong trình duyệt) phần đang xem; trang sách hiện một nút dẫn về đúng chỗ đó.
- **Tìm trong sách**: ô tìm kiếm tìm trên mọi dòng thời gian và tóm tắt đã có của cuốn sách, gõ không dấu cũng được. Lần đầu gõ mới tải dữ liệu, tìm ngay trên máy, không cần server.
- **Link tới từng chương**: `summary/#chuong-7` mở thẳng chương 7 (nạp các phần phía trên trước rồi mới cuộn). Thẻ sự kiện ở dòng thời gian có link "Đọc tóm tắt chương …" khi chương đó đã được tóm tắt.

## Hiệu năng

- Trang dòng thời gian và tóm tắt chỉ tải file dữ liệu của một phần khi người xem cuộn gần tới hoặc bấm chọn phần đó (code dùng chung: `Site.lazyParts` trong `assets/js/site.js`).
- Nội dung chi tiết của mỗi sự kiện chỉ được tạo khi bấm mở.
- Không dùng framework, không có bước build.

## Xem trên máy

Mở thẳng `index.html` bằng trình duyệt. Dữ liệu được nạp bằng thẻ `<script>` nên không cần chạy server. Riêng `404.html` chỉ chạy đúng trên web.

## Tên miền

Trang chạy ở GitHub Pages (repo `TuanBT/tu-sach`, nhánh `main`, thư mục gốc) với tên miền riêng `tusach.buitientuan.com`, khai báo trong file `CNAME`. DNS của `buitientuan.com` ở Cloudflare, có bản ghi CNAME `tusach` trỏ tới `tuanbt.github.io`. Link cũ `tuanbt.github.io/tu-sach/...` được GitHub tự chuyển sang tên miền mới.

## Bản quyền

Repo chỉ chứa phần tóm tắt và ghi chú do mình viết lại, cùng vài câu trích ngắn. Không đưa file sách (.azw3, .epub, .pdf) hay văn bản gốc của sách lên đây.
