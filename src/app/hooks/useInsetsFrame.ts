import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {vs} from '../utils/responsive';

export const useInsetsFrame = () => {
  const insets = useSafeAreaInsets();
  return {
    top: insets.top === 0 ? vs(12) : insets.top,
    bottom: insets.bottom === 0 ? vs(12) : insets.bottom,
    left: insets.left,
    right: insets.right,
  };
};
