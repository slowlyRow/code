/**
 * @description: 防抖函数 一段时间interval内只执行最后一次fn操作，通过返回函数将timer保存在函数中，延长timer生命周期
 * @param {*} fn
 * @param {*} interval
 * @return {*} 闭包函数fn
 */
function debounceBase(fn, interval) {
  let timer
  return (logs) => {
    console.log('timer: ', Boolean(timer));

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(logs)
      clearTimeout(timer)
      timer = null
    }, interval);
  }
}
const debounce1 = debounceBase(consolelogs, 1000)

function consolelogs(logs) {
  console.log(logs)
}

// 模拟多次执行同一个debounce1
debounce1(1)
debounce1(2)
setTimeout(() => {
  debounce1(3)
}, 30);
setTimeout(() => {
  debounce1(4)
}, 3000);