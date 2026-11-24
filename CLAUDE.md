# Sổ tay đọc sách

Trang tĩnh tiếng Việt trên GitHub Pages (https://tusach.buitientuan.com), deploy từ nhánh `main`, không có bước build. Cấu trúc: README.md.

- Mọi việc thêm hoặc sửa nội dung sách (sách mới, dòng thời gian, tóm tắt, audio, `data/books.js`, ảnh chia sẻ) làm theo skill `tu-sach` trong `.claude/skills/tu-sach/`, kể cả việc nhỏ như "làm tiếp phần 3".
- Không đưa file sách (.epub, .azw3, .pdf…), văn bản gốc hay file audio vào repo.
- Trước khi commit: `node tools/check.mjs` phải báo 0 lỗi.
- Đổi khung chung (trường dữ liệu, dạng nội dung, giao diện) thì sửa luôn README và skill trong cùng commit.
