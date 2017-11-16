var transformApi = require('./api')
var transformView = require('./view')
var utils = require('./utils')
var path = require('path')
var co = require('co')

module.exports = function transformMiniprogram (form, cb) {
  // 日志变量
  var transformLogs = []
  if (!["w2a"].includes(form.type)) {
    return
  }
  // 指定转换目录
  form.dist = path.join(path.dirname(form.src), path.basename(form.src) + '_alipay')
  
  co(function * () {
      yield utils.copyProject(form.src, form.dist)
      yield transformApi(form, transformLogs)
      yield transformView(form, transformLogs)
  }).then(function () {
    cb(null, transformLogs)
  }).catch(function (e) {
    cb(e)
  })
}