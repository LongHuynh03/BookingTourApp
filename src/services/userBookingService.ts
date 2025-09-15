import { getApiUrl } from '@config/index';

const API_BASE_URL = getApiUrl();

export type Province = {
  _id: string;
  name: string;
  image: string;
};

export type Tour = {
  _id: string;
  province_id: Province;
  name: string;
  description: string;
  available_seats: number;
  image: string;
  price: number;
  departure_date: string;
  departure_location: string;
  end_date: string;
  status: boolean;
  created_at: string;
  is_popular: boolean;
  schedules: string[];
  locations: string[];
  __v: number;
};

export type BookingTourItem = {
  _id: string;
  user_id: string;
  tour_id: Tour;
  discount: number;
  created_at: string;
  adult_count: number;
  child_count: number;
  price: number;
  note: string;
  role: boolean;
  location_custom: string[];
  __v: number;
};

export type BookingTourResponse = {
  result: boolean;
  bookingTours: BookingTourItem[];
};

export class BookingService {
  static async getAllByUser(userId: string, token?: string): Promise<BookingTourItem[]> {
    const url = `${API_BASE_URL}/bookingtour/getAllBookingToursByUser?user_id=${encodeURIComponent(userId)}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: BookingTourResponse = await response.json();
    if (!data.result) {
      throw new Error('Không thể tải danh sách đơn đặt tour');
    }
    return data.bookingTours || [];
  }

  static async addNewBookingTour(payload: {
    user_id: string;
    tour_id: string;
    discount: number;
    adult_count: number;
    child_count: number;
    price: number;
    note: string;
    role: boolean;
    location_custom: { _id: string; name: string }[];
  }, token?: string): Promise<{ result: boolean; message: string; bookingTour: BookingTourItem }>{
    const url = `${API_BASE_URL}/bookingtour/addNewBookingTour`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: { result: boolean; message: string; bookingTour: BookingTourItem } = await response.json();
    if (!data.result) {
      throw new Error('Đặt tour thất bại');
    }
    return data;
  }
}

export default BookingService;


