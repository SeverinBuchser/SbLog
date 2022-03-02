const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'library.js',
    library: {
      name: 'library',
      type: 'umd'
    },
  },
  target: 'node',
  externals: [nodeExternals()]
}
