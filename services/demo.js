import http from '../utils/request'
const { request } = http
/* request层做了baseUrl，若覆盖只需自定义url */

// demo
export function getDemoListSvc (category = 'all') {
  return request({
    // baseUrl: config.apiHosts.mock, // 自定义请求host
    url: `/training/v1/applet/course/discover`,
    method: 'get',
    data: {
      category
    }
  })
}