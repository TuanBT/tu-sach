/* Danh mục tủ sách. Thêm một cuốn mới = thêm một object vào mảng này
   và tạo thư mục books/<slug>/ (xem README.md).

   Mỗi dạng nội dung là một object riêng, có object nào thì trang sách hiện dạng đó:
     timeline: {...}   dòng thời gian, ở books/<slug>/timeline/
     summary:  {...}   tóm tắt,         ở books/<slug>/summary/
     characters: {...} nhân vật,      ở books/<slug>/characters/  (cả cuốn, data/nhan-vat.js)
     map:      {...}   bản đồ hành trình, ở books/<slug>/map/     (cả cuốn, data/hanh-trinh.js)
     audio:    {...}   audio,           ở books/<slug>/audio/     (chưa dùng)
   parts: các phần của cuốn sách. Mỗi phần đánh dấu dạng nào đã xong cho phần đó:
     { n: 1, title: "Phần Một", years: "…", ch: [1, 21], timeline: true, summary: true }
   Phần chưa có dạng nào thì trang hiện "Sắp có". */
window.BOOKS = [
  {
    slug: "hai-so-phan",
    title: "Hai Số Phận",
    original: "Kane and Abel",
    author: "Jeffrey Archer",
    translator: "Nguyễn Việt Hải",
    blurb: "Hai người đàn ông sinh cùng ngày 18/4/1906, một người trong rừng Ba Lan, một người trong gia đình chủ ngân hàng ở Boston. Cuộc đời họ chạy song song suốt sáu mươi năm.",
    timeline: {
      years: "1906 – 1967",
      credit: "Jeffrey Archer · Nguyễn Việt Hải dịch",
      born: { aName: "Wladek", a: "Slonim, Ba Lan", date: "18 · 4 · 1906", b: "Boston, Mỹ", bName: "William" },
      lede: "Hai người đàn ông sinh cùng một ngày. Mỗi hàng là một mốc thời gian, hai bên là điều xảy ra với từng người lúc đó. <b>Ấn vào sự kiện</b> để đọc chi tiết, <b>ấn vào năm</b> để mở cả hai bên, chọn số phần ở thanh phía trên để nhảy nhanh.",
      footer: "Tóm tắt từ <i>Hai Số Phận</i> (Kane and Abel), Jeffrey Archer, Nguyễn Việt Hải dịch. Số chương theo thứ tự trong bản ebook.<br>Hai nhân vật chính sinh cùng ngày nên tuổi ở trục giữa là tuổi của cả hai."
    },
    summary: {
      lede: "Sách kể xen kẽ hai cuộc đời. Ở đây mỗi chương được kể lại ngắn gọn, đúng trình tự sách kể, để nhớ lại ai đã làm gì, vì sao và dẫn tới đâu. Bấm vào nhãn chương để lấy link chia sẻ đúng chương đó.",
      footer: "Tóm tắt từ <i>Hai Số Phận</i> (Kane and Abel), Jeffrey Archer, Nguyễn Việt Hải dịch. Số chương theo thứ tự trong bản ebook."
    },
    characters: {
      lede: "Ai là ai trong sáu mươi năm của hai gia đình. Mỗi người có một dòng tả lúc mới xuất hiện, kèm những mốc về sau ghi rõ số chương. Đang đọc dở thì chọn chương ở nút <b>Che phần chưa đọc</b> phía trên để không bị lộ.",
      footer: "Từ <i>Hai Số Phận</i> (Kane and Abel), Jeffrey Archer, Nguyễn Việt Hải dịch. Số chương theo thứ tự trong bản ebook."
    },
    map: {
      lede: "Những nơi Wladek và William đã đi qua, theo đúng thứ tự trong sách. Cuộn xuống hoặc bấm vào một chặng để bản đồ đưa tới chặng đó. Vòng màu vàng là nơi hai người chạm mặt.",
      footer: "Từ <i>Hai Số Phận</i> (Kane and Abel), Jeffrey Archer, Nguyễn Việt Hải dịch. Nền bản đồ: Natural Earth. Số chương theo thứ tự trong bản ebook."
    },
    parts: [
      { n: 1, title: "Phần Một", years: "1906 – 1923", ch: [1, 21], timeline: true, summary: true },
      { n: 2, title: "Phần Hai", years: "1923 – 1928", ch: [22, 24], timeline: true },
      { n: 3, title: "Phần Ba", years: "1928 – 1932", ch: [25, 31], timeline: true },
      { n: 4, title: "Phần Bốn", years: "1932 – 1941", ch: [32, 38], timeline: true },
      { n: 5, title: "Phần Năm", years: "1941 – 1948", ch: [39, 42], timeline: true },
      { n: 6, title: "Phần Sáu", years: "1948 – 1952", ch: [43, 46], timeline: true },
      { n: 7, title: "Phần Bảy", years: "1952 – 1963", ch: [47, 56], timeline: true },
      { n: 8, title: "Phần Tám", years: "1963 – 1967", ch: [57, 60], timeline: true }
    ]
  }
];
