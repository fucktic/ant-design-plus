import styled from 'styled-components'
import { MODAL_CONFIG } from './constants'

// Styled Components
export const StyledModalContent = styled.div<{ $colorBorder: string; $colorBgLayout: string }>`
    .adp-search-input {
        width: ${MODAL_CONFIG.SEARCH_INPUT_WIDTH};
    }

    .adp-main-content {
        margin-top: 16px;
        display: flex;
        flex-direction: column;
        border: 1px solid ${(props) => props.$colorBorder};
        border-radius: 6px;
    }

    .adp-header-row {
        display: grid;
        grid-template-columns: 2fr 1fr;
        background-color: ${(props) => props.$colorBgLayout};
        border-bottom: 1px solid ${(props) => props.$colorBorder};
        font-weight: 500;
    }

    .adp-available-columns-header {
        line-height: 40px;
        padding: 0 16px;
        display: flex;
        align-items: center;

        .adp-header-title {
            flex: 1;
        }
    }

    .adp-selected-columns-header {
        line-height: 40px;
        display: flex;
        align-items: center;
        padding: 0 16px;
        border-left: 1px solid ${(props) => props.$colorBorder};

        .adp-header-title {
            flex: 1;
        }

        .adp-clear-link {
            font-weight: normal;
            user-select: none;
        }
    }

    .adp-content-body {
        display: grid;
        grid-template-columns: 2fr 1fr;
        height: ${MODAL_CONFIG.CONTENT_HEIGHT}px;
    }

    .adp-available-columns-list {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        row-gap: 16px;
        padding: 16px 0;
        .adp-column-item {
            width: calc(1 / 2 * 100%);
            padding: 0px 16px;
            list-style: none;
            display: flex;
            align-items: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .adp-selected-columns-table {
        border-left: 1px solid ${(props) => props.$colorBorder};
        .ant-table-wrapper {
            border: none;
        }

        .ant-table {
            border: none;
        }

        .ant-table-tbody > tr > td {
            border-bottom: 0px solid ${(props) => props.$colorBorder};
            padding: 8px 16px;
        }

        .ant-table-tbody > tr:last-child > td {
            border-bottom: none;
        }
    }

    .adp-footer-buttons {
        margin-top: 24px;
        text-align: right;
    }
`

export const DeleteIcon = styled.span`
    cursor: pointer;
    font-size: 14px;

    &:hover {
        color: #ff7875;
    }
`
