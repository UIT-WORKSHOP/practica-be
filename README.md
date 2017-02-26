#Create Update Delete Read data with ASP.NET Web API

##Cấu trúc file

1.CRUD-API-BASIC folder

Chứa source code

2.CRUD-API-BASIC.Tests

Các hàm để test các hàm thư viện

##Solution Configuration
Project này làm việc trên ASP.Net Web API, .Net framework 4.5.2.
Project này được mở bằng visual studio 2017.

##How to run
1.Mở project bằng visual studio 2017 (vs2017)
2.Build project để vs2017 restore các package còn thiếu trên Nuget. Nếu vs2017 không tự động restore thì bạn phải restore thủ công
3.Run web với Chrome hoặc một brower khác.

##How to Test
Profile API sẽ được run bằng các method dưới đây:

Action | HTTP method | Relative URI
------- | ----------- | ------------
Lấy danh sách tất cả các profile | GET | /api/profile/getall
Lấy một profile theo id | GET | /api/profile/GetProfileId/id
Thêm một profile | POST | /api/profile/PostProfile
Update một profile | PUT | /api/profile/PutProfile/id
Delete một profile | DELETE | /api/profile/DeleteProfile/id

#####Ghi chú: id chính là thuộc tính username trong profile

##Example

1.Lấy danh sách các profile hiện có
![GitHub Logo](/images/get-all.png)
Format:![Alt Lấy danh sách cá profile]()

2.Lấy profile theo id
![GitHub Logo](/images/get-profile-id.png)
Format:![Alt Lấy profile theo id]()

3.Thêm một profile
![GitHub Logo](/images/add-post-method.png)
Format:![Alt Thêm profile]()

4.Update profile
![GitHub Logo](/images/update-put-method.png)
Format:![Alt Update profile]()

5.Delete profile
![GitHub Logo](/images/delete-method.png)
Format:![Alt delete profile]()