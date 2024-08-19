import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReportStore = defineStore('report', () => {
  const report = ref(null) // 检查单数据
  const loading = ref(true) // 获取检查单loading
  const firstTabIndex = ref(1) // 表单tab索引，默认展示第一个tab（超声所见）
  return {
    loading,
    report,
    firstTabIndex
  }
})
