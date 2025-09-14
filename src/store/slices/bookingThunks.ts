import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    Booking, BookingItem,
    createBookingFailure,
    createBookingStart,
    createBookingSuccess,
    fetchBookingsFailure,
    fetchBookingsStart,
    fetchBookingsSuccess
} from './bookingSlice';

// Mock API functions - replace with your actual API calls
const bookingAPI = {
  getBookings: async (userId: string): Promise<Booking[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data - replace with actual API call
    return [
      {
        id: '1',
        userId,
        tourId: '1',
        tourName: 'Halong Bay Cruise',
        tourImage: 'https://via.placeholder.com/400x300',
        price: 150,
        quantity: 2,
        totalAmount: 300,
        selectedDate: '2024-01-15',
        participants: [
          { name: 'John Doe', email: 'john@example.com', phone: '+1234567890' },
          { name: 'Jane Doe', email: 'jane@example.com', phone: '+1234567891' }
        ],
        status: 'confirmed',
        bookingDate: '2024-01-10',
        paymentStatus: 'paid',
        paymentMethod: 'credit_card',
        notes: 'Vegetarian meals requested'
      }
    ];
  },
  
  createBooking: async (bookingData: {
    userId: string;
    cartItems: BookingItem[];
    paymentMethod: string;
    notes?: string;
  }): Promise<Booking> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock response - replace with actual API call
    const booking: Booking = {
      id: Date.now().toString(),
      userId: bookingData.userId,
      tourId: bookingData.cartItems[0].tourId,
      tourName: bookingData.cartItems[0].tourName,
      tourImage: bookingData.cartItems[0].tourImage,
      price: bookingData.cartItems[0].price,
      quantity: bookingData.cartItems[0].quantity,
      totalAmount: bookingData.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0),
      selectedDate: bookingData.cartItems[0].selectedDate,
      participants: bookingData.cartItems[0].participants,
      status: 'pending',
      bookingDate: new Date().toISOString(),
      paymentStatus: 'pending',
      paymentMethod: bookingData.paymentMethod,
      notes: bookingData.notes
    };
    
    return booking;
  }
};

export const fetchBookings = createAsyncThunk(
  'booking/fetchBookings',
  async (userId: string, { dispatch }) => {
    try {
      dispatch(fetchBookingsStart());
      const bookings = await bookingAPI.getBookings(userId);
      dispatch(fetchBookingsSuccess(bookings));
      return bookings;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch bookings';
      dispatch(fetchBookingsFailure(errorMessage));
      throw error;
    }
  }
);

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async (bookingData: {
    userId: string;
    cartItems: BookingItem[];
    paymentMethod: string;
    notes?: string;
  }, { dispatch }) => {
    try {
      dispatch(createBookingStart());
      const booking = await bookingAPI.createBooking(bookingData);
      dispatch(createBookingSuccess(booking));
      return booking;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create booking';
      dispatch(createBookingFailure(errorMessage));
      throw error;
    }
  }
);
