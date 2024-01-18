import {createAction, createSlice} from '@reduxjs/toolkit';
import {ActionType} from '../../../../app/redux/actionType';
import {IStoreListEntity} from '../../../../domain/model/storeList';

export interface IStoreListState {
  storeList: IStoreListEntity[];
}

const initialState: IStoreListState = {
  storeList: [],
};

// create action
const getAllStoreList = createAction(
  ActionType.ON_GET_ALL_STORE,
  (onSucceeded?: () => void, onFailure?: () => void) => ({
    payload: {onSucceeded, onFailure},
  }),
);

// create slice
export const storeListSlice = createSlice({
  name: 'storeList',
  // initial state
  initialState,
  reducers: {
    // reducers action
    setStoreList: (state, action) => {
      state.storeList = action.payload;
    },
    resetStoreList: () => {
      return initialState;
    },
  },
});

export default storeListSlice.reducer;
export const storeAction = {
  ...storeListSlice.actions,
  getAllStoreList,
};
