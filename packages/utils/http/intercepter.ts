import type { AxiosRequestHeaders, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import type { Interceptor } from './axios';

type RequestConfig<D = any> = {
  requestTime: string;
  startTime: number;
  retryUrl?: string;
  retried?: boolean;
  headers: AxiosRequestHeaders & { Authorization?: `Bearer ${string}` };
} & AxiosRequestConfig<D>;

interface RequestError<T = any, D = any> extends AxiosError<T, D> {
  config: RequestConfig<D>;
}

const reqInterceptor: Interceptor = {
  type: 'request',
  fulfilled: async (config: RequestConfig) => {
    config.requestTime = new Date().toString();
    config.startTime = performance.now();
    return config;
  },
  rejected: (error: AxiosError) => Promise.reject(error),
};

const resInterceptor: Interceptor = {
  type: 'response',
  fulfilled: (res: AxiosResponse) => {
    return Promise.resolve(res.data);
  },
  rejected: async (error: RequestError) => {
    return Promise.reject(error);
  },
};

export const interceptors = [reqInterceptor, resInterceptor];
