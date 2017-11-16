var glob = require("glob")
var babylon = require('babylon')
var traverse = require('babel-traverse').default
var generate = require("babel-generator").default
var utils = require('./utils')

module.exports = function * transformApi (form, transformLogs) {
  // 过滤js文件
  var files = yield new Promise((resolve) => {
    glob(form.dist + "/**/*.js", {ignore: '**/node_modules/**/*.js'}, function (err, files) {
      resolve(err ? [] :files)
    })
  })
  var api = require('./' + form.type + '/api')
  // 用于转换context
  var transformedCtx = api.__transformCtx__
  var i = 0
  var content
  // 遍历文件进行转换
  for(i = 0; i < files.length; i++) {
    content = yield utils.getContent(files[i])
    var result = babylon.parse(content, {
      sourceType:'module',
      plugins: '*'
    })
    // 转换api接口
    traverse(result, {
      MemberExpression (path) {
        var node = path.node
        var ctx = node.object.name
        var method = node.property.name
        if (ctx && method && api[ctx]) {
          // 如果在api列表里面存在，表示需要更新参数，函数名等
          if (api[ctx][method] != undefined) {
            // 只有tips
            if (api[ctx][method].tips) {
              // 增加transform logs
              transformLogs.push({
                type: 'tips',
                file: files[i],
                row: node.loc.start.line,
                column: node.loc.start.column,
                message: ctx + '.' + method + ':' + api[ctx][method].tips
              })
            } else { // 需要转换
              var mappingName = api[ctx][method].mapping ? api[ctx][method].mapping : method
              var sourceCode
              var afterCode
              if (path.parent.type !== 'CallExpression' || !api[ctx][method].params) {
                // 只要替换ctx和函数名即可
                path.replaceWithSourceString(transformedCtx[ctx] + '.' + mappingName)
                sourceCode = ctx + '.' + method
                afterCode = transformedCtx[ctx] + '.' + mappingName
              } else {
                // 需要替换ctx，函数名和参数
                sourceCode = content.slice(path.parent.start, path.parent.end)
                // 替换ctx，函数名
                afterCode = sourceCode.replace(ctx + '.' + method, transformedCtx[ctx] + '.' + mappingName)
                if (api[ctx][method].params) {
                  for (var pKey in api[ctx][method].params) {
                    afterCode = afterCode.replace(pKey, api[ctx][method]['params'][pKey])
                  }
                }
                path.parentPath.replaceWithSourceString(afterCode)
              }
              // 增加transform logs
              transformLogs.push({
                file: files[i],
                row: node.loc.start.line,
                column: node.loc.start.column,
                before: sourceCode,
                after: afterCode
              })
            }
          } else if (api[ctx][method] === null) {
            // 表示没有响应的接口
            // 增加transform logs
            transformLogs.push({
              type: 'error',
              file: files[i],
              row: node.loc.start.line,
              column: node.loc.start.column,
              message: ctx + '.' + method + ':没有相对应的函数'
            })
          } else {
            // 否则只要修改context
            path.replaceWithSourceString(transformedCtx[ctx] + '.' + method)
            // 增加transform logs
            transformLogs.push({
              file: files[i],
              row: node.loc.start.line,
              column: node.loc.start.column,
              before: ctx + '.' + method,
              after: transformedCtx[ctx] + '.' + method
            })
          }
        }
      }
    })
    result = generate(result, {})
    yield utils.saveFile(files[i], result.code)
  }
}