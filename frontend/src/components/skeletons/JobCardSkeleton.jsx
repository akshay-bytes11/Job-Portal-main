import React from 'react'

const JobCardSkeleton = () => {
    return (
        <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 animate-pulse'>
            <div className='flex items-center justify-between'>
                <div className='h-4 bg-gray-200 rounded w-24'></div>
                <div className='h-9 w-9 bg-gray-200 rounded-full'></div>
            </div>

            <div className='flex items-center gap-2 my-2'>
                <div className='h-12 w-12 bg-gray-200 rounded-full'></div>
                <div>
                    <div className='h-4 bg-gray-200 rounded w-32 mb-2'></div>
                    <div className='h-3 bg-gray-200 rounded w-20'></div>
                </div>
            </div>

            <div>
                <div className='h-5 bg-gray-200 rounded w-40 my-2'></div>
                <div className='h-3 bg-gray-200 rounded w-full mb-1'></div>
                <div className='h-3 bg-gray-200 rounded w-3/4'></div>
            </div>
            <div className='flex items-center gap-2 mt-4'>
                <div className='h-6 bg-gray-200 rounded-full w-24'></div>
                <div className='h-6 bg-gray-200 rounded-full w-20'></div>
                <div className='h-6 bg-gray-200 rounded-full w-16'></div>
            </div>
            <div className='flex items-center gap-4 mt-4'>
                <div className='h-9 bg-gray-200 rounded w-24'></div>
                <div className='h-9 bg-gray-200 rounded w-28'></div>
            </div>
        </div>
    )
}

export default JobCardSkeleton
