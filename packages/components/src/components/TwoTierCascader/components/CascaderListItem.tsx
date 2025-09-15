/**
 * CascaderListItem - 级联选择器列表项组件
 * @author xuwei
 * @date 2025-01-17
 */

import React from 'react'

/**
 * CascaderListItem 组件
 * 用于显示级联选择器中的列表项
 */
export interface CascaderListItemProps {
    children: React.ReactNode
    active?: boolean
    disabled?: boolean
    className?: string
    onClick?: () => void
}

export const CascaderListItem: React.FC<CascaderListItemProps> = ({
    children,
    active = false,
    disabled = false,
    className,
    onClick,
}) => {
    const baseClassName = 'adp-cascader-list-item'
    const stateClasses = [
        active && `${baseClassName}--active`,
        disabled && `${baseClassName}--disabled`,
    ]
        .filter(Boolean)
        .join(' ')

    const finalClassName = [baseClassName, stateClasses, className].filter(Boolean).join(' ')

    return (
        <div
            className={finalClassName}
            onClick={disabled ? undefined : onClick}
        >
            {children}
        </div>
    )
}

export default CascaderListItem
