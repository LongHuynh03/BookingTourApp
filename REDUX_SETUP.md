# Hướng dẫn cài đặt Redux cho ứng dụng Booking Tour

## Cài đặt dependencies

Chạy các lệnh sau để cài đặt các package cần thiết:

```bash
npm install @reduxjs/toolkit react-redux redux-persist @react-native-async-storage/async-storage
```

## Cấu trúc Redux đã được thiết lập

### 1. Store Configuration (`src/store/index.ts`)
- Đã cấu hình Redux store với Redux Toolkit
- Tích hợp Redux Persist để lưu trữ state
- Chỉ persist auth state để tối ưu hiệu suất

### 2. Auth Slice (`src/store/slices/authSlice.ts`)
- Quản lý state đăng nhập/đăng xuất
- Interface User phù hợp với API response
- Các actions: loginStart, loginSuccess, loginFailure, logout, etc.

### 3. Auth Thunks (`src/store/slices/authThunks.ts`)
- Tích hợp với AuthService thực tế
- Xử lý async actions cho login/register
- Transform API response thành format phù hợp

### 4. Typed Hooks (`src/store/hooks.ts`)
- useAppDispatch và useAppSelector với TypeScript support

## Cách sử dụng

### Trong LoginScreen
```typescript
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser } from '../../store/slices/authThunks';

const dispatch = useAppDispatch();
const { loading, error, isAuthenticated, user } = useAppSelector(state => state.auth);

// Đăng nhập
const result = await dispatch(loginUser(loginData)).unwrap();
```

### Trong ProfileScreen
```typescript
import { useAppSelector } from '../../store/hooks';

const { isAuthenticated, user } = useAppSelector(state => state.auth);
```

## Tính năng đã implement

1. ✅ Đăng nhập với Redux
2. ✅ Quản lý state người dùng
3. ✅ Hiển thị lỗi từ Redux state
4. ✅ Loading state
5. ✅ Persist state (sau khi cài AsyncStorage)
6. ✅ Component UserProfile với logout
7. ✅ ProfileScreen tích hợp Redux

## Lưu ý

- Cần cài đặt `@react-native-async-storage/async-storage` để Redux Persist hoạt động
- State sẽ được tự động lưu và khôi phục khi restart app
- Error handling được tích hợp sẵn trong Redux thunks
