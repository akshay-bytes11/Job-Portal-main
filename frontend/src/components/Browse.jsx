import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import useGetSavedJobs from '@/hooks/useGetSavedJobs';
import JobCardSkeleton from './skeletons/JobCardSkeleton';

const Browse = () => {
    const [loading, setLoading] = useState(true);
    useGetAllJobs();
    useGetSavedJobs();
    const {allJobs} = useSelector(store=>store.job);
    const dispatch = useDispatch();

    useEffect(() => {
        // Give time for the hook to fetch data
        const timer = setTimeout(() => setLoading(false), 800);
        return () => {
            clearTimeout(timer);
            dispatch(setSearchedQuery(""));
        }
    }, [])

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Search Results ({allJobs.length})</h1>
                <div className='grid grid-cols-3 gap-4'>
                    {
                        loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <JobCardSkeleton key={`skeleton-${index}`} />
                            ))
                        ) : (
                            allJobs.map((job) => {
                                return (
                                    <Job key={job._id} job={job}/>
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse