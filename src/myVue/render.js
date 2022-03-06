// src/render.js

import { createElement, createTextNode } from './vdom/index'
import { nextTick } from './util/next-tick'
import Watcher from './observer/watcher'

export function renderMixin (Vue) {
  Vue.prototype._render = function () {
    const vm = this
    // 获取模板编译生成的render方法
    const { render } = vm.$options
    // 生成vnode--虚拟dom
    const vnode = render.call(vm)
    return vnode
  }

  // render函数里面有_c _v _s方法需要定义
  Vue.prototype._c = function (...args) {
    // 创建虚拟dom元素
    return createElement(this, ...args)
  }

  Vue.prototype._v = function (text) {
    // 创建虚拟dom文本
    return createTextNode(text)
  }
  Vue.prototype._s = function (val) {
    // 如果模板里面的是一个对象  需要JSON.stringify
    return val == null
      ? ''
      : typeof val === 'object'
        ? JSON.stringify(val)
        : val
  }

  // 挂载在原型的nextTick方法 可供用户手动调用
  Vue.prototype.$nextTick = nextTick

  Vue.prototype.$watch = function (exprOrFn, cb, options) {
    const vm = this
    //  user: true 这里表示是一个用户watcher
    // eslint-disable-next-line no-unused-vars
    const watcher = new Watcher(vm, exprOrFn, cb, { ...options, user: true })
    // 如果有immediate属性 代表需要立即执行回调
    if (options.immediate) {
      cb() // 如果立刻执行
    }
  }
}
