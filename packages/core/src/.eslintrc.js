module.exports = {
  rules: {
    'no-restricted-syntax': [
      'error',
      {
        selector: `ImportDeclaration[importKind!='type'][source.value=/@theatre\\u002Fstudio/]`,
        message:
          '@framewright/core may not import @framewright/studio modules except via type imports.',
      },
    ],
  },
}
