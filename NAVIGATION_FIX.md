# Sửa lỗi Navigation trong React Navigation

## Lỗi gặp phải

```
ERROR  The action 'NAVIGATE' with payload {"name":"Content","params":{"screen":"Home"}} was not handled by any navigator.

Do you have a screen named 'Content'?
```

## Nguyên nhân

1. **Conditional Rendering**: Khi sử dụng conditional rendering trong navigation, việc navigate thủ công có thể gây xung đột
2. **Navigation Structure**: Screen `'Content'` tồn tại nhưng không được định nghĩa đúng cách trong stack
3. **Wrapper Components**: TypeScript errors với wrapper components

## Giải pháp đã áp dụng

### 1. Cập nhật MainNavigation.tsx

```typescript
const MainNavigation = () => {
    const { isLoggedIn, loading } = useAuth();
    
    // Show splash screen while loading
    if (loading) {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Splash" component={SplashScreen} />
            </Stack.Navigator>
        );
    }
    
    return (
        <Stack.Navigator 
            screenOptions={{ headerShown: false }}
            initialRouteName={isLoggedIn ? "Content" : "Auth"}
        >
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="Auth" component={MainStackNavigator}/>
            <Stack.Screen name="Content" component={MainBottomTabNavigator}/>
        </Stack.Navigator>
  )
}
```

**Thay đổi:**
- Định nghĩa tất cả screens trong stack thay vì conditional rendering
- Sử dụng `initialRouteName` để điều khiển screen ban đầu
- Đảm bảo `Content` screen luôn tồn tại

### 2. Cập nhật LoginScreen.tsx

```typescript
// Thay vì navigate thông thường
navigation.navigate('Content');

// Sử dụng reset để clear navigation stack
navigation.reset({
  index: 0,
  routes: [{ name: 'Content' }],
});
```

**Lý do sử dụng reset:**
- Clear toàn bộ navigation history
- Tránh user có thể quay lại màn hình đăng nhập
- Đảm bảo navigation state sạch sẽ

### 3. Sửa Wrapper Components

```typescript
// Trước (có lỗi TypeScript)
const LoginScreenWrapper = () => <LoginScreen navigation={{} as any} route={{} as any} />;

// Sau (đúng cách)
const LoginScreenWrapper = (props: any) => <LoginScreen {...props} />;
```

## Kết quả

✅ Không còn lỗi navigation
✅ Đăng nhập thành công sẽ chuyển đến trang chủ
✅ Navigation state được quản lý đúng cách
✅ TypeScript errors được sửa

## Lưu ý

- Khi sử dụng conditional rendering, cần cẩn thận với manual navigation
- `navigation.reset()` là cách tốt nhất để chuyển đổi giữa các navigation stack
- Luôn định nghĩa tất cả screens trong navigator để tránh lỗi "screen not found"
