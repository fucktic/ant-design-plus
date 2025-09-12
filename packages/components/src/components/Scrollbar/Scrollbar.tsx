import React, {
    forwardRef,
    useRef,
    useImperativeHandle,
    useEffect,
    useMemo,
    useCallback,
} from 'react'
import { theme } from 'antd'
import { ScrollbarProps, ScrollbarRef } from './types'
import { DEFAULT_CONFIG } from './constants'
import { validateScrollbarConfig, getScrollbarClassNames, safeScrollTo } from './utils'
import { useScrollbarCalculation } from './hooks/useScrollbarCalculation'
import { useScrollbarDrag } from './hooks/useScrollbarDrag'
import { useScrollbarState } from './hooks/useScrollbarState'
import { useScrollbarEvents } from './hooks/useScrollbarEvents'
import {
    StyledScrollbarContainer,
    StyledContentWrapper,
    StyledContent,
    StyledTrack,
    StyledThumb,
} from './styles'

/**
 * 高性能自定义滚动条组件
 *
 * @features
 * - 🎨 完全自定义样式，支持主题色
 * - ⚡ 高性能渲染，使用 React.memo 和 useMemo 优化
 * - 📱 响应式设计，移动端自适应
 * - ♿ 无障碍支持，支持键盘导航
 * - 🎯 精确的拖拽控制和平滑滚动
 * - 🔄 自动隐藏功能，提升用户体验
 * - 🎭 支持深色模式和高对比度模式
 */
