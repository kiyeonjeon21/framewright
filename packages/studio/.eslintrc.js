const path = require('path')

module.exports = {
  rules: {
    'no-relative-imports': [
      'warn',
      {
        aliases: [
          {name: '@framewright/core', path: path.resolve(__dirname, '../core/src')},
          {
            name: '@framewright/studio',
            path: path.resolve(__dirname, './src'),
          },
        ],
      },
    ],
  },
}
