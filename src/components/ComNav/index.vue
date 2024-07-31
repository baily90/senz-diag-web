<template>
  <div class="container-nav">
    <img class="icon-logo" src="@/assets/image/icon_logo.png" alt="logo">
    <ComUser :actions="['update', 'logout']">
      <el-button link style="margin: 16px 0 14px 20px">
        <template #icon>
          <el-icon size="18"><Setting /></el-icon>
        </template>
        <span style="margin: 0 3px 0 5px;">{{name}}</span>
        <el-icon><CaretBottom /></el-icon>
      </el-button>
    </ComUser>

    <el-menu
      class="side-menu"
      :default-active="activeMenu"
      router
    >
      <el-menu-item index="/">
        <template #title>
          <el-icon><Monitor /></el-icon>
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/history" style="margin-top: 8px;">
        <template #title>
          <el-icon><Document /></el-icon>
          <span>历史报告</span>
        </template>
      </el-menu-item>
    </el-menu>

    <ReportRule>
      <el-button link style="margin: 76px 0 0 24px;">
        <template #icon>
          <el-icon size="18"><Memo /></el-icon>
        </template>
        <span style="margin-left: 4px;">报告出具规则</span>
      </el-button>
    </ReportRule>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import { Setting, CaretBottom } from '@element-plus/icons-vue'
import ComUser from '@/components/ComUser/index.vue'
import ReportRule from '@/components/ReportRule/index.vue'

const appStore = useAppStore()
const {
  name
} = storeToRefs(appStore)

const route = useRoute()

const activeMenu = computed(() => route.path)
</script>

<style lang='less' scoped>
  .container-nav {
    width: 200px;
    height: 100vh;
    background-color: #fff;
    flex-shrink: 0;
  }
  .icon-logo {
    margin: 16px 0 8px 7px;
    width: 154px;
    height: 32px;
  }
  .side-menu {
    width: 100%;
    border-right: 0;
    :deep(.is-active) {
      background-color: var(--el-menu-hover-bg-color);
    }
  }
</style>
