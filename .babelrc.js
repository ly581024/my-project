module.exports = {
  presets: [
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        development: process.env.NODE_ENV === 'development'
      }
    ]
  ]
}
