import Vue from 'vue'

export const isServer = Vue.prototype.$isServer

const all = {
  isServer,
}
export default all
