import request from '@/utils/request'

const api_name = '/admin/hosp/hospitalSet'

export default {

  getPageList(page, limit, searchObj) {
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  getById(id) {
    return request({
      url: `${api_name}/get/${id}`,
      method: 'get'
    })
  },

  save(hospitalSet) {
    return request({
      url: `${api_name}/save`,
      method: 'post',
      data: hospitalSet
    })
  },

  updateById(hospitalSet) {
    return request({
      url: `${api_name}/update`,
      method: 'put',
      data: hospitalSet
    })
  },
  removeById(id) {
    return request({
      url: `${api_name}/remove/${id}`,
      method: 'delete'
    })
  },
  removeRows(idList) {
    return request({
      url: `${api_name}/batchRemove`,
      method: 'delete',
      data: idList
    })
  },
  lock(id, status) {
    return request({
      url: `${api_name}/lock/${id}/${status}`,
      method: 'get'
    })
  },

  sendSignKey(id) {
    return request({
      url: `${api_name}/sendSignKey/${id}`,
      method: 'get'
    })
  }
}
