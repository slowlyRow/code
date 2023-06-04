const path = require('path');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const { merge } = require('webpack-merge');
const nodeExternals = require('webpack-node-externals')

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development'
const baseConfig = {
  mode,
  output: {
    publicPath: './',
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      { test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
}

module.exports = {
  serverConfig: merge(baseConfig, {
    target: 'node',
    entry: './src/entry/entry-server.js',
    output: {
      libraryTarget: 'commonjs2',
      path: path.resolve(__dirname, 'dist/server'),
    },
    externals: [nodeExternals({
      allowlist: [/\.css$/],
    })],
    plugins: [new VueSSRServerPlugin()],
    optimization: {
      splitChunks: false,
    },
  }),
  clientConfig: merge(baseConfig, {
    target: 'web',
    entry: './src/entry/entry-client.js',
    // module: {
    //   rules: [
    //     {
    //       test: /\.m?js$/,
    //       exclude: /(node_modules|bower-components)/,
    //       use: {
    //         loader: 'babel-loader',
    //         options: {
    //           presets: ['@babel/preset-env'],
    //           cacheDirectory: true,
    //           plugins: ['@babel/plugin-transform-runtime'],
    //         },
    //       },
    //     },
    //   ],
    // },
    output: {
      path: path.resolve(__dirname, 'dist/client'),
    },
    plugins: [new VueSSRClientPlugin()],
    optimization: {
      splitChunks: undefined,
    },
  }),
}
