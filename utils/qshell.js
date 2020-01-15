/**
 * 启用自定义处理命令：编译前，预览前，上传前预处理
 */
let path = require('path')
let util = require('./tools')
let upload = require('./upload')
let projectConfig = require('../package.json')

// eslint-disable-next-line camelcase
let app_dir = path.resolve(__dirname, '..', 'cdn_files')
let appName = projectConfig.name

if (!appName) {
  console.error('--------------- 没有填写appName，无法完成上传 ---------------')
  process.exit()
}
// 上传图片到cdn

// appid md5 用作文件指纹
// eslint-disable-next-line camelcase
let md5_appName = appName

// cdn上传文件缓存
let caches = util.getCachedFiles(app_dir)

// 需要上传cdn的文件列表
let files = []

// 遍历cdn目录
util.loopDir('', '', app_dir, files)

// 过滤上传过的文件
files = files.filter(function (file) {
  if (!caches[file.filename]) {
    return true
  }
  if (caches[file.filename].md5 !== file.md5) {
    return true
  }
  return false
})

if (files.length > 0) {
  console.log('--------------- cdn upload begin ---------------')
  let arr = []
  files.forEach(function (file) {
    arr.push(upload.uploadFile(md5_appName, file, app_dir))
  })
  Promise.all(arr).then((res) => {
    if (res) {
      console.log('下面的文件上传到了cdn: ')
      res.forEach(function (item) {
        if (!caches[item.filename]) {
          caches[item.filename] = {}
        }
        caches[item.filename].md5 = item.md5
        // 换成业务方cdn域名
        caches[item.filename].key = 'http://cdn.kquanr.com/' + item.key
        console.log(item.filename, '上传后的名称：', item.key)
      })
      util.setCachedFiles(app_dir, caches)
    }
    console.log('请使用你的cdn地址：' + 'http://cdn.kquanr.com\n\n')
    console.log('--------------- cdn upload end ---------------')
  }).catch((err) => {
    console.error('有文件上传失败:', err)
    console.log('--------------- cdn upload end ---------------')
  })
} else {
  console.log('没有文件需要上传到cdn')
}