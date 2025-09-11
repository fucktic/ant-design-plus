/**
 * 代码高亮工具 - 基于 react-syntax-highlighter
 * 提供多种主题和语言支持
 */

// 导入常用的主题
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs'

// 主题配置
export const themes = {
    vscDarkPlus,
    github,
    atomOneDark,
    vs2015,
} as const

export type ThemeName = keyof typeof themes

/**
 * 检测代码语言
 */
export const detectLanguage = (code: string): string => {
    // 检测 React/JSX
    if (
        code.includes('import React') ||
        code.includes('jsx') ||
        (code.includes('<') && code.includes('/>'))
    ) {
        return 'tsx'
    }

    // 检测 TypeScript
    if (
        code.includes('interface ') ||
        code.includes('type ') ||
        code.includes(': string') ||
        code.includes(': number')
    ) {
        return 'typescript'
    }

    // 检测 JavaScript
    if (
        code.includes('function ') ||
        code.includes('const ') ||
        code.includes('let ') ||
        code.includes('var ')
    ) {
        return 'javascript'
    }

    // 检测 CSS
    if (
        code.includes('{') &&
        code.includes('}') &&
        code.includes(':') &&
        !code.includes('function')
    ) {
        return 'css'
    }

    // 检测 JSON
    if (code.trim().startsWith('{') && code.trim().endsWith('}') && code.includes('"')) {
        return 'json'
    }

    // 检测 HTML
    if (code.includes('<!DOCTYPE') || code.includes('<html') || code.includes('<div')) {
        return 'html'
    }

    // 默认返回 typescript
    return 'typescript'
}

/**
 * 获取主题样式
 */
export const getThemeStyle = (themeName: ThemeName = 'vscDarkPlus') => {
    return themes[themeName]
}

/**
 * 代码高亮的默认配置
 */
export const defaultHighlightConfig = {
    showLineNumbers: false,
    wrapLines: true,
    wrapLongLines: true,
    customStyle: {
        margin: 0,
        borderRadius: '6px',
        fontSize: '13px',
        lineHeight: '1.45',
        fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
    },
}

/**
 * 轻量级代码高亮（备用方案）
 * 当 react-syntax-highlighter 不可用时使用
 */
export const lightweightHighlight = (code: string): string => {
    // 简单的关键字高亮
    const keywords = [
        'import',
        'export',
        'from',
        'const',
        'let',
        'var',
        'function',
        'return',
        'if',
        'else',
        'for',
        'while',
        'do',
        'switch',
        'case',
        'break',
        'continue',
        'try',
        'catch',
        'finally',
        'throw',
        'new',
        'class',
        'extends',
        'interface',
        'type',
        'enum',
        'namespace',
        'module',
        'declare',
        'public',
        'private',
        'protected',
        'static',
        'readonly',
        'abstract',
        'async',
        'await',
        'yield',
        'true',
        'false',
        'null',
        'undefined',
        'void',
        'any',
        'string',
        'number',
        'boolean',
        'object',
        'symbol',
        'bigint',
        'React',
        'ReactNode',
        'FC',
    ]

    let highlightedCode = code
        // 转义HTML字符
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')

    // 高亮关键字
    keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, 'g')
        highlightedCode = highlightedCode.replace(
            regex,
            `<span style="color: #d73a49; font-weight: 600;">${keyword}</span>`
        )
    })

    // 高亮字符串
    highlightedCode = highlightedCode.replace(
        /(&quot;)((?:\\.|(?!&quot;)[^\\])*?)(&quot;)/g,
        '<span style="color: #032f62;">$1$2$3</span>'
    )

    // 高亮注释
    highlightedCode = highlightedCode.replace(
        /(\/\/.*$)/gm,
        '<span style="color: #6a737d; font-style: italic;">$1</span>'
    )

    return highlightedCode
}
