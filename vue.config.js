const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // The GitHub repo is public, so this isn't a disclosure risk today, but
  // there's no reason to ship full de-minified source maps (incl. the vendor
  // bundle) to every visitor by default.
  productionSourceMap: false
})
