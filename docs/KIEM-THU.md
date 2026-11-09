# Kết quả kiểm thử — 09/11/2026

## Đã thực hiện

- Chromium 154.0.8037.57 và Firefox 153.0 bằng Playwright.
- Mỗi trình duyệt: 8 trang × 3 chiều rộng 375px, 768px, 1440px; tổng 48 lượt kiểm tra bố cục. Không tràn ngang. Có h1 duy nhất và liên kết nội bộ dẫn tới tệp tồn tại.
- Kiểm tra luồng thật trên trang: tìm kiếm không dấu, không có kết quả, xóa bộ lọc, sắp xếp giá giảm dần, chọn gói chi tiết, chặn thêm trùng, lưu giỏ qua reload, xóa gói và tính lại giá.
- Tạo yêu cầu với Discord/ghi chú, đồng ý chính sách; yêu cầu có mã, thời gian, đúng gói và tổng giá. Tạo xong giỏ trống; tải .txt hoạt động.
- Lịch sử giữ qua reload; xóa yêu cầu cần bấm xác nhận lần hai.
- Nội dung có cú pháp HTML trong tên Discord được hiển thị dạng chữ, không biến thành phần tử HTML.
- Form hỗ trợ có chủ đề, nội dung và kết quả soạn để tự gửi; không gọi API gửi tin.
- Preview Player/Event đổi nhóm và hỗ trợ bàn phím; menu mobile mở/đóng, Escape đưa focus về nút.
- Dữ liệu localStorage không đúng cấu trúc không làm hỏng giỏ. Khi trình duyệt chặn storage, trang báo giới hạn lưu trữ.
- axe-core 4.14.0: không phát hiện vi phạm critical/serious trong 8 trang ở hai trình duyệt kiểm thử.
- Không có lỗi JavaScript phát sinh trong các luồng kiểm thử.
- Đã xem ảnh chụp trang chủ desktop/mobile để rà bố cục và tương phản. Ảnh chụp đi kèm là bằng chứng minh họa, không thay thế mã văn bản gốc.

## Phạm vi xác minh

Chromium dùng cùng dòng engine với Chrome/Edge hiện đại, nhưng chưa chạy bản Microsoft Edge riêng hoặc thiết bị iOS/Android vật lý. Firefox đã chạy thực tế. Không cam kết hỗ trợ Internet Explorer 11: CSS Variables/Grid và API JS hiện đại hướng đến các trình duyệt đang được cập nhật.

Kết quả tự động chỉ hỗ trợ kiểm tra truy cập, không thay thế rà soát đầy đủ bằng công nghệ hỗ trợ. Website chưa có máy chủ đơn hàng, cổng thanh toán, hệ thống kích hoạt key hay gửi tin Discord tự động; không có giao dịch thật hoặc chức năng game nào được thực hiện trong kiểm thử.

Các báo cáo máy đọc nằm trong thư mục qa/ của checkout nguồn. Repo xuất sang GitHub có website ngay tại thư mục gốc, kèm nguồn kiểm thử và tài liệu; không chứa node_modules, browser binaries, credentials hay dữ liệu khách.
