import * as React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {BOTTOM_TAB_STACK} from '../routing';
import {BaseText, BaseView, Spacer} from '../../components';
import {useStyleBottomStack} from '../styles';
import {ConfigType, ITabBarIconProps} from '../navigation';
import ComingSoon from '../../features/comingScreen';
import {useAppTranslation} from '../../../app/hooks';
import StoreList from '../../features/storeList';
import {
  IconHome,
  IconHistory,
  IconOverview,
  IconScan,
  IconThreeDot,
} from '../../../../assets/svgs';

const Tab = createBottomTabNavigator();

const BottomTabStack = () => {
  const t = useAppTranslation();
  const {styles, colors} = useStyleBottomStack();

  const CONFIG: ConfigType = {
    [BOTTOM_TAB_STACK.HOME_SCREEN]: {
      inactiveIcon: <IconHome color={colors.colorADADBD} />,
      activeIcon: <IconHome color={colors.newPrimary} />,
      label: 'home',
    },
    [BOTTOM_TAB_STACK.SCAN_SCREEN]: {
      inactiveIcon: <IconScan color={colors.colorADADBD} />,
      activeIcon: <IconScan color={colors.newPrimary} />,
      label: 'scan',
    },
    [BOTTOM_TAB_STACK.HISTORY_SCREEN]: {
      inactiveIcon: <IconHistory color={colors.colorADADBD} />,
      activeIcon: <IconHistory color={colors.newPrimary} />,
      label: 'history',
    },
    [BOTTOM_TAB_STACK.OVERVIEW_SCREEN]: {
      inactiveIcon: <IconOverview color={colors.colorADADBD} />,
      activeIcon: <IconOverview color={colors.newPrimary} />,
      label: 'overview',
    },
    [BOTTOM_TAB_STACK.MORE_SCREEN]: {
      inactiveIcon: <IconThreeDot color={colors.colorADADBD} />,
      activeIcon: <IconThreeDot color={colors.newPrimary} />,
      label: 'more',
    },
  };

  const tabBarIcon = ({focused, key}: ITabBarIconProps) => {
    return (
      <BaseView style={styles.iconButtonContainer}>
        {focused ? CONFIG[key].activeIcon : CONFIG[key].inactiveIcon}
        <Spacer height={6} />
        <BaseText
          fontSize={16}
          fontWeight={'bold'}
          color={focused ? colors.deepBlue : colors.colorADADBD}>
          {t(CONFIG?.[key]?.label)}
        </BaseText>
      </BaseView>
    );
  };

  const screenOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarHideOnKeyboard: true,
    tabBarStyle: styles.tabBarStyle,
  };

  const bottomTabOptions: BottomTabNavigationOptions = {
    tabBarShowLabel: false,
  };

  return (
    <BaseView style={styles.container}>
      <Tab.Navigator
        initialRouteName={BOTTOM_TAB_STACK.HOME_SCREEN}
        screenOptions={screenOptions}>
        <Tab.Screen
          name={BOTTOM_TAB_STACK.HOME_SCREEN}
          component={StoreList}
          options={{
            ...bottomTabOptions,
            tabBarIcon: props =>
              tabBarIcon({...props, key: BOTTOM_TAB_STACK.HOME_SCREEN}),
          }}
        />
        <Tab.Screen
          name={BOTTOM_TAB_STACK.HISTORY_SCREEN}
          component={ComingSoon}
          options={{
            ...bottomTabOptions,
            tabBarIcon: props =>
              tabBarIcon({...props, key: BOTTOM_TAB_STACK.HISTORY_SCREEN}),
          }}
        />
        <Tab.Screen
          name={BOTTOM_TAB_STACK.SCAN_SCREEN}
          component={ComingSoon}
          options={{
            ...bottomTabOptions,
            tabBarIcon: props =>
              tabBarIcon({...props, key: BOTTOM_TAB_STACK.SCAN_SCREEN}),
          }}
        />
        <Tab.Screen
          name={BOTTOM_TAB_STACK.OVERVIEW_SCREEN}
          component={ComingSoon}
          options={{
            ...bottomTabOptions,
            tabBarIcon: props =>
              tabBarIcon({...props, key: BOTTOM_TAB_STACK.OVERVIEW_SCREEN}),
          }}
        />
        <Tab.Screen
          name={BOTTOM_TAB_STACK.MORE_SCREEN}
          component={ComingSoon}
          options={{
            ...bottomTabOptions,
            tabBarIcon: props =>
              tabBarIcon({...props, key: BOTTOM_TAB_STACK.MORE_SCREEN}),
          }}
        />
      </Tab.Navigator>
    </BaseView>
  );
};

export default BottomTabStack;
