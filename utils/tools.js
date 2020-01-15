let fs = require('fs')
let path = require('path')
let crypto = require('crypto');
const chalk = require('chalk')

// eslint-disable-next-line camelcase
let cache_file = 'cache_cdn.json'
let ignoreExts = [
  '.DS_Store'
]

// eslint-disable-next-line camelcase
function setCachedFiles (root_dir, data) {
  let p = path.join(root_dir, cache_file)
  fs.writeFileSync(p, JSON.stringify(data, null, 2))
}

// eslint-disable-next-line camelcase
function getCachedFiles (root_dir) {
  let p = path.join(root_dir, cache_file)
  let caches = {}
  if (fs.existsSync(p)) {
    caches = fs.readFileSync(p, 'utf-8')
    try {
      caches = JSON.parse(caches)
    } catch (e) {
      caches = {}
    }
  }
  return caches
}

function log (msg, color) {
  console.log(chalk[color](msg))
}

// eslint-disable-next-line camelcase
function loopDir (file, dir, root_dir, s_files) {
  // eslint-disable-next-line camelcase
  if (file === cache_file || ignoreExts.indexOf(file) > -1) {
    return
  }
  let fp = path.join(root_dir, dir, file)
  if (fs.statSync(fp).isFile()) {
    let ext = path.extname(file)
    if (ignoreExts.indexOf(ext) > -1) {
      return
    }
    // 读取一个Buffer
    let buffer = fs.readFileSync(path.join(root_dir, dir, file));
    let fsHash = crypto.createHash('md5');
    let md5 = fsHash.update(buffer).digest('hex');
    console.log('文件的MD5是：%s', md5);

    let f = path.join(dir, file)
    s_files.push({
      'filename': f,
      'md5': md5
    })
  } else {
    let files = fs.readdirSync(fp)
    files.forEach(function (fname) {
      loopDir(fname, path.join(dir, file), root_dir, s_files)
    })
  }
}
module.exports = {
  loopDir,
  cache_file,
  getCachedFiles,
  setCachedFiles,
  log
}
