import { init } from "snabbdom";
import { h } from "snabbdom";
import { styleModule } from "snabbdom";
import { eventListenersModule } from "snabbdom";

const patch = init([])
let app = document.querySelector('#app')
let vnode = h('ul', [
  h('li', { key: 1 }, 'li-1'),
  h('li', { key: 2 }, 'li-2'),
  h('li', { key: 3 }, 'li-3'),
])
patch(app, vnode)
patch(vnode, h('ul', [
  h('li', { key: 1 }, 'li-1'),
  h('li', { key: 3 }, 'li-3'),
  h('li', { key: 2 }, 'li-2'),
]))
