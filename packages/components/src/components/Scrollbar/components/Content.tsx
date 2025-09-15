import React, { forwardRef } from 'react'

interface ContentProps {
    children: React.ReactNode
    className?: string
}

const Content = forwardRef<HTMLDivElement, ContentProps>(({ children, className = '' }, ref) => {
    return (
        <div
            ref={ref}
            className={`adp-scrollbar-content ${className}`}
        >
            {children}
        </div>
    )
})

Content.displayName = 'Content'

export default Content
