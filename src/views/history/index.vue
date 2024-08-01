<template>
  <div class="container-history">
    <el-form ref="formRef" :inline="true" :model="formData" >
      <el-form-item prop="product_id" label="报告产品">
        <el-select v-model="formData.product_id" clearable style="width: 180px;" placeholder="请选择报告产品" >
          <el-option v-for="option in productOptions" :label="option.label" :value="option.value" :key="option.value" />
        </el-select>
      </el-form-item>
      <el-form-item prop="duration" label="报告时间">
        <el-date-picker
          v-model="formData.duration"
          type="datetimerange"
          range-separator="To"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="() => onSearch()">查询</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>

    <ComDataTable
      :loading="isLoading"
      v-bind="tableConfig"
      :listData="dataSource.list"
      @current-change="(val) => onSearch(val)"
      :currentPage="dataSource.pageNum"
      :total="dataSource.count" >
      <template #patient_age="scope">
       {{scope.row.patient_age}}{{ageUnitEnum.find(val => val.value === scope.row.patient_age_unit)?.label}}
      </template>
      <template #action="scope">
        <el-button type="primary" link @click="onDetailHandle(scope.row)" >详情</el-button>
      </template>
    </ComDataTable>

  </div>
</template>

<script setup>
import {ref} from 'vue'
import ComDataTable from '@/components/ComDataTable/index.vue'
import API from '@/api/report'
import {useRouter} from 'vue-router'
import { useAsyncState } from '@vueuse/core'
import { ageUnitEnum } from '@/constants/enums'

const router = useRouter()

const searchParams = ref({
  page: 1,
  product_id: undefined,
  start_time: undefined,
  end_time: undefined,
})
const formRef = ref()
const formData = ref({
  product_id: undefined,
  duration: undefined,
})

const productOptions = ref([])
// start_time, end_time,

const dataSource = ref({})
const tableConfig = {
  propList: [

    { prop: 'id', label: '报告ID', minWidth: '100' },
    { prop: 'product_name', label: '报告产品' },
    { prop: 'patient_name', label: '患者名字', minWidth: '150' },
    { prop: 'patient_age', label: '患者年龄', minWidth: '100', slotName: 'patient_age' },
    { prop: 'create_time', label: '报告发送时间', minWidth: '180' },
    {
      label: '操作',
      minWidth: '80',
      slotName: 'action',
      fixed: 'right',
      headerAlign: 'center'
    }
  ]
}


const { isLoading, execute } = useAsyncState(
  (data) => API.getHistoryReportList(data),
  null,
  {
    immediate: false
  }
)

const onSearch = async (page = 1) => {
  try {
    const requestData = {
      ...formData.value
    }
    const duration = requestData.duration
    if(duration?.length) {
      requestData.start_time = duration[0]
      requestData.end_time = duration[1]
    }else {
      requestData.start_time = undefined
      requestData.end_time = undefined
    }
    delete requestData.duration

    searchParams.value = {
      ...searchParams.value,
      ...requestData,
      page
    }
    const { code, data } = await execute(0, {...searchParams.value})
    if (code === 200) {
      dataSource.value = data
    }
  } catch (error) {
    console.log(error)
  }
}

onSearch()

const onReset = () => {
  formRef.value.resetFields()
  onSearch()
}
const getProductOptions = async () => {
  try {
    const {code, data} = await API.getProductList()
    if(code === 200) {
      productOptions.value = data.map(item => ({label: item.name, value: item.id}))
    }
  } catch (error) {

  }
}
getProductOptions()


const onDetailHandle = ({id}) => {
  router.push(`/report/detail/${id}`)
}
</script>

<style lang="less" scoped>
.container-history {
  width: 100%;
  height: 100%;
  padding: 24px;
  background-color: #fff;
  border-radius: 13px;
}
</style>
