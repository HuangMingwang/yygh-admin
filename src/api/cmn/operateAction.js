import request from '@/utils/request'

const api_name = '/admin/cmn/operateAction'

export default {

  findList(operateType, operateId) {
    return request({
      url: `${api_name}/findList/${operateType}/${operateId}`,
      method: 'get'
    })
  }
}
