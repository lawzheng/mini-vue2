// src/global-api/index.js

import initExtend from './initExtend'
import { ASSETS_TYPE, initAssetRegisters } from './asset'
export function initGlobalApi (Vue) {
  Vue.options = {} // 全局的组件 指令 过滤器
  ASSETS_TYPE.forEach((type) => {
    Vue.options[type + 's'] = {}
  })
  Vue.options._base = Vue // _base指向Vue

  initExtend(Vue) // extend方法定义
  initAssetRegisters(Vue) // assets注册方法 包含组件 指令和过滤器
}
