# Nguồn tài nguyên & template

Truy cập ngày 09/11/2026. Các tiêu đề nguồn bên dưới được đặt trong ngoặc kép và in nghiêng; phần mô tả thay đổi là nội dung do dự án biên soạn.

## Template được chọn trước khi triển khai

**“Landing page template for app showcasing”** — Arifur Rahman Tushar, AppLab, Freebiesbug, đăng ngày 26/08/2020, cập nhật 23/07/2021.

- Tên trích dẫn: *“Landing page template for app showcasing”*.
- Trang nguồn: https://freebiesbug.com/psd-freebies/landing-template-app-showcasing/
- Danh mục đề bài: https://freebiesbug.com/psd-freebies/website-template/
- Tệp gốc do trang nguồn liên kết: https://drive.google.com/file/d/1_TAPXu-TzfOTVhPXukuZUgCQwc8m3ErH/view
- Đã tải và xem: `01. Freebie/Home page.psd` (221.552.644 byte) và `01. Freebie/Home page.png`.
- Ảnh xem trước trong gói bàn giao: `reference/template-preview.webp`. Ghi nhận bản quyền thiết kế gốc thuộc tác giả. Ảnh chỉ dùng làm tài liệu đối chiếu template, không tải trên website bán key.

### Cách tùy biến

| Thành phần template | Bản SoraVynx |
| --- | --- |
| Header có logo, menu, CTA | Logo SoraVynx, 4 mục điều hướng, giỏ hàng, Discord |
| Hero chữ bên trái và mockup bên phải | Nội dung giới thiệu tool và thẻ truy cập minh họa tự dựng bằng CSS, logo có sẵn |
| Khối giới thiệu tính năng | Mô phỏng Player/Event và nội dung tính năng Windows |
| Bảng giá theo thời hạn | 4 gói key, chuyển lựa chọn, thêm giỏ hàng |
| FAQ accordion | HTML5 details/summary, câu hỏi thực tế về đặt key |
| CTA cuối & footer | Hỗ trợ qua Discord, hướng dẫn và chính sách |

Giữ luồng bố cục giới thiệu → tính năng → bảng giá → FAQ → CTA; tùy biến sang tông tối/mint, font tiếng Việt, hình ảnh thương hiệu và nội dung mới. Không sử dụng các lời chứng thực, số liệu, logo khách hàng hoặc minh họa người của template. Bảy trang con được phát triển thêm từ ngôn ngữ giao diện chung. Không sao chép mã nguồn HTML bên thứ ba vì tài nguyên gốc là PSD; HTML/CSS/JS được viết cho dự án này.

## Trang tham khảo phong cách cửa hàng

*“Store · HecTranMOD”*, https://hectran.com/shop — tham khảo cách khám phá sản phẩm và chọn gói thời hạn. Không sao chép ảnh, mã, tên sản phẩm, chương trình giảm giá hoặc lời giới thiệu từ trang này.

## Thương hiệu & nội dung tool

- Logo SoraVynx: tài nguyên có sẵn của chủ dự án, `/mobile/assets/brand.png` trong repo https://github.com/bao123e/SoraVynx, tối ưu sang WebP để giảm dung lượng. Logo có nguồn gốc từ bước tạo hình trước đó trong dự án; không lấy logo cửa hàng tham khảo.
- Tính năng và trạng thái nền tảng: mã nguồn/tài liệu dự án SoraVynx cùng yêu cầu của chủ dự án. Phần minh họa giao diện ghi rõ “Giao diện mô phỏng”, không phải chứng cứ kiểm thử chức năng game.
- Giá key do trợ lý đề xuất theo ủy quyền của chủ dự án. Không dùng giá của bên tham khảo.
- Nội dung website, CSS trang trí, SVG icon đơn giản và Canvas nền sao được viết riêng cho lần triển khai này. Không có ảnh game hoặc nhân vật bên thứ ba.

## Font

*“Be Vietnam Pro”*, tác giả ghi trong OFL đi kèm; nguồn dự án đã có bộ font. Trang font: https://fonts.google.com/specimen/Be+Vietnam+Pro. Tệp giấy phép SIL Open Font License: `fonts/OFL.txt` (trong ZIP là `website/fonts/OFL.txt`). Font tự lưu trữ, không cần Google Fonts khi chạy website.

## Công cụ hỗ trợ

Thiết kế và mã nguồn được xây dựng với hỗ trợ của OpenAI Codex; tham khảo UI/UX Pro Max cho hướng dẫn bố cục, tương phản, bàn phím và responsive. Playwright/Chromium kiểm thử; axe-core hỗ trợ kiểm tra truy cập; Prettier định dạng mã. Đây là ghi nhận công cụ hỗ trợ, không đại diện xác nhận điểm số hay thay thế việc sinh viên tự hiểu và chỉnh sửa sản phẩm theo quy định nhà trường.
