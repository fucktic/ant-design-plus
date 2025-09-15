import type { ModalProps } from 'antd'
/**
 * 列配置选项类型
 */
export interface ColumnCustomType {
    /** 列显示名称 */
    label: string
    /** 列唯一标识值 */
    value: string
    /** 是否禁用选择 */
    disabled?: boolean
}

/**
 * 模态框组件属性类型
 */
export interface ModalColumnCustomProps {
    /** 模态框显示状态 */
    open: boolean
    /** 关闭回调函数 */
    onClose: () => void
    /** 提交选中列回调 */
    onSubmit: (selectedValues: string[]) => Promise<boolean>
    /** 可选择的列配置列表 */
    options: ColumnCustomType[]
    /** 默认选中的列值 */
    defaultSelecteds: string[]
    headerLabels?: {
        column: string
        onlySelected: string
        all: string
        selected: string
    }
    modalProps?: ModalProps
}

/**
 * 列选择状态接口
 */
export interface ColumnSelectionState {
    /** 当前显示的可选列列表 */
    displayedOptions: ColumnCustomType[]
    /** 已选中的列配置列表 */
    selectedColumns: ColumnCustomType[]
    /** 是否只显示已选中的列 */
    showOnlySelected: boolean
    /** 提交按钮加载状态 */
    isSubmitting: boolean
}

/**
 * 列选择操作接口
 */
export interface ColumnSelectionActions {
    /** 重置已选列为默认选中状态 */
    resetToDefaultSelections: () => void
    /** 处理单个列的删除操作 */
    handleRemoveColumn: (columnValue: string) => void
    /** 处理全选/取消全选操作 */
    handleSelectAllToggle: (checked: boolean) => void
    /** 处理单个列选中状态切换 */
    handleColumnToggle: (columnOption: ColumnCustomType, checked: boolean) => void
    /** 处理表单提交 */
    handleSubmit: () => Promise<void>
    /** 更新显示的选项列表 */
    updateDisplayedOptions: (searchKeyword?: string) => void
    /** 处理模态框关闭 */
    handleModalClose: () => void
}

/**
 * 使用列选择状态的参数
 */
export interface UseColumnSelectionParams {
    /** 可选择的列配置列表 */
    options: ColumnCustomType[]
    /** 默认选中的列值 */
    defaultSelecteds: string[]
    /** 关闭回调函数 */
    onClose: () => void
    /** 提交选中列回调 */
    onSubmit: (selectedValues: string[]) => Promise<boolean>
}

/**
 * 使用列选择状态的返回值
 */
export interface UseColumnSelectionReturn extends ColumnSelectionState, ColumnSelectionActions {
    /** 是否全选 */
    isAllSelected: boolean
    /** 是否部分选中 */
    isIndeterminate: boolean
}
