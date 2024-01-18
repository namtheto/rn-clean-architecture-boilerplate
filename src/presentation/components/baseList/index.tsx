import React, {useMemo} from 'react';
import {ActivityIndicator, FlatList, RefreshControl, View} from 'react-native';
import {ListViewProps} from './type';
import EmptyList from './components/EmptyList';
import {useStyleListView} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {execFunc} from '../../../app/utils/helper';
import {PlatformBase} from '../../../app/utils/platform';
import {heightDiff} from '../../../app/utils/responsive';

export const BaseList = (props: ListViewProps) => {
  // state
  const {
    onRefresh,
    onLoadMore,
    canRefresh = false,
    canLoadMore = false,
    refreshing = false,
    emptyText,
    contentContainerStyle,
    data,
    ...rest
  } = props;
  const insets = useSafeAreaInsets();
  const {styles, colors, vs} = useStyleListView();

  // function
  const loadMore = () => {
    if (canLoadMore) {
      execFunc(onLoadMore);
    }
  };

  const keyExtractor = (_item: any, index: number) => {
    return index.toString();
  };

  const emptyListView = () => {
    return <EmptyList emptyText={emptyText} />;
  };

  const loadingFooterIndicator = useMemo(() => {
    if (canLoadMore && (data || [])?.length > 0) {
      return (
        <View style={styles.footerContainer}>
          <ActivityIndicator size={'large'} color={colors.newPrimary} />
        </View>
      );
    }
    return undefined;
  }, [canLoadMore, colors.newPrimary, data, styles.footerContainer]);

  const refreshControl = useMemo(() => {
    if (canRefresh) {
      return (
        <RefreshControl
          tintColor={colors.newPrimary}
          refreshing={refreshing}
          onRefresh={onRefresh}
          progressViewOffset={PlatformBase.isAndroid ? -vs(100) : undefined}
        />
      );
    }
    return undefined;
  }, [canRefresh, colors.newPrimary, onRefresh, refreshing, vs]);

  // render
  return (
    <FlatList
      data={data}
      onEndReached={loadMore}
      keyExtractor={keyExtractor}
      ListEmptyComponent={emptyListView}
      scrollEventThrottle={16}
      onEndReachedThreshold={0.001}
      contentInset={{bottom: insets.bottom + heightDiff}}
      refreshControl={refreshControl}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListFooterComponent={loadingFooterIndicator}
      contentContainerStyle={[
        styles.contentContainerStyle,
        contentContainerStyle,
      ]}
      {...rest}
    />
  );
};
