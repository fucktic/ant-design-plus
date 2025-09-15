import React, { useState } from 'react'
import { Typography, Space, Button, Divider, theme, message, Tag } from 'antd'
import { ModalColumnCustom, ColumnCustomType } from 'ant-design-plus-ui'
import DemoContainer from '../../../components/DemoContainer'
import CodeHighlighter from '../../../components/CodeHighlighter'

const { Title, Paragraph } = Typography

const ModalColumnCustomDemo: React.FC = () => {
    const { token } = theme.useToken()

    // 基础示例状态
    const [basicOpen, setBasicOpen] = useState(false)
    const [basicSelectedColumns, setBasicSelectedColumns] = useState<string[]>(['name', 'age'])

    // 高级示例状态
    const [advancedOpen, setAdvancedOpen] = useState(false)
    const [advancedSelectedColumns, setAdvancedSelectedColumns] = useState<string[]>(['productName', 'price', 'category'])

    // 事件回调示例状态
    const [eventOpen, setEventOpen] = useState(false)
    const [eventSelectedColumns, setEventSelectedColumns] = useState<string[]>(['title', 'author'])

    // 基础选项配置
    const basicOptions: ColumnCustomType[] = [
        { label: '姓名', value: 'name' },
        { label: '年龄', value: 'age' },
        { label: '性别', value: 'gender' },
        { label: '邮箱', value: 'email' },
        { label: '电话', value: 'phone' },
        { label: '地址', value: 'address' },
        { label: '部门', value: 'department' },
        { label: '职位', value: 'position' },
        { label: '入职日期', value: 'joinDate' },
        { label: '薪资', value: 'salary', disabled: true }, // 禁用项
    ]

    // 高级选项配置
    const advancedOptions: ColumnCustomType[] = [
        { label: '产品名称', value: 'productName' },
        { label: '产品编码', value: 'productCode' },
        { label: '价格', value: 'price' },
        { label: '库存', value: 'stock' },
        { label: '分类', value: 'category' },
        { label: '品牌', value: 'brand' },
        { label: '供应商', value: 'supplier' },
        { label: '创建时间', value: 'createTime' },
        { label: '更新时间', value: 'updateTime' },
        { label: '状态', value: 'status' },
        { label: '描述', value: 'description' },
        { label: '标签', value: 'tags' },
        { label: '评分', value: 'rating' },
        { label: '销量', value: 'sales' },
        { label: '重量', value: 'weight' },
        { label: '产品名称', value: '1' },
        { label: '产品编码', value: '2' },
        { label: '价格', value: '3' },
        { label: '库存', value: '4' },
        { label: '分类', value: '5' },
        { label: '品牌', value: '6' },
        { label: '供应商', value: '7' },
        { label: '创建时间', value: '8' },
        { label: '更新时间', value: '9' },
        { label: '状态', value: '10' },
        { label: '描述', value: '11' },
        { label: '标签', value: '12' },
        { label: '评分', value: '13' },
        { label: '销量', value: '13' },
        { label: '重量', value: '15' },
    ]

    // 事件回调选项配置
    const eventOptions: ColumnCustomType[] = [
        { label: '标题', value: 'title' },
        { label: '作者', value: 'author' },
        { label: '发布时间', value: 'publishTime' },
        { label: '阅读量', value: 'readCount' },
        { label: '点赞数', value: 'likeCount' },
        { label: '评论数', value: 'commentCount' },
        { label: '分类', value: 'category' },
        { label: '标签', value: 'tags' },
        { label: '状态', value: 'status' },
    ]

    // 基础提交处理
    const handleBasicSubmit = async (selectedValues: string[]) => {
        console.log('基础示例选中的列:', selectedValues)
        setBasicSelectedColumns(selectedValues)
        setBasicOpen(false)
        message.success(`已选择 ${selectedValues.length} 列`)
        return true
    }

    // 高级提交处理
    const handleAdvancedSubmit = async (selectedValues: string[]) => {
        console.log('高级示例选中的列:', selectedValues)
        setAdvancedSelectedColumns(selectedValues)
        setAdvancedOpen(false)
        message.success(`产品列表已更新，显示 ${selectedValues.length} 列`)
        return true
    }

    // 事件回调提交处理
    const handleEventSubmit = async (selectedValues: string[]) => {
        console.log('事件回调示例选中的列:', selectedValues)
        
        // 模拟异步操作
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        setEventSelectedColumns(selectedValues)
        setEventOpen(false)
        message.success(`文章列表配置已保存，共 ${selectedValues.length} 列`)
        return true
    }

    // 获取选中列的显示标签
    const getSelectedLabels = (selectedValues: string[], options: ColumnCustomType[]) => {
        return selectedValues.map(value => {
            const option = options.find(opt => opt.value === value)
            return option?.label || value
        })
    }

    // 重置为默认选择
    const handleReset = () => {
        setEventSelectedColumns(['title', 'author'])
        message.info('已重置为默认选择')
    }

    // 获取当前选中的列
    const handleGetSelected = () => {
        message.info(`当前选中 ${eventSelectedColumns.length} 列`)
        console.log('当前选中的列:', eventSelectedColumns)
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
                    ModalColumnCustom 自定义列
                </Title>
                <Paragraph
                    className="mb-0"
                    style={{ margin: 0 }}
                >
                    功能完整的表格列自定义组件，支持列的选择、排序、搜索过滤和拖拽排序功能。
                </Paragraph>
            </div>

            <div className="pt-6">
                <DemoContainer
                    title="基础用法"
                    description="基本的列自定义功能，支持选择和取消选择列，以及拖拽排序。"
                    code={`import React, { useState } from 'react';
import { Button, Space, Tag } from 'antd';
import { ModalColumnCustom, ColumnCustomType } from 'ant-design-plus-ui';

const BasicExample = () => {
  const [open, setOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(['name', 'age']);

  const options: ColumnCustomType[] = [
    { label: '姓名', value: 'name' },
    { label: '年龄', value: 'age' },
    { label: '性别', value: 'gender' },
    { label: '邮箱', value: 'email' },
    { label: '电话', value: 'phone' },
    { label: '地址', value: 'address' },
    { label: '部门', value: 'department' },
    { label: '职位', value: 'position' },
    { label: '入职日期', value: 'joinDate' },
    { label: '薪资', value: 'salary', disabled: true }, // 禁用项
  ];

  const handleSubmit = async (selectedValues: string[]) => {
    console.log('选中的列:', selectedValues);
    setSelectedColumns(selectedValues);
    setOpen(false);
    return true;
  };

  const getSelectedLabels = (selectedValues: string[]) => {
    return selectedValues.map(value => {
      const option = options.find(opt => opt.value === value);
      return option?.label || value;
    });
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setOpen(true)}>
          自定义列
        </Button>
        <span>当前显示列:</span>
      </Space>
      
      <div style={{ marginBottom: 16 }}>
        {getSelectedLabels(selectedColumns).map((label, index) => (
          <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
            {label}
          </Tag>
        ))}
      </div>

      <ModalColumnCustom
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        options={options}
        defaultSelecteds={selectedColumns}
      />
    </div>
  );
};

export default BasicExample;`}
                >
                    <div>
                        <Space style={{ marginBottom: 16 }}>
                            <Button type="primary" onClick={() => setBasicOpen(true)}>
                                自定义列
                            </Button>
                            <span>当前显示列:</span>
                        </Space>
                        
                        <div style={{ marginBottom: 16 }}>
                            {getSelectedLabels(basicSelectedColumns, basicOptions).map((label, index) => (
                                <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
                                    {label}
                                </Tag>
                            ))}
                        </div>

                        <ModalColumnCustom
                            open={basicOpen}
                            onClose={() => setBasicOpen(false)}
                            onSubmit={handleBasicSubmit}
                            options={basicOptions}
                            defaultSelecteds={basicSelectedColumns}
                        />
                    </div>
                </DemoContainer>

                <DemoContainer
                    title="大量选项"
                    description="当有大量列选项时，支持搜索过滤和批量操作功能。"
                    code={`import React, { useState } from 'react';
import { Button, Space, Tag } from 'antd';
import { ModalColumnCustom, ColumnCustomType } from 'ant-design-plus-ui';

const AdvancedExample = () => {
  const [open, setOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(['productName', 'price', 'category']);

  const options: ColumnCustomType[] = [
    { label: '产品名称', value: 'productName' },
    { label: '产品编码', value: 'productCode' },
    { label: '价格', value: 'price' },
    { label: '库存', value: 'stock' },
    { label: '分类', value: 'category' },
    { label: '品牌', value: 'brand' },
    { label: '供应商', value: 'supplier' },
    { label: '创建时间', value: 'createTime' },
    { label: '更新时间', value: 'updateTime' },
    { label: '状态', value: 'status' },
    { label: '描述', value: 'description' },
    { label: '标签', value: 'tags' },
    { label: '评分', value: 'rating' },
    { label: '销量', value: 'sales' },
    { label: '重量', value: 'weight' },
  ];

  const handleSubmit = async (selectedValues: string[]) => {
    console.log('选中的列:', selectedValues);
    setSelectedColumns(selectedValues);
    setOpen(false);
    return true;
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setOpen(true)}>
          配置产品列表
        </Button>
        <span>已选择 {selectedColumns.length} 列</span>
      </Space>

      <ModalColumnCustom
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        options={options}
        defaultSelecteds={selectedColumns}
      />
    </div>
  );
};

export default AdvancedExample;`}
                >
                    <div>
                        <Space style={{ marginBottom: 16 }}>
                            <Button type="primary" onClick={() => setAdvancedOpen(true)}>
                                配置产品列表
                            </Button>
                            <span>已选择 {advancedSelectedColumns.length} 列</span>
                        </Space>

                        <div style={{ marginBottom: 16 }}>
                            {getSelectedLabels(advancedSelectedColumns, advancedOptions).slice(0, 8).map((label, index) => (
                                <Tag key={index} color="green" style={{ marginBottom: 4 }}>
                                    {label}
                                </Tag>
                            ))}
                            {advancedSelectedColumns.length > 8 && (
                                <Tag color="default">+{advancedSelectedColumns.length - 8} 更多</Tag>
                            )}
                        </div>

                        <ModalColumnCustom
                            open={advancedOpen}
                            onClose={() => setAdvancedOpen(false)}
                            onSubmit={handleAdvancedSubmit}
                            options={advancedOptions}
                            defaultSelecteds={advancedSelectedColumns}
                        />
                    </div>
                </DemoContainer>

                <DemoContainer
                    title="异步提交和事件回调"
                    description="演示异步提交处理和使用 ref 调用组件方法。"
                    code={`import React, { useState } from 'react';
import { Button, Space, Tag, message } from 'antd';
import { ModalColumnCustom, ColumnCustomType } from 'ant-design-plus-ui';

const EventExample = () => {
  const [open, setOpen] = useState(false);
  const [selectedColumns, setSelectedColumns] = useState(['title', 'author']);

  const options: ColumnCustomType[] = [
    { label: '标题', value: 'title' },
    { label: '作者', value: 'author' },
    { label: '发布时间', value: 'publishTime' },
    { label: '阅读量', value: 'readCount' },
    { label: '点赞数', value: 'likeCount' },
    { label: '评论数', value: 'commentCount' },
    { label: '分类', value: 'category' },
    { label: '标签', value: 'tags' },
    { label: '状态', value: 'status' },
  ];

  const handleSubmit = async (selectedValues: string[]) => {
    console.log('选中的列:', selectedValues);
    
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSelectedColumns(selectedValues);
    setOpen(false);
    message.success(\`文章列表配置已保存，共 \${selectedValues.length} 列\`);
    return true;
  };

  const handleReset = () => {
    setSelectedColumns(['title', 'author']);
    message.info('已重置为默认选择');
  };

  const handleGetSelected = () => {
    message.info(\`当前选中 \${selectedColumns.length} 列\`);
    console.log('当前选中的列:', selectedColumns);
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => setOpen(true)}>
          配置文章列表
        </Button>
        <Button onClick={handleReset}>重置选择</Button>
        <Button onClick={handleGetSelected}>获取选中列</Button>
      </Space>

      <ModalColumnCustom
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        options={options}
        defaultSelecteds={selectedColumns}
      />
    </div>
  );
};

export default EventExample;`}
                >
                    <div>
                        <Space style={{ marginBottom: 16 }}>
                            <Button type="primary" onClick={() => setEventOpen(true)}>
                                配置文章列表
                            </Button>
                            <Button onClick={handleReset}>重置选择</Button>
                            <Button onClick={handleGetSelected}>获取选中列</Button>
                        </Space>

                        <div style={{ marginBottom: 16 }}>
                            {getSelectedLabels(eventSelectedColumns, eventOptions).map((label, index) => (
                                <Tag key={index} color="orange" style={{ marginBottom: 4 }}>
                                    {label}
                                </Tag>
                            ))}
                        </div>

                        <ModalColumnCustom
                            open={eventOpen}
                            onClose={() => setEventOpen(false)}
                            onSubmit={handleEventSubmit}
                            options={eventOptions}
                            defaultSelecteds={eventSelectedColumns}
                        />
                    </div>
                </DemoContainer>

                <Divider />

                <Title level={2}>API</Title>
                <Paragraph>ModalColumnCustom 的属性说明如下：</Paragraph>

                <CodeHighlighter
                    code={`interface ModalColumnCustomProps {
  open: boolean;                                    // 模态框显示状态
  onClose: () => void;                             // 关闭回调函数
  onSubmit: (selectedValues: string[]) => Promise<boolean>; // 提交选中列回调
  options: ColumnCustomType[];                     // 可选择的列配置列表
  defaultSelecteds: string[];                      // 默认选中的列值
}

interface ColumnCustomType {
  label: string;                                   // 列显示名称
  value: string;                                   // 列唯一标识值
  disabled?: boolean;                              // 是否禁用选择，默认 false
}

// 基础使用示例
<ModalColumnCustom
  open={open}
  onClose={() => setOpen(false)}
  onSubmit={handleSubmit}
  options={options}
  defaultSelecteds={['name', 'age']}
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

export default ModalColumnCustomDemo