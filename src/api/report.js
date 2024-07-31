import request from '@/utils/request'

export default {
  // 诊断获取报告
  getEditReportInfo (checkId) {
    return request({
      url: `/diag_doctor/check/${checkId}`,
      method: 'get'
    })
  },
  // 下一份历史报告
  getNextReport (data) {
    return request({
      url: '/diag_doctor/next_report',
      method: 'post',
      data
    })
  },
  // 疑难报告转交给他人
  handToOthers (checkId) {
    return request({
      url: `/diag_doctor/check_repost/${checkId}`,
      method: 'post'
    })
  },
  // 获取需要处理的下一份报告
  nextNeedReport (data) {
    return request({
      url: '/diag_doctor/next_need_report',
      method: 'post',
      data
    })
  },
  // 获取作废报告原因类型
  getDestroyType () {
    return request({
      url: '/diag_doctor/nullify_maps',
      method: 'get'
    })
  },
  // 作废报告
  destroyReport (data) {
    return request({
      url: '/diag_doctor/check_nullify',
      method: 'post',
      data
    })
  },
  // 超时取消报告
  cancleReport (data) {
    return request({
      url: '/diag_doctor/cancel/diag',
      method: 'post',
      data
    })
  },
  // 超时继续处理
  continueReport (data) {
    return request({
      url: '/diag_doctor/continue/diag',
      method: 'post',
      data
    })
  },
  // 获取历史报告已标注的信息
  getMarkData (params) {
    return request({
      url: '/diag_doctor/mark/data',
      method: 'get',
      params
    })
  },
  // 发送标注信息
  sendMarkData (data) {
    return request({
      url: '/diag_doctor/mark/data',
      method: 'post',
      data
    })
  },
  // 发送报告-普通报告
  handleReport (data) {
    return request({
      url: '/diag_doctor/report/handle',
      method: 'post',
      data
    })
  },
  // 肠系膜淋巴结报告模板
  mesareicTemplateData (params) {
    return request({
      url: '/diag_doctor/report/template',
      method: 'get',
      params
    })
  },
  // 获取配置模板
  getReportConf (params) {
    return request({
      url: '/gdiag-pc/v1/report/conf',
      method: 'get',
      params
    })
  },
  // 发送报告-后台模板配置的报告
  submitReport (data) {
    return request({
      url: '/gdiag-pc/v1/report/submit',
      method: 'post',
      data
    })
  },
  // 获取报告模板
  getReportTemplate (params) {
    return request({
      url: '/gdiag-pc/v1/report/template',
      method: 'get',
      params
    })
  },
  // 获取历史报告列表
  getHistoryReportList ({page, ...params}) {
    return request({
      url: `/diag_doctor/report_list/${page}`,
      method: 'get',
      params
    })
  },
  // 获取历史报告详情
  getReportDetailInfo (diagId) {
    return request({
      url: `/diag_doctor/report_ai/${diagId}`,
      method: 'get'
    })
  },
  // 获取历史报告列表筛选项中的产品名称
  getProductList () {
    return request({
      url: '/diag_doctor/product/list',
      method: 'get'
    })
  },
  // 撤回报告
  withdrawReport (id) {
    return request({
      url: `/diag_doctor/withdraw/${id}`,
      method: 'post'
    })
  }

}
