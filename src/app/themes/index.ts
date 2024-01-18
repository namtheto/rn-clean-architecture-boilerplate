import {darkThemes} from './darkThem';
import {lightThemes} from './lightTheme';

const modeApp = {
  lightThemes: lightThemes,
  darkThemes: darkThemes,
};

export function colorsApp(colorMode) {
  return modeApp[colorMode];
}

export default lightThemes;
