import { BaseDataResp, BaseIdReq, BaseIdsReq, BasePageReq, BaseResp } from '#/api/model/baseModel';
import { TokenInfo, TokenListResp } from './model/tokenModel ';
import {requestClient} from "#/api/request";

enum Api {
  GetTokenList = '/api/admin/token/list',
  CreateOrUpdateToken = '/api/admin/token/update',
  DeleteToken = '/api/admin/token',
  BatchDeleteToken = '/token/batch_delete',
  SetTokenStatus = '/token/status',
  Logout = '/api/logout',
}

/**
 * @description: Get token list
 */

export const getTokenList = (params: BasePageReq) => {
  return requestClient.get<BaseDataResp<TokenListResp>>(Api.GetTokenList,params);
};

/**
 *  author: ryan
 *  @description: create or update a new token
 */
export const createOrUpdateApi = (params: TokenInfo) => {
  return requestClient.post<BaseResp>(Api.CreateOrUpdateToken, {
      params,
  });
};

/**
 *  author: Ryan Su
 *  @description: delete a token
 */
export const deleteToken = (params: BaseIdReq) => {
  return requestClient.delete<BaseResp>(Api.DeleteToken, params);
};

/**
 *  author: Ryan Su
 *  @description: batch delete tokens
 */
export const batchDeleteToken = (params: BaseIdsReq) => {
  return requestClient.post<BaseResp>(Api.BatchDeleteToken, params);
};

/**
 *  author: Ryan Su
 *  @description: set the token status
 */
export const setTokenStatus = (id: number, status: number) =>
  requestClient.post(Api.SetTokenStatus,{
    params: { id, status },
  });

/**
 *  author: Ryan Su
 *  @description: Force logging out
 */

export const logout = (uuid: string) =>
  requestClient.post(Api.Logout, {
    params: { UUID: uuid },
  });
