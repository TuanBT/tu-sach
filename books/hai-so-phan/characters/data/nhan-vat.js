/* Hai Số Phận · Nhân vật
   role chỉ tả nhân vật lúc mới xuất hiện, mọi điều về sau nằm trong notes, mỗi mục gắn số chương theo ebook.
   ch là chương nhân vật xuất hiện lần đầu. names: tên đổi về sau, hiện khi người đọc đã tới chương đó.
   side (tùy chọn) ghi đè màu của nhóm: a là phía Wladek, b là phía William, both là màu nhấn. */
window.CHARS = {
  groups: [
    { id: "chinh", title: "Hai nhân vật chính", side: "both" },
    { id: "a", title: "Quanh Wladek, về sau là Abel", side: "a" },
    { id: "b", title: "Quanh William Kane", side: "b" },
    { id: "giua", title: "Giữa hai nhà", side: "both" }
  ],
  people: [
    {
      id: "wladek", group: "chinh", side: "a", ch: 1, name: "Wladek Koskiewicz", names: [{ ch: 21, name: "Abel Rosnovski" }],
      role: "Đứa trẻ được nhặt về bên bờ sông trong rừng gần Slonim, Ba Lan, ngày 18/4/1906. Lớn lên trong nhà người bẫy thú Koskiewicz. Chỉ có một núm vú.",
      notes: [
        { ch: [5], text: "Được Nam tước Rosnovski đưa vào lâu đài học cùng cậu chủ Leon." },
        { ch: [7], text: "Leon chết khi che cho cậu lúc quân Đức chiếm lâu đài." },
        { ch: [9], text: "Trước khi chết, Nam tước nhận cậu làm con trai và người thừa kế, trao cho cậu <b>chiếc vòng bạc</b>." },
        { ch: [11, 13], text: "Bị đày sang Trại 201 ở Siberia, vượt ngục nhờ bác sĩ Dubien." },
        { ch: [19], text: "Suýt bị chặt tay ở Constantinople, chiếc vòng bạc cứu cậu." },
        { ch: [21], text: "Vào nước Mỹ. Viên sĩ quan di trú đọc dòng chữ trên chiếc vòng và ghi tên <b>Nam tước Abel Rosnovski</b>." },
        { ch: [23], text: "Bồi bàn ở khách sạn Plaza, học tối ở Columbia, thành công dân Mỹ năm 1927." },
        { ch: [28], text: "Gặp William Kane ở Boston và từ đó coi anh là kẻ thù, tin rằng William đã đẩy Davis Leroy vào chỗ chết." },
        { ch: [31], text: "Lập Tập đoàn Nam Tước, cưới Zaphia." },
        { ch: [33], text: "Con gái Florentyna ra đời ngày 1/1/1934." },
        { ch: [39, 40], text: "Sĩ quan hậu cần trong Thế chiến. Gần Remagen khiêng một đại úy bị thương ra khỏi rừng, không biết đó là William Kane." },
        { ch: [42], text: "Zaphia ly hôn. Ông giữ quyền nuôi Florentyna và dời về New York." },
        { ch: [45], text: "Về Slonim, mẹ nuôi Helena không nhận ra ông." },
        { ch: [49, 50], text: "Tát con gái khi cô định cưới Richard Kane. Cô bỏ đi." },
        { ch: [53, 54], text: "Suýt làm Đại sứ Mỹ tại Ba Lan thì bị truy tố vì những vụ hối lộ của Henry Osborne." },
        { ch: [56], text: "Dùng 8% cổ phần hạ William khỏi ghế Chủ tịch Ngân hàng Lester." },
        { ch: [59], text: "Biết người bảo trợ giấu tên năm 1930 chính là William Kane." },
        { ch: [60], text: "Đoàn tụ với con gái, rồi qua đời. Chiếc vòng bạc để lại cho cháu ngoại William Abel Kane." }
      ]
    },
    {
      id: "william", group: "chinh", side: "b", ch: 2, name: "William Lowell Kane",
      role: "Con trai đầu lòng của chủ ngân hàng Richard Kane ở Boston, sinh cùng ngày 18/4/1906. Mê con số từ nhỏ.",
      notes: [
        { ch: [8], text: "Cha chết trên tàu Titanic. Vào trường St. Paul, ở chung phòng với Matthew Lester." },
        { ch: [14, 18], text: "Thuê luật sư, rồi thắng Alan Lloyd một ván golf để chặn khoản vay của Henry Osborne." },
        { ch: [20], text: "Mẹ mất. William đuổi Osborne khỏi nhà và giữ Alan Lloyd ở lại ngân hàng." },
        { ch: [22, 24], text: "Học bổng toán Hamilton vào Harvard. Năm 21 tuổi nhận quỹ ủy thác hơn 32 triệu đô." },
        { ch: [28], text: "Tiếp Abel Rosnovski ở Boston, nói rõ ngân hàng sẽ giữ các khách sạn của Davis Leroy cho tới khi nợ được trả." },
        { ch: [31], text: "Thua ghế Chủ tịch Kane và Cabot vì lá phiếu quyết định của Alan Lloyd." },
        { ch: [32], text: "Cưới Kate ở Henley-on-Thames." },
        { ch: [34], text: "Con trai Richard ra đời. Matthew Lester qua đời." },
        { ch: [37, 38], text: "Chủ tịch Ngân hàng Lester, rồi Chủ tịch Lester, Kane và Công ty." },
        { ch: [40], text: "Ra trận, bị thương nặng ở mặt trận sông Rhine." },
        { ch: [46], text: "Đánh trả vụ Interstate Airways bằng Điều luật 10b-5." },
        { ch: [49, 50], text: "Dọa cắt mọi khoản tiền khi Richard muốn cưới Florentyna Rosnovski." },
        { ch: [52, 53], text: "Bỏ 25.000 đô cho một tập hồ sơ về những vụ hối lộ quanh Abel." },
        { ch: [55, 56], text: "Hai cơn đau tim. Mất ghế Chủ tịch sau lá phiếu bất tín nhiệm." },
        { ch: [58], text: "Nâng mũ chào Abel trên Đại lộ 5, và qua đời ngay tối đó." },
        { ch: [59], text: "Hóa ra chính ông là người bảo trợ giấu tên đã bỏ 2 triệu đô cứu Abel năm 1930." }
      ]
    },

    {
      id: "nam-tuoc", group: "a", ch: 5, name: "Nam tước Rosnovski",
      role: "Chủ lâu đài gần Slonim, cha của Leon. Đeo một chiếc vòng bạc khắc chữ.",
      notes: [
        { ch: [7], text: "Bị quân Đức giam dưới hầm chính lâu đài của mình." },
        { ch: [9], text: "Dạy Wladek bằng miệng suốt những năm dưới hầm. Trước khi chết nhận cậu làm con trai và người thừa kế. Khi chôn ông, Wladek thấy ông cũng chỉ có một núm vú." }
      ]
    },
    {
      id: "leon", group: "a", ch: 5, name: "Leon Rosnovski",
      role: "Con trai Nam tước, sáu tuổi khi Wladek vào lâu đài. Thành bạn thân và đối thủ ngang tài của Wladek.",
      notes: [{ ch: [7], text: "Chết khi nhào lên che cho Wladek trước báng súng của lính Đức." }]
    },
    {
      id: "florentyna-k", group: "a", ch: 1, name: "Florentyna Koskiewicz",
      role: "Chị cả nhà Koskiewicz, thương Wladek như con mình.",
      notes: [
        { ch: [5], text: "Theo em vào lâu đài làm bếp." },
        { ch: [9], text: "Bị lính Nga hãm hiếp và chết trong tay Wladek." },
        { ch: [33], text: "Con gái Abel được đặt theo tên chị." }
      ]
    },
    {
      id: "helena", group: "a", ch: 1, name: "Helena Koskiewicz",
      role: "Mẹ nuôi của Wladek, vợ người bẫy thú, đã chín lần sinh nở.",
      notes: [{ ch: [45], text: "Năm 1952 gặp lại, bà không nhận ra Wladek. Bà kể các con bị đưa vào trại, chỉ còn bé Sophia được bà giấu đi." }]
    },
    {
      id: "jasio", group: "a", ch: 1, name: "Jasio Koskiewicz",
      role: "Cha nuôi, làm thợ bẫy thú cho Nam tước. Không ưa đứa trẻ nhặt về.",
      notes: [{ ch: [7], text: "Bị lính Đức giết ở lâu đài." }]
    },
    {
      id: "franke", group: "a", ch: 1, name: "Franke Koskiewicz",
      role: "Con trai cả nhà Koskiewicz, cậu bé đi săn thỏ đã nhặt Wladek về.",
      notes: [{ ch: [5], text: "Bảo Wladek rằng cha không bao giờ muốn có cậu." }]
    },
    {
      id: "dubien", group: "a", ch: 13, name: "Bác sĩ Dubien",
      role: "Bác sĩ của Trại 201, người Pháp bị giam từ năm 1904.",
      notes: [
        { ch: [13], text: "Trao cho Wladek tất cả dành dụm, một bộ quần áo và tấm bản đồ đường trốn. Không nhận chiếc vòng bạc." },
        { ch: [21], text: "Mấy tờ rúp ông cho hóa vô giá trị ở đảo Ellis." }
      ]
    },
    {
      id: "stefan", group: "a", ch: 17, name: "Stefan",
      role: "Cậu bé móc túi ở Odessa.",
      notes: [{ ch: [17], text: "Dạy Wladek ăn cắp ở chợ, giúp cậu trốn vào hầm than tàu Renaska." }]
    },
    {
      id: "prendergast", group: "a", ch: 19, name: "Edward Prendergast",
      role: "Lãnh sự Anh ở Constantinople.",
      notes: [{ ch: [19], text: "Cứu Wladek khỏi lưỡi đao bằng cách nói cậu là người Anh." }]
    },
    {
      id: "zaleski", group: "a", ch: 19, name: "Pawel Zaleski",
      role: "Lãnh sự Ba Lan ở Constantinople.",
      notes: [{ ch: [21], text: "Giữ Wladek làm phụ tá hơn một năm, lo giấy tờ cho cậu sang Mỹ." }]
    },
    {
      id: "george", group: "a", ch: 21, name: "George Novak",
      role: "Chàng trai Ba Lan tên thật Jerzy Nowak, bạn giường trên tàu Mũi Tên Đen, tự đặt cho mình tên Mỹ.",
      notes: [
        { ch: [21], text: "Cứu chiếc vòng bạc khỏi tay hai kẻ cướp." },
        { ch: [31], text: "Về làm cùng Abel, làm phù rể trong đám cưới." },
        { ch: [39], text: "Phó Chủ tịch Tập đoàn Nam Tước." },
        { ch: [60], text: "Mang lời đề nghị của Abel tới Florentyna, mở đường cho cuộc đoàn tụ." }
      ]
    },
    {
      id: "zaphia", group: "a", ch: 21, name: "Zaphia",
      role: "Cô gái mồ côi từ Poznan, sang Chicago với họ hàng. Mối tình đầu của Wladek trên tàu.",
      notes: [
        { ch: [30], text: "Gặp lại Abel khi đang làm phục vụ ở khách sạn Stevens." },
        { ch: [31], text: "Cưới Abel." },
        { ch: [33], text: "Sinh con gái Florentyna." },
        { ch: [42], text: "Thuê thám tử theo dõi chồng, rồi ly hôn." }
      ]
    },
    {
      id: "davis", group: "a", ch: 23, name: "Davis Leroy",
      role: "Người Texas, chủ Tập đoàn Khách sạn Richmond, ngồi ở bàn số 17 của Plaza cùng con gái.",
      notes: [
        { ch: [23], text: "Mời Abel về làm ở khách sạn Richmond Continental, Chicago." },
        { ch: [27], text: "Phá sản sau vụ sụp đổ, nhảy lầu, để lại cho Abel 75% cổ phần Tập đoàn." }
      ]
    },
    {
      id: "melanie", group: "a", ch: 23, name: "Melanie Leroy",
      role: "Con gái Davis Leroy.",
      notes: [
        { ch: [26], text: "Từ chối Abel: một quý cô miền Nam không lấy người Ba Lan nhập cư." },
        { ch: [31], text: "Bữa tối với cô làm Abel nghĩ ra cái tên Tập đoàn Nam Tước." },
        { ch: [42], text: "Đã ly hôn, trở lại tìm Abel." }
      ]
    },
    {
      id: "pacey", group: "a", ch: 23, name: "Desmond Pacey",
      role: "Quản lý khách sạn Richmond Continental, làm ngơ cho cả đường dây ăn cắp.",
      notes: [
        { ch: [25], text: "Bị Abel đuổi." },
        { ch: [29, 30], text: "Phóng hỏa khách sạn Richmond Chicago." }
      ]
    },
    {
      id: "fenton", group: "a", ch: 26, name: "Curtis Fenton",
      role: "Giám đốc ngân hàng Continental Trust ở Chicago.",
      notes: [
        { ch: [30], text: "Báo tin có người bảo trợ giấu tên sẵn sàng bỏ 2 triệu đô." },
        { ch: [39], text: "Âm thầm gom cổ phần Ngân hàng Lester cho Abel." },
        { ch: [45], text: "Bị Abel đuổi vì tưởng ông phản bội." },
        { ch: [59], text: "Lá thư ông để lại sau khi mất cho biết người bảo trợ là ai." }
      ]
    },
    {
      id: "maxton", group: "a", ch: 30, name: "David Maxton",
      role: "Chủ khách sạn Stevens ở Chicago.",
      notes: [
        { ch: [30], text: "Mời Abel về làm quản lý." },
        { ch: [31], text: "Trả tiền tiệc cưới của Abel làm quà." },
        { ch: [48], text: "Qua đời vì bệnh tim." },
        { ch: [59], text: "Abel vẫn tưởng ông là người bảo trợ giấu tên, nhưng không phải." }
      ]
    },

    {
      id: "richard-cha", group: "b", ch: 2, name: "Richard Lowell Kane",
      role: "Cha của William, chủ ngân hàng Kane và Cabot ở Boston.",
      notes: [
        { ch: [6], text: "Đưa vợ con sang London, về trước vì một cuộc đình công." },
        { ch: [8], text: "Chết trên tàu Titanic." }
      ]
    },
    {
      id: "anne", group: "b", ch: 2, name: "Anne Kane",
      role: "Mẹ của William, sinh ra trong họ Cabot.",
      notes: [
        { ch: [6], text: "Sẩy thai, bác sĩ khuyên không mang thai nữa." },
        { ch: [10], text: "Tái hôn với Henry Osborne." },
        { ch: [12, 14], text: "Đưa dần cho chồng toàn bộ 500.000 đô thừa kế." },
        { ch: [20], text: "Biết sự thật về Henry, rồi chết vì sản giật cùng đứa con gái." }
      ]
    },
    {
      id: "hai-ba", group: "b", ch: 4, name: "Bà nội Kane và bà ngoại Cabot",
      role: "Hai bà của William, coi trọng dòng họ và địa vị.",
      notes: [
        { ch: [8], text: "Nắm quyền trong nhà sau khi Richard chết, dạy William giá trị đồng tiền bằng cuốn sổ bìa da xanh." },
        { ch: [24], text: "Lần lượt qua đời vào mùa đông 1927 và năm tháng sau đó." }
      ]
    },
    {
      id: "mackenzie", group: "b", ch: 2, name: "Bác sĩ MacKenzie",
      role: "Bác sĩ gia đình nhà Kane, có mặt khi William ra đời.",
      notes: [
        { ch: [6], text: "Khuyên Anne không mang thai nữa vì huyết áp quá cao." },
        { ch: [20], text: "Không cứu được Anne." },
        { ch: [34], text: "Báo cho William biết Matthew bị ung thư." }
      ]
    },
    {
      id: "alan", group: "b", ch: 4, name: "Alan Lloyd",
      role: "Chủ ngân hàng, cha đỡ đầu của William. Ở lễ ban phước sách ghi tên A.J. Lloyd.",
      notes: [
        { ch: [16], text: "Chủ tịch Ngân hàng Kane và Cabot, một trong ba người giữ quỹ ủy thác của William." },
        { ch: [18], text: "Thua William một ván golf và nghe hết sự thật về Henry Osborne." },
        { ch: [20], text: "Xin từ chức, William xé lá thư." },
        { ch: [24], text: "Mời William vào thẳng Ban giám đốc." },
        { ch: [31], text: "Bỏ lá phiếu quyết định cho Tony Simmons, không phải William." }
      ]
    },
    {
      id: "millie", group: "b", ch: 4, name: "Millie Preston",
      role: "Bạn học của Anne, mẹ đỡ đầu của William.",
      notes: [
        { ch: [10], text: "Giới thiệu Henry Osborne với Anne." },
        { ch: [18, 20], text: "Dan díu với Henry." },
        { ch: [24], text: "Không bao giờ nói chuyện với William nữa." }
      ]
    },
    {
      id: "matthew", group: "b", ch: 8, name: "Matthew Lester",
      role: "Bạn cùng phòng ở St. Paul, con trai chủ tịch Ngân hàng Lester ở New York.",
      notes: [
        { ch: [20], text: "Cùng William đưa Anne vào viện." },
        { ch: [22], text: "Cùng William vào Harvard." },
        { ch: [26], text: "Về làm phó cho William ở Kane và Cabot." },
        { ch: [34], text: "Giấu bệnh ung thư bằng rượu, rồi qua đời." }
      ]
    },
    {
      id: "charles", group: "b", ch: 12, name: "Charles Lester",
      role: "Cha của Matthew, Chủ tịch Ngân hàng Lester ở số 17 phố Broad.",
      notes: [{ ch: [36], text: "Qua đời. Di chúc buộc người thừa kế bầu William làm Chủ tịch nếu muốn nhận cổ phần." }]
    },
    {
      id: "susan", group: "b", ch: 12, name: "Susan Lester",
      role: "Em gái Matthew, mê William từ năm mười hai tuổi.",
      notes: [
        { ch: [36], text: "Nhận phần lớn nhất trong di chúc của cha." },
        { ch: [42], text: "Bán 6% cổ phần Lester cho Abel." }
      ]
    },
    {
      id: "thomas-cohen", group: "b", ch: 14, name: "Thomas Cohen",
      role: "Luật sư ở Boston, nhận một khách hàng 16 tuổi.",
      notes: [{ ch: [35], text: "Thuê thám tử theo dõi Abel Rosnovski cho William." }]
    },
    {
      id: "thaddeus", group: "b", ch: 24, name: "Thaddeus Cohen",
      role: "Sinh viên Harvard, đối thủ tranh biện của William.",
      notes: [
        { ch: [24], text: "William rời câu lạc bộ Porcellian khi các thành viên bỏ ra vì anh dẫn Thaddeus, một người Do Thái, vào." },
        { ch: [42], text: "Thay cha là Thomas Cohen làm báo cáo về Abel cho William." },
        { ch: [52, 53], text: "Có trong tay tập hồ sơ về những vụ hối lộ quanh Abel." }
      ]
    },
    {
      id: "kate", group: "b", ch: 25, name: "Katherine Brookes", names: [{ ch: 32, name: "Kate Kane" }],
      role: "Góa phụ 22 tuổi, nhất quyết trả sòng phẳng khoản nợ của người chồng quá cố.",
      notes: [
        { ch: [26], text: "William kể cho cô những điều chưa từng kể với ai." },
        { ch: [32], text: "Cưới William ở Henley-on-Thames." },
        { ch: [34, 35, 37], text: "Sinh Richard, Virginia và Lucy." },
        { ch: [60], text: "Viết thư cảm ơn hai ông già đứng cuối nhà thờ trong đám tang chồng." }
      ]
    },
    {
      id: "simmons", group: "b", ch: 16, name: "Tony Simmons",
      role: "Giám đốc Đầu tư của Ngân hàng Kane và Cabot.",
      notes: [
        { ch: [25, 26], text: "Cho rằng William quá thận trọng trước vụ sụp đổ năm 1929." },
        { ch: [31], text: "Hơn William một lá phiếu, làm Chủ tịch Kane và Cabot." },
        { ch: [36], text: "Nửa đêm gọi điện cảnh báo William." },
        { ch: [38], text: "Đề nghị sáp nhập Kane và Cabot với Ngân hàng Lester." }
      ]
    },
    {
      id: "parfitt", group: "b", ch: 36, name: "Peter Parfitt",
      role: "Phó Chủ tịch Ngân hàng Lester, giữ 2% cổ phần.",
      notes: [
        { ch: [37], text: "Thua William 7 phiếu với 9, rời ngân hàng." },
        { ch: [54], text: "Abel cho mua 2% của ông với bất cứ giá nào." }
      ]
    },
    {
      id: "jake", group: "b", ch: 51, name: "Jake Thomas",
      role: "Giám đốc mới vào Ban giám đốc Ngân hàng Lester.",
      notes: [
        { ch: [55], text: "Tạm quyền khi William đau tim." },
        { ch: [56], text: "Hóa ra đã bán 2% cổ phần cho Abel từ trước. Lên làm Chủ tịch." }
      ]
    },

    {
      id: "osborne", group: "giua", ch: 10, name: "Henry Osborne",
      role: "Người đàn ông hào hoa tự nhận từng học Harvard, làm bất động sản ở Chicago và đánh trận bên sông Marne.",
      notes: [
        { ch: [10], text: "Cưới Anne Kane." },
        { ch: [12, 14], text: "Tiêu hết tiền thừa kế của Anne." },
        { ch: [20], text: "Tên thật là Vittorio Togna. Bị William đuổi khỏi nhà sau cái chết của Anne." },
        { ch: [29], text: "Làm bồi thường bảo hiểm ở Chicago, hứa giúp Abel nếu đó là chuyện chống lại William Kane." },
        { ch: [33], text: "Ủy viên Hội đồng thành phố Chicago." },
        { ch: [41, 42], text: "Nghị sĩ, giám đốc Tập đoàn Nam Tước, lo gom cổ phần Lester cho Abel." },
        { ch: [47], text: "Mất ghế Nghị sĩ." },
        { ch: [54, 55], text: "Bán tập hồ sơ hối lộ cho William, làm nhân chứng chống Abel, rồi treo cổ trong xà lim." }
      ]
    },
    {
      id: "florentyna-r", group: "giua", ch: 33, name: "Florentyna Rosnovski", names: [{ ch: 52, name: "Florentyna Kane" }],
      role: "Con gái Abel và Zaphia, sinh ngày 1/1/1934, mang tên người chị đã mất của cha.",
      notes: [
        { ch: [45], text: "Theo cha đi châu Âu trước khi vào Radcliffe." },
        { ch: [48], text: "Bán găng tay ở Bloomingdale's dưới tên Jessie Kovats." },
        { ch: [48, 49], text: "Gặp Richard Kane." },
        { ch: [49, 50], text: "Bị cha tát, bỏ đi San Francisco cùng Richard." },
        { ch: [52], text: "Mở chuỗi cửa hàng mang tên mình." },
        { ch: [58], text: "Khai trương cửa hàng trên Đại lộ 5, đưa chồng về gặp cha chồng." },
        { ch: [60], text: "Chủ tịch Tập đoàn Nam Tước." }
      ]
    },
    {
      id: "richard-con", group: "giua", ch: 34, name: "Richard Kane",
      role: "Con trai William và Kate, tên đầy đủ Richard Higginson Kane.",
      notes: [
        { ch: [44], text: "Vào Harvard." },
        { ch: [47], text: "Cử nhân Toán, rồi vào Trường Kinh doanh Harvard." },
        { ch: [48, 49], text: "Gặp Florentyna ở quầy găng tay." },
        { ch: [49, 50], text: "Bỏ nhà đi cùng cô sau khi cha dọa cắt tiền." },
        { ch: [55], text: "Có hai con: bé Annabel và một cháu trai." },
        { ch: [58], text: "Đưa vợ về gặp cha đúng tối cha qua đời." },
        { ch: [60], text: "Con trai anh, William Abel Kane, được ông ngoại để lại chiếc vòng bạc." }
      ]
    }
  ]
};
