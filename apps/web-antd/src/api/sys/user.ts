import {
  LoginReq,
  LoginResp,
  GetUserInfoModel,
  CaptchaResp,
  RegisterReq,
  UserListReq,
  UserListResp,
  UserProfile,
  ChangePasswordReq,
  CreateOrUpdateUserReq, UserInfoModel,
} from '#/api/sys/model/userModel';
import { BaseDataResp, BaseIdReq, BaseResp } from '#/api/model/baseModel';
import {requestClient} from "#/api/request";

enum Api {
  Login = '/api/login',
  Register = '/api/user/register',
  Logout = '/api/admin/token',
  GetUserInfo = '/api/admin/user/info',
  GetPermCode = '/api/admin/user/perm',
  GetCaptcha = '/api/captcha',
  GetUserList = '/api/admin/user/list',
  CreateOrAddUser = '/api/admin/user/create',
  CreateOrUpdateUser = '/api/admin/user/update',
  DeleteUser = '/api/admin/user',
  SetUserStatus = '/api/admin/user/status',
  GetProfile = '/api/admin/user/profile',
  ChangePassword = '/api/admin/user/change-password',
}

/**
 * @description: user login api
 */
export function login(params: LoginReq) {
  return requestClient.post<BaseDataResp<LoginResp>>(Api.Login, params);
}

/**
 * @description: user register api
 */
export function register(params: RegisterReq) {
  return requestClient.post<BaseResp>(Api.Register, params);
}

/**
 * @description: get captcha api
 */
export function getCaptcha() {
  return requestClient.get<BaseDataResp<CaptchaResp>>(Api.GetCaptcha);
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return requestClient.get<BaseDataResp<UserInfoModel>>(Api.GetUserInfo);
}

export function getPermCode() {
  return requestClient.get<BaseDataResp<string[]>>(Api.GetPermCode);
}

export function doLogout() {
  return requestClient.delete(Api.Logout);
}

// user management

/**
 * @description: Get user menu based on api id
 */

export const getUserList = (params: UserListReq) => {
  return requestClient.get<BaseDataResp<UserListResp>>(Api.GetUserList, params);
};

/**
 *  author: Ryan Su
 *  @description: create a new user
 */
export const createOrAddUser = (params: CreateOrUpdateUserReq) => {
  return requestClient.post<BaseResp>(Api.CreateOrAddUser, params);
};

/**
 *  author: Ryan Su
 *  @description: create a new user
 */
export const createOrUpdateUser = (params: CreateOrUpdateUserReq) => {
  return requestClient.post<BaseResp>(Api.CreateOrUpdateUser, params);
};

/**
 *  author: Ryan Su
 *  @description: delete a user
 */
export const deleteUser = (params: BaseIdReq) => {
  return requestClient.delete<BaseResp>(Api.DeleteUser, params);
};

/**
 *  author: Ryan Su
 *  @description: set role's status
 */
export const setUserStatus = (id: number, status: number) =>
  requestClient.post(Api.SetUserStatus,{
    params: { id, status },
});

/**
 *  author: Ryan Su
 *  @description: Get user profile
 */
export function getUserProfile() {
  return requestClient.get<BaseDataResp<UserProfile>>(Api.GetProfile);
}

/**
 *  author: Ryan Su
 *  @description: update user profile
 */
export function updateProfile(params: UserProfile) {
  return requestClient.post<BaseResp>(Api.GetProfile, params);
}

/**
 *  author: Ryan Su
 *  @description: change user password
 */
export function changePassword(params: ChangePasswordReq) {
  return requestClient.post<BaseResp>(Api.ChangePassword, {
      params,
  });
}
