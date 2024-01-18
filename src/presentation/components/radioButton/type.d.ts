import {StyleProp, ViewStyle} from 'react-native';

export interface RadioButtonProps {
  disable?: boolean;
  initialValue?: boolean;
  value?: boolean;
  onToggle?: (newValue: boolean) => void;
  size?: number;
  mode?: 'check' | 'dot';
  dotSize?: number;
  style?: StyleProp<ViewStyle>;
  disableTranslate?: boolean;
  label?: string;
  labelOption?: any;
}
