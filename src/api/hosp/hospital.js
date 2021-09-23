import request from '@/utils/request'

const api_name = '/admin/hosp/hospital'

export default {

  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },

  updateStatus(id, status) {
    return request({
      url: `${api_name}/updateStatus/${id}/${status}`,
      method: 'get'
    })
  },

  getById(id) {
    return request({
      url: `${api_name}/show/${id}`,
      method: 'get'
    })
  },

  getByHosname(hosname) {
    return request({
      url: `/api/hosp/hospital/findByHosname/${hosname}`,
      method: 'get'
    })
  }
}
