import { CSSProperties, ReactNode } from 'react'

/**
 * 滚动条方向类型
 */
export type ScrollbarDirection = 'vertical' | 'horizontal'

/**
 * 滚动行为类型
 */
export type ScrollBehavior = 'auto' | 'smooth'

/**
 * 滚动条状态接口
 */
export interface ScrollbarState {
    /** 是否需要垂直滚动条 */
    needVertical: boolean
    /** 是否需要水平滚动条 */
    needHorizontal: boolean
    /** 垂直滑块高度 */
    verticalThumbHeight: number
    /** 垂直滑块位置 */
    verticalThumbTop: number
    /** 水平滑块宽度 */
    horizontalThumbWidth: number
    /** 水平滑块位置 */
    horizontalThumbLeft: number
}

/**
 * 滚动条配置接口
 */
export interface ScrollbarConfig {
    /** 滚动条大小 */
    scrollbarSize: number
    /** 滑块最小尺寸 */
    minThumbSize: number
    /** 轨道内边距 */
    trackPadding: number
    /** 类名前缀 */
    prefixCls: string
    /** 滚动条颜色 */
    scrollbarColor: string
    /** 轨道颜色 */
    trackColor: string
}

/**
 * 滚动条组件 Props
 */
export interface ScrollbarProps {
    /** 子元素 */
    children: ReactNode
    /** 容器样式 */
    style?: CSSProperties
    /** 容器类名 */
    className?: string
    /** 滚动事件回调 */
    onScroll?: (event: Event) => void
    /** 是否显示水平滚动条 */
    showHorizontal?: boolean
    /** 是否显示垂直滚动条 */
    showVertical?: boolean
    /** 滚动条宽度 */
    scrollbarSize?: number
    /** 滚动条颜色 */
    scrollbarColor?: string
    /** 滚动条轨道颜色 */
    trackColor?: string
    /** 组件类名前缀 */
    prefixCls?: string
    /** 是否自动隐藏滚动条 */
    autoHide?: boolean
    /** 滚动条显示延迟（毫秒） */
    hideDelay?: number
}

/**
 * 滚动条组件 Ref 接口
 */
export interface ScrollbarRef {
    /** 滚动到指定位置 */
    scrollTo: (options: { left?: number; top?: number; behavior?: ScrollBehavior }) => void
    /** 滚动到顶部 */
    scrollToTop: (behavior?: ScrollBehavior) => void
    /** 滚动到左侧 */
    scrollToLeft: (behavior?: ScrollBehavior) => void
}

/**
 * 拖拽参数接口
 */
export interface DragParams {
    /** 容器引用 */
    containerRef: React.RefObject<HTMLDivElement | null>
    /** 设置拖拽状态 */
    setIsDragging: (dragging: boolean) => void
    /** 设置悬停状态 */
    setIsHovered: (hovered: boolean) => void
}

/**
 * 垂直拖拽参数接口
 */
export interface VerticalDragParams extends DragParams {
    /** 垂直滑块高度 */
    verticalThumbHeight: number
    /** 是否显示水平滚动条 */
    showHorizontalBar: boolean
    /** 滚动条大小 */
    scrollbarSize: number
}

/**
 * 水平拖拽参数接口
 */
export interface HorizontalDragParams extends DragParams {
    /** 水平滑块宽度 */
    horizontalThumbWidth: number
    /** 是否显示垂直滚动条 */
    showVerticalBar: boolean
    /** 滚动条大小 */
    scrollbarSize: number
}

/**
 * 滚动条计算参数接口
 */
export interface ScrollbarCalculationParams {
    /** 容器引用 */
    containerRef: React.RefObject<HTMLDivElement | null>
    /** 内容引用 */
    contentRef: React.RefObject<HTMLDivElement | null>
    /** 是否显示垂直滚动条 */
    showVertical: boolean
    /** 是否显示水平滚动条 */
    showHorizontal: boolean
    /** 滚动条大小 */
    scrollbarSize: number
    /** 滑块最小尺寸 */
    minThumbSize?: number
}
