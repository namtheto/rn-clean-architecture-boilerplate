import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import SplashScreen from '../features/splash';
import {ParamListBase, RouteProp} from '@react-navigation/native';
import {IRouting} from './navigation';
import {ComponentType} from 'react';
import LoginScreen from '../features/authentication';
import ComingSoon from '../features/comingScreen';

export enum SCREENS_NAME {
  SPLASH_SCREEN = 'SPLASH_SCREEN',
  LOGIN_SCREEN = 'LOGIN_SCREEN',
  COMING_SOON_SCREEN = 'COMING_SOON_SCREEN',
}

export const BOTTOM_TAB_SCREEN = 'BOTTOM_TAB_SCREEN';

export enum BOTTOM_TAB_STACK {
  HOME_SCREEN = 'HOME_SCREEN',
  SCAN_SCREEN = 'SCAN_SCREEN',
  HISTORY_SCREEN = 'HISTORY_SCREEN',
  OVERVIEW_SCREEN = 'OVERVIEW_SCREEN',
  MORE_SCREEN = 'MORE_SCREEN',
}

export class Route implements IRouting {
  name: string;
  component:
    | ComponentType<{}>
    | ComponentType<{route: RouteProp<ParamListBase, string>; navigation: any}>;
  options?:
    | NativeStackNavigationOptions
    | ((props: {
        route: RouteProp<ParamListBase, string>;
        navigation: any;
      }) => NativeStackNavigationOptions)
    | undefined;
  initialParams?: Partial<object | undefined>;

  constructor(init: IRouting) {
    this.name = init.name;
    this.component = init.component;
    this.options = init.options;
    this.initialParams = init.initialParams;
  }
}

export const Routing: Array<IRouting> = [
  new Route({
    name: SCREENS_NAME.SPLASH_SCREEN,
    component: SplashScreen,
  }),
  new Route({
    name: SCREENS_NAME.LOGIN_SCREEN,
    component: LoginScreen,
  }),
  new Route({
    name: SCREENS_NAME.COMING_SOON_SCREEN,
    component: ComingSoon,
  }),
];
