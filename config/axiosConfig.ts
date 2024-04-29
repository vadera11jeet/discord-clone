import axios from "axios";

console.log(process.env.BASE_URL);
const instance = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 403 || error.response.status === 401) {
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default instance;
