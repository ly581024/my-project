const { ESLint } = require('eslint')
const minimist = require('minimist')

/** @type {{_: [], ext?:string, fix?: boolean}} **/
const argv = minimist(process.argv.slice(2))

/** @type {import('eslint').ESLint.Options} **/
const eslintOptions = {
  fix: argv.fix,
  useEslintrc: true,
  cwd: process.cwd(),
  overrideConfig: {
    settings: {
      react: {
        version: '18.2.0'
      }
    }
  }
}

async function runESLint() {
  // 1. Create an eslint instance with `eslintOptions` options.
  const eslint =  new ESLint(eslintOptions)
  // 2. Lint files. This doesn't modify target files.
  const result = await eslint.lintFiles(argv.ext ?? 'src/**/*.{js,jsx,ts,tsx}')
  // 3. Modify the files with the fixed code.
  await ESLint.outputFixes(result)
  // 4. Format the result
  const formatter = await eslint.loadFormatter('stylish')
  const resultText = formatter.format(result)

  if (resultText.trim().length > 0) {
    console.error(resultText)
    process.exit(1)
  }
}

runESLint().catch(e => {
  console.error(e)
  process.exit(1)
})
