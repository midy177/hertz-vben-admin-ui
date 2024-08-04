<script lang="ts" setup>
import { AuthenticationJwtLogin } from '#/components/authentication';
import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();
</script>

<template>
  <AuthenticationJwtLogin
    :loading="authStore.loginLoading"
    password-placeholder="123456"
    username-placeholder="vben"
    @submit="authStore.authLogin"
  />
</template>
