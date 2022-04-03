import Vue from 'vue'
// import Vue from './myVue'
import store from './store/index.js'
import App from './App.vue'
import router from './router'

// Vue.config.productionTip = false
// Vue.mixin({
//   created () {
//     console.log('我是全局混入')
//   }
// })
// 全局组件
// Vue.component('parent-component', {
//   template: '<div>我是全局组件</div>',
//   created () {
//     console.log('我是父组件')
//   }
// })

const vm = new Vue({
  // el: '#app',
  // data () {
  //   return {
  //     aa: 1,
  //     bb: 2
  //   }
  // },
  // created () {
  // },
  // template: `<div id="a">
  //     {{aa}}-{{computedName}}
  //     </div>`,
  // // <parent-component></parent-component>
  // // <child-component></child-component>
  // // 局部组件
  // components: {
  //   'child-component': {
  //     template: '<div>我是局部组件</div>',
  //     created () {
  //       console.log('我是子组件')
  //     }
  //   }
  // },
  // watch: {
  //   aa (newVal, oldVal) {
  //     console.log('watch', newVal)
  //   }
  //   // aa: {
  //   //   handle(newVal， oldVal) {
  //   //     console.log(newVal);
  //   //   },
  //   //   deep: true
  //   // },
  //   // aa: 'doSomething',
  //   // aa: [{
  //   //   handle(newVal， oldVal) {
  //   //     console.log(newVal);
  //   //   },
  //   //   deep: true
  //   // }]
  // },
  // computed: {
  //   computedName () {
  //     return this.aa + this.bb
  //   }
  // }
  render: h => h(App),
  router,
  store
})
vm.$mount('#app')
// console.log(vm)
// setTimeout(() => {
//   vm.aa = 1111
//   vm.bb = 2222
// }, 1000)
