import styled, { css } from 'styled-components'

interface StyledTableWrapperProps {
    $striped?: boolean
    $compact?: boolean
    $borderRadius?: number
    $hoverColor?: string
    $prefixCls?: string
}

export const StyledTableWrapper: any = styled.div<StyledTableWrapperProps>`
    .${(props) => props.$prefixCls || 'ant'}-table-wrapper {
        border-radius: ${(props) => props.$borderRadius || 8}px;
        overflow: hidden;
    }

    .${(props) => props.$prefixCls || 'ant'}-table {
        border-radius: ${(props) => props.$borderRadius || 8}px;
    }

    // 表头样式
    .${(props) => props.$prefixCls || 'ant'}-table-thead > tr > th {
        background: linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%);
        font-weight: 600;
        border-bottom: 2px solid #e8e8e8;
        color: #262626;
        position: relative;

        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, #1890ff, #722ed1);
        }
    }

    // 斑马纹样式
    ${(props) =>
        props.$striped &&
        css`
            .${props.$prefixCls || 'ant'}-table-tbody > tr:nth-child(even) > td {
                background-color: #fafafa;
            }
        `}

    // 紧凑模式样式
  ${(props) =>
        props.$compact &&
        css`
            .${props.$prefixCls || 'ant'}-table-tbody > tr > td {
                padding: 8px 12px;
            }

            .${props.$prefixCls || 'ant'}-table-thead > tr > th {
                padding: 8px 12px;
            }
        `}
  
  // 悬停效果
  .${(props) => props.$prefixCls || 'ant'}-table-tbody > tr {
        transition: all 0.2s ease;

        &:hover > td {
            background-color: ${(props) => props.$hoverColor || '#e6f7ff'} !important;
            transform: scale(1.01);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
    }

    // 表格边框样式
    .${(props) => props.$prefixCls || 'ant'}-table-container {
        border: 1px solid #e8e8e8;
        border-radius: ${(props) => props.$borderRadius || 8}px;
    }

    // 分页样式
    .${(props) => props.$prefixCls || 'ant'}-pagination {
        margin-top: 16px;
        text-align: right;

        .${(props) => props.$prefixCls || 'ant'}-pagination-item {
            border-radius: 6px;
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            &.${(props) => props.$prefixCls || 'ant'}-pagination-item-active {
                background: linear-gradient(135deg, #1890ff 0%, #722ed1 100%);
                border-color: transparent;

                a {
                    color: white;
                }
            }
        }

        .${(props) => props.$prefixCls || 'ant'}-pagination-prev,
            .${(props) => props.$prefixCls || 'ant'}-pagination-next {
            border-radius: 6px;
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-1px);
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
        }
    }

    // 排序图标样式
    .${(props) => props.$prefixCls || 'ant'}-table-column-sorter {
        .${(props) => props.$prefixCls || 'ant'}-table-column-sorter-up,
            .${(props) => props.$prefixCls || 'ant'}-table-column-sorter-down {
            color: #bfbfbf;
            transition: color 0.3s ease;

            &.active {
                color: #1890ff;
            }
        }
    }

    // 筛选图标样式
    .${(props) => props.$prefixCls || 'ant'}-table-filter-trigger {
        color: #bfbfbf;
        transition: color 0.3s ease;

        &:hover {
            color: #1890ff;
        }

        &.active {
            color: #1890ff;
        }
    }
`
