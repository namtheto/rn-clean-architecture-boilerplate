import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAppColors} from '../../../app/hooks';
import {vs, fs} from '../../../app/utils/responsive';

export const useStyleListView = () => {
  const colors = useAppColors();
  const insets = useSafeAreaInsets();

  const styles = StyleSheet.create({
    contentContainerStyle: {
      flexGrow: 1,
    },
    emptyContainer: {
      paddingVertical: vs(32),
      paddingHorizontal: vs(24),
      alignItems: 'center',
      justifyContent: 'center',
    },
    footerContainer: {
      paddingVertical: vs(24),
      paddingHorizontal: vs(24),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  return {colors, styles, fs, vs, insets};
};
