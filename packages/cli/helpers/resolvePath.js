const path = require('node:path')

// 基于 cmd 解析路径
exports.resolvePathWithCmd = str => {
  return path.resolve(process.cwd(), str)
}

// 基于 cmd 解析相对路径
exports.resolveRelaPathWithCmd = str => {
  return path.relative(process.cwd(), str)
}
