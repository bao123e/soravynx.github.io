# Rà soát PDF WEB302 — website SoraVynx

Ngày kiểm tra: 09/11/2026. Website: https://soravynx.online/. Phạm vi: PDF do chủ dự án gửi, mã nguồn repo `bao123e/soravynx.github.io` và hành vi trình duyệt. Đây là đối chiếu kỹ thuật, không thay thế đánh giá của giảng viên.

## 1. Số trang — đủ, vượt mức tối thiểu

PDF yêu cầu một trang template và tự phát triển thêm 5 trang con. Hiện có **trang chủ + 7 trang con = 8 tệp HTML độc lập**; các trang con không chỉ là các phần cuộn trong cùng trang chủ.

| Tệp | Nội dung riêng | Bố cục/ứng dụng |
| --- | --- | --- |
| index.html | Trang chủ | Hero hai cột, giới thiệu tính năng, bảng giá, quy trình, FAQ, CTA |
| shop.html | Cửa hàng | Tìm kiếm, lọc kết quả, sắp xếp, 4 gói key |
| product.html | Chi tiết tool | Preview Player/Event, chọn thời hạn, thông tin tính năng |
| guide.html | Hướng dẫn | Mục lục và bài hướng dẫn theo từng bước |
| support.html | Hỗ trợ | Liên hệ Discord, form soạn nội dung, FAQ |
| cart.html | Giỏ hàng | Danh sách gói, tổng giá, form thông tin, tạo yêu cầu |
| orders.html | Lịch sử | Bản nháp yêu cầu đã lưu, sao chép/tải/xóa |
| policy.html | Chính sách | Điều kiện đặt key, tương thích và quyền riêng tư |

Header/footer, font, màu, container và phong cách nút nhất quán; nội dung và cấu trúc phần chính khác nhau giữa các trang.

## 2. Template — có nguồn, cần phân biệt tùy biến với khớp từng pixel

Template đã chọn và tải PSD: AppLab / *“Landing page template for app showcasing”*, Arifur Rahman Tushar, từ danh mục Freebiesbug được đề bài chỉ định. Link và ảnh gốc được ghi tại SOURCES.md, reference/template-preview.webp.

Bản SoraVynx giữ luồng hero → giới thiệu tính năng → bảng giá → FAQ → CTA. Đã đổi màu, logo, minh họa và nội dung; không phải bản dựng khớp từng pixel PSD. Yêu cầu “nhất quán kích thước, trình bày nội dung so với template” cần được trình bày với ảnh đối chiếu; nếu giảng viên yêu cầu bám sát kích thước/tỷ lệ PSD thì bản tùy biến hiện tại cần giảng viên xác nhận. Không thể chấm thay yêu cầu thẩm mỹ/sáng tạo chỉ bằng kiểm thử tự động.

## 3. HTML5 và cấu trúc mã

| Kỹ thuật | Cụ thể ở đâu | Vai trò |
| --- | --- | --- |
| DOCTYPE, lang, charset, viewport | Đầu các tệp HTML | Khai báo HTML5, tiếng Việt UTF-8, viewport cho thiết bị di động |
| header + nav | Đầu các trang | Logo, menu chính, giỏ hàng, liên kết Discord |
| main + section | Phần chính các trang | Tách nội dung chính và các nhóm nội dung |
| article | shop/index/guide và phần lịch sử JS tạo | Gói key, bước hướng dẫn, yêu cầu độc lập |
| aside | cart.html | Khối tóm tắt và tổng giá bên cạnh giỏ |
| footer | Cuối các trang | Điều hướng phụ, liên hệ và thông tin dự án |
| Form validation | cart.html, support.html | label, required, minlength, maxlength; JS reportValidity/setCustomValidity |
| Canvas | index.html, js/app.js: stars() | Vẽ nền sao bằng context 2D; tự đổi kích thước theo viewport |
| details/summary | index.html, support.html | FAQ mở/đóng bằng phần tử HTML gốc |
| Web Storage API | js/app.js: read/write/cart/orders | Lưu giỏ hàng và bản nháp bằng localStorage |
| Truy cập bàn phím | HTML ARIA + js/app.js | Skip link, focus rõ, menu Escape, tab Player/Event bằng phím mũi tên |

