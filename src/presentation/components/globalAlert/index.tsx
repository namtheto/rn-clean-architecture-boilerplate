import React, {
  createRef,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {useAppTranslation} from '../../../app/hooks';
import {useStyleGlobalAlert} from './styles';
import {GlobalAlertData, GlobalAlertType} from './type';
import Animated, {useAnimatedStyle} from 'react-native-reanimated';
import {
  useInterpolate,
  useSharedTransition,
} from '../../../app/hooks/reanimated';
import {BaseText} from '../baseText';
import {debounce} from 'lodash';
import {BaseView} from '../baseView';
import {Spacer} from '../spacer';

export const GlobalAlertComponent = forwardRef((_, ref) => {
  //state
  const t = useAppTranslation();
  const {colors, styles, fs} = useStyleGlobalAlert();

  const [txOps, setTxOps] = useState();
  const [titleOps, setTitleOps] = useState();
  const [time, setTime] = useState<number>(3000);
  const [message, setMessage] = useState<string>('');
  const [localTitle, setLocalTitle] = useState<string | undefined>(undefined);
  const [visible, setVisible] = useState<boolean>(false);
  const [hide, setHide] = useState<boolean>(true);
  const [typeAlert, setTypeAlert] = useState<GlobalAlertType>('error');
  const progress = useSharedTransition(visible, {duration: 800});
  const translateY = useInterpolate(progress, [0, 1], [-20, 0]);

  const currentExpandHeight = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  let content;
  if (typeof message === 'string' && txOps !== undefined) {
    content = t(message, txOps);
  } else {
    content = t(message);
  }

  let title = '';
  if (typeof localTitle === 'string' && titleOps !== undefined) {
    title = t(localTitle, titleOps);
  } else {
    title = t(localTitle || '');
  }

  //memo
  const renderByType = useMemo(
    () => ({
      success: {
        title: title || t('notification'),
        icon: 'svg.success_icon',
        backgroundColor: colors.greenBackground,
        borderColor: colors.greenPrimary,
      },
      error: {
        title: title || t('something_went_wrong'),
        icon: 'svg.error_icon',
        backgroundColor: colors.redBackground,
        borderColor: colors.colorFF6960,
      },
      warn: {
        title: title || t('notification'),
        icon: 'svg.warn_cion',
        backgroundColor: colors.yellowBackground,
        borderColor: colors.yellowPrimary,
      },
      info: {
        title: title || t('notification'),
        icon: 'svg.info_icon',
        backgroundColor: colors.blueBackground,
        borderColor: colors.bluePrimary,
      },
    }),
    [
      colors.blueBackground,
      colors.bluePrimary,
      colors.colorFF6960,
      colors.greenBackground,
      colors.greenPrimary,
      colors.redBackground,
      colors.yellowBackground,
      colors.yellowPrimary,
      t,
      title,
    ],
  );

  //func
  const debounceHide = debounce(function () {
    setHide(true);
  }, 1000);

  const debounce_fun = debounce(function () {
    setTimeout(() => {
      setVisible(false);
      debounceHide();
    }, time + 1000);
  }, 100);

  const onInVisible = useCallback(() => {
    setTimeout(() => {
      setVisible(false);
      debounceHide();
    }, 1000);
  }, [debounceHide]);

  const onShow = useCallback(() => {
    if (!visible) {
      setVisible(true);
      setHide(false);
      debounce_fun();
    }
  }, [debounce_fun, visible]);

  // effect
  useImperativeHandle(
    ref,
    () => ({
      show: (data: GlobalAlertData) => {
        setMessage(data?.msg);
        setTime(data?.duration || 5000);
        setTypeAlert(data?.type);
        setTxOps(data?.msgOptions);
        setLocalTitle(data?.title);
        setTitleOps(data?.titleOptions);
        onShow();
      },
      open: (data: GlobalAlertData) => {
        setMessage(data?.msg);
        setTime(data?.duration || 5000);
        setTypeAlert(data?.type);
        setTxOps(data?.msgOptions);
        setLocalTitle(data?.title);
        setTitleOps(data?.titleOptions);
        setVisible(true);
        setHide(false);
      },
      close: () => {
        onInVisible();
      },
    }),
    [onInVisible, onShow],
  );

  //render
  if (hide) {
    return null;
  }

  return (
    <Animated.View style={[currentExpandHeight, styles.container]}>
      <BaseView
        style={[
          styles.globalView,
          {
            backgroundColor: colors.white,
            borderLeftColor: renderByType[typeAlert].borderColor,
          },
        ]}>
        <BaseText
          textAlign="left"
          fontSize={fs(16)}
          numberOfLines={1}
          fontWeight="bold"
          style={styles.globalText}>
          {renderByType[typeAlert].title}
        </BaseText>
        <Spacer height={4} />
        <BaseText
          textAlign="left"
          fontSize={fs(14)}
          numberOfLines={2}
          fontWeight="400"
          style={styles.globalText}>
          {content}
        </BaseText>
      </BaseView>
    </Animated.View>
  );
});

type GlobalAlertProps = {
  show: (data: GlobalAlertData) => void;
  open: (data: GlobalAlertData) => void;
  close: () => void;
};
export const globalAlertRef = createRef<GlobalAlertProps>();
export const GlobalAlert = () => <GlobalAlertComponent ref={globalAlertRef} />;
export const showGlobalAlert = (data: GlobalAlertData) => {
  globalAlertRef.current?.show(data);
};
export const openGlobalAlert = (data: GlobalAlertData) => {
  globalAlertRef.current?.open(data);
};
export const closeGlobalAlert = () => {
  globalAlertRef.current?.close();
};
