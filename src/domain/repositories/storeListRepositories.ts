import {ResponseBase} from '../../app/services/types';
import {IStoreListEntity} from '../model/storeList';

export interface StoreListRepositories {
  getStoreList(): Promise<ResponseBase<IStoreListEntity[]>>;
}
