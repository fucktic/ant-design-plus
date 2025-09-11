import { v4 as uuidv4 } from 'uuid'

/**
 * 生成唯一ID
 * @param prefix 前缀
 * @returns 唯一ID字符串
 */
const generateId = (prefix = 'adp'): string => {
    return `${prefix}-${uuidv4()}`
}

export default generateId
