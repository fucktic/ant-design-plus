import styled from 'styled-components'
import { GlobalToken } from 'antd/es/theme/interface'
import { OPACITY_CONFIG, Z_INDEX, RESPONSIVE_CONFIG, DEFAULT_CONFIG } from './constants'

interface StyledScrollbarContainerProps {
    $scrollbarSize: number
    $scrollbarColor: string
    $trackColor: string
    $token: GlobalToken
}

/**
 * 滚动条容器 - 包含所有子组件样式
 */
export const StyledScrollbarContainer = styled.div<StyledScrollbarContainerProps>`
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: ${(props) => props.$token.borderRadius}px;

    /* 内容包装器样式 - 隐藏原生滚动条 */
    .adp-scrollbar-content-wrapper {
        width: 100%;
        height: 100%;
        overflow: auto;

        /* 隐藏原生滚动条 */
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */

        &::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
        }
    }

    /* 内容容器样式 - 确保最小尺寸 */
    .adp-scrollbar-content {
        min-width: 100%;
        min-height: 100%;
    }

    /* 滚动条轨道样式 - 比滑块大 2px，提供更好的点击区域 */
    .adp-scrollbar-track {
        position: absolute;
        background-color: ${(props) => props.$trackColor};
        border-radius: ${(props) => (props.$scrollbarSize + DEFAULT_CONFIG.TRACK_PADDING) / 2}px;
        opacity: ${OPACITY_CONFIG.TRACK_DEFAULT};
        transition: opacity ${(props) => props.$token.motionDurationMid}
            ${(props) => props.$token.motionEaseInOut};
        z-index: ${Z_INDEX.TRACK};
    }

    .adp-scrollbar-track-vertical {
        top: 0;
        right: 0;
        width: ${(props) => props.$scrollbarSize + DEFAULT_CONFIG.TRACK_PADDING}px;
        height: 100%;
    }

    .adp-scrollbar-track-horizontal {
        bottom: 0;
        left: 0;
        width: 100%;
        height: ${(props) => props.$scrollbarSize + DEFAULT_CONFIG.TRACK_PADDING}px;
    }

    /* 滚动条滑块样式 - 在轨道中居中显示 */
    .adp-scrollbar-thumb {
        position: absolute;
        background-color: ${(props) => props.$scrollbarColor};
        border-radius: ${(props) => props.$scrollbarSize / 2}px;
        cursor: pointer;
        transition: opacity ${(props) => props.$token.motionDurationMid}
            ${(props) => props.$token.motionEaseInOut};
        z-index: ${Z_INDEX.THUMB};
        opacity: ${OPACITY_CONFIG.THUMB_DEFAULT};

        &:hover {
            opacity: ${OPACITY_CONFIG.THUMB_HOVER};
        }

        &:active {
            opacity: ${OPACITY_CONFIG.THUMB_ACTIVE};
        }
    }

    .adp-scrollbar-thumb-vertical {
        left: ${DEFAULT_CONFIG.TRACK_PADDING / 2}px;
        width: ${(props) => props.$scrollbarSize}px;
        min-height: 20px;
    }

    .adp-scrollbar-thumb-horizontal {
        top: ${DEFAULT_CONFIG.TRACK_PADDING / 2}px;
        height: ${(props) => props.$scrollbarSize}px;
        min-width: 20px;
    }

    &.adp-scrollbar-container {
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
