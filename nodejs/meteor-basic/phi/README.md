# How to run

1. Cài đặt meteor : [Meteor install](https://www.meteor.com/install)
2. Clone project
3. Tạo file development.json trong root folder
4. Run `meteor run --settings development.json`
5. Test

**Note:** Mục đích của file development.json để cho phép đăng nhập bằng facebook. Nội dung file development.json có cấu trúc sau
```
{
  "facebook": {
    "appId": "13254cvx",
    "secret": "sdlk3409u1ihdsn4234n"
  }
}
```
Thay `appId` và `secret` của app trên facebook của bạn