Lưu ý: Web Storage là API, không phải một thẻ HTML. JS xử lý tương tác còn HTML định nghĩa nội dung/ngữ nghĩa. PDF đưa Video/Canvas và JavaScript/JQuery như các ví dụ; Y2 chỉ yêu cầu một trong các công nghệ module, không bắt buộc dùng hết Video, Audio, Geolocation, Drag & Drop hoặc cài thêm jQuery khi đã dùng JavaScript.

HTML đã được kiểm tra với W3C Nu HTML Checker: ban đầu tìm thấy một lỗi ARIA trên khối minh họa trang chủ; đã thêm role="img" và kiểm tra lại. Sau sửa, 8 trang không còn lỗi hoặc cảnh báo kiểu warning trong kết quả trả về. Có thông báo info về dấu `/` ở cuối các void element như meta/img do cách định dạng; đó không phải lỗi HTML. Báo cáo: qa/html-validation.json.

Mã HTML/CSS/JS đã được định dạng và có comment theo phần. Không xem việc vượt qua validator là bằng chứng tuyệt đối cho mọi tiêu chí chất lượng mã hoặc truy cập.

## 4. CSS3 — có, dùng trực tiếp để dựng giao diện

| Kỹ thuật | Vị trí trong css/style.css | Ứng dụng |
| --- | --- | --- |
| CSS Variables | :root | Màu nền/chữ/nhấn, border, bán kính, max-width 1220px |
| CSS Grid | .hero-inner, .plans, .product-feature, .cart-layout, .footer-top | Cột hero, lưới gói, khu vực tính năng, giỏ và footer |
| Flexbox | .header-inner, .nav, .actions, .cart-item | Căn menu, nút và hàng thông tin |
| Media queries | 1500px, 1050px, 760px, 390px | Chuyển bố cục theo màn hình |
| clamp() / min() / calc() | Heading, .container | Chữ và khung co giãn theo viewport |
| @font-face, font-display: swap | Đầu CSS | Font tiếng Việt tự lưu trữ, có chữ dự phòng khi font đang tải |
| Gradient, border-radius, shadow | Hero, thẻ minh họa, bảng giá | Tạo hình bằng CSS, giảm ảnh trang trí |
| Transition/transform | Nút, toast, thẻ truy cập | Hiệu ứng hover, thông báo và bố cục thẻ |
| focus-visible | Đầu CSS | Dấu focus khi điều hướng bằng bàn phím |
| prefers-reduced-motion | Cuối CSS | Giảm chuyển động theo cài đặt truy cập |

Không có xác nhận kiểm định W3C CSS Validator riêng trong đợt rà này; CSS đã được trình duyệt Chromium và Firefox render và kiểm tra bố cục. Các kỹ thuật ở bảng là kỹ thuật thực sự có trong mã, không phải danh sách chỉ ghi trong báo cáo.

## 5. Responsive — có, có kiểm thử

- Desktop: hero/tính năng hai cột, bảng giá bốn cột, giỏ hàng có cột tổng kết.
- Dưới 1050px: bảng giá chuyển hai cột, giảm gap/kích thước một số thành phần.
- Dưới 760px: hero, chi tiết sản phẩm, giỏ hàng, hỗ trợ chuyển một cột; menu thành nút mở/đóng; footer đổi cách chia cột.
- Dưới 390px: bảng giá một cột, điều chỉnh preview, nút và kích thước chữ.
- Kiểm thử tự động 8 trang ở 375px / 768px / 1440px, trên Chromium và Firefox. Không phát hiện tràn ngang trong các lượt đó.

