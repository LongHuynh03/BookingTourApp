# Custom Hooks

## useAuth Hook

Custom hook để quản lý authentication state và các actions liên quan.

### Cách sử dụng

```typescript
import { useAuth } from '../hooks';

const MyComponent = () => {
  const { 
    isLoggedIn, 
    user, 
    loading, 
    error, 
    login, 
    logout, 
    clearError,
    userName,
    userEmail,
    userPhone 
  } = useAuth();

  // Sử dụng các giá trị và functions
};
```

### API Reference

#### State Properties
- `isAuthenticated`: boolean - Trạng thái đăng nhập từ Redux
- `user`: User | null - Thông tin người dùng
- `token`: string | null - JWT token
- `loading`: boolean - Trạng thái loading
- `error`: string | null - Lỗi hiện tại

#### Computed Properties
- `isLoggedIn`: boolean - Kiểm tra đã đăng nhập và có user
- `userName`: string - Tên người dùng
- `userEmail`: string - Email người dùng  
- `userPhone`: string - Số điện thoại người dùng

#### Actions
- `login(credentials)`: Promise - Đăng nhập
- `register(userData)`: Promise - Đăng ký
- `logout()`: void - Đăng xuất
- `clearError()`: void - Xóa lỗi

### Ví dụ sử dụng

#### 1. Đăng nhập
```typescript
const { login, loading, error } = useAuth();

const handleLogin = async (credentials) => {
  const result = await login(credentials);
  if (result.success) {
    // Đăng nhập thành công
    console.log('User:', result.data.user);
  }
};
```

#### 2. Kiểm tra trạng thái đăng nhập
```typescript
const { isLoggedIn, user } = useAuth();

if (isLoggedIn) {
  return <WelcomeScreen user={user} />;
} else {
  return <LoginScreen />;
}
```

#### 3. Hiển thị thông tin người dùng
```typescript
const { userName, userEmail, userPhone } = useAuth();

return (
  <View>
    <Text>Xin chào, {userName}!</Text>
    <Text>Email: {userEmail}</Text>
    <Text>SĐT: {userPhone}</Text>
  </View>
);
```

#### 4. Đăng xuất
```typescript
const { logout } = useAuth();

const handleLogout = () => {
  Alert.alert(
    'Đăng xuất',
    'Bạn có chắc chắn muốn đăng xuất?',
    [
      { text: 'Hủy', style: 'cancel' },
      { text: 'Đăng xuất', onPress: logout }
    ]
  );
};
```

### Lưu ý

- Hook này sử dụng Redux store bên dưới
- State được persist tự động với Redux Persist
- Tất cả actions đều được handle async
- Error handling được tích hợp sẵn
