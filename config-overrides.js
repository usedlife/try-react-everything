const { addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  addWebpackAlias({
    "@": path.resolve(__dirname, 'src')
  })(config)
  return config;
}