Đây là viewport mô phỏng trên máy kiểm thử, chưa phải thử trên mọi điện thoại/tablet thật. Chromium cùng dòng engine với Chrome/Edge nhưng không thay cho việc chạy đúng bản Chrome/Edge được giảng viên yêu cầu. Internet Explorer 11 chưa được hỗ trợ hoặc kiểm chứng.

## 6. Module mở rộng và tính ứng dụng — có

**Module chính: giỏ hàng → tạo yêu cầu đặt key → lịch sử bản nháp.**

1. Chọn gói ở shop/product, chặn thêm trùng cùng gói.
2. Xem và xóa gói; tự tính tổng giá.
3. Nhập tên Discord, ghi chú và bắt buộc đồng ý điều kiện.
4. Form kiểm tra dữ liệu, tạo mã tham chiếu và nội dung yêu cầu.
5. Lưu bằng Web Storage, tải lại trang vẫn giữ giỏ/lịch sử.
6. Sao chép hoặc tải nội dung .txt để gửi người bán qua Discord.
7. Xem lại/xóa bản nháp; báo giới hạn khi lưu trữ bị chặn.

**Tính ứng dụng:** gom lựa chọn, giá và thông tin khách thành nội dung thống nhất; khách không phải nhập lại sau reload và có thể lấy nội dung gửi người bán. Đó là một module chạy thực tế trên website, đáp ứng Y2 bằng Form + Web Storage.

**Giới hạn:** không tự thu tiền, không tự gửi Discord, không đồng bộ đơn lên máy chủ và không tự cấp/kích hoạt key. Đây là luồng đặt yêu cầu thủ công. PDF không bắt buộc backend thanh toán/cấp key.

Module phụ: form soạn hỗ trợ ở support.html và Canvas nền sao. Canvas có thể chứng minh kỹ thuật HTML5 nhưng module giỏ hàng mới là phần thể hiện rõ tính thực tiễn.

## 7. Kết quả kiểm thử và các điểm cần hoàn tất trước khi nộp

- Đã kiểm thử giao diện và luồng nghiệp vụ trên Chromium/Firefox; đợt rà này chạy lại trên tên miền thật soravynx.online.
- Không có lỗi JavaScript trong các luồng kiểm thử, không có lỗi critical/serious do axe-core phát hiện ở các trang kiểm tra. Kết quả tự động không thay thế thử bằng công nghệ hỗ trợ hoặc đánh giá thủ công toàn diện.
- Nguồn có đầy đủ HTML/CSS/JS/images/font; logo dùng WebP khoảng 95KB và tái sử dụng, không có ảnh nền game dung lượng lớn. Font tự lưu trữ tổng khoảng 400KB; toàn bộ tệp giao diện nhỏ hơn 1MB chưa tính tài liệu/reference/QA.
- Khi nộp, cần đóng ZIP với tên đúng **<Tên đăng nhậpSV>_WEB302_Assignment1.zip**. Tên sinh viên hiện chưa được cung cấp; tên tạm không phải xác nhận đã đúng tên tài khoản LMS.
- Đóng gói không có node_modules, browser binaries, PDF đề bài, mật khẩu ZIP hoặc PSD gốc hơn 200MB; giữ mã nguồn và tài liệu gốc. Kiểm tra kích thước dưới giới hạn LMS (<50MB theo đề bài).
- Tài nguyên và công cụ hỗ trợ đã được ghi nhận trong SOURCES.md. Sinh viên phải hiểu, tự điều chỉnh và trình bày trung thực theo quy định của môn học; không cam kết điểm hoặc thay thế yêu cầu riêng của giảng viên.

**Kết luận kỹ thuật:** đủ số trang, có HTML5/CSS3, cấu trúc semantic, JavaScript, responsive và module mở rộng thực tiễn. Chưa thể tuyên bố “đạt 100% mọi tiêu chí”: cần hoàn tất tên ZIP theo sinh viên, đối chiếu mức bám template theo yêu cầu giảng viên và kiểm thử thêm đúng Chrome/Edge nếu môn học yêu cầu bằng chứng trên từng trình duyệt.
