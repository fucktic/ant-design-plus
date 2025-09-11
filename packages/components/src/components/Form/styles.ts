import styled, { css } from 'styled-components'
import { Form as AntdForm } from 'antd'

interface StyledFormProps {
    $layout?: 'horizontal' | 'vertical' | 'inline'
    $compact?: boolean
    $borderRadius?: number
    $showBorder?: boolean
    $prefixCls?: string
}

export const StyledForm: any = styled(AntdForm)<StyledFormProps>`
    // 表单整体样式
    &.${(props) => props.$prefixCls || 'ant'}-form {
        max-width: 100%;
    }

    // 紧凑模式样式
    ${(props) =>
        props.$compact &&
        css`
            .${props.$prefixCls || 'ant'}-form-item {
                margin-bottom: 16px;
            }

            .${props.$prefixCls || 'ant'}-form-item-label {
                padding-bottom: 4px;
            }
        `}

    // 表单项样式
  .${(props) => props.$prefixCls || 'ant'}-form-item {
        margin-bottom: 24px;

        .${(props) => props.$prefixCls || 'ant'}-form-item-label {
            font-weight: 500;
            color: #262626;

            > label {
                font-size: 14px;
                line-height: 1.5715;
            }

            .${(props) => props.$prefixCls || 'ant'}-form-item-required::before {
                color: #ff4d4f;
            }
        }

        .${(props) => props.$prefixCls || 'ant'}-form-item-control {
            .${(props) => props.$prefixCls || 'ant'}-form-item-explain-error {
                color: #ff4d4f;
                font-size: 12px;
                margin-top: 4px;
                animation: fadeInUp 0.3s ease;
            }

            .${(props) => props.$prefixCls || 'ant'}-form-item-explain-success {
                color: #52c41a;
                font-size: 12px;
                margin-top: 4px;
            }
        }
    }

    // 输入框样式增强
    .${(props) => props.$prefixCls || 'ant'}-input,
        .${(props) => props.$prefixCls || 'ant'}-input-number,
        .${(props) => props.$prefixCls || 'ant'}-select-selector,
        .${(props) => props.$prefixCls || 'ant'}-picker {
        border-radius: ${(props) => props.$borderRadius || 6}px;
        transition: all 0.3s ease;

        &:hover {
            border-color: #40a9ff;
            box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.1);
        }

        &:focus,
        &.${(props) => props.$prefixCls || 'ant'}-input-focused,
            &.${(props) => props.$prefixCls || 'ant'}-select-focused,
            &.${(props) => props.$prefixCls || 'ant'}-picker-focused {
            border-color: #1890ff;
            box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
        }
    }

    // 表单边框样式
    ${(props) =>
        props.$showBorder &&
        css`
            padding: 24px;
            border: 1px solid #e8e8e8;
            border-radius: ${props.$borderRadius || 8}px;
            background: #fafafa;

            .${props.$prefixCls || 'ant'}-form-item:last-child {
                margin-bottom: 0;
            }
        `}

    // 按钮组样式
  .${(props) => props.$prefixCls || 'ant'}-form-item-control-input-content {
        .${(props) => props.$prefixCls || 'ant'}-btn
            + .${(props) => props.$prefixCls || 'ant'}-btn {
            margin-left: 8px;
        }
    }

    // 水平布局样式
    ${(props) =>
        props.$layout === 'horizontal' &&
        css`
            .${props.$prefixCls || 'ant'}-form-item-label {
                text-align: right;

                > label {
                    height: 32px;
                    line-height: 32px;
                }
            }
        `}

    // 内联布局样式
  ${(props) =>
        props.$layout === 'inline' &&
        css`
            .${props.$prefixCls || 'ant'}-form-item {
                display: inline-block;
                margin-right: 16px;
                margin-bottom: 0;
                vertical-align: top;
            }
        `}

  @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(4px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`
