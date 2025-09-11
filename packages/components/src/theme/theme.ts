import { Theme } from './ThemeProvider'

export const defaultTheme: Theme = {
    colors: {
        primary: '#1890ff',
        secondary: '#722ed1',
        success: '#52c41a',
        warning: '#faad14',
        error: '#ff4d4f',
        info: '#1890ff',
        text: {
            primary: '#262626',
            secondary: '#595959',
            disabled: '#bfbfbf',
        },
        background: {
            primary: '#ffffff',
            secondary: '#fafafa',
            disabled: '#f5f5f5',
        },
        border: {
            primary: '#d9d9d9',
            secondary: '#e8e8e8',
        },
    },
    spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
    },
    borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
    },
    shadows: {
        sm: '0 2px 4px rgba(0, 0, 0, 0.1)',
        md: '0 4px 12px rgba(0, 0, 0, 0.15)',
        lg: '0 8px 24px rgba(0, 0, 0, 0.2)',
        xl: '0 12px 32px rgba(0, 0, 0, 0.25)',
    },
    breakpoints: {
        xs: '480px',
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
    },
}
