import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from 'axios';

import axios from 'axios';

const METHODS = ['get', 'post', 'delete', 'put', 'patch', 'options'];

type IOKeys = 'get' | 'post' | 'delete' | 'put' | 'patch' | 'options';
type AxiosIOMethods = Pick<AxiosInstance, IOKeys>;

interface BasicResponse<T = any> extends AxiosResponse<T> {
  errcode: number;
  errmsg: string;
  msg?: string;
  message?: string;
}

export interface InterceptorPair<T> {
  type: 'request' | 'response';
  fulfilled?: (value: T) => T | Promise<T>;
  rejected?: (error: unknown) => Promise<never>;
}

export type Interceptor = InterceptorPair<AxiosRequestConfig> | InterceptorPair<AxiosResponse>;

interface Handler {
  request: InterceptorPair<AxiosRequestConfig>[];
  response: InterceptorPair<AxiosResponse>[];
}

type IOMethod = <T, R = BasicResponse<T>>(url: string, config?: AxiosRequestConfig) => Promise<R>;
type IOMethodWithData = <T, R = BasicResponse<T>>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => Promise<R>;

type AxiosOpts = { interceptors: Interceptor[] } & AxiosRequestConfig;

export class Axios {
  private axios: AxiosInstance = axios.create();

  private handler: Handler = { request: [], response: [] };

  public get!: IOMethod;
  public delete!: IOMethod;
  public options!: IOMethod;
  public put!: IOMethodWithData;
  public post!: IOMethodWithData;
  public patch!: IOMethodWithData;

  constructor(options?: AxiosOpts) {
    options?.interceptors.forEach((interceptor) => this.addInterceptor(interceptor));
    this.setOptions(options);
    this.register();
  }

  setOptions(options?: AxiosRequestConfig) {
    this.axios = axios.create(options);
    this.setInterceptors();
  }

  register() {
    (METHODS as (keyof AxiosIOMethods)[]).forEach((method) => {
      this[method] = this.axios[method];
    });
  }

  setHeader(headers: unknown) {
    Object.assign(this.axios.defaults.headers, headers);
  }

  setInterceptors() {
    this.handler.request.forEach((pair) => {
      this.axios.interceptors.request.use(pair.fulfilled, pair.rejected);
    });
    this.handler.response.forEach((pair) => {
      this.axios.interceptors.response.use(pair.fulfilled, pair.rejected);
    });
  }

  addInterceptor(interceptor: Interceptor) {
    if (isRequest(interceptor)) this.handler.request.push(interceptor);
    if (isResponse(interceptor)) this.handler.response.push(interceptor);
  }

  clearInterceptor() {
    this.handler = { request: [], response: [] };
  }

  // rmInterceptor() {}
}

function isRequest(interceptor: Interceptor): interceptor is InterceptorPair<AxiosRequestConfig> {
  return interceptor.type === 'request';
}

function isResponse(interceptor: Interceptor): interceptor is InterceptorPair<AxiosResponse> {
  return interceptor.type === 'response';
}
