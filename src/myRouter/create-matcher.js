import { createRouteMap } from './create-route-map'
// 导入route对象创建方法
import { createRoute } from './utils/route'

export function createMatcher (routes) {
  // 生成路由映射对象 pathMap
  const pathMap = createRouteMap(routes)

  // 动态添加路由（添加一条新路由规则）
  function addRoute (parentOrRoute, route) {
    const parent = (typeof parentOrRoute !== 'object') ? pathMap[parentOrRoute] : undefined
    createRouteMap([route || parentOrRoute], pathMap, parent)
  }

  // 动态添加路由（参数必须是一个符合 routes 选项要求的数组）
  function addRoutes () {
    createRouteMap(routes, pathMap)
  }

  // 获取所有活跃的路由记录列表
  function getRoutes () {
    return pathMap
  }

  // 路由匹配
  function match (location) {
    location = typeof location === 'string' ? { path: location } : location
    return createRoute(pathMap[location.path], location)
  }

  return {
    match,
    addRoute,
    getRoutes,
    addRoutes
  }
}
