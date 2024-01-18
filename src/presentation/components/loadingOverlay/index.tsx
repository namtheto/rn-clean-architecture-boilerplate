import React, {
  createRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import {Modal, StatusBar, ActivityIndicator} from 'react-native';
import {useStyleLoadingOverlay} from './styles';
import {Bounce} from 'react-native-animated-spinkit';
import {LoadingOverlayProps} from './type';
import {BaseView} from '../baseView';

export const LoadingOverlayView = forwardRef((_, ref) => {
  //state
  const {colors, styles, vs} = useStyleLoadingOverlay();
  const [visible, setVisible] = useState<boolean | undefined>(false);
  const [absolute, setAbsolute] = useState<boolean | undefined>(true);
  const [indicator, setIndicator] = useState<boolean | undefined>(false);

  // effect
  useImperativeHandle(
    ref,
    () => ({
      show: (data: LoadingOverlayProps) => {
        setVisible(data?.visible);
        setAbsolute(data?.absolute);
        setIndicator(data?.indicator);
      },
      close: () => {
        setVisible(false);
      },
    }),
    [],
  );
  // render
  const renderContent = () => {
    return (
      <BaseView style={styles.container}>
        {indicator ? (
          <ActivityIndicator color={colors.bluePrimary} />
        ) : (
          <BaseView style={styles.view}>
            <Bounce
              size={vs(84)}
              color={colors.bluePrimary}
              style={styles.bounce}
            />
          </BaseView>
        )}
      </BaseView>
    );
  };

  if (absolute) {
    return (
      visible && (
        <BaseView style={styles.containerAbsolute}>{renderContent()}</BaseView>
      )
    );
  }

  return (
    <Modal transparent visible={visible} animationType={'fade'}>
      <StatusBar backgroundColor={styles.container.backgroundColor} />
      {renderContent()}
    </Modal>
  );
});

type LoadingOverlayData = {
  show: (data?: LoadingOverlayProps) => void;
  close: () => void;
};
export const LoadingOverlayRef = createRef<LoadingOverlayData>();
export const LoadingOverlay = () => (
  <LoadingOverlayView ref={LoadingOverlayRef} />
);
export const showLoadingOverlay = (data?: LoadingOverlayProps) => {
  LoadingOverlayRef.current?.show(data);
};
export const hideLoadingOverlay = () => {
  LoadingOverlayRef.current?.close();
};
