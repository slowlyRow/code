import Dep from './dep.js'
/**
 * @description: 响应式watcher（model/view变化跟踪器）
 *               当数据model响应式变化通知compiler更新视图
 *               或双向绑定model/view变化时更新目标
 */
class Watcher {
  constructor(vm, key, cb) {
    // 将vm和key传入，跟踪其变化
    this.vm = vm
    this.key = key
    // 初始化watcher时，compiler添加的更新callback
    this.cb = cb
    Dep.target = this
    // 初始化时记录的旧值,同时触发get方法
    this.oldValue = this.handlerValue(vm, key)
    // 清空target，预防下次重复使用
    Dep.target = null
  }
  handlerValue(vm, nestAttrs) {
    return nestAttrs
      .split('.')
      .reduce((parent, childAttr) => {
        return parent[childAttr]
      }, vm)
  }
  update() {
    let newValue = this.handlerValue(this.vm, this.key)
    if (this.oldValue === newValue) {
      return
    }
    // 更新compiler传入的更新cb
    this.cb(newValue)
  }
}

export default Watcher
