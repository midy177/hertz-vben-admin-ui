import { BaseDataResp, BaseIdReq, BasePageReq, BaseResp } from '#/api/model/baseModel';
import { OauthLoginReq, ProviderInfo, ProviderListResp, RedirectResp } from './model/oauthModel';
import { LoginResp } from './model/userModel';
import {requestClient} from "#/api/request";

enum Api {
  OauthLogin = '/api/oauth/login',
  OauthLoginCallback = '/api/oauth/callback',
  GetProviderList = '/api/admin/oauth/provider/list',
  CreateOrAddProvider = '/api/admin/oauth/provider/create',
  CreateOrUpdateProvider = '/api/admin/oauth/provider/update',
  DeleteProvider = '/api/admin/oauth/provider',
}

/**
 * @description: Get provider list
 */

export const getProviderList = (params: BasePageReq) => {
  return requestClient.get<BaseDataResp<ProviderListResp>>(Api.GetProviderList,{
    params
  });
};

/**
 *  author: ryan
 *  @description: create or update a provider
 */
export const CreateOrAddProvider = (params: ProviderInfo) => {
  return requestClient.post<BaseResp>(
    Api.CreateOrAddProvider,{
      params,
    });
};

/**
 *  author: ryan
 *  @description: create or update a provider
 */
export const createOrUpdateProvider = (params: ProviderInfo) => {
  return requestClient.post<BaseResp>(
    Api.CreateOrUpdateProvider, {
      params,
    });
};

/**
 *  author: Ryan Su
 *  @description: delete a provider
 */
export const deleteProvider = (params: BaseIdReq) => {
  return requestClient.delete<BaseResp>(Api.DeleteProvider,{
    params
  });
};

/**
 *  author: Ryan Su
 *  @description: oauth log in
 */
export const oauthLogin = (params: OauthLoginReq) => {
  return requestClient.post<RedirectResp>(
    Api.OauthLogin, {
      params,
    });
};

/**
 *  author: Ryan Su
 *  @description: oauth log in callback
 */
export const oauthLoginCallback = (URL: string) => {
  return requestClient.get<LoginResp>(Api.OauthLoginCallback + URL);
};
