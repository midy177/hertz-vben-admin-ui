import { BaseDataResp, BaseIdReq, BasePageReq, BaseResp } from '#/api/model/baseModel';
import {
  DictionaryDetail,
  DictionaryDetailListResp,
  DictionaryInfo,
  DictionaryListResp,
} from './model/dictionaryModel';
import {requestClient} from "#/api/request";

enum Api {
  GetDictionaryList = '/api/admin/dict/list',
  CreateOrAddDictionary = '/api/admin/dict/create',
  CreateOrUpdateDictionary = '/api/admin/dict/update',
  DeleteDictionary = '/api/admin/dict',
  GetDictionaryDetailList = '/api/admin/dict/detail/list',
  CreateOrAddDetailDictionary = '/api/admin/dict/detail/create',
  CreateOrUpdateDictionaryDetail = '/api/admin/dict/detail/update',
  DeleteDictionaryDetail = '/api/admin/dict/detail',
}

/**
 * @description: Get dictionary list
 */

export const getDictionaryList = (params: BasePageReq) => {
  return requestClient.get<BaseDataResp<DictionaryListResp>>(
    Api.GetDictionaryList,{ params },
  );
};

/**
 *  author: ryan
 *  @description: create or update a new dictionary
 */
export const createOrAddDictionary = (params: DictionaryInfo) => {
  return requestClient.post<BaseResp>(
    Api.CreateOrAddDictionary,{ params },

  );
};

/**
 *  author: ryan
 *  @description: create or update a new dictionary
 */
export const CreateOrAddDetailDictionary = (params: DictionaryDetail) => {
  return requestClient.post<BaseResp>(
    Api.CreateOrAddDetailDictionary, {params },
  );
};

/**
 *  author: ryan
 *  @description: create or update a new dictionary
 */
export const createOrUpdateDictionary = (params: DictionaryInfo) => {
  return requestClient.post<BaseResp>(
    Api.CreateOrUpdateDictionary,{ params },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete a dictionary
 */
export const deleteDictionary = (params: BaseIdReq) => {
  return requestClient.delete<BaseResp>(
    Api.DeleteDictionary, {params },
  );
};

/**
 * @description: Get dictionary detail list
 */

export const getDictionaryDetailList = (params: BasePageReq) => {
  return requestClient.get<BaseDataResp<DictionaryDetailListResp>>(Api.GetDictionaryDetailList,params);
};

/**
 *  author: ryan
 *  @description: create a new dictionary detail
 */
export const createOrUpdateDictionaryDetail = (params: DictionaryDetail) => {
  return requestClient.post<BaseResp>(
    Api.CreateOrUpdateDictionaryDetail, { params },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete a dictionary detail
 */
export const deleteDictionaryDetail = (params: BaseIdReq) => {
  return requestClient.post<BaseResp>(
    Api.DeleteDictionaryDetail, {params },
  );
};
