import {ResponseBase} from '../../app/services/types';
import StoreListImplement from '../../data/repositories/storeListImpl';
import {IStoreListEntity} from '../model/storeList';
import {StoreListRepositories} from '../repositories/storeListRepositories';

export interface IStoreListUseCase {
  getStoreListInvoke: () => Promise<ResponseBase<IStoreListEntity[]>>;
}

export class StoreListUseCase implements IStoreListUseCase {
  private storeListRepo: StoreListRepositories;
  constructor() {
    this.storeListRepo = new StoreListImplement();
  }

  getStoreListInvoke = async () => {
    return await this.storeListRepo.getStoreList();
  };
}
export const storeListUseCase = new StoreListUseCase();
