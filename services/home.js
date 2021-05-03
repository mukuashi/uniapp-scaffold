import http from "@/utils/request";
const { request } = http;
/* request层做了baseUrl，若覆盖只需自定义url */

/**
 * 米拍动态列表
 * @param {*} query 
 * @returns 
 */
export function getMepaiEntryListSvc(query = {}) {
  return request({
    hostKey: 'mepai',
    url: "/v5/user/works?uid=38224&per_num=21&page=2",
    method: "get",
    data: {
      uid: 38224,
      per_num: query.per_num || 15,
      page: query.page || 1
    }
  });
}
/**
 * 500px影集列表
 * @param {*} query 
 * @returns 
 */
export function get500pxAlbumListSvc(query = {}) {
  return request({
    hostKey: '_500px',
    url: "/community/user-details/862206f444ccbbf9947dd165e267f3713/set",
    method: "get",
    data: {
      page: 1,
      size: 8,
      type: "json"
    }
  });
}
