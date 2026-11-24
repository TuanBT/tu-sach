# Sổ tay đọc sách

Tủ sách cá nhân: dòng thời gian, tóm tắt và audio cho những cuốn sách đã đọc.

Xem online: https://tusach.buitientuan.com

Trang web tĩnh chạy trên GitHub Pages, không cần cài đặt hay build. Có giao diện sáng và tối (mặc định theo máy, có nút chuyển).

## Sách hiện có

| Sách | Tác giả | Đã có |
|---|---|---|
| Hai Số Phận (Kane and Abel) | Jeffrey Archer, Nguyễn Việt Hải dịch | Dòng thời gian đủ 8 phần, 1906–1967 |

## Cấu trúc

```
index.html                  Trang chủ: tủ sách
404.html                    Trang không tìm thấy, kiêm chuyển link cũ sang chỗ mới
CNAME                       Tên miền riêng cho GitHub Pages
data/
  books.js                  Danh mục sách: tên, tác giả, các phần, có những dạng nội dung nào
assets/
  css/style.css             Giao diện dùng chung, gồm cả màu sáng/tối
  js/site.js                Thanh đường dẫn, nút sáng/tối, trang chủ, trang giới thiệu sách
  js/timeline.js            Trang dòng thời gian
books/
  <slug>/                   Một cuốn sách, slug viết không dấu, ví dụ hai-so-phan
    index.html              Trang giới thiệu cuốn sách
    timeline/               Dòng thời gian
      index.html
      data/phan-1.js …      Dữ liệu từng phần
    summary/                Tóm tắt (chưa có cuốn nào)
    audio/                  Audio (chưa có cuốn nào)
```

URL đi theo thư mục: `tusach.buitientuan.com/books/hai-so-phan/timeline/#phan-3`.

Mọi file `index.html` trong `books/` của các cuốn sách giống hệt nhau: trang tự đọc slug từ tên thư mục rồi tìm cuốn sách trong `data/books.js`. Vì vậy thêm sách mới chỉ cần chép thư mục, không phải sửa HTML.

## Thêm một cuốn sách mới

1. Thêm một object vào mảng `window.BOOKS` trong `data/books.js` (xem mẫu Hai Số Phận). `slug` phải trùng tên thư mục.
2. Chép `books/hai-so-phan/index.html` sang `books/<slug>/index.html`.
3. Với mỗi dạng nội dung cuốn sách có, tạo thư mục con tương ứng (xem bên dưới) và thêm object cùng tên vào cuốn sách trong `data/books.js`. Trang sách và trang chủ tự hiện các dạng có trong danh mục.

## Các dạng nội dung

| Dạng | Thư mục | Khóa trong `books.js` | Mã vẽ trang |
|---|---|---|---|
| Dòng thời gian | `timeline/` | `timeline: {...}` | `assets/js/timeline.js` |
| Tóm tắt | `summary/` | `summary: {...}` | sẽ thêm `assets/js/summary.js` khi có cuốn đầu tiên |
| Audio | `audio/` | `audio: {...}` | sẽ thêm `assets/js/audio.js` khi có cuốn đầu tiên |

Danh sách các dạng nằm ở `FORMATS` đầu file `assets/js/site.js`. Thêm một dạng mới: thêm một dòng vào đó, viết file JS vẽ trang trong `assets/js/`, và một `index.html` trong thư mục con của sách.

### Dòng thời gian

Thêm cho một cuốn sách:

1. Chép `books/hai-so-phan/timeline/index.html` sang `books/<slug>/timeline/index.html`.
2. Tạo `books/<slug>/timeline/data/phan-N.js` cho từng phần.
3. Trong `data/books.js`: thêm object `timeline` (years, credit, lede, footer, born tùy chọn) và danh sách `parts`. Phần nào đã có dữ liệu thì đặt `ready: true`; chưa có thì hiện "Sắp có".

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

### Audio: lưu file ở đâu

GitHub giới hạn mỗi file 100 MB và cả trang khoảng 1 GB, nên không đưa file mp3 vào repo. Một cuốn sách nói vài giờ đã vài trăm MB. Để file audio ở chỗ khác (Cloudflare R2, Google Drive, YouTube…) và trong repo chỉ lưu đường link.

## Hiệu năng

- Trang dòng thời gian chỉ tải file dữ liệu của một phần khi người xem cuộn gần tới hoặc bấm chọn phần đó.
- Nội dung chi tiết của mỗi sự kiện chỉ được tạo khi bấm mở.
- Không dùng framework, không có bước build.

## Xem trên máy

Mở thẳng `index.html` bằng trình duyệt. Dữ liệu được nạp bằng thẻ `<script>` nên không cần chạy server. Riêng `404.html` chỉ chạy đúng trên web.

## Tên miền

Trang chạy ở GitHub Pages (repo `TuanBT/tu-sach`, nhánh `main`, thư mục gốc) với tên miền riêng `tusach.buitientuan.com`, khai báo trong file `CNAME`. DNS của `buitientuan.com` ở Cloudflare, có bản ghi CNAME `tusach` trỏ tới `tuanbt.github.io`. Link cũ `tuanbt.github.io/tu-sach/...` được GitHub tự chuyển sang tên miền mới.

## Bản quyền

Repo chỉ chứa phần tóm tắt và ghi chú do mình viết lại, cùng vài câu trích ngắn. Không đưa file sách (.azw3, .epub, .pdf) hay văn bản gốc của sách lên đây.
