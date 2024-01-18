import {createContext, useContext} from 'react';
import {AppState} from './appState';
import {colorsApp} from '../themes';
import {LANGUAGE} from '../redux/appSlice';

const initValue: AppState = {
  t: null,
  changeLanguage: () => {},
  appTheme: colorsApp('lightThemes'),
  changeAppTheme: () => {},
  selectedLanguage: LANGUAGE.EN,
};

export const AppContext = createContext<AppState>(initValue);

export const initialState = {
  colorMode: colorsApp('lightThemes'),
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return Object.assign({}, state, {
        colorMode: colorsApp(action.data),
      });
    default:
      return state;
  }
};

export const useApp = () => useContext(AppContext);
