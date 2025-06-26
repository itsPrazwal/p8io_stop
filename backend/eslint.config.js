import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'

const nodeGlobals = {
  process: 'readonly',
  console: 'readonly',
  __dirname: 'readonly',
  __filename: 'readonly',
  Buffer: 'readonly'
}

export default [
  {
    ignores: ['node_modules/**', 'dist/**', '**/*.test.ts']
  },
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: nodeGlobals
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      import: importPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'no-console': 'warn',
      'no-unused-vars': 'warn',
      'import/extensions': [
        'error',
        'ignorePackages',
        {
          ts: 'always',
          js: 'always'
        }
      ]
    }
  },
  {
    rules: prettier.rules
  }
]
