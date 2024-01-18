import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export enum LANGUAGE {
  EN = 'en',
  DE = 'de',
}

export interface AppState {
  language: LANGUAGE;
}

const initialState: AppState = {
  language: LANGUAGE.EN,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateLanguage: (state, action: PayloadAction<LANGUAGE>) => {
      state.language = action.payload;
    },
    resetAppStore: () => {
      return initialState;
    },
  },
});

export default appSlice.reducer;
export const appAction = {
  ...appSlice.actions,
};
