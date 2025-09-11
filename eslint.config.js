/*
 * @Author: xuwei
 * @Date: 2025-09-11 14:16:00
 * @LastEditors: lisaxw lisaxw@qq.com
 * @LastEditTime: 2025-09-11 16:21:35
 * @Description: Do not edit
 */
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
    // 忽略文件配置
    {
        ignores: [
            'node_modules/**',
            'dist/**',
            'build/**',
            'coverage/**',
            '**/.vite/**',
            'packages/**/dist/**',
            'packages/**/node_modules/**',
            '**/*.d.ts',
            '*.min.*',
        ],
    },
    // 主要配置
    {
        files: ['packages/**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
            globals: {
                // Node.js 环境
                console: 'readonly',
                process: 'readonly',
                Buffer: 'readonly',
                global: 'readonly',
                __dirname: 'readonly',
                __filename: 'readonly',
                // 浏览器环境
                window: 'readonly',
                document: 'readonly',
                navigator: 'readonly',
                localStorage: 'readonly',
                sessionStorage: 'readonly',
                setTimeout: 'readonly',
                clearTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                // React/JSX
                JSX: 'readonly',
                React: 'readonly',
            },
        },
        plugins: {
            react: pluginReact,
            'react-hooks': pluginHooks,
            import: pluginImport,
            'jsx-a11y': pluginA11y,
            '@typescript-eslint': tseslint.plugin,
            prettier,
        },
        settings: {
            react: { version: 'detect' },
            'import/resolver': {
                typescript: true,
                node: true,
            },
        },
        rules: {
            // 基础规则
            ...js.configs.recommended.rules,
            // TypeScript 规则
            '@typescript-eslint/no-unused-vars': [
                'warn',
                { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
            ],
            '@typescript-eslint/no-explicit-any': 'off',
            // React 规则
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            // React Hooks 规则
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            // 可访问性规则（放宽）
            'jsx-a11y/anchor-is-valid': 'off',
            // Import 规则（放宽）
            'import/order': 'off',
            // 其他规则
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-debugger': 'warn',
            'no-undef': 'off', // TypeScript 会处理这个
            'no-unused-vars': 'off', // 使用 TypeScript 版本
            'no-empty-pattern': 'off',
            // Prettier 规则
            'prettier/prettier': 'off', // 暂时关闭，避免构建失败
        },
    },
]
