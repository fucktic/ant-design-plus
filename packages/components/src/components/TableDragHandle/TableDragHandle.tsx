import React, { useContext, useMemo, useImperativeHandle, useCallback } from 'react'
import { UnorderedListOutlined } from '@ant-design/icons'
import type { DragEndEvent } from '@dnd-kit/core'
import { DndContext } from '@dnd-kit/core'
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
    arrayMove,
    SortableContext,
    useSortable,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button, Table } from 'antd'
import type { TableDragHandleProps, TableDragHandleRef } from './types'
import { DEFAULT_CONFIG } from './constants'
import { getRowKey, findIndexByRowKey, validateDragConfig, safeCallback } from './utils'

interface RowContextProps {
    setActivatorNodeRef?: (element: HTMLElement | null) => void
    listeners?: SyntheticListenerMap
    disabled?: boolean
}

const RowContext = React.createContext<RowContextProps>({})

/**
 * 拖拽句柄组件
 */
const DragHandle: React.FC<{ icon?: React.ReactNode }> = React.memo(({ icon }) => {
    const { setActivatorNodeRef, listeners, disabled } = useContext(RowContext)

    return (
        <Button
            type="text"
            size="small"
            icon={icon || <UnorderedListOutlined />}
            title="拖拽排序"
            style={{ cursor: disabled ? 'not-allowed' : 'move' }}
            disabled={disabled}
            ref={setActivatorNodeRef}
            {...(disabled ? {} : listeners)}
        />
    )
})

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    'data-row-key': string
    disabled?: boolean
}

/**
 * 可拖拽的表格行组件
 */
const Row: React.FC<RowProps> = React.memo((props) => {
    const { disabled, ...restProps } = props
    const {
        attributes,
        listeners,
        setNodeRef,
        setActivatorNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: props['data-row-key'],
        disabled,
    })

    const style: React.CSSProperties = useMemo(
        () => ({
            ...props.style,
            transform: CSS.Translate.toString(transform),
            transition,
            ...(isDragging
                ? {
                      position: 'relative',
                      zIndex: 9999,
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  }
                : {}),
        }),
        [props.style, transform, transition, isDragging]
    )

    const contextValue = useMemo<RowContextProps>(
        () => ({ setActivatorNodeRef, listeners, disabled }),
        [setActivatorNodeRef, listeners, disabled]
    )

    return (
        <RowContext.Provider value={contextValue}>
            <tr
                {...restProps}
                ref={setNodeRef}
                style={style}
                {...attributes}
            />
        </RowContext.Provider>
    )
})

/**
 * 表格拖拽排序组件
 *
 * @features
 * - 🎯 基于 @dnd-kit 的高性能拖拽实现
 * - 📋 支持表格行拖拽排序
 * - 🎨 自动添加拖拽句柄列
 * - 🔄 支持拖拽事件回调
 * - ♿ 支持禁用拖拽功能
 * - 🎭 完全兼容 Ant Design Table 组件
 */
function TableDragHandleInner<T = any>(
    props: TableDragHandleProps<T>,
    ref: React.Ref<TableDragHandleRef<T>>
) {
    const {
        columns = [],
        dataSource = [],
        onChange,
        tableProps = {},
        rowKey = DEFAULT_CONFIG.ROW_KEY,
        dragIcon,
        disabled = false,
        style,
        className,
    } = props

    // 验证配置
    const validation = useMemo(
        () => validateDragConfig({ dataSource, rowKey, disabled }),
        [dataSource, rowKey, disabled]
    )

    // 生成包含拖拽句柄的列配置
    const dragColumns = useMemo(() => {
        const handleColumn = {
            key: DEFAULT_CONFIG.DRAG_HANDLE_KEY,
            title: '',
            width: DEFAULT_CONFIG.DRAG_HANDLE_WIDTH,
            align: 'center' as const,
            render: () => <DragHandle icon={dragIcon} />,
        }

        return [handleColumn, ...columns]
    }, [columns, dragIcon])

    // 拖拽结束处理
    const handleDragEnd = useCallback(
        (event: DragEndEvent) => {
            const { active, over } = event

            if (!over || active.id === over.id || !validation.isValid) {
                return
            }

            const activeKey = String(active.id)
            const overKey = String(over.id)

            const dragIndex = findIndexByRowKey(dataSource, rowKey, activeKey)
            const dropIndex = findIndexByRowKey(dataSource, rowKey, overKey)

            if (dragIndex === -1 || dropIndex === -1) {
                return
            }

            const newDataSource = arrayMove(dataSource, dragIndex, dropIndex)

            // 执行回调
            safeCallback(onChange, newDataSource)
        },
        [validation.isValid, dataSource, rowKey, onChange]
    )

    // 生成排序项目ID列表
    const sortableItems = useMemo(() => {
        return dataSource.map((record) => getRowKey(record, rowKey))
    }, [dataSource, rowKey])

    // 表格组件配置
    const tableComponents = useMemo(
        () => ({
            body: {
                row: (props: any) => (
                    <Row
                        {...props}
                        disabled={disabled}
                    />
                ),
            },
        }),
        [disabled]
    )

    // 暴露的 API
    useImperativeHandle(
        ref,
        () => ({
            refresh: () => {
                // 刷新逻辑
            },
            getDataSource: () => dataSource,
        }),
        [dataSource]
    )

    // 如果验证失败且不是因为禁用，显示错误
    if (!validation.isValid && !disabled) {
        console.warn('TableDragHandle validation failed:', validation.error)
    }

    return (
        <div
            className={className}
            style={style}
            data-component="table-drag-handle"
        >
            <DndContext
                modifiers={[restrictToVerticalAxis]}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={sortableItems}
                    strategy={verticalListSortingStrategy}
                >
                    <Table<T>
                        {...tableProps}
                        components={tableComponents}
                        columns={dragColumns}
                        dataSource={dataSource}
                        rowKey={rowKey}
                    />
                </SortableContext>
            </DndContext>
        </div>
    )
}

// 使用 forwardRef 包装泛型组件
const TableDragHandle = React.forwardRef(TableDragHandleInner) as <T = any>(
    props: TableDragHandleProps<T> & { ref?: React.Ref<TableDragHandleRef<T>> }
) => React.ReactElement

// 添加 displayName
Object.defineProperty(TableDragHandle, 'displayName', {
    value: 'TableDragHandle',
    writable: false,
})

export default TableDragHandle
export { TableDragHandle }
export type { TableDragHandleProps, TableDragHandleRef }
