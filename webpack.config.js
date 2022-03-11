const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyPkgJsonPlugin = require("copy-pkg-json-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

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
  externals: [nodeExternals()],
  plugins: [
    new CopyPlugin({
      patterns: [
        './README.md'
      ],
    }),
    new CopyPkgJsonPlugin({
      remove: ['scripts', 'devDependencies']
    }),
  ]
}
