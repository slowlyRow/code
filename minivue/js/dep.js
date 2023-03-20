/**
 * @description: 依赖管理dependence
 *               存储watcher跟踪变化，变化时通知watcher触发compiler更新dom操作
 */
class Dep {
  constructor() {
    // 存储所有watcher对象作为跟踪依赖
    this.subs = []
  }
  // 存储可更新的依赖
  addSub(sub) {
    if (sub.update) {
      this.subs.push(sub)
    }
  }
  notify() {
    // 将所有依赖更新 （更新规则在vdom中建立）
    this.subs.forEach(sub => {
      sub.update && sub.update()
    })
  }
}

export default Dep
