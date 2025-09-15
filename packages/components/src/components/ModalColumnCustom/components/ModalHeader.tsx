import React from 'react'
import { Input, Space, Checkbox, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { TEXTS } from '../constants'

const { Link } = Typography

interface ModalHeaderProps {
    /** 搜索关键词变化处理 */
    onSearchChange: (keyword: string) => void
    /** 仅看已选项状态 */
    showOnlySelected: boolean
    /** 仅看已选项切换处理 */
    onShowOnlySelectedChange: (checked: boolean) => void
    /** 全选状态 */
    isAllSelected: boolean
    /** 部分选中状态 */
    isIndeterminate: boolean
    /** 全选切换处理 */
    onSelectAllToggle: (checked: boolean) => void
    /** 已选列数量 */
    selectedCount: number
    /** 清空处理 */
    onClear: () => void
}

/**
 * 模态框头部组件
 */
export const ModalHeader: React.FC<ModalHeaderProps> = ({
    onSearchChange,
    showOnlySelected,
    onShowOnlySelectedChange,
    isAllSelected,
    isIndeterminate,
    onSelectAllToggle,
    selectedCount,
    onClear,
}) => {
    return (
        <div>
            {/* 搜索框 */}
            <Input
                className="search-input"
                placeholder={TEXTS.SEARCH_PLACEHOLDER}
                allowClear
                onChange={(e) => onSearchChange(e.target.value)}
                suffix={<SearchOutlined />}
            />
            
            {/* 主内容区域 */}
            <div className="main-content">
                {/* 头部标题栏 */}
                <div className="header-row">
                    {/* 左侧：可添加列区域头部 */}
                    <div className="available-columns-header">
                        <div className="header-title">
                            {TEXTS.AVAILABLE_COLUMNS}
                        </div>
                        <Space>
                            <Checkbox
                                checked={showOnlySelected}
                                onChange={(e) => onShowOnlySelectedChange(e.target.checked)}
                            >
                                {TEXTS.ONLY_SHOW_SELECTED}
                            </Checkbox>
                            <Checkbox
                                onChange={(e) => onSelectAllToggle(e.target.checked)}
                                indeterminate={isIndeterminate}
                                checked={isAllSelected}
                            >
                                {TEXTS.SELECT_ALL}
                            </Checkbox>
                        </Space>
                    </div>
                    {/* 右侧：已选列区域头部 */}
                    <div className="selected-columns-header">
                        <div className="header-title">
                            已选（{selectedCount}）
                        </div>
                        <Link className="clear-link" onClick={onClear}>
                            {TEXTS.CLEAR}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}