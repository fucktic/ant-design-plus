import { useState, useCallback, useMemo, useEffect } from 'react'
import { Modal, TableProps, Input, Checkbox, Button, Typography, theme } from 'antd'

const { Link } = Typography
import { CloseOutlined } from '@ant-design/icons'
import Scrollbar from '../Scrollbar/Scrollbar'
import { TableDragHandle } from '../TableDragHandle'
import { ColumnCustomType, ModalColumnCustomProps } from './types'
import { TEXTS, MODAL_CONFIG } from './constants'
import { StyledModalContent, DeleteIcon } from './styles'

export const ModalColumnCustom = (props: ModalColumnCustomProps) => {
    const { open, onClose, onSubmit, options, defaultSelecteds } = props
    const { token } = theme.useToken()

    // 状态管理
    const [selectedColumns, setSelectedColumns] = useState<ColumnCustomType[]>([])
    const [searchValue, setSearchValue] = useState<string>('')
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    // 根据搜索值过滤显示的选项
    const displayedOptions = useMemo(() => {
        if (!searchValue.trim()) return options
        return options.filter(
            (option) =>
                option.label.toLowerCase().includes(searchValue.toLowerCase()) ||
                option.value.toLowerCase().includes(searchValue.toLowerCase())
        )
    }, [options, searchValue])

    // 初始化选中列
    useEffect(() => {
        if (open && defaultSelecteds.length > 0) {
            const defaultColumns = options.filter((item) => defaultSelecteds.includes(item.value))
            setSelectedColumns(defaultColumns)
        }
    }, [open, options, defaultSelecteds])

    // 更新搜索显示的选项
    const updateDisplayedOptions = useCallback((value: string) => {
        setSearchValue(value)
    }, [])

    // 重置已选列为默认选中状态
    const resetToDefaultSelections = useCallback(() => {
        setSelectedColumns(options.filter((item) => defaultSelecteds.includes(item.value)))
    }, [options, defaultSelecteds])

    // 清空所有选择（保留默认选中的列）
    const clearAllSelections = useCallback(() => {
        const defaultColumns = options.filter((item) => defaultSelecteds.includes(item.value))
        setSelectedColumns(defaultColumns)
    }, [options, defaultSelecteds])

    // 处理单个列的删除操作
    const handleRemoveColumn = useCallback(
        (columnValue: string) => {
            // 如果是默认选中的列，不允许删除
            if (defaultSelecteds.includes(columnValue)) {
                return
            }
            setSelectedColumns((prev) => prev.filter((item) => item.value !== columnValue))
        },
        [defaultSelecteds]
    )

    // 处理单个列选中状态切换
    const handleColumnToggle = useCallback(
        (columnOption: ColumnCustomType, checked: boolean) => {
            if (checked) {
                setSelectedColumns((prev) => [...prev, columnOption])
            } else {
                // 如果是默认选中的列，不允许取消选择
                if (defaultSelecteds.includes(columnOption.value)) {
                    return
                }
                setSelectedColumns((prev) =>
                    prev.filter((item) => item.value !== columnOption.value)
                )
            }
        },
        [defaultSelecteds]
    )

    // 处理表单提交
    const handleSubmit = useCallback(async () => {
        if (!selectedColumns.length) return

        setIsSubmitting(true)
        try {
            const selectedValues = selectedColumns.map((column) => column.value)
            await onSubmit(selectedValues)
        } finally {
            setIsSubmitting(false)
        }
    }, [selectedColumns, onSubmit])

    // 已选列表格的列配置
    const selectedColumnsTableConfig: TableProps<ColumnCustomType>['columns'] = useMemo(() => {
        return [
            {
                title: TEXTS.COLUMN_TITLE,
                dataIndex: 'label',
                key: 'label',
            },
            {
                title: TEXTS.OPERATION_TITLE,
                dataIndex: 'operation',
                key: 'operation',
                width: 40,
                render: (_, columnRecord) => {
                    // 默认选中的列和禁用的列不显示删除按钮
                    const isDefaultSelected = defaultSelecteds.includes(columnRecord.value)
                    return (
                        !columnRecord.disabled &&
                        !isDefaultSelected && (
                            <DeleteIcon onClick={() => handleRemoveColumn(columnRecord.value)}>
                                <CloseOutlined />
                            </DeleteIcon>
                        )
                    )
                },
            },
        ]
    }, [handleRemoveColumn, defaultSelecteds])

    // 清理状态
    useEffect(() => {
        if (!open) {
            setSearchValue('')
        }

        return () => {
            resetToDefaultSelections()
        }
    }, [open, resetToDefaultSelections])

    return (
        <Modal
            title={TEXTS.MODAL_TITLE}
            open={open}
            onCancel={onClose}
            width={MODAL_CONFIG.MODAL_WIDTH}
            footer={null}
            destroyOnHidden
        >
            <StyledModalContent
                $colorBorder={token.colorBorder}
                $colorBgLayout={token.colorFillAlter}
            >
                {/* 搜索输入框 */}
                <Input
                    className="adp-search-input"
                    placeholder={TEXTS.SEARCH_PLACEHOLDER}
                    allowClear
                    onChange={(e) => updateDisplayedOptions(e.target.value)}
                />

                {/* 主要内容区域 */}
                <div className="adp-main-content">
                    {/* 头部区域 */}
                    <div className="adp-header-row">
                        <div className="adp-available-columns-header">
                            <div className="adp-header-title">
                                可选（{displayedOptions.length}）
                            </div>
                        </div>
                        <div className="adp-selected-columns-header">
                            <div className="adp-header-title">已选（{selectedColumns.length}）</div>
                            <Link
                                className="adp-clear-link"
                                onClick={clearAllSelections}
                            >
                                {TEXTS.CLEAR}
                            </Link>
                        </div>
                    </div>
                    {/* 内容主体区域 */}
                    <div className="adp-content-body">
                        {/* 左侧：可选列列表 */}
                        <Scrollbar
                            showVertical={false}
                            showHorizontal={true}
                            style={{ height: MODAL_CONFIG.LIST_HEIGHT }}
                        >
                            <div
                                className="adp-available-columns-list"
                                style={{
                                    height: MODAL_CONFIG.LIST_HEIGHT,
                                }}
                            >
                                {(displayedOptions || options).map((columnOption) => {
                                    const isSelected = selectedColumns.some(
                                        (item) => item.value === columnOption.value
                                    )
                                    const isDefaultSelected = defaultSelecteds.includes(
                                        columnOption.value
                                    )

                                    return (
                                        <li
                                            className="adp-column-item"
                                            key={columnOption.value}
                                        >
                                            <Checkbox
                                                disabled={
                                                    columnOption.disabled || isDefaultSelected
                                                }
                                                checked={isSelected}
                                                onChange={(e) =>
                                                    handleColumnToggle(
                                                        columnOption,
                                                        e.target.checked
                                                    )
                                                }
                                            >
                                                {columnOption.label}
                                            </Checkbox>
                                        </li>
                                    )
                                })}
                            </div>
                        </Scrollbar>

                        {/* 右侧：已选列表格 */}
                        <div className="adp-selected-columns-table">
                            <TableDragHandle<ColumnCustomType>
                                dataSource={selectedColumns}
                                columns={selectedColumnsTableConfig}
                                rowKey="value"
                                tableProps={{
                                    pagination: false,
                                    showHeader: false,
                                    scroll: {
                                        y: MODAL_CONFIG.LIST_HEIGHT,
                                    },
                                }}
                                onChange={(newDataSource: ColumnCustomType[]) =>
                                    setSelectedColumns(newDataSource)
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* 底部按钮 */}
                <div className="adp-footer-buttons">
                    <Button
                        onClick={onClose}
                        style={{ marginRight: 8 }}
                    >
                        {TEXTS.CANCEL}
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        loading={isSubmitting}
                    >
                        {TEXTS.CONFIRM}
                    </Button>
                </div>
            </StyledModalContent>
        </Modal>
    )
}
