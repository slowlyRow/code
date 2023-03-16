import { init } from "snabbdom";
import { h } from "snabbdom";
import { styleModule } from "snabbdom";
import { eventListenersModule } from "snabbdom";

const patch = init([
  styleModule,
  eventListenersModule
])
let app = document.querySelector('#app')
let vnode = h('div#appnew', {
  hook: {
    init(vnode) {
      console.log('vnode: ', vnode);
    },
    create(old, vnode) {
      console.log('create-old: ', old);
      console.log('create-vnode: ', vnode);
      console.log('elm: ', vnode.elm);
    },

  }
}, 'lala')
patch(app, vnode)

const vvnode = h('div#appnew2',
  [
    '2222',
    h('p.font', '我是p'),
    h('p.font2', { style: { background: 'red' } }, '我是背景p'),
    h(
      'p.font3',
      {
        on: {
          click: () => { alert('我被电击了') },
          mouseenter: (t) => {
            console.log('t: ', t);
            t.target.innerText = '快点击我'
          }
        },
        style: { cursor: 'pointer', },

      },
      '我是事件p')
  ])

setTimeout(() => {
  patch(vnode, vvnode)

  setTimeout(() => {
    // patch(vvnode, h('!'));
  }, 1000);

}, 1000);