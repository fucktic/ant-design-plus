import React from 'react'

interface TrackProps {
    direction: 'vertical' | 'horizontal'
    className?: string
    style?: React.CSSProperties
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
    children?: React.ReactNode
}

const Track: React.FC<TrackProps> = ({ direction, className = '', style, onClick, children }) => {
    const directionClass =
        direction === 'vertical' ? 'adp-scrollbar-track-vertical' : 'adp-scrollbar-track-horizontal'

    return (
        <div
            className={`adp-scrollbar-track ${directionClass} ${className}`}
            style={style}
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default Track
