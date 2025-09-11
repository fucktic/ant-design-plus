import styled, { css } from 'styled-components'
import { Button as AntdButton } from 'antd'

interface StyledButtonProps {
    $gradient?: boolean
    $borderRadius?: number
    $prefixCls?: string
}

export const StyledButton: any = styled(AntdButton)<StyledButtonProps>`
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;

    ${(props) =>
        props.$borderRadius &&
        css`
            border-radius: ${props.$borderRadius}px;
        `}

    // 渐变背景样式
  ${(props) =>
        props.$gradient &&
        css`
            &.${props.$prefixCls || 'ant'}-btn-primary {
                background: linear-gradient(135deg, #1890ff 0%, #722ed1 100%);
                border: none;

                &:hover {
                    background: linear-gradient(135deg, #40a9ff 0%, #9254de 100%);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
                }

                &:active {
                    transform: translateY(0);
                }
            }

            &.${props.$prefixCls || 'ant'}-btn-default {
                background: linear-gradient(135deg, #f0f0f0 0%, #d9d9d9 100%);
                border: 1px solid transparent;

                &:hover {
                    background: linear-gradient(135deg, #fafafa 0%, #e6e6e6 100%);
                    transform: translateY(-1px);
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }
            }
        `}

  // 悬停效果（非渐变按钮）
  ${(props) =>
        !props.$gradient &&
        css`
            &:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            &:active {
                transform: translateY(0);
            }
        `}

  // 禁用状态
  &.adp-button-disabled {
        opacity: 0.6;
        cursor: not-allowed;

        &:hover {
            transform: none;
            box-shadow: none;
        }
    }

    // 加载状态
    &.${(props) => props.$prefixCls || 'ant'}-btn-loading {
        .${(props) => props.$prefixCls || 'ant'}-btn-loading-icon {
            .anticon {
                color: inherit;
            }
        }
    }

    // 波纹效果
    &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
        pointer-events: none;
    }

    &:active::before {
        width: 300px;
        height: 300px;
    }
`
