/* 根 ESLint 配置：适用于所有 packages（React + TS + Vite 项目） */
module.exports = {
    root: true,
    env: {
        browser: true,
        es2023: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
        project: false,
    },
    settings: {
        react: { version: 'detect' },
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'import', 'jsx-a11y', 'prettier'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended' /* 等同于 extends 'prettier' + 启用 prettier 插件报错 */,
    ],
    rules: {
        'prettier/prettier': ['error'],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'import/order': [
            'warn',
            {
                groups: [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
                alphabetize: { order: 'asc', caseInsensitive: true },
                'newlines-between': 'always',
            },
        ],
        'no-console': ['warn', { allow: ['warn', 'error'] }],
        'no-debugger': 'warn',
    },
    ignorePatterns: [
        'node_modules/',
        'dist/',
        'build/',
        'coverage/',
        '*.d.ts',
        '*.min.*',
        '**/.vite/**',
    ],
    overrides: [
        {
            files: ['**/*.ts', '**/*.tsx'],
            rules: {
                '@typescript-eslint/no-unused-vars': [
                    'warn',
                    { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
                ],
            },
        },
    ],
}
