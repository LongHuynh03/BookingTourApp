# Hướng dẫn Navigation với Authentication

## Cách hoạt động

### 1. **Khi chưa đăng nhập:**
- **Trang chủ**: Hiển thị welcome message và gợi ý đăng nhập
- **Tìm kiếm**: Hiển thị các tùy chọn tìm kiếm + gợi ý đăng nhập
- **Profile**: Hiển thị "Vui lòng đăng nhập" + hướng dẫn
- **Navbar**: Tab cuối cùng hiển thị "Đăng nhập" thay vì "Profile"

### 2. **Khi đã đăng nhập:**
- **Trang chủ**: Hiển thị thông tin cá nhân + nội dung chính
- **Tìm kiếm**: Hiển thị đầy đủ tính năng tìm kiếm
- **Profile**: Hiển thị thông tin người dùng + nút đăng xuất
- **Navbar**: Tab cuối cùng hiển thị "Profile"

## Cấu trúc Navigation

```
MainNavigation
├── Splash (khi loading)
├── Auth (khi chưa đăng nhập)
│   ├── Login
│   └── Register
└── Content (khi đã đăng nhập)
    ├── Main (Home)
    ├── Search
    └── Profile/Login (conditional)
```

## Conditional Tab Logic

```typescript
{isLoggedIn ? (
  <Bottomtab.Screen name="Profile" component={ProfileScreen} />
) : (
  <Bottomtab.Screen name="Login" component={LoginScreenWrapper} />
)}
```

## UI/UX Improvements

### 1. **HomeScreen**
- **Chưa đăng nhập**: Blue banner với lời chào + hướng dẫn
- **Đã đăng nhập**: White card với thông tin cá nhân

### 2. **SearchScreen**
- **Chưa đăng nhập**: Yellow tip banner về lợi ích đăng nhập
- **Đã đăng nhập**: Full search functionality

### 3. **ProfileScreen**
- **Chưa đăng nhập**: Centered message + hướng dẫn
- **Đã đăng nhập**: Full profile information + logout

## Lợi ích

✅ **User Experience**: Người dùng luôn biết cách đăng nhập
✅ **Clear Navigation**: Tab "Đăng nhập" rõ ràng khi chưa đăng nhập
✅ **Consistent UI**: Tất cả screens đều có hướng dẫn đăng nhập
✅ **No Confusion**: Không có tab "Profile" khi chưa đăng nhập

## Cách test

1. **Mở app lần đầu**: Sẽ thấy trang chủ + tab "Đăng nhập"
2. **Nhấn tab "Đăng nhập"**: Chuyển đến màn hình đăng nhập
3. **Đăng nhập thành công**: Tab "Đăng nhập" chuyển thành "Profile"
4. **Đăng xuất**: Tab "Profile" chuyển lại thành "Đăng nhập"
