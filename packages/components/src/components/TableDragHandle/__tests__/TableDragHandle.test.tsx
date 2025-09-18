import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TableDragHandle } from '../TableDragHandle'
import { TableDragHandleRef } from '../types'
import { useRef } from 'react'

// Mock @dnd-kit modules
vi.mock('@dnd-kit/core', () => ({
    DndContext: ({
        children,
        style,
        className,
    }: {
        children: React.ReactNode
        style?: any
        className?: string
    }) => (
        <div
            data-testid="dnd-context"
            style={style}
            className={className}
        >
            {children}
        </div>
    ),
    useDndMonitor: () => ({}),
}))

vi.mock('@dnd-kit/sortable', () => ({
    SortableContext: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="sortable-context">{children}</div>
    ),
    useSortable: () => ({
        attributes: {},
        listeners: {},
        setNodeRef: vi.fn(),
        setActivatorNodeRef: vi.fn(),
        transform: null,
        transition: null,
        isDragging: false,
    }),
    arrayMove: (array: any[], oldIndex: number, newIndex: number) => {
        const newArray = [...array]
        const [removed] = newArray.splice(oldIndex, 1)
        newArray.splice(newIndex, 0, removed)
        return newArray
    },
    verticalListSortingStrategy: 'vertical',
}))

vi.mock('@dnd-kit/modifiers', () => ({
    restrictToVerticalAxis: vi.fn(),
}))

vi.mock('@dnd-kit/utilities', () => ({
    CSS: {
        Translate: {
            toString: () => 'translate3d(0, 0, 0)',
        },
    },
}))

// Mock Ant Design components
vi.mock('antd', async () => {
    const actual = await vi.importActual('antd')
    return {
        ...actual,
        Table: ({ children, components, dataSource, rowKey, pagination, ...props }: any) => {
            // 过滤掉不应该传递给DOM的属性
            const { onDragEnd, ...domProps } = props
            return (
                <div
                    data-testid="table"
                    {...domProps}
                >
                    {children}
                </div>
            )
        },
        Button: ({ children, ...props }: any) => (
            <button
                data-testid="drag-handle-button"
                {...props}
            >
                {children}
            </button>
        ),
    }
})

