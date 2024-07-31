<template>
  <div class="container-history">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="Approved by">
        <el-input  placeholder="Approved by" clearable />
      </el-form-item>
      <el-form-item label="Activity zone">
        <el-select

            placeholder="Activity zone"
            clearable
          >
            <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>

    <ComDataTable
      :loading="isLoading"
      v-bind="tableConfig"
      :listData="dataSource.list"
      @current-change="handleCurrentChange"
      :currentPage="dataSource.pageNum"
      :total="dataSource.count" >
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

const router = useRouter()
const dataSource = ref({})
const tableConfig = {
  propList: [

    { prop: 'id', label: '报告ID', minWidth: '100' },
    { prop: 'product_name', label: '报告产品' },
    { prop: 'patient_name', label: '患者名字', minWidth: '150' },
    { prop: 'patient_age', label: '患者年龄', minWidth: '100' },
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

const page = ref(1)
const isLoading = ref(false)

const getHistoryReportList = async() => {
  try {
    isLoading.value = true
    const {code, data} = await API.getHistoryReportList(page.value)
    if(code === 200) {
      data.list = [...data.list, ...data.list]
      dataSource.value = data
    }
  } catch (error) {

  }finally {
    isLoading.value = false
  }
}
getHistoryReportList()

const handleCurrentChange = () => {

}



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
