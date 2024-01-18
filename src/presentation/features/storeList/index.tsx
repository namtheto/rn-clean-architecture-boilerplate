import React, {useEffect} from 'react';
import EdgeInsets from '../../../app/types/EdgeInsets';
import {BaseList, BaseText, BaseView, Spacer} from '../../components';
import {useAppDispatch, useAppSelector} from '../../../app/redux';
import {useIsFocused} from '@react-navigation/native';
import {ListRenderItemInfo} from 'react-native';
import {IStoreListEntity} from '../../../domain/model/storeList';
import {useStoreListStyles} from './styles';
import {storeAction} from './store/storeListSlice';

const StoreList = () => {
  //state
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const {storeList} = useAppSelector(v => v.storeList);
  const {styles, colors, fs} = useStoreListStyles();

  //effect
  useEffect(() => {
    if (isFocused) {
      dispatch(storeAction.getAllStoreList()); // dispatch action
    }
  }, [dispatch, isFocused]);

  //render
  const renderItem = ({item}: ListRenderItemInfo<IStoreListEntity>) => {
    return (
      <BaseView style={styles.item}>
        <BaseText fontSize={fs(16)} fontWeight={'500'} color={colors.black}>
          {item?.shopName ?? ''}
        </BaseText>
      </BaseView>
    );
  };

  return (
    <BaseView padding={EdgeInsets.symmetric({horizontal: 25})}>
      <Spacer height={30} />
      <BaseText fontSize={26} fontWeight="bold" textAlign="left">
        {'Store list'}
      </BaseText>
      <Spacer height={40} />
      <BaseView style={[styles.dropdownContainerStyle, styles.shadowCard]}>
        <BaseList
          data={storeList}
          nestedScrollEnabled
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
          initialNumToRender={10}
        />
      </BaseView>
    </BaseView>
  );
};

export default StoreList;
