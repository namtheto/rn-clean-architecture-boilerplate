import safetyEnv from '@evotek-mobile/safety-env';

export const BASE_URL = `${safetyEnv.getEnv('DOMAIN_API')}`;
export const TOOL_DEBUG_MODE = `${safetyEnv.getEnv('TOOL_DEBUG_MODE')}`;
export const REQUEST_TIMEOUT = 60000;
export const API_PORT = '/api';
export const FONT_FAMILY = 'SFProDisplay';
export const CONTENT_TYPE_DEFAULT = 'application/json';
export const CONTENT_TYPE_FORM_DATA = 'multipart/form-data; charset=utf-8';
export const TOKEN_KEY_HEADER = 'Authorization';
export const CONTENT_TYPE = 'Content-Type';
export const QUERY_PARAMS = /[?&]([^=#]+)=([^&#]*)/g;
export const API_CONFIG = {
  CODE_DEFAULT: -200,
  CODE_SUCCESS: 200,
  CODE_SUCCESS1: 201,
  CODE_SUCCESS2: 202,
  CODE_204: 204,
  ERROR_NETWORK_CODE: -100,
  RESULT_CODE_PUSH_OUT: 401,
  REQUEST_TIMEOUT: 10000,
  STATUS_TIME_OUT: 'ECONNABORTED',
  CODE_TIME_OUT: 408,
};
