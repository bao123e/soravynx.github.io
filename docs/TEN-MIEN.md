# Kết nối soravynx.online với GitHub Pages

Tên miền do chủ dự án đăng ký tại Network Solutions. Repo website: https://github.com/bao123e/soravynx.github.io.

## Trạng thái chuẩn bị

- Website HTML/CSS/JS đã có ở thư mục gốc, dùng đường dẫn tương đối.
- Tệp `CNAME` khai báo `soravynx.online`.
- Việc đưa tệp CNAME lên repo không tự bật GitHub Pages hoặc chỉnh DNS của nhà đăng ký.
- Kết nối GitHub hiện tại không có quyền bật Pages (API trả 403). Chủ repo cần thực hiện bước cài đặt dưới đây bằng tài khoản GitHub của mình.

## 1. Bật GitHub Pages trước

Mở https://github.com/bao123e/soravynx.github.io/settings/pages:

1. Build and deployment → Source → **Deploy from a branch**.
2. Branch → **main**, thư mục **/ (root)** → Save.
3. Custom domain → nhập **soravynx.online** → Save (nếu CNAME chưa được nhận tự động).

## 2. Nhập DNS ở Network Solutions

Đăng nhập → Domains → soravynx.online → DNS / Advanced DNS Records → Manage. Nếu nameserver đang do nhà cung cấp khác quản lý, nhập các bản ghi tại nơi đang quản lý DNS đó.

Thêm các bản ghi:

| Loại | Host / Name | Value / Points to | TTL |
| --- | --- | --- | --- |
| A | @ | 185.199.108.153 | mặc định hoặc 3600 |
| A | @ | 185.199.109.153 | mặc định hoặc 3600 |
| A | @ | 185.199.110.153 | mặc định hoặc 3600 |
| A | @ | 185.199.111.153 | mặc định hoặc 3600 |
| CNAME | www | bao123e.github.io | mặc định hoặc 3600 |

Nếu Network Solutions gọi miền gốc là “Root” hoặc chính `soravynx.online`, chọn miền gốc thay cho ký hiệu @. Nếu đã có A cho @ hoặc CNAME/A cho www phục vụ trang parking, thay các bản ghi xung đột đó bằng bảng trên; không thay bản ghi mail MX/TXT.

CNAME của www chỉ là `bao123e.github.io`, không có `https://` và không có `/soravynx.github.io/`. Không cần mua gói hosting hoặc chứng chỉ SSL trả phí để dùng GitHub Pages.

## 3. Bật HTTPS

Sau khi DNS được GitHub xác nhận và chứng chỉ được cấp, trong Settings → Pages bật **Enforce HTTPS**. Kiểm tra:

- https://soravynx.online/
- https://www.soravynx.online/ (GitHub chuyển về miền gốc đã cấu hình)

DNS/chứng chỉ có thể cần thời gian xử lý; dùng trạng thái thực tế trong GitHub Pages để xác nhận, không xem việc thêm CNAME vào repo là website đã hoạt động.

## Nguồn chính thức

- GitHub Pages custom domain: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
- Network Solutions DNS: https://www.networksolutions.com/help/article/manage-dns-adns-records
