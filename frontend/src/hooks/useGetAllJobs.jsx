import { setAllJobs, setPagination } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllJobs = (page = 1) => {
    const dispatch = useDispatch();
    const {searchedQuery} = useSelector(store=>store.job);
    useEffect(()=>{
        const fetchAllJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchedQuery}&page=${page}&limit=6`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllJobs(res.data.jobs));
                    dispatch(setPagination({
                        totalJobs: res.data.totalJobs,
                        currentPage: res.data.currentPage,
                        totalPages: res.data.totalPages,
                    }));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobs();
    },[page, searchedQuery])
}

export default useGetAllJobs