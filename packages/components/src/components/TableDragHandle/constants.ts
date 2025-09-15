/**
 * TableDragHandle 组件常量配置
 */

/** 默认配置 */
export const DEFAULT_CONFIG = {
    /** 组件类名前缀 */
    PREFIX_CLS: 'ant-table-drag-handle',
    /** 默认行键字段 */
    ROW_KEY: 'id',
    /** 拖拽句柄列宽度 */
    DRAG_HANDLE_WIDTH: 40,
    /** 拖拽句柄列键名 */
    DRAG_HANDLE_KEY: '__drag_handle__',
    /** 拖拽数据传输类型 */
    DRAG_DATA_TYPE: 'application/x-table-row-data',
} as const

/** 拖拽句柄默认配置 */
export const DEFAULT_DRAG_HANDLE = {
    title: '拖拽排序',
    visible: true,
} as const

/** CSS 类名 */
export const CSS_CLASSES = {
    CONTAINER: 'container',
    DRAG_HANDLE: 'drag-handle',
    DRAG_HANDLE_BUTTON: 'drag-handle-button',
    DRAGGING: 'dragging',
    DRAG_OVER: 'drag-over',
    DRAG_SOURCE: 'drag-source',
    DRAG_TARGET: 'drag-target',
} as const
