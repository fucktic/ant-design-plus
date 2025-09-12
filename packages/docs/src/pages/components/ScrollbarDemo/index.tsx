import React, { useRef, useState } from 'react'
import { Typography, Space, Button, Divider, theme, Slider } from 'antd'
import { Scrollbar } from 'ant-design-plus-ui'
import DemoContainer from '../../../components/DemoContainer'
import CodeHighlighter from '../../../components/CodeHighlighter'

const { Title, Paragraph } = Typography

const ScrollbarDemo: React.FC = () => {
    const scrollbarRef = useRef<any>(null)
    const [scrollbarSize, setScrollbarSize] = useState(8)

    const { token } = theme.useToken()

    const handleScrollTo = () => {
        scrollbarRef.current?.scrollTo({ top: 200, left: 100, behavior: 'smooth' })
    }

    const handleScrollTop = () => {
        scrollbarRef.current?.scrollTop('smooth')
    }

    const handleScrollLeft = () => {
        scrollbarRef.current?.scrollLeft('smooth')
    }

    return (
        <div className="relative">
            {/* 固定标题和描述 */}
            <div
                className="sticky top-0 z-20 py-4"
                style={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: token.colorBgContainer,
                    borderBottom: `1px solid ${token.colorBorder}`,
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                }}
            >
                <Title
                    level={1}
                    className="mb-2"
                    style={{ margin: '0 0 8px 0' }}
                >
                    Scrollbar 滚动条
                </Title>
                <Paragraph
                    className="mb-0"
                    style={{ margin: 0 }}
                >
                    自定义滚动条组件，提供浮动滚动条、响应式设计和丰富的交互功能。滚动条不占用容器空间，浮动在内容之上。
                </Paragraph>
            </div>

            <div className="pt-6">
                <DemoContainer
                    title="基础用法"
                    description="基本的滚动条用法，当内容超出容器时自动显示滚动条。"
                    code={`import React from 'react';
import { Scrollbar } from 'ant-design-plus-ui';

const BasicExample = () => {
  return (
    <Scrollbar style={{ height: 200, width: 300 }}>
      <div style={{ 
        height: 400, 
        width: 500, 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: 20,
        color: 'white'
      }}>
        <h3>可滚动内容</h3>
        <p>这是一个可以滚动的内容区域。</p>
        <p>内容高度和宽度都超出了容器大小。</p>
        <p>滚动条会自动显示在右侧和底部。</p>
        <p>滚动条不会占用内容空间。</p>
      </div>
    </Scrollbar>
  );
};

export default BasicExample;`}
                >
                    <Scrollbar
                        style={{
                            height: 200,
                            width: 300,
                            border: `1px solid ${token.colorBorder}`,
                        }}
                    >
                        <div
                            style={{
                                height: 400,
                                width: 500,
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                padding: 20,
                                color: 'white',
                            }}
                        >
                            <h3>可滚动内容</h3>
                            <p>这是一个可以滚动的内容区域。</p>
                            <p>内容高度和宽度都超出了容器大小。</p>
                            <p>滚动条会自动显示在右侧和底部。</p>
                            <p>滚动条不会占用内容空间。</p>
                        </div>
                    </Scrollbar>
                </DemoContainer>

                <DemoContainer
                    title="仅垂直滚动"
                    description="通过设置 showHorizontal={false} 只显示垂直滚动条。"
                    code={`import React from 'react';
import { Scrollbar } from 'ant-design-plus-ui';

const VerticalExample = () => {
  return (
    <Scrollbar 
      style={{ height: 200, width: 300 }} 
      showHorizontal={false}
    >
      <div style={{ 
        height: 400, 
        padding: 20,
        background: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%)'
      }}>
        <h3>仅垂直滚动</h3>
        <p>这个示例只显示垂直滚动条。</p>
        <p>水平滚动条被禁用了。</p>
        <p>内容宽度适应容器宽度。</p>
      </div>
    </Scrollbar>
  );
};

export default VerticalExample;`}
                >
                    <Scrollbar
                        style={{
                            height: 200,
                            width: 300,
                            border: `1px solid ${token.colorBorder}`,
                        }}
                        showHorizontal={false}
                    >
                        <div
                            style={{
                                height: 400,
                                padding: 20,
                                background: 'linear-gradient(45deg, #ff9a9e 0%, #fecfef 100%)',
                            }}
                        >
                            <h3>仅垂直滚动</h3>
                            <p>这个示例只显示垂直滚动条。</p>
                            <p>水平滚动条被禁用了。</p>
                            <p>内容宽度适应容器宽度。</p>
                        </div>
                    </Scrollbar>
                </DemoContainer>

                <DemoContainer
                    title="仅水平滚动"
                    description="通过设置 showVertical={false} 只显示水平滚动条。"
                    code={`import React from 'react';
import { Scrollbar } from 'ant-design-plus-ui';

const HorizontalExample = () => {
  return (
    <Scrollbar 
      style={{ height: 100, width: 300 }} 
      showVertical={false}
    >
      <div style={{ 
        width: 600, 
        height: 80,
        padding: '20px',
        background: 'linear-gradient(90deg, #a8edea 0%, #fed6e3 100%)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px'
      }}>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} style={{
            minWidth: 80,
            height: 40,
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 500
          }}>
            Item {i + 1}
          </div>
        ))}
      </div>
    </Scrollbar>
  );
};

export default HorizontalExample;`}
                >
                    <Scrollbar
                        style={{
                            height: 100,
                            width: 300,
                            border: `1px solid ${token.colorBorder}`,
                        }}
                        showVertical={false}
                    >
                        <div
                            style={{
                                width: 600,
                                height: 80,
                                padding: '20px',
                                background: 'linear-gradient(90deg, #a8edea 0%, #fed6e3 100%)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                            }}
                        >
                            {Array.from({ length: 10 }, (_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        minWidth: 80,
                                        height: 40,
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: 4,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: 500,
                                    }}
                                >
                                    Item {i + 1}
                                </div>
                            ))}
                        </div>
                    </Scrollbar>
                </DemoContainer>

                <DemoContainer
                    title="自定义样式和方法调用"
                    description="自定义滚动条样式，并演示编程式滚动方法。"
                    code={`import React, { useRef } from 'react';
import { Button, Space, Slider } from 'antd';
import { Scrollbar } from 'ant-design-plus-ui';

const CustomExample = () => {
  const scrollbarRef = useRef(null);
  const [scrollbarSize, setScrollbarSize] = useState(12);

  const handleScrollTo = () => {
    scrollbarRef.current?.scrollTo({ top: 200, left: 100, behavior: 'smooth' });
  };

  const handleScrollTop = () => {
    scrollbarRef.current?.scrollTop('smooth');
  };

  const handleScrollLeft = () => {
    scrollbarRef.current?.scrollLeft('smooth');
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={handleScrollTo}>滚动到 (100, 200)</Button>
        <Button onClick={handleScrollTop}>滚动到顶部</Button>
        <Button onClick={handleScrollLeft}>滚动到左侧</Button>
      </Space>
      
      <div style={{ marginBottom: 16 }}>
        <span>滚动条大小: </span>
        <Slider 
          min={4} 
          max={20} 
          value={scrollbarSize} 
          onChange={setScrollbarSize}
          style={{ width: 200, display: 'inline-block', marginLeft: 8 }}
        />
      </div>

      <Scrollbar 
        ref={scrollbarRef}
        style={{ height: 200, width: 400 }}
        scrollbarSize={scrollbarSize}
        scrollbarColor="rgba(24, 144, 255, 0.8)"
        trackColor="rgba(24, 144, 255, 0.1)"
      >
        <div style={{ 
          height: 600, 
          width: 800, 
          padding: 20,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}>
          <h3>自定义滚动条</h3>
          <p>这个示例展示了自定义滚动条样式和编程式滚动。</p>
          <p>滚动条颜色为蓝色主题。</p>
          <p>可以通过按钮控制滚动位置。</p>
          <p>滚动条大小可以动态调整。</p>
        </div>
      </Scrollbar>
    </div>
  );
};

export default CustomExample;`}
                >
                    <div>
                        <Space style={{ marginBottom: 16 }}>
                            <Button onClick={handleScrollTo}>滚动到 (100, 200)</Button>
                            <Button onClick={handleScrollTop}>滚动到顶部</Button>
                            <Button onClick={handleScrollLeft}>滚动到左侧</Button>
                        </Space>

                        <div style={{ marginBottom: 16 }}>
                            <span>滚动条大小: </span>
                            <Slider
                                min={4}
                                max={20}
                                value={scrollbarSize}
                                onChange={setScrollbarSize}
                                style={{ width: 200, display: 'inline-block', marginLeft: 8 }}
                            />
                        </div>

                        <Scrollbar
                            ref={scrollbarRef}
                            style={{
                                height: 200,
                                width: 400,
                                border: `1px solid ${token.colorBorder}`,
                            }}
                            scrollbarSize={scrollbarSize}
                            scrollbarColor="rgba(24, 144, 255, 0.8)"
                            trackColor="rgba(24, 144, 255, 0.1)"
                        >
                            <div
                                style={{
                                    height: 600,
                                    width: 800,
                                    padding: 20,
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    color: 'white',
                                }}
                            >
                                <h3>自定义滚动条</h3>
                                <p>这个示例展示了自定义滚动条样式和编程式滚动。</p>
                                <p>滚动条颜色为蓝色主题。</p>
                                <p>可以通过按钮控制滚动位置。</p>
                                <p>滚动条大小可以动态调整。</p>
                            </div>
                        </Scrollbar>
                    </div>
                </DemoContainer>

                <Divider />

                <Title level={2}>API</Title>
                <Paragraph>Scrollbar 的属性说明如下：</Paragraph>

                <CodeHighlighter
                    code={`interface ScrollbarProps {
  children: ReactNode;                    // 子元素
  style?: CSSProperties;                  // 容器样式
  className?: string;                     // 容器类名
  onScroll?: (event: Event) => void;      // 滚动事件回调
  showHorizontal?: boolean;               // 是否显示水平滚动条，默认 true
  showVertical?: boolean;                 // 是否显示垂直滚动条，默认 true
  scrollbarSize?: number;                 // 滚动条宽度，默认 8
  scrollbarColor?: string;                // 滚动条颜色，默认 rgba(0, 0, 0, 0.45)
  trackColor?: string;                    // 滚动条轨道颜色，默认 rgba(0, 0, 0, 0.06)
  prefixCls?: string;                     // 组件类名前缀，默认 adp-scrollbar
}

interface ScrollbarRef {
  scrollTo: (options: {                   // 滚动到指定位置
    left?: number; 
    top?: number; 
    behavior?: ScrollBehavior 
  }) => void;
  scrollTop: (behavior?: ScrollBehavior) => void;     // 滚动到顶部
  scrollLeft: (behavior?: ScrollBehavior) => void;    // 滚动到左侧
  getScrollElement: () => HTMLDivElement | null;      // 获取滚动容器元素
}`}
                    language="typescript"
                    showCopyButton={true}
                    showThemeSelector={false}
                />
            </div>
        </div>
    )
}

export default ScrollbarDemo
