import styled, { css } from 'styled-components'
import { GlobalToken } from 'antd/es/theme/interface'
import { OPACITY_CONFIG, Z_INDEX, RESPONSIVE_CONFIG, DEFAULT_CONFIG } from './constants'

interface StyledScrollbarContainerProps {
    $scrollbarSize: number
    $scrollbarColor: string
    $trackColor: string
    $token: GlobalToken
}

interface StyledTrackProps {
    $direction: 'vertical' | 'horizontal'
    $scrollbarSize: number
    $trackColor: string
    $token: GlobalToken
}

interface StyledThumbProps {
    $direction: 'vertical' | 'horizontal'
    $scrollbarSize: number
    $scrollbarColor: string
    $token: GlobalToken
}

/**
 * 内容包装器 - 隐藏原生滚动条
 */
export const StyledContentWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;

    /* 隐藏原生滚动条 */
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */

    &::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }

    &.adp-scrollbar-content-wrapper {
        /* 内容包装器样式 */
    }
`

/**
 * 内容容器 - 确保最小尺寸
 */
export const StyledContent = styled.div`
    min-width: 100%;
    min-height: 100%;

    &.adp-scrollbar-content {
        /* 内容容器样式 */
    }
`

/**
 * 滚动条轨道 - 比滑块大 2px，提供更好的点击区域
 */
export const StyledTrack = styled.div<StyledTrackProps>`
    position: absolute;
    background-color: ${(props) => props.$trackColor};
    border-radius: ${(props) => (props.$scrollbarSize + DEFAULT_CONFIG.TRACK_PADDING) / 2}px;
    opacity: ${OPACITY_CONFIG.TRACK_DEFAULT};
    transition: opacity ${(props) => props.$token.motionDurationMid}
        ${(props) => props.$token.motionEaseInOut};
    z-index: ${Z_INDEX.TRACK};

    &.adp-scrollbar-track {
        /* 滚动条轨道基础样式 */
    }

    &.adp-scrollbar-track-vertical {
        top: 0;
        right: 0;
        width: ${(props) => props.$scrollbarSize + DEFAULT_CONFIG.TRACK_PADDING}px;
        height: 100%;
    }

    &.adp-scrollbar-track-horizontal {
        bottom: 0;
        left: 0;
        width: 100%;
        height: ${(props) => props.$scrollbarSize + DEFAULT_CONFIG.TRACK_PADDING}px;
    }

    ${(props) =>
        props.$direction === 'vertical' &&
        css`
            top: 0;
            right: 0;
            width: ${props.$scrollbarSize + DEFAULT_CONFIG.TRACK_PADDING}px;
            height: 100%;
        `}

    ${(props) =>
        props.$direction === 'horizontal' &&
        css`
            bottom: 0;
            left: 0;
            width: 100%;
            height: ${props.$scrollbarSize + DEFAULT_CONFIG.TRACK_PADDING}px;
        `}
`

/**
 * 滚动条滑块 - 在轨道中居中显示
 */
export const StyledThumb = styled.div<StyledThumbProps>`
    position: absolute;
    background-color: ${(props) => props.$scrollbarColor};
    border-radius: ${(props) => props.$scrollbarSize / 2}px;
    cursor: pointer;
    transition: opacity ${(props) => props.$token.motionDurationMid}
        ${(props) => props.$token.motionEaseInOut};
    z-index: ${Z_INDEX.THUMB};
    opacity: ${OPACITY_CONFIG.THUMB_DEFAULT};

    &.adp-scrollbar-thumb {
        /* 滚动条滑块基础样式 */

        &:hover {
            opacity: ${OPACITY_CONFIG.THUMB_HOVER};
        }

        &:active {
            opacity: ${OPACITY_CONFIG.THUMB_ACTIVE};
        }
    }

    &.adp-scrollbar-thumb-vertical {
        left: ${DEFAULT_CONFIG.TRACK_PADDING / 2}px;
        width: ${(props) => props.$scrollbarSize}px;
        min-height: 20px;
    }

    &.adp-scrollbar-thumb-horizontal {
        top: ${DEFAULT_CONFIG.TRACK_PADDING / 2}px;
        height: ${(props) => props.$scrollbarSize}px;
        min-width: 20px;
    }

    &:hover {
        opacity: ${OPACITY_CONFIG.THUMB_HOVER};
    }

    &:active {
        opacity: ${OPACITY_CONFIG.THUMB_ACTIVE};
    }

    ${(props) =>
        props.$direction === 'vertical' &&
        css`
            left: ${DEFAULT_CONFIG.TRACK_PADDING / 2}px;
            width: ${props.$scrollbarSize}px;
            min-height: 20px;
        `}

    ${(props) =>
        props.$direction === 'horizontal' &&
        css`
            top: ${DEFAULT_CONFIG.TRACK_PADDING / 2}px;
            height: ${props.$scrollbarSize}px;
            min-width: 20px;
        `}
`

/**
 * 滚动条容器
 */
export const StyledScrollbarContainer = styled.div<StyledScrollbarContainerProps>`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: ${(props) => props.$token.borderRadius}px;

    &.adp-scrollbar-container {
        /* 滚动条容器基础样式 */

        /* 容器 hover 时显示轨道 */
        &:hover .adp-scrollbar-track {
            opacity: ${OPACITY_CONFIG.TRACK_HOVER};
        }

        /* 响应式样式 - 移动端使用更小的滚动条 */
        @media (max-width: ${(props) => props.$token.screenMD}px) {
            .adp-scrollbar-track-vertical {
                width: ${RESPONSIVE_CONFIG.MOBILE_SCROLLBAR_SIZE + DEFAULT_CONFIG.TRACK_PADDING}px;
            }
            .adp-scrollbar-track-horizontal {
                height: ${RESPONSIVE_CONFIG.MOBILE_SCROLLBAR_SIZE + DEFAULT_CONFIG.TRACK_PADDING}px;
            }

            .adp-scrollbar-thumb-vertical {
                left: ${DEFAULT_CONFIG.TRACK_PADDING / 2}px;
                width: ${RESPONSIVE_CONFIG.MOBILE_SCROLLBAR_SIZE}px;
            }
            .adp-scrollbar-thumb-horizontal {
                top: ${DEFAULT_CONFIG.TRACK_PADDING / 2}px;
                height: ${RESPONSIVE_CONFIG.MOBILE_SCROLLBAR_SIZE}px;
            }
        }

        /* 深色主题支持 */
        @media (prefers-color-scheme: dark) {
            .adp-scrollbar-track {
                background-color: ${(props) => props.$token.colorBgElevated};
            }
            /* 滑块颜色由用户传入的 scrollbarColor 控制，不在此覆盖 */
        }

        /* 减少动画偏好支持 */
        @media (prefers-reduced-motion: reduce) {
            .adp-scrollbar-track,
            .adp-scrollbar-thumb {
                transition: none;
            }
        }

        /* 高对比度模式支持 */
        @media (prefers-contrast: high) {
            .adp-scrollbar-track {
                background-color: ${(props) => props.$token.colorBorder};
                border: 1px solid ${(props) => props.$token.colorText};
            }

            .adp-scrollbar-thumb {
                background-color: ${(props) => props.$token.colorText};
            }
        }
    }
`
