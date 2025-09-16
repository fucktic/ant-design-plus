import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TwoTierCascader } from '../TwoTierCascader'
import {
    TwoTierCascaderRef,
    CascaderOption,
    Level2DataResponse,
    Level1DataResponse,
} from '../types'
import { useRef } from 'react'

// Mock Ant Design components
vi.mock('antd', async () => {
    const actual = await vi.importActual('antd')
    return {
        ...actual,
        theme: {
            useToken: () => ({ token: {} }),
        },
        Empty: ({ description }: { description?: string }) => (
            <div data-testid="empty">{description || 'No Data'}</div>
        ),
        List: ({ children, dataSource, renderItem }: any) => (
            <div data-testid="list">
                {dataSource && dataSource.length > 0 ? (
                    dataSource.map((item: any, index: number) => (
                        <div
                            key={index}
                            data-testid="list-item"
                        >
                            {renderItem ? renderItem(item, index) : item}
                        </div>
                    ))
                ) : (
                    <div data-testid="empty">No Data</div>
                )}
                {children}
            </div>
        ),
        Spin: ({ children, spinning }: { children: React.ReactNode; spinning?: boolean }) => (
            <div
                data-testid="spin"
                data-spinning={spinning}
            >
                {spinning && <div>Loading...</div>}
                {children}
            </div>
        ),
        Typography: {
            Link: ({ children, ...props }: any) => (
                <a
                    data-testid="typography-link"
                    {...props}
                >
                    {children}
                </a>
            ),
            Paragraph: ({ children, ...props }: any) => (
                <p
                    data-testid="typography-paragraph"
                    {...props}
                >
                    {children}
                </p>
            ),
        },
    }
})

// Mock Scrollbar component
vi.mock('../../Scrollbar/Scrollbar', () => ({
    default: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="scrollbar">{children}</div>
    ),
}))

