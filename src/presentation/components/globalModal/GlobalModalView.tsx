import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import {GlobalModalProps} from './type';
import {useStyleGlobalModal} from './styles';
import BaseButton from '../baseButton';
import {debounce} from 'lodash';
import {Spacer} from '../spacer';
import {useGlobalModal} from './useGlobalModal';
import {execFunc} from '../../../app/utils/helper';
import {BaseText} from '../baseText';
import {useAppTranslation} from '../../../app/hooks';

export const ModalContent = React.forwardRef<ModalContent, GlobalModalProps>(
  (props, ref) => {
    const t = useAppTranslation();
    const {styles, fs} = useStyleGlobalModal();

    const {
      isVisible,
      popupProps,
      hide,
      show,
      disableBackdropPress = false,
    } = useGlobalModal(props);

    //func
    const debounceCancel = debounce(() => {
      execFunc(popupProps?.onPressCancel);
    }, 300);

    const debounceSubmit = debounce(() => {
      execFunc(popupProps?.onPressSubmit);
    }, 300);

    const onBackdropPress = () => {
      if (!disableBackdropPress) {
        execFunc(popupProps?.onBackdropPress);
        return hide();
      }
    };

    const onPressSubmit = () => {
      hide();
      debounceSubmit();
    };

    const onPressCancel = () => {
      hide();
      debounceCancel();
    };

    React.useImperativeHandle(ref, () => ({
      show,
      hide,
    }));

    let label;
    if (typeof popupProps?.title && !popupProps?.disableTitleTranslate) {
      label = t(popupProps?.title, popupProps?.titleOption);
    } else {
      label = popupProps?.title;
    }

    let description;
    if (
      typeof popupProps?.description &&
      !popupProps?.disableDescriptionTranslate
    ) {
      description = t(popupProps?.description, popupProps?.descriptionOption);
    } else {
      description = popupProps?.description;
    }

    return (
      <Modal
        isVisible={isVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={onBackdropPress}
        onBackButtonPress={onBackdropPress}
        customBackdrop={<View style={styles.blurStyle} />}>
        <View style={styles.container}>
          {popupProps?.icon && (
            <View style={styles.icon}>{popupProps?.icon}</View>
          )}
          {popupProps?.title && (
            <BaseText fontSize={fs(24)} fontWeight={'700'} textAlign="center">
              {label}
            </BaseText>
          )}
          <Spacer height={8} />
          {popupProps?.description && (
            <BaseText fontSize={fs(18)} fontWeight={'400'} textAlign="center">
              {description}
            </BaseText>
          )}
          <View style={styles.bottomButton}>
            {popupProps?.cancelable && (
              <>
                <BaseButton
                  shadow
                  mode="secondary"
                  label={t(popupProps?.cancelText || 'cancel')}
                  style={styles.button}
                  onPress={onPressCancel}
                />
                <Spacer width={16} />
              </>
            )}
            <BaseButton
              shadow
              label={t(popupProps?.submitText || 'start')}
              style={styles.button}
              onPress={onPressSubmit}
            />
          </View>
        </View>
      </Modal>
    );
  },
);

export type ModalContent = {
  show: (props?: GlobalModalProps) => void;
  hide: () => void;
};
