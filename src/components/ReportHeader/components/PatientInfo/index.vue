<template>
  <div class="container-patient-info">
    <div class="patient-info-item">
      <div class="label">患者姓名</div>
      <div class="value">{{patientInfo?.name}}</div>
    </div>
    <div class="patient-info-item">
      <div class="label">性别</div>
      <div class="value">{{patientInfo?.gender}}</div>
    </div>
    <div class="patient-info-item">
      <div class="label">年龄</div>
      <div class="value">{{patientInfo?.age}}</div>
    </div>
    <div class="patient-info-item">
      <div class="label">检查项目</div>
      <div class="value">{{patientInfo?.productName}}</div>
    </div>
    <div class="patient-info-item">
      <div class="label">检查时间</div>
      <div class="value">{{patientInfo.checkTime}}</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/store/report'
import { genderEnum, ageUnitEnum } from '@/constants/enums'
import dayjs from 'dayjs'

const reportStore = useReportStore()
const {
  report
} = storeToRefs(reportStore)

const patientInfo = computed(() => {
  const patient = report.value?.patient
  const check = report.value?.check
  const unit = ageUnitEnum.find(val => val.value === patient?.age_unit)?.label
  return {
    name: report.value?.patient?.name,
    gender: genderEnum.find(val => val.value === patient?.gender)?.label,
    age: `${patient?.age}${unit}`,
    productName: check?.product_name,
    checkTime: dayjs.unix(check?.create_time).format('YYYY-MM-DD HH:mm:ss')
  }
})
</script>

<style lang="less" scoped>
.container-patient-info {
  display: flex;
  gap: 40px;
  .patient-info-item {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    .label {
      margin-bottom: 3px;
      font-size: 13px;
      color: #CFE9FF;
      line-height: 18px;
    }
    .value {
      font-size: 16px;
      color: #FFFFFF;
      line-height: 22px;
    }
  }
}
</style>
