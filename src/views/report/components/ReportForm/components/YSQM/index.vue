<template>
  <div class="container-doctor-sign">
    <el-form ref="formRef" :model="formData">
      <el-form-item prop="signImage" :rules="[{required: true, message: '请确认签字', trigger: 'blur'}]">
        <div class="sign">
          医师签名：
          <img :src="formData.signImage" width="100px" height="40px" fit="contain" v-if="formData.signImage"/>
        </div>
        <el-button :loading="isLoading" @click="getSignImage()" v-if="!formData.signImage">确认签字</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAsyncState } from '@vueuse/core'
import API from '@/api/report'

const formRef = ref(null)
const formData = ref({
  signImage: undefined
})

const { isLoading, execute } = useAsyncState(
  () => API.getUserInfo(),
  null,
  {
    immediate: false
  }
)

const getSignImage = async () => {
  try {
    const { code, data } = await execute(0)
    if (code === 200) {
      formData.value.signImage = data?.info?.autograph
      formRef.value.clearValidate()
    }
  } catch (error) {

  }
}

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
.container-doctor-sign {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  .sign {
    display: flex;
    align-items: center;
  }
}
</style>
