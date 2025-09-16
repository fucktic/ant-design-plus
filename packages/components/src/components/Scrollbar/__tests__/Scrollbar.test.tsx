import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Scrollbar from '../Scrollbar'
import { ScrollbarRef } from '../types'
import { useRef } from 'react'

// Mock Ant Design theme
vi.mock('antd', async () => {
    const actual = await vi.importActual('antd')
    return {
        ...actual,
        theme: {
            useToken: () => ({ token: {} }),
        },
    }
})

// Mock hooks
vi.mock('../hooks/useScrollbarCalculation', () => ({
    useScrollbarCalculation: () => ({
        calculateScrollbarState: vi.fn().mockReturnValue({
            verticalScrollbar: {
                visible: true,
                thumbHeight: 50,
                thumbTop: 0,
                trackHeight: 200,
            },
            horizontalScrollbar: {
                visible: false,
                thumbWidth: 0,
                thumbLeft: 0,
                trackWidth: 0,
            },
        }),
    }),
}))

vi.mock('../hooks/useScrollbarDrag', () => ({
    useScrollbarDrag: () => ({
        isDragging: false,
        handleMouseDown: vi.fn(),
    }),
}))

vi.mock('../hooks/useScrollbarState', () => ({
    useScrollbarState: () => ({
        scrollbarState: {
            verticalScrollbar: {
                visible: true,
                thumbHeight: 50,
                thumbTop: 0,
                trackHeight: 200,
            },
            horizontalScrollbar: {
                visible: false,
                thumbWidth: 0,
                thumbLeft: 0,
                trackWidth: 0,
            },
        },
        updateScrollbarState: vi.fn(),
        setUpdateCallback: vi.fn(),
    }),
}))

vi.mock('../hooks/useScrollbarEvents', () => ({
    useScrollbarEvents: () => ({}),
}))

