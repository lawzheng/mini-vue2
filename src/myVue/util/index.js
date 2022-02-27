// src/util/index.js
// 定义生命周期
export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed'
]

// 合并策略
const strats = {}

// 生命周期合并策略
function mergeHook (parentVal, childVal) {
  // 如果有儿子
  if (childVal) {
    if (parentVal) {
      // 合并成一个数组
      return parentVal.concat(childVal)
    } else {
      // 包装成一个数组
      return [childVal]
    }
  } else {
    return parentVal
  }
}

// 为生命周期添加合并策略
LIFECYCLE_HOOKS.forEach((hook) => {
  strats[hook] = mergeHook
})

const ASSETS_TYPE = ['component', 'directive', 'filter']
// 组件 指令 过滤器的合并策略
function mergeAssets (parentVal, childVal) {
  const res = Object.create(parentVal) // 比如有同名的全局组件和自己定义的局部组件 那么parentVal代表全局组件 自己定义的组件是childVal  首先会查找自已局部组件有就用自己的  没有就从原型继承全局组件  res.__proto__===parentVal
  if (childVal) {
    for (const k in childVal) {
      res[k] = childVal[k]
    }
  }
  return res
}

// 定义组件的合并策略
ASSETS_TYPE.forEach((type) => {
  strats[type + 's'] = mergeAssets
})

// mixin核心方法
export function mergeOptions (parent = {}, child) {
  const options = {}
  // 遍历父亲
  for (const k in parent) {
    mergeFiled(k)
  }
  // 父亲没有 儿子有
  for (const k in child) {
    if (!parent || !Object.prototype.hasOwnProperty.call(parent, k)) {
      mergeFiled(k)
    }
  }

  // 真正合并字段方法
  function mergeFiled (k) {
    if (strats[k]) {
      options[k] = strats[k](parent[k], child[k])
    } else {
      // 默认策略
      options[k] = child[k] ? child[k] : parent[k]
    }
  }
  return options
}

export function isObject (data) {
  // 判断是否是对象
  if (typeof data !== 'object' || data == null) {
    return false
  }
  return true
}

export function isReservedTag (tagName) {
  // 判断是不是常规html标签
  // 定义常见标签
  const str =
    'html,body,base,head,link,meta,style,title,' +
    'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
    'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
    'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
    's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
    'embed,object,param,source,canvas,script,noscript,del,ins,' +
    'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
    'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
    'output,progress,select,textarea,' +
    'details,dialog,menu,menuitem,summary,' +
    'content,element,shadow,template,blockquote,iframe,tfoot'
  const obj = {}
  str.split(',').forEach((tag) => {
    obj[tag] = true
  })
  return obj[tagName]
}
