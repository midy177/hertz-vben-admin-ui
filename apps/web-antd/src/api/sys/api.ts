import { requestClient } from '#/api/request';
import { BaseDataResp, BaseIdReq, BasePageReq, BaseResp } from '#/api/model/baseModel';
import { ApiInfo, ApiListResp } from './model/apiModel';

enum Api {
  GetApiList = '/api/admin/api/list',
  CreateOrAddApi = '/api/admin/api/create',
  CreateOrUpdateApi = '/api/admin/api/update',
  DeleteApi = '/api/admin/api',
}

/**
 * @description: Get api list
 */

export const getApiList = (params: BasePageReq) => {
  return requestClient.get<BaseDataResp<ApiListResp>>(Api.GetApiList, params);
};

/**
 *  author: ryan
 *  @description: create a new api
 */
export const createOrAddApi = (params: ApiInfo) => {
  return requestClient.post<BaseResp>(Api.CreateOrAddApi, params);
};

/**
 *  author: ryan
 *  @description: create a new api
 */
export const createOrUpdateApi = (params: ApiInfo) => {
  return requestClient.post<BaseResp>(Api.CreateOrUpdateApi,{
    params },
  );
};

/**
 *  author: Ryan Su
 *  @description: delete api
 */
export const deleteApi = (params: BaseIdReq) => {
  return requestClient.delete<BaseResp>(Api.DeleteApi, {
    params
    });
};
