# Sửa lỗi GO_BACK trong React Navigation

## Lỗi gặp phải

```
ERROR  The action 'GO_BACK' was not handled by any navigator.

Is there any screen to go back to?
```

## Nguyên nhân

Lỗi này xảy ra khi:
1. Gọi `navigation.goBack()` nhưng không có screen nào trong navigation stack để quay lại
2. Screen hiện tại là screen đầu tiên trong stack
3. Navigation stack đã bị reset hoặc clear

## Giải pháp đã áp dụng

### 1. Kiểm tra `canGoBack()` trước khi gọi `goBack()`

```typescript
// Trước (có lỗi)
<Pressable onPress={() => navigation.goBack()}>
  <ArrowLeft size={24} color="#374151" />
</Pressable>

// Sau (an toàn)
{canGoBack && (
  <Pressable onPress={safeGoBack}>
    <ArrowLeft size={24} color="#374151" />
  </Pressable>
)}
```

### 2. Tạo Custom Hook `useSafeNavigation`

```typescript
export const useSafeNavigation = () => {
  const navigation = useNavigation();

  const safeGoBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      console.log('Cannot go back, already at root screen');
    }
  }, [navigation]);

  const safeNavigate = useCallback((screenName: string, params?: any) => {
    try {
      navigation.navigate(screenName as never, params);
    } catch (error) {
      console.error('Navigation error:', error);
    }
  }, [navigation]);

  const safeReset = useCallback((routes: any[]) => {
    try {
      navigation.reset({
        index: 0,
        routes,
      });
    } catch (error) {
      console.error('Navigation reset error:', error);
    }
  }, [navigation]);

  return {
    navigation,
    safeGoBack,
    safeNavigate,
    safeReset,
    canGoBack: navigation.canGoBack(),
  };
};
```

### 3. Sử dụng Safe Navigation trong LoginScreen

```typescript
const { safeGoBack, safeReset, canGoBack } = useSafeNavigation();

// Thay vì navigation.goBack()
onPress={safeGoBack}

// Thay vì navigation.reset()
safeReset([{ name: 'Content' }]);
```

## Lợi ích

✅ **Không còn lỗi GO_BACK**: Kiểm tra `canGoBack()` trước khi gọi
✅ **Error Handling**: Try-catch cho tất cả navigation actions
✅ **Reusable**: Hook có thể sử dụng ở nhiều component
✅ **Type Safe**: TypeScript support đầy đủ
✅ **Debug Friendly**: Console logs để debug

## Cách sử dụng

```typescript
import { useSafeNavigation } from '../hooks';

const MyComponent = () => {
  const { safeGoBack, safeNavigate, safeReset, canGoBack } = useSafeNavigation();

  return (
    <View>
      {canGoBack && (
        <Button onPress={safeGoBack} title="Back" />
      )}
      <Button onPress={() => safeNavigate('Home')} title="Go Home" />
      <Button onPress={() => safeReset([{name: 'Home'}])} title="Reset" />
    </View>
  );
};
```

## Lưu ý

- Luôn kiểm tra `canGoBack()` trước khi hiển thị nút back
- Sử dụng `safeGoBack()` thay vì `navigation.goBack()` trực tiếp
- Wrap navigation actions trong try-catch để tránh crash
- Test navigation flow để đảm bảo không có lỗi
