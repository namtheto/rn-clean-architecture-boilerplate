import React from 'react';
import EdgeInsets from '../../../app/types/EdgeInsets';
import {
  BaseHeader,
  BaseText,
  BaseView,
  Spacer,
  showGlobalAlert,
} from '../../components';
import {reset} from '../../navigation/helper';
import {BOTTOM_TAB_SCREEN} from '../../navigation/routing';
import BaseButton from '../../components/baseButton';

const LoginScreen = () => {
  //func
  const onNope = () => {
    showGlobalAlert({
      type: 'error',
      msg: 'qr_code_is_invalid',
    });
  };
  const onConfirm = () => {
    reset(BOTTOM_TAB_SCREEN);
  };
  //render
  return (
    <BaseView padding={EdgeInsets.symmetric({horizontal: 25, vertical: 25})}>
      <BaseHeader />
      <Spacer height={270} />
      <BaseText fontSize={30} textAlign="center">
        {'hello_world_desc'}
      </BaseText>
      <Spacer height={70} />
      <BaseView row flex={1}>
        <BaseButton shadow flex label="hello_world" onPress={onConfirm} />
        <Spacer width={25} />
        <BaseButton
          shadow
          flex
          mode="secondary"
          label="Nope"
          onPress={onNope}
        />
      </BaseView>
    </BaseView>
  );
};

export default LoginScreen;
