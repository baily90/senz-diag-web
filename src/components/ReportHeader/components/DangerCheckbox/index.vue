<template>
  <div class="container-dangerCheckbox">
    <el-checkbox border v-model="isDanger" @change="onIsDangerChange"><span style="color: #fff; " >疑难报告</span></el-checkbox>
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

const onIsDangerChange = async (val) => {
  if (val) {
    try {
      await ElMessageBox.confirm(
        '如您对当前报告结果不确定可勾选此项，勾选后可转交至平台其他医生处理或自行判断处理',
        '疑难报告',
        {
          confirmButtonText: '转交其他处理人',
          cancelButtonText: '自行处理',
          type: 'warning'
        }
      )
      const { code: code1 } = await API.handToOthers(report.value?.check?.id)
      if (code1 === 200) {
        const { code: code2, data } = await API.nextNeedReport({ id: report.value?.check?.id })
        if (code2 === 200) {
          if (data.id && data.id !== parseInt(report.value?.check?.id)) {
            router.replace(`/report/check/${data.id}`)
          } else {
            ElMessage({
              message: '已经没有报告了',
              type: 'warning'
            })
            router.replace('/')
          }
        }
      }
    } catch (error) {
    }
  }
}
</script>

<style lang="less" scoped>

</style>
