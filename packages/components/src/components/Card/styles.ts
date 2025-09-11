import styled, { css } from 'styled-components'
import { Card as AntdCard } from 'antd'

interface StyledCardProps {
    $shadow?: 'none' | 'small' | 'medium' | 'large'
    $borderRadius?: number
    $gradientBorder?: boolean
    $hoverable?: boolean
    $prefixCls?: string
}

const shadowStyles = {
    none: 'none',
    small: '0 2px 4px rgba(0, 0, 0, 0.1)',
    medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
    large: '0 8px 24px rgba(0, 0, 0, 0.2)',
}

export const StyledCard: any = styled(AntdCard)<StyledCardProps>`
    border-radius: ${(props) => props.$borderRadius || 8}px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${(props) => shadowStyles[props.$shadow || 'small']};
    overflow: hidden;
    position: relative;

    // 渐变边框效果
    ${(props) =>
        props.$gradientBorder &&
        css`
            border: 2px solid transparent;
            background: linear-gradient(white, white) padding-box,
                linear-gradient(135deg, #1890ff, #722ed1) border-box;
        `}

    // 悬停效果
  ${(props) =>
        props.$hoverable &&
        css`
            cursor: pointer;

            &:hover {
                transform: translateY(-4px);
                box-shadow: ${shadowStyles.large};

                .ant-card-body {
                    background: linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);
                }
            }

            &:active {
                transform: translateY(-2px);
            }
        `}

  // 卡片头部样式
  .${(props) => props.$prefixCls || 'ant'}-card-head {
        background: linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);
        border-bottom: 1px solid #e8e8e8;

        .${(props) => props.$prefixCls || 'ant'}-card-head-title {
            font-weight: 600;
            color: #262626;
        }
    }

    // 卡片内容样式
    .${(props) => props.$prefixCls || 'ant'}-card-body {
        transition: background 0.3s ease;
    }

    // Meta 信息样式
    .${(props) => props.$prefixCls || 'ant'}-card-meta {
        .${(props) => props.$prefixCls || 'ant'}-card-meta-title {
            font-weight: 600;
            color: #262626;
            margin-bottom: 4px;
        }

        .${(props) => props.$prefixCls || 'ant'}-card-meta-description {
            color: #8c8c8c;
            line-height: 1.5;
        }
    }

    // 操作按钮样式
    .${(props) => props.$prefixCls || 'ant'}-card-actions {
        background: #fafafa;
        border-top: 1px solid #e8e8e8;

        li {
            margin: 0;

            &:not(:last-child) {
                border-right: 1px solid #e8e8e8;
            }

            > span {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 12px 0;
                color: #595959;
                transition: all 0.3s ease;

                &:hover {
                    color: #1890ff;
                    background: rgba(24, 144, 255, 0.1);
                }
            }
        }
    }

    // 封面图片样式
    .${(props) => props.$prefixCls || 'ant'}-card-cover {
        img {
            transition: transform 0.3s ease;
        }

        ${(props) =>
            props.$hoverable &&
            css`
                &:hover img {
                    transform: scale(1.05);
                }
            `}
    }
`
