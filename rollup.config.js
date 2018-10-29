const babel = require('rollup-plugin-babel')

const umd = {
  input: 'src/index.js',
  output: [
    {
      name: 'ActionSack',
      file: 'dist/actionsack.umd.js',
      format: 'umd',
      sourcemap: true,
      exports: 'named'
    }
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      babelrc: true
    })
  ]
}

module.exports = umd
