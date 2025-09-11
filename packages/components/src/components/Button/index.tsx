import React from 'react'
import { ButtonProps as AntdButtonProps } from 'antd'
import classNames from 'classnames'
import { StyledButton } from './styles'

export interface ButtonProps extends AntdButtonProps {
    /**
     * 是否显示渐变背景
     */
    gradient?: boolean
    /**
     * 按钮圆角大小
     */
    borderRadius?: number
    /**
     * 组件类名前缀
     */
    prefixCls?: string
    /**
     * 额外的CSS类名
     */
    className?: string
}

const Button: React.FC<ButtonProps> = ({
    gradient = false,
    borderRadius,
    prefixCls,
    className,
    children,
    disabled,
    loading,
    ...props
}) => {
    // 简化处理，直接使用默认前缀
    const antdBasePrefixCls = 'ant'

    const componentPrefixCls = prefixCls || 'adp-btn'

    const buttonClass = classNames(
        componentPrefixCls,
        {
            [`${componentPrefixCls}-gradient`]: gradient,
            [`${componentPrefixCls}-disabled`]: disabled,
        },
        className
    )

    return (
        <StyledButton
            {...props}
            className={buttonClass}
            disabled={disabled}
            loading={loading}
            $gradient={gradient}
            $borderRadius={borderRadius}
            $prefixCls={antdBasePrefixCls}
        >
            {children}
        </StyledButton>
    )
}

export default Button
