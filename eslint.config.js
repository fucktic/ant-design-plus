/* ESLint v9 扁平配置（根配置，适用于 monorepo） */
import js from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import pluginHooks from 'eslint-plugin-react-hooks'
import pluginImport from 'eslint-plugin-import'
import pluginA11y from 'eslint-plugin-jsx-a11y'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'

export default [
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        ignores: [
            'node_modules/**',
            'dist/**',
            'build/**',
            'coverage/**',
            '**/.vite/**',
            'packages/**/dist/**',
            'packages/**/node_modules/**',
            '*.d.ts',
            '*.min.*',
        ],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...js.configs.recommended.languageOptions.globals,
                JSX: 'readonly',
            },
        },
        plugins: {
            react: pluginReact,
            'react-hooks': pluginHooks,
            import: pluginImport,
            'jsx-a11y': pluginA11y,
            prettier,
        },
        settings: {
            react: { version: 'detect' },
            'import/resolver': { typescript: true, node: true },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended[0].rules,
            ...pluginReact.configs.recommended.rules,
            ...pluginHooks.configs.recommended.rules,
            ...pluginA11y.configs.recommended.rules,
            // 关闭与 Prettier 冲突的规则
            ...configPrettier.rules,
            // 项目自定义
            'prettier/prettier': 'error',
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            'import/order': [
                'warn',
                {
                    groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'warn',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
        },
    },
]
