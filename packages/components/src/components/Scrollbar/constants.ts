/**
 * Scrollbar 组件常量配置
 */

// 默认配置
export const DEFAULT_CONFIG = {
    /** 默认滚动条大小 */
    SCROLLBAR_SIZE: 8,
    /** 默认滑块最小尺寸 */
    MIN_THUMB_SIZE: 20,
    /** 轨道比滑块大的像素数 */
    TRACK_PADDING: 2,
    /** 默认类名前缀 */
    PREFIX_CLS: 'adp-scrollbar',
    /** 默认滚动条颜色 */
    SCROLLBAR_COLOR: 'rgba(0, 0, 0, 0.25)',
    /** 默认轨道颜色 */
    TRACK_COLOR: 'rgba(0, 0, 0, 0.06)',
} as const

// 透明度配置
export const OPACITY_CONFIG = {
    /** 滑块默认透明度 */
    THUMB_DEFAULT: 0.6,
    /** 滑块 hover 透明度 */
    THUMB_HOVER: 1,
    /** 滑块 active 透明度 */
    THUMB_ACTIVE: 1,
    /** 轨道默认透明度 */
    TRACK_DEFAULT: 0.3,
    /** 轨道 hover 透明度 */
    TRACK_HOVER: 0.8,
} as const

// Z-index 层级
export const Z_INDEX = {
    /** 轨道层级 */
    TRACK: 1000,
    /** 滑块层级 */
    THUMB: 1001,
} as const

// 响应式断点
export const RESPONSIVE_CONFIG = {
    /** 移动端滚动条大小 */
    MOBILE_SCROLLBAR_SIZE: 6,
} as const
