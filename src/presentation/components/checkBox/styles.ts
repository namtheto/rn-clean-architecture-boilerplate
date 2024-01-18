import {StyleSheet} from 'react-native';
import {useAppColors} from '../../../app/hooks';
import {vs, fs} from '../../../app/utils/responsive';

export const useCheckboxStyle = () => {
  const colors = useAppColors();
  const styles = StyleSheet.create({
    container: {
      alignSelf: 'flex-start',
    },
    primaryBox: {
      borderWidth: vs(2),
      borderColor: colors.colorADADBD,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: vs(4),
    },
    secondaryBox: {
      borderWidth: vs(2),
      borderColor: colors.colorADADBD,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: vs(4),
    },
  });
  return {styles, colors, vs, fs};
};
