import { useState, useCallback, useRef, useEffect } from 'react'
import { ScrollbarState } from '../types'
import { throttle, debounce } from '../utils'

interface UseScrollbarStateOptions {
    /** 是否自动隐藏滚动条 */
    autoHide?: boolean
    /** 隐藏延迟时间（毫秒） */
    hideDelay?: number
    /** 滚动事件节流时间（毫秒） */
    scrollThrottle?: number
    /** 窗口大小变化防抖时间（毫秒） */
    resizeDebounce?: number
}

/**
 * 滚动条状态管理 Hook
 */
export const useScrollbarState = (options: UseScrollbarStateOptions = {}) => {
    const { autoHide = true, hideDelay = 1000, scrollThrottle = 16, resizeDebounce = 100 } = options

    // 状态管理
    const [scrollbarState, setScrollbarState] = useState<ScrollbarState>({
        needVertical: false,
        needHorizontal: false,
        verticalThumbHeight: 0,
        verticalThumbTop: 0,
        horizontalThumbWidth: 0,
        horizontalThumbLeft: 0,
    })

    const [isDragging, setIsDragging] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [isVisible, setIsVisible] = useState(!autoHide)

    // 定时器引用
    const hideTimerRef = useRef<NodeJS.Timeout | undefined>(undefined)
    const updateCallbackRef = useRef<(() => ScrollbarState) | null>(null)

    /**
     * 显示滚动条
     */
    const showScrollbar = useCallback(() => {
        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current)
            hideTimerRef.current = undefined
        }
        setIsVisible(true)
    }, [])

    /**
     * 隐藏滚动条（延迟）
     */
    const hideScrollbar = useCallback(() => {
        if (!autoHide || isDragging || isHovered) return

        if (hideTimerRef.current) {
            clearTimeout(hideTimerRef.current)
        }

        hideTimerRef.current = setTimeout(() => {
            setIsVisible(false)
            hideTimerRef.current = undefined
        }, hideDelay)
    }, [autoHide, isDragging, isHovered, hideDelay])

    /**
     * 更新滚动条状态
     */
    const updateScrollbarState = useCallback(() => {
        if (updateCallbackRef.current) {
            const newState = updateCallbackRef.current()
            setScrollbarState(newState)

            // 如果有滚动条需要显示，则显示
            if (newState.needVertical || newState.needHorizontal) {
                showScrollbar()
            }
        }
    }, [showScrollbar])

    /**
     * 节流的更新函数
     */
    const throttledUpdate = useCallback(() => {
        const throttledFn = throttle(updateScrollbarState, scrollThrottle)
        throttledFn()
    }, [updateScrollbarState, scrollThrottle])

    /**
     * 防抖的更新函数（用于窗口大小变化）
     */
    const debouncedUpdate = useCallback(() => {
        const debouncedFn = debounce(updateScrollbarState, resizeDebounce)
        debouncedFn()
    }, [updateScrollbarState, resizeDebounce])

    /**
     * 设置更新回调函数
     */
    const setUpdateCallback = useCallback((callback: () => ScrollbarState) => {
        updateCallbackRef.current = callback
    }, [])

    /**
     * 处理鼠标进入
     */
    const handleMouseEnter = useCallback(() => {
        setIsHovered(true)
        showScrollbar()
    }, [showScrollbar])

    /**
     * 处理鼠标离开
     */
    const handleMouseLeave = useCallback(() => {
        setIsHovered(false)
        if (!isDragging) {
            hideScrollbar()
        }
    }, [isDragging, hideScrollbar])

    /**
     * 处理滚动事件
     */
    const handleScroll = useCallback(
        (_event: Event) => {
            throttledUpdate()
            showScrollbar()

            // 滚动停止后隐藏滚动条
            if (autoHide && !isDragging && !isHovered) {
                hideScrollbar()
            }
        },
        [throttledUpdate, showScrollbar, autoHide, isDragging, isHovered, hideScrollbar]
    )

    /**
     * 处理窗口大小变化
     */
    const handleResize = useCallback(() => {
        debouncedUpdate()
    }, [debouncedUpdate])

    /**
     * 设置拖拽状态
     */
    const setDraggingState = useCallback(
        (dragging: boolean) => {
            setIsDragging(dragging)
            if (dragging) {
                showScrollbar()
            } else if (!isHovered) {
                hideScrollbar()
            }
        },
        [showScrollbar, hideScrollbar, isHovered]
    )

    /**
     * 强制刷新滚动条状态
     */
    const refresh = useCallback(() => {
        updateScrollbarState()
    }, [updateScrollbarState])

    // 清理定时器
    useEffect(() => {
        return () => {
            if (hideTimerRef.current) {
                clearTimeout(hideTimerRef.current)
            }
        }
    }, [])

    // 监听拖拽和悬停状态变化
    useEffect(() => {
        if (isDragging || isHovered) {
            showScrollbar()
        } else {
            hideScrollbar()
        }
    }, [isDragging, isHovered, showScrollbar, hideScrollbar])

    return {
        // 状态
        scrollbarState,
        isDragging,
        isHovered,
        isVisible,

        // 状态更新函数
        setScrollbarState,
        setDraggingState,
        setIsHovered,

        // 事件处理函数
        handleMouseEnter,
        handleMouseLeave,
        handleScroll,
        handleResize,

        // 工具函数
        setUpdateCallback,
        refresh,
        showScrollbar,
        hideScrollbar,

        // 节流和防抖函数
        throttledUpdate,
        debouncedUpdate,
    }
}
