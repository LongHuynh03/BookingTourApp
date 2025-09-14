import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../services/authService';
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart } from './authSlice';

// Helper function to transform API response to User format
const transformUserFromAPI = (apiUser: any) => ({
  _id: apiUser._id,
  username: apiUser.username,
  phone_number: apiUser.phone_number,
  name: apiUser.name,
  email: apiUser.email,
  created_at: apiUser.created_at,
  __v: apiUser.__v,
});

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginRequest, { dispatch }) => {
    try {
      dispatch(loginStart());
      const response: LoginResponse = await AuthService.login(credentials);
      
      if (response.result) {
        const user = transformUserFromAPI(response.account);
        const token = 'jwt-token'; // You might want to get this from response if available
        dispatch(loginSuccess({ user, token }));
        return { user, token };
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch(loginFailure(errorMessage));
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: RegisterRequest, { dispatch }) => {
    try {
      dispatch(registerStart());
      const response: RegisterResponse = await AuthService.register(userData);
      
      if (response.result) {
        const user = transformUserFromAPI(response.account);
        const token = 'jwt-token'; // You might want to get this from response if available
        dispatch(loginSuccess({ user, token })); // Use loginSuccess since registration also logs in the user
        return { user, token };
      } else {
        throw new Error(response.message || 'Registration failed');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch(registerFailure(errorMessage));
      throw error;
    }
  }
);
