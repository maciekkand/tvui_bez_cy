const path = require('path')
const PrerenderSpaPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSpaPlugin.PuppeteerRenderer
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return

    return {
      plugins: [
        // new BundleAnalyzerPlugin({
        //   analyzerMode: 'server',
        //   generateStatsFile: true,
        //   mode: 'production',
        //   openAnalyzer: false
        // }),
        new PrerenderSpaPlugin(
          path.resolve(__dirname, 'dist'),
          [ '/', '/about', '/stations' ],
          new Renderer({
            headless: true,
            renderAfterDocumentEvent: 'render-event'
          }),
        )
      ]
    }
  }
}
