import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import { useAppStore } from '@/store/app'
import { storeToRefs } from 'pinia'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layout/home/index.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('../views/home/index.vue')
        },
        {
          path: 'history',
          name: 'History',
          component: () => import('@/views/history/index.vue'),
          meta: {
            title: '历史报告'
          }
        }
      ]
    },
    {
      path: '/report',
      component: () => import('@/layout/report/index.vue'),
      children: [
        {
          path: 'check/:id',
          name: 'Report',
          component: () => import('@/views/report/index.vue'),
          meta: {
            title: '诊断报告'
          }
        },
        {
          path: 'detail/:id',
          name: 'ReportDetail',
          component: () => import('@/views/reportDetail/index.vue'),
          meta: {
            title: '报告详情'
          }
        }
      ]
    },
    {
      path: '/user',
      component: () => import('@/layout/user/index.vue'),
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/login/index.vue'),
          meta: {
            title: '登录'
          }
        },
        {
          path: 'forgot',
          name: 'Forgot',
          component: () => import('@/views/forgot/index.vue'),
          meta: {
            title: '忘记密码'
          }
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/error/index.vue'),
      meta: {
        hidden: true,
        title: 'errors~'
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const appStore = useAppStore()
  const { token } = storeToRefs(appStore)
  if (token.value) {
    if (['/user/login', '/user/forgot'].includes(to.path)) {
      next('/')
    } else {
      next()
    }
  } else {
    if (!['/user/login', '/user/forgot'].includes(to.path)) {
      next({ path: '/user/login', query: { interceptedByError: true } })
    } else {
      next()
    }
  }
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
