/**
 * @description: 节流函数 一段时间interval内只执行第一次fn操作，通过返回函数将timer保存在函数中，延长timer生命周期
 * @param {*} fn 每次执行的函数
 * @param {*} interval 执行间隔
 * @return {*} 闭包函数fn
 */
function throttleBase(fn, interval) {
  let timer
  return (logs) => {
    console.log('timer: ', Boolean(timer));

    if (timer) return
    fn(logs)
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = null
    }, interval);
  }
}

/**
 * @description: throttle 节流函数 第一次确定fn、interval
 */
const throttle1 = throttleBase(consolelogs, 1000)
function consolelogs(logs) {
  console.log(logs)
}

// 模拟多次执行同一个throttle1
throttle1(1)
throttle1(2)
setTimeout(() => {
  throttle1(3)
}, 30);
setTimeout(() => {
  throttle1(4)
}, 3000);