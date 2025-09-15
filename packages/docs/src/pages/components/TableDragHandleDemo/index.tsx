import React, { useState } from 'react'
import { Typography, Space, Divider, theme, message, Switch } from 'antd'
import { TableDragHandle } from 'ant-design-plus-ui'
import DemoContainer from '../../../components/DemoContainer'
import CodeHighlighter from '../../../components/CodeHighlighter'

const { Title, Paragraph } = Typography

interface DataItem {
    id: string
    name: string
    age: number
    address: string
    status: string
}

const TableDragHandleDemo: React.FC = () => {
    const { token } = theme.useToken()

    // 基础示例数据
    const [basicData, setBasicData] = useState<DataItem[]>([
        { id: '1', name: '张三', age: 32, address: '北京市朝阳区', status: '在职' },
        { id: '2', name: '李四', age: 28, address: '上海市浦东新区', status: '在职' },
        { id: '3', name: '王五', age: 35, address: '广州市天河区', status: '离职' },
        { id: '4', name: '赵六', age: 29, address: '深圳市南山区', status: '在职' },
    ])

    // 事件回调示例数据
    const [eventData, setEventData] = useState<DataItem[]>([
        { id: '1', name: '产品A', age: 100, address: '仓库A', status: '有库存' },
        { id: '2', name: '产品B', age: 50, address: '仓库B', status: '有库存' },
        { id: '3', name: '产品C', age: 0, address: '仓库C', status: '缺货' },
        { id: '4', name: '产品D', age: 200, address: '仓库D', status: '有库存' },
    ])

    // 禁用状态
    const [disabled, setDisabled] = useState(false)

    // 基础列配置
    const basicColumns = [
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '年龄', dataIndex: 'age', key: 'age' },
        { title: '地址', dataIndex: 'address', key: 'address' },
        { title: '状态', dataIndex: 'status', key: 'status' },
    ]

    // 事件回调列配置
    const eventColumns = [
        { title: '产品名称', dataIndex: 'name', key: 'name' },
        { title: '库存数量', dataIndex: 'age', key: 'age' },
        { title: '仓库位置', dataIndex: 'address', key: 'address' },
        { title: '库存状态', dataIndex: 'status', key: 'status' },
    ]

    // 基础拖拽处理
    const handleBasicChange = (newData: DataItem[]) => {
        setBasicData(newData)
        message.success('排序已更新')
    }

    // 事件回调拖拽处理
    const handleEventChange = (newData: DataItem[]) => {
        setEventData(newData)
        message.success('产品排序已更新')
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
                    TableDragHandle 表格拖拽排序
                </Title>
                <Paragraph
                    className="mb-0"
                    style={{ margin: 0 }}
                >
                    基于 @dnd-kit 的表格行拖拽排序组件，支持拖拽句柄、事件回调和禁用功能。
                </Paragraph>
            </div>

            <div className="pt-6">
                <DemoContainer
                    title="基础用法"
                    description="基本的表格拖拽排序功能，通过拖拽句柄可以调整行的顺序。"
                    code={`import React, { useState } from 'react';
import { TableDragHandle } from 'ant-design-plus-ui';

const BasicExample = () => {
  const [data, setData] = useState([
    { id: '1', name: '张三', age: 32, address: '北京市朝阳区', status: '在职' },
    { id: '2', name: '李四', age: 28, address: '上海市浦东新区', status: '在职' },
    { id: '3', name: '王五', age: 35, address: '广州市天河区', status: '离职' },
    { id: '4', name: '赵六', age: 29, address: '深圳市南山区', status: '在职' },
  ]);

  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' },
    { title: '状态', dataIndex: 'status', key: 'status' },
  ];

  const handleChange = (newData) => {
    setData(newData);
  };

  return (
    <TableDragHandle
      columns={columns}
      dataSource={data}
      onChange={handleChange}
      rowKey="id"
    />
  );
};

export default BasicExample;`}
                >
                    <TableDragHandle
                        columns={basicColumns}
                        dataSource={basicData}
                        onChange={handleBasicChange}
                        rowKey="id"
                    />
                </DemoContainer>

                <DemoContainer
                    title="事件回调"
                    description="支持拖拽开始、结束事件回调，可以获取详细的拖拽信息。"
                    code={`import React, { useState } from 'react';
import { message } from 'antd';
import { TableDragHandle } from 'ant-design-plus-ui';

const EventExample = () => {
  const [data, setData] = useState([
    { id: '1', name: '产品A', age: 100, address: '仓库A', status: '有库存' },
    { id: '2', name: '产品B', age: 50, address: '仓库B', status: '有库存' },
    { id: '3', name: '产品C', age: 0, address: '仓库C', status: '缺货' },
    { id: '4', name: '产品D', age: 200, address: '仓库D', status: '有库存' },
  ]);

  const columns = [
    { title: '产品名称', dataIndex: 'name', key: 'name' },
    { title: '库存数量', dataIndex: 'age', key: 'age' },
    { title: '仓库位置', dataIndex: 'address', key: 'address' },
    { title: '库存状态', dataIndex: 'status', key: 'status' },
  ];

  const handleChange = (newData, eventParams) => {
    setData(newData);
    if (eventParams) {
      message.success(
        \`已将 "\${eventParams.dragData.name}" 从位置 \${eventParams.dragIndex + 1} 移动到位置 \${eventParams.dropIndex + 1}\`
      );
    }
  };

  const handleDragStart = (data, index) => {
    message.info(\`开始拖拽: \${data.name} (位置 \${index + 1})\`);
  };

  const handleDragEnd = (event, eventParams) => {
    console.log('拖拽结束:', eventParams);
  };

  return (
    <TableDragHandle
      columns={columns}
      dataSource={data}
      onChange={handleChange}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      rowKey="id"
    />
  );
};

export default EventExample;`}
                >
                    <TableDragHandle
                        columns={eventColumns}
                        dataSource={eventData}
                        onChange={handleEventChange}
                        dragIcon={<span style={{ color: '#1890ff' }}>⋮⋮</span>}
                        rowKey="id"
                    />
                </DemoContainer>

                <DemoContainer
                    title="禁用拖拽"
                    description="通过 disabled 属性可以禁用拖拽功能。"
                    code={`import React, { useState } from 'react';
import { Switch, Space } from 'antd';
import { TableDragHandle } from 'ant-design-plus-ui';

const DisabledExample = () => {
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState([
    { id: '1', name: '张三', age: 32, address: '北京市朝阳区', status: '在职' },
    { id: '2', name: '李四', age: 28, address: '上海市浦东新区', status: '在职' },
    { id: '3', name: '王五', age: 35, address: '广州市天河区', status: '离职' },
  ]);

  const columns = [
    { title: '姓名', dataIndex: 'name', key: 'name' },
    { title: '年龄', dataIndex: 'age', key: 'age' },
    { title: '地址', dataIndex: 'address', key: 'address' },
    { title: '状态', dataIndex: 'status', key: 'status' },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <span>禁用拖拽:</span>
        <Switch checked={disabled} onChange={setDisabled} />
      </Space>
      
      <TableDragHandle
        columns={columns}
        dataSource={data}
        onChange={setData}
        disabled={disabled}
        rowKey="id"
      />
    </div>
  );
};

export default DisabledExample;`}
                >
                    <div>
                        <Space style={{ marginBottom: 16 }}>
                            <span>禁用拖拽:</span>
                            <Switch
                                checked={disabled}
                                onChange={setDisabled}
                            />
                        </Space>

                        <TableDragHandle
                            columns={basicColumns}
                            dataSource={basicData}
                            onChange={handleBasicChange}
                            disabled={disabled}
                            rowKey="id"
                        />
                    </div>
                </DemoContainer>

                <Divider />

                <Title level={2}>API</Title>
                <Paragraph>TableDragHandle 的属性说明如下：</Paragraph>

                <CodeHighlighter
                    code={`interface TableDragHandleProps<T = any> {
  columns?: TableProps<T>['columns'];       // 表格列配置
  dataSource: T[];                          // 数据源
  onChange: (dataSource: T[]) => void;      // 数据变化回调
  tableProps?: Omit<TableProps<T>, 'columns' | 'dataSource' | 'components' | 'rowKey'>; // 表格属性
  rowKey?: string;                          // 行键字段名，默认 'id'
  dragIcon?: ReactNode;                     // 拖拽句柄图标
  disabled?: boolean;                       // 是否禁用拖拽，默认 false
  style?: CSSProperties;                    // 组件样式
  className?: string;                       // 组件类名
}

// 基础使用示例
<TableDragHandle
  columns={columns}
  dataSource={data}
  onChange={handleChange}
  rowKey="id"
/>

// 自定义拖拽图标
import { DragOutlined } from '@ant-design/icons';

<TableDragHandle
  columns={columns}
  dataSource={data}
  onChange={handleChange}
  dragIcon={<DragOutlined />}
  rowKey="id"
/>

`}
                    language="typescript"
                    showCopyButton={true}
                    showThemeSelector={false}
                />
            </div>
        </div>
    )
}

export default TableDragHandleDemo
