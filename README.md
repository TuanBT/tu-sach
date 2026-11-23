# Sổ tay đọc sách

Tủ sách cá nhân: tóm tắt và dòng thời gian cho những cuốn sách đã đọc. Mỗi cuốn có một trang dòng thời gian hai cột để xem các nhân vật làm gì vào cùng một thời điểm. Ấn vào một sự kiện để đọc chi tiết.

Xem online: https://tuanbt.github.io/tu-sach/

Trang web tĩnh, không cần cài đặt hay build. Có giao diện sáng và tối (mặc định theo máy, có nút chuyển).

## Sách hiện có

| Sách | Tác giả | Dòng thời gian |
|---|---|---|
| Hai Số Phận (Kane and Abel) | Jeffrey Archer, Nguyễn Việt Hải dịch | Đủ 8 phần, 1906–1967 |

## Cấu trúc

```
index.html                    Trang chủ: danh sách mọi cuốn sách
data/books.js                 Danh mục sách (tên, tác giả, các phần, phần nào đã có)
assets/style.css              Giao diện dùng chung, gồm cả màu sáng/tối
assets/site.js                Thanh đường dẫn, nút sáng/tối, trang chủ, trang sách
assets/timeline.js            Vẽ trang dòng thời gian của một cuốn sách
books/<tên-sách>/
  index.html                  Trang của cuốn sách: giới thiệu và danh sách phần
  timeline.html               Dòng thời gian toàn bộ cuốn sách
  data/phan-1.js … phan-N.js  Dữ liệu từng phần
```

## Hiệu năng

- Trang dòng thời gian chỉ tải file dữ liệu của một phần khi người xem cuộn gần tới hoặc bấm chọn phần đó.
- Nội dung chi tiết của mỗi sự kiện chỉ được tạo khi bấm mở.
- Không dùng framework, không có bước build. Toàn bộ mã JavaScript chưa đến 20 KB.

## Xem trên máy

Mở thẳng `index.html` bằng trình duyệt. Dữ liệu được nạp bằng thẻ `<script>` nên không cần chạy server.

## Thêm một phần cho sách đã có

1. Tạo `books/<tên-sách>/data/phan-N.js` theo mẫu `phan-1.js`.
2. Trong `data/books.js`, thêm `ready: true` vào phần đó. Phần chưa có `ready` sẽ hiện "Đang cập nhật".

## Thêm một cuốn sách mới

1. Thêm một object vào mảng `window.BOOKS` trong `data/books.js` (xem mẫu Hai Số Phận): `slug` viết không dấu, ví dụ `"nha-gia-kim"`, thông tin `timeline` và danh sách `parts`.
2. Tạo thư mục `books/nha-gia-kim/`, chép `index.html` và `timeline.html` của Hai Số Phận vào, đổi `"hai-so-phan"` thành slug mới.
3. Thêm các file `data/phan-N.js`.

## Định dạng dữ liệu một phần

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

## Bản quyền

Repo chỉ chứa phần tóm tắt và ghi chú do mình viết lại, cùng vài câu trích ngắn. Không đưa file sách (.azw3, .epub, .pdf) hay văn bản gốc của sách lên đây.
