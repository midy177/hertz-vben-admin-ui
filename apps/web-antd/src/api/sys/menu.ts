import {
  RoleMenuResp,
  MenuParams,
  CreateOrUpdateMenuReq,
  MenuParamList,
  CreateOrUpdateMenuParamReq,
  MenuListResp,
} from './model/menuModel';
import { BaseDataResp, BaseIdReq, BaseResp } from '#/api/model/baseModel';
import {requestClient} from "#/api/request";

enum Api {
  GetMenuListByRole = '/api/admin/menu/role',
  GetAllMenu = '/api/admin/menu/list',
  CreateOrAddMenu = '/api/admin/menu/create',
  CreateOrUpdateMenu = '/api/admin/menu/update',
  DeleteMenu = '/api/admin/menu',
  CreateOrUpdateMenuParam = '/api/menu/param/create_or_update',
  DeleteMenuParam = '/api/menu/param/delete',
  GetMenuParamsByMenuId = '/api/admin/menu/param/list',
}

/**
 * @description: Get user menu list by role id
 */

export const getMenuList = () => {
  return requestClient.get<BaseDataResp<RoleMenuResp>>(Api.GetMenuListByRole);
};

/**
 *  author: ryan
 *  @description: Get all the menus
 */

export const getAllMenu = (params?: MenuParams) => {
  return requestClient.get<BaseDataResp<MenuListResp>>(Api.GetAllMenu,{
    params
  });
};

/**
 *  author: ryan
 *  @description: Create a new menu
 */
export const CreateOrAddMenu = (
  params: CreateOrUpdateMenuReq
) => {
  return requestClient.post<BaseResp>( Api.CreateOrAddMenu, {
      params,
  });
};

/**
 *  author: ryan
 *  @description: Create a new menu
 */
export const createOrUpdateMenu = (
  params: CreateOrUpdateMenuReq
) => {
  return requestClient.post<BaseResp>(Api.CreateOrUpdateMenu, {
    params,
    });
};

/**
 *  author: Ryan Su
 *  @description: Delete a menu
 */
export const deleteMenu = (params: BaseIdReq) => {
  return requestClient.delete<BaseResp>( Api.DeleteMenu, {
      params
    });
};

/**
 *  author: ryan
 *  @description: Create a new menu parameter for the menu
 */
export const createOrUpdateMenuParam = (params: CreateOrUpdateMenuParamReq) => {
  return requestClient.post<BaseResp>(Api.CreateOrUpdateMenuParam, {
    params
  });
};

/**
 *  author: Ryan Su
 *  @description: Delete a menu parameter
 */
export const deleteMenuParam = (params: BaseIdReq) => {
  return requestClient.post<BaseResp>(Api.DeleteMenuParam,{
    params
  });
};

/**
 *  author: Ryan Su
 *  @description:
 */
export const getMenuParamListByMenuId = (params: BaseIdReq) => {
  return requestClient.get<BaseDataResp<MenuParamList>>(Api.GetMenuParamsByMenuId, {
      params,
    });
};
