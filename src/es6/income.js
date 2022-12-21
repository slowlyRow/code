// let count = 0
// const add = function () {
//   count += 1
//   return count
// }
// export { count, add } //index 解构导出，与下方分别导出一致

export let count = 0 //index 解构导出
export const add = function () {
  count += 1
  return count
} //index 解构导出


// export default { count:count, add } // out 整体导出对象及其属性
