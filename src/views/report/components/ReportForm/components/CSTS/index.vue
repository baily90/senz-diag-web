<template>
  <div class="container-csts">
    <el-form ref="formRef" :model="formData">
      <el-form-item prop="cs_tips" :rules="[{required: true, message: '请选择超声提示', trigger: 'change'}]">
        <el-checkbox-group v-model="formData.cs_tips">
          <el-checkbox label="Option A" value="Value A" v-for="item in [1,1,1]" :key="item">
            123
            <el-form-item >
              <el-select placeholder="请选择" style="width: 150px;" :disabled="![0].includes(formData.cs_tips)">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            456
            <el-form-item >
              <el-select placeholder="请选择" style="width: 150px;">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
            789
            <el-form-item >
              <el-select placeholder="请选择" style="width: 150px;">
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/store/report'

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
.container-csts {
  :deep(.el-checkbox-group) {
    .el-checkbox{
      align-items: baseline;
      margin-right: 0;
      margin-top: 12px;
      height: auto;
      .el-checkbox__label {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
        gap: 5px;
      }
    }
  }

  // :deep(.el-radio-group) {
  //   width: 100%;
  //   flex-direction: column;
  //   align-items: flex-start;
  //   .el-radio {
  //     margin-bottom: 12px;
  //     margin-right: 0;
  //     white-space: wrap;
  //     width: 100%;
  //     height: auto;
  //     align-items: baseline;
  //     line-height: 24px;
  //     &:last-child {
  //       margin-bottom: 0;
  //     }
  //     .el-radio__label {
  //       width: 100%;
  //     }
  //   }
  // }
}
</style>
