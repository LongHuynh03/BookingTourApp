# API Configuration Guide

## Vấn đề với Environment Variables

Trong React Native, `process.env` không hoạt động như trong Node.js. Thay vào đó, chúng ta sử dụng file cấu hình tĩnh.

## Cấu hình hiện tại

File cấu hình được lưu trong `src/config/index.ts`:

```typescript
export const ENV_CONFIG = {
  isDevelopment: __DEV__,
  API_URLS: {
    development: 'http://localhost:3000/api',
    production: 'https://your-production-api.com/api',
  },
};
```

## Cách thay đổi API URL

### 1. Cho môi trường Development
Sửa trong `src/config/index.ts`:
```typescript
API_URLS: {
  development: 'http://your-dev-server:port/api', // Thay đổi URL này
  production: 'https://your-production-api.com/api',
},
```

### 2. Cho môi trường Production
Sửa trong `src/config/index.ts`:
```typescript
API_URLS: {
  development: 'http://localhost:3000/api',
  production: 'https://your-actual-api.com/api', // Thay đổi URL này
},
```

## Cách sử dụng

API URL sẽ được tự động chọn dựa trên môi trường:
- `__DEV__ = true` (khi chạy trong development) → sử dụng `development` URL
- `__DEV__ = false` (khi build production) → sử dụng `production` URL

## Lưu ý

- Không cần file `.env` trong React Native
- Tất cả cấu hình được quản lý trong `src/config/index.ts`
- Có thể thêm các biến cấu hình khác vào file này
