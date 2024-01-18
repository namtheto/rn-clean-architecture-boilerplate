import {IStoreListEntity} from '../../domain/model/storeList';
import {StoreListRepositories} from '../../domain/repositories/storeListRepositories';
import {ICoffeeShop} from '../models/storeListRes';
import {APIConfig} from '../../app/services/apiConfig';
import {NetworkService} from '../../app/services/axiosClient';
import {ResponseBase} from '../../app/services/types';

export default class StoreListImplement implements StoreListRepositories {
  getStoreList = async (): Promise<ResponseBase<IStoreListEntity[]>> => {
    //use NetworkService get method to get data
    const res = await NetworkService.get<ICoffeeShop[]>({
      url: APIConfig.getAllStore,
    });
    let dataRes: ResponseBase<IStoreListEntity[]> = res;
    if (res?.data) {
      // binding
      dataRes = {
        ...res,
        data: res?.data.map(el => ({
          id: el?.id,
          shopName: el?.name,
          shopImage: el?.image_1,
        })),
      };
    }
    return dataRes;
  };
}
