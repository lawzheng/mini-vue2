// import Vue from 'vue'
import Vue from './myVue'
// import App from './App.vue'
// import router from './router'

// Vue.config.productionTip = false
// Vue.mixin({
//   created () {
//     console.log('我是全局混入')
//   }
// })
// 全局组件
Vue.component('parent-component', {
  template: '<div>我是全局组件</div>',
  created () {
    console.log('我是父组件')
  }
})

const vm = new Vue({
  el: '#app',
  data () {
    return {
      aa: 1
    }
  },
  created () {
  },
  template: `<div id="a">
      {{aa}}
      <parent-component></parent-component>
      <child-component></child-component>
      </div>`,
  // 局部组件
  components: {
    'child-component': {
      template: '<div>我是局部组件</div>',
      created () {
        console.log('我是子组件')
      }
    }
  }
  // router,
  // render: h => h(App)
})
// vm.$mount('#app')
console.log(vm)
