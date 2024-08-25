import globals from 'globals'
import prettier from 'eslint-plugin-prettier'

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'all',
          printWidth: 80,
        },
      ],
    },
  },
]
