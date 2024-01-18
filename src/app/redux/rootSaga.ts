import {all} from 'redux-saga/effects';
import {storeListSaga} from '../../presentation/features/storeList/store/storeListSaga';

export const rootSaga = function* rootSaga() {
  yield all([storeListSaga()]);
};
