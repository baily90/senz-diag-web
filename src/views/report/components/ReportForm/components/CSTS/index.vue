<template>
  <div class="container-csts">
    <el-form ref="formRef" :model="formData">
      <el-form-item prop="cs_tips" :rules="[{required: true, message: '请选择超声提示', trigger: 'change'}]">
        <el-checkbox-group v-model="formData.head">
          <el-checkbox label="item" value="item" v-for="item in headOptions" :key="item.value">
            <div class="check-item" v-for="(child, index) in item.children" :key="index">
              <div class="check-item-label" v-if="child.type === 'desc'">{{ child.value }}</div>
              <el-form-item  v-if="child.type === 'checkbox'">
                <el-select placeholder="请选择" style="width: 150px;">
                  <el-option v-for="check in child.options" :key="check.value" :label="check.label" :value="check.value"/>
                </el-select>
              </el-form-item>
            </div>
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

const headOptions = [
  {
    label: '0',
    value: 0,
    children: [
      {
        type: 'desc',
        value: '123'
      },
      {
        type: 'checkbox',
        options: [
          { label: '1-1', value: 1 },
          { label: '1-2', value: 2 }
        ]
      },
      {
        type: 'desc',
        value: '456'
      },
      {
        type: 'checkbox',
        options: [
          { label: '2-1', value: 3 },
          { label: '2-2', value: 4 }
        ]
      },
      {
        type: 'checkbox',
        options: [
          { label: '3-1', value: 5 },
          { label: '3-2', value: 6 }
        ]
      },
      {
        type: 'desc',
        value: '789'
      }
    ]
  }
  // { label: '1', value: 1 },
  // { label: '2', value: 2 },
  // { label: '3', value: 3 },
  // { label: '4', value: 4 },
  // { label: '5', value: 5 },
  // { label: '6', value: 6 }
]

const formRef = ref(null)
const formData = ref({
  head: undefined,
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
