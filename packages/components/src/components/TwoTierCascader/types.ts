/**
 * TwoTierCascader 相关类型定义
 * @author xuwei
 * @date 2025-01-17
 */

/**
 * 级联选择器选项类型定义
 */
export interface CascaderOption {
    /** 选项的唯一标识 */
    value: string | number
    /** 选项显示的文本 */
    label: string
    /** 子选项列表 */
    children?: CascaderOption[]
    /** 是否被选中（内部使用） */
    checked?: boolean
    /** 子选项总数量（用于分页场景，显示实际总数而非当前加载的数量） */
    total?: number
}

/**
 * 一级数据响应格式
 */
export interface Level1DataResponse {
    /** 一级选项列表 */
    data: CascaderOption[]
}

/**
 * 二级数据响应格式
 */
export interface Level2DataResponse {
    /** 二级选项列表 */
    data: CascaderOption[]
    /** 总数量（可选，用于分页判断） */
    total?: number
}

/**
 * TwoTierCascader 组件属性接口
 */
export interface TwoTierCascaderProps {
    /** 选中项变化回调函数 */
    onChange?: (selectedItems: CascaderOption[]) => void
    /** 获取一级数据的方法 */
    onLoadLevel1Data: () => Promise<Level1DataResponse>
    /** 获取二级数据的方法 */
    onLoadLevel2Data: (
        parentValue: string | number,
        page: number,
        pageSize: number
    ) => Promise<Level2DataResponse>
    /** 最大选择数量限制，默认50 */
    maxSelectNum?: number
    /** 头部标签配置 */
    headerLabels?: {
        level1: string
        level2: string
        selected: string
    }

    /** 自定义CSS类名 */
    className?: string
    /** 二级列表分页大小，默认20 */
    level2PageSize?: number
}

/**
 * TwoTierCascader 组件引用类型
 */
export interface TwoTierCascaderRef {
    addSelecteds: (itemsToAdd: CascaderOption[]) => void
}
