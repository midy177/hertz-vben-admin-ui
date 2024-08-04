import type { UserInfo } from '@vben/types';

import { ref } from 'vue';
import { useRouter } from 'vue-router';

import { DEFAULT_HOME_PATH, LOGIN_PATH } from '@vben/constants';
import { resetAllStores, useAccessStore, useUserStore } from '@vben/stores';

import { notification } from 'ant-design-vue';
import { defineStore } from 'pinia';

import { getAccessCodes } from '#/api';
import { login, getUserInfo } from '#/api/sys/user';
import { $t } from '#/locales';
import { LoginAndRegisterJwtParams } from "#/components/authentication/typings";
import {UserInfoModel} from "#/api/sys/model/userModel";

export const useAuthStore = defineStore('auth', () => {
  const accessStore = useAccessStore();
  const userStore = useUserStore();
  const router = useRouter();

  const loginLoading = ref(false);

  /**
   * 异步处理登录操作
   * Asynchronously handle the login process
   * @param params 登录表单数据
   * @param onSuccess
   */
  async function authLogin(
    params: LoginAndRegisterJwtParams,
    onSuccess?: () => Promise<void> | void,
  ) {
    // 异步处理用户登录操作并获取 accessToken
    let userInfo: null | UserInfo = null;
    try {
      loginLoading.value = true;
      const { data } = await login(params);

      // 如果成功获取到 accessToken
        // 将 accessToken 存储到 accessStore 中
        accessStore.setAccessToken(data.token);
        // accessStore.setRefreshToken(data.token);

        // 获取用户信息并存储到 accessStore 中
        const [fetchUserInfoResult, accessCodes] = await Promise.all([
          fetchUserInfo(),
          getAccessCodes(),
        ]);

        userInfo = fetchUserInfoResult;

        userStore.setUserInfo(userInfo);
        accessStore.setAccessCodes(accessCodes);

        if (accessStore.loginExpired) {
          accessStore.setLoginExpired(false);
        } else {
          onSuccess
            ? await onSuccess?.()
            : await router.push(userInfo.homePath || DEFAULT_HOME_PATH);
        }

        if (userInfo?.realName) {
          notification.success({
            description: `${$t('authentication.loginSuccessDesc')}:${userInfo?.realName}`,
            duration: 3,
            message: $t('authentication.loginSuccess'),
          });
        }
    } finally {
      loginLoading.value = false;
    }

    return {
      userInfo,
    };
  }

  async function logout() {
    resetAllStores();
    accessStore.setLoginExpired(false);

    // 回登陆页带上当前路由地址
    await router.replace({
      path: LOGIN_PATH,
      query: {
        redirect: encodeURIComponent(router.currentRoute.value.fullPath),
      },
    });
  }

  async function fetchUserInfo() {
    let userInfo = await getUserInfo();
    userStore.setUserInfo({
      avatar: userInfo.data.avatar,
      realName: userInfo.data.nickname,
      // roles: userInfo.data.roles,
      userId: userInfo.data.userId.toString(),
      username: userInfo.data.username,
    });
    return userInfo;
  }

  function $reset() {
    loginLoading.value = false;
  }

  return {
    $reset,
    authLogin,
    fetchUserInfo,
    loginLoading,
    logout,
  };
});
