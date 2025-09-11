import React from 'react'
import { Typography, Divider, Tag, Space, theme } from 'antd'
import { Table } from 'ant-design-plus-ui'
import DemoContainer from '../../../components/DemoContainer'
import CodeHighlighter from '../../../components/CodeHighlighter'

const { Title, Paragraph } = Typography

const TableDemo: React.FC = () => {
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            render: (tags: string[]) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green'
                        if (tag === 'loser') {
                            color = 'volcano'
                        }
                        return (
                            <Tag
                                color={color}
                                key={tag}
                            >
                                {tag.toUpperCase()}
                            </Tag>
                        )
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ]

    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ]

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
                    Table 表格
                </Title>
                <Paragraph style={{ margin: 0 }}>
                    展示行列数据。基于 Ant Design Table 组件进行增强，添加了斑马纹和紧凑模式。
                </Paragraph>
            </div>

            <div className="p-6">
                <DemoContainer
                    title="基础用法"
                    description="简单的表格，最后一列是各种操作。"
                    code={`import React from 'react';
import { Tag, Space } from 'antd';
import { Table } from 'ant-design-plus-ui';

const BasicExample = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
      key: 'tags',
      dataIndex: 'tags',
      render: (tags: string[]) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ];

  return <Table columns={columns} dataSource={data} />;
};

export default BasicExample;`}
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                    />
                </DemoContainer>

                <DemoContainer
                    title="斑马纹表格"
                    description="通过设置 striped 属性来显示斑马纹。"
                    code={`import React from 'react';
import { Table } from 'ant-design-plus-ui';

const StripedExample = () => {
  // columns 和 data 定义同上...
  
  return <Table columns={columns} dataSource={data} striped />;
};

export default StripedExample;`}
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                        striped
                    />
                </DemoContainer>

                <DemoContainer
                    title="紧凑表格"
                    description="通过设置 compact 属性来显示紧凑表格。"
                    code={`import React from 'react';
import { Table } from 'ant-design-plus-ui';

const CompactExample = () => {
  // columns 和 data 定义同上...
  
  return <Table columns={columns} dataSource={data} compact />;
};

export default CompactExample;`}
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                        compact
                    />
                </DemoContainer>

                <DemoContainer
                    title="组合使用"
                    description="斑马纹 + 紧凑模式。"
                    code={`import React from 'react';
import { Table } from 'ant-design-plus-ui';

const CombinedExample = () => {
  // columns 和 data 定义同上...
  
  return <Table columns={columns} dataSource={data} striped compact />;
};

export default CombinedExample;`}
                >
                    <Table
                        columns={columns}
                        dataSource={data}
                        striped
                        compact
                    />
                </DemoContainer>

                <Divider />

                <Title level={2}>API</Title>
                <Paragraph>Table 的属性说明如下：</Paragraph>

                <CodeHighlighter
                    code={`interface TableProps<T> extends AntdTableProps<T> {
  striped?: boolean;     // 是否显示斑马纹，默认 false
  compact?: boolean;     // 是否紧凑模式，默认 false
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

export default TableDemo
