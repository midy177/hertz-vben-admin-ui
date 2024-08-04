import { BaseIdReq, BasePageReq, BaseResp, BaseDataResp } from '#/api/model/baseModel';
import { LogsListResp } from './model/logsModel';
import {requestClient} from "#/api/request";

enum Api {
  GetLogsList = '/api/admin/logs/list',
  DeleteLogs = '/api/admin/logs/delete_all',
}

/**
 * @description: Get logs list
 */

export const getLogsList = (params: BasePageReq) => {
  return requestClient.get<BaseDataResp<LogsListResp>>(Api.GetLogsList,{
    params
  });
};

/**
 *  author: Ryan Su
 *  @description: delete logs
 */
export const deleteLogs = (params: BaseIdReq) => {
  return requestClient.delete<BaseResp>(Api.DeleteLogs, {
      params
    });
};
