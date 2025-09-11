import { css } from 'styled-components'
import { Theme } from './ThemeProvider'

// 响应式断点工具函数
export const media = {
    xs: (styles: any) => css`
        @media (min-width: ${(props: { theme: Theme }) => props.theme.breakpoints.xs}) {
            ${styles}
        }
    `,
    sm: (styles: any) => css`
        @media (min-width: ${(props: { theme: Theme }) => props.theme.breakpoints.sm}) {
            ${styles}
        }
    `,
    md: (styles: any) => css`
        @media (min-width: ${(props: { theme: Theme }) => props.theme.breakpoints.md}) {
            ${styles}
        }
    `,
    lg: (styles: any) => css`
        @media (min-width: ${(props: { theme: Theme }) => props.theme.breakpoints.lg}) {
            ${styles}
        }
    `,
    xl: (styles: any) => css`
        @media (min-width: ${(props: { theme: Theme }) => props.theme.breakpoints.xl}) {
            ${styles}
        }
    `,
}

// 创建渐变背景的工具函数
export const createGradient = (color1: string, color2: string, direction = '135deg') => css`
    background: linear-gradient(${direction}, ${color1} 0%, ${color2} 100%);
`

// 创建悬停效果的工具函数
export const createHoverEffect = (
    translateY = '-2px',
    shadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
) => css`
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        transform: translateY(${translateY});
        box-shadow: ${shadow};
    }

    &:active {
        transform: translateY(-1px);
    }
`

// 创建按钮样式的工具函数
export const createButtonVariant = (
    bgColor: string,
    textColor: string,
    hoverBgColor?: string,
    activeBgColor?: string
) => css`
    background-color: ${bgColor};
    color: ${textColor};
    border: 1px solid ${bgColor};

    &:hover {
        background-color: ${hoverBgColor || bgColor};
        border-color: ${hoverBgColor || bgColor};
        color: ${textColor};
    }

    &:active {
        background-color: ${activeBgColor || hoverBgColor || bgColor};
        border-color: ${activeBgColor || hoverBgColor || bgColor};
    }
`
