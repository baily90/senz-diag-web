<template>
  <div class="container-report-form">
    <el-form
      ref="formRef"
      :model="formData"
    >
      <el-form-item prop="name" label="姓名" :rules="[{required: true,message: '请输入姓名',trigger: 'blur'}]">
        <el-input v-model="formData.name" />
      </el-form-item>

      <el-form-item prop="hobbies" label="爱好" :rules="[{required: true,message: '请选择爱好',trigger: 'change'}]">
        <el-checkbox-group v-model="formData.hobbies">
          <el-form-item :prop="'hobbies.'+hobbyIndex+'.value'" v-for="(hobby, hobbyIndex) in formData.hobbies" :key="hobbyIndex">
            <el-checkbox label="体能" :value="1" />
            <el-select
              v-model="hobby.value"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <!-- <el-checkbox label="足球" />
          <el-checkbox label="乒乓球" /> -->
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        {{formData}}
        <el-button type="primary" @click="submitForm">Submit</el-button>
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
  name: '111',
  hobbies: [
    {
      label: '体能',
      value: [

      ]
    }
  ]
})

const options = ref([
  { label: '选项1', value: 1 },
  { label: '选项2', value: 2 }
])
const submitForm = async () => {
  if (!formRef.value) return
  try {
    await formRef.value.validate()
    console.log(formData.value)
  } catch (error) {

  }
}
</script>

<style lang="less" scoped>
.container-report-form {
  position: relative;
  width: 100%;
  padding: 0 10px;
}
</style>
