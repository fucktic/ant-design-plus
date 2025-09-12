import { useCallback, useRef } from 'react'
import { VerticalDragParams, HorizontalDragParams } from '../types'
import { clamp, safeScrollTo } from '../utils'

/**
 * 滚动条拖拽逻辑 Hook
 */
export const useScrollbarDrag = () => {
    const dragStateRef = useRef<{
        isDragging: boolean
        startPosition: { x: number; y: number }
        startScroll: { left: number; top: number }
    }>({
        isDragging: false,
        startPosition: { x: 0, y: 0 },
        startScroll: { left: 0, top: 0 },
    })

    /**
     * 清理拖拽事件监听器
     */
    const cleanupDragListeners = useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('selectstart', preventSelection)
        dragStateRef.current.isDragging = false
    }, [])

    /**
     * 阻止文本选择
     */
    const preventSelection = useCallback((e: Event) => {
        e.preventDefault()
    }, [])

    /**
     * 鼠标移动处理器
     */
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!dragStateRef.current.isDragging) return
        e.preventDefault()
    }, [])

    /**
     * 鼠标释放处理器
     */
    const handleMouseUp = useCallback(() => {
        cleanupDragListeners()
    }, [cleanupDragListeners])

    /**
     * 处理垂直滚动条拖拽
     */
    const handleVerticalMouseDown = useCallback(
        (e: React.MouseEvent, params: VerticalDragParams) => {
            e.preventDefault()
            e.stopPropagation()

            const {
                containerRef,
                setIsDragging,
                setIsHovered,
                verticalThumbHeight,
                showHorizontalBar,
                scrollbarSize,
            } = params

            const container = containerRef.current
            if (!container) return

            // 设置拖拽状态
            setIsDragging(true)
            dragStateRef.current.isDragging = true
            dragStateRef.current.startPosition = { x: e.clientX, y: e.clientY }
            dragStateRef.current.startScroll = {
                left: container.scrollLeft,
                top: container.scrollTop,
            }

            const containerHeight = container.clientHeight
            const contentHeight = container.scrollHeight
            const availableHeight = showHorizontalBar
                ? containerHeight - scrollbarSize
                : containerHeight

            const maxScrollTop = contentHeight - containerHeight

            const handleVerticalMouseMove = (e: MouseEvent) => {
                if (!dragStateRef.current.isDragging) return
                e.preventDefault()

                const deltaY = e.clientY - dragStateRef.current.startPosition.y
                const scrollRatio = deltaY / (availableHeight - verticalThumbHeight)
                const scrollDelta = scrollRatio * maxScrollTop
                const newScrollTop = dragStateRef.current.startScroll.top + scrollDelta

                const clampedScrollTop = clamp(newScrollTop, 0, maxScrollTop)
                safeScrollTo(container, { top: clampedScrollTop })
            }

            const handleVerticalMouseUp = () => {
                setIsDragging(false)
                setIsHovered(false)
                cleanupDragListeners()
                document.removeEventListener('mousemove', handleVerticalMouseMove)
                document.removeEventListener('mouseup', handleVerticalMouseUp)
            }

            // 添加事件监听器
            document.addEventListener('mousemove', handleVerticalMouseMove)
            document.addEventListener('mouseup', handleVerticalMouseUp)
            document.addEventListener('selectstart', preventSelection)
        },
        [cleanupDragListeners, preventSelection]
    )

    /**
     * 处理水平滚动条拖拽
     */
    const handleHorizontalMouseDown = useCallback(
        (e: React.MouseEvent, params: HorizontalDragParams) => {
            e.preventDefault()
            e.stopPropagation()

            const {
                containerRef,
                setIsDragging,
                setIsHovered,
                horizontalThumbWidth,
                showVerticalBar,
                scrollbarSize,
            } = params

            const container = containerRef.current
            if (!container) return

            // 设置拖拽状态
            setIsDragging(true)
            dragStateRef.current.isDragging = true
            dragStateRef.current.startPosition = { x: e.clientX, y: e.clientY }
            dragStateRef.current.startScroll = {
                left: container.scrollLeft,
                top: container.scrollTop,
            }

            const containerWidth = container.clientWidth
            const contentWidth = container.scrollWidth
            const availableWidth = showVerticalBar ? containerWidth - scrollbarSize : containerWidth

            const maxScrollLeft = contentWidth - containerWidth

            const handleHorizontalMouseMove = (e: MouseEvent) => {
                if (!dragStateRef.current.isDragging) return
                e.preventDefault()

                const deltaX = e.clientX - dragStateRef.current.startPosition.x
                const scrollRatio = deltaX / (availableWidth - horizontalThumbWidth)
                const scrollDelta = scrollRatio * maxScrollLeft
                const newScrollLeft = dragStateRef.current.startScroll.left + scrollDelta

                const clampedScrollLeft = clamp(newScrollLeft, 0, maxScrollLeft)
                safeScrollTo(container, { left: clampedScrollLeft })
            }

            const handleHorizontalMouseUp = () => {
                setIsDragging(false)
                setIsHovered(false)
                cleanupDragListeners()
                document.removeEventListener('mousemove', handleHorizontalMouseMove)
                document.removeEventListener('mouseup', handleHorizontalMouseUp)
            }

            // 添加事件监听器
            document.addEventListener('mousemove', handleHorizontalMouseMove)
            document.addEventListener('mouseup', handleHorizontalMouseUp)
            document.addEventListener('selectstart', preventSelection)
        },
        [cleanupDragListeners, preventSelection]
    )

    return {
        handleVerticalMouseDown,
        handleHorizontalMouseDown,
    }
}
