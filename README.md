# transform-miniprogram
用来转换微信和支付宝小程序

## 接口

#### transformMiniprogram(form, cb)

属性 | 说明
---- | ----
form | 表单属性
cb | 回调函数

form表单参数说明
属性 | 说明
----- | ------
src | 微信或者支付宝小程序的项目目录
type | 目前只支持w2a
dist | 默认是src同级目录下的文件夹，自动生成

## 运行原理

1.首先通过copy项目，生成额外的项目地址，在copy过程中，会把项目文件名改成相应的文件  
2.转换js文件，里面babel来转换接口  
3.用html-tool工具来转换view  