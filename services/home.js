import config from "@/config";
import http from "@/utils/request";
const { request } = http;
/* request层做了baseUrl，若覆盖只需自定义url */

/* 米拍 */
// 动态列表
export function getMepaiEntryListSvc(query = {}) {
  return request({
    baseUrl: config.mepai, // 自定义请求host
    url: "/xxx/path",
    method: "get",
    data: {
      uid: 12345
    }
  });
}
/* 500px */
// 影集列表
export function get500pxAlbumListSvc(query = {}) {
  return request({
    baseUrl: config._500px, // 自定义请求host
    url: "/xxx/path",
    method: "get",
    data: {
      page: 1,
      size: 8,
      type: "json"
    }
  });
}
