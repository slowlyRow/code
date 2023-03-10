import add from "./add.js";
// import Vue from 'vue'
import Vue from 'vue/dist/vue.esm.js'

document.write('i am entry<br/>')
add()

const test =
  Vue.component('test', {
    render: function (createElement) {
      return createElement('h3', 800088)
    },
  })
const app = new Vue({
  el: '#a',
  render(createElement) {
    return createElement('h1',
      [
        'oye', // 内容å
        createElement('h2', '一则头条'), // h2标签
        createElement(test), // 组件替换标签字符串
      ])
  },
})
// .$mount('#a')
console.log('app : ', app,);