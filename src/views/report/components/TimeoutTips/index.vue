<template>
  <el-dialog
    title="温馨提示"
    width="350"
    v-model="visible"
    destroy-on-close
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    center
    :append-to-body="true">
      <div style="text-align: center; line-height: 28px;">
        当前报告已处理超过10分钟，是否继续处理?<br/>
      <span style="color: red">{{time}}秒</span>后将报告退回平台并回到首页
      </div>
    <template #footer>
      <el-button type="primary" :loading="isLoading" @click="continueReport">继续处理</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/store/report'
import { useAppStore } from '@/store/app'
import dayjs from 'dayjs'
import { ElMessage, ElNotification } from 'element-plus'
import API from '@/api/report'
import { useAsyncState } from '@vueuse/core'
import { useRouter } from 'vue-router'

const router = useRouter()
const initialTime = ref(dayjs().unix())
const reportStore = useReportStore()
const appStore = useAppStore()
const {
  report,
  loading
} = storeToRefs(reportStore)
const { requestInvalidRedirect } = appStore

const visible = ref(false)
let remainInterval, timerInterval
const time = ref(30) // 30s倒计时
const remainTime = ref(0) // 报告剩余处理时间（秒）

watch(() => report.value, (val) => {
  if (val?.remain_time) {
    remainTime.value = val?.remain_time - 55
    setRemainCountDown()
  }
})

const { isLoading, execute } = useAsyncState(
  (data) => API.continueReport(data),
  null,
  {
    immediate: false
  }
)

const setRemainCountDown = () => {
  if (remainInterval) clearInterval(remainInterval)
  remainInterval = setInterval(async () => {
    const currentTime = dayjs().unix()
    if (currentTime - initialTime.value >= remainTime.value) {
      clearInterval(remainInterval)
      setCountDownNum()
    }
  }, 1000)
}

const setCountDownNum = async () => {
  if (timerInterval) clearInterval(timerInterval)
  time.value = 30
  timerInterval = setInterval(() => {
    time.value--
    if (time.value <= 0) {
      clearInterval(timerInterval)
      visible.value = false
      ElNotification({
        message: '由于您处理单个报告已超过10分钟，且未选择继续出报告，系统已将您的报告退回分配列表',
        type: 'warning',
        duration: 5000,
        showClose: true
      })
      requestInvalidRedirect('/')
    }
  }, 1000)
  visible.value = true
}

const continueReport = async () => {
  try {
    if (timerInterval) clearInterval(timerInterval)
    const { code, data } = await execute(0, { diag_id: report.value?.diag_id })
    if (code === 200) {
      visible.value = false
      if (data.check_id === report.value?.check?.id) {
        remainTime.value = data.remain_time - 55
        initialTime.value = dayjs().unix()
        setRemainCountDown()
      } else {
        if (timerInterval) clearInterval(timerInterval)
        router.replace(`/report/check/${data.check_id}`)
      }
    }
  } catch (error) {

  }
}

</script>

<style lang="less" scoped>

</style>
