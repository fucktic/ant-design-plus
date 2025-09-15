/*
 * @Author: xuwei
 * @Date: 2025-09-10 22:09:56
 * @LastEditors: lisaxw lisaxw@qq.com
 * @LastEditTime: 2025-09-12 16:49:02
 * @Description: Do not edit
 */
/**
 * TwoTierCascader 组件入口文件
 * @author xuwei
 * @date 2025-01-17
 */

// 导入主组件
import TwoTierCascaderComponent, {
    TwoTierCascader as TwoTierCascaderNamed,
} from './TwoTierCascader'

// 导出主组件（同时支持默认导出和具名导出）
export { TwoTierCascaderNamed as TwoTierCascader }
export default TwoTierCascaderComponent

// 导出子组件
export { CascaderListItem, CascaderCheckbox } from './components'

// 导出类型定义
export type {
    CascaderOption,
    TwoTierCascaderProps,
    TwoTierCascaderRef,
    Level1DataResponse,
    Level2DataResponse,
} from './types'

// 导出工具函数
export { createSelectedValueSet, isSelectedLimitReached, calculateCheckedCount } from './utils'
