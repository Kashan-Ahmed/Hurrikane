import { api } from '@/configs/api-client';
import { getAuthActions } from '@/store/auth-store';

export type TLoginPayload = {
  email: string;
  password: string;
};

export const login = async (payload: TLoginPayload): Promise<void> => {
  const { setTokens } = getAuthActions();

  try {
    // Perform the login request
    const loginResponse = await api.post('/token/', payload);

    if (loginResponse?.status === 200) {
      const tokens = loginResponse?.data;
      setTokens(tokens);
    } else {
      throw new Error(loginResponse?.data?.detail);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error during login:', error?.response?.data?.errors[0]?.detail);
    throw new Error(error?.response?.data?.errors[0]?.detail || 'Login Failed, Try again later!');
  }
};

export const getUserProfile = async (): Promise<TUser> => {
  const response = await api.get(`/profile/`);
  return response.data;
};
