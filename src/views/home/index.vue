<template>
  <div class="container-home">
    <div class="card wait">
      <CountUp class="value" :end-val="count2 || 0" :duration="1"></CountUp>
      <div class="label">
        <el-image style="width: 24px;height: 24px;" :src="iconReport" fit="cover" />
        <span>等待处理报告数(份)</span>
      </div>
      <el-button
        type="primary"
        size="large"
        style="width: 200px;"
        :disabled="count2 === 0"
        :loading="isReportDealLoading"
        @click="onReportDealHandle">继续处理</el-button>
    </div>
    <div class="cardWrap">
      <div class="card">
        <CountUp class="value" :end-val="count6 || 0" :duration="1"></CountUp>
        <div class="label">今日已处理报告数</div>
      </div>
      <div class="card">
        <CountUp class="value" :end-val="count4 || 0" :duration="1"></CountUp>
        <div class="label">本月累计报告数</div>
      </div>
      <div class="card">
        <CountUp class="value" :end-val="count5 || 0" :duration="1"></CountUp>
        <div class="label">累计处理报告数</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CountUp from 'vue-countup-v3'
import iconReport from '@/assets/image/icon_report.png'
import API from '@/api/home'
import { useRouter } from 'vue-router'

const router = useRouter()

const isReportDealLoading = ref(false)
const count2 = ref(0)
const count4 = ref(0)
const count5 = ref(0)
const count6 = ref(0)

const getHomeInfo = async () => {
  try {
    const { code, data } = await API.getHomeInfo()
    if (code === 200) {
      count2.value = data.count2
      count4.value = data.count4
      count5.value = data.count5
      count6.value = data.count6
    }
  } catch {}
}
getHomeInfo()

const onReportDealHandle = async () => {
  try {
    isReportDealLoading.value = true
    const { code: code1 } = await API.makeOnline()
    if (code1 === 200) {
      const { code: code2, data } = await API.mineCheckWant()
      if (code2 === 200 && data.length) {
        const id = data?.[0]?.id
        router.push(`/report/check/${id}`)
      }
    }
  } catch (error) {

  } finally {
    isReportDealLoading.value = false
  }
}
</script>

<style lang="less" scoped>
.container-home {
  .card {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #fff;
    border-radius: 13px;
    &.wait {
      height: 217px;
      .value {
        font-family: 'DIN-Medium';
        font-size: 45px;
        line-height: 59px;
        color: var(--el-color-primary);
        font-weight: bolder;
      }
      .label {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 24px;
        gap: 1px;
        span {
          font-size: 16px;
          color: #2C2F32;
          line-height: 25px;
        }
      }
    }
  }
  .cardWrap {
    display: flex;
    margin-top: 24px;
    gap: 25px;
    .card {
      height: 160px;
      .value {
        font-family: 'DIN-Medium';
        font-size: 36px;
        color: #2C2F32;
        line-height: 45px;
        font-weight: bolder;
      }
      .label {
        font-size: 14px;
        margin-top: 16px;
        color: #4E5055;
        line-height: 25px;
      }
    }
  }
}
</style>
