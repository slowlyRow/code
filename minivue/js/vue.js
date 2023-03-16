import Observer from './observer.js'
/**
 * @description: Vue构造函数 接收options，初始化实例上的属性、方法，vue的入口
 */
class Vue {
  constructor(options) {
    // 1、保存传入的options参数到vue实例上
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el =
      typeof options.el === 'string'
        ? document.querySelector(options.el)
        : options.el
    // 2、遍历data中所有属性注入vue实例中,并重设其get、set方法
    this._proxyData(this.$data)
    // 3、监听data变化通知监听者
    new Observer(this.$data)
  }
  // 将data复制到vue实例中
  _proxyData(data) {
    // 遍历data中所有属性注入vue实例中,并重设其get、set方法
    Object.keys(data).forEach(key => {
      //mdn Object.defineProperty;
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          console.log('get-vm: ', data[key])
          return data[key]
        },
        set(newValue) {
          console.log('set-vm: ', newValue)
          if (data[key] === newValue) {
            return
          }
          data[key] = newValue
        },
      })
    })
  }
}

export default Vue
