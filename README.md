# Sổ tay đọc sách

Tủ sách cá nhân: tóm tắt và dòng thời gian cho những cuốn sách đã đọc. Mỗi cuốn được chia theo phần, mỗi phần là một trang dòng thời gian hai cột để xem các nhân vật làm gì vào cùng một thời điểm. Ấn vào một sự kiện để đọc chi tiết.

Trang web tĩnh, không cần cài đặt hay build. Có giao diện sáng và tối (mặc định theo máy, có nút chuyển).

## Sách hiện có

| Sách | Tác giả | Đã có |
|---|---|---|
| Hai Số Phận (Kane and Abel) | Jeffrey Archer, Nguyễn Việt Hải dịch | Phần Một (1906–1923) |

## Cấu trúc

```
index.html                 Trang chủ: danh sách mọi cuốn sách
data/books.js              Danh mục sách (tên, tác giả, các phần)
assets/style.css           Giao diện dùng chung, gồm cả màu sáng/tối
assets/site.js             Thanh đường dẫn, nút sáng/tối, trang chủ, trang sách
assets/timeline.js         Vẽ trang dòng thời gian từ một file dữ liệu
books/<tên-sách>/
  index.html               Trang của cuốn sách: giới thiệu và danh sách phần
  phan-1.html              Trang dòng thời gian của một phần
  phan-1.js                Dữ liệu của phần đó
```

## Xem trên máy

Mở thẳng `index.html` bằng trình duyệt. Dữ liệu được nạp bằng thẻ `<script>` nên không cần chạy server.

## Thêm một phần mới cho sách đã có

1. Chép `books/hai-so-phan/phan-1.js` thành `phan-2.js` và sửa nội dung.
2. Chép `phan-1.html` thành `phan-2.html`, đổi `phan-1.js` thành `phan-2.js` và tên phần trong thanh đường dẫn.
3. Trong `data/books.js`, thêm `href: "phan-2.html"` vào phần tương ứng. Phần chưa có `href` sẽ hiện "Sắp có".

## Thêm một cuốn sách mới

1. Thêm một object vào mảng `window.BOOKS` trong `data/books.js` với `slug` viết không dấu, ví dụ `"nha-gia-kim"`.
2. Tạo thư mục `books/nha-gia-kim/`, chép `index.html` của Hai Số Phận vào và đổi `"hai-so-phan"` thành slug mới.
3. Thêm các trang phần như hướng dẫn ở trên.

## Định dạng dữ liệu một phần

```js
window.TIMELINE = {
  book: "Tên sách", part: "Phần Một", years: "1906 – 1923",
  credit: "Tác giả · Người dịch dịch",
  people: {
    a: { name: "Nhân vật cột trái", short: "Tên ngắn", initial: "A", sub: "mô tả ngắn" },
    b: { name: "Nhân vật cột phải", short: "Tên ngắn", initial: "B", sub: "mô tả ngắn" }
  },
  rows: [
    {
      year: "1906", age: "Chào đời",          // nhãn trên trục giữa
      a: [ { when: "18/4/1906", place: "Nơi chốn", ch: [1],
             title: "Tiêu đề", tease: "Một dòng tóm tắt",
             body: "<p>Đoạn chi tiết (HTML).</p>" } ],
      b: [ /* sự kiện của cột phải */ ],
      aEmpty: "Chữ hiện khi cột trái không có sự kiện",
      note: "Ghi chú song hành (tùy chọn)"
    }
  ]
};
```

Các trường tùy chọn: `born`, `lede`, `axisLabel`, `footer`, `shared` (đánh dấu hàng đặc biệt).

## Bản quyền

Repo chỉ chứa phần tóm tắt và ghi chú do mình viết lại, cùng vài câu trích ngắn. Không đưa file sách (.azw3, .epub, .pdf) hay văn bản gốc của sách lên đây.
