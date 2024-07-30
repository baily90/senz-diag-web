import request from '@/utils/request'

export default {
  // 获取数量信息
  getHomeInfo () {
    return request({
      url: '/diag_doctor/report_mixed',
      method: 'get'
    })
  },
  makeOnline () {
    return request({
      url: '/diag_doctor/make_online',
      method: 'post'
    })
  },
  // 取需要处理的第一份报告
  mineCheckWant () {
    return request({
      url: '/diag_doctor/mine_check_want',
      method: 'get'
    })
  }
}
