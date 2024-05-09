import { appStore } from "@/stores/app";
import { AxiosHeaders, type InternalAxiosRequestConfig } from "axios";
import { getCookie } from "../../../utils/useful-functions.ts/getCookie";

export function requestHandler(config: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig<any> | Promise<InternalAxiosRequestConfig<any>> {
  const token = appStore().jwt || getCookie();

  if (token) {
    if (!config.headers) config.headers = new AxiosHeaders();

    (config.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
  }

  return config;
}