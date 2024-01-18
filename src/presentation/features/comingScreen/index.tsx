import React from 'react';
import {BaseText, BaseView} from '../../components';

const ComingSoon = () => {
  return (
    <BaseView flex={1} justifyContent="center">
      <BaseText fontSize={30} textAlign="center">
        {'coming_soon'}
      </BaseText>
    </BaseView>
  );
};

export default ComingSoon;
