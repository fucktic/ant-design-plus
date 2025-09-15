import { Modal, TableProps, Typography, Space, Checkbox, Button, Input, theme } from "antd"
import { useMemo, useCallback, useState, useEffect } from "react"
import { TableDragHandle } from "../TableDragHandle"
import Scrollbar from "../Scrollbar/Scrollbar"
import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'
const { Link } = Typography


// 列配置选项类型
export type ColumnCustomType = {
    label: string    // 列显示名称
    value: string    // 列唯一标识值
    disabled?: boolean  // 是否禁用选择
}

// 模态框组件属性类型
type ModalColumnCustomProps = {
    open: boolean  // 模态框显示状态
    onClose: () => void  // 关闭回调函数
    onSubmit: (selectedValues: string[]) => Promise<boolean>  // 提交选中列回调
    options: ColumnCustomType[]  // 可选择的列配置列表
    defaultSelecteds: string[]  // 默认选中的列值
}

// 组件常量配置
const MODAL_CONFIG = {
    WIDTH: 800,
    LIST_HEIGHT: 474,
    SEARCH_INPUT_WIDTH: '320px',
} as const

// Styled Components
const StyledModalContent = styled.div<{ $colorBorder: string; $colorBgLayout: string }>`
  .search-input {
    width: ${MODAL_CONFIG.SEARCH_INPUT_WIDTH};
  }

  .main-content {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    border: 1px solid ${props => props.$colorBorder};
    border-radius: 6px;
  }

  .header-row {
    display: grid;
    grid-template-columns: 2fr 1fr;
    background-color: ${props => props.$colorBgLayout};
    border-bottom: 1px solid ${props => props.$colorBorder};
  }

  .available-columns-header {
    line-height: 40px;
    padding: 0 16px;
    display: flex;
    align-items: center;
  

    .header-title {
      flex: 1;
    }
  }

  .selected-columns-header {
    line-height: 40px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    border-left: 1px solid ${props => props.$colorBorder};
    .header-title {
      flex: 1;
    }

    .clear-link {
      font-weight: normal;
      user-select: none;
    }
  }

  .content-body {
    display: grid;
    grid-template-columns: 2fr 1fr;
    height: ${MODAL_CONFIG.LIST_HEIGHT}px;
  }

  .available-columns-list {   
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 16px 0;
    padding: 16px 0;
    min-height: ${MODAL_CONFIG.LIST_HEIGHT}px;
    white-space: nowrap;

    .column-item {
      padding: 0 16px;
      width: 50%;
      list-style: none;
    }
  }

  .selected-columns-table {
    /* 表格容器样式 */
    
    border-left: 1px solid ${props => props.$colorBorder};
  }

  .footer-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`

const DeleteIcon = styled.i`
  height: 12px;
  width: 12px;
  color: #6b7280;
  cursor: pointer;
  border-radius: 2px;

  &:hover {
    color: #374151;
  }

  &:active:hover {
    color: #d1d5db;
  }
`

// 文本常量
const TEXTS = {
    MODAL_TITLE: '自定义列',
    SEARCH_PLACEHOLDER: '输入关键词搜索',
    AVAILABLE_COLUMNS: '可添加列',
    ONLY_SHOW_SELECTED: '仅看已选项',
    SELECT_ALL: '添加全部列',
    CLEAR: '清空',
    CANCEL: '取消',
    CONFIRM: '确定',
    COLUMN_TITLE: '列',
    OPERATION_TITLE: '操作',
} as const
/**
 * 自定义列设置模态框组件
 * 功能：允许用户选择、排序和管理表格显示列
 */
