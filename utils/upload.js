let qiniu = require("qiniu");
let path = require("path");
// 需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = "xxx";
qiniu.conf.SECRET_KEY = "xxx";
let mac = new qiniu.auth.digest.Mac(
  qiniu.conf.ACCESS_KEY,
  qiniu.conf.SECRET_KEY
);
// 上传到七牛后保存的文件名
let config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z0;
// 是否使用https域名
config.useHttpsDomain = true;
// 上传是否使用cdn加速
config.useCdnDomain = true;

// eslint-disable-next-line no-unused-vars
let bucketManager = new qiniu.rs.BucketManager(mac, config);

// 要上传的空间，把下面这个value换成业务方自己的 bucket name
let bucket = "test";
// 构建上传策略函数，设置回调的url以及需要回调给业务服务器的数据
function uptoken(bucket, key) {
  let options = {
    scope: bucket + ":" + key
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  return putPolicy.uploadToken(mac);
}

function uploadFile(appName, file, dir) {
  let key = appName + "/" + parseInt(Date.now()) + "/" + file.filename;
  let uploadToken = uptoken(bucket, key);
  let formUploader = new qiniu.form_up.FormUploader(config);
  let putExtra = new qiniu.form_up.PutExtra();
  // 文件上传
  return new Promise((resolve, reject) => {
    formUploader.putFile(
      uploadToken,
      key,
      path.join(dir, file.filename),
      putExtra,
      function(respErr, respBody, respInfo) {
        if (respErr) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({
            errorCode: 1,
            errorMsg: "上传出错"
          });
        }
        if (respInfo.statusCode == 200) {
          respBody["filename"] = file.filename;
          respBody["md5"] = file.md5;
          resolve(respBody);
        } else {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject(
            reject({
              errorCode: 1,
              errorMsg: "上传失败，状态码：" + respInfo.statusCode
            })
          );
        }
      }
    );
  });
}

module.exports = {
  uploadFile
};
