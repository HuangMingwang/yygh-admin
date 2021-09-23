import request from '@/utils/request'

const api_name = '/admin/hosp/schedule'

export default {

  getScheduleRule(page, limit, hoscode, depcode) {
    return request({
      url: `${api_name}/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
      method: 'get'
    })
  },

  findScheduleList(hoscode, depcode, workDate) {
    return request({
      url: `${api_name}/findScheduleList/${hoscode}/${depcode}/${workDate}`,
      method: 'get'
    })
  }
}
