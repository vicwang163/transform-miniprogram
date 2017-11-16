var fs = require('fs')
var recursiveCopy = require('recursive-copy')
var path = require('path')

// 复制项目
exports.copyProject = function (fromPath, toPath) {
  var lists = fs.readdirSync(fromPath).filter(function (item) {
    return !/(node_modules|DS_store)/i.test(item)
  });
  var options = {
    overwrite: true,
    expand: true,
    dot: true,
    rename: function(filePath) {
      if (/wxml/.test(filePath)) {
        return filePath.replace(/wxml$/, 'axml')
      } else if (/wxss/.test(filePath)) {
        return filePath.replace(/wxss$/, 'axss')
      } else {
        return filePath
      }
    }
  }
  var arr = []
  for (var i = 0; i < lists.length; i++) {
    arr.push(recursiveCopy(path.join(fromPath, lists[i]), path.join(toPath, lists[i].replace(/wxml$/, 'axml').replace(/wxss$/, 'axss')), options))
  }
  return Promise.all(arr)
}

// 获取内容
exports.getContent = function (filepath) {
  return new Promise(function (resolve) {
    fs.readFile(filepath, function (err, con) {
      resolve(con.toString())
    })
  })
}

// 写内容
exports.saveFile = function (path, con) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, con, (error) => {
      if (error) {
        reject(error)
      } else {
        resolve(true)
      }
    })
  })
}