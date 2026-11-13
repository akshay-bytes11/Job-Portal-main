import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import axios from 'axios'
import { SAVED_JOB_API_END_POINT } from '@/utils/constant'
import { useSelector } from 'react-redux'

const SavedJobs = () => {
    const [savedJobs, setSavedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useSelector(store => store.auth);

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${SAVED_JOB_API_END_POINT}/saved`, { withCredentials: true });
                if (res.data.success) {
                    setSavedJobs(res.data.savedJobs);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        if (user) {
            fetchSavedJobs();
        }
    }, [user]);

    return (
        <div>
            <Navbar />
            <div className='max-w-7xl mx-auto my-10'>
                <h1 className='font-bold text-xl my-10'>Saved Jobs ({savedJobs.length})</h1>
                {loading ? (
                    <p className='text-gray-500'>Loading saved jobs...</p>
                ) : savedJobs.length === 0 ? (
                    <p className='text-gray-500'>You haven't saved any jobs yet. Browse jobs and click "Save For Later" to add them here.</p>
                ) : (
                    <div className='grid grid-cols-3 gap-4'>
                        {savedJobs.map((savedJob) => (
                            savedJob.job && <Job key={savedJob._id} job={savedJob.job} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SavedJobs
