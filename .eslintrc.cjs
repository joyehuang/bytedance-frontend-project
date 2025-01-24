module.exports = {
    root: true,
    env: {
      browser: true,
      es2021: true
    },
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
      'plugin:react/recommended',
      'prettier'  // 确保 prettier 在最后
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 12,
      sourceType: 'module'
    },
    plugins: [
      'react',
      '@typescript-eslint',
      'prettier'
    ],
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': 'error'
    },
    settings: {
      react: {
        version: 'detect'
      },
      'import/resolver': {
        typescript: {},
        alias: {
          map: [
            ['@', './src'],
          ],
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  }