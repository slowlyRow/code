import Dep from './dep.js'

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
   */
  defineReactive(data, key, val) {
    let _this = this
    let dep = new Dep()
    // 初始化递归
    if (typeof val === 'object') {
      _this.walk(val)
    }
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        // 将watcher作为target添加到dep依赖管理中
        Dep.target && dep.addSub(Dep.target)
        return val
      },
      set(newValue) {
        if (val === newValue) {
          return
        }

        val = newValue
        if (typeof newValue === 'object') {
          _this.walk(newValue)
        }
        // 通知dep依赖更新
        dep.notify()
      },
    })
  }
}

export default Observer
