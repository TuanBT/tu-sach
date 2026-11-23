/* Danh mục tủ sách. Thêm một cuốn mới = thêm một object vào mảng này
   và tạo thư mục books/<slug>/ (xem README.md).
   Phần nào đã có dòng thời gian thì ghi href; chưa có thì bỏ href, trang sẽ hiện "Sắp có". */
window.BOOKS = [
  {
    slug: "hai-so-phan",
    title: "Hai Số Phận",
    original: "Kane and Abel",
    author: "Jeffrey Archer",
    translator: "Nguyễn Việt Hải",
    blurb: "Hai người đàn ông sinh cùng ngày 18/4/1906, một người trong rừng Ba Lan, một người trong gia đình chủ ngân hàng ở Boston. Cuộc đời họ chạy song song suốt sáu mươi năm.",
    parts: [
      { title: "Phần Một", years: "1906 – 1923", href: "phan-1.html" },
      { title: "Phần Hai", years: "1923 – 1928" },
      { title: "Phần Ba", years: "1928 – 1932" },
      { title: "Phần Bốn", years: "1932 – 1941" },
      { title: "Phần Năm", years: "1941 – 1948" },
      { title: "Phần Sáu", years: "1948 – 1952" },
      { title: "Phần Bảy", years: "1952 – 1963" },
      { title: "Phần Tám", years: "1963 – 1967" }
    ]
  }
];
