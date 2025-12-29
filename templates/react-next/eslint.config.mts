import js from '@eslint/js'
import globals from 'globals'
import tsEslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import {defineConfig, globalIgnores} from 'eslint/config'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        plugins: {js},
        extends: ['js/recommended'],
        languageOptions: {globals: globals.browser}
    },
    tsEslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    pluginReactHooks.configs.flat.recommended,
    {
        rules: {
            'no-case-declarations': 0,
            '@typescript-eslint/ban-ts-comment': 0,
            '@typescript-eslint/no-explicit-any': 0,
            '@typescript-eslint/no-unused-expressions': 0,
            'react/display-name': 0,
            'react/react-in-jsx-scope': 0,
            'react/no-unknown-property': [2, {'ignore': ['css']}]
        }
    },
    globalIgnores([
        'test'
    ])
])
