import {Action} from 'redux';
import {takeLatest, call, put} from 'redux-saga/effects';
import {storeListUseCase} from '../../../../domain/usecase/storeListUseCase';
import {IStoreListEntity} from '../../../../domain/model/storeList';
import {execFunc} from '../../../../app/utils/helper';
import {ResponseBase} from '../../../../app/services/types';
import {storeAction} from './storeListSlice';

export function* storeListSaga() {
  yield takeLatest(storeAction.getAllStoreList.type, getAllStoreList);
}

function* getAllStoreList(action: Action) {
  if (storeAction.getAllStoreList.match(action)) {
    const {onSucceeded, onFailure} = action.payload;
    // usecase for get data
    const response: ResponseBase<IStoreListEntity[]> = yield call(
      storeListUseCase.getStoreListInvoke,
    );
    if (response.isSuccessful) {
      yield put(storeAction.setStoreList(response?.data));
      execFunc(onSucceeded);
    } else {
      execFunc(onFailure);
    }
  }
}
