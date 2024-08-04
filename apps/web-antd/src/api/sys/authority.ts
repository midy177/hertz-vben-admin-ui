import { requestClient } from '#/api/request';
import { BaseDataResp, BaseIdReq, BaseResp } from '#/api/model/baseModel';
import { ApiListResp } from './model/apiModel';
import {
  ApiAuthorityReq,
  ApiListReq,
  MenuAuthorityInfo,
  ApiAuthorityResp,
} from './model/authorityModel';

enum Api {
  CreateOrUpdateApiAuthority = '/api/admin/authority/api/update',
  CreateOrAddMenuAuthority = '/api/admin/authority/menu/create',
  CreateOrUpdateMenuAuthority = '/api/admin/authority/menu/update',
  GetRoleMenuList = '/api/admin/authority/menu/role',
  GetRoleApiList = '/api/admin/authority/api/role',
  GetApiList = '/api/admin/api/list',
}

/**
 *  author: Ryan Su
 *  @description: this function is used to get api list for authorization
 */

export const getApiList = (params: ApiListReq) => {
  return requestClient.get<BaseDataResp<ApiListResp>>(Api.GetApiList,{
    params:params,
  });
};

/**
 * @description: Get api authorization list
 */

export const getApiAuthority = (params: BaseIdReq) => {
  return requestClient.post<BaseDataResp<ApiAuthorityResp>>(Api.GetRoleApiList,{
    params:params
  });
};

/**
 *  author: ryan
 *  @description: create or update api authorization
 */
export const createOrUpdateApiAuthority = (params: ApiAuthorityReq) => {
  return requestClient.post<BaseResp>(Api.CreateOrUpdateApiAuthority, {
    params
    });
};

/**
 *  author: Ryan Su
 *  @description:
 */

export const CreateOrAddMenuAuthority = (
  params: MenuAuthorityInfo,
) => {
  return requestClient.post<BaseResp>(Api.CreateOrAddMenuAuthority, {
    params
    });
};

/**
 *  author: Ryan Su
 *  @description:
 */

export const createOrUpdateMenuAuthority = (params: MenuAuthorityInfo,) => {
  return requestClient.post<BaseResp>(Api.CreateOrUpdateMenuAuthority, {
    params });
};

/**
 *  author: Ryan Su
 *  @description: get role's menu authorization ids
 */

export const getMenuAuthority = (params: BaseIdReq) => {
  return requestClient.post<BaseDataResp<MenuAuthorityInfo>>(Api.GetRoleMenuList,params);
};
