module.exports = {
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: `ImportDeclaration[importKind!='type'][source.value=/@theatre\\u002Fcore\\u002F/]`,
        message:
          '@framewright/studio may not import @framewright/core/* modules except via type imports.',
      },
    ],
  },
}
