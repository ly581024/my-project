const createLoaderWithName = name => {
  const uses = [
    'style-loader',
    {
      loader: 'css-loader',
      options: {}
    },
    {
      loader: 'postcss-loader',
      options: {}
    }
  ]

  // 使用 sass 语法解析器
  if (['sass', 'scss'].includes(name)) {
    uses.push({
      loader: 'sass-loader',
      options: {}
    })
  }

  // 使用 less 语法解析器
  if (name === 'less') {
    uses.push({
      loader: 'less-loader',
      options: {}
    })
  }

  return {
    test: new RegExp('\\.' + name + '$', 'i'),
    use: uses
  }
}

exports.getStyleLoaders = (tests = []) => {
  let loaders = []

  for (const name of tests) {
    const loader = createLoaderWithName(name)
    loaders = loaders.concat(loader)
  }

  return loaders
}
