import { BaseResp } from '#/api/model/baseModel';
import {requestClient} from "#/api/request";

enum Api {
  InitializeDatabase = '/core/init/database',
}

/**
 * @description: initialize the core database
 */

export const initialzeCoreDatabase = () => {
  return requestClient.get<BaseResp>(Api.InitializeDatabase);
};
