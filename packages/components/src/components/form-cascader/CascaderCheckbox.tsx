/**
 * CascaderCheckbox - 级联选择器复选框组件
 * @author xuwei
 * @date 2025-01-17
 */

import React from 'react'
import { Checkbox, CheckboxChangeEvent, Typography } from 'antd'
import type { CascaderOption } from './types'

const { Paragraph } = Typography

/**
 * 级联选择器复选框组件
 * 带标签的复选框，支持半选状态
 */
export interface CascaderCheckboxProps {
    /** 选项数据 */
    item: CascaderOption
    /** 复选框变化事件 */
    onChange?: (e: CheckboxChangeEvent) => void
    /** 是否为半选状态 */
    indeterminate?: boolean
    /** 是否选中 */
    checked?: boolean
    /** 是否禁用 */
    disabled?: boolean
}

export const CascaderCheckbox: React.FC<CascaderCheckboxProps> = ({
    item,
    onChange,
    indeterminate,
    checked,
    disabled,
}) => (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Checkbox
            onChange={onChange}
            indeterminate={indeterminate}
            checked={checked}
            disabled={disabled}
        />
        <Paragraph
            style={{ marginBottom: 0, marginLeft: 8, userSelect: 'none' }}
            ellipsis={{
                rows: 1,
                tooltip: item.label,
            }}
        >
            {item.label}
        </Paragraph>
    </div>
)

export default CascaderCheckbox
