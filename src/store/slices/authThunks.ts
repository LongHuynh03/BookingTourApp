import { createAsyncThunk } from '@reduxjs/toolkit';
import { AuthService, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../../services/authService';
import { UpdateProfileRequest, UpdateProfileResponse, UserService } from '../../services/userService';
import { loginFailure, loginStart, loginSuccess, registerFailure, registerStart, updateProfile as updateProfileAction } from './authSlice';

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
        const token = response.token;
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
        const token = response.token;
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

export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (
    { token, payload }: { token: string; payload: UpdateProfileRequest },
    { dispatch }
  ) => {
    const response: UpdateProfileResponse = await UserService.updateProfile(token, payload);
    if (!response.result || !response.account) {
      throw new Error(response.message || 'Cập nhật hồ sơ thất bại');
    }
    const user = {
      _id: response.account._id,
      username: response.account.username,
      phone_number: response.account.phone_number,
      name: response.account.name,
      email: response.account.email,
      created_at: response.account.created_at,
      __v: response.account.__v,
    };
    dispatch(updateProfileAction(user));
    return user;
  }
);
