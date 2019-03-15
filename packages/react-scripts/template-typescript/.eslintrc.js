const isProd = process.env.NODE_ENV === 'production'

const baseRules = {
  // https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules
  // '@typescript-eslint/adjacent-overload-signatures': 'error',
  // '@typescript-eslint/array-type': 'error',
  // '@typescript-eslint/ban-types': 'error',
  '@typescript-eslint/ban-ts-ignore': 'off',
  // camelcase: 'off',
  '@typescript-eslint/camelcase': 'error',
  // '@typescript-eslint/class-name-casing': 'error',
  '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
  // '@typescript-eslint/explicit-member-accessibility': 'error',
  '@typescript-eslint/generic-type-naming': 'off',
  // indent: 'off',
  // '@typescript-eslint/indent': ['error', 4],
  // '@typescript-eslint/interface-name-prefix': 'error',
  // '@typescript-eslint/member-delimiter-style': 'error',
  '@typescript-eslint/member-naming': ['error', { private: '^_' }],
  '@typescript-eslint/member-ordering': 'off',
  // '@typescript-eslint/no-angle-bracket-type-assertion': 'error',
  // 'no-array-constructor': 'off',
  // '@typescript-eslint/no-array-constructor': 'error',
  // '@typescript-eslint/no-empty-interface': 'error',
  '@typescript-eslint/no-explicit-any': 'error',
  '@typescript-eslint/no-extraneous-class': 'error',
  '@typescript-eslint/no-for-in-array': 'error',
  // '@typescript-eslint/no-inferrable-types': 'error',
  // '@typescript-eslint/no-misused-new': 'error',
  // '@typescript-eslint/no-namespace': 'error',
  // '@typescript-eslint/no-non-null-assertion': 'error',
  // '@typescript-eslint/no-object-literal-type-assertion': 'error',
  // '@typescript-eslint/no-parameter-properties': 'error',
  '@typescript-eslint/no-require-imports': 'error',
  '@typescript-eslint/no-this-alias': 'error',
  // '@typescript-eslint/no-triple-slash-reference': 'error',
  // TODO: 有 bug，会报 'Cannot read property '0' of undefined' 的错误
  // '@typescript-eslint/no-type-alias': 'off',
  '@typescript-eslint/no-unnecessary-qualifier': 'off',
  '@typescript-eslint/no-unnecessary-type-assertion': 'off',
  // 'no-unused-vars': 'off',
  '@typescript-eslint/no-unused-vars': [
    'warn',
    {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: true,
    },
  ],
  // '@typescript-eslint/no-use-before-define': 'error',
  '@typescript-eslint/no-useless-constructor': 'error',
  // '@typescript-eslint/no-var-requires': 'error',
  '@typescript-eslint/prefer-function-type': 'error',
  // '@typescript-eslint/prefer-interface': 'error',
  // '@typescript-eslint/prefer-namespace-keyword': 'error',
  // TODO: 有 bug ，会导致 prettier 报错
  '@typescript-eslint/promise-function-async': 'off',
  // TODO: 有 bug ，会导致 prettier 报错
  '@typescript-eslint/restrict-plus-operands': 'off',
  // '@typescript-eslint/type-annotation-spacing': 'error',

  'import/no-unresolved': ['error', { commonjs: true, caseSensitive: true, ignore: ['-/'] }],
  // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md
  'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
  // require or disallow use of semicolons instead of ASI
  // https://eslint.org/docs/rules/semi#require-or-disallow-semicolons-instead-of-asi-semi
  // semi: ['error', 'never'],
  // disallow the use of console (no-console)
  // https://eslint.org/docs/rules/no-console#disallow-the-use-of-console-no-console
  'no-console': [
    'warn',
    {
      allow: ['warn', 'error'],
    },
  ],
  // disallow declaration of variables that are not used in the code (no-unused-vars)
  // https://eslint.org/docs/rules/no-unused-vars
  'no-unused-vars': ['off'],
  // Enforce all defaultProps have a corresponding non-required PropType
  // https://github.com/yannickcr/eslint-plugin-react/blob/9e13ae2c51e44872b45cc15bf1ac3a72105bdd0e/docs/rules/default-props-match-prop-types.md
  'react/default-props-match-prop-types': ['off', { allowRequiredDefaults: false }],
  // disallow use of variables before they are defined
  // https://eslint.org/docs/rules/no-use-before-define
  'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
  // Requires operator at the beginning of the line in multiline statements
  // https://eslint.org/docs/rules/operator-linebreak
  'operator-linebreak': ['off', 'before', { overrides: { '=': 'none' } }],
  // 'max-len': [2, { code: 80 }],
  // 'prettier/prettier': 'error',

  // Forbid the use of extraneous packages
  // https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-extraneous-dependencies.md
  // paths are treated both as absolute paths, and relative to process.cwd()
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: true,
      optionalDependencies: false,
    },
  ],
  'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
  'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies
}

const prodRules = Object.assign({}, baseRules, {
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      vars: 'all',
      args: 'after-used',
      ignoreRestSiblings: true,
    },
  ],
  // disallow the use of console (no-console)
  // https://eslint.org/docs/rules/no-console#disallow-the-use-of-console-no-console
  'no-console': [
    'error',
    {
      allow: ['warn', 'error'],
    },
  ],
})

module.exports = {
  root: true,
  plugins: ['react-hooks'],
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    useJSXTextNode: true,
    project: './tsconfig.json',
    tsconfigRootDir: './',
    // extraFileExtensions: ['.vue'],
  },
  env: {
    browser: true,
    jest: true,
  },
  rules: isProd ? prodRules : baseRules,
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
}
