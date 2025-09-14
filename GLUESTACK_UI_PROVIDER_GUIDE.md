# Hướng dẫn GluestackUIProvider

## Cách hoạt động

### 1. **Vị trí trong App Structure:**
```typescript
<Provider store={store}>
  <PersistGate loading={...} persistor={persistor}>
    <NavigationContainer>
      <GluestackUIProvider mode="light">  // ← Chỉ hiển thị 1 lần
        <MainNavigation />
      </GluestackUIProvider>
    </NavigationContainer>
  </PersistGate>
</Provider>
```

### 2. **Tính năng:**
- ✅ **Hiển thị 1 lần duy nhất**: Wrap toàn bộ app, không lặp lại
- ✅ **Bất kể authentication state**: Luôn hiển thị cho tất cả screens
- ✅ **Theme support**: Light/Dark mode
- ✅ **Toast & Overlay support**: Cung cấp context cho toast và overlay
- ✅ **Color scheme**: Tự động quản lý color scheme

### 3. **Props:**
```typescript
<GluestackUIProvider 
  mode="light"  // 'light' | 'dark' | 'system'
  style={{}}    // Custom styles
>
  {children}
</GluestackUIProvider>
```

## Lợi ích

### 1. **Consistent UI:**
- Tất cả components sử dụng cùng theme
- Color scheme được quản lý tập trung
- Toast và overlay hoạt động ở mọi nơi

### 2. **Performance:**
- Chỉ render 1 lần duy nhất
- Không re-render khi navigation
- Không re-render khi authentication state thay đổi

### 3. **Developer Experience:**
- Dễ dàng thay đổi theme toàn app
- Toast và overlay có sẵn ở mọi component
- TypeScript support đầy đủ

## Cách sử dụng trong Components

### 1. **Toast:**
```typescript
import { useToast } from '@gluestack-ui/core/toast';

const MyComponent = () => {
  const toast = useToast();
  
  const showToast = () => {
    toast.show({
      title: "Success",
      description: "Operation completed successfully"
    });
  };
};
```

### 2. **Overlay:**
```typescript
import { useOverlay } from '@gluestack-ui/core/overlay';

const MyComponent = () => {
  const overlay = useOverlay();
  
  const showOverlay = () => {
    overlay.show({
      component: <MyModal />
    });
  };
};
```

### 3. **Theme:**
```typescript
import { useColorScheme } from 'nativewind';

const MyComponent = () => {
  const { colorScheme } = useColorScheme();
  
  return (
    <View className={`bg-${colorScheme === 'dark' ? 'gray-800' : 'white'}`}>
      {/* Content */}
    </View>
  );
};
```

## Cấu trúc File

```
src/lib/ui/gluestack-ui-provider/
├── index.tsx          # Main provider component
├── config.ts          # Theme configuration
├── index.next15.tsx   # Next.js 15 support
├── index.web.tsx      # Web support
└── script.ts          # Additional scripts
```

## Lưu ý

- ✅ **Không cần wrap lại**: Đã wrap ở App.tsx
- ✅ **Hoạt động với Redux**: Không conflict với Redux state
- ✅ **Hoạt động với Navigation**: Không conflict với React Navigation
- ✅ **Persist support**: Hoạt động với Redux Persist
- ✅ **TypeScript**: Full type support

## Kết quả

- 🎯 GluestackUIProvider hiển thị 1 lần duy nhất
- 🎯 Bất kể đăng nhập hay chưa đều có UI provider
- 🎯 Không lặp lại liên tục
- 🎯 Cung cấp theme, toast, overlay cho toàn app
