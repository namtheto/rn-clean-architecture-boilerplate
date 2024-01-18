import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppColors} from '../../../app/hooks';
import {vs, fs} from '../../../app/utils/responsive';

export const useStyleLoadingOverlay = () => {
  const colors = useAppColors();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#00000050',
    },
    view: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: vs(28),
      zIndex: 1,
    },
    bounce: {position: 'absolute'},
    containerAbsolute: {
      ...StyleSheet.absoluteFillObject,
    },
  });
  return {colors, styles, insets, fs, vs};
};
