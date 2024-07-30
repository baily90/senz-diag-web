import request from '@/utils/request'

export default {
  getCaptchaImage () {
    return request({
      url: '/diag_doctor/captcha_center',
      method: 'get'
    })
  },
  login (data) {
    return request({
      url: '/diag_doctor/login',
      method: 'post',
      data
    })
  },
  sendSms (data) {
    return request({
      url: '/diag_doctor/send_sms',
      method: 'post',
      data
    })
  },
  resetPassword (data) {
    return request({
      url: '/diag_doctor/find_pass',
      method: 'post',
      data
    })
  },
  changePassword (data) {
    return request({
      url: '/diag_doctor/change_password',
      method: 'post',
      data
    })
  }
}
