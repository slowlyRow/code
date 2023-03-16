const path = require('path')

module.exports = { 
  mode: "development",
  context: path.join(__dirname, './src'),
  entry: './index.js', // string单入口 []多条件单入口, {}多条件多入口,fn条件返回前三种类型（支持promise）
  output: {
    filename: 'bundle.js',
  },
}
