import request from '@/utils/request'

const api_name = '/admin/hosp/department'

export default {

  getTree(hoscode) {
    return request({
      url: `${api_name}/${hoscode}`,
      method: 'get'
    })
  }
}