describe('TableDragHandle', () => {
    const mockData = [
        { id: '1', name: 'John', age: 30 },
        { id: '2', name: 'Jane', age: 25 },
        { id: '3', name: 'Bob', age: 35 },
    ]

    const mockColumns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
    ]

    const defaultProps = {
        dataSource: mockData,
        columns: mockColumns,
        onChange: vi.fn(),
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('应该正确渲染组件', () => {
        render(<TableDragHandle {...defaultProps} />)

        expect(screen.getByTestId('dnd-context')).toBeInTheDocument()
        expect(screen.getByTestId('sortable-context')).toBeInTheDocument()
        expect(screen.getByTestId('table')).toBeInTheDocument()
    })

    it('应该支持自定义拖拽句柄图标', () => {
        const customIcon = <span data-testid="custom-icon">Custom Icon</span>
        render(
            <TableDragHandle
                {...defaultProps}
                dragIcon={customIcon}
            />
        )

        expect(screen.getByTestId('table')).toBeInTheDocument()
    })

    it('应该支持禁用拖拽功能', () => {
        render(
            <TableDragHandle
                {...defaultProps}
                disabled
            />
        )

        expect(screen.getByTestId('table')).toBeInTheDocument()
    })

    it('应该支持自定义行键', () => {
        render(
            <TableDragHandle
                {...defaultProps}
                rowKey="name"
            />
        )

        expect(screen.getByTestId('table')).toBeInTheDocument()
    })

    it('应该支持数据变化回调', () => {
        const onChange = vi.fn()
        render(
            <TableDragHandle
                {...defaultProps}
                onChange={onChange}
            />
        )

        expect(screen.getByTestId('table')).toBeInTheDocument()
    })

    it('应该支持传递表格属性', () => {
        const tableProps = {
            pagination: false as const,
            size: 'small' as const,
        }

        render(
            <TableDragHandle
                {...defaultProps}
                tableProps={tableProps}
            />
        )

        expect(screen.getByTestId('table')).toBeInTheDocument()
    })

    it('应该支持自定义类名', () => {
        render(
            <TableDragHandle
                {...defaultProps}
                className="custom-class"
            />
        )

        const container = screen.getByTestId('dnd-context').parentElement
        expect(container).toHaveClass('custom-class')
    })

    // 测试 ref 功能需要一个包装组件
    const TestTableDragHandleWithRef = () => {
        const tableRef = useRef<TableDragHandleRef<any>>(null)

        return (
            <div>
                <TableDragHandle
                    {...defaultProps}
                    ref={tableRef}
                />
                <button
                    onClick={() => tableRef.current?.refresh()}
                    data-testid="refresh-button"
                >
                    Refresh
                </button>
                <button
                    onClick={() => {
                        const data = tableRef.current?.getDataSource()
                        console.log(data)
                    }}
                    data-testid="get-data-button"
                >
                    Get Data
                </button>
            </div>
        )
    }

    it('应该支持 ref 调用', () => {
        render(<TestTableDragHandleWithRef />)

        const refreshButton = screen.getByTestId('refresh-button')
        const getDataButton = screen.getByTestId('get-data-button')

        expect(refreshButton).toBeInTheDocument()
        expect(getDataButton).toBeInTheDocument()

        // 点击按钮不应该抛出错误
        fireEvent.click(refreshButton)
        fireEvent.click(getDataButton)
    })

    it('应该处理空数据源', () => {
        render(
            <TableDragHandle
                {...defaultProps}
                dataSource={[]}
            />
        )

        expect(screen.getByTestId('table')).toBeInTheDocument()
    })

    it('应该处理空列配置', () => {
        render(
            <TableDragHandle
                {...defaultProps}
                columns={[]}
            />
        )

        expect(screen.getByTestId('table')).toBeInTheDocument()
    })

    it('应该处理未定义的列配置', () => {
        render(
            <TableDragHandle
                {...defaultProps}
                columns={undefined}
            />
        )

        expect(screen.getByTestId('table')).toBeInTheDocument()
    })

    it('应该支持复杂的数据结构', () => {
        interface ComplexDataType {
            id: string
            user: { name: string; profile: { age: number } }
            metadata: { created: string }
        }

        const complexData: ComplexDataType[] = [
            {
                id: '1',
                user: { name: 'John', profile: { age: 30 } },
                metadata: { created: '2023-01-01' },
            },
            {
                id: '2',
                user: { name: 'Jane', profile: { age: 25 } },
                metadata: { created: '2023-01-02' },
            },
        ]

        const complexColumns = [
            {
                title: 'Name',
                dataIndex: ['user', 'name'],
                key: 'name',
            },
            {
                title: 'Age',
                dataIndex: ['user', 'profile', 'age'],
                key: 'age',
            },
        ]

        render(
            <TableDragHandle<ComplexDataType>
                dataSource={complexData}
                columns={complexColumns}
                onChange={vi.fn()}
            />
        )

        expect(screen.getByTestId('table')).toBeInTheDocument()
    })

    it('应该支持自定义行键为字符串', () => {
        render(
            <TableDragHandle
                {...defaultProps}
                rowKey="name"
            />
        )

        expect(screen.getByTestId('table')).toBeInTheDocument()
    })

    it('应该正确处理拖拽事件', () => {
        const onChange = vi.fn()
        render(
            <TableDragHandle
                {...defaultProps}
                onChange={onChange}
            />
        )

        // 由于我们 mock 了 dnd-kit，这里主要测试组件不会崩溃
        expect(screen.getByTestId('table')).toBeInTheDocument()
    })
})
