var glob = require("glob")
var utils = require('./utils')
var htmlTool = require('html-tool')

module.exports = function * transformView (form, transformLogs) {
  var files = yield new Promise((resolve) => {
    glob(form.dist + "/**/*." + (form.type === "w2a" ? 'axml' : 'wxml'), function (err, files) {
      resolve(err ? [] :files)
    })
  })
  
  var viewObject = require('./' + form.type + '/view')
  var content
  var tree
    // 遍历文件进行转换
  for(i = 0; i < files.length; i++) {
    content = yield utils.getContent(files[i])
    tree = htmlTool.parse(content)
    htmlTool.traverse(tree, function (node) {
      var name = node.name
      var attrs = node.attribs
      var key
      // 如果存在需要转换的组件
      if (viewObject[name]) {
        // 替换组件名
        if (viewObject[name].mapping) {
          node.name = viewObject[name].mapping
          transformLogs.push({
            file: files[i],
            before: '原来组件名:' + name,
            after: '现在组件名:' + viewObject[name].mapping
          })
        }
        // 查找属性
        var newAttrs = []
        for (key in attrs) {
          if (viewObject[name]['attrs'][key] === null) {
            transformLogs.push({
              file: files[i],
              type: 'error',
              message: '['+ name +']:没有属性"' + key + '"'
            })
          } else if (viewObject[name]['attrs'][key]) {
            // 赋值新的
            newAttrs[viewObject[name]['attrs'][key]] = attrs[key]
            // add logs
            transformLogs.push({
              file: files[i],
              before: '['+ name +']:' + key,
              after: '['+ name +']:' + viewObject[name]['attrs'][key]
            })
          } else {
            newAttrs[key] = attrs[key]
          }
        }
        // 赋值
        node.attribs = newAttrs
      } else {
        // add logs
        transformLogs.push({
          file: files[i],
          type: 'error',
          message: '['+ name +']:组件不存在'
        })        
      }
    })
    // generate html
    content = htmlTool.generate(tree)
    // save file
    yield utils.saveFile(files[i], content)
  }
}