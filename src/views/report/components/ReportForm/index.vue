<template>
  <div class="container-report-form">
    <el-button class="btn-preview" type="primary" @click="onPreviewReport()">预览报告</el-button>
    <el-tabs v-model="tabActiveName">
      <el-tab-pane name="cssj">
        <template #label>
          <div class="label">超声所见</div>
        </template>
        <CSSJ />
      </el-tab-pane>
      <el-tab-pane name="csts">
        <template #label>
          <div class="label">超声提示</div>
        </template>
        <CSTS ref="cstsFormRef" />
      </el-tab-pane>
      <el-tab-pane name="jkjy">
        <template #label>
          <div class="label">健康建议</div>
        </template>
        <JKJY ref="jkjyFormRef" />
      </el-tab-pane>
      <el-tab-pane name="ysqm">
        <template #label>
          <div class="label">医师签名</div>
        </template>
        <YSQM ref="ysqmFormRef" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/store/report'
import CSSJ from './components/CSSJ/index.vue'
import CSTS from './components/CSTS/index.vue'
import JKJY from './components/JKJY/index.vue'
import YSQM from './components/YSQM/index.vue'

const reportStore = useReportStore()
const {
  tabActiveName
} = storeToRefs(reportStore)

const jkjyFormRef = ref(null)
const ysqmFormRef = ref(null)
const cstsFormRef = ref(null)
const onPreviewReport = async () => {
  try {
    const cstsFlag = await cstsFormRef.value.validate()
    if (cstsFlag) {
      const jkjyFlag = await jkjyFormRef.value.validate()
      if (jkjyFlag) {
        const jsqmFlag = await ysqmFormRef.value.validate()
        if (jsqmFlag) {
          console.log({
            ...jkjyFormRef.value.formData,
            ...ysqmFormRef.value.formData
          })
        }
        tabActiveName.value = 'ysqm'
      } else {
        tabActiveName.value = 'jkjy'
      }
    } else {
      tabActiveName.value = 'csts'
    }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style lang="less" scoped>
.container-report-form {
  position: relative;
  width: 100%;
  padding: 0 10px;

  .btn-preview {
    position: absolute;
    top: 6px;
    right: 10px;
    z-index: 1;
  }
  .label {
    font-size: 15px;
  }

  :deep(.el-tabs__header) {
    margin: 0;
  }
  :deep(.el-tabs__item) {
    padding: 0 10px;
  }
  :deep(.el-tabs__content) {
    height: calc(100vh - 182px);
    padding: 15px 0 0 0;
    overflow: auto;
  }
  :deep(.el-tabs__nav-wrap::after) {
    display: none;
  }

}
</style>
