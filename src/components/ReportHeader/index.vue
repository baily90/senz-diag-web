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
      <div class="patient-info">
        <div class="patient-info-item">
          <div class="label">患者姓名</div>
          <div class="value">文刘璀瑶</div>
        </div>
        <div class="patient-info-item">
          <div class="label">性别</div>
          <div class="value">女</div>
        </div>
        <div class="patient-info-item">
          <div class="label">年龄</div>
          <div class="value">28岁</div>
        </div>
        <div class="patient-info-item">
          <div class="label">检查项目</div>
          <div class="value">甲状腺检查</div>
        </div>
        <div class="patient-info-item">
          <div class="label">检查时间</div>
          <div class="value">2020/10/23 13:26:19</div>
        </div>
      </div>
      <!-- 疑难报告 -->
      <!-- ((!is_history && !is_withdraw) || (is_history && !!is_danger)) -->

      <!-- 全部正常 -->
      <!-- 全部正常-通用、肠系膜淋巴结部位并且报告详情 不显示全部正常按钮 -->
      <!-- ![4, 5, 7].includes(body_region_id) && !is_history && isStruct !== 1 -->

      <!-- 历史病例 -->
      <!-- patientReport === 1 -->

      <!-- 作废报告 -->
      <!-- nullifyAccess === 1 && !is_history  -->

      <!-- 报告出具规则 -->
      <ReportRule>
        <el-button link style="color:#fff;text-decoration: underline;">报告出具规则</el-button>
      </ReportRule>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/store/app'
import ComUser from '@/components/ComUser/index.vue'
import ReportRule from '@/components/ReportRule/index.vue'
import { User } from '@element-plus/icons-vue'

const appStore = useAppStore()
const {
  name
} = storeToRefs(appStore)

defineProps({
  actions: {
    type: Array,
    default: () => ['home', 'history', 'update', 'logout']
  }
})

const goHome = () => router.push('/')

const onHistory = () => router.push('/history')

const onUpdate = () => {
  // 修改密码
}

const onLogout = async() => {
  try {
    await ElMessageBox.confirm(
      '确认要退出登录吗？退出登录后会将您名下的报告分配给其他医生。',
      '退出登录',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
    token.value = null
    router.replace('/user/login')
  } catch (error) {

  }
}

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
    // background-color: rgba(255, 255, 255, .3);
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
      .patient-info {
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
    }
  }
</style>
