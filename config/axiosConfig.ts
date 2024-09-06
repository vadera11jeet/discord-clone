import axios, { AxiosResponse, AxiosError } from "axios";

const instance = axios.create({
  baseURL: process.env.BASE_URL || "http://localhost:5000/v1/",
  withCredentials: true,
});

instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

export default instance;