export const ModalColumnCustom = (props: ModalColumnCustomProps) => {
    const { open, onClose, options, defaultSelecteds, onSubmit } = props
    const { token } = theme.useToken()

    // 当前显示的可选列列表（受搜索和过滤影响）
    const [displayedOptions, setDisplayedOptions] = useState<ColumnCustomType[]>([])
    // 已选中的列配置列表
    const [selectedColumns, setSelectedColumns] = useState<ColumnCustomType[]>([])
    // 是否只显示已选中的列
    const [showOnlySelected, setShowOnlySelected] = useState(false)
    // 提交按钮加载状态
    const [isSubmitting, setIsSubmitting] = useState(false)
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
    const handleRemoveColumn = useCallback((columnValue: string) => {
        // 如果是默认选中的列，不允许删除
        if (defaultSelecteds.includes(columnValue)) {
            return
        }
        setSelectedColumns(prev => prev.filter((item) => item.value !== columnValue))
    }, [defaultSelecteds])
    
    // 处理全选/取消全选操作
    const handleSelectAllToggle = useCallback((checked: boolean) => {
        if (checked) {
            setSelectedColumns(displayedOptions)
        } else {
            resetToDefaultSelections()
        }
    }, [displayedOptions, resetToDefaultSelections])
    
    // 处理单个列选中状态切换
    const handleColumnToggle = useCallback((columnOption: ColumnCustomType, checked: boolean) => {
        if (checked) {
            setSelectedColumns(prev => [...prev, columnOption])
        } else {
            // 如果是默认选中的列，不允许取消选择
            if (defaultSelecteds.includes(columnOption.value)) {
                return
            }
            setSelectedColumns(prev => prev.filter((item) => item.value !== columnOption.value))
        }
    }, [defaultSelecteds])
    
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
                // 默认选中的列和禁用的列不显示删除按钮
                const isDefaultSelected = defaultSelecteds.includes(columnRecord.value)
                return !columnRecord.disabled && !isDefaultSelected && (
                    <DeleteIcon 
                        onClick={() => handleRemoveColumn(columnRecord.value)}
                    >
                        <CloseOutlined />
                    </DeleteIcon>
                )
            }
        }]
    }, [handleRemoveColumn, defaultSelecteds])

    // 计算"全选"复选框状态
    const isAllSelected = useMemo(() => {
        return selectedColumns.length > 0 && displayedOptions.length === selectedColumns.length
    }, [selectedColumns.length, displayedOptions.length])
    
    const isIndeterminate = useMemo(() => {
        return selectedColumns.length > 0 && selectedColumns.length < displayedOptions.length
    }, [selectedColumns.length, displayedOptions.length])

    // 处理列选项的显示逻辑（搜索过滤 + 已选过滤）
    const updateDisplayedOptions = useCallback((searchKeyword?: string) => {
        let filteredOptions = [...options]

        // 如果开启"仅看已选项"，过滤出已选中的列
        if (showOnlySelected) {
            filteredOptions = filteredOptions.filter((item) =>
                selectedColumns.some((selected) => selected.value === item.value)
            )
        }

        // 如果有搜索关键词，进一步过滤
        if (searchKeyword) {
            filteredOptions = filteredOptions.filter((item) =>
                item.label.includes(searchKeyword)
            )
        }

        setDisplayedOptions(filteredOptions)
    }, [options, showOnlySelected, selectedColumns])
    // 处理模态框关闭
    const handleModalClose = useCallback(() => {
        onClose()
    }, [onClose])
    // 当相关状态改变时，更新显示的选项列表
    useEffect(() => {
        updateDisplayedOptions()
    }, [updateDisplayedOptions])
    // 组件初始化时设置默认选中的列
    useEffect(() => {
        if (defaultSelecteds.length && !selectedColumns.length) {
            setSelectedColumns(options.filter((item) => defaultSelecteds.includes(item.value)))
        }
        return () => {
            resetToDefaultSelections()
        }
    }, [options, defaultSelecteds])
    // 模态框配置属性
    const modalConfig = {
        open,
        onCancel: handleModalClose,
        width: MODAL_CONFIG.WIDTH,
        title: TEXTS.MODAL_TITLE,
        destroyOnHidden: true,
        centered: true,
        footer: (
            <div className="footer-buttons">
                <Space>
                    <Button onClick={handleModalClose} disabled={isSubmitting}>
                        {TEXTS.CANCEL}
                    </Button>
                    <Button 
                        type="primary" 
                        onClick={handleSubmit}
                        disabled={!selectedColumns.length}
                        loading={isSubmitting}
                    >
                        {TEXTS.CONFIRM}
                    </Button>
                </Space>
            </div>
        )
    }

    return (
        <Modal {...modalConfig} destroyOnHidden>
            <StyledModalContent 
                $colorBorder={token.colorBorder} 
                $colorBgLayout={token.colorFillAlter}
            >
                {/* 搜索框 */}
                <Input
                    className="search-input"
                    placeholder={TEXTS.SEARCH_PLACEHOLDER}
                    allowClear
                    onChange={(e) => updateDisplayedOptions(e.target.value)}
                    suffix={<SearchOutlined />}
                />
                {/* 主内容区域 */}
                <div className="main-content">
                    {/* 头部标题栏 */}
                    <div className="header-row">
                        {/* 左侧：可添加列区域头部 */}
                        <div className="available-columns-header">
                            <div className="header-title">
                                {TEXTS.AVAILABLE_COLUMNS}
                            </div>
                            <Space>
                                <Checkbox
                                    checked={showOnlySelected}
                                    onChange={(e) => setShowOnlySelected(e.target.checked)}
                                >
                                    {TEXTS.ONLY_SHOW_SELECTED}
                                </Checkbox>
                                <Checkbox
                                    onChange={(e) => handleSelectAllToggle(e.target.checked)}
                                    indeterminate={isIndeterminate}
                                    checked={isAllSelected}
                                >
                                    {TEXTS.SELECT_ALL}
                                </Checkbox>
                            </Space>
                        </div>
                        {/* 右侧：已选列区域头部 */}
                        <div className="selected-columns-header">
                            <div className="header-title">
                                已选（{selectedColumns.length}）
                            </div>
                            <Link
                                className="clear-link"
                                onClick={clearAllSelections}
                            >
                                {TEXTS.CLEAR}
                            </Link>
                        </div>
                    </div>
                    {/* 内容主体区域 */}
                    <div className="content-body">
                        {/* 左侧：可选列列表 */}
                        <Scrollbar 
                            showVertical={false} 
                            showHorizontal={true}
                            style={{ height: MODAL_CONFIG.LIST_HEIGHT }}
                        >
                            <ul className="available-columns-list"  style={{ height: MODAL_CONFIG.LIST_HEIGHT }}>
                                {(displayedOptions || options).map((columnOption) => {
                                    const isSelected = selectedColumns.some((item) => item.value === columnOption.value)
                                    const isDefaultSelected = defaultSelecteds.includes(columnOption.value)

                                    return (
                                        <li className="column-item" key={columnOption.value}>
                                            <Checkbox
                                                disabled={columnOption.disabled || isDefaultSelected}
                                                checked={isSelected}
                                                onChange={(e) => handleColumnToggle(columnOption, e.target.checked)}
                                            >
                                                {columnOption.label}
                                            </Checkbox>
                                        </li>
                                    )
                                })}
                            </ul>
                        </Scrollbar>

                        {/* 右侧：已选列可拖拽表格 */}
                        <div className="selected-columns-table">
                            {selectedColumns.length > 0 && (
                                <TableDragHandle
                                    columns={selectedColumnsTableConfig}
                                    dataSource={selectedColumns}
                                    rowKey="value"
                                    onChange={(reorderedData) => {
                                        setSelectedColumns(reorderedData as ColumnCustomType[])
                                    }}
                                    tableProps={{
                                        showHeader: false,
                                        pagination: false,
                                        size: 'small',
                                        scroll: {
                                            y: MODAL_CONFIG.LIST_HEIGHT
                                        },
                                        locale: {
                                            emptyText: ''
                                        }
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </StyledModalContent>
        </Modal>
    )
}
export default ModalColumnCustom
