# Bản đồ hành trình

Trang `books/<slug>/map/` đặt những nơi nhân vật đi qua lên bản đồ thế giới. Bản đồ dính ở đầu trang, bên dưới là danh sách các chặng theo thứ tự chương. Cuộn tới hoặc bấm một chặng thì bản đồ phóng tới chặng đó. Mẫu chuẩn: `books/hai-so-phan/map/data/hanh-trinh.js`. Code đã có (`assets/js/map.js`), nền bản đồ đã có (`assets/js/map-land.js`), thêm sách mới chỉ cần dữ liệu.

**Khi nào hợp:** sách có nhân vật đi xa, đổi chỗ nhiều (hành trình, chiến tranh, di cư). Sách diễn ra trong một thành phố thì không cần bản đồ. Dạng của cả cuốn, một file dữ liệu, không đặt cờ trong `parts`.

## Trong data/books.js

```js
map: {
  lede: "Hai câu giới thiệu: bản đồ theo ai, cách dùng (cuộn hoặc bấm vào chặng).",
  footer: "Từ <i>Tên sách</i> …. Nền bản đồ: Natural Earth. Số chương theo thứ tự trong bản ebook."
}
```

## Trang

Chép `books/hai-so-phan/map/index.html` sang `books/<slug>/map/index.html`, sửa `<head>` như trang sách. Trang nạp sẵn `assets/js/map-land.js`.

## File dữ liệu: `map/data/hanh-trinh.js`

```js
window.MAP = {
  routes: [
    {
      id: "a", who: "Wladek · Abel", side: "a",      // side: a = đỏ, b = xanh (cùng màu với dòng thời gian)
      stops: [
        {
          id: "a-slonim",                // không dấu, duy nhất trong cả file; link là map/#a-slonim
          ch: [1, 5],                    // mọi chương mà chặng này kể tới
          when: "1906 – 1915",
          place: "Slonim, Ba Lan",       // tên địa điểm theo bản dịch
          lat: 53.09, lon: 25.32,        // tọa độ thật, hai chữ số thập phân là đủ
          text: "<p>Một đến hai câu: ở đây nhân vật làm gì.</p>",
          via: [[53.9, 27.57, "Minsk"]], // tùy chọn: nơi đi qua trên đường tới chặng này, theo thứ tự
          sea: true,                     // tùy chọn: tới chặng này bằng tàu biển (vẽ nét đứt)
          meet: true,                    // tùy chọn: nơi các nhân vật chính chạm mặt (vòng màu nhấn)
          approx: "Vị trí ước chừng. Sách chỉ kể …"   // tùy chọn: khi sách không cho vị trí chính xác
        }
      ]
    }
  ]
};
```

## Cách viết

- Mỗi tuyến là một nhân vật, chặng xếp theo thứ tự thời gian trong đời nhân vật đó. Trang tự trộn các tuyến theo số chương.
- Một chặng là một nơi nhân vật ở lại hoặc có chuyện quan trọng xảy ra. Nơi chỉ đi qua thì cho vào `via` của chặng kế tiếp.
- Quay lại một nơi cũ ở thời điểm khác thì tạo chặng mới với `id` mới (ví dụ `a-irkutsk-2`). Có thể lệch tọa độ một chút để hai điểm không chồng khít.
- Địa điểm hư cấu hoặc mơ hồ: đặt ở vị trí hợp lý nhất theo lời sách, thêm `approx` nói rõ sách kể thế nào. Không bịa tên địa danh.
- `text` không lộ điều xảy ra sau các chương trong `ch`.
- Tọa độ lấy theo địa danh thật (thành phố, cảng, con sông), kiểm tra dấu: kinh độ phía tây Greenwich là số âm (New York −74).

## Nền bản đồ

`assets/js/map-land.js` là đường bờ biển thế giới tỷ lệ 1:110m (Natural Earth, miền công cộng), sinh bằng `tools/make-map-land.py`. Phép chiếu trụ đều giãn ngang theo vĩ độ 45 độ, hợp với sách diễn ra ở Bắc bán cầu. Không cần chạy lại khi thêm sách. Muốn đổi phép chiếu hoặc độ chi tiết thì đọc phần đầu file script.

## Quy trình

1. Liệt kê nơi chốn theo từng nhân vật từ dòng thời gian, tóm tắt, rồi mở lại chương gốc để chắc thứ tự và chi tiết.
2. Viết `hanh-trinh.js`, đánh dấu `meet`, `sea`, `approx` khi cần.
3. `node tools/check.mjs` (kiểm tra id trùng, tọa độ, số chương), xem thử trang: toàn cảnh, vài chặng phóng to, khổ điện thoại. Commit `"<Tên sách>: bản đồ hành trình"`.
