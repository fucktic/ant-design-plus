import { useCallback, useMemo } from 'react'
import { ScrollbarCalculationParams, ScrollbarState } from '../types'
import {
    getElementSize,
    calculateThumbSize,
    calculateThumbPosition,
    shouldShowScrollbar,
} from '../utils'
import { DEFAULT_CONFIG } from '../constants'

/**
 * 滚动条计算逻辑 Hook
 */
export const useScrollbarCalculation = ({
    containerRef,
    contentRef,
    showVertical,
    showHorizontal,
    scrollbarSize,
    minThumbSize = DEFAULT_CONFIG.MIN_THUMB_SIZE,
}: ScrollbarCalculationParams) => {
    /**
     * 计算滚动条状态
     */
    const calculateScrollbarState = useCallback((): ScrollbarState => {
        const container = containerRef.current
        const content = contentRef.current

        if (!container || !content) {
            return {
                needVertical: false,
                needHorizontal: false,
                verticalThumbHeight: 0,
                verticalThumbTop: 0,
                horizontalThumbWidth: 0,
                horizontalThumbLeft: 0,
            }
        }

        // 获取元素尺寸
        const containerSize = getElementSize(container)
        const contentSize = getElementSize(content)

        // 检查是否需要显示滚动条
        const needVertical = shouldShowScrollbar(
            containerSize.clientHeight,
            contentSize.scrollHeight,
            showVertical
        )
        const needHorizontal = shouldShowScrollbar(
            containerSize.clientWidth,
            contentSize.scrollWidth,
            showHorizontal
        )

        let verticalThumbHeight = 0
        let verticalThumbTop = 0
        let horizontalThumbWidth = 0
        let horizontalThumbLeft = 0

        // 计算垂直滚动条
        if (needVertical) {
            const availableHeight = needHorizontal
                ? containerSize.clientHeight - scrollbarSize
                : containerSize.clientHeight

            verticalThumbHeight = calculateThumbSize(
                availableHeight,
                contentSize.scrollHeight,
                minThumbSize
            )

            verticalThumbTop = calculateThumbPosition(
                container.scrollTop,
                availableHeight,
                contentSize.scrollHeight,
                verticalThumbHeight
            )
        }

        // 计算水平滚动条
        if (needHorizontal) {
            const availableWidth = needVertical
                ? containerSize.clientWidth - scrollbarSize
                : containerSize.clientWidth

            horizontalThumbWidth = calculateThumbSize(
                availableWidth,
                contentSize.scrollWidth,
                minThumbSize
            )

            horizontalThumbLeft = calculateThumbPosition(
                container.scrollLeft,
                availableWidth,
                contentSize.scrollWidth,
                horizontalThumbWidth
            )
        }

        return {
            needVertical,
            needHorizontal,
            verticalThumbHeight,
            verticalThumbTop,
            horizontalThumbWidth,
            horizontalThumbLeft,
        }
    }, [containerRef, contentRef, showVertical, showHorizontal, scrollbarSize, minThumbSize])

    return useMemo(
        () => ({
            calculateScrollbarState,
        }),
        [calculateScrollbarState]
    )
}
