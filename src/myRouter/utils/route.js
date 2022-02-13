export function createRoute (record, location) {
  const route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: location.path || '/',
    matched: record && formatMatch(record)
  }
  return Object.freeze(route)
}

// 初始状态的起始路由
export const START = createRoute(null, {
  path: '/'
})

// 关联所有路由记录
function formatMatch (record) {
  const res = []
  while (record) {
    // 队列头添加，所以父record永远在前面，当前record永远在最后
    // 在router-view组件中获取匹配的route record时会用到
    // 精准匹配到路由记录是数组最后一个
    res.unshift(record)
    record = record.parent
  }
  return res
}
