import axios, { AxiosInstance, type AxiosResponse } from "axios";
import { requestHandler } from "./handler/request.handler";
import { responseErrorHandler } from "./handler/response-error.handler";

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
  timeout: 60000,
  transformResponse: [
    data => data ? JSON.parse(data) : data,
  ],
});

api.interceptors.request.use(requestHandler);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  responseErrorHandler,
);

export default api;