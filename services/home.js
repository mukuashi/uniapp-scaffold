import config from "@/config";
import http from "@/utils/request";
const { request } = http;
/* request层做了baseUrl，若覆盖只需自定义url */

/* 米拍 */
// 动态列表
export function getMepaiEntryListSvc(query = {}) {
  return request({
    baseUrl: config.mepai, // 自定义请求host
    url: "/v5/user/works?uid=38224&per_num=21&page=2",
    method: "get",
    data: {
      uid: 38224,
      per_num: query.per_num || 15,
      page: query.page || 1
    }
  });
}
/* 500px */
// 影集列表
export function get500pxAlbumListSvc(query = {}) {
  return request({
    baseUrl: config._500px, // 自定义请求host
    url: "/community/user-details/862206f444ccbbf9947dd165e267f3713/set",
    method: "get",
    data: {
      page: 1,
      size: 8,
      type: "json"
    }
  });
}
