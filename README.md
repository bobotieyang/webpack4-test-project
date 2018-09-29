# webpack4-test-project
webpack4 简单脚手架配置

启动

`npm run dev`

打包

`npm run build`

.babelrc

```
{
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
      // 设置成 usage 需要安装 core-js@2
      // 会将用到的es6 API 按需全局引入
      // 应该不能和下面的 runtime 同时配置
      "useBuiltIns": "usage",
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }]
  ],
  "plugins": [
    "@babel/plugin-syntax-dynamic-import",
    ["@babel/plugin-transform-runtime", {
        // corejs 设置成 2 需要安装 @babel/runtime-corejs2
        // 会将用到的es6非实例API 转换成不污染全局的方式
        // 不会转换实例API 如 Array.prototype.includes
        // 需要使用 @babel/polyfill
        "corejs": false
    }]
  ]
}
```
