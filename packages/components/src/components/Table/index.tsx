import React from 'react'
import { TableProps as AntdTableProps } from 'antd'
import classNames from 'classnames'
import { StyledTableWrapper } from './styles'
import { Table as AntdTable } from 'antd'

export interface TableProps extends AntdTableProps<any> {
    /**
     * 是否显示斑马纹
     */
    striped?: boolean
    /**
     * 是否紧凑模式
     */
    compact?: boolean
    /**
     * 边框圆角
     */
    borderRadius?: number
    /**
     * 悬停行高亮颜色
     */
    hoverColor?: string
    /**
     * 组件类名前缀
     */
    prefixCls?: string
    /**
     * 额外的CSS类名
     */
    className?: string
}

const Table: React.FC<TableProps> = ({
    striped = false,
    compact = false,
    borderRadius = 8,
    hoverColor,
    prefixCls = 'adp-table',
    className,
    ...props
}) => {
    // 简化处理，直接使用默认前缀
    const basePrefixCls = 'ant'

    const tableClass = classNames(
        prefixCls,
        {
            [`${prefixCls}-striped`]: striped,
            [`${prefixCls}-compact`]: compact,
        },
        className
    )

    return (
        <StyledTableWrapper
            className={tableClass}
            $striped={striped}
            $compact={compact}
            $borderRadius={borderRadius}
            $hoverColor={hoverColor}
            $prefixCls={basePrefixCls}
        >
            <AntdTable
                {...props}
                size={compact ? 'small' : props.size}
            />
        </StyledTableWrapper>
    )
}

export default Table
