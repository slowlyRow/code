import Watcher from './watcher.js'
/**
 * @description: 编译节点（文本、指令元素）
 */
class Compiler {
  constructor(vm) {
    this.vm = vm
    this.el = vm.$el
    this.compile(this.el)
  }
  compile(el) {
    // 去除所有子节点
    let childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        this.compileElement(node)
      } else {
        console.log('else-node: ', node)
      }
      // 节点中子节点递归
      if (node.childNodes && node.childNodes.length) {
        this.compile(node)
      }
    })
  }
  /**
   * @description: 编译元素节点
   * @param {*} node
   * @return {*}
   */
  compileElement(node) {
    Array.from(node.attributes).forEach(attribute => {
      if (this.isDirective(attribute.name)) {
        let handler = attribute.name.slice(2) + 'Updater'
        this[handler] && this[handler](node, attribute)
      }
    })
  }
  textUpdater(node, attribute) {
    let attrs =
      typeof attribute.textContent === 'string'
        ? attribute.textContent
        : JSON.stringify(attribute.textContent)
    node.textContent = this.handlerValue(attrs)
    new Watcher(
      this.vm,
      attribute.textContent,
      newValue => {
        node.textContent =
          typeof newValue === 'string'
            ? newValue
            : JSON.stringify(newValue)
      },
    )
  }
  modelUpdater(node, attribute) {
    node.value = this.handlerValue(attribute.value)
    new Watcher(this.vm, attribute.value, newValue => {
      node.value = newValue
    })
    node.addEventListener('input', () => {
      let attrs = attribute.value.split('.')
      attrs.reduce((parent, childAttr, index) => {
        if (index === attrs.length - 1) {
          parent[childAttr] = node.value
        }
        return parent[childAttr]
      }, this.vm)
    })
  }
  /**
   * @description: 处理data中属性所对应的值
   * @param {*} nestAttrs 嵌套属性
   * @return {*} 值
   */
  handlerValue(nestAttrs) {
    return nestAttrs
      .split('.')
      .reduce((parent, childAttr) => {
        return parent[childAttr]
      }, this.vm)
  }
  /**
   * @description: 编译文本节点
   * @param {*} node
   * @return {*}
   */
  compileText(node) {
    // 差值表达式 {{ text }} .匹配单个字符不包括换行 +多次匹配 ？非贪婪模式尽早匹配完毕
    let reg = /\{\{(.+?)\}\}/
    let value = node.textContent
    if (reg.test(value)) {
      const key = RegExp.$1.trim()
      node.textContent = value.replace(
        reg,
        this.handlerValue(key),
      )
      new Watcher(this.vm, key, newValue => {
        node.textContent = newValue
      })
    }
  }

  // 是否指令（属性v-）
  isDirective(attrName) {
    return attrName.startsWith('v-')
  }
  /**
   * @description: 判断节点是否文本
   * @param {*} node
   * @return {boolean}
   */
  isTextNode(node) {
    return node.nodeType === 3
  }
  /**
   * @description: 判断节点是否元素
   * @param {*} node
   * @return {boolean}
   */
  isElementNode(node) {
    return node.nodeType === 1
  }
}

export default Compiler
