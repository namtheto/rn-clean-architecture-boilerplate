import {AxiosRequestConfig} from 'axios';

// TODO: Define types for the API
export interface ResponseBase<T = any> {
  code: number;
  msg?: string | null;
  data?: T;
  isSuccessful: boolean;
}

export interface ParamsNetwork {
  url: string;
  params?: any;
  path?: any;
  body?: any;
  headers?: AxiosRequestConfig['headers'];
}

export type NetWorkResponseType<T> = (
  params: ParamsNetwork,
) => Promise<ResponseBase<T> | null>;

export type ParameterPostFormData = AxiosRequestConfig & ParamsNetwork;
