<template>
  <div class="container-jkjy">
    <el-form ref="formRef" :model="formData">
      <el-form-item prop="health_proposal" :rules="[{required: true, message: '请选择健康建议', trigger: 'change'}]">
        <el-radio-group v-model="formData.health_proposal" @change="onHealthProposalChange">
          <el-radio v-for="option in healthProposalOptions" :key="option.value" :value="option.value">
            {{option.title}} <br />{{option.desc}}
            <el-form-item prop="health_proposal_des" v-if="formData.health_proposal === option.value" style="margin-top: 5px">
              <el-input v-model="formData.health_proposal_des" type="textarea" :rows="3" placeholder="可输入其他健康建议" maxlength="200" show-word-limit />
            </el-form-item>
          </el-radio>
        </el-radio-group>
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
  health_proposal: undefined,
  health_proposal_des: undefined
})

const healthProposalOptions = computed(() => options[report.value?.body_region_id])

const onHealthProposalChange = () => { formData.value.health_proposal_des = undefined }

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
