import React, { useState } from 'react'
import { Typography, Space, Divider, theme } from 'antd'
import { Button } from '@ant-design-plus/ui'
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons'
import DemoContainer from '../../../components/DemoContainer'
import CodeHighlighter from '../../../components/CodeHighlighter'

const { Title, Paragraph } = Typography

const ButtonDemo: React.FC = () => {
    const [loading, setLoading] = useState(false)

    const { token } = theme.useToken()

    const handleLoadingClick = () => {
        setLoading(true)
        setTimeout(() => setLoading(false), 2000)
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
                    Button 按钮
                </Title>
                <Paragraph
                    className="mb-0"
                    style={{ margin: 0 }}
                >
                    按钮用于开始一个即时操作。基于 Ant Design Button
                    组件进行增强，添加了更多的交互效果。
                </Paragraph>
            </div>

            <div className="pt-6">
                <DemoContainer
                    title="基础用法"
                    description="基本的按钮用法，支持多种类型。"
                    code={`import React from 'react';
import { Space } from 'antd';
import { Button } from '@ant-design-plus/ui';

const BasicExample = () => {
  return (
    <Space wrap>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
      <Button type="dashed">Dashed Button</Button>
      <Button type="text">Text Button</Button>
      <Button type="link">Link Button</Button>
    </Space>
  );
};

export default BasicExample;`}
                >
                    <Space wrap>
                        <Button type="primary">Primary Button</Button>
                        <Button>Default Button</Button>
                        <Button type="dashed">Dashed Button</Button>
                        <Button type="text">Text Button</Button>
                        <Button type="link">Link Button</Button>
                    </Space>
                </DemoContainer>

                <DemoContainer
                    title="加载状态"
                    description="添加 loading 属性即可让按钮处于加载状态。"
                    code={`import React, { useState } from 'react';
import { Space } from 'antd';
import { Button } from '@ant-design-plus/ui';

const LoadingExample = () => {
  const [loading, setLoading] = useState(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Space wrap>
      <Button type="primary" loading>
        Loading
      </Button>
      <Button type="primary" loading={loading} onClick={handleLoadingClick}>
        Click me!
      </Button>
    </Space>
  );
};

export default LoadingExample;`}
                >
                    <Space wrap>
                        <Button
                            type="primary"
                            loading
                        >
                            Loading
                        </Button>
                        <Button
                            type="primary"
                            loading={loading}
                            onClick={handleLoadingClick}
                        >
                            Click me!
                        </Button>
                    </Space>
                </DemoContainer>

                <DemoContainer
                    title="图标按钮"
                    description="当需要在 Button 内嵌入 Icon 时，可以设置 icon 属性。"
                    code={`import React from 'react';
import { Space } from 'antd';
import { SearchOutlined, DownloadOutlined } from '@ant-design/icons';
import { Button } from '@ant-design-plus/ui';

const IconExample = () => {
  return (
    <Space wrap>
      <Button type="primary" icon={<SearchOutlined />}>
        Search
      </Button>
      <Button icon={<DownloadOutlined />}>Download</Button>
      <Button type="primary" icon={<SearchOutlined />} />
      <Button icon={<DownloadOutlined />} />
    </Space>
  );
};

export default IconExample;`}
                >
                    <Space wrap>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                        >
                            Search
                        </Button>
                        <Button icon={<DownloadOutlined />}>Download</Button>
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                        />
                        <Button icon={<DownloadOutlined />} />
                    </Space>
                </DemoContainer>

                <DemoContainer
                    title="按钮尺寸"
                    description="按钮有大、中、小三种尺寸。"
                    code={`import React from 'react';
import { Space } from 'antd';
import { Button } from '@ant-design-plus/ui';

const SizeExample = () => {
  return (
    <Space wrap>
      <Button type="primary" size="large">
        Large
      </Button>
      <Button type="primary">Default</Button>
      <Button type="primary" size="small">
        Small
      </Button>
    </Space>
  );
};

export default SizeExample;`}
                >
                    <Space wrap>
                        <Button
                            type="primary"
                            size="large"
                        >
                            Large
                        </Button>
                        <Button type="primary">Default</Button>
                        <Button
                            type="primary"
                            size="small"
                        >
                            Small
                        </Button>
                    </Space>
                </DemoContainer>

                <Divider />

                <Title level={2}>API</Title>
                <Paragraph>Button 的属性说明如下：</Paragraph>

                <CodeHighlighter
                    code={`interface ButtonProps extends AntdButtonProps {
  loading?: boolean;           // 是否显示加载状态
  loadingIcon?: ReactNode;     // 自定义加载图标
  className?: string;          // 额外的CSS类名
}`}
                    language="typescript"
                    showCopyButton={true}
                    showThemeSelector={false}
                />
            </div>
        </div>
    )
}

export default ButtonDemo
