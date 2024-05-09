import type { ServerError } from "@/utils/interfaces/server-error.interface";
import type { AxiosError } from "axios";

export function responseErrorHandler(error: AxiosError<any>) {
  return Promise.reject({
    statusCode: error?.response?.data?.statusCode || error?.response?.status || error?.code || 500,
    message: error?.response?.data?.message || error?.response?.statusText || error?.message || 'Erro interno do servidor',
  } as ServerError);
}