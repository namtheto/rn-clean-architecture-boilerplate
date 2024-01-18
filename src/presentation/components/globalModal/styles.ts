import {Dimensions, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppColors} from '../../../app/hooks';
import {vs, fs} from '../../../app/utils/responsive';

export const useStyleGlobalModal = () => {
  const colors = useAppColors();
  const insets = useSafeAreaInsets();
  const {height} = Dimensions.get('screen');

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      justifyContent: 'center',
      borderRadius: vs(8),
      paddingVertical: vs(24),
      paddingHorizontal: vs(24),
    },
    icon: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: vs(15),
    },
    bottomButton: {
      flexDirection: 'row',
    },
    button: {
      flex: 1,
      marginTop: vs(30),
      borderRadius: vs(15),
    },
    blurStyle: {
      ...StyleSheet.absoluteFillObject,
      height: height,
      backgroundColor: '#000000',
    },
  });
  return {colors, styles, fs, vs, insets};
};
