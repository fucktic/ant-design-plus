import { useMemo } from 'react'
import { generateId } from '../utils'

/**
 * 生成唯一ID的Hook
 * @param prefix 前缀
 * @returns 唯一ID
 */
const useId = (prefix?: string): string => {
    return useMemo(() => generateId(prefix), [prefix])
}

export default useId
