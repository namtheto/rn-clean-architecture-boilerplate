import React from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {useApp} from '../../app/context';
import {navigationRef, StackOptions} from './helper';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BOTTOM_TAB_SCREEN, Routing, SCREENS_NAME} from './routing';
import BottomTabStack from './components/bottomTab';

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const {appTheme} = useApp();
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{...appTheme, ...DefaultTheme}}>
      <Stack.Navigator
        initialRouteName={SCREENS_NAME.SPLASH_SCREEN}
        screenOptions={{...StackOptions}}>
        <Stack.Screen name={BOTTOM_TAB_SCREEN} component={BottomTabStack} />
        {Routing.map((route, index) => {
          return (
            <Stack.Screen
              key={index}
              name={route.name}
              component={route.component}
              options={route.options}
              initialParams={route.initialParams}
            />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
