# Hướng dẫn Login Full View

## Cách hoạt động

### 1. **Navigation Structure:**
```
MainNavigation
├── Splash
├── Auth (Login/Register stack)
├── Content (MainBottomTabNavigator)
│   ├── Main (Home)
│   ├── Search
│   └── LoginTab (navigate to Login full screen)
├── Login (Full screen modal) ← NEW
└── Register (Full screen modal) ← NEW
```

### 2. **Login Full View Flow:**
1. **User chưa đăng nhập** → Thấy tab "Đăng nhập" trong bottom nav
2. **Nhấn tab "Đăng nhập"** → `LoginTabWrapper` component được render
3. **LoginTabWrapper** → Tự động navigate đến `Login` screen full view
4. **Login screen** → Hiển thị full view (không có bottom nav)
5. **Đăng nhập thành công** → Navigate về `Content` (main app)
6. **Đóng Login** → Có thể swipe down hoặc nhấn nút back

## Tính năng

### 1. **Full Screen Modal:**
```typescript
<Stack.Screen 
    name="Login" 
    component={LoginScreenWrapper} 
    options={{
        presentation: 'modal', // Full screen modal
        gestureEnabled: true, // Allow swipe to dismiss
    }}
/>
```

### 2. **LoginTabWrapper Component:**
```typescript
const LoginTabWrapper = (props: any) => {
  const { navigation } = props;
  
  React.useEffect(() => {
    // Navigate to Login full screen when this tab is pressed
    navigation.navigate('Login');
  }, [navigation]);
  
  return null; // This component doesn't render anything
};
```

### 3. **Smart Back Button:**
```typescript
<Pressable 
  onPress={() => {
    if (canGoBack) {
      safeGoBack();
    } else {
      // If can't go back, navigate to Content (main app)
      safeNavigate('Content');
    }
  }}
  className="p-2 -ml-2"
>
  <ArrowLeft size={24} color="#374151" />
</Pressable>
```

## Lợi ích

### 1. **Better UX:**
- ✅ **Full screen**: Không bị che bởi bottom navbar
- ✅ **Modal presentation**: Cảm giác như popup/modal
- ✅ **Swipe to dismiss**: Có thể vuốt xuống để đóng
- ✅ **Smart navigation**: Back button hoạt động thông minh

### 2. **Consistent Design:**
- ✅ **Same Login screen**: Sử dụng cùng component
- ✅ **No duplication**: Không cần tạo Login screen mới
- ✅ **Reusable**: Có thể sử dụng cho Register screen

### 3. **User Flow:**
- ✅ **Clear entry point**: Tab "Đăng nhập" rõ ràng
- ✅ **Easy exit**: Nhiều cách để đóng (back button, swipe)
- ✅ **Seamless transition**: Chuyển đổi mượt mà

## Cách sử dụng

### 1. **Từ Bottom Tab:**
- Nhấn tab "Đăng nhập" → Tự động mở Login full view

### 2. **Từ Code:**
```typescript
// Navigate to Login full screen
navigation.navigate('Login');

// Navigate to Register full screen
navigation.navigate('Register');
```

### 3. **Đóng Login:**
- **Swipe down**: Vuốt xuống để đóng
- **Back button**: Nhấn nút back arrow
- **Programmatic**: `navigation.goBack()` hoặc `navigation.navigate('Content')`

## Kết quả

- 🎯 **Login full view**: Không bị che bởi bottom navbar
- 🎯 **Modal presentation**: Cảm giác như popup
- 🎯 **Swipe to dismiss**: Có thể vuốt để đóng
- 🎯 **Smart navigation**: Back button hoạt động thông minh
- 🎯 **Consistent UX**: Trải nghiệm nhất quán
