import React from 'react'
import { Typography, Input, Button, Select, DatePicker, Divider, message, theme } from 'antd'
import { Form } from 'ant-design-plus-ui'
import DemoContainer from '../../../components/DemoContainer'
import CodeHighlighter from '../../../components/CodeHighlighter'

const { Title, Paragraph } = Typography
const { Option } = Select

const FormDemo: React.FC = () => {
    const [form] = Form.useForm()

    const onFinish = (values: any) => {
        console.log('Success:', values)
        message.success('提交成功！')
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo)
        message.error('提交失败，请检查表单！')
    }

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
                    Form 表单
                </Title>
                <Paragraph style={{ margin: 0 }}>
                    高性能订阅式表单，让信息录入更流畅。基于 Ant Design Form 组件进行增强。
                </Paragraph>
            </div>

            <div className="p-6">
                <DemoContainer
                    title="基础用法"
                    description="基本的表单数据域控制展示，包含布局、初始化、验证、提交。"
                    code={`import React from 'react';
import { Input, Button, Select, DatePicker, message } from 'antd';
import { Form } from 'ant-design-plus-ui';

const { Option } = Select;

const BasicExample = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
    message.success('提交成功！');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('提交失败，请检查表单！');
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="用户名"
        name="username"
        rules={[{ required: true, message: '请输入用户名!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: '请输入密码!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="邮箱"
        name="email"
        rules={[
          { required: true, message: '请输入邮箱!' },
          { type: 'email', message: '请输入有效的邮箱地址!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="性别"
        name="gender"
        rules={[{ required: true, message: '请选择性别!' }]}
      >
        <Select placeholder="请选择性别">
          <Option value="male">男</Option>
          <Option value="female">女</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="生日"
        name="birthday"
        rules={[{ required: true, message: '请选择生日!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button htmlType="button" onClick={() => form.resetFields()} style={{ marginLeft: 8 }}>
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BasicExample;`}
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[{ required: true, message: '请输入用户名!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[{ required: true, message: '请输入密码!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="邮箱"
                            name="email"
                            rules={[
                                { required: true, message: '请输入邮箱!' },
                                { type: 'email', message: '请输入有效的邮箱地址!' },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="性别"
                            name="gender"
                            rules={[{ required: true, message: '请选择性别!' }]}
                        >
                            <Select placeholder="请选择性别">
                                <Option value="male">男</Option>
                                <Option value="female">女</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label="生日"
                            name="birthday"
                            rules={[{ required: true, message: '请选择生日!' }]}
                        >
                            <DatePicker style={{ width: '100%' }} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                提交
                            </Button>
                            <Button
                                htmlType="button"
                                onClick={() => form.resetFields()}
                                style={{ marginLeft: 8 }}
                            >
                                重置
                            </Button>
                        </Form.Item>
                    </Form>
                </DemoContainer>

                <DemoContainer
                    title="紧凑表单"
                    description="通过设置 compact 属性来显示紧凑表单。"
                    code={`import React from 'react';
import { Input, Button } from 'antd';
import { Form } from 'ant-design-plus-ui';

const CompactExample = () => {
  return (
    <Form
      name="compact"
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      style={{ maxWidth: 600 }}
      compact
    >
      <Form.Item label="姓名" name="name">
        <Input />
      </Form.Item>
      <Form.Item label="年龄" name="age">
        <Input />
      </Form.Item>
      <Form.Item label="地址" name="address">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
        <Button type="primary">提交</Button>
      </Form.Item>
    </Form>
  );
};

export default CompactExample;`}
                >
                    <Form
                        name="compact"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 18 }}
                        style={{ maxWidth: 600 }}
                        compact
                    >
                        <Form.Item
                            label="姓名"
                            name="name"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="年龄"
                            name="age"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="地址"
                            name="address"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
                            <Button type="primary">提交</Button>
                        </Form.Item>
                    </Form>
                </DemoContainer>

                <Divider />

                <Title level={2}>API</Title>
                <Paragraph>Form 的属性说明如下：</Paragraph>

                <CodeHighlighter
                    code={`interface FormProps extends AntdFormProps {
  showRequiredMark?: boolean;  // 是否显示必填标记，默认 true
  compact?: boolean;           // 是否紧凑布局，默认 false
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

export default FormDemo
