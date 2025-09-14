import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    fetchFeaturedToursFailure,
    fetchFeaturedToursStart,
    fetchFeaturedToursSuccess,
    fetchToursFailure,
    fetchToursStart,
    fetchToursSuccess,
    searchToursFailure,
    searchToursStart,
    searchToursSuccess,
    Tour
} from './tourSlice';

// Mock API functions - replace with your actual API calls
const tourAPI = {
  getTours: async (): Promise<Tour[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data - replace with actual API call
    return [
      {
        id: '1',
        name: 'Halong Bay Cruise',
        description: 'Experience the beauty of Halong Bay with our luxury cruise',
        price: 150,
        duration: '2 days 1 night',
        location: 'Halong Bay, Vietnam',
        images: ['https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'],
        rating: 4.8,
        reviewCount: 120,
        category: 'Adventure',
        difficulty: 'Easy',
        maxParticipants: 20,
        availableDates: ['2024-01-15', '2024-01-20', '2024-01-25'],
        highlights: ['Luxury cruise', 'Kayaking', 'Cave exploration'],
        included: ['Meals', 'Accommodation', 'Guide'],
        excluded: ['Personal expenses', 'Tips'],
        itinerary: [
          {
            day: 1,
            title: 'Arrival and Cruise',
            description: 'Board the cruise and explore the bay',
            activities: ['Welcome lunch', 'Kayaking', 'Sunset party']
          }
        ]
      },
      {
        id: '2',
        name: 'Sapa Trekking Adventure',
        description: 'Trek through the beautiful terraced rice fields of Sapa',
        price: 80,
        duration: '3 days 2 nights',
        location: 'Sapa, Vietnam',
        images: ['https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'],
        rating: 4.6,
        reviewCount: 89,
        category: 'Trekking',
        difficulty: 'Medium',
        maxParticipants: 15,
        availableDates: ['2024-01-18', '2024-01-22', '2024-01-28'],
        highlights: ['Rice terraces', 'Local villages', 'Mountain views'],
        included: ['Meals', 'Accommodation', 'Guide', 'Transportation'],
        excluded: ['Personal expenses', 'Tips'],
        itinerary: [
          {
            day: 1,
            title: 'Arrival in Sapa',
            description: 'Arrive in Sapa and start trekking',
            activities: ['Village visit', 'Local lunch', 'Trekking']
          }
        ]
      }
    ];
  },
  
  getFeaturedTours: async (): Promise<Tour[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock featured tours - replace with actual API call
    const allTours = await tourAPI.getTours();
    return allTours.slice(0, 3); // Return first 3 as featured
  },
  
  searchTours: async (query: string, filters?: any): Promise<Tour[]> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock search - replace with actual API call
    const allTours = await tourAPI.getTours();
    return allTours.filter(tour => 
      tour.name.toLowerCase().includes(query.toLowerCase()) ||
      tour.description.toLowerCase().includes(query.toLowerCase()) ||
      tour.location.toLowerCase().includes(query.toLowerCase())
    );
  }
};

export const fetchTours = createAsyncThunk(
  'tour/fetchTours',
  async (_, { dispatch }) => {
    try {
      dispatch(fetchToursStart());
      const tours = await tourAPI.getTours();
      dispatch(fetchToursSuccess(tours));
      return tours;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch tours';
      dispatch(fetchToursFailure(errorMessage));
      throw error;
    }
  }
);

export const fetchFeaturedTours = createAsyncThunk(
  'tour/fetchFeaturedTours',
  async (_, { dispatch }) => {
    try {
      dispatch(fetchFeaturedToursStart());
      const tours = await tourAPI.getFeaturedTours();
      dispatch(fetchFeaturedToursSuccess(tours));
      return tours;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch featured tours';
      dispatch(fetchFeaturedToursFailure(errorMessage));
      throw error;
    }
  }
);

export const searchTours = createAsyncThunk(
  'tour/searchTours',
  async ({ query, filters }: { query: string; filters?: any }, { dispatch }) => {
    try {
      dispatch(searchToursStart());
      const tours = await tourAPI.searchTours(query, filters);
      dispatch(searchToursSuccess(tours));
      return tours;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Search failed';
      dispatch(searchToursFailure(errorMessage));
      throw error;
    }
  }
);
