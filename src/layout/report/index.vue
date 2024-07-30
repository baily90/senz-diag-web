<template>
  <div class="container-layout-report">
    <div class="report-header">
      <div class="report-title">
        <div class="hospital-name">暖欣互联网医院</div>
        <ComUser :actions="['home', 'history', 'update', 'logout']">
          <el-button link style="color:#fff">
            <el-avatar :size="24" :icon="User" />
            <span style="margin: 0 3px 0 5px;">{{name}}</span>
            <el-icon ><CaretBottom /></el-icon>
          </el-button>
        </ComUser>
      </div>
      <div class="check-info">
        check-info
        <ReportRule>
          <el-button link style="color:#fff;text-decoration: underline;">报告出具规则</el-button>
        </ReportRule>
      </div>
    </div>
    <div class="report-content">
      <RouterView v-slot="{ Component }">
        <Suspense>
          <!-- 主要内容 -->
          <component :is="Component"></component>
          <!-- 加载中状态 -->
          <template #fallback>
            <el-skeleton animated />
          </template>
        </Suspense>
      </RouterView>
    </div>
  </div>
</template>

<script setup>
import ReportRule from '@/components/ReportRule/index.vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import { User } from '@element-plus/icons-vue'

const appStore = useAppStore()
const {
  name
} = storeToRefs(appStore)
</script>

<style lang='less' scoped>
.container-layout-report {
  width: 100%;
  height: 100vh;
  background: url(@/assets/image/bg_report.png) no-repeat top left;
  background-size: 100% auto;
  .report-header {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    margin: 0 40px;
    height: 112px;
    padding: 0 40px;
    color: #FFFFFF;
    background-color: rgba(255, 255, 255, .3);
    .report-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .hospital-name {
        font-weight: 600;
        font-size: 19px;
      }
    }
    .check-info {
      display: flex;
    }
  }
  .report-content {
    margin: 0 40px;
    height: calc(100vh - 112px - 30px);
    background-color: #fff;
    border-radius: 13px;
    box-shadow: 0px 10px 25px 0px rgba(28,34,38,0.06);
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
