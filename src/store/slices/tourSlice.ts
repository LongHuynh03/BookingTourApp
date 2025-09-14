import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Tour {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  location: string;
  images: string[];
  rating: number;
  reviewCount: number;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  maxParticipants: number;
  availableDates: string[];
  highlights: string[];
  included: string[];
  excluded: string[];
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
  }[];
}

interface TourState {
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

const initialState: TourState = {
  tours: [],
  featuredTours: [],
  searchResults: [],
  selectedTour: null,
  loading: false,
  error: null,
  searchQuery: '',
  filters: {
    category: '',
    priceRange: [0, 10000],
    difficulty: '',
    duration: '',
  },
};

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    fetchToursStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchToursSuccess: (state, action: PayloadAction<Tour[]>) => {
      state.loading = false;
      state.tours = action.payload;
      state.error = null;
    },
    fetchToursFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchFeaturedToursStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFeaturedToursSuccess: (state, action: PayloadAction<Tour[]>) => {
      state.loading = false;
      state.featuredTours = action.payload;
      state.error = null;
    },
    fetchFeaturedToursFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSelectedTour: (state, action: PayloadAction<Tour | null>) => {
      state.selectedTour = action.payload;
    },
    searchToursStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    searchToursSuccess: (state, action: PayloadAction<Tour[]>) => {
      state.loading = false;
      state.searchResults = action.payload;
      state.error = null;
    },
    searchToursFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<TourState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.searchQuery = '';
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchToursStart,
  fetchToursSuccess,
  fetchToursFailure,
  fetchFeaturedToursStart,
  fetchFeaturedToursSuccess,
  fetchFeaturedToursFailure,
  setSelectedTour,
  searchToursStart,
  searchToursSuccess,
  searchToursFailure,
  setSearchQuery,
  setFilters,
  clearSearchResults,
  clearError,
} = tourSlice.actions;

export default tourSlice.reducer;
