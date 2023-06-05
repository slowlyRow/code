const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');

module.exports = defineConfig(() => {
  // 客户端配置
  if (process.env.VUE_CLI_MODE === 'client') {
    return {
      outputDir: path.resolve(__dirname, 'dist/client'),
      publicPath: './',
      configureWebpack: {
        target: 'web',
        entry: './src/entry/entry-client.ts',
        plugins: [new VueSSRClientPlugin()],
      },
    };
  }
  // 服务端配置
  return {
    outputDir: path.resolve(__dirname, 'dist/server'),
    publicPath: './',
    configureWebpack: {
      target: 'node',
      entry: './src/entry/entry-server.ts',
      output: {
        libraryTarget: 'commonjs2',
      },
      plugins: [new VueSSRServerPlugin()],
      optimization: {
        splitChunks: false,
      },
    },
  };
});
