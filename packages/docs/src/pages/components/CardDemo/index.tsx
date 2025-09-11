import React from 'react'
import { Typography, Row, Col, Divider, Card as AntdCard, theme } from 'antd'
import { Card } from '@ant-design-plus/ui'
import DemoContainer from '../../../components/DemoContainer'
import CodeHighlighter from '../../../components/CodeHighlighter'

const { Title, Paragraph } = Typography
const { Meta } = AntdCard

const CardDemo: React.FC = () => {
    const { token } = theme.useToken()

    return (
        <div>
            <div
                className="sticky top-0 backdrop-blur-sm border-b p-6 z-10"
                style={{
                    backgroundColor: token.colorBgContainer,
                    borderBottomColor: token.colorBorder,
                }}
            >
                <Title
                    level={1}
                    style={{ margin: 0, marginBottom: '8px' }}
                >
                    Card 卡片
                </Title>
                <Paragraph style={{ margin: 0 }}>
                    通用卡片容器。基于 Ant Design Card 组件进行增强，添加了阴影和悬停效果。
                </Paragraph>
            </div>

            <div className="p-6">
                <DemoContainer
                    title="基础用法"
                    description="包含标题、内容、操作区域。"
                    code={`import React from 'react';
import { Row, Col } from 'antd';
import { Card } from '@ant-design-plus/ui';

const BasicExample = () => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Default size card" extra={<a href="#">More</a>}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
      <Col span={8}>
        <Card size="small" title="Small size card" extra={<a href="#">More</a>}>
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Col>
    </Row>
  );
};

export default BasicExample;`}
                >
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card
                                title="Default size card"
                                extra={<a href="#">More</a>}
                            >
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                size="small"
                                title="Small size card"
                                extra={<a href="#">More</a>}
                            >
                                <p>Card content</p>
                                <p>Card content</p>
                                <p>Card content</p>
                            </Card>
                        </Col>
                    </Row>
                </DemoContainer>

                <DemoContainer
                    title="无边框"
                    description="在灰色背景上使用无边框的卡片。"
                    code={`import React from 'react';
import { Card } from '@ant-design-plus/ui';

const BorderlessExample = () => {
  return (
    <div style={{ background: '#ececec', padding: '30px' }}>
      <Card title="Card title" bordered={false}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default BorderlessExample;`}
                >
                    <div style={{ background: '#ececec', padding: '30px' }}>
                        <Card
                            title="Card title"
                            bordered={false}
                        >
                            <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p>
                        </Card>
                    </div>
                </DemoContainer>

                <DemoContainer
                    title="简洁卡片"
                    description="只包含内容区域。"
                    code={`import React from 'react';
import { Card } from '@ant-design-plus/ui';

const SimpleExample = () => {
  return (
    <Card>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
};

export default SimpleExample;`}
                >
                    <Card>
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </DemoContainer>

                <DemoContainer
                    title="更灵活的内容展示"
                    description="可以调整默认边距，设定宽度。"
                    code={`import React from 'react';
import { Card } from '@ant-design-plus/ui';
import { Card as AntdCard } from 'antd';

const { Meta } = AntdCard;

const FlexibleExample = () => {
  return (
    <Card 
      hoverable 
      style={{ width: 240 }} 
      cover={
        <img 
          alt="example" 
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" 
        />
      }
    >
      <Meta title="Europe Street beat" description="www.instagram.com" />
    </Card>
  );
};

export default FlexibleExample;`}
                >
                    <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={
                            <img
                                alt="example"
                                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                            />
                        }
                    >
                        <Meta
                            title="Europe Street beat"
                            description="www.instagram.com"
                        />
                    </Card>
                </DemoContainer>

                <DemoContainer
                    title="栅格卡片"
                    description="在系统概览页面常常和栅格进行配合。"
                    code={`import React from 'react';
import { Row, Col } from 'antd';
import { Card } from '@ant-design-plus/ui';

const GridExample = () => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
    </Row>
  );
};

export default GridExample;`}
                >
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card
                                title="Card title"
                                bordered={false}
                            >
                                Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                title="Card title"
                                bordered={false}
                            >
                                Card content
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card
                                title="Card title"
                                bordered={false}
                            >
                                Card content
                            </Card>
                        </Col>
                    </Row>
                </DemoContainer>

                <Divider />

                <Title level={2}>API</Title>
                <Paragraph>Card 的属性说明如下：</Paragraph>

                <CodeHighlighter
                    code={`interface CardProps extends AntdCardProps {
  shadow?: boolean;      // 是否显示阴影，默认 true
  hoverable?: boolean;   // 是否可悬停，默认 true
  extra?: ReactNode;     // 额外操作按钮
  className?: string;    // 额外的CSS类名
}`}
                    language="typescript"
                    showCopyButton={true}
                    showThemeSelector={false}
                />
            </div>
        </div>
    )
}

export default CardDemo
