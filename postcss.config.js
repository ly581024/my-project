const postcssPresetEnv = require('postcss-preset-env')
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes')

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 2,
      features: {},
      autoprefixer: {}
    }),
    // 该插件用于修复 flexbugs 的问题
    // @see: https://github.com/luisrudge/postcss-flexbugs-fixes#readme
    postcssFlexbugsFixes({})
  ]
}
