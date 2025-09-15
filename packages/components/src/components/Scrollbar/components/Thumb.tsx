import React, { forwardRef } from 'react'

interface ThumbProps {
    direction: 'vertical' | 'horizontal'
    className?: string
    style?: React.CSSProperties
    onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Thumb = forwardRef<HTMLDivElement, ThumbProps>(
    ({ direction, className = '', style, onMouseDown }, ref) => {
        const directionClass =
            direction === 'vertical'
                ? 'adp-scrollbar-thumb-vertical'
                : 'adp-scrollbar-thumb-horizontal'

        return (
            <div
                ref={ref}
                className={`adp-scrollbar-thumb ${directionClass} ${className}`}
                style={style}
                onMouseDown={onMouseDown}
            />
        )
    }
)

Thumb.displayName = 'Thumb'

export default Thumb
