import {StyleProp, ViewStyle} from 'react-native';

export interface BaseButtonProps {
  onPress?: () => void;
  mode?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  shadow?: boolean;
  label: string;
  labelOption?: any;
  disableTranslate?: boolean;
  flex?: boolean;
}
