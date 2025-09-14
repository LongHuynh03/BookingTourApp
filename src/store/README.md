# Redux Toolkit Setup Guide

## Cấu trúc Store

```
src/store/
├── index.ts              # Store configuration
├── hooks.ts              # Typed hooks
├── slices/
│   ├── index.ts          # Export all slices
│   ├── authSlice.ts      # Authentication state
│   ├── authThunks.ts     # Auth async actions
│   ├── tourSlice.ts      # Tour management state
│   ├── tourThunks.ts     # Tour async actions
│   ├── bookingSlice.ts   # Booking state
│   ├── bookingThunks.ts  # Booking async actions
│   └── userSlice.ts      # User profile state
└── README.md             # This file
```

## Cách sử dụng trong Components

### 1. Import hooks và actions

```typescript
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loginUser, logout } from '@store/slices';
```

### 2. Sử dụng trong component

```typescript
import React from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loginUser, logout, clearError } from '@store/slices';

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, loading, error } = useAppSelector(state => state.auth);

  const handleLogin = async (credentials: { email: string; password: string }) => {
    try {
      await dispatch(loginUser(credentials)).unwrap();
      // Login successful
    } catch (error) {
      // Handle error
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    // Your component JSX
  );
};
```

### 3. Sử dụng async thunks

```typescript
import { fetchTours, searchTours } from '@store/slices';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const { tours, featuredTours, loading } = useAppSelector(state => state.tour);

  useEffect(() => {
    // Fetch tours on component mount
    dispatch(fetchTours());
    dispatch(fetchFeaturedTours());
  }, [dispatch]);

  const handleSearch = (query: string) => {
    dispatch(searchTours({ query }));
  };

  return (
    // Your component JSX
  );
};
```

### 4. Sử dụng booking cart

```typescript
import { addToCart, removeFromCart, createBooking } from '@store/slices';

const TourDetailScreen = () => {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector(state => state.booking);

  const handleAddToCart = (tour: Tour) => {
    const bookingItem = {
      tourId: tour.id,
      tourName: tour.name,
      tourImage: tour.images[0],
      price: tour.price,
      quantity: 1,
      selectedDate: '2024-01-15',
      participants: [{ name: '', email: '', phone: '' }]
    };
    
    dispatch(addToCart(bookingItem));
  };

  const handleCheckout = async () => {
    const userId = 'current-user-id';
    const paymentMethod = 'credit_card';
    
    try {
      await dispatch(createBooking({
        userId,
        cartItems: cart,
        paymentMethod,
        notes: 'Special requests'
      })).unwrap();
      
      // Booking successful
    } catch (error) {
      // Handle error
    }
  };

  return (
    // Your component JSX
  );
};
```

## State Structure

### Auth State
```typescript
{
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
```

### Tour State
```typescript
{
  tours: Tour[];
  featuredTours: Tour[];
  searchResults: Tour[];
  selectedTour: Tour | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  filters: {
    category: string;
    priceRange: [number, number];
    difficulty: string;
    duration: string;
  };
}
```

### Booking State
```typescript
{
  cart: BookingItem[];
  bookings: Booking[];
  selectedBooking: Booking | null;
  loading: boolean;
  error: string | null;
}
```

### User State
```typescript
{
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}
```

## Lưu ý

1. **Thay thế Mock API**: Các file `*Thunks.ts` hiện đang sử dụng mock data. Hãy thay thế bằng API calls thực tế.

2. **Error Handling**: Luôn wrap async thunks trong try-catch để xử lý lỗi.

3. **Loading States**: Sử dụng loading states để hiển thị spinner hoặc loading indicators.

4. **Type Safety**: Sử dụng `useAppDispatch` và `useAppSelector` thay vì hooks mặc định để có type safety.

5. **Persistence**: Có thể thêm Redux Persist để lưu state vào storage nếu cần.
