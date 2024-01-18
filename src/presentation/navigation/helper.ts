import {
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';
import type {NativeStackNavigationOptions} from '@react-navigation/native-stack';

export const navigationRef = createNavigationContainerRef();

export const getNavigation = () => navigationRef.current;

export const getRoute = () => navigationRef.current?.getCurrentRoute();

export const navigate = (name: string, params?: object) => {
  if (!navigationRef.current) {
    return;
  }
  if (!navigationRef.current.isReady()) {
    return;
  }
  navigationRef.current.navigate({name, params} as never);
};

export const goBack = () => {
  if (!navigationRef.current) {
    return;
  }
  if (!navigationRef.current.isReady()) {
    return;
  }
  if (!navigationRef.current.canGoBack()) {
    return;
  }

  navigationRef.current.goBack();
};

export const reset = (name: string, params?: object) => {
  if (!navigationRef.current) {
    return;
  }
  if (!navigationRef.current.isReady()) {
    return;
  }
  navigationRef.current.reset({
    index: 0,
    routes: [{name, params}],
  });
};

export const replace = (name: string, params?: object) => {
  if (!navigationRef.current) {
    return;
  }
  if (!navigationRef.current.isReady()) {
    return;
  }
  navigationRef.current.dispatch(StackActions.replace(name, params));
};

export const StackOptions: NativeStackNavigationOptions = {
  headerShown: false,
  gestureEnabled: true,
  animation: 'default',
};
