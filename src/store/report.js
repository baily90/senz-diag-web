import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReportStore = defineStore('report', () => {
  const report = ref(null) // 检查单数据
  const loading = ref(true) // 获取检查单loading
  const tabActiveName = ref('cssj') // 表单tab名称，默认展示第一个tab（超声所见）
  return {
    loading,
    report,
    tabActiveName
  }
})
