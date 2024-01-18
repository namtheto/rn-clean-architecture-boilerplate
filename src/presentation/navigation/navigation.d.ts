import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {LabelPosition} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {BOTTOM_TAB_STACK} from './routing';

export interface IRouting {
  name: string;
  component:
    | React.ComponentType<{}>
    | React.ComponentType<{
        route: RouteProp<ParamListBase, string>;
        navigation: any;
      }>;
  options?:
    | NativeStackNavigationOptions
    | ((props: {
        route: RouteProp<ParamListBase, string>;
        navigation: any;
      }) => NativeStackNavigationOptions);
  initialParams?: Partial<object | undefined>;
}

export interface ITabBarLabelProps {
  focused: boolean;
  color: string;
  position: LabelPosition;
  children: string;
}

export interface ITabBarIconProps {
  focused: boolean;
  color?: string;
  size?: number;
  key: keyof typeof BOTTOM_TAB_STACK | string;
}

export type modeType = keyof typeof BOTTOM_TAB_STACK;

export type ConfigType = {
  [key in modeType]: {
    inactiveIcon: JSX.Element;
    activeIcon: JSX.Element;
    label: string;
  };
};
