<template>
  <div class="container-login">
    <img class="icon-app" src="./../../assets/image/icon_app.png" alt="icon-app">
    <el-form
      ref="loginFormRef"
      size="large"
      :model="loginFormData"
      :rules="loginFormRules"
      class="form-login"
    >
      <el-form-item prop="phone">
        <el-input
          v-model="loginFormData.phone"
          placeholder="请输入手机号"
          :maxlength="11">
          <template #prefix>
            <el-icon :size="16" color="#333"><User /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginFormData.password"
          placeholder="请输入登录密码"
          type="password"
          show-password>
          <template #prefix>
            <el-icon :size="16" color="#333"><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <div class="input-wrap captcha">
        <el-form-item class="input-captcha" prop="captcha">
          <el-input
            v-model="loginFormData.captcha"
            placeholder="请输入验证码"
            :maxlength="4" />
        </el-form-item>
        <el-image
          class="img-captcha"
          :src="captchaImageUrl"
          fit="fill"
          v-loading="isCaptchaLoading"
          @click="getCaptchaImage">
          <template #error>
            <div class="image-slot"></div>
          </template>
        </el-image>
      </div>
      <div class="input-wrap rember">
        <el-checkbox v-model="isRember" label="记住密码" />
        <el-button type="primary" link @click="onForgotHandle">忘记密码</el-button>
      </div>
      <el-button
        class="btn-login"
        type="primary"
        :auto-insert-space="true"
        :loading="isLoginLoading"
        @click="onSubmitHandle">登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { useAsyncState, onKeyStroke } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import API from '@/api/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const appStore = useAppStore()
const {
  isRember,
  phone,
  password,
  token,
  name
} = storeToRefs(appStore)

const router = useRouter()

const captchaImageUrl = ref()
const sign = ref()

const loginFormRef = ref()
const loginFormData = ref({
  phone: isRember.value ? phone.value : undefined,
  password: isRember.value ? password.value : undefined
})
const loginFormRules = {
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'blur'
    },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入登录密码',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (!/^[A-Za-z0-9]{6,18}$/.test(value)) {
          callback(new Error('密码格式不符合要求'))
        }
        callback()
      },
      trigger: 'blur'
    }
  ],
  captcha: [
    {
      required: true,
      message: '请输入验证码',
      trigger: 'blur'
    }
  ]
}

const { isLoading: isLoginLoading, execute: loginExecute } = useAsyncState(
  (data) => API.login(data),
  null,
  {
    immediate: false
  }
)

const { isLoading: isCaptchaLoading, execute: captchaExecute } = useAsyncState(
  (data) => API.getCaptchaImage(),
  null,
  {
    immediate: false
  }
)

const getCaptchaImage = async () => {
  try {
    const { code, data } = await captchaExecute()
    if (code === 200) {
      captchaImageUrl.value = data.base64
      sign.value = data.sign
    }
  } catch (error) {

  }
}

getCaptchaImage()

const onSubmitHandle = async () => {
  try {
    await loginFormRef.value.validate()
    const requestData = {
      ...loginFormData.value,
      sign: sign.value
    }
    const { code, data } = await loginExecute(0, requestData)
    if (code === 200) {
      if (isRember.value) {
        phone.value = requestData.phone
        password.value = requestData.password
      } else {
        phone.value = undefined
        password.value = undefined
      }
      token.value = data.token
      name.value = data.name
      router.replace('/')

      ElMessage({
        type: 'success',
        message: '登录成功'
      })
    }
  } catch (error) {
    console.log(error)
  }
}

onKeyStroke('Enter', () => {
  onSubmitHandle()
})

const onForgotHandle = () => {
  router.push('/user/forgot')
}

</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
