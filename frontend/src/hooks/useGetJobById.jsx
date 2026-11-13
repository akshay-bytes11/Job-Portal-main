import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useState } from 'react'

const useGetJobById = (jobId) => {
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    setJob(res.data.job);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        if (jobId) {
            fetchJob();
        }
    }, [jobId])

    return { job, loading };
}

export default useGetJobById