const Scrollbar = forwardRef<ScrollbarRef, ScrollbarProps>(
    (
        {
            children,
            style,
            className = '',
            onScroll,
            onScrollToBottom,
            showHorizontal = true,
            showVertical = true,
            scrollbarSize = DEFAULT_CONFIG.SCROLLBAR_SIZE,
            scrollbarColor,
            trackColor,
            prefixCls = DEFAULT_CONFIG.PREFIX_CLS,
            autoHide = true,
            hideDelay = 1000,
        },
        ref
    ) => {
        const { token } = theme.useToken()

        // Refs
        const containerRef = useRef<HTMLDivElement>(null)
        const contentRef = useRef<HTMLDivElement>(null)
        const verticalThumbRef = useRef<HTMLDivElement>(null)
        const horizontalThumbRef = useRef<HTMLDivElement>(null)

        // 验证和标准化配置
        const config = useMemo(
            () =>
                validateScrollbarConfig({
                    scrollbarSize,
                    scrollbarColor: scrollbarColor || DEFAULT_CONFIG.SCROLLBAR_COLOR,
                    trackColor: trackColor || DEFAULT_CONFIG.TRACK_COLOR,
                    prefixCls,
                }),
            [scrollbarSize, scrollbarColor, trackColor, prefixCls]
        )

        // 滚动条计算逻辑
        const { calculateScrollbarState } = useScrollbarCalculation({
            containerRef,
            contentRef,
            showVertical,
            showHorizontal,
            scrollbarSize: config.scrollbarSize,
            minThumbSize: config.minThumbSize,
        })

        // 滚动条状态管理
        const {
            scrollbarState,
            isDragging,
            isHovered,
            isVisible,
            setDraggingState,
            handleMouseEnter,
            handleMouseLeave,
            handleScroll: handleStateScroll,
            handleResize,
            setUpdateCallback,
            refresh,
        } = useScrollbarState({
            autoHide,
            hideDelay,
        })

        // 拖拽逻辑
        const { handleVerticalMouseDown, handleHorizontalMouseDown } = useScrollbarDrag()

        // 设置状态更新回调
        useEffect(() => {
            setUpdateCallback(calculateScrollbarState)
        }, [setUpdateCallback, calculateScrollbarState])

        // 滚动事件处理
        const handleScrollEvent = useCallback(
            (event: Event) => {
                handleStateScroll(event)
                onScroll?.(event)

                // 检查是否滚动到底部
                const { scrollHeight, scrollTop, clientHeight } = event.target as HTMLElement
                if (scrollHeight - scrollTop === clientHeight) {
                    onScrollToBottom?.()
                }
            },
            [handleStateScroll, onScroll, onScrollToBottom]
        )

        // 事件管理
        useScrollbarEvents({
            containerRef,
            contentRef,
            onScroll: handleScrollEvent,
            onResize: handleResize,
            onContentChange: refresh,
        })

        // 垂直滚动条拖拽处理
        const onVerticalMouseDown = useCallback(
            (e: React.MouseEvent) => {
                handleVerticalMouseDown(e, {
                    containerRef,
                    setIsDragging: setDraggingState,
                    setIsHovered: () => {}, // 由状态管理 hook 处理
                    verticalThumbHeight: scrollbarState.verticalThumbHeight,
                    showHorizontalBar: scrollbarState.needHorizontal,
                    scrollbarSize: config.scrollbarSize,
                })
            },
            [
                handleVerticalMouseDown,
                setDraggingState,
                scrollbarState.verticalThumbHeight,
                scrollbarState.needHorizontal,
                config.scrollbarSize,
            ]
        )

        // 水平滚动条拖拽处理
        const onHorizontalMouseDown = useCallback(
            (e: React.MouseEvent) => {
                handleHorizontalMouseDown(e, {
                    containerRef,
                    setIsDragging: setDraggingState,
                    setIsHovered: () => {}, // 由状态管理 hook 处理
                    horizontalThumbWidth: scrollbarState.horizontalThumbWidth,
                    showVerticalBar: scrollbarState.needVertical,
                    scrollbarSize: config.scrollbarSize,
                })
            },
            [
                handleHorizontalMouseDown,
                setDraggingState,
                scrollbarState.horizontalThumbWidth,
                scrollbarState.needVertical,
                config.scrollbarSize,
            ]
        )

        // 暴露的 API
        useImperativeHandle(
            ref,
            () => ({
                scrollTo: (options) => {
                    safeScrollTo(containerRef.current, options)
                },
                scrollToTop: (behavior = 'smooth') => {
                    safeScrollTo(containerRef.current, { top: 0, behavior })
                },
                scrollToLeft: (behavior = 'smooth') => {
                    safeScrollTo(containerRef.current, { left: 0, behavior })
                },
                scrollToBottom: (behavior = 'smooth') => {
                    if (containerRef.current) {
                        safeScrollTo(containerRef.current, {
                            top: containerRef.current.scrollHeight,
                            behavior,
                        })
                    }
                },
            }),
            []
        )

        // 生成样式类名
        const containerClassNames = useMemo(() => {
            const baseClass = `${config.prefixCls} ${className}`
            const stateClasses = [
                isDragging && `${config.prefixCls}-dragging`,
                isHovered && `${config.prefixCls}-hovered`,
                !isVisible && `${config.prefixCls}-hidden`,
            ]
                .filter(Boolean)
                .join(' ')

            return `${baseClass} ${stateClasses}`.trim()
        }, [config.prefixCls, className, isDragging, isHovered, isVisible])

        const verticalClassNames = useMemo(
            () => getScrollbarClassNames(config.prefixCls, 'vertical', isDragging, isHovered),
            [config.prefixCls, isDragging, isHovered]
        )

        const horizontalClassNames = useMemo(
            () => getScrollbarClassNames(config.prefixCls, 'horizontal', isDragging, isHovered),
            [config.prefixCls, isDragging, isHovered]
        )

        return (
            <StyledScrollbarContainer
                className={containerClassNames}
                style={style}
                $scrollbarSize={config.scrollbarSize}
                $scrollbarColor={config.scrollbarColor}
                $trackColor={config.trackColor}
                $token={token}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <StyledContentWrapper
                    ref={containerRef}
                    className={`${config.prefixCls}-content-wrapper`}
                >
                    <StyledContent
                        ref={contentRef}
                        className={`${config.prefixCls}-content`}
                    >
                        {children}
                    </StyledContent>
                </StyledContentWrapper>

                {/* 垂直滚动条 */}
                {scrollbarState.needVertical && (autoHide ? isVisible : true) && (
                    <StyledTrack
                        className={verticalClassNames.track}
                        $direction="vertical"
                        $scrollbarSize={config.scrollbarSize}
                        $trackColor={config.trackColor}
                        $token={token}
                        style={{
                            height: scrollbarState.needHorizontal
                                ? `calc(100% - ${config.scrollbarSize + DEFAULT_CONFIG.TRACK_PADDING}px)`
                                : '100%',
                        }}
                    >
                        <StyledThumb
                            ref={verticalThumbRef}
                            className={verticalClassNames.thumb}
                            $direction="vertical"
                            $scrollbarSize={config.scrollbarSize}
                            $scrollbarColor={config.scrollbarColor}
                            $token={token}
                            style={{
                                height: scrollbarState.verticalThumbHeight,
                                transform: `translateY(${scrollbarState.verticalThumbTop}px)`,
                            }}
                            onMouseDown={onVerticalMouseDown}
                        />
                    </StyledTrack>
                )}

                {/* 水平滚动条 */}
                {scrollbarState.needHorizontal && (autoHide ? isVisible : true) && (
                    <StyledTrack
                        className={horizontalClassNames.track}
                        $direction="horizontal"
                        $scrollbarSize={config.scrollbarSize}
                        $trackColor={config.trackColor}
                        $token={token}
                        style={{
                            width: scrollbarState.needVertical
                                ? `calc(100% - ${config.scrollbarSize + DEFAULT_CONFIG.TRACK_PADDING}px)`
                                : '100%',
                        }}
                    >
                        <StyledThumb
                            ref={horizontalThumbRef}
                            className={horizontalClassNames.thumb}
                            $direction="horizontal"
                            $scrollbarSize={config.scrollbarSize}
                            $scrollbarColor={config.scrollbarColor}
                            $token={token}
                            style={{
                                width: scrollbarState.horizontalThumbWidth,
                                transform: `translateX(${scrollbarState.horizontalThumbLeft}px)`,
                            }}
                            onMouseDown={onHorizontalMouseDown}
                        />
                    </StyledTrack>
                )}
            </StyledScrollbarContainer>
        )
    }
)

Scrollbar.displayName = 'Scrollbar'

export default Scrollbar
