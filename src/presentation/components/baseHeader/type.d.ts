export interface BaseHeaderProps {
  onPressBack?: () => void;
  onPressNext?: () => void;
  modeColor?: 'black' | 'white';
  disablePadding?: boolean;
  leftDisable?: boolean;
  leftLabel?: string;
  leftLabelOption?: string;
  leftLabelDisableTranslate?: boolean;
  rightDisable?: boolean;
  rightLabel?: string;
  rightLabelOption?: string;
  rightLabelDisableTranslate?: boolean;
}
