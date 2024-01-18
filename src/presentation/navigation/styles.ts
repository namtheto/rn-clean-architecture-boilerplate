import {StyleSheet} from 'react-native';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppColors} from '../../app/hooks';
import {isIPad, isMediumDevice, vs} from '../../app/utils/responsive';

export const useStyleBottomStack = () => {
  const colors = useAppColors();
  const insets = useSafeAreaInsets();

  const tabBarHeight = isIPad ? vs(90) : isMediumDevice ? vs(125) : vs(120);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: insets.top,
      backgroundColor: colors.background,
    },
    tabBarStyle: {
      height: tabBarHeight,
      backgroundColor: colors.white,
      borderTopWidth: 0,
      elevation: 0,
    },
    iconButtonContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: vs(100),
    },
    shadowCard: {
      shadowColor: '#00000099',
      shadowOffset: {
        width: -2,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: vs(36),
    },
  });
  return {colors, styles, vs, insets};
};
