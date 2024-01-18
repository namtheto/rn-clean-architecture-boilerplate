import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import queryString from 'query-string';
import {
  API_PORT,
  BASE_URL,
  CONTENT_TYPE,
  CONTENT_TYPE_FORM_DATA,
  REQUEST_TIMEOUT,
} from '../utils/constant';
import {getItem, StorageKey} from '../storage';
import {getBearerToken} from '../utils/helper';
import {StyleSheet} from 'react-native';
import {ParameterPostFormData, ParamsNetwork, ResponseBase} from './types';
import {handleErrorAxios, handleParameter, handleResponseAxios} from './helper';
import {
  hideLoadingOverlay,
  showGlobalAlert,
  showLoadingOverlay,
} from '../../presentation/components';

export const axiosClient = axios.create({
  timeout: REQUEST_TIMEOUT,
  baseURL: BASE_URL + API_PORT,
  paramsSerializer: params =>
    queryString.stringify(params, {arrayFormat: 'bracket'}),
  withCredentials: true,
});

const accessToken = getItem(StorageKey.ACCESS_TOKEN);
let READY_REFRESH_TOKEN = false;
axios.defaults.headers.common['Cache-Control'] = 'no-cache';
if (accessToken) {
  axiosClient.defaults.headers.common.Authorization =
    getBearerToken(accessToken);
}

/**
 * Sets the default authorization
 * @param {*} newToken
 */
const setAuthorization = (newToken: string) => {
  axiosClient.defaults.headers.common.Authorization = getBearerToken(newToken);
};

const updateHeaderCommon = (key: string, value: any) => {
  axiosClient.defaults.headers.common[key] = value;
};

const removeHeaderCommon = (key: string) => {
  delete axiosClient.defaults.headers.common[key];
};

export const handleRefreshToken = async (config: any) => {
  const refreshToken = getItem(StorageKey.REFRESH_TOKEN);
  if (refreshToken) {
  }
  if (config) {
  }
  if (READY_REFRESH_TOKEN) {
  }
};

axiosClient.interceptors.request.use(
  async config => {
    if (config?.headers?.isGlobalLoading) {
      delete config.headers.isGlobalLoading;
      showLoadingOverlay();
    }
    return config;
  },
  error => {
    hideLoadingOverlay();
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  function (response) {
    hideLoadingOverlay();
    return response;
  },
  function (error) {
    if (error && error.response && error.response.status === 401) {
      return handleRefreshToken(error.response?.config);
    }
    return Promise.reject(error);
  },
);

/**
 * Base Axios request.
 */
const axiosRequest = <T = unknown>(
  config: AxiosRequestConfig,
  isGlobalLoading?: boolean,
  isShowError?: boolean,
) => {
  const defaultConfig: AxiosRequestConfig = {
    headers: {isGlobalLoading},
  };

  return new Promise<ResponseBase<T>>(rs => {
    axiosClient
      .request(StyleSheet.flatten([defaultConfig, config]))
      .then((res: AxiosResponse<T>) => {
        const result = handleResponseAxios(res);
        rs(result);
      })
      .catch((error: AxiosError) => {
        hideLoadingOverlay();
        const result = handleErrorAxios(error);
        isShowError &&
          showGlobalAlert({
            type: 'error',
            msg: result.msg || 'error_default',
          });
        if (result.msg === 'login_session_expired') {
          return;
        }
        rs(result);
      });
  });
};

class networkService {
  // get
  get<T>(params: ParamsNetwork, isGlobalLoading = true, isShowError = true) {
    return axiosRequest<T>(
      handleParameter({...params}, 'GET'),
      isGlobalLoading,
      isShowError,
    );
  }

  // post
  post<T>(params: ParamsNetwork, isGlobalLoading = true, isShowError = true) {
    return axiosRequest<T>(
      handleParameter({...params}, 'POST'),
      isGlobalLoading,
      isShowError,
    );
  }

  // put
  put<T>(params: ParamsNetwork, isGlobalLoading = true, isShowError = true) {
    return axiosRequest<T>(
      handleParameter({...params}, 'PUT'),
      isGlobalLoading,
      isShowError,
    );
  }

  // delete
  delete<T>(params: ParamsNetwork, isGlobalLoading = true, isShowError = true) {
    return axiosRequest<T>(
      handleParameter({...params}, 'DELETE'),
      isGlobalLoading,
      isShowError,
    );
  }

  // post FormData
  postFormData<T>(
    params: ParamsNetwork,
    isGlobalLoading = true,
    isShowError = true,
  ) {
    const headers: AxiosRequestConfig['headers'] = {
      [CONTENT_TYPE]: CONTENT_TYPE_FORM_DATA,
      isGlobalLoading,
    };

    return axiosRequest<T>(
      handleParameter<ParameterPostFormData>({...params, headers}, 'POST'),
      isGlobalLoading,
      isShowError,
    );
  }
}

const NetworkService = new networkService();

export {
  NetworkService,
  setAuthorization,
  removeHeaderCommon,
  updateHeaderCommon,
};

export default axiosClient;
