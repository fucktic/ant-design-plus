import React from 'react'
import { Card as AntdCard, CardProps as AntdCardProps } from 'antd'
import classNames from 'classnames'
import { StyledCard } from './styles'

export interface CardProps extends AntdCardProps {
    /**
     * 是否显示悬停效果
     */
    hoverable?: boolean
    /**
     * 是否显示阴影
     */
    shadow?: 'none' | 'small' | 'medium' | 'large'
    /**
     * 边框圆角大小
     */
    borderRadius?: number
    /**
     * 是否显示渐变边框
     */
    gradientBorder?: boolean
    /**
     * 组件类名前缀
     */
    prefixCls?: string
    /**
     * 额外的CSS类名
     */
    className?: string
}

const Card: React.FC<CardProps> = ({
    hoverable = false,
    shadow = 'small',
    borderRadius = 8,
    gradientBorder = false,
    prefixCls,
    className,
    children,
    ...props
}) => {
    // 简化处理，直接使用默认前缀
    const antdBasePrefixCls = 'ant'

    const componentPrefixCls = prefixCls || 'adp-card'

    const cardClass = classNames(
        componentPrefixCls,
        {
            [`${componentPrefixCls}-hoverable`]: hoverable,
            [`${componentPrefixCls}-gradient-border`]: gradientBorder,
        },
        className
    )

    return (
        <StyledCard
            {...props}
            className={cardClass}
            $shadow={shadow}
            $borderRadius={borderRadius}
            $gradientBorder={gradientBorder}
            $hoverable={hoverable}
            $prefixCls={antdBasePrefixCls}
        >
            {children}
        </StyledCard>
    )
}

// 添加 Meta 属性
;(Card as any).Meta = AntdCard.Meta

export default Card
