# Bản ghi key truy cập SoraVynx

Thư mục này chứa các tệp `.lic` được ký bằng khóa của chủ tool cho bản dùng mã ngẫu nhiên 15 ký tự. Tên tệp là SHA-256 của mã; nội dung là bản ghi SV2 có hạn dùng và chữ ký P-256. Không đăng mã 15 ký tự, private PEM, GitHub token hoặc dữ liệu khách hàng vào đây.

Chủ tool chạy bộ tạo key v0.2 rồi upload tệp licensing/public-records/<hash>.lic vào thư mục này. Đợi GitHub Pages triển khai xong trước khi dùng key. Có thể cấu hình token giới hạn Contents của repo này trong .env riêng để công cụ tự publish.

Ứng dụng tra bản ghi qua HTTPS và kiểm tra chữ ký; bản ghi tùy ý/không có chữ ký đúng không mở được tool. Key là bearer code, không ràng buộc máy. Đây là bước đăng ký thủ công, chưa phải backend thanh toán QR. Không dùng tệp Markdown này làm bản ghi license.
