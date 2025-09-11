/*
 * @Author: xuwei
 * @Date: 2025-09-11 00:14:49
 * @LastEditors: lisaxw lisaxw@qq.com
 * @LastEditTime: 2025-09-11 15:16:21
 * @Description: Do not edit
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            exclude: ['**/*.stories.tsx', '**/*.test.tsx'],
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'AntDesignPlus',
            formats: ['es', 'umd'],
            fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', '@ant-design/icons'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',

                    '@ant-design/icons': 'AntdIcons',
                },
            },
        },
    },
})
