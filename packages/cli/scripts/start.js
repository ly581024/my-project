const minimist = require('minimist')
const webpack = require('webpack')
const DevServer = require('webpack-dev-server')
const devConfig = require('../webpack/webpack.dev')

/**
 * @type {{_: []}}
 * @property {?string} output 资产输出目录
 * @property {?string} port 服务启动端口
 */
const argv = minimist(process.argv.slice(2))

async function runServerInDev() {
  const compiler = webpack(devConfig)
  const server = new DevServer({}, compiler)
  await server.start()
}

runServerInDev().catch(e => {
  console.error(e)
})
