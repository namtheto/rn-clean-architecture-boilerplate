import {IAppColors} from '../themes/appColors';

export interface AppState {
  t: any;
  changeLanguage: (languageCode: string) => void;
  appTheme: IAppColors;
  changeAppTheme: (mode: 'lightThemes' | 'darkThemes') => void;
  selectedLanguage: string;
}
