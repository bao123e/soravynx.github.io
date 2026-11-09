# SoraVynx Store

Website HTML5/CSS3/JavaScript giới thiệu SoraVynx và đặt key thủ công qua Discord **@vsc.plus**.

**Tên miền đã chuẩn bị:** https://soravynx.online/ — chờ bật GitHub Pages và cấu hình DNS.

**Đường dẫn GitHub Pages mặc định:** https://bao123e.github.io/soravynx.github.io/

Repo thuộc tài khoản `bao123e`, vì vậy GitHub Pages chạy tại đường dẫn trên. Tên miền `soravynx.github.io` chỉ dành cho tài khoản/tổ chức GitHub tên `soravynx`; tên repo dưới `bao123e` không thay đổi tên miền đó. Có thể dùng custom domain nếu chủ dự án sở hữu và cấu hình DNS của domain.

## Chạy trên máy

Mở thư mục bằng VS Code và dùng Live Server mở `index.html`, hoặc:

```sh
python -m http.server 4173
```

Sau đó vào http://localhost:4173/. Giữ cùng origin HTTP để giỏ hàng và lịch sử Web Storage dùng chung giữa các trang. Mở bằng `file://` vẫn xem được nội dung nhưng lưu trữ khác nhau theo trình duyệt.

## Cấu trúc

```text
index.html         Trang chủ
shop.html          Cửa hàng, tìm/sắp xếp gói key
product.html       Chi tiết tool, chọn gói, preview Player/Event
guide.html         Hướng dẫn
support.html       Discord, FAQ, form soạn yêu cầu hỗ trợ
cart.html          Giỏ hàng, tạo/sao chép/tải yêu cầu
orders.html        Lịch sử bản nháp trên thiết bị
policy.html        Chính sách và quyền riêng tư
css/style.css      CSS3, responsive, font tự lưu trữ
js/app.js          Module Form, Web Storage, Canvas
images/            Logo WebP và favicon
fonts/             Be Vietnam Pro và giấy phép OFL
docs/              Đối chiếu PDF và kết quả kiểm thử
reference/         Ảnh template gốc để đối chiếu
tools/build.py     Công cụ tùy chọn tạo HTML dùng chung header/footer
qa/                Kiểm thử nguồn và báo cáo Chromium/Firefox
```

Toàn bộ tệp website nằm ngay ở thư mục gốc, dùng đường dẫn tương đối để chạy được dưới `/soravynx.github.io/` và khi xem trên localhost. `.nojekyll` cho GitHub Pages phục vụ tệp tĩnh.

## Gói key và phạm vi

| Thời hạn | Giá |
| --- | ---: |
| 7 ngày | 29.000đ |
| 1 tháng (30 ngày) | 79.000đ |
| 1 năm (365 ngày) | 499.000đ |
| Vĩnh viễn | 999.000đ |

Đặt giá theo ủy quyền của chủ dự án. Người bán xác nhận tương thích, cách thanh toán, thời hạn bắt đầu và cấp key trực tiếp qua Discord @vsc.plus.

Website không thu tiền, tự cấp key, gửi đơn sang Discord hoặc thực hiện chức năng game. Đơn đã lưu là bản nháp trên trình duyệt, không phải bằng chứng thanh toán. Các gói đang trình bày dành cho Windows; không bán key Android hay cam kết Auto Daily.

## Sửa nội dung

- Sửa trực tiếp các tệp HTML; CSS trong `css/style.css`; JS trong `js/app.js`.
- Bảng giá chức năng ở đầu `js/app.js`; cập nhật cả giá tĩnh trong `index.html`, `shop.html`, `product.html` khi đổi giá.
- Tìm `@vsc.plus` trong HTML/JS để thay liên hệ.
- `python tools/build.py` là công cụ tùy chọn, sẽ tạo lại 8 tệp HTML. Nếu dùng công cụ, sửa nội dung trong build.py trước; lệnh này ghi đè HTML đã chỉnh trực tiếp. Không ghi đè CSS/JS.

## GitHub Pages

Cấu hình: **Settings → Pages → Deploy from a branch → main → / (root)**. Tên miền riêng `soravynx.online` đã có trong tệp `CNAME`. Làm theo [hướng dẫn tên miền](docs/TEN-MIEN.md) để nhập DNS tại Network Solutions và bật HTTPS.

Mỗi lần push vào main, GitHub Pages sẽ cập nhật website. Không cần workflow build, Node hay máy chủ riêng.

## Yêu cầu bài tập

Trang chủ + 7 trang con, semantic HTML5, form validation, giỏ hàng/lịch sử bằng Web Storage, Canvas nền sao, FAQ details/summary, CSS Variables/Grid/Flexbox/media queries. Đã kiểm thử Chromium và Firefox ở 375px, 768px và 1440px.

Template AppLab được chọn trên Freebiesbug và tùy biến cho SoraVynx. Xem [SOURCES.md](SOURCES.md), [đối chiếu yêu cầu](docs/DOI-CHIEU-YEU-CAU.md) và [kết quả kiểm thử](docs/KIEM-THU.md).

Mã nguồn được để đầy đủ, không chỉ đưa ZIP vào repo. Nếu nộp bài, tải Code → Download ZIP, giải nén rồi đóng gói với tên `<tên đăng nhậpSV>_WEB302_Assignment1.zip`. Không kèm PDF đề bài hoặc PSD dung lượng lớn; PSD gốc có link trong SOURCES.md. Sinh viên cần tự đọc, điều chỉnh và tuân thủ quy định ghi nhận nguồn/công cụ của môn học.

Bản rà từng tiêu chí theo PDF, vị trí HTML5/CSS3, module và các giới hạn xác minh: [docs/RA-SOAT-PDF.md](docs/RA-SOAT-PDF.md).


## Tài khoản, ví và QR

Website có 10 trang HTML, thêm account.html (cổng tài khoản) và discord.html (hướng dẫn khách dùng /buy). QR từng đơn, nạp ví, đăng nhập và key dùng backend Node.js tại bộ SoraVynx Owner Tools v0.4.0, không có secret trong GitHub Pages.

Chủ shop cập nhật backend/bot rồi mở licensing/9-Connect-Website.cmd. Script kiểm tra backend mới, cập nhật store-config.json công khai và đăng ký /buy. Nếu chưa kết nối, trang tài khoản hiển thị trạng thái chưa sẵn sàng thay vì thu tiền giả. Cookie tài khoản ở hostname backend để hoạt động bên thứ nhất. Link server chính thức: https://discord.gg/J3BevcpAxF .

Kiểm thử mới: qa/check-commerce.py (Python Playwright + Chromium) chạy với website ở cổng 4173 và fixture licensing/test/commerce-preview.mjs của repo SoraVynx ở 8791. Fixture chỉ dùng localhost, issuer/database riêng, webhook và đăng ký key mô phỏng; không dùng cho nhận tiền thật. qa/check.cjs cũ kiểm tra luồng bản nháp thủ công trước phiên bản tài khoản; dùng bộ commerce cho luồng mua mới.
