import {MMKV, MMKVConfiguration} from 'react-native-mmkv';
import {Storage} from 'redux-persist';
import {ValueType} from './storageType';

export enum StorageKey {
  ACCESS_TOKEN = '@access_token',
  REFRESH_TOKEN = '@refresh_token',
  ACCEPT_BIOMETRIC = '@accept_biometric',
  DEVICE_TOKEN = '@device_token',
}

const config: MMKVConfiguration = {
  id: 'mmkv.default',
};

const storage = new MMKV(config);

export const getItem = (key: string): string | null =>
  storage.getString(key) || null;

export const getItems = (...keys: string[]) => keys.map(getItem);

export const setItem = (key: string, value: ValueType) => {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  ) {
    return storage.set(key, value.toString());
  }

  return storage.set(key, JSON.stringify(value));
};

export const setItems = (
  ...args: {
    key: string;
    value: ValueType;
  }[]
) => args.forEach(({key, value}) => setItem(key, value));

export const removeItem = (key: string) => storage.delete(key);

export const removeItems = (...keys: string[]) => keys.forEach(removeItem);

export const reduxStorage: Storage = {
  getItem: (key: string) => {
    const value = getItem(key);
    return Promise.resolve(value);
  },
  setItem: function (key: string, value: ValueType) {
    setItem(key, value);
    return Promise.resolve(true);
  },
  removeItem: function (key: string) {
    removeItem(key);
    return Promise.resolve();
  },
};

export default storage;
