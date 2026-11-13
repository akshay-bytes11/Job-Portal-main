import { setSavedJobIds } from '@/redux/savedJobSlice'
import { SAVED_JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetSavedJobs = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    useEffect(() => {
        const fetchSavedJobIds = async () => {
            try {
                const res = await axios.get(`${SAVED_JOB_API_END_POINT}/check`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSavedJobIds(res.data.savedJobIds));
                }
            } catch (error) {
                console.log(error);
            }
        }
        if (user) {
            fetchSavedJobIds();
        }
    }, [user])
}

export default useGetSavedJobs
