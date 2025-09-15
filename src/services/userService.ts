import { getApiUrl } from '@config/index';

const API_BASE_URL = getApiUrl();

export type UpdateProfileRequest = {
  name: string;
  phone_number: string;
};

export type UpdateProfileResponse = {
  result: boolean;
  message?: string;
  account?: {
    _id: string;
    username: string;
    phone_number: string;
    name: string;
    email: string;
    created_at: string;
    __v: number;
  };
};

export class UserService {
  static async updateProfile(
    token: string,
    payload: UpdateProfileRequest
  ): Promise<UpdateProfileResponse> {
    const url = `${API_BASE_URL}/account/updateAccount`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    console.log(token, payload);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export default UserService;


