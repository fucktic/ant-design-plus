import React, { forwardRef } from 'react'

interface ContentWrapperProps {
    children: React.ReactNode
    className?: string
    onScroll?: (event: React.UIEvent<HTMLDivElement>) => void
}

const ContentWrapper = forwardRef<HTMLDivElement, ContentWrapperProps>(
    ({ children, className = '', onScroll }, ref) => {
        return (
            <div
                ref={ref}
                className={`adp-scrollbar-content-wrapper ${className}`}
                onScroll={onScroll}
            >
                {children}
            </div>
        )
    }
)

ContentWrapper.displayName = 'ContentWrapper'

export default ContentWrapper
