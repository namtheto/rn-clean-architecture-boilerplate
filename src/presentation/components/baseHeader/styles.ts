import {StyleSheet} from 'react-native';
import {useAppColors} from '../../../app/hooks';
import {vs, fs} from '../../../app/utils/responsive';

export const useBaseHeaderStyle = () => {
  const colors = useAppColors();
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
      paddingTop: vs(25),
    },
  });
  return {styles, colors, vs, fs};
};
