/**
 * 组件库常量定义
 */

export const PREFIX = 'adp'

export const SIZES = {
    SMALL: 'small',
    MIDDLE: 'middle',
    LARGE: 'large',
} as const

export const TYPES = {
    PRIMARY: 'primary',
    DEFAULT: 'default',
    DASHED: 'dashed',
    LINK: 'link',
    TEXT: 'text',
} as const

export type Size = (typeof SIZES)[keyof typeof SIZES]
export type Type = (typeof TYPES)[keyof typeof TYPES]
