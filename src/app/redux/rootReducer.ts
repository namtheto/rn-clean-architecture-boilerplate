import {combineReducers} from '@reduxjs/toolkit';
import appSlice from './appSlice';
import storeListSlice from '../../presentation/features/storeList/store/storeListSlice';

export const rootReducer = combineReducers({
  app: appSlice,
  storeList: storeListSlice,
});
