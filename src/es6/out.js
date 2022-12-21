// import {default as income} from './income.js'
import * as income from './income.js'
// import income from './income.js'

// console.log('default count:', income)
console.log('index count:', income.count)
const sum = income.add(1, 1)
console.log('index sum:', sum)
console.log('index count:', income.count)
