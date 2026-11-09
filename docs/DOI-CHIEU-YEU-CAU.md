# Đối chiếu PDF — WEB302 Assignment 1

## Y1 — Thiết kế HTML5/CSS3

| Yêu cầu | Thực hiện | Tệp chứng minh |
| --- | --- | --- |
| Chọn một page template từ Freebiesbug | AppLab / Landing page template for app showcasing, đã xem PSD gốc | SOURCES.md, reference/template-preview.webp |
| Dàn trang HTML5 và ít nhất 5 trang con | Trang chủ + 7 trang con độc lập | 8 tệp .html |
| Nhất quán kích thước, cách trình bày | Container 1220px, token màu/spacing, header/footer dùng chung | css/style.css, toàn bộ HTML |
| Hạn chế ảnh gây nặng web | Một logo WebP 95KB được tái sử dụng; thẻ truy cập dùng CSS; font tự lưu trữ | images/, css/style.css |
| Cấu trúc HTML5 | header, nav, main, section, article, aside, footer; form, canvas, details | HTML các trang |
| CSS3 | Biến :root, Grid, Flexbox, media queries, transition, reduced motion | css/style.css |
| JavaScript | Giỏ hàng, lọc/sắp xếp, chọn gói, form hỗ trợ, lịch sử, canvas | js/app.js |
| Mã rõ ràng, comment | Tệp HTML/CSS/JS có định dạng và comment theo khối chức năng | HTML, CSS, JS |
| Responsive mobile/tablet | Media queries 1050px, 760px, 390px | css/style.css |
| Trình duyệt phổ biến | API tiêu chuẩn cho Chromium/Edge hiện đại và Firefox; kết quả thực tế ghi riêng | docs/KIEM-THU.md |

Bố cục được tùy biến từ template, không phải bản sao từng pixel: hero hai cột, phần tính năng, bảng giá, FAQ và CTA cuối được giữ theo luồng ban đầu. Không đưa testimonials/số liệu khách hàng giả từ template vào cửa hàng thật.

## Y2 — Module HTML5 thực tiễn

Module chính: **Giỏ hàng và yêu cầu đặt key có lịch sử trên thiết bị**.

1. Chọn thời hạn → thêm giỏ hàng. Trùng gói không bị thêm hai lần.
2. Tìm/sắp xếp, chọn gói trên trang chi tiết, xóa gói trong giỏ.
3. Form bắt buộc tên Discord và đồng ý chính sách, có minlength/maxlength/required.
4. Tạo yêu cầu: sinh mã tham chiếu, lưu bản nháp vào localStorage.
5. Sao chép hoặc tải tệp .txt để tự gửi cho người bán trên Discord.
6. Mở lại bản nháp từ trang Đơn đã lưu; xóa lịch sử khi muốn.

Ứng dụng thực tế: gom thông tin khách/gói/ghi chú thành một yêu cầu thống nhất, giảm trao đổi thiếu thông tin. Website tĩnh không đóng vai trò cổng thanh toán hay máy chủ cấp key. Có xử lý khi storage bị chặn hoặc dữ liệu hỏng, tránh chèn HTML từ tên khách và ghi chú.

Module bổ sung: Canvas nền sao responsive; HTML5 details/summary cho FAQ; form tạo nội dung hỗ trợ.

## Đóng gói

- Thư mục website gồm .html, css/, js/, images/, fonts/.
- Tài liệu văn bản gốc .md, ảnh tham khảo template được ghi nguồn.
- ZIP không mật khẩu, dưới 50MB, không chứa PDF đề bài hay PSD gốc dung lượng lớn.
- Nếu đóng gói nộp bài, đặt tên `<Tên đăng nhậpSV>_WEB302_Assignment1.zip`.
- Người dùng chịu trách nhiệm bổ sung tên/mã sinh viên, đọc hiểu mã, tự điều chỉnh và tuân thủ quy định sử dụng nguồn/công cụ của môn học. Không cam kết điểm số.
