---
name: tu-sach
description: Quy chuẩn thêm và sửa nội dung cho trang Sổ tay đọc sách (repo tu-sach, tusach.buitientuan.com) - đưa một cuốn sách mới lên, viết hoặc sửa dòng thời gian (timeline) từng phần, tóm tắt (summary) theo phần/chương, audio, sửa data/books.js, tạo ảnh chia sẻ, kiểm tra rồi deploy. Dùng skill này cho MỌI việc đụng tới nội dung sách trong repo này, kể cả khi người dùng chỉ nói ngắn kiểu "làm tiếp phần 3", "tóm tắt cuốn Nhà Giả Kim", "thêm sách mới", "viết timeline phần cuối", "add audio", "sửa lại sự kiện năm 1923", hay gửi đường dẫn một file ebook (.epub, .azw3, .pdf) và muốn đưa lên web.
---

# Sổ tay đọc sách: quy chuẩn thêm nội dung

Trang tĩnh trên GitHub Pages (deploy từ nhánh `main`), tiếng Việt, không có bước build. Mỗi cuốn sách có thể có ba dạng nội dung: **dòng thời gian**, **tóm tắt**, **audio**. Skill này tồn tại để mọi cuốn sách, dù do phiên AI nào viết, đều cùng cấu trúc, cùng văn phong, cùng chất lượng. Khi thấy quy tắc nào trong đây chưa hợp với một cuốn sách cụ thể, hỏi người dùng thay vì tự đặt ra cách mới.

## Nguyên tắc luôn áp dụng

1. **Bản quyền.** Repo công khai. Chỉ đưa lên phần mình viết lại bằng lời của mình, kèm vài câu trích ngắn đắt giá. Không chép nguyên đoạn văn, không đưa file sách (.epub, .azw3, .mobi, .pdf) hay file audio vào repo (`.gitignore` và `tools/check.mjs` đều chặn). File ebook nằm ngoài repo: nếu người dùng chưa đưa đường dẫn, hỏi họ. Bản chuyển sang text để đọc thì để trong thư mục scratchpad, không để trong repo.
2. **Đúng với sách.** Chỉ viết điều có trong sách. Đọc kỹ các chương của phần đang làm trước khi viết; chi tiết nào không chắc (ngày, số tiền, tên) thì mở lại chương đó, đừng đoán. Số chương luôn ghi theo **thứ tự trong file ebook**, không theo cách sách tự đánh số, để người đọc dò lại được.
3. **Văn phong thống nhất**, xem mục Văn phong bên dưới.
4. **Giữ nguyên khung chung.** Thêm nội dung thì chỉ đụng tới `data/books.js`, thư mục `books/<slug>/` và README. Nếu thật sự cần đổi khung (thêm trường dữ liệu, thêm dạng nội dung, đổi giao diện), làm cùng lúc ba việc: sửa code, sửa README, sửa skill này (và file reference liên quan), để phiên sau theo đúng quy tắc mới.
5. **Kiểm tra trước khi commit:** `node tools/check.mjs` phải báo 0 lỗi. Cảnh báo thì đọc và sửa nếu hợp lý.

## Bản đồ repo

```
data/books.js                 Danh mục sách: thông tin sách, các phần, dạng nội dung nào đã có
assets/js/site.js             Trang chủ, trang sách, FORMATS (danh sách dạng nội dung), Google Analytics
assets/js/timeline.js         Vẽ trang dòng thời gian
assets/css/style.css          Giao diện chung (sáng/tối)
books/<slug>/index.html       Trang giới thiệu sách
books/<slug>/og.png           Ảnh xem trước khi chia sẻ link
books/<slug>/timeline/        index.html + data/phan-N.js
books/<slug>/summary/         index.html + data/phan-N.js
books/<slug>/audio/           index.html + data/tracks.js (chỉ chứa link)
tools/check.mjs               Kiểm tra toàn bộ (dữ liệu + mở thử trang bằng Chrome)
tools/make-images.sh          Tạo ảnh chia sẻ og.png và icon
```

## Việc cần làm → đọc gì

| Việc | Đọc |
|---|---|
| Đưa một cuốn sách mới lên | Mục **Thêm sách mới** dưới đây, rồi file của dạng nội dung đầu tiên |
| Viết hoặc sửa dòng thời gian một phần | `references/timeline.md` |
| Tóm tắt một phần hoặc cả cuốn | `references/summary.md` |
| Thêm audio | `references/audio.md` |
| Đọc nội dung file ebook | `references/ebook.md` |

## Thêm sách mới

1. **Đọc mục lục ebook** để lấy danh sách phần và số chương (theo thứ tự trong file). Sách không chia phần thì dùng một phần duy nhất `{ n: 1, title: "Cả cuốn", ch: [1, N] }`.
2. **Chọn slug:** tên sách viết thường, không dấu, nối bằng gạch: `nha-gia-kim`, `hai-so-phan`. Slug là tên thư mục và là một phần URL, sau này không đổi.
3. **Thêm vào `data/books.js`** (mảng `window.BOOKS`, sách mới thêm cuối mảng):
   ```js
   {
     slug: "nha-gia-kim",
     title: "Nhà Giả Kim",              // tên theo bản tiếng Việt người dùng đọc
     original: "O Alquimista",          // tên gốc, bỏ nếu là sách Việt
     author: "Paulo Coelho",
     translator: "<dịch giả>",          // bỏ nếu không có
     blurb: "Hai câu giới thiệu, không tiết lộ kết thúc.",
     timeline: { … },                   // chỉ thêm object của dạng nội dung đã có
     summary: { … },
     parts: [
       { n: 1, title: "Phần Một", years: "…", ch: [1, 12], summary: true },
       { n: 2, title: "Phần Hai", ch: [13, 24] }      // chưa có dạng nào: hiện "Sắp có"
     ]
   }
   ```
   Mỗi phần đánh dấu dạng nào đã xong cho phần đó (`timeline: true`, `summary: true`, `audio: true`). Chỉ đánh dấu khi file dữ liệu của phần đó đã có thật.
