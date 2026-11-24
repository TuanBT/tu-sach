# Nhân vật

Trang `books/<slug>/characters/` cho người đọc tra nhanh "ai là ai": mỗi người một thẻ, có dòng tả lúc mới xuất hiện và các mốc về sau, mỗi mốc gắn số chương. Mẫu chuẩn: `books/hai-so-phan/characters/data/nhan-vat.js`. Code đã có (`assets/js/characters.js`), thêm sách mới chỉ cần dữ liệu.

Đây là dạng của cả cuốn: một file dữ liệu duy nhất, không đặt cờ trong `parts`. Nên làm khi cuốn sách đã có dòng thời gian hoặc tóm tắt đủ nhiều phần, vì các mốc lấy từ đó (rồi đối chiếu lại với sách).

## Trong data/books.js

```js
characters: {
  lede: "Hai đến ba câu giới thiệu trang, nhắc người đang đọc dở dùng nút Che phần chưa đọc.",
  footer: "Từ <i>Tên sách</i> (Tên gốc), Tác giả, Dịch giả dịch. Số chương theo thứ tự trong bản ebook."
}
```

## Trang

Chép `books/hai-so-phan/characters/index.html` sang `books/<slug>/characters/index.html`, sửa `<head>` như trang sách (URL `…/books/<slug>/characters/`).

## File dữ liệu: `characters/data/nhan-vat.js`

```js
window.CHARS = {
  groups: [
    { id: "chinh", title: "Hai nhân vật chính", side: "both" },   // side: màu thẻ. a = đỏ, b = xanh, both = màu nhấn
    { id: "a", title: "Quanh …", side: "a" }
  ],
  people: [
    {
      id: "wladek",                    // không dấu, duy nhất; link là characters/#nv-wladek
      group: "chinh",
      side: "a",                       // tùy chọn, ghi đè màu của nhóm
      ch: 1,                           // chương xuất hiện lần đầu (theo ebook)
      name: "Wladek Koskiewicz",       // tên lúc mới xuất hiện
      names: [{ ch: 21, name: "Abel Rosnovski" }],   // tùy chọn: tên đổi về sau
      role: "Một đến hai câu tả nhân vật lúc mới xuất hiện.",
      notes: [
        { ch: [5], text: "Một câu về một mốc đời nhân vật." },
        { ch: [11, 13], text: "…" }
      ]
    }
  ]
};
```

## Cách viết

- **Chọn ai:** nhân vật người đọc dễ quên hoặc dễ lẫn. Nhân vật chỉ xuất hiện một cảnh mà không ảnh hưởng gì về sau thì bỏ. Hai người trùng tên thì dùng tên đầy đủ khác nhau như trong sách (ví dụ "Richard Lowell Kane" và "Richard Kane").
- **`ch`:** chương nhân vật thật sự xuất hiện lần đầu, kể cả khi chưa được gọi tên. Dò bằng cách tìm tên trong văn bản từng chương, cẩn thận các chữ trùng (ví dụ "George Washington" không phải George Novak).
- **`role`:** chỉ những gì người đọc đã biết ở chương `ch`. Không viết "về sau…", không lộ quan hệ được tiết lộ muộn.
- **`notes`:** mỗi mục một mốc, một hai câu, theo thứ tự chương. `ch` ghi mọi chương mà câu đó kể tới. Một mốc lộ một bí mật lớn thì để riêng một mục, đúng chương tiết lộ.
- **`names`:** chỉ khi nhân vật đổi tên hay được gọi bằng tên khác từ một chương nhất định. Trang hiện tên mới nhất mà người đọc đã tới.
- Văn phong theo SKILL.md. Có thể dùng `<b>` cho chi tiết then chốt, không dùng link hay class.

## Quy trình

1. Lập danh sách người, dò chương xuất hiện đầu tiên trong văn bản sách.
2. Viết `role` và `notes`, lấy từ dòng thời gian, tóm tắt đã có rồi mở lại chương gốc khi cần.
3. `node tools/check.mjs` (kiểm tra id trùng, nhóm, số chương, mốc sớm hơn chương xuất hiện), xem thử trang ở chế độ che vài chương khác nhau, commit `"<Tên sách>: trang nhân vật"`.
