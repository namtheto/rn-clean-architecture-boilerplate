import {StyleSheet} from 'react-native';
import {useAppColors} from '../../../app/hooks';
import {vs, fs} from '../../../app/utils/responsive';

export const useButtonStyle = () => {
  const colors = useAppColors();
  const styles = StyleSheet.create({
    containerMain: {
      height: vs(60),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: vs(15),
      backgroundColor: colors.newPrimary,
    },
    containerSecondary: {
      height: vs(60),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: vs(15),
      backgroundColor: colors.white,
      borderWidth: vs(1),
      borderColor: colors.newPrimary,
    },
    flex: {
      flex: 1,
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
  });
  return {styles, colors, vs, fs};
};
