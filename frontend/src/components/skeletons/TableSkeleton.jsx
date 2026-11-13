import React from 'react'

const TableSkeleton = ({ rows = 5, cols = 4 }) => {
    return (
        <div className='animate-pulse'>
            {/* Header */}
            <div className='flex gap-4 p-4 border-b'>
                {Array.from({ length: cols }).map((_, i) => (
                    <div key={`header-${i}`} className='h-4 bg-gray-200 rounded flex-1'></div>
                ))}
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={`row-${rowIndex}`} className='flex gap-4 p-4 border-b'>
                    {Array.from({ length: cols }).map((_, colIndex) => (
                        <div key={`cell-${rowIndex}-${colIndex}`} className='h-4 bg-gray-200 rounded flex-1'></div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default TableSkeleton
