import {useCallback, useState} from 'react';
import {GlobalModalProps} from './type';

export const useGlobalModal = (initProps?: GlobalModalProps) => {
  const [popupProps, setPopupProps] = useState(initProps);
  const [isVisible, setIsVisible] = useState(false);
  const disableBackdropPress = popupProps?.disableBackdropPress;

  const show = useCallback((newProps?: GlobalModalProps) => {
    setPopupProps(newProps);
    setIsVisible(true);
  }, []);

  const hide = useCallback(() => {
    setIsVisible(false);
  }, []);

  return {
    isVisible,
    popupProps,
    disableBackdropPress,
    show,
    hide,
  };
};
