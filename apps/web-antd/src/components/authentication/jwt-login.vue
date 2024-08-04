<script setup lang="ts">
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

import { $t } from '@vben/locales';
import {
  VbenButton,
  VbenCheckbox,
  VbenInput,
  VbenInputPassword,
} from '@vben-core/shadcn-ui';

import Title from './auth-title.vue';
import ThirdPartyLogin from './third-party-login.vue';
import {AuthenticationProps, LoginJwtEmits} from './typings';
import {getCaptcha} from "#/api/sys/user";
import { Input } from "#/components/input";

interface Props extends AuthenticationProps {}

defineOptions({
  name: 'AuthenticationJwtLogin',
});

withDefaults(defineProps<Props>(), {
  codeLoginPath: '/auth/code-login',
  forgetPasswordPath: '/auth/forget-password',
  loading: false,
  passwordPlaceholder: '',
  qrCodeLoginPath: '/auth/qrcode-login',
  registerPath: '/auth/register',
  showCodeLogin: true,
  showForgetPassword: true,
  showQrcodeLogin: true,
  showRegister: true,
  showRememberMe: true,
  showThirdPartyLogin: true,
  subTitle: '',
  title: '',
  usernamePlaceholder: '',
  captchaPlaceholder: '',
});

const emit = defineEmits<{
  submit: LoginJwtEmits['submit'];
}>();

const router = useRouter();

const REMEMBER_ME_KEY = `REMEMBER_ME_USERNAME_${location.hostname}`;

const localUsername = localStorage.getItem(REMEMBER_ME_KEY) || '';

const formState = reactive({
  password: '',
  rememberMe: !!localUsername,
  submitted: false,
  username: localUsername,
  imgPath: '',
  captcha: '',
  captchaId: '',
});

const usernameStatus = computed(() => {
  return formState.submitted && !formState.username ? 'error' : 'default';
});

const passwordStatus = computed(() => {
  return formState.submitted && !formState.password ? 'error' : 'default';
});

const captchaStatus = computed(() => {
  return formState.submitted && !formState.captcha ? 'error' : 'default';
});

const captchaIdStatus = computed(() => {
  return formState.submitted && !formState.captchaId ? 'error' : 'default';
});

function handleSubmit() {
  formState.submitted = true;

  if (
    usernameStatus.value !== 'default' ||
    passwordStatus.value !== 'default' ||
    captchaStatus.value !== 'default' ||
    captchaIdStatus.value !== 'default'
  ) {
    return;
  }

  localStorage.setItem(
    REMEMBER_ME_KEY,
    formState.rememberMe ? formState.username : '',
  );

  emit('submit', {
    username: formState.username,
    password: formState.password,
    captcha: formState.captcha,
    captchaId: formState.captchaId,
  });
}

function handleGo(path: string) {
  router.push(path);
}
// get captcha
async function getCaptchaData() {
  const captcha = await getCaptcha();
  if (captcha.data) {
    formState.captchaId = captcha.data.captchaID;
    formState.imgPath = captcha.data.imgPath;
  }
}

getCaptchaData();
</script>

<template>
  <div @keypress.enter.prevent="handleSubmit">
    <Title>
      {{ title || `${$t('authentication.welcomeBack')} 👋🏻` }}
      <template #desc>
        <span class="text-muted-foreground">
          {{ subTitle || $t('authentication.loginSubtitle') }}
        </span>
      </template>
    </Title>

    <VbenInput
      v-model="formState.username"
      :autofocus="false"
      :error-tip="$t('authentication.usernameTip')"
      :label="$t('authentication.username')"
      :placeholder="usernamePlaceholder || $t('authentication.username')"
      :status="usernameStatus"
      name="username"
      required
      type="text"
    />
    <VbenInputPassword
      v-model="formState.password"
      :error-tip="$t('authentication.passwordTip')"
      :label="$t('authentication.password')"
      :placeholder="passwordPlaceholder || $t('authentication.password')"
      :status="passwordStatus"
      name="password"
      required
      type="password"
    />
    <Input
      v-model="formState.captcha"
      :autofocus="false"
      :error-tip="$t('authentication.captchaTip')"
      :label="$t('authentication.captcha')"
      :placeholder="captchaPlaceholder || $t('authentication.captcha')"
      :status="captchaStatus"
      name="captcha"
      required
      type="text"
    >
      <template #suffix>
        <img :src="formState.imgPath" class="absolute right-0 h-full cursor-pointer" alt="captcha" @click="getCaptchaData"/>
      </template>
    </Input>

    <div class="mb-6 mt-4 flex justify-between">
      <div v-if="showRememberMe" class="flex-center">
        <VbenCheckbox v-model:checked="formState.rememberMe" name="rememberMe">
          {{ $t('authentication.rememberMe') }}
        </VbenCheckbox>
      </div>

      <span
        v-if="showForgetPassword"
        class="text-primary hover:text-primary-hover active:text-primary-active cursor-pointer text-sm font-normal"
        @click="handleGo(forgetPasswordPath)"
      >
        {{ $t('authentication.forgetPassword') }}
      </span>
    </div>
    <VbenButton :loading="loading" class="w-full" @click="handleSubmit">
      {{ $t('common.login') }}
    </VbenButton>

    <div class="mb-2 mt-4 flex items-center justify-between">
      <VbenButton
        v-if="showCodeLogin"
        class="w-1/2"
        variant="outline"
        @click="handleGo(codeLoginPath)"
      >
        {{ $t('authentication.mobileLogin') }}
      </VbenButton>
      <VbenButton
        v-if="showQrcodeLogin"
        class="ml-4 w-1/2"
        variant="outline"
        @click="handleGo(qrCodeLoginPath)"
      >
        {{ $t('authentication.qrcodeLogin') }}
      </VbenButton>
    </div>

    <!-- 第三方登录 -->
    <ThirdPartyLogin v-if="showThirdPartyLogin" />

    <div v-if="showRegister" class="text-center text-sm">
      {{ $t('authentication.accountTip') }}
      <span
        class="text-primary hover:text-primary-hover active:text-primary-active cursor-pointer text-sm font-normal"
        @click="handleGo(registerPath)"
      >
        {{ $t('authentication.createAccount') }}
      </span>
    </div>
  </div>
</template>
