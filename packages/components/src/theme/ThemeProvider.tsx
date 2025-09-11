import React from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { defaultTheme } from './theme'

export interface Theme {
    colors: {
        primary: string
        secondary: string
        success: string
        warning: string
        error: string
        info: string
        text: {
            primary: string
            secondary: string
            disabled: string
        }
        background: {
            primary: string
            secondary: string
            disabled: string
        }
        border: {
            primary: string
            secondary: string
        }
    }
    spacing: {
        xs: string
        sm: string
        md: string
        lg: string
        xl: string
        xxl: string
    }
    borderRadius: {
        sm: string
        md: string
        lg: string
        xl: string
    }
    shadows: {
        sm: string
        md: string
        lg: string
        xl: string
    }
    breakpoints: {
        xs: string
        sm: string
        md: string
        lg: string
        xl: string
    }
}

export interface ThemeProviderProps {
    theme?: Partial<Theme>
    children: React.ReactNode
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme = {}, children }) => {
    const mergedTheme = {
        ...defaultTheme,
        ...theme,
        colors: {
            ...defaultTheme.colors,
            ...theme.colors,
            text: {
                ...defaultTheme.colors.text,
                ...theme.colors?.text,
            },
            background: {
                ...defaultTheme.colors.background,
                ...theme.colors?.background,
            },
            border: {
                ...defaultTheme.colors.border,
                ...theme.colors?.border,
            },
        },
        spacing: {
            ...defaultTheme.spacing,
            ...theme.spacing,
        },
        borderRadius: {
            ...defaultTheme.borderRadius,
            ...theme.borderRadius,
        },
        shadows: {
            ...defaultTheme.shadows,
            ...theme.shadows,
        },
        breakpoints: {
            ...defaultTheme.breakpoints,
            ...theme.breakpoints,
        },
    }

    return <StyledThemeProvider theme={mergedTheme}>{children as any}</StyledThemeProvider>
}

export default ThemeProvider
