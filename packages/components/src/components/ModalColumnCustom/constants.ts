/**
 * ModalColumnCustom 组件常量配置
 */

// 组件配置
export const MODAL_CONFIG = {
    /** 模态框宽度 */
    WIDTH: 800,
    /** 列表高度 */
    LIST_HEIGHT: 474,
    /** 搜索输入框宽度 */
    SEARCH_INPUT_WIDTH: '320px',
} as const

// 样式常量
export const STYLES = {
    /** 删除图标样式 */
    DELETE_ICON: "h-3 w-3 text-gray-500 cursor-pointer rounded hover:text-gray-800 active:hover:text-gray-300",
} as const

// 文本常量
export const TEXTS = {
    /** 模态框标题 */
    MODAL_TITLE: '自定义列',
    /** 搜索框占位符 */
    SEARCH_PLACEHOLDER: '输入关键词搜索',
    /** 可添加列标题 */
    AVAILABLE_COLUMNS: '可添加列',
    /** 仅看已选项 */
    ONLY_SHOW_SELECTED: '仅看已选项',
    /** 添加全部列 */
    SELECT_ALL: '添加全部列',
    /** 清空按钮 */
    CLEAR: '清空',
    /** 取消按钮 */
    CANCEL: '取消',
    /** 确定按钮 */
    CONFIRM: '确定',
    /** 列标题 */
    COLUMN_TITLE: '列',
    /** 操作标题 */
    OPERATION_TITLE: '操作',
} as const

// 默认配置
export const DEFAULT_CONFIG = {
    /** 默认类名前缀 */
    PREFIX_CLS: 'adp-modal-column-custom',
} as const