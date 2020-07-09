const path = require('path')
const myWebpackPlugin = require('./plugins/MyWebpackPlugin');

module.exports = {
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new myWebpackPlugin(),
  ],
  devServer: {
    contentBase: './dist',
    port: '8000',
    inline: true,
    historyApiFallback: true
  }
}
