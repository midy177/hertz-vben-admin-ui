import { BaseDataResp, BaseIdReq, BasePageReq, BaseResp } from '#/api/model/baseModel';
import { RoleInfo, RoleListResp } from './model/roleModel';
import {requestClient} from "#/api/request";

enum Api {
  GetRoleList = '/api/admin/role/list',
  CreateOrAddRole = '/api/admin/role/create',
  CreateOrUpdateRole = '/api/admin/role/update',
  DeleteRole = '/api/admin/role',
  SetRoleStatus = '/api/admin/role/status',
}

/**
 * @description: Get user menu based on role id
 */

export const getRoleList = (params: BasePageReq) => {
  return requestClient.get<BaseDataResp<RoleListResp>>(Api.GetRoleList, {
      params,
  });
};

/**
 *  author: ryan
 *  @description: create a new role
 */
export const createOrAddRole = (params: RoleInfo) => {
  return requestClient.post<BaseResp>(Api.CreateOrAddRole,{
      params,
  });
};

/**
 *  author: ryan
 *  @description: create a new role
 */
export const createOrUpdateRole = (params: RoleInfo) => {
  return requestClient.post<BaseResp>(Api.CreateOrUpdateRole,{
      params,
  });
};

/**
 *  author: Ryan Su
 *  @description: delete a role
 */
export const deleteRole = (params: BaseIdReq) => {
  return requestClient.delete<BaseResp>(Api.DeleteRole, {
      params,
  });
};

/**
 *  author: Ryan Su
 *  @description: set role's status
 */
export const setRoleStatus = (id: number, status: number) =>
  requestClient.post(Api.SetRoleStatus, {
    params: { id, status },
  });
