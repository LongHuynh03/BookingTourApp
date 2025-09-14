import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookingItem {
  tourId: string;
  tourName: string;
  tourImage: string;
  price: number;
  quantity: number;
  selectedDate: string;
  participants: {
    name: string;
    email: string;
    phone: string;
  }[];
}

export interface Booking {
  id: string;
  userId: string;
  tourId: string;
  tourName: string;
  tourImage: string;
  price: number;
  quantity: number;
  totalAmount: number;
  selectedDate: string;
  participants: {
    name: string;
    email: string;
    phone: string;
  }[];
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  bookingDate: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod?: string;
  notes?: string;
}

interface BookingState {
  cart: BookingItem[];
  bookings: Booking[];
  selectedBooking: Booking | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  cart: [],
  bookings: [],
  selectedBooking: null,
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<BookingItem>) => {
      const existingItem = state.cart.find(
        item => item.tourId === action.payload.tourId && 
                item.selectedDate === action.payload.selectedDate
      );
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeFromCart: (state, action: PayloadAction<{ tourId: string; selectedDate: string }>) => {
      state.cart = state.cart.filter(
        item => !(item.tourId === action.payload.tourId && 
                 item.selectedDate === action.payload.selectedDate)
      );
    },
    updateCartItem: (state, action: PayloadAction<{ tourId: string; selectedDate: string; quantity: number }>) => {
      const item = state.cart.find(
        cartItem => cartItem.tourId === action.payload.tourId && 
                   cartItem.selectedDate === action.payload.selectedDate
      );
      
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    fetchBookingsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBookingsSuccess: (state, action: PayloadAction<Booking[]>) => {
      state.loading = false;
      state.bookings = action.payload;
      state.error = null;
    },
    fetchBookingsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createBookingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    createBookingSuccess: (state, action: PayloadAction<Booking>) => {
      state.loading = false;
      state.bookings.push(action.payload);
      state.cart = [];
      state.error = null;
    },
    createBookingFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedBooking: (state, action: PayloadAction<Booking | null>) => {
      state.selectedBooking = action.payload;
    },
    updateBookingStatus: (state, action: PayloadAction<{ bookingId: string; status: Booking['status'] }>) => {
      const booking = state.bookings.find(b => b.id === action.payload.bookingId);
      if (booking) {
        booking.status = action.payload.status;
      }
    },
    updatePaymentStatus: (state, action: PayloadAction<{ bookingId: string; paymentStatus: Booking['paymentStatus'] }>) => {
      const booking = state.bookings.find(b => b.id === action.payload.bookingId);
      if (booking) {
        booking.paymentStatus = action.payload.paymentStatus;
      }
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
  fetchBookingsStart,
  fetchBookingsSuccess,
  fetchBookingsFailure,
  createBookingStart,
  createBookingSuccess,
  createBookingFailure,
  setSelectedBooking,
  updateBookingStatus,
  updatePaymentStatus,
  clearError,
} = bookingSlice.actions;

export default bookingSlice.reducer;
