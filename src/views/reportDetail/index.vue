<template>
  reportDetail

</template>

<script setup>
import { storeToRefs } from 'pinia'
import API from '@/api/report'
import { useRoute, useRouter } from 'vue-router'
import { useReportStore } from '@/store/report'

const route = useRoute()

const reportStore = useReportStore()
const {
  loading,
  report
} = storeToRefs(reportStore)

const getReportDetailInfo = async () => {
  try {
    loading.value = true
    const checkId = route.params.id
    const { code, data } = await API.getReportDetailInfo(checkId)
    if (code === 200) {
      // 报告详情和历史报告详情共用reportStore, 该自定义字段用于区分是否是历史报告
      data.isHistory = true
      report.value = data
    }
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false
  }
}
getReportDetailInfo()
</script>

<style lang="less" scoped>

</style>
