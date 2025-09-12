/**
 * FormCascader 工具函数
 * @author xuwei
 * @date 2025-01-17
 */

import type { CascaderOption } from './types'

/**
 * 创建选中值的Set，用于快速查询选中状态
 * @param items 已选中的项目列表
 * @returns 选中值的Set
 */
export const createSelectedValueSet = (items: CascaderOption[]) =>
    new Set(items.map((item) => item.value))

/**
 * 检查是否达到选择数量限制
 * @param selectedItems 已选中的项目列表
 * @param maxNum 最大选择数量
 * @returns 是否达到限制
 */
export const isSelectedLimitReached = (selectedItems: CascaderOption[], maxNum: number) =>
    selectedItems.length >= maxNum

/**
 * 计算子项目中被选中的数量
 * @param children 子项目列表
 * @param selectedSet 选中值的Set
 * @returns 选中的子项目数量
 */
export const calculateCheckedCount = (
    children: CascaderOption[],
    selectedSet: Set<string | number>
) => children.filter((child) => selectedSet.has(child.value)).length
