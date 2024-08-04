import {  BaseRespStr } from '#/api/model/baseModel';
import { ToolListResp,ToolInfo  } from './model/toolModel ';
import {requestClient} from "#/api/request";

enum Api {
  GetStructToProto = '/api/structToProto',
  GetDeleteStructTag = '/api/deleteStructTag',

}

// /**
//  * @description: Get StructToProto
//  */

// export const getStructToProto = (params :BasePageReq) => {
//   return requestClient.post<BaseResp<ToolListResp>>(Api.GetStructToProto, params });
// };

/**
 *  author: Czx
 *  @description: 转换struct至proto类型数据r
 */
export const getStructToProto = (params: ToolInfo) => {
  return requestClient.post<BaseRespStr<ToolListResp>>(Api.GetStructToProto, {
      params,
  });
};

/**
 *  author: Czx
 *  @description: 去掉struct tag
 */
export const Getdeletestructtag = (params: ToolInfo) => {
  return requestClient.post<BaseRespStr<ToolListResp>>(Api.GetDeleteStructTag,params);
};

// /**
//  *  author: ryan
//  *  @description: create or update a new token
//  */
// export const createOrUpdateApi = (params: TokenInfo) => {
//   return requestClient.post<BaseResp>(
//     Api.CreateOrUpdateToken, params },
//     {
//       errorMessageMode: mode,
//     },
//   );
// };

// /**
//  *  author: Ryan Su
//  *  @description: delete a token
//  */
// export const deleteToken = (params: BaseIdReq) => {
//   return requestClient.delete<BaseResp>(
//     Api.DeleteToken, params },
//     {
//       errorMessageMode: mode,
//     },
//   );
// };

// /**
//  *  author: Ryan Su
//  *  @description: batch delete tokens
//  */
// export const batchDeleteToken = (params: BaseIdsReq) => {
//   return requestClient.post<BaseResp>(
//     Api.BatchDeleteToken, params },
//     {
//       errorMessageMode: mode,
//     },
//   );
// };

// /**
//  *  author: Ryan Su
//  *  @description: set the token status
//  */
// export const setTokenStatus = (id: number, status: number) =>
//   requestClient.post(Api.SetTokenStatus, params: { id, status } });

// /**
//  *  author: Ryan Su
//  *  @description: Force logging out
//  */

// export const logout = (uuid: string) => requestClient.post(Api.Logout, params: { UUID: uuid } });
