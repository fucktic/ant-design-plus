/**
 * CascaderListItem - 级联选择器列表项组件
 * @author xuwei
 * @date 2025-01-17
 */

import React from 'react'
import { List } from 'antd'
import { StyledListItem } from './styles'

/**
 * 级联选择器列表项组件
 * 统一的列表项样式和交互
 */
export interface CascaderListItemProps {
    /** CSS类名 */
    className?: string
    /** 点击事件 */
    onClick?: (e: React.MouseEvent) => void
    /** 子元素 */
    children: React.ReactNode
    /** 是否激活状态 */
    active?: boolean
    /** 是否禁用状态 */
    disabled?: boolean
}

export const CascaderListItem: React.FC<CascaderListItemProps> = ({
    className,
    onClick,
    children,
    active = false,
    disabled = false,
}) => {
    return (
        <List.Item style={{ padding: 0, border: 'none' }}>
            <StyledListItem
                $active={active}
                $disabled={disabled}
                className={className}
                onClick={onClick}
            >
                {children}
            </StyledListItem>
        </List.Item>
    )
}

export default CascaderListItem
