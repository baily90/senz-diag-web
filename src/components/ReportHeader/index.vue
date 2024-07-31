<template>
  <div class="container-report-header">
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
      <!-- 患者信息 -->
      <PatientInfo />

      <!-- 疑难报告 -->
      <!-- isHistory: 是否是历史报告 true/false，is_withdraw：是否是已撤回报告 0正常报告 1撤回报告，is_danger：是否是疑难报告 0否 1是 -->
      <!-- ((!report?.isHistory && !report?.is_withdraw) || (report?.isHistory && !!report?.check?.is_danger)) -->
      <!-- <DangerCheckbox v-if="(!report?.isHistory && !report?.is_withdraw) || (report?.isHistory && !!report?.check?.is_danger)" /> -->
      <DangerCheckbox />

      <!-- 全部正常 -->
      <!-- 全部正常-通用、肠系膜淋巴结部位并且报告详情 不显示全部正常按钮 -->
      <!-- ![4, 5, 7].includes(report?.check?.body_region_id) && !report?.isHistory && !report?.isStruct -->
      <!-- <OneKeyNormal v-if="![4, 5, 7].includes(report?.check?.body_region_id) && !report?.isHistory && !report?.isStruct" /> -->
      <OneKeyNormal />

      <!-- 历史病例 -->
      <!-- patientReport：是否显示患者历史病例 0不显示 1显示 -->
      <!-- !!report?.patientReport -->
      <!-- <PatientCase v-if="!!report?.patientReport" /> -->
      <PatientCase />

      <!-- 作废报告 -->
      <!-- nullifyAccess：是否有作废权限 0没有 1有 -->
      <!-- !!report?.nullifyAccess && !report?.isHistory  -->
      <!-- <DestoryReport v-if="!!report?.nullifyAccess && !report?.isHistory" /> -->
       <DestoryReport />

      <!-- 报告出具规则 -->
      <ReportRule>
        <!-- <el-button type="primary" plain>报告出具规则</el-button> -->
        <el-button link style="color:#fff;text-decoration: underline;">报告出具规则</el-button>
      </ReportRule>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import { useReportStore } from '@/store/report'
import ComUser from '@/components/ComUser/index.vue'
import ReportRule from '@/components/ReportRule/index.vue'
import { User } from '@element-plus/icons-vue'
import PatientInfo from './components/PatientInfo/index.vue'
import DangerCheckbox from './components/DangerCheckbox/index.vue'
import OneKeyNormal from './components/OneKeyNormal/index.vue'
import PatientCase from './components/PatientCase/index.vue'
import DestoryReport from './components/DestoryReport/index.vue'

const appStore = useAppStore()
const reportStore = useReportStore()
const {
  report,
  loading
} = storeToRefs(reportStore)
const {
  name
} = storeToRefs(appStore)

defineProps({
  actions: {
    type: Array,
    default: () => ['home', 'history', 'update', 'logout']
  }
})

</script>

<style lang='less' scoped>
  .container-report-header {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    margin: 0 40px;
    height: 112px;
    padding: 0 40px;
    color: #FFFFFF;
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
      align-items: flex-end;
      gap: 20px;
    }
  }
</style>
