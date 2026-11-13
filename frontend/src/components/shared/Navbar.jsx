import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [status, setStatus] = useState("Ready to interview");
    const statusOptions = ["Ready to interview", "Open to offers", "Actively exploring", "Hiring now"];

    const changeStatusHandler = () => {
        const nextIdx = (statusOptions.indexOf(status) + 1) % statusOptions.length;
        setStatus(statusOptions[nextIdx]);
        toast.success(`Status updated to: "${statusOptions[nextIdx]}"`);
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/dashboard" className='hover:text-[#6A38C2] transition-colors'>Dashboard</Link></li>
                                    <li><Link to="/admin/companies" className='hover:text-[#6A38C2] transition-colors'>Companies</Link></li>
                                    <li><Link to="/admin/jobs" className='hover:text-[#6A38C2] transition-colors'>Jobs</Link></li>
                                    <li><Link to="/admin/users" className='hover:text-[#6A38C2] transition-colors'>Users</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/" className='hover:text-[#6A38C2] transition-colors'>Home</Link></li>
                                    <li><Link to="/jobs" className='hover:text-[#6A38C2] transition-colors'>Jobs</Link></li>
                                    <li><Link to="/browse" className='hover:text-[#6A38C2] transition-colors'>Browse</Link></li>
                                    {user && <li><Link to="/saved-jobs" className='hover:text-[#6A38C2] transition-colors'>Saved Jobs</Link></li>}
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer ring-2 ring-transparent hover:ring-[#6A38C2]/30 transition-all">
                                        <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt={user?.fullname} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-72 p-4 bg-white rounded-xl shadow-xl border border-gray-200" align="end">
                                    {/* User Info Header */}
                                    <div className='flex items-center gap-3 pb-3'>
                                        <Avatar className="w-12 h-12 border border-gray-100 shadow-sm">
                                            <AvatarImage src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} alt={user?.fullname} />
                                        </Avatar>
                                        <div className='flex-1 min-w-0'>
                                            <h4 className='font-bold text-gray-900 text-base leading-tight truncate'>{user?.fullname}</h4>
                                            <div className='flex items-center justify-between mt-1'>
                                                <span className='text-xs text-gray-500 truncate'>{status}</span>
                                                <button 
                                                    onClick={changeStatusHandler} 
                                                    className='text-xs font-semibold text-blue-600 hover:text-blue-700 hover:underline ml-1 cursor-pointer'
                                                >
                                                    Change
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <hr className='border-gray-100 my-1' />

                                    {/* Personal Section */}
                                    <div className='py-2'>
                                        <p className='text-xs font-medium text-gray-400 mb-2'>Personal</p>
                                        <div className='flex flex-col space-y-1 text-sm text-gray-800 font-medium'>
                                            <div 
                                                onClick={() => navigate('/profile')} 
                                                className='py-1.5 px-2 -mx-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors'
                                            >
                                                Edit profile
                                            </div>
                                            <div 
                                                onClick={() => toast.info('Cookie preferences updated.')} 
                                                className='py-1.5 px-2 -mx-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors'
                                            >
                                                Cookie Preferences
                                            </div>
                                            <div 
                                                onClick={() => navigate('/profile')} 
                                                className='py-1.5 px-2 -mx-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors'
                                            >
                                                Settings
                                            </div>
                                            <div 
                                                onClick={() => toast('You have 0 new notifications')} 
                                                className='py-1.5 px-2 -mx-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors'
                                            >
                                                Notifications
                                            </div>
                                            <div 
                                                onClick={() => {
                                                    navigator.clipboard.writeText(window.location.origin + '?ref=' + (user?._id || 'jobportal'));
                                                    toast.success('Referral link copied to clipboard!');
                                                }} 
                                                className='py-1.5 px-2 -mx-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors'
                                            >
                                                Referrals
                                            </div>
                                        </div>
                                    </div>

                                    <hr className='border-gray-100 my-1' />

                                    {/* Support Section */}
                                    <div className='py-2'>
                                        <p className='text-xs font-medium text-gray-400 mb-2'>Support</p>
                                        <div className='flex flex-col space-y-1 text-sm text-gray-800 font-medium'>
                                            <div 
                                                onClick={() => toast.info('Support: Contact us at support@jobportal.com')} 
                                                className='py-1.5 px-2 -mx-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors'
                                            >
                                                Help
                                            </div>
                                            <div 
                                                onClick={() => toast.success('All systems operational (100% uptime)')} 
                                                className='py-1.5 px-2 -mx-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors flex items-center justify-between'
                                            >
                                                <span>Status</span>
                                                <span className='w-2 h-2 rounded-full bg-emerald-500'></span>
                                            </div>
                                            <div 
                                                onClick={logoutHandler} 
                                                className='py-1.5 px-2 -mx-2 rounded-md hover:bg-red-50 text-gray-800 hover:text-red-600 cursor-pointer transition-colors'
                                            >
                                                Log out
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button: POST A JOB */}
                                    <div className='pt-2'>
                                        <button
                                            onClick={() => {
                                                if (user?.role === 'recruiter') {
                                                    navigate('/admin/jobs/create');
                                                } else {
                                                    toast.info('Recruiter account needed to post jobs. Log in with your admin/recruiter account!');
                                                }
                                            }}
                                            className='w-full py-2.5 px-4 bg-[#E8F0FE] hover:bg-[#D2E3FC] text-[#1967D2] font-bold text-xs uppercase tracking-wider rounded-lg transition-colors text-center shadow-sm cursor-pointer'
                                        >
                                            POST A JOB
                                        </button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar