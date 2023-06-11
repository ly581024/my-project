#!/usr/bin/env node
const { spawn } = require('node:child_process')
const argv = process.argv.slice(2)

function findCmdIndex(args = []) {
  return args.findIndex(n => ['start', 'build', 'test', 'lint'].includes(n))
}

function runCLI(options = {}) {
  spawn(options.cmd, [options.script].concat(options.args), {
    env: Object.assign({}, process.env, options.env),
    windowsVerbatimArguments: true,
    stdio: 'inherit'
  })
}

function main() {
  const index = findCmdIndex(argv)
  if (index === -1) {
    console.log(`[ERR_CMD_NOT_FOUND]: Currently "${argv[0]}" command not found.`)
    console.log('  - expectation: "start", "build", "test", "lint"\n\n')
    process.exit(1)
  }

  const cliOptions = {
    cmd: 'node',
    args: argv.slice(index + 1),
    script: __dirname + `/scripts/${argv[index]}`,
    env: {
      NODE_ENV: argv[index] !== 'start' ? 'production' : 'development',
      YII_SCRIPT_CMD_NAME: argv[index]
    }
  }

  runCLI(cliOptions)
}

main()
