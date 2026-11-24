# Dòng thời gian

Trang `books/<slug>/timeline/` đặt hai cuộc đời (hoặc hai tuyến truyện) song song: cột trái `a`, cột phải `b`, trục năm ở giữa. Người đọc lướt theo năm để thấy hai bên làm gì cùng lúc, ấn vào thẻ để đọc chi tiết. Mẫu chuẩn: `books/hai-so-phan/timeline/data/phan-1.js`. Đọc một đoạn của nó trước khi viết để bắt đúng giọng.

**Khi nào hợp:** sách có hai nhân vật hoặc hai tuyến chạy song song theo thời gian. Sách chỉ có một nhân vật chính, hoặc sách phi hư cấu, thường hợp với tóm tắt hơn. Nếu vẫn muốn làm dòng thời gian, hỏi người dùng nên chia hai cột thế nào.

## Trong data/books.js

```js
timeline: {
  years: "1906 – 1967",                         // khoảng thời gian cả cuốn
  credit: "Jeffrey Archer · Nguyễn Việt Hải dịch",
  born: { aName: "Wladek", a: "Slonim, Ba Lan", date: "18 · 4 · 1906", b: "Boston, Mỹ", bName: "William" },
                                                // tùy chọn: chỉ khi hai bên có chung một mốc mở đầu
  lede: "Hai đến ba câu giới thiệu trang và cách dùng: <b>Ấn vào sự kiện</b> để đọc chi tiết, <b>ấn vào năm</b> để mở cả hai bên…",
  footer: "Tóm tắt từ <i>Tên sách</i> (Tên gốc), Tác giả, Dịch giả dịch. Số chương theo thứ tự trong bản ebook."
}
```

Mỗi phần đã xong: thêm `timeline: true` vào phần đó trong `parts`. Có thể kèm `years: "1906 – 1923"` cho phần.

## Trang

Lần đầu làm dòng thời gian cho một cuốn: chép `books/hai-so-phan/timeline/index.html` sang `books/<slug>/timeline/index.html`, giữ nguyên `<body>`, sửa các thẻ trong `<head>` như trang sách (URL `…/books/<slug>/timeline/`, `og:image` dùng chung `books/<slug>/og.png`).

## File dữ liệu một phần: `timeline/data/phan-N.js`

```js
/* <Tên sách> · Phần <chữ> (<năm> – <năm>) · chương <x>–<y>
   Cột trái (a): <nhân vật>. Cột phải (b): <nhân vật>. */
(window.TL = window.TL || {})[N] = {
  intro: "Một đến hai câu: phần này đi từ đâu tới đâu.",
  axisLabel: "Năm<br>tuổi",              // nhãn trục; "Năm" nếu không ghi tuổi
  people: {
    a: { name: "Tên đầy đủ", short: "Tên ngắn", initial: "W", sub: "mô tả ngắn ở phần này" },
    b: { name: "…", short: "…", initial: "K", sub: "…" }
  },
  rows: [
    {
      year: "1911", age: "5 tuổi",
      a: [ { when, place, ch, title, tease, body } ],
      b: [ … ],
      both: [ … ],                       // tùy chọn: sự kiện cả hai cùng có mặt
      aEmpty: "…", bEmpty: "…",          // tùy chọn: khi một bên không có sự kiện
      note: "…"                          // tùy chọn: câu "Song hành"
    }
  ]
};
```

`people` khai báo lại ở mỗi phần vì tên và mô tả có thể đổi (Wladek thành Abel Rosnovski từ Phần Hai).

## Cách viết từng trường

**intro**: một đến hai câu, nêu điểm đầu và điểm cuối của phần. Không tiết lộ gì của phần sau.

**Hàng (row)**: một mốc thời gian, xếp tăng dần.
- `year`: ngắn, `"1911"` hoặc khoảng gọn `"1907–10"`, `"1963–66"`.
- `age`: `"Chào đời"`, `"5 tuổi"`, `"57–60 tuổi"`. Bỏ nếu không hợp (hai nhân vật khác tuổi thì ghi tuổi trong `when` hoặc `sub`).
- `shared: true`: chỉ cho hàng đặc biệt mà hai bên trùng mốc (ví dụ cùng ngày sinh).
- Gộp những năm ít chuyện thành một hàng; tách năm nhiều biến cố thành hàng riêng.

**Sự kiện**:
- `when`: chính xác như sách cho phép: `"18/4/1906"`, `"Giáng sinh 1911"`, `"Mùa thu 1911"`, `"Khoảng 1908"`, `"1907 – 1911"`, `"10/1907 – 10/1908"`.
- `place`: ngắn, nhiều nơi nối bằng ` · `: `"New York · Warsaw · Paris"`.
- `ch`: mảng số chương (thứ tự ebook) mà sự kiện lấy từ đó, `[5]` hoặc `[2, 4]`.
- `title`: 2 đến 6 từ, gợi tò mò, không lộ kết quả. Tốt: "Nam tước gõ cửa", "Đôi găng tay". Tránh: "Wladek được nhận vào lâu đài".
- `tease`: một câu dưới khoảng 15 từ, hiện khi thẻ đóng, nói việc chính.
- `body`: 1 đến 3 đoạn `<p>`. Đủ để nhớ lại diễn biến, nguyên nhân, hệ quả; không kể lan sang sự kiện khác.
- `tag`: tùy chọn, thay nhãn tên nhân vật trên thẻ, ví dụ `"Hai nhà"` cho chuyện của thế hệ sau.

**both**: sự kiện cả hai bên cùng có mặt hoặc va chạm trực tiếp. Mặc định hiện ngay dưới năm (xảy ra trước sự kiện hai bên); đặt `bothLast: true` ở hàng nếu nó xảy ra sau.

**aEmpty / bEmpty**: khi một bên không có gì ở mốc đó, một câu ngắn giải thích (đang ở đâu, vì sao vắng). Phần đầu hoặc cuối có thể dùng để nối sang phần khác.

**note** (hiện là "Song hành"): một câu nối hai cột khi có đối xứng đáng chú ý, khoảng một phần ba số hàng, không phải hàng nào cũng có. Tô màu theo nhân vật bằng `<span class="an">…</span>` (cột trái) và `<span class="bn">…</span>` (cột phải).

**Báo trước**: `<p class="fs">→ Lời cảnh báo này sẽ quay lại vào năm 1922.</p>` ở cuối `body`, chỉ khi chi tiết sẽ quay lại thật sự, hiếm thôi.

## Độ dày

Mẫu Hai Số Phận: phần dài 21 chương có 12 hàng, 38 sự kiện; phần 3 đến 4 chương có 3 đến 6 hàng, 7 đến 14 sự kiện. Mỗi chương trong phần nên được nhắc ở ít nhất một sự kiện (`tools/check.mjs` cảnh báo chương bị sót).

## Quy trình một phần

1. Đọc hết các chương của phần (xem `ebook.md`), ghi nháp mốc thời gian của từng bên ra scratchpad.
2. Dựng hàng theo năm, rồi viết sự kiện.
3. Ghi file `phan-N.js`, thêm `timeline: true` cho phần đó trong `data/books.js`.
4. `node tools/check.mjs`, xem thử trang, commit `"<Tên sách>: dòng thời gian Phần <chữ> (<năm>–<năm>)"`, push.
