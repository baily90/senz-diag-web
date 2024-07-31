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
      <div class="input-wrap code">
        <el-form-item class="input-code" prop="code">
          <el-input
            v-model="loginFormData.code"
            placeholder="请输入验证码"
            :maxlength="4" >
            <template #prefix>
              <el-icon :size="16" color="#333"><Iphone /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-button
          class="btn-code"
          type="primary"
          :loading="isSendSmsLoading"
          @click="onSendSmsHandle"
          :disabled="time > 0 || isSendSmsLoading"
          >{{time === 0 ? '获取验证码 ' : `${time}s`}}</el-button>
        </div>
      <el-form-item prop="password">
        <el-input
          v-model="loginFormData.password"
          placeholder="6-18位字母或数字"
          type="password"
          :minlength="6"
          :maxlength="18"
          show-password>
          <template #prefix>
            <el-icon :size="16" color="#333"><Lock /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password2">
        <el-input
          v-model="loginFormData.password2"
          placeholder="请确认新登录密码"
          type="password"
          :minlength="6"
          :maxlength="18"
          show-password>
          <template #prefix>
            <el-icon :size="16" color="#333"><Check /></el-icon>
          </template>
        </el-input>
      </el-form-item>
      <el-button
        class="btn-reset"
        type="primary"
        :loading="isResetPasswordLoading"
        @click="onSubmitHandle">重置密码</el-button>
      <el-button
        class="btn-login"
        type="primary"
        link
        @click="onLoginHandle">继续登录</el-button>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, Lock, Check, Iphone } from '@element-plus/icons-vue'
import { useAsyncState } from '@vueuse/core'
import API from '@/api/user'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const time = ref(0)
const loginFormRef = ref()
const loginFormData = ref({
  phone: undefined,
  code: undefined,
  password: undefined,
  password2: undefined
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
  code: [
    {
      required: true,
      message: '请输入验证码',
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
  password2: [
    {
      required: true,
      message: '请输入确认登录密码',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (loginFormData.value.password !== value) {
          callback(new Error('新密码两次输入的不一致'))
        }
        callback()
      },
      trigger: 'blur'
    }
  ]
}

const { isLoading: isResetPasswordLoading, execute: resetPasswordExecute } = useAsyncState(
  (data) => API.resetPassword(data),
  null,
  {
    immediate: false
  }
)

const { isLoading: isSendSmsLoading, execute: sendSmsExecute } = useAsyncState(
  (data) => API.sendSms(data),
  null,
  {
    immediate: false
  }
)

const onSendSmsHandle = async () => {
  try {
    if (time.value > 0) return
    await loginFormRef.value.validateField('phone')
    const phone = loginFormData.value.phone
    const { code, msg } = await sendSmsExecute(0, { phone })
    if (code === 200) {
      time.value = 60
      const timer = setInterval(() => {
        time.value--
        if (time.value <= 0) {
          clearInterval(timer)
        }
      }, 1000)
      ElMessage({
        type: 'success',
        message: msg || '验证码发送成功'
      })
    }
  } catch (error) {
  }
}

const onSubmitHandle = async () => {
  try {
    await loginFormRef.value.validate()
    const requestData = {
      ...loginFormData.value
    }
    const { code } = await resetPasswordExecute(0, requestData)
    if (code === 200) {
      router.replace('/user/login')
      ElMessage({
        type: 'success',
        message: '密码重置成功'
      })
    }
  } catch (error) {
    console.log(error)
  }
}

const onLoginHandle = () => {
  router.replace('/user/login')
}

</script>

<style lang="less" scoped>
@import url(./index.less);
</style>
