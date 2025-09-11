import classnames from 'classnames'

/**
 * 类名合并工具函数
 * @param classes 类名参数
 * @returns 合并后的类名字符串
 */
const classNames = (...classes: Parameters<typeof classnames>) => {
    return classnames(...classes)
}

export default classNames
