import {AxiosError, AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import {replaceAll} from '../utils/helper';
import {ParamsNetwork, ResponseBase} from './types';
import {API_CONFIG, QUERY_PARAMS} from '../utils/constant';

const responseDefault: ResponseBase<any> = {
  code: -500,
  isSuccessful: false,
  msg: 'error',
  data: {},
};

export const handlePath = (
  url: string,
  path: {[key: string]: string | number},
) => {
  if (!path || Object.keys(path).length <= 0) {
    return url;
  }
  let resUrl = url;
  Object.keys(path).forEach(k => {
    resUrl = replaceAll(resUrl, `{${k}}`, String(path[k]));
    resUrl = replaceAll(resUrl, `:${k}`, String(path[k]));
  });
  return resUrl;
};

export const handleParameter = <T extends ParamsNetwork>(
  props: T,
  method: Method,
): AxiosRequestConfig => {
  const {url, body, path, params} = props;
  return {
    ...props,
    method,
    url: handlePath(url, path),
    data: body,
    params,
  };
};

export const getQueryParams = (url: string) => {
  const params: any = {};
  let match: any;
  while ((match = QUERY_PARAMS.exec(url))) {
    params[match[1]] = match[2];
  }
  return params;
};

export const statusHandle = (statusCode: number) => {
  return [
    API_CONFIG.CODE_SUCCESS,
    API_CONFIG.CODE_SUCCESS1,
    API_CONFIG.CODE_SUCCESS2,
  ].includes(statusCode);
};

export const handleResponseAxios = <T = any>(
  res: AxiosResponse<any>,
): ResponseBase<T> => {
  if (res.data || res.status) {
    return {
      code: res.status,
      data: res?.data ?? undefined,
      isSuccessful: statusHandle(res.status),
    };
  }
  return responseDefault;
};

export const handleErrorAxios = <T = any>(
  error: AxiosError<any>,
): ResponseBase<T> => {
  let message: string = 'error_default';

  if (error?.response?.status === 500 || error?.response?.status === 502) {
    return {
      code: error?.response?.status,
      data: undefined,
      msg: message,
      isSuccessful: statusHandle(error?.response?.status),
    };
  }

  if (typeof error === 'string') {
    return {
      ...responseDefault,
      msg: error,
    };
  }

  if (error?.response) {
    if (typeof error?.response?.data === 'string') {
      message = error?.response?.data;
    }

    if (typeof error?.response?.data?.message === 'string') {
      message = error?.response?.data?.message;
    }

    if (typeof error?.response?.data?.reason?.message === 'string') {
      message = error?.response?.data?.reason?.message;
    }

    return {
      code: error?.response?.status,
      data: undefined,
      msg: message,
      isSuccessful: statusHandle(error?.response?.status),
    };
  }
  return responseDefault;
};
