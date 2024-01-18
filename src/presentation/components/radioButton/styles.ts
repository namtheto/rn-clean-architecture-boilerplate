import {StyleSheet} from 'react-native';
import {useAppColors} from '../../../app/hooks';
import {vs, fs} from '../../../app/utils/responsive';

export const useRadioButtonStyle = () => {
  const colors = useAppColors();
  const styles = StyleSheet.create({
    container: {
      alignSelf: 'flex-end',
    },
    box: {
      borderWidth: vs(2),
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: vs(100),
    },
    dot: {
      borderWidth: vs(2),
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: vs(100),
      padding: vs(5),
    },
    activeDot: {
      borderRadius: vs(100),
      backgroundColor: colors.newPrimary,
    },
  });
  return {styles, colors, vs, fs};
};
