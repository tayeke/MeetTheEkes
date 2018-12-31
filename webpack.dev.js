const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/index.js',
  },
  devtool: 'inline-source-map',
  plugins: [],
  output: {
    filename: 'meettheekes.dev.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules:[
      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: [ "html-loader" ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['url-loader?limit=100000']
      }
    ]
  },
  externals: {
    _jquery: 'jQuery'
  }
};
