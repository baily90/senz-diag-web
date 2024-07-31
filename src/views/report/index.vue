<template>
  report

  <!-- 扫查留言 -->
  <ScanCommentDialog />
  <!-- 超时提示 -->
  <TimeoutTips />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import API from '@/api/report'
import { useRoute, useRouter } from 'vue-router'
import { useReportStore } from '@/store/report'
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
      report.value = data
    }
  } catch (error) {
  } finally {
    loading.value = false
  }
}
getEditReportInfo()
</script>

<style lang="less" scoped>

</style>
