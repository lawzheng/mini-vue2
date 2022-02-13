import { START } from '../utils/route'

export class History {
  constructor (router) {
    this.router = router
    // 当前路由route对象
    this.current = START
    // 路由监听器数组，存放路由监听销毁方法
    this.listeners = []
  }

  // 启动路由监听
  setupListeners () { }

  listen (cb) {
    this.cb = cb
  }

  // 路由跳转
  transitionTo (location, onComplete) {
    const route = this.router.match(location)
    this.current = route

    this.cb && this.cb(route)

    // 跳转成功抛出回调 放上面
    onComplete && onComplete(route)

    // 更新URL 放下面
    this.ensureURL()
  }

  // 卸载
  teardown () {
    this.listeners.forEach((cleanupListener) => {
      cleanupListener()
    })

    this.listeners = []
    this.current = ''
  }
}
