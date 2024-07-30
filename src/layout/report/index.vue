<template>
  <div class="container-layout-report">
    <ReportHeader />
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
import ReportHeader from '@/components/ReportHeader/index.vue'
</script>

<style lang='less' scoped>
.container-layout-report {
  width: 100%;
  height: 100vh;
  background: url(@/assets/image/bg_report.png) no-repeat top left;
  background-size: 100% auto;

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
