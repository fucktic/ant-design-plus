import { useState, useCallback, useMemo, useEffect } from 'react'
import {
    ColumnCustomType,
    UseColumnSelectionParams,
    UseColumnSelectionReturn
} from '../types'

/**
 * 列选择状态管理 Hook
 * 
 * @param params 参数配置
 * @returns 列选择状态和操作方法
 */
export const useColumnSelection = (params: UseColumnSelectionParams): UseColumnSelectionReturn => {
    const { options, defaultSelecteds, onClose, onSubmit } = params

    // 状态管理
    const [displayedOptions, setDisplayedOptions] = useState<ColumnCustomType[]>([])
    const [selectedColumns, setSelectedColumns] = useState<ColumnCustomType[]>([])
    const [showOnlySelected, setShowOnlySelected] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // 重置已选列为默认选中状态
    const resetToDefaultSelections = useCallback(() => {
        setSelectedColumns(options.filter((item) => defaultSelecteds.includes(item.value)))
    }, [options, defaultSelecteds])

    // 处理单个列的删除操作
    const handleRemoveColumn = useCallback((columnValue: string) => {
        setSelectedColumns(prev => prev.filter((item) => item.value !== columnValue))
    }, [])

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
            setSelectedColumns(prev => prev.filter((item) => item.value !== columnOption.value))
        }
    }, [])

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

    // 计算"全选"复选框状态
    const isAllSelected = useMemo(() => {
        return selectedColumns.length > 0 && displayedOptions.length === selectedColumns.length
    }, [selectedColumns.length, displayedOptions.length])

    const isIndeterminate = useMemo(() => {
        return selectedColumns.length > 0 && selectedColumns.length < displayedOptions.length
    }, [selectedColumns.length, displayedOptions.length])

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
    }, [options, defaultSelecteds, selectedColumns.length, resetToDefaultSelections])

    // 当显示过滤状态改变时，更新显示列表
    useEffect(() => {
        updateDisplayedOptions()
    }, [showOnlySelected, updateDisplayedOptions])

    return {
        // 状态
        displayedOptions,
        selectedColumns,
        showOnlySelected: showOnlySelected,
        isSubmitting,
        isAllSelected,
        isIndeterminate,

        // 操作方法
        resetToDefaultSelections,
        handleRemoveColumn,
        handleSelectAllToggle,
        handleColumnToggle,
        handleSubmit,
        updateDisplayedOptions,
        handleModalClose,

        // 设置状态的方法（用于外部控制）
        setShowOnlySelected,
        setSelectedColumns,
    } as UseColumnSelectionReturn & {
        setShowOnlySelected: (value: boolean) => void
        setSelectedColumns: (columns: ColumnCustomType[]) => void
    }
}