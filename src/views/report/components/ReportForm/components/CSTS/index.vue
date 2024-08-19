<template>
  <div class="container-csts">
    <el-form ref="formRef" :model="formData">
      <el-form-item prop="cs_tips" :rules="[{required: true, message: '请选择超声提示', trigger: 'change'}]">

      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/store/report'
import options from '@/constants/healthProposalOptions.js'

const reportStore = useReportStore()
const {
  report
} = storeToRefs(reportStore)

const formRef = ref(null)
const formData = ref({
  cs_tips: undefined,
  cs_tip_des: undefined
})

const validate = async () => {
  try {
    return await formRef.value.validate()
  } catch (error) {
    return false
  }
}

defineExpose({
  validate,
  formData
})
</script>

<style lang="less" scoped>
.container-jkjy {
  :deep(.el-radio-group) {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    .el-radio {
      margin-bottom: 12px;
      margin-right: 0;
      white-space: wrap;
      width: 100%;
      height: auto;
      align-items: baseline;
      line-height: 24px;
      &:last-child {
        margin-bottom: 0;
      }
      .el-radio__label {
        width: 100%;
      }
    }
  }
}

</style>
