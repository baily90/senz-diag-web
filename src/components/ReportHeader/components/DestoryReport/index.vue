<template>
  <div class="container-destoryReport">
    <el-button type="primary" plain @click="isDialogVisible = true">作废报告</el-button>
    <el-dialog
      v-model="isDialogVisible"
      title="作废报告"
      width="500"
      destroy-on-close
      center
    >
      <el-form ref="formRef"  :model="formData">
        <el-form-item label="作废类型" prop="nullify_map_id" :rules="[{ required: true, message: '请选择作废类型', trigger: 'change' }]">
          <el-select v-model="formData.nullify_map_id" placeholder="请选择作废类型" clearable>
            <el-option v-for="option in destoryTypeOptions" :label="option.label" :value="option.value" :key="option.value" />
          </el-select>
        </el-form-item>

        <el-form-item v-if="[1,2].includes(report?.check?.body_region_id)" label="作废视频" prop="nullify_position" :rules="[{ required: true, message: '请选择作废视频', trigger: 'change' }]">
          <el-select v-model="formData.nullify_position" multiple placeholder="请选择作废视频" clearable>
            <el-option v-for="option in nullifyPositionOptions" :label="option.label" :value="option.value" :key="option.value" />
          </el-select>
        </el-form-item>

        <el-form-item label="备注" prop="remark"  :rules="[{ required: isRemarkRequired, message: '请输入备注', trigger: 'blur' }]">
          <el-input v-model.trim="formData.remark" type="textarea" maxlength="50" show-word-limit placeholder="50字以内的作废原因" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" :loading="isLoading" @click="onSubmitHandle">提交</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { watch, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/store/report'
import { ElMessageBox, ElMessage } from 'element-plus'
import API from '@/api/report'
import { useRouter } from 'vue-router'
import { useAsyncState } from '@vueuse/core'

const router = useRouter()
const reportStore = useReportStore()
const {
  report
} = storeToRefs(reportStore)

const isDialogVisible = ref(false)
const nullifyPositionOptions = computed(() => report.value?.nullify_position_options?.map(item => ({label: item, value: item})))
const destoryTypeOptions = ref([])
const isRemarkRequired = computed(() => !!formData.value.nullify_map_id && destoryTypeOptions.value?.find(item => item.value === formData.value.nullify_map_id)?.label?.indexOf('其他') !== -1)

const formRef = ref()
const formData = ref({
  nullify_map_id: undefined,
  nullify_position: undefined,
  remark: undefined
})

watch(isDialogVisible, () => {
  if (!isDialogVisible.value) {
    formRef.value.resetFields()
    formRef.value.clearValidate()
  }else {
    getDestoryTypeOptions()
  }
})

const getDestoryTypeOptions = async() => {
  try {
    const {code, data} = await API.getDestroyType()
    if(code === 200) {
      destoryTypeOptions.value = data.map(item => ({label: item.title, value: item.id}))
    }
  } catch (error) {

  }
}


const { isLoading, execute } = useAsyncState(
  (data) => API.destroyReport(data),
  null,
  {
    immediate: false
  }
)

const onSubmitHandle = async () => {
  try {
    await formRef.value.validate()
    const requestData = {
      check_id: report.value?.check?.id,
      ...formData.value
    }
    const { code: code1 } = await execute(0, requestData)
    if (code1 === 200) {
      const { code: code2, data } = await API.nextNeedReport({ id: report.value?.check?.id })
        if (code2 === 200) {
          isDialogVisible.value = false
          if (data.id && data.id !== parseInt(report.value?.check?.id)) {
            router.replace(`/report/check/${data.id}`)
          } else {
            ElMessage({
              message: '已经没有报告了',
              type: 'warning'
            })
            router.replace('/')
          }
        }
    }
  } catch (error) {
  }
}

</script>

<style lang="less" scoped>

</style>
