import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAppStore = defineStore('app', () => {
  const token = ref(null)
  const isRember = ref(false)
  const phone = ref(null)
  const password = ref(null)
  const name = ref(null)
  const avator = ref(null)
  const router = useRouter()

  const requestInvalidRedirect = (path = '/') => {
    router.replace({ path, query: { interceptedByError: true } })
  }

  return {
    phone,
    password,
    token,
    isRember,
    name,
    avator,
    requestInvalidRedirect
  }
},
{
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage }]
  }
})
