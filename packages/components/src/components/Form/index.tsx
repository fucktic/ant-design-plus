import React from 'react'
import { Form as AntdForm, FormProps as AntdFormProps } from 'antd'
import classNames from 'classnames'
import { StyledForm } from './styles'

export interface FormProps extends AntdFormProps {
    /**
     * 是否紧凑模式
     */
    compact?: boolean
    /**
     * 边框圆角
     */
    borderRadius?: number
    /**
     * 是否显示边框
     */
    showBorder?: boolean
    /**
     * 组件类名前缀
     */
    prefixCls?: string
    /**
     * 额外的CSS类名
     */
    className?: string
}

const Form: React.FC<FormProps> = ({
    compact = false,
    borderRadius = 6,
    showBorder = false,
    prefixCls = 'adp-form',
    className,
    layout = 'vertical',
    children,
    ...props
}) => {
    // 简化处理，直接使用默认前缀
    const basePrefixCls = 'ant'

    const formClass = classNames(
        prefixCls,
        {
            [`${prefixCls}-compact`]: compact,
            [`${prefixCls}-bordered`]: showBorder,
        },
        className
    )

    return (
        <StyledForm
            className={formClass}
            layout={layout}
            $layout={layout}
            $compact={compact}
            $borderRadius={borderRadius}
            $showBorder={showBorder}
            $prefixCls={basePrefixCls}
            {...props}
        >
            {children}
        </StyledForm>
    )
}

// 创建带有静态方法的 Form 组件
const FormWithStatics = Form as typeof Form & {
    Item: typeof AntdForm.Item
    List: typeof AntdForm.List
    ErrorList: typeof AntdForm.ErrorList
    Provider: typeof AntdForm.Provider
    useForm: typeof AntdForm.useForm
    useFormInstance: typeof AntdForm.useFormInstance
    useWatch: typeof AntdForm.useWatch
}

// 添加静态方法
FormWithStatics.Item = AntdForm.Item
FormWithStatics.List = AntdForm.List
FormWithStatics.ErrorList = AntdForm.ErrorList
FormWithStatics.Provider = AntdForm.Provider
FormWithStatics.useForm = AntdForm.useForm
FormWithStatics.useFormInstance = AntdForm.useFormInstance
FormWithStatics.useWatch = AntdForm.useWatch

export default FormWithStatics

// 导出相关类型
export type { FormInstance } from 'antd'
