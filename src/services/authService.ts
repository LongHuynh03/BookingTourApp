import { getApiUrl } from "@config/index";

// API Response Types
export interface LoginResponse {
  result: boolean;
  message: string;
  account: {
    _id: string;
    username: string;
    phone_number: string;
    name: string;
    email: string;
    created_at: string;
    __v: number;
  };
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  email: string;
  name: string;
  phone_number: string;
}

export interface RegisterResponse {
  result: boolean;
  message: string;
  account: {
    _id: string;
    username: string;
    phone_number: string;
    name: string;
    email: string;
    created_at: string;
    __v: number;
  };
}

// API Base URL
const API_BASE_URL = getApiUrl();

// Auth Service
export class AuthService {
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
      'Content-Type': 'application/json',
    };

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Login method
  static async login(credentials: LoginRequest): Promise<LoginResponse> {
    return this.makeRequest<LoginResponse>('/account/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  // Register method
  static async register(userData: RegisterRequest): Promise<RegisterResponse> {
    return this.makeRequest<RegisterResponse>('/account/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Logout method (for future use)
  static async logout(): Promise<void> {
    // Implementation for logout if needed
    console.log('Logout called');
  }
}

export default AuthService;
