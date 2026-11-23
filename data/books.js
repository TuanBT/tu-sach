/* Danh mục tủ sách. Thêm một cuốn mới = thêm một object vào mảng này
   và tạo thư mục books/<slug>/ (xem README.md).
   Phần nào đã có dòng thời gian thì đặt ready: true; chưa có thì trang sẽ hiện "Sắp có". */
window.BOOKS = [
  {
    slug: "hai-so-phan",
    title: "Hai Số Phận",
    original: "Kane and Abel",
    author: "Jeffrey Archer",
    translator: "Nguyễn Việt Hải",
    blurb: "Hai người đàn ông sinh cùng ngày 18/4/1906, một người trong rừng Ba Lan, một người trong gia đình chủ ngân hàng ở Boston. Cuộc đời họ chạy song song suốt sáu mươi năm.",
    timeline: {
      href: "timeline.html",
      data: "data/",
      years: "1906 – 1967",
      credit: "Jeffrey Archer · Nguyễn Việt Hải dịch",
      born: { aName: "Wladek", a: "Slonim, Ba Lan", date: "18 · 4 · 1906", b: "Boston, Mỹ", bName: "William" },
      lede: "Hai người đàn ông sinh cùng một ngày. Mỗi hàng là một mốc thời gian, hai bên là điều xảy ra với từng người lúc đó. <b>Ấn vào sự kiện</b> để đọc chi tiết, <b>ấn vào năm</b> để mở cả hai bên, chọn số phần ở thanh phía trên để nhảy nhanh.",
      footer: "Tóm tắt từ <i>Hai Số Phận</i> (Kane and Abel), Jeffrey Archer, Nguyễn Việt Hải dịch. Số chương theo thứ tự trong bản ebook.<br>Hai nhân vật chính sinh cùng ngày nên tuổi ở trục giữa là tuổi của cả hai."
    },
    parts: [
      { n: 1, title: "Phần Một", years: "1906 – 1923", ch: [1, 21], ready: true },
      { n: 2, title: "Phần Hai", years: "1923 – 1928", ch: [22, 24], ready: true },
      { n: 3, title: "Phần Ba", years: "1928 – 1932", ch: [25, 31] },
      { n: 4, title: "Phần Bốn", years: "1932 – 1941", ch: [32, 38] },
      { n: 5, title: "Phần Năm", years: "1941 – 1948", ch: [39, 42] },
      { n: 6, title: "Phần Sáu", years: "1948 – 1952", ch: [43, 46] },
      { n: 7, title: "Phần Bảy", years: "1952 – 1963", ch: [47, 56] },
      { n: 8, title: "Phần Tám", years: "1963 – 1967", ch: [57, 60] }
    ]
  }
];
