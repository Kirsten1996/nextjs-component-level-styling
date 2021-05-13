const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')

module.exports = withSass(
  withCSS({
    webpack(config, options) {
      if (config.optimization.splitChunks) {
        config.optimization.splitChunks.cacheGroups.shared = {
          name: 'app-other',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }

      config.module.rules.push({
        test: /\.(ico|png|jpg|gif|svg|eot|ttf|woff|woff2|mp4)$/,
        use: {
          loader: 'url-loader'
        }
      })
      return config
    },
  })
)
