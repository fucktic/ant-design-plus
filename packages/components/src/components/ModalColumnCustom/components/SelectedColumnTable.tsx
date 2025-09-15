import React, { useMemo } from 'react'
import { TableProps } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import { TableDragHandle } from '../../TableDragHandle'
import { ColumnCustomType } from '../types'
import { TEXTS, STYLES } from '../constants'

interface SelectedColumnTableProps {
    /** 已选中的列 */
    selectedColumns: ColumnCustomType[]
    /** 列删除处理 */
    onRemoveColumn: (columnValue: string) => void
    /** 列重新排序处理 */
    onReorderColumns: (reorderedColumns: ColumnCustomType[]) => void
    /** 表格高度 */
    height: number
}

/**
 * 已选列表格组件
 */
export const SelectedColumnTable: React.FC<SelectedColumnTableProps> = ({
    selectedColumns,
    onRemoveColumn,
    onReorderColumns,
    height,
}) => {
    // 已选列表格的列配置
    const tableColumns: TableProps<ColumnCustomType>['columns'] = useMemo(() => {
        return [{
            title: TEXTS.COLUMN_TITLE,
            dataIndex: 'label',
            key: 'label',
        }, {
            title: TEXTS.OPERATION_TITLE,
            dataIndex: 'operation',
            key: 'operation',
            width: 40,
            render: (_, columnRecord) => {
                // 只有非禁用的列才显示删除按钮
                return !columnRecord.disabled && (
                    <i 
                        onClick={() => onRemoveColumn(columnRecord.value)}
                        className={STYLES.DELETE_ICON}
                    >
                        <CloseOutlined />
                    </i>
                )
            }
        }]
    }, [onRemoveColumn])

    if (selectedColumns.length === 0) {
        return <div />
    }

    return (
        <TableDragHandle<ColumnCustomType>
            columns={tableColumns}
            dataSource={selectedColumns}
            rowKey="value"
            onChange={(reorderedData: ColumnCustomType[]) => {
                onReorderColumns(reorderedData)
            }}
            tableProps={{
                showHeader: false,
                pagination: false,
                size: 'small',
                scroll: {
                    y: height
                },
                locale: {
                    emptyText: ''
                }
            }}
        />
    )
}