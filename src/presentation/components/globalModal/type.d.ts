export interface GlobalModalProps {
  onPressSubmit?: () => void;
  onPressCancel?: () => void;
  onBackdropPress?: () => void;
  description?: string;
  title?: string;
  submitText?: string;
  cancelText?: string;
  icon?: React.JSX.Element;
  disableBackdropPress?: boolean;
  cancelable?: boolean;
  titleOption?: any;
  disableTitleTranslate?: boolean;
  descriptionOption?: any;
  disableDescriptionTranslate?: boolean;
}
