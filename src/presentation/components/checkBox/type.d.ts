import {StyleProp, ViewStyle} from 'react-native';

export interface CheckboxProps {
  size?: number;
  value?: boolean;
  disable?: boolean;
  label?: string;
  labelOption?: any;
  mode?: 'primary' | 'secondary';
  initialValue?: boolean;
  onToggle?: (newValue: boolean) => void;
  style?: StyleProp<ViewStyle>;
  disableTranslate?: boolean;
}
