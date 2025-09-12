import { useEffect, useCallback, useRef } from 'react'
import { throttle } from '../utils'

interface UseScrollbarEventsOptions {
    /** 容器引用 */
    containerRef: React.RefObject<HTMLDivElement | null>
    /** 内容引用 */
    contentRef: React.RefObject<HTMLDivElement | null>
    /** 滚动事件处理函数 */
    onScroll?: (event: Event) => void
    /** 窗口大小变化处理函数 */
    onResize?: () => void
    /** 内容变化处理函数 */
    onContentChange?: () => void
    /** 滚动事件节流时间 */
    scrollThrottle?: number
    /** 是否启用 */
    enabled?: boolean
}

/**
 * 滚动条事件管理 Hook
 */
export const useScrollbarEvents = (options: UseScrollbarEventsOptions) => {
    const {
        containerRef,
        contentRef,
        onScroll,
        onResize,
        onContentChange,
        scrollThrottle = 16,
        enabled = true,
    } = options

    const observerRef = useRef<ResizeObserver | undefined>(undefined)
    const cleanupFunctionsRef = useRef<Array<() => void>>([])

    /**
     * 节流的滚动处理函数
     */
    const throttledScrollHandler = useCallback(
        throttle((event: Event) => {
            if (enabled && onScroll) {
                onScroll(event)
            }
        }, scrollThrottle),
        [onScroll, enabled, scrollThrottle]
    )

    /**
     * 窗口大小变化处理函数
     */
    const resizeHandler = useCallback(() => {
        if (enabled && onResize) {
            onResize()
        }
    }, [onResize, enabled])

    /**
     * 内容变化处理函数
     */
    const contentChangeHandler = useCallback(() => {
        if (enabled && onContentChange) {
            onContentChange()
        }
    }, [onContentChange, enabled])

    /**
     * 清理所有事件监听器
     */
    const cleanup = useCallback(() => {
        // 清理滚动事件
        const container = containerRef.current
        if (container) {
            container.removeEventListener('scroll', throttledScrollHandler)
        }

        // 清理窗口大小变化事件
        window.removeEventListener('resize', resizeHandler)

        // 清理 ResizeObserver
        if (observerRef.current) {
            observerRef.current.disconnect()
            observerRef.current = undefined
        }

        // 执行其他清理函数
        cleanupFunctionsRef.current.forEach((fn) => fn())
        cleanupFunctionsRef.current = []
    }, [containerRef, throttledScrollHandler, resizeHandler])

    /**
     * 设置事件监听器
     */
    const setupEventListeners = useCallback(() => {
        if (!enabled) return

        const container = containerRef.current
        const content = contentRef.current

        if (container) {
            // 滚动事件
            container.addEventListener('scroll', throttledScrollHandler, { passive: true })
            cleanupFunctionsRef.current.push(() => {
                container.removeEventListener('scroll', throttledScrollHandler)
            })
        }

        // 窗口大小变化事件
        window.addEventListener('resize', resizeHandler, { passive: true })
        cleanupFunctionsRef.current.push(() => {
            window.removeEventListener('resize', resizeHandler)
        })

        // 内容变化监听
        if (content && onContentChange) {
            observerRef.current = new ResizeObserver(contentChangeHandler)
            observerRef.current.observe(content)

            // 监听子元素变化
            const mutationObserver = new MutationObserver(contentChangeHandler)
            mutationObserver.observe(content, {
                childList: true,
                subtree: true,
                attributes: true,
                attributeFilter: ['style', 'class'],
            })

            cleanupFunctionsRef.current.push(() => {
                if (observerRef.current) {
                    observerRef.current.disconnect()
                }
                mutationObserver.disconnect()
            })
        }
    }, [
        enabled,
        containerRef,
        contentRef,
        throttledScrollHandler,
        resizeHandler,
        contentChangeHandler,
        onContentChange,
    ])

    /**
     * 重新设置事件监听器
     */
    const resetEventListeners = useCallback(() => {
        cleanup()
        setupEventListeners()
    }, [cleanup, setupEventListeners])

    // 设置和清理事件监听器
    useEffect(() => {
        setupEventListeners()
        return cleanup
    }, [setupEventListeners, cleanup])

    // 当启用状态变化时重新设置
    useEffect(() => {
        resetEventListeners()
    }, [enabled, resetEventListeners])

    return {
        cleanup,
        resetEventListeners,
    }
}
