import styled, { css } from 'styled-components'
import { GlobalToken } from 'antd/es/theme/interface'
import { CSSProperties } from 'react'

export const DEFAULT_PREFIX = 'adp-two-tier-cascader'

// 定义颜色常量
const COLORS = {
    bgLayout: '#fafafa',
    border: '#d9d9d9',
    itemHover: '#f5f5f5',
    split: '#f0f0f0',
    activeBackground: '#e6f4ff',
    activeBorder: '#91caff',
    disabledText: 'rgba(0, 0, 0, 0.25)',
    disabledBg: 'rgba(0, 0, 0, 0.04)',
}

interface StyledTwoTierCascaderProps {
    $token: GlobalToken
}

/**
 * TwoTierCascader 主容器
 */
export const StyledTwoTierCascader = styled.div<StyledTwoTierCascaderProps>`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    border: 1px solid ${COLORS.border};
    border-radius: 4px;
    display: flex;
    flex-direction: column;
`

/**
 * 头部区域
 */
export const StyledHeader = styled.div<{ $token: GlobalToken }>`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    background-color: ${COLORS.bgLayout};
    border-bottom: 1px solid ${COLORS.border};

    /* 头部每列的基础样式 */
    > div {
        line-height: 40px;
        padding: 0 16px;
        font-weight: 500;
    }

    /* 添加分割线，最后一列不需要右边框 */
    > div:not(:last-child) {
        border-right: 1px solid ${COLORS.border};
    }
`

/**
 * 主体区域
 */
export const StyledBody = styled.div<{ $token: GlobalToken }>`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    flex: 1;
    overflow: hidden;

    /* 添加分割线，最后一列不需要右边框 */
    > div:not(:last-child) {
        border-right: 1px solid ${COLORS.border};
    }
`

/**
 * 列表项基础样式
 */
export const StyledListItem = styled.div<{
    $active?: boolean
    $disabled?: boolean
    $selected?: boolean
}>`
    padding: 8px 16px;
    cursor: pointer;
    transition: all 0.2s;
    border-bottom: 1px solid ${COLORS.split};
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;

    &:last-child {
        border-bottom: none;
    }

    /* 悬停效果（排除激活状态的项目） */
    ${(props) =>
        !props.$active &&
        !props.$disabled &&
        css`
            &:hover {
                background: ${COLORS.itemHover};
            }
        `}

    /* 激活状态的列表项 */
    ${(props) =>
        props.$active &&
        css`
            color: rgba(0, 0, 0, 0.88);
            font-weight: 500;
            background-color: ${COLORS.activeBackground};
        `}

    /* 禁用状态的列表项 */
    ${(props) =>
        props.$disabled &&
        css`
            cursor: not-allowed;
            border-color: ${COLORS.border};
            color: ${COLORS.disabledText};
            background: ${COLORS.disabledBg};
            box-shadow: none;

            &:hover {
                background: ${COLORS.disabledBg};
            }
        `}

    /* 选中状态的列表项 */
    ${(props) =>
        props.$selected &&
        css`
            background-color: ${COLORS.activeBackground};
        `}
`

/**
 * 已选项目容器
 */
export const StyledSelectedItem = styled.div`
    margin: 4px 16px;
    padding: 2px;
    background-color: ${COLORS.itemHover};
    border-bottom: 1px solid ${COLORS.split};
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    &:last-child {
        border-bottom: none;
    }
`

// 保持向后兼容的内联样式函数
export function getInlineStyles(height: number) {
    const container: CSSProperties = { width: '100%' }
    const header: CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        backgroundColor: COLORS.bgLayout,
        borderBottom: `1px solid ${COLORS.border}`,
    }
    const headerCol: CSSProperties = {
        lineHeight: '40px',
        padding: '0 16px',
        fontWeight: 500,
    }
    const body: CSSProperties = {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        minHeight: height,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 6,
        overflow: 'hidden',
    }
    const listHeight: CSSProperties = {
        height,
    }
    const selectedWrapper: CSSProperties = { paddingTop: 4, paddingBottom: 4 }

    return { container, header, headerCol, body, listHeight, selectedWrapper }
}

export function getClassNames(prefixCls: string = DEFAULT_PREFIX) {
    const root = prefixCls
    const header = `${prefixCls}-header`
    const body = `${prefixCls}-body`
    const item = `${prefixCls}-body-list_item`
    const itemActive = `${item}-active`
    const itemDisable = `${item}-disable`
    const itemSelected = `${item}-selected`
    return {
        root,
        header,
        body,
        item,
        itemActive,
        itemDisable,
        itemSelected,
    }
}

/**
 * 获取列表项的内联样式
 */
export function getListItemStyles(opts: {
    active?: boolean
    disable?: boolean
    selected?: boolean
}): CSSProperties {
    const baseStyle: CSSProperties = {
        padding: '8px 16px',
        cursor: 'pointer',
        transition: 'all 0.2s',
        borderBottom: `1px solid ${COLORS.split}`,
    }

    if (opts.active) {
        return {
            ...baseStyle,
            backgroundColor: COLORS.activeBackground,
            borderColor: COLORS.activeBorder,
        }
    }

    if (opts.disable) {
        return {
            ...baseStyle,
            color: COLORS.disabledText,
            cursor: 'not-allowed',
        }
    }

    return baseStyle
}

/**
 * 获取列表项的悬停样式
 */
export function getListItemHoverStyles(): CSSProperties {
    return {
        backgroundColor: COLORS.itemHover,
    }
}

/**
 * 获取已选项的样式
 */
export function getSelectedItemStyles(): CSSProperties {
    return {
        backgroundColor: COLORS.itemHover,
        padding: '2px',
    }
}

/**
 * 组合行状态类
 */
export function getItemClass(
    base: string,
    opts: { active?: boolean; disable?: boolean; selected?: boolean }
) {
    const cls: string[] = [base]
    if (opts.active) cls.push(`${base}-active`)
    if (opts.disable) cls.push(`${base}-disable`)
    if (opts.selected) cls.push(`${base}-selected`)
    return cls.join(' ')
}
