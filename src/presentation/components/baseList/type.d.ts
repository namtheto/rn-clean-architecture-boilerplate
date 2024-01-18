import {FlatListProps} from 'react-native';

export interface ListViewProps extends FlatListProps<any> {
  onRefresh?: () => void;
  onLoadMore?: () => void;
  canLoadMore?: boolean;
  refreshing?: boolean;
  canRefresh?: boolean;
  emptyText?: string;
}

export interface IEmptyFunc {
  emptyText?: string;
}
