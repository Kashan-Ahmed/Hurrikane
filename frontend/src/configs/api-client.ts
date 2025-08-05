import Axios, { InternalAxiosRequestConfig, AxiosError } from 'axios';
import { getAccessTokens, getAuthActions } from '@/store/auth-store';
import { BASE_URL } from './index';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = '*/*';
    const tokens = getAccessTokens();
    const accessToken = tokens?.access;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  config.withCredentials = false;
  return config;
}

export const api = Axios.create({
  baseURL: BASE_URL,
});

// FETCH REFRESH TOKEN
// async function getRefreshToken() {
//   // eslint-disable-next-line no-useless-catch
//   try {
//     const tokens = getAccessTokens();
//     const refreshToken = tokens?.refresh;
//     const url = `${BASE_URL}/accounts/token/refresh/`;
//     const response = await Axios.post(url, {
//       refresh: refreshToken,
//     });
//     return response?.data?.access;
//   } catch (err) {
//     throw err;
//   }
// }

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const originalRequest = error.config;
    // const message = error.response?.data?.message || error.message;

    // if (error?.response?.status === 403 && !originalRequest._retry) {
    //   originalRequest._retry = true; // Avoid retrying the request indefinitely

    //   try {
    //     const accessToken = await getRefreshToken(); // Getting new access token

    //     if (accessToken) {
    //       const { setAccessToken } = getAuthActions();
    //       setAccessToken(accessToken); // Saving token into store

    //       // Update the Authorization header with the new access token
    //       originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

    //       // Retry the original request with the new access token
    //       return api(originalRequest);
    //     }
    //   } catch (error) {
    //     const { clearAuthData } = getAuthActions();
    //     clearAuthData();
    //     window.location.href = '/';
    //     return Promise.reject(error);
    //   }
    // }
    if (error.response?.status === 401 && !error.config.url.includes('token')) {
      const { clearAuthData } = getAuthActions();
      clearAuthData();
      window.location.href = '/';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export const handleAxiosError = (error: unknown, defaultMessage: string): string => {
  if (Axios.isAxiosError(error)) {
    // Customize this based on the structure of your error responses
    const axiosError = error as AxiosError<{ old_password?: string[] }>;
    return axiosError.response?.data?.old_password?.[0] || defaultMessage;
  }
  return defaultMessage;
};
