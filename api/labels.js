import request from "../plugins/request";


/**
 * 获取所有的标签信息
 */
export function getAllLabels() {
  return request.get('/v1/labels/all')
}
