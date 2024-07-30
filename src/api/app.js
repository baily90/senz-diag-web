import request from '@/utils/request'

export default {
  getUserInfo () {
    return request({
      url: '/user/info',
      method: 'get'
    })
  },
  getCaptcha () {
    return request({
      url: '/user/info',
      method: 'get'
    })
  }
}
