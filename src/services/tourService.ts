import { getApiUrl } from '@config/index';

const API_BASE_URL = getApiUrl();

export type Province = {
  _id: string;
  name: string;
  image: string;
};

export type LocationItem = {
  _id: string;
  province_id: string;
  name: string;
  image: string;
  description: string;
  is_popular: boolean;
  deleted: boolean;
  __v: number;
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
  locations: LocationItem[];
  __v: number;
};

export type GetAllToursResponse = {
  result: boolean;
  tours: Tour[];
};

export class TourService {
  static async getAllTours(): Promise<Tour[]> {
    const url = `${API_BASE_URL}/tour/getTourHighlight`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: GetAllToursResponse = await response.json();
    if (!data.result) {
      throw new Error('Không thể tải danh sách tour');
    }
    return data.tours || [];
  }

  static async getToursByFilter(keyword: string): Promise<Tour[]> {
    const url = `${API_BASE_URL}/tour/getTourByFilter?keyword=${encodeURIComponent(keyword)}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: { result: boolean; tours: Tour[] } = await response.json();
    if (!data.result) {
      throw new Error('Không thể tìm kiếm tour');
    }
    return data.tours || [];
  }

  static async getTourByIdAndLocations(tour_id: string): Promise<Tour> {
    const url = `${API_BASE_URL}/tour/getTourByIdAndLocations?tour_id=${encodeURIComponent(
      tour_id,
    )}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: { result: boolean; tour: Tour } = await response.json();
    if (!data.result || !data.tour) {
      throw new Error('Không thể tải thông tin tour');
    }
    return data.tour;
  }
}

export default TourService;


