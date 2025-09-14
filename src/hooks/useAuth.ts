import { LoginRequest, RegisterRequest } from '../services/authService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearError, logout } from '../store/slices/authSlice';
import { loginUser, registerUser } from '../store/slices/authThunks';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const authState = useAppSelector(state => state.auth);

  const login = async (credentials: LoginRequest) => {
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Đăng nhập thất bại' 
      };
    }
  };

  const register = async (userData: RegisterRequest) => {
    try {
      const result = await dispatch(registerUser(userData)).unwrap();
      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Đăng ký thất bại' 
      };
    }
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    // State
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    token: authState.token,
    loading: authState.loading,
    error: authState.error,
    
    // Actions
    login,
    register,
    logout: logoutUser,
    clearError: clearAuthError,
    
    // Computed values
    isLoggedIn: authState.isAuthenticated && !!authState.user,
    userName: authState.user?.name || '',
    userEmail: authState.user?.email || '',
    userPhone: authState.user?.phone_number || '',
  };
};
