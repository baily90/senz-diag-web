<template>
  <div class="container-report-main">
    <div class="container-report-media">
      <slot name="media"></slot>
    </div>
    <div class="container-report-form">
      <slot name="form"></slot>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useReportStore } from '@/store/report'

const router = useRouter()
const route = useRoute()
const reportStore = useReportStore()
const {
  loading,
  report
} = storeToRefs(reportStore)

</script>

<style lang="less" scoped>
.container-report-main {
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .container-report-media  {
    background-color: #F7FBFF;
  }
  .container-report-form {
    flex: 1;
  }
}
</style>
