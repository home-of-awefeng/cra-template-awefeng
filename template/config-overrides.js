/**
 * config-overrides.js
 * 用于配置Create-React-App启动的项目
 * https://github.com/timarney/react-app-rewired/blob/b7b4bea299c9fe67f77b736d10d1f9482dea6459/README_zh.md
 *
 * 配置 https://zhuanlan.zhihu.com/p/96103181
 */

const { override, overrideDevServer, fixBabelImports, addWebpackAlias, addLessLoader } = require('customize-cra')
const path = require("path")
const proxy = require("./config/proxy")
// 禁用ManifestPlugin ModuleScopePlugin
const removeManifest = () => config => {
  config.plugins = config.plugins.filter(
    p => p.constructor.name !== "ManifestPlugin" || p.constructor.name!=="ModuleScopePlugin"
  )
  return config
}
// 代理
const addProxy = () => (configFunction) => {
  configFunction.proxy = proxy
  return configFunction
}

module.exports = {
  webpack: override(
    // 添加一些webpack的其他依赖
    // TODO function(config){},
    removeManifest(),
    fixBabelImports('import', {
      libraryName: 'antd',
      style: 'css'
    }),
    // 使用less
    addLessLoader(),
    addWebpackAlias({
      "@": path.resolve(__dirname, "src"),
      "@config": path.resolve(__dirname, "config")
    })
  ),
  devServer: overrideDevServer(
    addProxy()
  )
}
