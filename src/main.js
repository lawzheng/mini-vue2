// import Vue from 'vue'
import Vue from './myVue'
// import App from './App.vue'
// import router from './router'

// Vue.config.productionTip = false

const vm = new Vue({
  data: {
    a: [1, 2]
  },
  template: '<div class="haha">2   {{a[0]}}</div>',
  el: '#app'
  // router,
  // render: h => h(App)
})
// vm.$mount('#app')

// 我们在这里模拟更新
setTimeout(() => {
  vm.a = [2, 3]
}, 1000)
