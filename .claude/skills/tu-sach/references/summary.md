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

## Lần đầu: viết `assets/js/summary.js`

Chỉ làm khi file này chưa có. Mục tiêu: trang tóm tắt trông và hoạt động như cùng một trang web với dòng thời gian. Đọc `assets/js/timeline.js` trước và dùng lại cách làm của nó:

- `window.Summary = { page }`. `page()` dùng `Site.currentBook("../../../")`, đặt `document.title = "<Tên sách> · Tóm tắt"`, thanh đường dẫn `Sổ tay đọc sách / <Tên sách> / Tóm tắt`.
- Phần mở đầu dùng lại class `.hero` (credit, tên sách, dòng "Tóm tắt", `lede`).
- Thanh chọn phần dùng lại markup `.pnav` (bỏ nút Mở tất cả / Thu gọn vì nội dung đã mở sẵn). Phần chưa có tóm tắt có class `soon`.
- Mỗi phần có tóm tắt là một `<section class="psec pending" id="phan-N" data-n="N">`, chỉ nạp `data/phan-N.js` bằng thẻ `<script>` khi sắp cuộn tới (IntersectionObserver). Nạp xong class chỉ còn đúng `psec`. Lỗi thì hiện chữ "Không tải được phần này. Hãy thử tải lại trang." Mở trang với `#phan-N` thì nạp các phần từ 1 đến N rồi mới cuộn. `tools/check.mjs` dựa vào đúng những điều này để kiểm tra.
- Đầu mỗi phần dùng lại `.phead` (nhãn "Phần N · năm", tên phần, "Chương x–y", `intro`).
- Mỗi chương là một `<article class="sum-ch">`: nhãn "Chương 3" (hoặc "Chương 7–8"), `<h3>` tên chương, `tease` màu nhạt, `body`, và nếu có `points` thì một danh sách có tiêu đề "Ý chính".
- CSS: thêm một mục "Tóm tắt" trong `assets/css/style.css`, chỉ dùng biến màu và font có sẵn (`--fg`, `--muted`, `--accent`, `--line`, `--display`, `--body`, `--ui`) để tự đúng cả giao diện sáng lẫn tối. Cột chữ khoảng 65 đến 70 ký tự cho dễ đọc.
- Xong thì: chụp thử trang ở giao diện sáng, tối và khổ điện thoại (rộng 390px); sửa bảng "Các dạng nội dung" trong README; sửa mục này trong skill thành "đã có, xem assets/js/summary.js" kèm những gì thực tế khác với mô tả ở đây.

## Quy trình một phần

1. Đọc hết các chương của phần (xem `ebook.md`).
2. Viết `summary/data/phan-N.js`, thêm `summary: true` cho phần đó.
3. `node tools/check.mjs`, xem thử trang, commit `"<Tên sách>: tóm tắt Phần <chữ> (chương <x>–<y>)"`, push.
