<template>
  <el-dialog
    title="扫查留言"
    v-model="visible"
    destroy-on-close
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    center
    :append-to-body="true">
    <div class="item" v-if="report?.scan_comment?.tags?.length || report?.scan_comment?.tag_des">
      <div class="title">既往史</div>
      <div class="content">
        <div class="tags"><el-tag type="info" v-for="tag in report?.scan_comment?.tags" :key="tag.tag_id">{{tag.tag_name}}</el-tag></div>
        <div class="desc" v-if="report?.scan_comment?.tag_des">{{report?.scan_comment?.tag_des}}</div>
      </div>
    </div>
    <div class="item" v-if="report?.scan_comment?.last_report_id">
      <div class="title">超声检查史</div>
      <div class="content">
        该患者在 {{report?.scan_comment?.last_report_date}} 在同部位做过超声检查，<span class="link" @click="openReport(report?.scan_comment?.last_report_id)">请点击查看报告</span>
      </div>
    </div>
    <template #footer>
      <el-button type="primary" @click="visible = false" :disabled="isDisabled">我已阅读</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/store/report'
import { useRouter } from 'vue-router'

const router = useRouter()
const reportStore = useReportStore()
const {
  report
} = storeToRefs(reportStore)

const isDisabled = ref(false)
const visible = ref(false)

watch(() => report.value, (val) => {
  // 如果患者有历史报告史，必须先点击查看报告之后才能关闭弹窗
  isDisabled.value = !!val?.scan_comment?.last_report_id
  const tags = val?.scan_comment?.tags
  // 如果患者有历史报告史或者患者标签存在且不是正常，则弹窗
  visible.value = (tags && !tags?.every(tag => tag.tag_name === '正常')) || !!val?.scan_comment?.last_report_id
})

const openReport = (id) => {
  isDisabled.value = false
  window.open(`/report/check/${id}`, '_blank')
}


</script>

<style lang="less" scoped>
.item {
  margin-bottom: 30px;
  &:last-child {
    margin-top: 0;
  }
  .title {
    font-weight: bold;
  }
  .content {
    margin-top: 10px;
    .link {
      color: #097AFF;
      cursor: pointer;
      text-decoration: underline;
    }
    .tags {
      display: flex;
      gap: 10px;
    }
    .desc {
      margin-top: 5px;
    }
  }
}
</style>
