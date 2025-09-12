import { ScrollbarConfig } from './types'
import { DEFAULT_CONFIG } from './constants'

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
        clearTimeout(timeout)
        timeout = setTimeout(() => func(...args), wait)
    }
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args)
            inThrottle = true
            setTimeout(() => (inThrottle = false), limit)
        }
    }
}

/**
 * 安全地获取元素尺寸
 */
export function getElementSize(element: HTMLElement | null): {
    width: number
    height: number
    scrollWidth: number
    scrollHeight: number
    clientWidth: number
    clientHeight: number
} {
    if (!element) {
        return {
            width: 0,
            height: 0,
            scrollWidth: 0,
            scrollHeight: 0,
            clientWidth: 0,
            clientHeight: 0,
        }
    }

    return {
        width: element.offsetWidth,
        height: element.offsetHeight,
        scrollWidth: element.scrollWidth,
        scrollHeight: element.scrollHeight,
        clientWidth: element.clientWidth,
        clientHeight: element.clientHeight,
    }
}

/**
 * 计算滑块尺寸
 */
export function calculateThumbSize(
    containerSize: number,
    contentSize: number,
    minSize: number = DEFAULT_CONFIG.MIN_THUMB_SIZE
): number {
    if (contentSize <= containerSize) return 0

    const ratio = containerSize / contentSize
    const thumbSize = containerSize * ratio

    return Math.max(thumbSize, minSize)
}

/**
 * 计算滑块位置
 */
export function calculateThumbPosition(
    scrollPosition: number,
    containerSize: number,
    contentSize: number,
    thumbSize: number
): number {
    if (contentSize <= containerSize || thumbSize === 0) return 0

    const maxScrollPosition = contentSize - containerSize
    const maxThumbPosition = containerSize - thumbSize

    if (maxScrollPosition <= 0) return 0

    const position = (scrollPosition / maxScrollPosition) * maxThumbPosition

    return Math.max(0, Math.min(position, maxThumbPosition))
}

/**
 * 验证滚动条配置
 */
export function validateScrollbarConfig(config: Partial<ScrollbarConfig>): ScrollbarConfig {
    return {
        scrollbarSize: Math.max(config.scrollbarSize || DEFAULT_CONFIG.SCROLLBAR_SIZE, 4),
        minThumbSize: Math.max(config.minThumbSize || DEFAULT_CONFIG.MIN_THUMB_SIZE, 10),
        trackPadding: Math.max(config.trackPadding || DEFAULT_CONFIG.TRACK_PADDING, 0),
        prefixCls: config.prefixCls || DEFAULT_CONFIG.PREFIX_CLS,
        scrollbarColor: config.scrollbarColor || DEFAULT_CONFIG.SCROLLBAR_COLOR,
        trackColor: config.trackColor || DEFAULT_CONFIG.TRACK_COLOR,
    }
}

/**
 * 检查是否需要滚动条
 */
export function shouldShowScrollbar(
    containerSize: number,
    contentSize: number,
    showScrollbar: boolean
): boolean {
    return showScrollbar && contentSize > containerSize
}

/**
 * 限制数值范围
 */
export function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
}

/**
 * 检查是否为有效数字
 */
export function isValidNumber(value: any): value is number {
    return typeof value === 'number' && !isNaN(value) && isFinite(value)
}

/**
 * 安全地设置滚动位置
 */
export function safeScrollTo(
    element: HTMLElement | null,
    options: { left?: number; top?: number; behavior?: ScrollBehavior }
): void {
    if (!element) return

    try {
        element.scrollTo({
            left: isValidNumber(options.left) ? options.left : element.scrollLeft,
            top: isValidNumber(options.top) ? options.top : element.scrollTop,
            behavior: options.behavior || 'auto',
        })
    } catch {
        // 降级处理
        if (isValidNumber(options.left)) {
            element.scrollLeft = options.left
        }
        if (isValidNumber(options.top)) {
            element.scrollTop = options.top
        }
    }
}

/**
 * 获取滚动条样式类名
 */
export function getScrollbarClassNames(
    prefixCls: string,
    direction: 'vertical' | 'horizontal',
    isDragging: boolean = false,
    isHovered: boolean = false
): {
    track: string
    thumb: string
} {
    const baseTrack = `${prefixCls}-track`
    const baseThumb = `${prefixCls}-thumb`

    return {
        track: [
            baseTrack,
            `${baseTrack}-${direction}`,
            isDragging && `${baseTrack}-dragging`,
            isHovered && `${baseTrack}-hovered`,
        ]
            .filter(Boolean)
            .join(' '),
        thumb: [
            baseThumb,
            `${baseThumb}-${direction}`,
            isDragging && `${baseThumb}-dragging`,
            isHovered && `${baseThumb}-hovered`,
        ]
            .filter(Boolean)
            .join(' '),
    }
}
