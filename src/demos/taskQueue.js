// 事件循环机制
// 原理简图： import a from './assets/taskQueue/queue.png'
// 宏任务：script、settimeout、setinterval、setimmediate、 I/O、UI、rendering
// 微任务：promise、nexttick、MutationObserver
// 执行地方：函数调用栈
/* 执行规律：
先宏任务，后微任务；
优先同类型任务，如settimout优先于setimmediate，nexttick优先于promise；
一个宏任务及其分发的所有微任务全部完成，再继续下一个宏任务及其分发。 */

// 执行流程
// 1、宏任务script执行，js全局上下文进入函数调用栈，按顺序执行js，分发遇到宏任务/微任务稍后执行，直接执行同步代码完成，执行所有微任务，完成一次循环。
// 2、再执行任务队列中下一个宏任务同步代码，及其分发的所有微任务，完成一次循环。
// 3、如上一次类推，完成全部js执行即完成所有事件循环。

console.log('golb1');

setTimeout(function () {
  console.log('timeout1');
  process.nextTick(function () {
    console.log('timeout1_nextTick');
  })
  new Promise(function (resolve) {
    console.log('timeout1_promise');
    resolve();
  }).then(function () {
    console.log('timeout1_then')
  }).then(function () {
    console.log('timeout1_then2')
  })
  process.nextTick(function () {
    console.log('timeout1_nextTick2');
  })
  setTimeout(function () {
    console.log('timeout3');
  })
})

setImmediate(function () {
  console.log('immediate1');
  process.nextTick(function () {
    console.log('immediate1_nextTick');
  })
  new Promise(function (resolve) {
    console.log('immediate1_promise');
    resolve();
  }).then(function () {
    console.log('immediate1_then')
  })
})

process.nextTick(function () {
  console.log('glob1_nextTick');
})
new Promise(function (resolve) {
  console.log('glob1_promise');
  resolve();
}).then(function () {
  console.log('glob1_then')
})

setTimeout(function () {
  console.log('timeout2');
  process.nextTick(function () {
    console.log('timeout2_nextTick');
  })
  new Promise(function (resolve) {
    console.log('timeout2_promise');
    resolve();
  }).then(function () {
    console.log('timeout2_then')
  })
})

process.nextTick(function () {
  console.log('glob2_nextTick');
})
new Promise(function (resolve) {
  console.log('glob2_promise');
  resolve();
}).then(function () {
  console.log('glob2_then')
})

setImmediate(function () {
  console.log('immediate2');
  process.nextTick(function () {
    console.log('immediate2_nextTick');
  })
  new Promise(function (resolve) {
    console.log('immediate2_promise');
    resolve();
  }).then(function () {
    console.log('immediate2_then')
  })
})