4. **Trang sách:** chép `books/hai-so-phan/index.html` sang `books/<slug>/index.html`. Phần `<body>` giữ nguyên (trang tự đọc slug từ tên thư mục). Trong `<head>` sửa: `<title>`, `meta description`, `canonical`, `og:title`, `og:description`, `og:url`, `og:image`. URL luôn dạng `https://tusach.buitientuan.com/books/<slug>/`. Zalo, Facebook đọc thẳng các thẻ này mà không chạy JavaScript, nên chúng phải đúng ngay trong file. Google Analytics nằm trong `assets/js/site.js` mà `<body>` đã nạp sẵn, nên trang mới tự được đếm: không dán thêm mã GA vào HTML.
5. **Ảnh chia sẻ:**
   ```sh
   tools/make-images.sh og books/<slug>/og.png "Sổ tay đọc sách" "<Tên sách>" "<Tên gốc · Tác giả>" "<Dạng nội dung · năm nếu có>"
   ```
   Xem lại ảnh (Read file png) xem chữ có bị tràn hay xuống dòng xấu không.
6. **Dạng nội dung đầu tiên:** làm theo file reference tương ứng.
7. **README:** thêm một dòng vào bảng "Sách hiện có".

## Văn phong

Người đọc là người Việt đã hoặc đang đọc cuốn sách, muốn nhớ lại diễn biến. Viết như một người kể lại cho bạn nghe: rõ, gọn, theo đúng trình tự, không bình luận thừa.

- Câu ngắn, tiếng Việt tự nhiên. Kể lại bằng lời của mình, không dịch lại từng câu của sách.
- Tên người, địa danh, chức danh theo đúng bản dịch tiếng Việt người dùng đọc (ví dụ "Nam tước Rosnovski", "Ngân hàng Lester"). Lần đầu nhắc một nhân vật quan trọng thì ghi tên đầy đủ.
- Không đánh giá kiểu "đây là chi tiết rất hay", "một bước ngoặt đầy kịch tính". Để sự việc tự nói.
- **Không dùng gạch ngang dài (—).** Dùng dấu chấm, phẩy, hai chấm. Gạch ngắn có cách chỉ dùng cho khoảng: `1907 – 1911`, `1906 – 1967`.
- Ngày `18/4/1906`; tháng `tháng 9/1918`; mùa `Mùa thu 1911`; ước chừng `Khoảng 1908`. Tiền và số lớn dùng dấu chấm ngăn nghìn: `100.000 đô`, `2,5 triệu đô`.
- HTML trong nội dung:
  - mỗi đoạn một `<p>`, 2 đến 4 câu;
  - `<b>` cho tên hoặc chi tiết then chốt người đọc cần nhớ (tối đa 2 đến 3 chỗ mỗi đoạn; ở dòng thời gian, giao diện tô màu theo nhân vật);
  - `<q>` cho lời nhân vật trích nguyên văn, ngắn, một câu. Giao diện tự thêm ngoặc kép, đừng gõ “ ”;
  - `<i>` cho tên sách, báo, tác phẩm;
  - không dùng `<script>`, `style=`, hay class nào ngoài các class đã nêu trong file reference.

## Kiểm tra, commit, đưa lên

1. `node tools/check.mjs` → 0 lỗi. Script kiểm tra danh mục, file từng phần, số chương, thẻ chia sẻ, ảnh 1200×630, file cấm, rồi mở thử mọi trang bằng Chrome headless.
2. Nên chụp thử trang để tự nhìn (đặc biệt khi làm dạng nội dung lần đầu):
   ```sh
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars --window-size=1100,1400 --virtual-time-budget=5000 --screenshot=<scratchpad>/shot.png "http://127.0.0.1:<port>/books/<slug>/timeline/#phan-3"
   ```
   (chạy `python3 -m http.server <port> --bind 127.0.0.1` ở thư mục repo trước, tắt khi xong).
3. **Commit mỗi đơn vị một commit** (mỗi phần, hoặc mỗi cuốn sách mới), message tiếng Việt theo mẫu đã có trong lịch sử:
   - `Hai Số Phận: dòng thời gian Phần Ba (1928–1932)`
   - `Nhà Giả Kim: tóm tắt Phần Một (chương 1–12)`
   - `Thêm sách Nhà Giả Kim, bắt đầu với tóm tắt Phần Một`
4. Push lên `main` để trang cập nhật (đây là cách người dùng vẫn làm; nếu họ bảo chỉ làm trên máy thì dừng ở commit). GitHub Pages build khoảng 1 phút: `gh api repos/TuanBT/tu-sach/pages/builds/latest --jq .status` ra `built` là xong.
5. Báo lại cho người dùng link trực tiếp, ví dụ `https://tusach.buitientuan.com/books/<slug>/timeline/#phan-3`.

Không cần sửa `sw.js` khi thêm nội dung: nó luôn lấy bản mới từ mạng trước.
