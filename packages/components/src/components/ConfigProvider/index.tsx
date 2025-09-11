import React, { createContext, useContext } from 'react'
import { ConfigProvider as AntdConfigProvider } from 'antd'

export interface ConfigProviderProps {
    /**
     * 组件类名前缀，默认为 'adp'
     */
    prefixCls?: string
    /**
     * 子组件
     */
    children?: any
    /**
     * Ant Design ConfigProvider 的其他属性
     */
    [key: string]: any
}

interface ConfigContextType {
    prefixCls: string
}

const ConfigContext = createContext<ConfigContextType>({
    prefixCls: 'adp',
})

export const useConfig = () => useContext(ConfigContext)

const ConfigProvider: React.FC<ConfigProviderProps> = ({
    prefixCls = 'adp',
    children,
    ...props
}) => {
    return (
        <AntdConfigProvider {...props}>
            <ConfigContext.Provider value={{ prefixCls }}>{children as any}</ConfigContext.Provider>
        </AntdConfigProvider>
    )
}

export default ConfigProvider
