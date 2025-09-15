import React from 'react'
import { Checkbox } from 'antd'
import { ColumnCustomType } from '../types'

interface ColumnListProps {
    /** 显示的列选项 */
    options: ColumnCustomType[]
    /** 已选中的列 */
    selectedColumns: ColumnCustomType[]
    /** 列选择切换处理 */
    onColumnToggle: (columnOption: ColumnCustomType, checked: boolean) => void
    /** 列表高度 */
    height: number
}

/**
 * 可选列列表组件
 */
export const ColumnList: React.FC<ColumnListProps> = ({
    options,
    selectedColumns,
    onColumnToggle,
    height,
}) => {
    return (
        <ul className="available-columns-list" style={{ height }}>
            {options.map((columnOption) => {
                const isSelected = selectedColumns.some((item) => item.value === columnOption.value)

                return (
                    <li className="column-item" key={columnOption.value}>
                        <Checkbox
                            disabled={columnOption.disabled}
                            checked={isSelected}
                            onChange={(e) => onColumnToggle(columnOption, e.target.checked)}
                        >
                            {columnOption.label}
                        </Checkbox>
                    </li>
                )
            })}
        </ul>
    )
}