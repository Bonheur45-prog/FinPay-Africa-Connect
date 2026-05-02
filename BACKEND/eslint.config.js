import js from '@eslint/js'
import globals from 'globals'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.node,  // ← Add Node.js globals
        ...globals.es2020
      },
      parserOptions: {
        sourceType: 'module',
      },
    },
    rules: js.configs.recommended.rules,
  },
]