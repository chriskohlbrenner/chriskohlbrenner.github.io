module.exports = {
  module: {
    loaders: [
      {
          test:   /\.css$/,
          loader: "style-loader!css-loader!postcss-loader"
      }
    ]
  },
  postcss: function (webpack) {
    return [
      require("postcss-import")({ addDependencyTo: webpack }),
      require("postcss-url")(),
      require("postcss-cssnext")({
        features: {
          customProperties: {
            variables: colorVars // `colorVars` will be defined above, see step 4.
          }
        }
      }),
      require("postcss-browser-reporter")(),
      require("postcss-reporter")(),
    ]
  },
}