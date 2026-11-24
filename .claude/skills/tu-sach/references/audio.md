# Audio

Trang `books/<slug>/audio/` cho nghe theo từng tập, nhóm theo phần.

## File audio để ở đâu

**Không bao giờ đưa file audio vào repo.** GitHub giới hạn mỗi file 100 MB và cả trang khoảng 1 GB; vài giờ audio đã vài trăm MB. `.gitignore` và `tools/check.mjs` đều chặn .mp3, .m4a, .wav…

File để ở nơi phục vụ được link `https://` trực tiếp tới file, hỗ trợ tua (HTTP range): Cloudflare R2 là hợp nhất vì tên miền buitientuan.com đã ở Cloudflare. Link chia sẻ của Google Drive thường không phát được bằng thẻ `<audio>`. Nếu chưa rõ file ở đâu, hỏi người dùng; đừng tự tạo kho lưu trữ hay tài khoản.

Nếu audio do người dùng tạo bằng giọng đọc AI từ nội dung tóm tắt, ghi rõ trong `credit`.

## Trong data/books.js

```js
audio: {
  lede: "Một đến hai câu giới thiệu.",
  credit: "Giọng đọc: …"
}
```

Mỗi phần đã có audio: thêm `audio: true` vào phần đó trong `parts`.

## File dữ liệu: `audio/data/tracks.js`

Một file cho cả cuốn, chỉ chứa thông tin và link:

```js
/* <Tên sách> · Audio */
window.AUDIO = {
  intro: "…",
  tracks: [
    {
      n: 1,                                   // số tập, tăng dần
      part: 1,                                // thuộc phần nào
      title: "Tập 1: Tiếng khóc bên bờ sông",
      src: "https://…/hai-so-phan/tap-01.mp3",
      duration: "32:10",
      ch: [1, 3],                             // các chương tập này kể
      note: "Tùy chọn, một câu."
    }
  ]
};
```

## Trang

Chép `books/<slug>/timeline/index.html` (hoặc của Hai Số Phận) sang `books/<slug>/audio/index.html`, đổi script thành `../../../assets/js/audio.js` và lời gọi thành `AudioPage.page()`. Trong `<head>`: `<title>Tên sách · Audio</title>`, URL `…/books/<slug>/audio/`, `og:image` dùng chung `books/<slug>/og.png`.

## Lần đầu: viết `assets/js/audio.js`

Chỉ làm khi file này chưa có. Dùng lại khung của `assets/js/timeline.js`:

- Đặt tên `window.AudioPage = { page }`. **Không** dùng tên `Audio`: đó là constructor có sẵn của trình duyệt, ghi đè sẽ hỏng mọi thẻ audio.
- `page()` dùng `Site.currentBook("../../../")`, thanh đường dẫn `Sổ tay đọc sách / <Tên sách> / Audio`, phần mở đầu `.hero`, thanh chọn phần `.pnav`.
- Mỗi phần có audio là một `<section class="psec" id="phan-N" data-n="N">` (dữ liệu nằm trong một file nên vẽ luôn, không cần trạng thái `pending`). Mở với `#phan-N` thì cuộn tới phần đó. `tools/check.mjs` đếm các section này.
- Mỗi tập: tên tập, thời lượng, "Chương x–y", và `<audio controls preload="none" src="…">` (preload none để trang không tải audio khi chưa bấm).
- Chỉ một tập phát cùng lúc: bấm phát tập này thì dừng tập khác.
- Nhớ vị trí đang nghe của từng tập trong `localStorage` với khóa `sotay-audio:<slug>:<n>`, mở lại thì nghe tiếp. Nghe hết một tập thì gợi ý tập kế.
- CSS: thêm mục "Audio" trong `assets/css/style.css`, chỉ dùng biến màu có sẵn.
- Xong thì: chụp thử trang ở giao diện sáng, tối, khổ điện thoại; sửa README và mục này trong skill.
