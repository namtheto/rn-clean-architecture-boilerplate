import {StyleSheet, useWindowDimensions} from 'react-native';
import {useAppColors} from '../../../app/hooks';
import {vs, fs} from '../../../app/utils/responsive';
import {useInsetsFrame} from '../../../app/hooks/useInsetsFrame';

export const useNetworkLoggerStyle = () => {
  const colors = useAppColors();
  const insets = useInsetsFrame();
  const {width} = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      width: width,
      alignSelf: 'center',
    },
    primaryBox: {
      flex: 1,
      backgroundColor: colors.white,
      borderRadius: vs(12),
      overflow: 'hidden',
      marginBottom: insets.bottom,
    },
  });
  return {styles, colors, vs, fs};
};
