# Tóm tắt

Trang `books/<slug>/summary/` tóm tắt cuốn sách theo phần, trong mỗi phần theo chương. Người đọc đọc thẳng như một bài viết, không phải bấm mở từng thẻ. Hợp với mọi loại sách: truyện thì kể lại diễn biến, sách phi hư cấu thì rút ý chính.

## Trong data/books.js

```js
summary: {
  lede: "Một đoạn ngắn: cả cuốn nói về gì. Truyện thì không tiết lộ kết thúc.",
  footer: "Tóm tắt từ <i>Tên sách</i> (Tên gốc), Tác giả, Dịch giả dịch. Số chương theo thứ tự trong bản ebook."
}
```

Mỗi phần đã tóm tắt: thêm `summary: true` vào phần đó trong `parts`. Sách không chia phần: một phần `{ n: 1, title: "Cả cuốn", ch: [1, N], summary: true }`.

## Trang

Chép `books/<slug>/timeline/index.html` (hoặc của Hai Số Phận) sang `books/<slug>/summary/index.html`, đổi `timeline.js` thành `summary.js` và `Timeline.page()` thành `Summary.page()`. Trong `<head>`: `<title>Tên sách · Tóm tắt</title>`, URL `…/books/<slug>/summary/`, `og:image` dùng chung `books/<slug>/og.png`.

## File dữ liệu một phần: `summary/data/phan-N.js`

```js
/* <Tên sách> · Tóm tắt Phần <chữ> · chương <x>–<y> */
(window.SUM = window.SUM || {})[N] = {
  intro: "Một đến hai câu: phần này nói về gì.",
  chapters: [
    {
      ch: [1],                       // số chương theo thứ tự ebook; gộp chương ngắn: [1, 2]
      title: "Tên chương",           // tên chương của bản dịch; sách không đặt tên thì tự đặt 2 đến 6 từ
      tease: "Một câu nêu ý chính của chương.",
      body: `<p>…</p><p>…</p>`,
      points: ["…", "…", "…"]        // tùy chọn, chủ yếu cho sách phi hư cấu
    }
  ]
};
```

## Cách viết

**Truyện (hư cấu):**
- Mỗi chương 1 đến 3 đoạn `<p>`, khoảng 80 đến 200 từ: ai làm gì, vì sao, dẫn tới đâu. Giữ đúng trình tự sách kể.
- Không dùng `points`.
- Chương ngắn liền nhau, cùng một cảnh, có thể gộp thành một mục (`ch: [7, 8]`).

**Phi hư cấu:**
- `body`: luận điểm chính của chương và lập luận hoặc ví dụ tiêu biểu tác giả dùng (tóm trong một câu). Không thêm ý kiến riêng ngoài sách.
- `points`: 3 đến 5 ý, mỗi ý một câu ngắn, người đọc nhớ được hoặc làm theo được.

**Chung:** theo mục Văn phong trong SKILL.md. Mỗi chương của phần phải nằm trong `ch` của một mục (`tools/check.mjs` cảnh báo chương bị sót). `intro` của phần không tiết lộ phần sau.

## Trang và giao diện: đã có, xem `assets/js/summary.js`

Không cần viết lại code khi thêm sách. Những điều nên biết khi viết nội dung:

- Mỗi mục trong `chapters` thành một `<article class="sum-ch" data-ch="…">` với nhãn "Chương 7" (hoặc "Chương 7–8" khi gộp chương liền nhau), `<h3>` tên chương, `tease` màu nhạt, `body`, và khung "Ý chính" nếu có `points`.
- Link `summary/#chuong-N` mở thẳng chương N. Trang dòng thời gian tự thêm link "Đọc tóm tắt chương …" vào thẻ sự kiện khi phần chứa chương đó có `summary: true`. Vì vậy `ch` phải đúng số chương theo ebook.
- `intro` của phần hiện ở đầu phần, giữa trang. Nếu phần đó có dòng thời gian, đầu phần có nút "Xem dòng thời gian phần này".
- Ô "Tìm trong sách" ở trang sách tìm cả `title`, `tease`, `body`, `points`, nên tên riêng viết đúng bản dịch thì người đọc tìm ra.
- Cột chữ khoảng 68 ký tự, CSS ở mục "Tóm tắt" trong `assets/css/style.css`, chỉ dùng biến màu có sẵn nên tự đúng cả sáng lẫn tối. Phần chưa có tóm tắt hiện "Tóm tắt của phần này đang được viết."

## Quy trình một phần

1. Đọc hết các chương của phần (xem `ebook.md`).
2. Viết `summary/data/phan-N.js`, thêm `summary: true` cho phần đó.
3. `node tools/check.mjs`, xem thử trang, commit `"<Tên sách>: tóm tắt Phần <chữ> (chương <x>–<y>)"`, push.
