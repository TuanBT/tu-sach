/* Hai Số Phận · Phần Một (1906 – 1923) · chương 1–21
   Cột trái (a): Wladek Koskiewicz. Cột phải (b): William Kane.
   Mỗi sự kiện: when (mốc thời gian), place, ch (số chương), title, tease (một dòng), body (HTML). */
window.TIMELINE = {
  book: "Hai Số Phận",
  part: "Phần Một",
  years: "1906 – 1923",
  credit: "Jeffrey Archer · Nguyễn Việt Hải dịch",
  born: { a: "Slonim, Ba Lan", date: "18 · 4 · 1906", b: "Boston, Mỹ" },
  lede: "Hai cậu bé sinh cùng một ngày. Mỗi hàng dưới đây là một mốc thời gian, hai bên là điều xảy ra với từng người lúc đó. <b>Ấn vào sự kiện</b> để đọc chi tiết, <b>ấn vào năm</b> để mở cả hai bên.",
  axisLabel: "Năm<br>tuổi",
  people: {
    a: { name: "Wladek Koskiewicz", short: "Wladek", initial: "W", sub: "về sau là Abel Rosnovski" },
    b: { name: "William Lowell Kane", short: "William", initial: "K", sub: "người thừa kế nhà Kane" }
  },
  footer: "Tóm tắt Phần Một (chương 1–21) của <i>Hai Số Phận</i> (Kane and Abel), Jeffrey Archer, Nguyễn Việt Hải dịch.<br>Hai nhân vật sinh cùng ngày nên tuổi ở trục giữa là tuổi của cả hai.",
  rows: [
  {
    year: "1906", age: "Chào đời", shared: true,
    a: [{
      when: "18/4/1906", place: "Rừng gần Slonim, Ba Lan", ch: [1, 3],
      title: "Tiếng khóc bên bờ sông",
      tease: "Người mẹ chết khi sinh, đứa trẻ được nhà thợ bẫy thú nhận nuôi.",
      body: `<p>Một thiếu phụ vô danh trút hơi thở cuối cùng khi sinh con một mình bên bờ sông trong rừng. Franke, con trai cả nhà thợ bẫy thú, đang đi săn thỏ thì nghe tiếng khóc và ôm đứa bé chạy về nhà.</p>
             <p>Helena Koskiewicz, đã chín lần sinh nở, nhận nuôi đứa trẻ dù gần như cạn sữa. Chồng chị là Jasio phát hiện đứa bé <b>chỉ có một núm vú</b> và coi đó là điềm gở. Helena vẫn một mực che chở cho nó.</p>
             <p>Chủ nhật sau đó, đứa trẻ được rửa tội ở nhà thờ nhỏ trong lãnh địa của Nam tước Rosnovski, tên là <b>Wladek Koskiewicz</b>. Từ đó chị cả Florentyna phải chia mọi thứ làm chín phần.</p>`
    }],
    b: [{
      when: "18/4/1906", place: "Boston, Massachusetts", ch: [2, 4],
      title: "Người thừa kế nhà Kane",
      tease: "Con trai đầu lòng của chủ ngân hàng Richard Kane.",
      body: `<p>Trong một bệnh viện dành cho giới giàu có ở Boston, Anne Kane (21 tuổi) sinh con trai. Bên ngoài, người cha Richard Kane, chủ ngân hàng Kane và Cabot, vừa đi đi lại lại vừa dò trang tài chính: trận động đất San Francisco cùng ngày đã làm ông mất gần 100.000 đô.</p>
             <p>Hôm sau, bà nội Kane và bà ngoại Cabot đến thăm đứa cháu. Richard đã kịp đánh điện ghi danh con vào trường St. Paul cho khóa <b>tháng 9/1918</b>.</p>
             <p>Đứa bé được đặt tên <b>William Lowell Kane</b>.</p>`
    }],
    note: `Cùng ngày 18/4/1906, <span class="an">một đứa trẻ mồ côi</span> ra đời trong rừng Ba Lan và <span class="bn">một người thừa kế</span> ra đời ở Boston.`
  },
  {
    year: "1907–10", age: "1–4 tuổi",
    a: [{
      when: "1907 – 1911", place: "Slonim", ch: [5],
      title: "Ốm yếu nhưng thông minh khác thường",
      tease: "Biết nói lúc 18 tháng, biết đọc trước 3 tuổi.",
      body: `<p>Wladek chậm lớn, mắc đủ thứ bệnh và hay lây cho cả nhà. Jasio đổ lỗi cho quỷ sứ, còn Helena quyết liệt bênh con.</p>
             <p>Nhưng cậu nói sõi khi mới 18 tháng, biết đọc lúc chưa đầy 3 tuổi và viết được câu mạch lạc lúc 5 tuổi. Ở trường làng, thầy Kotowski sớm nhận ra tài năng của cậu. Lên 5, Wladek đứng đầu lớp mọi môn trừ môn làm mộc. Tối về, cậu đọc hết mọi cuốn sách tìm được.</p>`
    }],
    b: [{
      when: "10/1907 – 10/1908", place: "Boston", ch: [6],
      title: "Ngân hàng đứng vững sau động đất",
      tease: "Richard làm Chủ tịch, mua chiếc ô tô Ford đầu tiên.",
      body: `<p>Richard Kane lên làm Chủ tịch Ngân hàng và Công ty Tín dụng Kane và Cabot. Chi nhánh San Francisco sụp đổ theo đúng nghĩa đen trong trận động đất. Tháng 10/1907 ông khánh thành trụ sở mới ở Quảng trường Liên hiệp.</p>
             <p>Tháng 10/1908, khoản đầu tư thận trọng vào Henry Ford mang về cho ông một chiếc ô tô. Hai bà thề không bao giờ bước lên cỗ máy kỳ quặc ấy, còn bé William thì mê tít.</p>`
    },{
      when: "Khoảng 1908", place: "Boston", ch: [6],
      title: "Không còn em",
      tease: "Anne sảy thai, bác sĩ cấm mang thai lần nữa.",
      body: `<p>Chiều ý hai bà, Anne mang thai lần nữa nhưng sảy thai ở tuần thứ 16. Bác sĩ MacKenzie cảnh báo chuyện này rất dễ tái diễn nên không cho cô thử lại. William sẽ là con một. Đó là đòn nặng với Richard, người từng mơ có một bầy con nối dõi.</p>
             <p class="fs">→ Lời cảnh báo này sẽ quay lại vào năm 1922.</p>`
    }]
  },
  {
    year: "1911", age: "5 tuổi",
    a: [{
      when: "Mùa thu 1911", place: "Lâu đài Rosnovski", ch: [5],
      title: "Nam tước gõ cửa",
      tease: "Được mời vào lâu đài học cùng cậu chủ Leon.",
      body: `<p>Một tối, Nam tước Rosnovski đích thân đến túp lều. Con trai ông là Leon (6 tuổi) đang học với hai thầy, một người Ba Lan và một người Đức, và cần một bạn học. Wladek được chọn.</p>
             <p>Wladek không chịu đi nếu thiếu chị Florentyna. Nam tước đồng ý cho cô theo làm trong bếp. Sáng hôm sau hai chị em gõ cửa lâu đài. Leon và Wladek nhanh chóng thành đôi bạn thân, ngày nào cũng học từ 7 giờ sáng.</p>`
    },{
      when: "Giáng sinh 1911", place: "Túp lều trong rừng", ch: [5],
      title: "Bí mật về sự ra đời",
      tease: "Về nhà nghỉ lễ, Wladek biết mình không phải con ruột.",
      body: `<p>Về túp lều nghỉ lễ, Wladek thấy mình lạc lõng. Cậu ăn mặc chỉnh tề, nói những chuyện cha không hiểu và cũng không muốn hiểu. Lần đầu cậu hỏi về sự ra đời của mình và biết mình là đứa trẻ được nhặt về từ rừng.</p>
             <p>Cậu không buồn mà thầm mừng vì không mang dòng máu người thợ săn. Hết kỳ nghỉ, cậu trở lại lâu đài từ trước lúc trời sáng. Đến hè, Leon xin cha cho Wladek ở lại luôn.</p>`
    }],
    b: [{
      when: "18/4/1911", place: "Sinh nhật 5 tuổi · Boston", ch: [6],
      title: "Thầy giáo riêng",
      tease: "Richard đưa con ra khỏi vòng tay phụ nữ, thuê thầy Munro.",
      body: `<p>Richard quyết định đã đến lúc con trai thoát khỏi sự bao bọc của các bà, các cô. Ông thuê thầy Munro, 23 tuổi, tốt nghiệp ngành Anh ngữ ở Đại học Edinburgh, với lương 450 đô/năm.</p>
             <p>Ông thầy không theo kịp cậu học trò mê con số, nên William kiên nhẫn bám theo mọi người lớn trong nhà để hỏi những bài toán cậu tự nhẩm trong đầu.</p>`
    }]
  },
  {
    year: "1912", age: "6 tuổi",
    a: [{
      when: "1912 – 1914", place: "Lâu đài Rosnovski", ch: [7],
      title: "Hai cậu bé trong lâu đài 72 phòng",
      tease: "Trốn tìm dưới hầm, bơi sông, nghe chuyện dòng họ.",
      body: `<p>Tan học, Leon và Wladek chơi trốn tìm khắp 72 căn phòng. Wladek thích nhất là trốn trong những gian hầm tối, và chính hiểu biết ấy về sau sẽ cứu nhiều mạng người. Mùa xuân hai cậu câu cá, mùa hè bơi trên sông Shchara, mùa đông trượt băng, còn Florentyna ngồi trên bờ lo lắng.</p>
             <p>Leon cao lớn, khỏe mạnh. Wladek nhỏ con nên đêm nào cũng tập thể dục. Nam tước ngày càng thương cậu bé tóc đen. Từ sinh nhật 8 tuổi của Leon, hai cậu được ăn tối cùng Nam tước và nghe kể về cụ tổ từng chiến đấu dưới trướng Napoleon, nhờ thế mà được phong tước Nam tước.</p>`
    }],
    b: [{
      when: "Tháng 4/1912", place: "London → Boston", ch: [6, 8],
      title: "Titanic",
      tease: "Cha về Mỹ trước, trên con tàu định mệnh.",
      body: `<p>Cả nhà sang Anh trên tàu Aquitania và ở khách sạn Savoy. William kết bạn với cậu bé Stuart Seymour. Đúng hôm trước ngày về, William sốt cao và nổi mẩn đỏ khắp người.</p>
             <p>Vì 2.500 công nhân một nhà máy đang đình công, Richard không thể hoãn chuyến. Ông về một mình, để vợ con ở lại London chờ chuyến tàu ba tuần sau. Vài ngày sau, William chỉ vào tấm ảnh trên tờ <i>The Times</i>: <q>Ảnh chụp con tàu cha đã đi. Thảm họa là sao hả mẹ?</q></p>
             <p>Richard Kane chết trong vụ chìm tàu <b>Titanic</b>. Thứ Năm tuần đó William tròn 6 tuổi và không mở món quà nào. Phần lớn tài sản được để lại cho cậu, đặt trong quỹ ủy thác đến khi cậu đủ 21 tuổi.</p>`
    }],
    note: `Cùng năm 6 tuổi, <span class="bn">William</span> mất cha, còn <span class="an">Wladek</span> tìm thấy một người như cha ở Nam tước Rosnovski.`
  },
  {
    year: "1914", age: "8 tuổi",
    a: [{
      when: "Tháng 7/1914", place: "Lâu đài Rosnovski", ch: [7],
      title: "Ông thầy người Đức bỏ đi",
      tease: "Những dấu hiệu đầu tiên của chiến tranh.",
      body: `<p>Không báo trước, không một lời giải thích, ông thầy người Đức rời lâu đài mà chẳng chào ai. Rồi những người hầu trẻ mà lũ trẻ quý mến lần lượt biến mất. Hai cậu bé chưa hiểu gì, nhưng Thế chiến thứ nhất đã bắt đầu.</p>`
    }],
    b: [{
      when: "18/4/1914", place: "8 tuổi · Boston", ch: [8],
      title: "Cuốn sổ tài khoản",
      tease: "Hai bà dạy cháu giá trị của đồng tiền.",
      body: `<p>Sau khi Richard mất, Anne và hai bà cùng nuôi dạy William. Hai bà quyết định tròn 8 tuổi là lúc cậu phải hiểu giá trị đồng tiền. Cậu phải ghi sổ và giải thích được từng khoản chi. Chỉ sau ba tháng, William đã giải trình được mọi khoản.</p>
             <p>Cậu ghi sổ cẩn thận mỗi ngày và sẽ giữ thói quen đó đến tận sinh nhật 21 tuổi. Ở trường, cậu ít bạn và dè dặt với bất cứ ai không thuộc họ Cabot, họ Lowell hay những nhà giàu hơn.</p>`
    }]
  },
  {
    year: "1915", age: "9 tuổi",
    a: [{
      when: "Tháng 8/1915", place: "Lâu đài Rosnovski", ch: [7],
      title: "Quân Đức ập vào lâu đài",
      tease: "Leon chết khi che chở cho Wladek.",
      body: `<p>Nam tước đi Warsaw ba tuần rưỡi. Về đến nơi, ông báo quân Đức và Áo-Hung đã ở cửa ngõ Warsaw và cả nhà sẽ chuyển đến một biệt thự phía bắc Grodno.</p>
             <p>Chưa kịp đi thì một sáng thứ Bảy, đang giờ học, lính Đức xông vào. Ngoài bãi cỏ là một dãy xác người. Một tên lính nện báng súng vào Wladek. Leon lao vào che cho bạn, hứng trọn cú đánh vào gáy và chết.</p>
             <p>Những người sống sót, kể cả Nam tước, bị tống xuống hầm ngục của chính lâu đài.</p>`
    }],
    b: [{
      when: "Tháng 9/1915", place: "Học viện Sayre", ch: [8],
      title: "Ông vua nhãn diêm",
      tease: "9 tuổi, lãi 51,32 đô nhờ viết thư cho các chủ tịch.",
      body: `<p>Sinh nhật 9 tuổi, William trình cuốn sổ cho hai bà kiểm tra sau một năm. Mùa thu đó, Học viện Sayre rộ phong trào sưu tầm nhãn diêm. William dành một buổi chiều chép địa chỉ các nhà sản xuất rồi viết thư cho từng ông chủ tịch xin nhãn, ký tên <q>William Kane (9 tuổi)</q>.</p>
             <p>55% số người hồi âm, gửi về 78 loại nhãn. Cậu bán dần, đến khi đoán thị trường đã chạm đỉnh thì mở đấu giá, thu về 56,32 đô, <b>lãi 51,32 đô</b>. Hai bà gật gù vì đó cũng là cách chồng các bà làm giàu trong cuộc khủng hoảng năm 1873.</p>`
    }]
  },
  {
    year: "1916–17", age: "10–11 tuổi",
    a: [{
      when: "1915 – 1918", place: "Hầm ngục lâu đài", ch: [9],
      title: "Ba năm dưới hầm ngục",
      tease: "Cậu bé 9 tuổi lo khẩu phần cho cả đoàn tù.",
      body: `<p>Wladek là người duy nhất thuộc đường đi trong bốn gian hầm. Dù nhỏ tuổi nhất, cậu nhận việc chia thức ăn, nước uống và sắp xếp công việc cho bạn tù.</p>
             <p>Nam tước, suy sụp vì mất con, dần trở thành thầy của cậu, và ngày nào cũng kết thúc bằng một bài học về dòng họ Rosnovski. Qua những mẩu chuyện vụn vặt, Wladek biết tin về Cách mạng tháng Mười ở Nga và Hòa ước Brest-Litovsk. Florentyna cặm cụi giữ cho gian hầm của Nam tước sạch sẽ.</p>
             <p>Đến mùa xuân 1918, chỉ còn <b>15 trong số 27</b> người tù sống sót.</p>`
    }],
    b: [{
      when: "1916 – 4/1917", place: "Boston", ch: [8],
      title: "Từ xe đẩy hành lý đến 412 đô",
      tease: "Đầu tư lỗ 30 đô, rồi tự gỡ lại bằng sức mình.",
      body: `<p>Chê lãi suất tiết kiệm 2,5% quá thấp, William thử đầu tư và mất gần 30 đô. Hè đến, cậu tự đóng một chiếc xe đẩy và chở hành lý kiếm tiền ở nhà ga, đến mức cánh tài xế taxi phát bực. Cậu hứa nghỉ việc khi tròn 10 tuổi nếu mỗi tài xế góp 50 cent, kiếm thêm 8,5 đô, rồi bán luôn chiếc xe cho một bạn học lấy 2 đô.</p>
             <p>Tháng 4/1917, Tổng thống Wilson tuyên chiến với Đức, và William chẳng bận tâm. Đến sinh nhật 11 tuổi, cột tiền gửi trong sổ đã lên <b>412 đô</b>. Cậu giành học bổng toàn phần môn toán vào trường St. Paul. Cậu muốn nhận, nhưng hai bà nhất quyết trả lại.</p>`
    }]
  },
  {
    year: "1918", age: "12 tuổi",
    a: [{
      when: "Mùa thu 1918", place: "Hầm ngục lâu đài", ch: [9],
      title: "Chiếc vòng bạc",
      tease: "Nam tước hấp hối nhận Wladek là con trai và người thừa kế.",
      body: `<p>Biết mình sắp chết, Nam tước gọi hai người hầu đến làm chứng. Không có giấy mực để lập di chúc mới, Leon thì đã mất. Ông tháo chiếc vòng bạc trên cổ tay mình đeo cho Wladek: <q><b>Con trai ta và người thừa kế của ta!</b></q></p>
             <p>Wladek nằm trong vòng tay ông suốt đêm cho đến khi tim ông ngừng đập. Lúc hạ huyệt, chiếc áo lụa mục của Nam tước bung ra và Wladek sững người. <b>Ông cũng chỉ có một núm vú.</b></p>`
    },{
      when: "Cuối thu 1918", place: "Lâu đài Rosnovski", ch: [9],
      title: "Mất Florentyna",
      tease: "Quân Nga đến, nhưng không phải để giải cứu.",
      body: `<p>Tiếng súng nổ, quân Đức bỏ chạy. Wladek tưởng quân Ba Lan đến cứu, nhưng những người mới đến lại nói một thứ tiếng Slav khó nghe. Họ không hề biết cậu bé 12 tuổi kia là chủ nhân vùng đất họ vừa chiếm.</p>
             <p>Tù nhân bị lùa xuống sông tắm. Wladek bị giữ chặt và phải nhìn chị Florentyna (20 tuổi) bị cả toán lính cưỡng hiếp. Cậu ôm chị bên bờ sông cho đến khi chị lả đi và tắt thở, rồi tự tay đào huyệt chôn chị cạnh mộ Nam tước.</p>`
    }],
    b: [{
      when: "Tháng 9/1918", place: "St. Paul, Concord, New Hampshire", ch: [8],
      title: "Trường St. Paul",
      tease: "Bạn cùng phòng: Matthew Lester.",
      body: `<p>Mặc chiếc quần dài đầu tiên, xách va li nhỏ, William lên đường đến Concord. Điều lạ nhất với cậu là ở đây chẳng ai biết cậu là ai.</p>
             <p>Bạn cùng phòng là <b>Matthew Lester</b>, con trai Chủ tịch ngân hàng Lester và Công ty ở New York. Matthew là đối thủ xứng tầm duy nhất trong lớp và sớm thành bạn thân của William. William luôn đứng đầu, nhất là môn toán. Khi danh mục đầu tư trên giấy của cậu liên tục thắng chỉ số Dow Jones, cậu bắt đầu đầu tư bằng tiền thật.</p>`
    }],
    note: `Cùng 12 tuổi, <span class="an">Wladek</span> vừa được nhận làm người thừa kế đã mất tất cả, còn <span class="bn">William</span> bước vào ngôi trường của giới tinh hoa.`
  },
  {
    year: "1919", age: "13 tuổi",
    a: [{
      when: "Cuối 1918 – 1919", place: "Minsk → Smolensk → Siberia", ch: [11],
      title: "Đày sang Siberia",
      tease: "Giết người trên toa tàu chở gia súc.",
      body: `<p><q>Tôi sẽ sống để giết các người</q>, Wladek nói với tên lính lôi cậu khỏi mộ chị. Bị cạo đầu, mang số thay cho tên, cậu giấu chiếc vòng bạc trong cổ tay áo. Đoàn tù bị dồn lên những toa chở gia súc, đi mãi về phía đông qua Minsk, Smolensk.</p>
             <p>Một đêm, thủ lĩnh nhóm tù Smolensk siết cổ Alfons, người hầu thân tín của Nam tước và là <b>nhân chứng cuối cùng</b> cho quyền thừa kế của Wladek. Trong lúc vật lộn, Wladek giành được lưỡi lê và giết hắn. Không còn nhân chứng nào, cậu định tự sát nhưng bị lính giật mất lưỡi lê.</p>
             <p>Cậu trở thành người cầm đầu cả toa và học tiếng Nga từ chính kẻ thù. Đoàn tù đi qua Omsk, Novosibirsk, Krasnoyarsk, rồi bị xích đi bộ 900 dặm và kéo đi bằng xe trượt tuần lộc của người Ostyak.</p>`
    },{
      when: "1919", place: "Trại 201, Siberia", ch: [13],
      title: "Trại 201 và bác sĩ Dubien",
      tease: "Món quà là cả 15 năm dành dụm của một người tù.",
      body: `<p>Trại 201 nằm gần vùng Bắc Cực, với những dãy lều gỗ. Ngày nào tù nhân cũng phải đốn cây, chặt không đủ thì bị cắt khẩu phần. Chân Wladek bị thương nặng. Bác sĩ Dubien chữa cho cậu và xin cho cậu vào bếp. Ông học y ở Paris, bị bắt năm 1904, mới 38 tuổi mà trông như ông già.</p>
             <p>Ông trao cho Wladek tất cả những gì dành dụm suốt 15 năm: <b>200 rúp</b>, một bộ quần áo, áo sơ mi, chiếc mũ và tấm bản đồ vẽ từ năm 1904 theo lộ trình Moscow → Odessa → Thổ Nhĩ Kỳ, 1.500 dặm đến tự do.</p>`
    },{
      when: "1919", place: "Ga Irkutsk", ch: [13],
      title: "Vượt ngục ở Irkutsk",
      tease: "Chui gầm tàu, nhảy lên chuyến xe lửa đi Moscow.",
      body: `<p>Theo kế hoạch, Wladek vào đội bếp áp tải đoàn tù mới. Sau 16 ngày đường đến ga Irkutsk, bếp trưởng Stanislav đoán ra ý định của cậu và chúc cậu may mắn. Khi hàng trăm tù nhân mới đổ xuống sân ga, Wladek chui qua gầm tàu, băng qua đường ray và nhảy lên chuyến xe lửa đi Moscow.</p>
             <p>Cậu bỏ 50 rúp mua chiếc áo khoác của một tay cờ bạc. Một phụ nữ ăn mặc sang trọng che chắn cho cậu trước người soát vé. Bà đã thấy cậu bò ra từ gầm tàu chở tù.</p>`
    },{
      when: "1919", place: "Moscow", ch: [15],
      title: "Ân nhân và người chồng sợ hãi",
      tease: "Một tấm vé và giấy thông hành đi Odessa.",
      body: `<p>Sau 12 ngày rưỡi, tàu đến Moscow. Người đàn bà muốn giữ Wladek lại như con, nhưng chồng bà là Piotr, một trưởng ga, sợ bị liên lụy. Sau Cách mạng, ai cũng phải có giấy tờ tùy thân.</p>
             <p>Ông ta cấp cho cậu một tấm vé và giấy thông hành đi Odessa rồi tống cậu lên chuyến tàu lúc nửa đêm.</p>`
    }],
    b: [{
      when: "Tháng 1/1919", place: "Boston", ch: [10],
      title: "Henry Osborne xuất hiện",
      tease: "Người đàn ông điển trai trong một bữa tối bốn người.",
      body: `<p>William đi học xa, Anne vừa qua tuổi 30 và thấy cô đơn. Tháng 1/1919, bạn cô là Millie Preston mời đến một bữa tối bốn người và xếp cô ngồi cạnh <b>Henry Osborne</b>, một người điển trai, tự giới thiệu từng học Harvard và vừa từ chiến trường trở về.</p>
             <p>Thứ Hai nghe hòa nhạc, thứ Ba xem kịch, thứ Tư ra Bờ Bắc. Chỉ trong một tuần, hai người đã yêu nhau.</p>`
    },{
      when: "Tháng 10/1919", place: "Đồi Beacon, Boston", ch: [10],
      title: "Bà Henry Osborne",
      tease: "William phản đối và không bao giờ đổi ý.",
      body: `<p>Mùa hè năm ấy, tin đính hôn không làm ai bất ngờ, trừ William. Tháng 10/1919, Anne Kane trở thành bà Henry Osborne. Hai người đi tuần trăng mật ở Hy Lạp và về Dinh Thự Đỏ trên Đồi Beacon vừa kịp Giáng sinh.</p>
             <p>Trong mắt William, chiếc xe đạp mới mà Henry tặng chỉ là đồ hối lộ. Cậu không còn thấy thoải mái trong chính ngôi nhà của mình, trong khi Henry dường như chẳng có việc gì để làm.</p>`
    }]
  },
  {
    year: "1920", age: "14 tuổi",
    a: [{
      when: "1920", place: "Odessa", ch: [17],
      title: "Stefan và hầm than",
      tease: "Học ăn cắp ở chợ, trốn lên tàu sang Constantinople.",
      body: `<p>Trên chuyến tàu đi Odessa, Wladek bị đánh và cướp sạch. Ở Odessa, cậu gặp Stefan, một đứa trẻ đường phố. Lúc đầu nó định bóp cổ cướp của cậu, sau lại thành bạn và dạy cậu cách ăn cắp hoa quả ngoài chợ. Ban ngày hai đứa vác thóc ở bến cảng.</p>
             <p>Wladek muốn rời nước Nga. Biết tàu <b>Renaska</b> sẽ đến lấy than rồi quay về Constantinople, cậu trà trộn vào đội khuân vác và nhảy xuống khoang than. Suốt hai ngày ba đêm trong bóng tối, cậu chống chọi với lũ chuột mà không chợp mắt được phút nào.</p>`
    },{
      when: "1920", place: "Constantinople", ch: [19],
      title: "Suýt mất một bàn tay",
      tease: "Chiếc vòng bạc chặn lưỡi đao.",
      body: `<p>Wladek tỉnh dậy trong một bệnh viện, không hiểu thứ tiếng xung quanh. Cậu trốn ra theo thang thoát hiểm, ra chợ mua cam, nhưng ở đây tiền rúp không có giá trị và cậu bị bắt vì tội ăn cắp.</p>
             <p>Hôm sau, giữa chợ, gã đao phủ giơ đao định chặt tay cậu theo luật. Thấy chiếc vòng bạc, hắn khựng lại, và hai người đàn ông phương Tây kịp can thiệp. Lãnh sự Anh Edward Prendergast nghe cậu kể lại đời mình rồi giao cậu cho Lãnh sự Ba Lan <b>Pawel Zaleski</b>. <q>Cháu sẽ luôn là người Ba Lan, Wladek ạ!</q></p>`
    }],
    b: [{
      when: "1920", place: "Boston", ch: [12],
      title: "100.000 đô đầu tiên",
      tease: "Henry xin vốn làm bất động sản.",
      body: `<p>Henry vẫn không tìm được việc và tự ái mỗi khi bị nhắc đến chuyện đó. Sau một trận cãi vã kết thúc trong nước mắt, Anne đồng ý đưa anh ta <b>100.000 đô</b> để lập công ty bất động sản ở Boston.</p>
             <p class="fs">→ Đây mới chỉ là khoản đầu tiên.</p>`
    }]
  },
  {
    year: "1921", age: "15 tuổi",
    a: [{
      when: "1920 – 1921", place: "Lãnh sự quán Ba Lan", ch: [21],
      title: "Hơn một năm ở Lãnh sự quán",
      tease: "Pawel Zaleski lo cho cậu sang Tân Thế Giới.",
      body: `<p>Wladek ở lại Lãnh sự quán Ba Lan ở Constantinople hơn một năm chứ không phải vài ngày như cậu nghĩ. Cậu hiểu mình có thể sẽ không về được Ba Lan cho đến khi gây dựng được sự nghiệp. Ông Pawel bỏ tiền và lo giấy tờ cho cậu di cư sang Mỹ, vùng đất mà ông gọi là Tân Thế Giới.</p>`
    },{
      when: "Mùa xuân 1921", place: "Tàu Mũi Tên Đen", ch: [21],
      title: "Vượt Đại Tây Dương",
      tease: "Người bạn mới George và mối tình đầu Zaphia.",
      body: `<p>Wladek lên tàu Mũi Tên Đen đi đảo Ellis. Bạn cùng khoang là Jerzy Nowak từ Warsaw, người khăng khăng đòi được gọi là <b>George</b>. Trên tàu, cậu quen Zaphia, giữ được chiếc vòng bạc khi có kẻ toan lấy trộm, và trải qua mối tình đầu.</p>`
    },{
      when: "1921", place: "Đảo Ellis, New York", ch: [21],
      title: "Abel Rosnovski",
      tease: "Cái tên mới đọc ra từ chiếc vòng bạc.",
      body: `<p>Qua đêm đầu tiên trên đất Mỹ trong lán trại, cậu lần lượt khám sức khỏe, phỏng vấn và tuyên thệ trên Kinh Thánh. Ở bàn cuối cùng, dưới ảnh Tổng thống Harding, viên sĩ quan di trú hỏi họ tên. Jerzy đáp <q>George Novak</q>.</p>
             <p>Wladek đứng lặng, không thốt nên lời vì cậu ghét cái tên quê mùa của mình. Viên sĩ quan cầm cổ tay cậu, đọc dòng chữ trên chiếc vòng bạc rồi ghi <b>MDL21871708 · Nam tước Abel Rosnovski</b>. <q>Chào mừng đến với nước Mỹ… chúc may mắn, anh Abel.</q></p>`
    }],
    b: [{
      when: "Hè 1921", place: "Vermont → New York", ch: [12],
      title: "Mùa hè với nhà Lester",
      tease: "Trại hè Vermont, rồi New York.",
      body: `<p>Sinh nhật 15 tuổi, William đang học năm thứ ba ở St. Paul và nổi bật trong Hội Tranh luận. Lần đầu tiên kể từ khi mẹ tái hôn, cậu mong đến hè. Cậu có sáu tuần trại hè ở Vermont với Matthew, rồi về New York với gia đình Lester.</p>
             <p>Cậu nói với Matthew không chút do dự rằng ra trường cậu sẽ là thủ khoa, là lớp trưởng và giành học bổng Hamilton Toán học vào Harvard. Ở New York, cậu gặp Susan, em gái Matthew, và quý ngay ông Charles Lester, người làm cậu nhớ đến cha mình. Ông dẫn cậu đi thăm ngân hàng.</p>`
    },{
      when: "Tháng 10/1921", place: "Boston", ch: [12, 14],
      title: "Những lá thư nặc danh",
      tease: "Henry bị tố ngoại tình, và Anne mang thai.",
      body: `<p>Henry tiếp tục hỏi vay tiền. Bác sĩ MacKenzie chưa quên lần sảy thai năm xưa vì cao huyết áp nên phản đối, nhưng Anne, 36 tuổi, vẫn muốn sinh thêm con.</p>
             <p>Ngay sau kỷ niệm hai năm ngày cưới, những lá thư nặc danh bắt đầu đến, nói Henry đang ve vãn một người phụ nữ khác. Tháng sau, Anne biết mình có thai.</p>`
    }]
  },
  {
    year: "1922", age: "16 tuổi",
    a: [],
    aEmpty: "Phần Một khép lại với Wladek ở đảo Ellis (1921). Cuộc đời Abel ở New York tiếp tục trong Phần Hai.",
    b: [{
      when: "1922", place: "Boston", ch: [14],
      title: "Luật sư Thomas Cohen",
      tease: "Ba câu hỏi của một khách hàng 16 tuổi.",
      body: `<p>Đọc thư mẹ báo tin, William âm thầm về Boston, rút tiền tiết kiệm và tìm đến hãng luật Cohen và Yablons. Ông Thomas Cohen chưa từng có khách hàng 16 tuổi nhưng nhanh chóng gác chuyện tuổi tác sang một bên.</p>
             <p>Một tuần sau ông trả lời. Đứa em sắp chào đời không có quyền gì với quỹ ủy thác cha cậu để lại. Cậu không có nghĩa vụ gì với Henry Osborne. Cậu cũng không thể đuổi Henry khỏi Đồi Beacon chừng nào ông ta còn là chồng mẹ cậu. Ngoài ra, <b>trong 18 tháng, mẹ cậu đã rút sạch tài khoản riêng</b>. William biết số tiền đó chỉ có thể rơi vào tay một người.</p>
             <p>Cậu trả 120 đô phí tư vấn. <q>Tôi không muốn mình chịu ơn bất cứ ai.</q></p>`
    },{
      when: "1922", place: "Khách sạn Grand, Boston", ch: [16],
      title: "Khoản vay 500.000 đô",
      tease: "Henry nhắm vào quỹ ủy thác 21 triệu đô của William.",
      body: `<p>Anne mang thai, mệt mỏi, huyết áp cao, và thư nặc danh lại tiếp tục đến. Alan Lloyd, Chủ tịch Kane và Cabot và là cha đỡ đầu của William, mời cô ăn trưa. Henry muốn lấy <b>500.000 đô</b> từ quỹ ủy thác của William đầu tư vào công ty mình để giành hợp đồng xây bệnh viện thành phố.</p>
             <p>Quỹ của William lúc này đã hơn <b>21 triệu đô</b>. Một nửa khoản tái đầu tư được làm theo đề xuất của chính cậu, và cậu còn hứa tặng ông giám đốc đầu tư một chiếc Rolls-Royce nếu ông thắng cậu 10% mỗi năm. Về nhà, Anne lặng lẽ thuê thám tử tư Glen Ricardo.</p>`
    },{
      when: "1922", place: "Câu lạc bộ Thợ Săn", ch: [18],
      title: "Ván golf 100 đô",
      tease: "William thắng cả ván golf lẫn cuộc đấu trí.",
      body: `<p>Đọc báo cáo quý của ngân hàng, William phát hiện đề xuất của Henry và hẹn gặp Alan Lloyd. Trên sân golf, cậu tuyên bố sẽ không bao giờ để tiền ủy thác lọt vào tay Henry, vì hai người ủy thác còn lại, mẹ cậu và Millie Preston, <q>đều đang ngủ với cha dượng tôi</q>.</p>
             <p>Cậu còn biết Henry cần tiền để trả một món nợ cũ ở Chicago, và tiết lộ một tin mật. Công ty Henry đã bị loại, hợp đồng bệnh viện sẽ về tay <b>Kirkbride và Carter</b>. Alan chơi trận golf tệ nhất đời mình và trả cậu 100 đô tiền cược.</p>`
    },{
      when: "1922", place: "Boston", ch: [20],
      title: "Ngày đen tối nhất",
      tease: "Sự thật về Henry và cái chết của Anne.",
      body: `<p>Áy náy vì đã nghi ngờ chồng, Anne ký chấp thuận khoản vay, gạt cả lời can ngăn của Alan. Đúng buổi sáng hợp đồng bệnh viện được trao cho Kirkbride và Carter, thám tử Ricardo báo cáo rằng Henry và Millie Preston từng vào một khách sạn nhỏ trên phố La Salle. Henry chưa từng học Harvard, cũng chưa từng là sĩ quan. Henry Osborne thật đã chết ở trận Somme. Tên thật của hắn là <b>Vittorio Togna</b>.</p>
             <p>Anne gục ngã. William vừa nhận thư của Alan, cùng Matthew về kịp đưa mẹ vào viện. Anne chết vì chứng sản giật, đứa bé gái cũng không qua khỏi. Bác sĩ hỏi gần đây có chuyện gì làm bà đau khổ không. William đáp: <q>Không có chuyện gì, mà chỉ có một người.</q></p>`
    },{
      when: "1922", place: "Đồi Beacon · Kane và Cabot", ch: [20],
      title: "Người đứng đầu nhà Kane",
      tease: "Đuổi Osborne, giữ Alan Lloyd, xây khoa Nhi tưởng nhớ cha.",
      body: `<p>Đêm đó Osborne say khướt trở về. William, 16 tuổi, ra tối hậu thư. Hắn phải cút khỏi nhà ngay, nếu không cậu sẽ cho điều tra nửa triệu đô của mẹ và quá khứ của hắn ở Chicago. Osborne lảo đảo bỏ đi, buông một lời đe dọa không ai nghe rõ.</p>
             <p>Sáng hôm sau Alan Lloyd đưa thư từ chức. William xé đi. <q>Kane và Cabot không cần một chủ tịch mới vào lúc này.</q> Chuyện đó sẽ bàn lại khi cậu 21 tuổi. Sau đám tang, cậu đề nghị thực hiện ước nguyện của mẹ là xây một khoa Nhi ở Bệnh viện Đa khoa Massachusetts để tưởng nhớ cha.</p>`
    }],
    note: `<span class="an">Wladek</span> bắt đầu lại ở nước Mỹ với cái tên của Nam tước. <span class="bn">William</span>, mồ côi cả cha lẫn mẹ năm 16 tuổi, đứng ra làm chủ gia tộc Kane.`
  }
]
};
