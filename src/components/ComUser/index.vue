<template>
  <div class="container-user">
    <el-dropdown trigger="click">
      <slot></slot>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="Monitor" v-if="actions.includes('home')" @click="goHome">回到首页</el-dropdown-item>
          <el-dropdown-item :icon="Document" v-if="actions.includes('history')" @click="onHistory">历史报告</el-dropdown-item>
          <el-dropdown-item :icon="Lock" v-if="actions.includes('update')" @click="onUpdate">修改密码</el-dropdown-item>
          <el-dropdown-item :icon="SwitchButton" v-if="actions.includes('logout')" @click="onLogout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Lock, SwitchButton, Monitor, Document } from '@element-plus/icons-vue'

const router = useRouter()

defineProps({
  actions: {
    type: Array,
    default: () => ['home', 'history', 'update', 'logout']
  }
})

const goHome = () => router.push('/')

const onHistory = () => router.push('/history')

const onUpdate = () => {
  // 修改密码
}

const onLogout = () => {
  // 清除token
  router.push('/user/login')
}

</script>

<style lang='less' scoped>
  .container-user {

  }
</style>
