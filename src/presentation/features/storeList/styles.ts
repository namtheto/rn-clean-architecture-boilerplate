import {StyleSheet} from 'react-native';
import {useAppColors} from '../../../app/hooks';
import {fs, vs} from '../../../app/utils/responsive';
import {PlatformBase} from '../../../app/utils/platform';

export const useStoreListStyles = () => {
  const colors = useAppColors();
  const styles = StyleSheet.create({
    dropdownContainerStyle: {
      borderColor: colors.colorDBE2EA,
      backgroundColor: colors.white,
      borderRadius: vs(15),
      overflow: 'hidden',
      paddingVertical: vs(10),
      height: PlatformBase.isIOS ? vs(600) : vs(700),
    },
    item: {
      paddingHorizontal: vs(15),
      justifyContent: 'center',
      height: vs(45),
    },
    contentContainer: {
      flexGrow: 1,
    },
    listContainer: {
      borderRadius: vs(15),
      overflow: 'hidden',
      flexGrow: 1,
      backgroundColor: 'white',
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
  return {colors, styles, vs, fs};
};
