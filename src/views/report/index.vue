<template>
  <ReportMain>
    <template #media>
      <ReportMedia />
    </template>
    <template #form>
      <ReportForm />
    </template>
  </ReportMain>

  <!-- 扫查留言 -->
  <ScanCommentDialog />
  <!-- 超时提示 -->
  <TimeoutTips />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import API from '@/api/report'
import { useRoute, useRouter, onBeforeRouteLeave } from 'vue-router'
import { useReportStore } from '@/store/report'
import ReportMain from '@/components/ReportMain/index.vue'
import ReportMedia from './components/ReportMedia/index.vue'
import ReportForm from './components/ReportForm/index.vue'
import TimeoutTips from './components/TimeoutTips/index.vue'
import ScanCommentDialog from './components/ScanCommentDialog/index.vue'

const router = useRouter()
const route = useRoute()
const reportStore = useReportStore()
const {
  loading,
  report
} = storeToRefs(reportStore)
const getEditReportInfo = async () => {
  try {
    loading.value = true
    const checkId = route.params.id
    const { code, data } = await API.getEditReportInfo(checkId)
    if (code === 200) {
      // 报告详情和历史报告详情共用reportStore, 该自定义字段用于区分是否是历史报告
      data.isHistory = false
      data.body_region_id = data?.check?.body_region_id
      report.value = data
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
}
getEditReportInfo()

// 离开诊断要把当前报告取消诊断放回需求池，否则会占用报告分配的诊断时长（默认十分钟）
// 这里要排除一些异常情况，比如某些接口逻辑需要跳转到登录或者首页，这里要剔除掉否则会死循环
onBeforeRouteLeave(async (to, from, next) => {
  const isInterceptedByError = to.query.interceptedByError
  try {
    if (!isInterceptedByError) {
      await API.cancleReport({ diag_id: report.value?.diag_id })
    }
  } catch (error) {
  } finally {
    next()
  }
})
</script>

<style lang="less" scoped>

</style>
