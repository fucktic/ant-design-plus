import { useRef, useState } from 'react'
import { Typography, Space, Button, Divider, theme, message } from 'antd'
import { TwoTierCascader } from 'ant-design-plus-ui'
import type { CascaderOption, TwoTierCascaderRef } from 'ant-design-plus-ui'
import DemoContainer from '../../../components/DemoContainer'
import CodeHighlighter from '../../../components/CodeHighlighter'

const { Title, Paragraph } = Typography

// 模拟接口：一级数据（授权账户）
function mockLevel1(): Promise<{ data: CascaderOption[] }> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: Array.from({ length: 8 }).map((_, i) => ({
                    label: `授权账户${i + 1}`,
                    value: i + 1,
                    total: 50,
                    children:
                        i === 0
                            ? Array.from({ length: 10 }).map((_, j) => ({
                                  label: `推广账户1-1-${j + 1}`,
                                  value: `1-1-${j + 1}`,
                              }))
                            : undefined,
                })),
            })
        }, 300)
    })
}

// 模拟接口：二级数据（推广账户）
function mockLevel2(
    parent: string | number,
    page: number,
    pageSize: number
): Promise<{ data: CascaderOption[]; total: number }> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const base = (page - 1) * pageSize
            resolve({
                total: 50,
                data: Array.from({ length: pageSize }).map((_, i) => ({
                    label: `推广账户${parent}-1-${base + i + 1}`,
                    value: `${parent}-1-${base + i + 1}`,
                })),
            })
        }, 300)
    })
}

const BasicCode = `import React, { useRef, useState } from 'react';
import { TwoTierCascader } from 'ant-design-plus-ui';

function mockLevel1() { /* 加载授权账户数据 */ }
function mockLevel2(parent, page, pageSize) { /* 加载推广账户数据 */ }

export default () => {
  const ref = useRef(null);
  const [value, setValue] = useState([]);

  return (
    <TwoTierCascader
      ref={ref}
      onChange={setValue}
      onLoadLevel1Data={mockLevel1}
      onLoadLevel2Data={mockLevel2}
      maxSelectNum={500}
      level2PageSize={20}
      headerLabels={{
        level1: '授权账户',
        level2: '推广账户', 
        selected: '已选'
      }}
    />
  );
};`

export default function FormCascaderDemo() {
    const { token } = theme.useToken()
    const ref = useRef<TwoTierCascaderRef>(null)
    const [value, setValue] = useState<CascaderOption[]>([])

    return (
        <div className="relative">
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
                    TwoTierCascader 二层级联选择器
                </Title>
                <Paragraph
                    className="mb-0"
                    style={{ margin: 0 }}
                >
                    二层级联选择器：左侧授权账户，中间推广账户，右侧已选项。支持最大选择数、分页加载与编程式操作。
                </Paragraph>
            </div>

            <div className="pt-6">
                <DemoContainer
                    title="基础用法"
                    description="加载授权账户后，点击左侧账户按需加载推广账户。支持最大选择数量与加载更多。"
                    code={BasicCode}
                >
                    <Space style={{ marginBottom: 12 }}>
                        <Button
                            onClick={() =>
                                ref.current?.addSelecteds([{ label: '外部添加', value: 'ext-1' }])
                            }
                        >
                            外部添加一项
                        </Button>
                        <Button onClick={() => setValue([])}>清空外部值</Button>
                        <Button onClick={() => message.info(`已选 ${value.length} 项`)}>
                            查看选中
                        </Button>
                    </Space>

                    <div style={{ height: 400 }}>
                        <TwoTierCascader
                            ref={ref}
                            onChange={setValue}
                            onLoadLevel1Data={mockLevel1}
                            onLoadLevel2Data={mockLevel2}
                            maxSelectNum={500}
                            level2PageSize={20}
                            headerLabels={{
                                level1: '授权账户',
                                level2: '推广账户',
                                selected: '已选',
                            }}
                        />
                    </div>
                </DemoContainer>

                <Divider />

                <Title level={2}>API</Title>
                <Paragraph>核心属性说明：</Paragraph>
                <CodeHighlighter
                    code={`interface TwoTierCascaderProps {
  onLoadLevel1Data: () => Promise<{ data: CascaderOption[] }>;
  onLoadLevel2Data: (parent: string | number, page: number, pageSize: number) => Promise<{ data: CascaderOption[]; total: number }>;
  onChange?: (selected: CascaderOption[]) => void;
  maxSelectNum?: number;          // 最大可选数量，默认 50
  level2PageSize?: number;        // 二级分页大小，默认 20
  headerLabels?: {                // 各栏标题
    level1: string;
    level2: string;
    selected: string;
  };
  height?: number;                // 列表高度
}

interface TwoTierCascaderRef {
  addSelecteds: (items: CascaderOption[]) => void;
}

type CascaderOption = {
  label: string;
  value: string | number;
  children?: CascaderOption[];
  total?: number;                 // 二级总数（用于分页）
}`}
                    language="typescript"
                    showCopyButton={true}
                    showThemeSelector={false}
                />
            </div>
        </div>
    )
}
