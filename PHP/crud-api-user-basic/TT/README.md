# Task #1 - TT
# File Structure
* Folder src: Chứa user.php và database.php để kết nối dữ liệu với database và xử lý các hàm thêm,xóa,sửa user.
* restful_api.php: Chứa các hàm xử lý REST API.
* api.php: Nơi gọi API và xử lý 4 method cho việc xử lý dữ liệu.
* sqldata.sql: Tạo database.
* func.js,index.html: Dùng để test trực tiếp trên trình duyệt.

# How To Test

Profile API sẽ được run bằng các method dưới đây:

Action | HTTP method | Relative URI
------- | ----------- | ------------
Lấy danh sách tất cả các profile | GET | .../api.php/user
Lấy một profile theo username | GET | .../api.php/user/[username]
Thêm một profile | POST | .../api.php/user
Update một profile | PUT | .../api.php/user
Delete một profile | DELETE | /api.php/user/[username]

1. Đầu tiên, cần phải cài xammp hoặc wampserver để tạo máy chủ ảo trên localhost, có thể tham khảo cách cài xammp tại đây https://thachpham.com/thu-thuat/cai-dat-localhost-xampp.html. 
2. Cài đặt database, vào mysql và import file sqldata.sql vào, có thể xem hướng dẫn import database tại đây https://trungquandev.com/huong-dan-import-database-trong-phpmyadmin/.
3. Test: Có hai cách test là:
   * Test trực tiếp trên trình duyệt, có thể dùng chrome hoặc firefox để test. Truy cập địa chỉ localhost/[Tên folder chứa source code]/[Đường dẫn ở phía trên]. Ví dụ lấy thông tin user test3: localhost/TT/api.php/test3
   * Test thông qua Postman, hướng dẫn cài postman https://blog.duyetdev.com/2016/03/postman.html#.WLRVPDuLTIU

