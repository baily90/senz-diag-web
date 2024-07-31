<template>
  <div class="container-destoryReport">
    <el-button type="primary" plain >作废报告</el-button>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/store/report'
import { ElMessageBox, ElMessage } from 'element-plus'
import API from '@/api/report'
import { useRouter } from 'vue-router'

const router = useRouter()
const reportStore = useReportStore()
const {
  report
} = storeToRefs(reportStore)

const isDanger = ref(false)
watch(() => report.value, (val) => {
  isDanger.value = !!val?.check?.is_danger
})

</script>

<style lang="less" scoped>

</style>
