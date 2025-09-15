/**
 * 移动数组元素位置
 */
export const arrayMove = <T>(array: T[], from: number, to: number): T[] => {
    const newArray = [...array]
    const [removed] = newArray.splice(from, 1)
    newArray.splice(to, 0, removed)
    return newArray
}

/**
 * 获取行键值
 */
export const getRowKey = (record: any, rowKey: string): string => {
    return String(record[rowKey] || record.key || record.id)
}

/**
 * 根据行键查找数据索引
 */
export const findIndexByRowKey = <T = any>(
    dataSource: T[],
    rowKey: string,
    keyValue: string | number
): number => {
    return dataSource.findIndex((record) => getRowKey(record, rowKey) === String(keyValue))
}

/**
 * 验证拖拽配置
 */
export const validateDragConfig = <T = any>(config: {
    dataSource: T[]
    rowKey: string
    disabled?: boolean
}): { isValid: boolean; error?: string } => {
    const { dataSource, rowKey, disabled } = config

    if (disabled) {
        return { isValid: false, error: 'Drag is disabled' }
    }

    if (!Array.isArray(dataSource)) {
        return { isValid: false, error: 'dataSource must be an array' }
    }

    if (!rowKey) {
        return { isValid: false, error: 'rowKey is required' }
    }

    // 检查行键是否唯一
    const keys = dataSource.map((record) => getRowKey(record, rowKey))
    const uniqueKeys = new Set(keys)

    if (keys.length !== uniqueKeys.size) {
        return { isValid: false, error: 'Row keys must be unique' }
    }

    return { isValid: true }
}

/**
 * 生成表格拖拽类名
 */
export const getTableDragClassNames = (
    prefixCls: string,
    state: {
        isDragging?: boolean
        isDisabled?: boolean
    }
): string => {
    const { isDragging, isDisabled } = state

    const classNames = [prefixCls]

    if (isDragging) {
        classNames.push(`${prefixCls}-dragging`)
    }

    if (isDisabled) {
        classNames.push(`${prefixCls}-disabled`)
    }

    return classNames.join(' ')
}

/**
 * 安全执行回调函数
 */
export const safeCallback = <T extends (...args: any[]) => any>(
    callback: T | undefined,
    ...args: Parameters<T>
): ReturnType<T> | undefined => {
    try {
        return callback?.(...args)
    } catch (error) {
        console.error('TableDragHandle callback error:', error)
        return undefined
    }
}