describe('TwoTierCascader', () => {
    const mockLevel1Options: CascaderOption[] = [
        { label: '分类1', value: 'cat1', total: 10 },
        { label: '分类2', value: 'cat2', total: 15 },
        { label: '分类3', value: 'cat3', total: 8 },
    ]

    const mockLevel1Response: Level1DataResponse = {
        data: mockLevel1Options,
    }

    const mockLevel2Response: Level2DataResponse = {
        data: [
            { label: '选项1-1', value: 'opt1-1' },
            { label: '选项1-2', value: 'opt1-2' },
            { label: '选项1-3', value: 'opt1-3' },
        ],
        total: 10,
    }

    const defaultProps = {
        onChange: vi.fn(),
        onLoadLevel1Data: vi.fn().mockResolvedValue(mockLevel1Response),
        onLoadLevel2Data: vi.fn().mockResolvedValue(mockLevel2Response),
    }

    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('应该正确渲染组件', async () => {
        render(<TwoTierCascader {...defaultProps} />)

        await waitFor(() => {
            expect(screen.getByText('一级选项')).toBeInTheDocument()
            expect(screen.getByText('二级选项')).toBeInTheDocument()
            expect(screen.getByText(/已选/)).toBeInTheDocument()
        })
    })

    it('应该加载并显示一级选项', async () => {
        render(<TwoTierCascader {...defaultProps} />)

        await waitFor(() => {
            expect(defaultProps.onLoadLevel1Data).toHaveBeenCalled()
            expect(screen.getByText('分类1')).toBeInTheDocument()
            expect(screen.getByText('分类2')).toBeInTheDocument()
            expect(screen.getByText('分类3')).toBeInTheDocument()
        })
    })

    it('应该在点击一级选项时加载二级选项', async () => {
        const user = userEvent.setup()
        render(<TwoTierCascader {...defaultProps} />)

        await waitFor(() => {
            expect(screen.getByText('分类1')).toBeInTheDocument()
        })

        await user.click(screen.getByText('分类1'))

        await waitFor(() => {
            expect(defaultProps.onLoadLevel2Data).toHaveBeenCalledWith('cat1', 1, 20)
            expect(screen.getByText('选项1-1')).toBeInTheDocument()
            expect(screen.getByText('选项1-2')).toBeInTheDocument()
        })
    })

    it('应该支持自定义标题标签', async () => {
        const customLabels = {
            level1: '自定义一级',
            level2: '自定义二级',
            selected: '自定义已选',
        }

        render(
            <TwoTierCascader
                {...defaultProps}
                headerLabels={customLabels}
            />
        )

        await waitFor(() => {
            expect(screen.getByText('自定义一级')).toBeInTheDocument()
            expect(screen.getByText('自定义二级')).toBeInTheDocument()
            expect(screen.getByText(/自定义已选/)).toBeInTheDocument()
        })
    })

    it('应该支持最大选择数量限制', async () => {
        render(
            <TwoTierCascader
                {...defaultProps}
                maxSelectNum={2}
            />
        )

        await waitFor(() => {
            expect(screen.getByText('已选（0/2）')).toBeInTheDocument()
        })
    })

    it('应该支持自定义分页大小', async () => {
        const user = userEvent.setup()
        render(
            <TwoTierCascader
                {...defaultProps}
                level2PageSize={10}
            />
        )

        await waitFor(() => {
            expect(screen.getByText('分类1')).toBeInTheDocument()
        })

        await user.click(screen.getByText('分类1'))

        await waitFor(() => {
            expect(defaultProps.onLoadLevel2Data).toHaveBeenCalledWith('cat1', 1, 10)
        })
    })

    it('应该支持选择二级选项', async () => {
        const user = userEvent.setup()
        render(<TwoTierCascader {...defaultProps} />)

        // 等待一级选项加载
        await waitFor(() => {
            expect(screen.getByText('分类1')).toBeInTheDocument()
        })

        // 点击一级选项
        await user.click(screen.getByText('分类1'))

        // 等待二级选项加载
        await waitFor(() => {
            expect(screen.getByText('选项1-1')).toBeInTheDocument()
        })

        // 选择二级选项
        const checkbox = screen.getAllByRole('checkbox')[0]
        await user.click(checkbox)

        await waitFor(() => {
            expect(defaultProps.onChange).toHaveBeenCalledWith(['opt1-1'])
        })
    })

    it('应该支持取消选择', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        render(
            <TwoTierCascader
                {...defaultProps}
                onChange={onChange}
            />
        )

        // 选择一个选项
        await waitFor(() => {
            expect(screen.getByText('分类1')).toBeInTheDocument()
        })

        await user.click(screen.getByText('分类1'))

        await waitFor(() => {
            expect(screen.getByText('选项1-1')).toBeInTheDocument()
        })

        const checkbox = screen.getAllByRole('checkbox')[0]
        await user.click(checkbox)

        // 再次点击取消选择
        await user.click(checkbox)

        await waitFor(() => {
            expect(onChange).toHaveBeenLastCalledWith([])
        })
    })

    it('应该显示加载状态', async () => {
        const slowLoadLevel1 = vi.fn(
            () =>
                new Promise<Level1DataResponse>((resolve) =>
                    setTimeout(() => resolve(mockLevel1Response), 100)
                )
        )

        render(
            <TwoTierCascader
                {...defaultProps}
                onLoadLevel1Data={slowLoadLevel1}
            />
        )

        expect(screen.getByTestId('spin')).toHaveAttribute('data-spinning', 'true')

        await waitFor(() => {
            expect(screen.getByTestId('spin')).toHaveAttribute('data-spinning', 'false')
        })
    })

    it('应该处理加载错误', async () => {
        const errorLoadLevel1 = vi.fn().mockRejectedValue(new Error('Load failed'))

        render(
            <TwoTierCascader
                {...defaultProps}
                onLoadLevel1Data={errorLoadLevel1}
            />
        )

        await waitFor(() => {
            expect(screen.getAllByTestId('empty')).toHaveLength(1) // 只有一级选项显示空状态
        })
    })

    it('应该支持添加选择项', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        // 测试 ref 功能需要一个包装组件
        const TestComponent = () => {
            const cascaderRef = useRef<TwoTierCascaderRef>(null)

            return (
                <div>
                    <TwoTierCascader
                        {...defaultProps}
                        onChange={onChange}
                        ref={cascaderRef}
                    />
                    <button
                        onClick={() =>
                            cascaderRef.current?.addSelecteds([
                                { label: '新选项', value: 'new-option' },
                            ])
                        }
                        data-testid="add-selected-button"
                    >
                        Add Selected
                    </button>
                </div>
            )
        }

        render(<TestComponent />)

        // 添加选择项
        await user.click(screen.getByTestId('add-selected-button'))

        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith([{ label: '新选项', value: 'new-option' }])
        })
    })

    it('应该支持自定义类名', async () => {
        render(
            <TwoTierCascader
                {...defaultProps}
                className="custom-cascader"
            />
        )

        const container = document.querySelector('.custom-cascader')
        expect(container).toBeInTheDocument()
    })

    it('应该处理空的一级选项', async () => {
        const emptyLoadLevel1 = vi.fn().mockResolvedValue([])

        render(
            <TwoTierCascader
                {...defaultProps}
                onLoadLevel1Data={emptyLoadLevel1}
            />
        )

        await waitFor(() => {
            expect(screen.getByTestId('empty')).toBeInTheDocument()
        })
    })

    it('应该处理空的二级选项', async () => {
        const user = userEvent.setup()
        const emptyLevel2Response: Level2DataResponse = { data: [], total: 0 }
        const emptyLoadLevel2 = vi.fn().mockResolvedValue(emptyLevel2Response)

        render(
            <TwoTierCascader
                {...defaultProps}
                onLoadLevel2Data={emptyLoadLevel2}
            />
        )

        await waitFor(() => {
            expect(screen.getByText('分类1')).toBeInTheDocument()
        })

        await user.click(screen.getByText('分类1'))

        await waitFor(() => {
            expect(screen.getAllByTestId('empty')).toHaveLength(2) // 二级选项和已选项目都显示空状态
        })
    })

    it('应该正确显示选择计数', async () => {
        const user = userEvent.setup()
        render(
            <TwoTierCascader
                {...defaultProps}
                maxSelectNum={10}
            />
        )

        await waitFor(() => {
            expect(screen.getByText('已选（0/10）')).toBeInTheDocument()
        })

        // 选择一个选项后计数应该更新
        await waitFor(() => {
            expect(screen.getByText('分类1')).toBeInTheDocument()
        })

        await user.click(screen.getByText('分类1'))

        await waitFor(() => {
            expect(screen.getByText('选项1-1')).toBeInTheDocument()
        })

        const checkbox = screen.getAllByRole('checkbox')[0]
        await user.click(checkbox)

        await waitFor(() => {
            expect(screen.getByText('已选（1/10）')).toBeInTheDocument()
        })
    })
})
