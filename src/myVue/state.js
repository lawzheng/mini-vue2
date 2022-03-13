// src/state.js
import { observe } from './observer/index.js'
import Watcher from './observer/watcher'
import Dep from './observer/dep'

// 初始化状态 注意这里的顺序 比如我经常面试会问到 是否能在data里面直接使用prop的值 为什么？
// 这里初始化的顺序依次是 prop>methods>data>computed>watch
export function initState (vm) {
  // 获取传入的数据对象
  const opts = vm.$options
  // if (opts.props) {
  //   initProps(vm)
  // }
  // if (opts.methods) {
  //   initMethod(vm)
  // }
  if (opts.data) {
    // 初始化data
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}

// 初始化data数据
function initData (vm) {
  let data = vm.$options.data
  //   实例的_data属性就是传入的data
  // vue组件data推荐使用函数 防止数据在组件之间共享
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}

  // 把data数据代理到vm 也就是Vue实例上面 我们可以使用this.a来访问this._data.a
  for (const key in data) {
    proxy(vm, '_data', key)
  }
  // 对数据进行观测 --响应式数据核心
  observe(data)
}
// 数据代理
function proxy (object, sourceKey, key) {
  Object.defineProperty(object, key, {
    get () {
      return object[sourceKey][key]
    },
    set (newValue) {
      object[sourceKey][key] = newValue
    }
  })
}

function initComputed (vm) {
  const computed = vm.$options.computed

  const watchers = (vm._computedWatchers = {}) // 用来存放计算watcher

  for (const k in computed) {
    const userDef = computed[k] // 获取用户定义的计算属性
    const getter = typeof userDef === 'function' ? userDef : userDef.get // 创建计算属性watcher使用
    // 创建计算watcher  lazy设置为true
    watchers[k] = new Watcher(vm, getter, () => {}, { lazy: true })
    defineComputed(vm, k, userDef)
  }
}
// 定义普通对象用来劫持计算属性
const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: () => {},
  set: () => {}
}

// 重新定义计算属性  对get和set劫持
function defineComputed (target, key, userDef) {
  if (typeof userDef === 'function') {
    // 如果是一个函数  需要手动赋值到get上
    sharedPropertyDefinition.get = createComputedGetter(key)
  } else {
    sharedPropertyDefinition.get = createComputedGetter(key)
    sharedPropertyDefinition.set = userDef.set
  }
  //   利用Object.defineProperty来对计算属性的get和set进行劫持
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

// 重写计算属性的get方法 来判断是否需要进行重新计算
function createComputedGetter (key) {
  return function () {
    const watcher = this._computedWatchers[key] // 获取对应的计算属性watcher
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate() // 计算属性取值的时候 如果是脏的  需要重新求值
      }
      if (Dep.target) {
        // 如果Dep还存在target 这个时候一般为渲染watcher 计算属性依赖的数据也需要收集
        watcher.depend()
      }
      return watcher.value
    }
  }
}

// 初始化watch
function initWatch (vm) {
  const watch = vm.$options.watch
  for (const k in watch) {
    const handler = watch[k] // 用户自定义watch的写法可能是数组 对象 函数 字符串
    if (Array.isArray(handler)) {
      // 如果是数组就遍历进行创建
      handler.forEach((handle) => {
        createWatcher(vm, k, handle)
      })
    } else {
      createWatcher(vm, k, handler)
    }
  }
}
// 创建watcher的核心
function createWatcher (vm, exprOrFn, handler, options = {}) {
  if (typeof handler === 'object') {
    options = handler // 保存用户传入的对象
    handler = handler.handler // 这个代表真正用户传入的函数
  }
  if (typeof handler === 'string') {
    //   代表传入的是定义好的methods方法
    handler = vm[handler]
  }
  //   调用vm.$watch创建用户watcher
  return vm.$watch(exprOrFn, handler, options)
}
