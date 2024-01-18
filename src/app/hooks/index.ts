import {useApp} from '../context';
import {AppState} from '../context/appState';

export const useMainApp = () => useApp() as AppState;

export const useAppColors = () => useMainApp().appTheme;

export const useAppTranslation = () => useMainApp().t;