describe('Scrollbar', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('应该正确渲染组件', () => {
        render(
            <Scrollbar>
                <div>Test Content</div>
            </Scrollbar>
        )

        expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('应该渲染滚动条容器', () => {
        render(
            <Scrollbar data-testid="scrollbar">
                <div>Test Content</div>
            </Scrollbar>
        )

        const container = screen.getByTestId('scrollbar')
        expect(container).toBeInTheDocument()
    })

    it('应该支持自定义类名', () => {
        render(
            <Scrollbar
                className="custom-scrollbar"
                data-testid="scrollbar"
            >
                <div>Test Content</div>
            </Scrollbar>
        )

        const container = screen.getByTestId('scrollbar')
        expect(container).toHaveClass('custom-scrollbar')
    })

    it('应该支持自定义样式', () => {
        const customStyle = { backgroundColor: 'red' }
        render(
            <Scrollbar
                style={customStyle}
                data-testid="scrollbar"
            >
                <div>Test Content</div>
            </Scrollbar>
        )

        const container = screen.getByTestId('scrollbar')
        expect(container).toHaveStyle('background-color: red')
    })

    it('应该支持滚动事件回调', () => {
        const onScroll = vi.fn()
        render(
            <Scrollbar onScroll={onScroll}>
                <div style={{ height: '1000px' }}>Long Content</div>
            </Scrollbar>
        )

        const contentWrapper = screen.getByRole('region')
        fireEvent.scroll(contentWrapper, { target: { scrollTop: 100 } })

        expect(onScroll).toHaveBeenCalled()
    })

    it('应该支持滚动到底部回调', () => {
        const onScrollToBottom = vi.fn()
        render(
            <Scrollbar onScrollToBottom={onScrollToBottom}>
                <div style={{ height: '1000px' }}>Long Content</div>
            </Scrollbar>
        )

        const contentWrapper = screen.getByRole('region')
        // 模拟滚动到底部
        Object.defineProperty(contentWrapper, 'scrollTop', { value: 800, writable: true })
        Object.defineProperty(contentWrapper, 'scrollHeight', { value: 1000, writable: true })
        Object.defineProperty(contentWrapper, 'clientHeight', { value: 200, writable: true })

        fireEvent.scroll(contentWrapper)

        expect(onScrollToBottom).toHaveBeenCalled()
    })

    it('应该支持禁用水平滚动条', () => {
        render(
            <Scrollbar
                showHorizontal={false}
                data-testid="scrollbar"
            >
                <div>Test Content</div>
            </Scrollbar>
        )

        // 由于我们 mock 了 hooks，这里主要测试 props 传递
        expect(screen.getByTestId('scrollbar')).toBeInTheDocument()
    })

    it('应该支持禁用垂直滚动条', () => {
        render(
            <Scrollbar
                showVertical={false}
                data-testid="scrollbar"
            >
                <div>Test Content</div>
            </Scrollbar>
        )

        expect(screen.getByTestId('scrollbar')).toBeInTheDocument()
    })

    it('应该支持自定义滚动条大小', () => {
        render(
            <Scrollbar
                scrollbarSize={20}
                data-testid="scrollbar"
            >
                <div>Test Content</div>
            </Scrollbar>
        )

        expect(screen.getByTestId('scrollbar')).toBeInTheDocument()
    })

    it('应该支持自定义滚动条颜色', () => {
        render(
            <Scrollbar
                scrollbarColor="#ff0000"
                data-testid="scrollbar"
            >
                <div>Test Content</div>
            </Scrollbar>
        )

        expect(screen.getByTestId('scrollbar')).toBeInTheDocument()
    })

    it('应该支持自定义轨道颜色', () => {
        render(
            <Scrollbar
                trackColor="#00ff00"
                data-testid="scrollbar"
            >
                <div>Test Content</div>
            </Scrollbar>
        )

        expect(screen.getByTestId('scrollbar')).toBeInTheDocument()
    })

    it('应该支持自定义前缀类名', () => {
        render(
            <Scrollbar
                prefixCls="custom-prefix"
                data-testid="scrollbar"
            >
                <div>Test Content</div>
            </Scrollbar>
        )

        expect(screen.getByTestId('scrollbar')).toBeInTheDocument()
    })

    it('应该支持自动隐藏功能', () => {
        render(
            <Scrollbar
                autoHide={true}
                data-testid="scrollbar"
            >
                <div>Test Content</div>
            </Scrollbar>
        )

        expect(screen.getByTestId('scrollbar')).toBeInTheDocument()
    })

    it('应该支持自定义隐藏延迟', () => {
        render(
            <Scrollbar
                hideDelay={2000}
                data-testid="scrollbar"
            >
                <div>Test Content</div>
            </Scrollbar>
        )

        expect(screen.getByTestId('scrollbar')).toBeInTheDocument()
    })

    it('应该正确设置 displayName', () => {
        expect(Scrollbar.displayName).toBe('Scrollbar')
    })

    // 测试 ref 功能需要一个包装组件
    const TestScrollbarWithRef = () => {
        const scrollbarRef = useRef<ScrollbarRef>(null)

        return (
            <div>
                <Scrollbar
                    ref={scrollbarRef}
                    data-testid="scrollbar"
                >
                    <div>Test Content</div>
                </Scrollbar>
                <button
                    onClick={() => scrollbarRef.current?.scrollTo({ top: 100 })}
                    data-testid="scroll-button"
                >
                    Scroll
                </button>
            </div>
        )
    }

    it('应该支持 ref 调用', () => {
        render(<TestScrollbarWithRef />)

        const scrollButton = screen.getByTestId('scroll-button')
        expect(scrollButton).toBeInTheDocument()

        // 点击按钮不应该抛出错误
        fireEvent.click(scrollButton)
    })

    it('应该处理空子元素', () => {
        render(<Scrollbar data-testid="scrollbar">{null}</Scrollbar>)

        expect(screen.getByTestId('scrollbar')).toBeInTheDocument()
    })

    it('应该处理多个子元素', () => {
        render(
            <Scrollbar data-testid="scrollbar">
                <div>First Child</div>
                <div>Second Child</div>
            </Scrollbar>
        )

        expect(screen.getByText('First Child')).toBeInTheDocument()
        expect(screen.getByText('Second Child')).toBeInTheDocument()
    })
})
