import type { TableProps } from 'antd'
import type { CSSProperties, ReactNode } from 'react'

/**
 * 拖拽事件回调参数
 */
export interface DragEventParams<T = any> {
    /** 拖拽的源数据 */
    dragData: T
    /** 放置的目标数据 */
    dropData: T
    /** 拖拽源索引 */
    dragIndex: number
    /** 放置目标索引 */
    dropIndex: number
    /** 新的数据源 */
    newDataSource: T[]
}

/**
 * TableDragHandle 组件属性
 */
export interface TableDragHandleProps<T = any> {
    /** 表格列配置 */
    columns?: TableProps<T>['columns']
    /** 数据源 */
    dataSource: T[]
    /** 数据变化回调 */
    onChange: (dataSource: T[]) => void
    /** 表格属性 */
    tableProps?: Omit<TableProps<T>, 'columns' | 'dataSource' | 'components' | 'rowKey'>
    /** 行键字段名，默认 'id' */
    rowKey?: string
    /** 拖拽句柄图标 */
    dragIcon?: ReactNode
    /** 是否禁用拖拽 */
    disabled?: boolean
    /** 组件样式 */
    style?: CSSProperties
    /** 组件类名 */
    className?: string
}

/**
 * 拖拽行组件属性
 */
export interface DragRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string
    index: number
    record: any
}

/**
 * 拖拽句柄引用接口
 */
export interface TableDragHandleRef<T = any> {
    /** 刷新表格 */
    refresh: () => void
    /** 获取当前数据源 */
    getDataSource: () => T[]
}
