import {View} from 'react-native';
import React from 'react';
import {IEmptyFunc} from '../type';
import {useStyleListView} from '../styles';
import {useAppTranslation} from '../../../../app/hooks';
import {BaseText} from '../../baseText';

const EmptyList = ({emptyText = 'no_transaction_yet'}: IEmptyFunc) => {
  const t = useAppTranslation();
  const {styles, fs, colors} = useStyleListView();
  return (
    <View style={styles.emptyContainer}>
      <BaseText fontSize={fs(16)} fontWeight={'500'} color={colors.colorADADBD}>
        {t(emptyText)}
      </BaseText>
    </View>
  );
};

export default EmptyList;
