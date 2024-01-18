import {Dimensions, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppColors} from '../../../app/hooks';
import {vs, fs} from '../../../app/utils/responsive';

export const useStyleGlobalAlert = () => {
  const colors = useAppColors();
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get('window').width;

  const styles = StyleSheet.create({
    container: {
      zIndex: 9999,
      position: 'absolute',
      top: insets.top + vs(10),
      alignItems: 'center',
      width: windowWidth,
    },
    globalView: {
      width: windowWidth - vs(50),
      padding: vs(10),
      borderLeftWidth: vs(6),
      borderBottomWidth: vs(1),
      borderRightWidth: vs(1),
      borderTopWidth: vs(1),
      borderRadius: vs(8),
      borderRightColor: colors.colorDBE2EA,
      borderTopColor: colors.colorDBE2EA,
      borderBottomColor: colors.colorDBE2EA,
    },
    shadowCard: {
      shadowColor: '#00000099',
      shadowOffset: {
        width: -2,
        height: 1,
      },
      shadowOpacity: 0.25,
      shadowRadius: 5,
      elevation: 5,
    },
    globalText: {
      marginLeft: vs(20),
      paddingBottom: 0,
    },
  });
  return {colors, styles, insets, fs, vs};
};
