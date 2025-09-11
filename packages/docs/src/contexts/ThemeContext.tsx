/*
 * @Author: xuwei
 * @Date: 2025-09-11 11:00:57
 * @LastEditors: lisaxw lisaxw@qq.com
 * @LastEditTime: 2025-09-11 12:14:37
 * @Description: Do not edit
 */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
    themeMode: ThemeMode
    isDark: boolean
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
        const saved = localStorage.getItem('theme-mode')
        return (saved as ThemeMode) || 'light'
    })

    const toggleTheme = () => {
        setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'))
    }

    useEffect(() => {
        localStorage.setItem('theme-mode', themeMode)
        document.documentElement.setAttribute('data-theme', themeMode)

        // 更新 Tailwind 的暗色模式类
        if (themeMode === 'dark') {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [themeMode])

    const isDark = themeMode === 'dark'

    return (
        <ThemeContext.Provider value={{ themeMode, isDark, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
