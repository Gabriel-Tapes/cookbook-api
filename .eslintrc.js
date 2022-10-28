module.exports = {
   'env': {
      'es2021': true,
      'node': true,
   },
   'extends': [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
   ],
   'overrides': [
   ],
   'parser': '@typescript-eslint/parser',
   'parserOptions': {
      'ecmaVersion': 'latest',
      'sourceType': 'module',
   },
   'plugins': [
      '@typescript-eslint',
   ],
   'rules': {
      'indent': [
         'error',
         3,
      ],
      'linebreak-style': [
         'error',
         'unix',
      ],
      'quotes': [
         'error',
         'single',
      ],
      'semi': [
         'error',
         'never',
      ],
      'space-before-function-paren': 'off',
      'prefer-template': 1,
      '@typescript-eslint/no-non-null-assertion': 'off'
   }
}
