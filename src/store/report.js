import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useReportStore = defineStore('report', () => {
  const report = ref(null)
  const loading = ref(true)
  return {
    loading,
    report
  }
})
