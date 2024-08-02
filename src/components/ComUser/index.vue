<template>
    <el-dropdown trigger="click">
      <slot></slot>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="Monitor" v-if="actions.includes('home')" @click="onGoHome">回到首页</el-dropdown-item>
          <el-dropdown-item :icon="Document" v-if="actions.includes('history')" @click="onGo2History">历史报告</el-dropdown-item>
          <el-dropdown-item :icon="Lock" v-if="actions.includes('update')" @click="onChangePassword">修改密码</el-dropdown-item>
          <el-dropdown-item :icon="SwitchButton" v-if="actions.includes('logout')" @click="onLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <el-dialog
      v-model="isDialogVisible"
      title="修改密码"
      width="500"
      destroy-on-close
      center
    >
      <el-form ref="formRef" size="large" :model="formData" :rules="rules">
        <el-form-item label="原密码" prop="old_password" >
          <el-input v-model="formData.old_password" placeholder="请输入原密码" type="password" show-password />
        </el-form-item>
        <el-form-item label="新密码" prop="new_password" >
          <el-input v-model="formData.new_password" placeholder="6-18位字母或数字" type="password" show-password/>
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirm_password" >
          <el-input v-model="formData.confirm_password" placeholder="请再次输入新密码" type="password" show-password/>
        </el-form-item>
        <el-form-item>
          <el-button style="width: 100%" type="primary" :loading="isLoading" @click="onSubmitHandle">确认修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Lock, SwitchButton, Monitor, Document } from '@element-plus/icons-vue'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'
import { useAsyncState } from '@vueuse/core'
import API from '@/api/user'
import { ElMessageBox, ElMessage } from 'element-plus'

const appStore = useAppStore()
const {
  token
} = storeToRefs(appStore)
const router = useRouter()

defineProps({
  actions: {
    type: Array,
    default: () => ['home', 'history', 'update', 'logout']
  }
})

const isDialogVisible = ref(false)
const formRef = ref()
const formData = ref({
  old_password: undefined,
  new_password: undefined,
  confirm_password: undefined
})

const rules = ref({
  old_password: [
    {
      required: true,
      message: '请输入原密码',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (!/^[A-Za-z0-9]{6,18}$/.test(value)) {
          callback(new Error('原密码格式不符合要求'))
        }
        callback()
      },
      trigger: 'blur'
    }
  ],
  new_password: [
    {
      required: true,
      message: '请输入新密码',
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
  confirm_password: [
    {
      required: true,
      message: '请再次输入新密码',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        if (formData.value.new_password !== value) {
          callback(new Error('新密码两次输入的不一致'))
        }
        callback()
      },
      trigger: 'blur'
    }
  ]
})

watch(isDialogVisible, () => {
  if (!isDialogVisible.value) {
    formRef.value.resetFields()
    formRef.value.clearValidate()
  }
})

const { isLoading, execute } = useAsyncState(
  (data) => API.changePassword(data),
  null,
  {
    immediate: false
  }
)

const onGoHome = () => router.push('/')

const onGo2History = () => router.push('/history')

const onChangePassword = () => {
  isDialogVisible.value = true
}

const onLogout = async () => {
  try {
    await ElMessageBox.confirm(
      '确认要退出登录吗？退出登录后会将您名下的报告分配给其他医生。',
      '退出登录',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    token.value = null
    router.replace('/user/login')
  } catch (error) {

  }
}

const onSubmitHandle = async () => {
  try {
    await formRef.value.validate()
    const requestData = {
      ...formData.value
    }
    const { code, msg } = await execute(0, requestData)
    if (code === 200) {
      token.value = null
      router.replace('/user/login')
      ElMessage({
        type: 'success',
        message: msg || '密码修改成功'
      })
    }
  } catch (error) {
    console.log(error)
  }
}
</script>
