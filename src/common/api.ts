import axios from "axios";
import { Auth } from "aws-amplify";
import { AxiosInstance } from "axios/index";
import {
  TOKEN_INVALID_ERROR,
  TOKEN_MISSING_ERROR,
} from "@/constants/global.constants";

export const publicApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const privateApi: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const clearToken = async () => {
  await Auth.signOut();
};

export const getToken = async () => {
  return new Promise((done) => {
    Auth.currentSession()
      .then((session) => {
        done(session.getIdToken().getJwtToken());
      })
      .catch(() => {
        done(null);
      });
  });
};

publicApi.interceptors.request.use(
  async (config) => {
    config.headers.common["Accept-Language"] = i18n?.language ?? "en";
    const token = await getToken();
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

privateApi.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (!token) return Promise.reject(new Error(TOKEN_MISSING_ERROR));

    config.headers.common.Authorization = `Bearer ${token}`;
    config.headers.common["Accept-Language"] = i18n?.language ?? "en";
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);
privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error?.response?.status === 401 ||
      (error?.response?.status === 404 &&
        error?.response?.data?.message === "notfound.user")
    ) {
      await clearToken();
      return Promise.reject(new Error(TOKEN_INVALID_ERROR));
    }

    return Promise.reject(error);
  }
);
