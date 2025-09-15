/**
 * TwoTierCascader - 三栏式级联选择器组件
 * 
 * @description 一个功能完整的二层级联选择器组件，支持两级选项选择
 * @author xuwei
 * @date 2025-01-17
 * 
 * 主要功能：
 * - 三栏布局：一级选项 | 二级选项 | 已选项目
 * - 支持最大选择数量限制
 * - 支持全选/半选/取消全选
 * - 支持分页场景：通过total字段显示实际总数量
 * - 支持异步加载：组件内部管理options，调用方提供数据加载方法
 * - 支持分页加载：二级列表滚动到底部时自动加载更多
 * - 支持清空所有选择
 * - 支持虚拟滚动优化性能
 * - 响应式设计，自适应容器大小
 * - 完整的TypeScript类型支持

 */
import React, {
    useCallback,
    useState,
    useMemo,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from 'react'
import { CloseOutlined, RightOutlined } from '@ant-design/icons'
import { CheckboxChangeEvent, Empty, List, Spin, Typography, theme } from 'antd'
import Scrollbar from '../Scrollbar/Scrollbar'

// 导入类型定义
import type {
    CascaderOption,
    TwoTierCascaderProps,
    TwoTierCascaderRef,
    Level2DataResponse,
} from './types'

// 导入工具函数
import { createSelectedValueSet, isSelectedLimitReached, calculateCheckedCount } from './utils'

// 导入子组件
import { CascaderListItem } from './CascaderListItem'
import { CascaderCheckbox } from './CascaderCheckbox'

// 导入样式
import { StyledTwoTierCascader, StyledHeader, StyledBody, StyledSelectedItem } from './styles'

const { Link, Paragraph } = Typography

/**
 * FormCascader - 三栏式级联选择器组件
 *
 * 功能特性：
 * - 支持两级级联选择
 * - 左栏：一级选项列表
 * - 中栏：二级选项列表（根据左栏选择显示）
 * - 右栏：已选中项目列表
 * - 支持最大选择数量限制
 * - 支持全选/取消全选
 * - 支持清空所有选择
 * - 支持虚拟滚动（InfiniteScroll）
 * - 支持异步数据加载和分页
 */
export const TwoTierCascader = forwardRef<TwoTierCascaderRef, TwoTierCascaderProps>(
    (
        {
            onChange,
            onLoadLevel1Data,
            onLoadLevel2Data,
            maxSelectNum = 50,
            headerLabels = {
                level1: '一级选项',
                level2: '二级选项',
                selected: '已选',
            },

            className,
            level2PageSize = 20,
        },
        ref
    ) => {
        const { token } = theme.useToken()
        // 一级选项数据（组件内部管理）
        const [options, setOptions] = useState<CascaderOption[]>([])
        // 当前选中的一级项目（用于显示对应的二级选项）
        const [currentLevel1Item, setCurrentLevel1Item] = useState<CascaderOption | null>(null)
        // 跟踪用户点击过的一级项目（用于显示选中状态）
        const [clickedLevel1Items, setClickedLevel1Items] = useState<Set<string | number>>(
            new Set()
        )
        // 二级数据加载状态
        const [level2Loading, setLevel2Loading] = useState(false)
        // 已选中的项目列表
        const [selectedItems, setSelectedItems] = useState<CascaderOption[]>([])

        // 获取二级列表数据并更新到父级选项的children中
        const loadAndUpdateLevel2Data = useCallback(
            async (
                parentValue: string | number,
                currentPage = 1,
                pageSize = 20
            ): Promise<Level2DataResponse> => {
                if (level2Loading)
                    return {
                        data: [],
                        total: 0,
                    }
                setLevel2Loading(true)
                try {
                    const response = await onLoadLevel2Data(parentValue, currentPage, pageSize)
                    const { data, total } = response
                    if (data && Array.isArray(data) && data.length) {
                        setOptions((previousOptions) => {
                            return previousOptions.map((option) => {
                                if (option.value === parentValue) {
                                    return {
                                        ...option,
                                        children: option.children
                                            ? [...option.children, ...data]
                                            : data,
                                        total,
                                    }
                                }
                                return option
                            })
                        })
                        return response
                    } else {
                        return {
                            data: [],
                            total: 0,
                        }
                    }
                } catch (error) {
                    console.error('加载二级数据失败:', error)
                    return {
                        data: [],
                        total: 0,
                    }
                } finally {
                    setLevel2Loading(false)
                }
            },
            [onLoadLevel2Data, level2Loading]
        )

        // 当选中项发生变化时，触发onChange回调通知父组件
        useEffect(() => {
            onChange?.(selectedItems)
        }, [selectedItems, onChange])

        /**
         * 处理一级项目点击事件
         * 切换当前激活的一级项目，根据该项目的children情况决定加载策略
         */
        const handleClickLevel1 = useCallback(
            async (item: CascaderOption, e: React.MouseEvent) => {
                e.stopPropagation()

                // 根据当前点击的项目的children情况决定加载策略
                if (!item.children || item.children.length === 0) {
                    // 如果B项目没有children数据，则从第1页开始加载
                    const response = await loadAndUpdateLevel2Data(item.value, 1, level2PageSize)
                    setCurrentLevel1Item({
                        ...item,
                        children: response.data,
                        total: response.total,
                    })
                } else {
                    // 如果B项目已有children数据，直接设置为当前项目
                    // 滚动条会自动回到顶部（因为是新的渲染）
                    setCurrentLevel1Item(item)
                }
            },
            [loadAndUpdateLevel2Data, level2PageSize]
        )

        /**
         * 组件初始化时加载一级数据
         */
        useEffect(() => {
            const loadInitialData = async () => {
                try {
                    const response = await onLoadLevel1Data()
                    setOptions(response.data || [])
                } catch (error) {
                    console.error('加载一级数据失败:', error)
                    setOptions([])
                }
            }

            loadInitialData()
        }, [onLoadLevel1Data])

        /**
         * 当options加载完成后，自动选择第一个项目
         */
        useEffect(() => {
            if (options.length > 0 && !currentLevel1Item) {
                const firstItem = options[0]
                // 模拟点击第一个项目
                handleClickLevel1(firstItem, { stopPropagation: () => {} } as React.MouseEvent)
            }
        }, [options, currentLevel1Item, handleClickLevel1])

        // 创建选中值的Set，用于快速查询选中状态
        const selectedValueSet = useMemo(
            () => createSelectedValueSet(selectedItems),
            [selectedItems]
        )

        /**
         * 计算当前显示的二级选项列表
         * 从当前选中的一级项目的children中获取，并更新选中状态
         */
        const level2Options = useMemo(() => {
            if (!currentLevel1Item?.children) return []

            return currentLevel1Item.children.map((child) => ({
                ...child,
                checked: selectedValueSet.has(child.value),
            }))
        }, [currentLevel1Item, selectedValueSet])

        /**
         * 判断是否还有更多二级数据可以加载
         */
        const level2HasMore = useMemo(() => {
            if (!currentLevel1Item || !currentLevel1Item.children) return false
            if (typeof currentLevel1Item.total !== 'number') return false
            return currentLevel1Item.children.length < currentLevel1Item.total
        }, [currentLevel1Item])

        /**
         * 判断一级项目是否应该显示为选中状态
         * 考虑用户是否点击过该项目以及是否有子项被选中
         */
        const isLevel1ItemChecked = useCallback(
            (item: CascaderOption) => {
                const option = options.find((i) => i.value === item.value)
                if (!option?.children?.length) return false

                // 如果用户点击过这个项目，并且有子项被选中，则显示为选中
                const userHasClickedThisItem = clickedLevel1Items.has(item.value)
                const hasSelectedChildItems =
                    calculateCheckedCount(option.children, selectedValueSet) > 0

                return userHasClickedThisItem && hasSelectedChildItems
            },
            [selectedValueSet, clickedLevel1Items, options]
        )

        /**
         * 判断一级项目是否为半选状态
         */
        const isLevel1ItemIndeterminate = useCallback(
            (item: CascaderOption) => {
                if (!item?.children?.length) return false
                const selectedChildCount = calculateCheckedCount(item.children, selectedValueSet)

                if (selectedChildCount === 0) return false

                // 如果有 total 字段，使用 total 进行比较
                if (typeof item.total === 'number') {
                    return selectedChildCount > 0 && selectedChildCount < item.total
                }

                // 否则使用 children 的长度进行比较
                return selectedChildCount > 0 && selectedChildCount < item.children.length
            },
            [selectedValueSet]
        )

        /**
         * 处理二级列表加载更多
         * 当滚动到底部且还有更多数据时调用
         *
         * 新增功能：当当前一级项目处于半选状态（isLevel1ItemIndeterminate = true）时，
         * 如果已选数量小于可选总数，则自动将新获取的数据添加到已选列表
         */
        const handleLoadMoreLevel2Items = useCallback(async () => {
            if (!currentLevel1Item || !level2HasMore || level2Loading) {
                return
            }

            const existingChildren = currentLevel1Item.children || []
            const nextPage = Math.floor(existingChildren.length / level2PageSize) + 1

            try {
                const response = await loadAndUpdateLevel2Data(
                    currentLevel1Item.value,
                    nextPage,
                    level2PageSize
                )

                // 更新当前一级项目的children
                setCurrentLevel1Item((prevItem) => ({
                    ...prevItem!,
                    children: [...existingChildren, ...response.data],
                }))

                // 新增功能预留：自动选中逻辑（如需要可以在此启用）
                // 保持与现有行为一致，暂不自动勾选新加载项
            } catch (error) {
                console.error('加载更多二级数据失败:', error)
            }
        }, [
            currentLevel1Item,
            level2HasMore,
            level2Loading,
            loadAndUpdateLevel2Data,
            level2PageSize,
        ])

        /**
         * 处理一级项目复选框变化
         * 支持全选/取消全选该项目下的所有子项
         */
        const handleLevel1ItemChange = useCallback(
            (item: CascaderOption, e: CheckboxChangeEvent) => {
                const option = options.find((i) => i.value === item.value)
                if (!option?.children?.length) return

                if (e.target.checked) {
                    // 记录用户点击了这个一级项目
                    setClickedLevel1Items((prev) => new Set([...prev, item.value]))

                    // 全选：尽量添加未选中的子项到已选列表（受最大数量限制）
                    if (isSelectedLimitReached(selectedItems, maxSelectNum)) {
                        return // 如果已达到限制，不能再选择
                    }

                    const remainingSlots = maxSelectNum - selectedItems.length
                    const unselectedChildItems = option.children.filter(
                        (child) => !selectedValueSet.has(child.value)
                    )
                    const itemsToAdd = unselectedChildItems.slice(0, remainingSlots)
                    setSelectedItems([...selectedItems, ...itemsToAdd])
                } else {
                    // 取消记录用户点击
                    setClickedLevel1Items((prev) => {
                        const newSet = new Set(prev)
                        newSet.delete(item.value)
                        return newSet
                    })

                    // 取消全选：从已选列表中移除该项目的所有子项
                    const childValueSet = new Set(option.children.map((child) => child.value))
                    const filteredSelectedItems = selectedItems.filter(
                        (selected) => !childValueSet.has(selected.value)
                    )
                    setSelectedItems(filteredSelectedItems)
                }
            },
            [selectedItems, maxSelectNum, selectedValueSet, options]
        )

        /**
         * 处理二级项目复选框变化
         * 单个选中/取消选中二级项目
         */
        const handleLevel2ItemChange = useCallback(
            (item: CascaderOption, e: CheckboxChangeEvent) => {
                if (e.target.checked) {
                    if (isSelectedLimitReached(selectedItems, maxSelectNum)) return
                    setSelectedItems([...selectedItems, item])
                } else {
                    const filteredItems = selectedItems.filter(
                        (selected) => selected.value !== item.value
                    )
                    setSelectedItems(filteredItems)
                }
            },
            [selectedItems, maxSelectNum]
        )
        /**
         * 处理移除已选项目
         * 从已选列表中移除指定项目
         */
        const handleRemoveSelectedItem = useCallback(
            (item: CascaderOption) => {
                const filteredItems = selectedItems.filter(
                    (selected) => selected.value !== item.value
                )
                setSelectedItems(filteredItems)
            },
            [selectedItems]
        )

        /**
         * 清空所有已选项目
         */
        const handleClearAllSelected = useCallback(() => {
            setSelectedItems([])
            setClickedLevel1Items(new Set())
        }, [])
        useImperativeHandle(
            ref,
            () => ({
                addSelecteds: (itemsToAdd: CascaderOption[]) => {
                    const newUniqueItems = itemsToAdd.filter(
                        (item) => !selectedValueSet.has(item.value)
                    )
                    setSelectedItems((previousItems) => [...previousItems, ...newUniqueItems])
                },
            }),
            [selectedValueSet]
        )

        return (
            <StyledTwoTierCascader
                $token={token}
                className={className}
            >
                {/* 头部标签栏 */}
                <StyledHeader $token={token}>
                    <div>{headerLabels.level1}</div>
                    <div>{headerLabels.level2}</div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span
                            style={{ flex: 1 }}
                        >{`${headerLabels.selected}（${selectedItems.length}/${maxSelectNum}）`}</span>
                        <Link onClick={handleClearAllSelected}>清空</Link>
                    </div>
                </StyledHeader>

                {/* 主体内容区 */}
                <StyledBody $token={token}>
                    {!options.length ? (
                        // 空数据状态
                        <div
                            style={{
                                gridColumn: 'span 2',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Empty />
                        </div>
                    ) : (
                        <>
                            {/* 一级选项列表 */}
                            <div
                                style={{
                                    height: '100%',
                                    overflow: 'hidden',
                                }}
                            >
                                <Scrollbar
                                    showHorizontal={false}
                                    style={{ height: '100%' }}
                                >
                                    <List
                                        split={false}
                                        dataSource={options}
                                        key={`level1-${selectedValueSet.size}`}
                                        header={null}
                                        footer={null}
                                        renderItem={(item) => (
                                            <CascaderListItem
                                                active={currentLevel1Item?.value === item.value}
                                                disabled={
                                                    isSelectedLimitReached(
                                                        selectedItems,
                                                        maxSelectNum
                                                    ) &&
                                                    !isLevel1ItemChecked(item) &&
                                                    !isLevel1ItemIndeterminate(item)
                                                }
                                                onClick={(e) => handleClickLevel1(item, e)}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        flex: 1,
                                                    }}
                                                >
                                                    <CascaderCheckbox
                                                        item={item}
                                                        onChange={(e) =>
                                                            handleLevel1ItemChange(item, e)
                                                        }
                                                        indeterminate={isLevel1ItemIndeterminate(
                                                            item
                                                        )}
                                                        checked={isLevel1ItemChecked(item)}
                                                        disabled={
                                                            isSelectedLimitReached(
                                                                selectedItems,
                                                                maxSelectNum
                                                            ) &&
                                                            !isLevel1ItemChecked(item) &&
                                                            !isLevel1ItemIndeterminate(item)
                                                        }
                                                    />
                                                </div>
                                                <RightOutlined
                                                    style={{ color: token.colorTextTertiary }}
                                                />
                                            </CascaderListItem>
                                        )}
                                    />
                                </Scrollbar>
                            </div>

                            {/* 二级选项列表 */}
                            <div
                                style={{
                                    height: '100%',
                                    overflow: 'hidden',
                                }}
                            >
                                <Scrollbar
                                    key={currentLevel1Item?.value}
                                    showHorizontal={false}
                                    style={{ height: '100%' }}
                                    onScrollToBottom={() =>
                                        level2HasMore && handleLoadMoreLevel2Items()
                                    }
                                >
                                    <List
                                        split={false}
                                        dataSource={level2Options || []}
                                        header={null}
                                        footer={null}
                                        renderItem={(item) => (
                                            <CascaderListItem
                                                disabled={
                                                    isSelectedLimitReached(
                                                        selectedItems,
                                                        maxSelectNum
                                                    ) && !selectedValueSet.has(item.value)
                                                }
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        flex: 1,
                                                    }}
                                                >
                                                    <CascaderCheckbox
                                                        item={item}
                                                        disabled={
                                                            isSelectedLimitReached(
                                                                selectedItems,
                                                                maxSelectNum
                                                            ) && !selectedValueSet.has(item.value)
                                                        }
                                                        checked={item.checked}
                                                        onChange={(e) =>
                                                            handleLevel2ItemChange(item, e)
                                                        }
                                                    />
                                                </div>
                                            </CascaderListItem>
                                        )}
                                    />
                                    {level2HasMore && (
                                        <div
                                            style={{
                                                textAlign: 'center',
                                                padding: 24,
                                            }}
                                        >
                                            <Spin spinning={level2Loading}></Spin>
                                        </div>
                                    )}
                                </Scrollbar>
                            </div>
                        </>
                    )}

                    {/* 已选项目列表 */}
                    <div
                        style={{
                            height: '100%',
                            overflow: 'hidden',
                        }}
                    >
                        <Scrollbar
                            showHorizontal={false}
                            style={{ height: '100%' }}
                        >
                            <List
                                dataSource={selectedItems || []}
                                header={null}
                                footer={null}
                                split={true}
                                renderItem={(item: CascaderOption) => (
                                    <List.Item style={{ padding: 0, border: 'none' }}>
                                        <StyledSelectedItem>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    width: '100%',
                                                    paddingLeft: 4,
                                                    paddingRight: 4,
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        flex: 1,
                                                    }}
                                                >
                                                    <Paragraph
                                                        style={{
                                                            marginBottom: 0,
                                                            marginLeft: 8,
                                                            userSelect: 'none',
                                                        }}
                                                        ellipsis={{
                                                            rows: 1,
                                                            tooltip: item.label,
                                                        }}
                                                    >
                                                        {item.label}
                                                    </Paragraph>
                                                </div>
                                                <CloseOutlined
                                                    style={{ opacity: 0.5, cursor: 'pointer' }}
                                                    onMouseEnter={(e) =>
                                                        (e.currentTarget.style.opacity = '1')
                                                    }
                                                    onMouseLeave={(e) =>
                                                        (e.currentTarget.style.opacity = '0.5')
                                                    }
                                                    onClick={() => handleRemoveSelectedItem(item)}
                                                />
                                            </div>
                                        </StyledSelectedItem>
                                    </List.Item>
                                )}
                            />
                        </Scrollbar>
                    </div>
                </StyledBody>
            </StyledTwoTierCascader>
        )
    }
)

export default TwoTierCascader
