/**
 * @description: Obserber 给data属性重设get、set，用于通知变化
 */

class Observer {
  constructor(data) {
    this.walk(data)
  }
  // 将data所有属性设置为响应式
  walk(data) {
    Object.keys(data).forEach(key => {
      // 避免data的get/set操作时递归获取get，通过val作为中介传递
      let val = data[key]
      this.defineReactive(data, key, val)
    })
  }
  /**
   * @description: 定义data属性的get、set，并通知更新dom，形成数据model到视图view的响应式
   * @param {*} data
   * @param {*} key
   * @param {*} val
   * @return {*}
   */
  defineReactive(data, key, val) {
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        console.log('get-data: ', val)
        return val
      },
      set(newValue) {
        console.log('set-data: ', newValue)
        if (val === newValue) {
          return
        }

        val = newValue
        // 通知vue更新
        document.querySelector('#app').innerText = val
      },
    })
  }
}

export default Observer
