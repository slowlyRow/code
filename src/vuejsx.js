import Vue from 'vue'
// import Vue from 'vue/dist/vue.esm.js'

const test =
  Vue.component('test', {
    render: function (createElement) {
      return createElement('h3', 800088)
    },
  })
const app = new Vue({
  el: '#a',
  data: {
    text: 'oye', // 内容å
    tag: '一则头条',// h2标签
    componentChild: test,// 组件替换标签字符串
  },
  render(createElement) {
    return createElement('h1',
      [
        this.text, // 内容å
        createElement('h2', this.tag), // h2标签
        createElement(this.componentChild), // 组件替换标签字符串
      ])
  },
})
// .$mount('#a')
console.log('app : ', app,);