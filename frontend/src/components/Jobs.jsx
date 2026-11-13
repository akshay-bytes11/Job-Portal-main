import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import useGetSavedJobs from '@/hooks/useGetSavedJobs';
import { Button } from './ui/button';

const Jobs = () => {
    const { allJobs, searchedQuery, currentPage, totalPages } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);
    const [page, setPage] = useState(1);
    
    useGetAllJobs(page);
    useGetSavedJobs();

    useEffect(() => {
        if (searchedQuery) {
            const queryLower = searchedQuery.toLowerCase().trim();
            const isSalaryQuery = queryLower.includes("lpa") || queryLower.includes("lakh") || queryLower.includes("k");

            let minSalary = 0, maxSalary = Infinity;
            if (isSalaryQuery) {
                if (queryLower === "0-40k" || queryLower === "0-6 lpa") { minSalary = 0; maxSalary = 6; }
                else if (queryLower === "42-1lakh" || queryLower === "6-12 lpa") { minSalary = 6; maxSalary = 12; }
                else if (queryLower === "1lakh to 5lakh" || queryLower === "12-25 lpa") { minSalary = 12; maxSalary = 25; }
                else if (queryLower === "25+ lpa") { minSalary = 25; maxSalary = 999; }
            }

            const filteredJobs = allJobs.filter((job) => {
                if (isSalaryQuery && job.salary !== undefined) {
                    return job.salary >= minSalary && job.salary <= maxSalary;
                }
                return (
                    job.title?.toLowerCase().includes(queryLower) ||
                    job.description?.toLowerCase().includes(queryLower) ||
                    job.location?.toLowerCase().includes(queryLower) ||
                    job.requirements?.some(r => r.toLowerCase().includes(queryLower))
                );
            });
            setFilterJobs(filteredJobs);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto mt-5'>
                <div className='flex gap-5'>
                    <div className='w-20%'>
                        <FilterCard />
                    </div>
                    {
                        filterJobs.length <= 0 ? (
                            <div className='flex-1 flex flex-col items-center justify-center h-[50vh] text-center p-8 bg-white rounded-lg border border-dashed border-gray-200'>
                                <p className='text-lg font-semibold text-gray-700'>No jobs found</p>
                                <p className='text-sm text-gray-400 mt-1'>
                                    {searchedQuery ? `No jobs match "${searchedQuery}". Try another filter or search term.` : 'No jobs have been posted yet.'}
                                </p>
                            </div>
                        ) : (
                            <div className='flex-1 h-[88vh] overflow-y-auto pb-5'>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        filterJobs.map((job) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{ duration: 0.3 }}
                                                key={job?._id}>
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className='flex items-center justify-center gap-2 mt-8'>
                                        <Button
                                            variant="outline"
                                            onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                        >
                                            Previous
                                        </Button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                            <Button
                                                key={pageNum}
                                                variant={currentPage === pageNum ? "default" : "outline"}
                                                className={currentPage === pageNum ? "bg-[#6A38C2]" : ""}
                                                onClick={() => setPage(pageNum)}
                                            >
                                                {pageNum}
                                            </Button>
                                        ))}
                                        <Button
                                            variant="outline"
                                            onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Jobs