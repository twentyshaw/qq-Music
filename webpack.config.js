
module.exports = {
  entry: './script/app.js',
  output: {
    filename: 'dist/app.js'
  },

  module: {
  rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
}

