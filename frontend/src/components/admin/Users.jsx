import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { Users as UsersIcon, UserCheck, Shield, Loader2, Eye } from 'lucide-react'
import CandidateDetailsDialog from './CandidateDetailsDialog'

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    const [selectedUser, setSelectedUser] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleViewProfile = (user) => {
        setSelectedUser(user);
        setDialogOpen(true);
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${USER_API_END_POINT}/all-users`, { withCredentials: true });
                if (res.data.success) {
                    setUsers(res.data.users);
                    setFilteredUsers(res.data.users);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        if (search.trim()) {
            const query = search.toLowerCase();
            setFilteredUsers(
                users.filter(u =>
                    u.fullname?.toLowerCase().includes(query) ||
                    u.email?.toLowerCase().includes(query) ||
                    u.role?.toLowerCase().includes(query) ||
                    u.profile?.skills?.some(s => s.toLowerCase().includes(query)) ||
                    u.profile?.education?.college?.name?.toLowerCase().includes(query)
                )
            );
        } else {
            setFilteredUsers(users);
        }
    }, [search, users]);

    const totalStudents = users.filter(u => u.role === 'student').length;
    const totalRecruiters = users.filter(u => u.role === 'recruiter').length;

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 px-4'>
                <div className='mb-6'>
                    <h1 className='text-2xl font-bold text-gray-900'>Candidate & User Directory</h1>
                    <p className='text-sm text-gray-500'>Search, review qualifications, and monitor all registered students and recruiters</p>
                </div>

                {/* Stats Summary */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-8'>
                    <div className='bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between'>
                        <div>
                            <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Total Registered</p>
                            <h3 className='text-2xl font-bold text-gray-900 mt-1'>{users.length}</h3>
                        </div>
                        <div className='p-3 bg-blue-50 text-blue-600 rounded-full'>
                            <UsersIcon className='w-6 h-6' />
                        </div>
                    </div>

                    <div className='bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between'>
                        <div>
                            <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Students & Job Seekers</p>
                            <h3 className='text-2xl font-bold text-emerald-600 mt-1'>{totalStudents}</h3>
                        </div>
                        <div className='p-3 bg-emerald-50 text-emerald-600 rounded-full'>
                            <UserCheck className='w-6 h-6' />
                        </div>
                    </div>

                    <div className='bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between'>
                        <div>
                            <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider'>Recruiters & Admins</p>
                            <h3 className='text-2xl font-bold text-[#6A38C2] mt-1'>{totalRecruiters}</h3>
                        </div>
                        <div className='p-3 bg-purple-50 text-[#6A38C2] rounded-full'>
                            <Shield className='w-6 h-6' />
                        </div>
                    </div>
                </div>

                {/* Search Bar */}
                <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 my-5'>
                    <Input
                        className="w-full sm:w-96 bg-white shadow-sm"
                        placeholder="Search by name, email, skill, or college..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <span className='text-xs text-gray-500 font-medium'>
                        Showing {filteredUsers.length} of {users.length} users
                    </span>
                </div>

                {/* Users Table */}
                <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
                    {loading ? (
                        <div className='flex items-center justify-center p-12'>
                            <Loader2 className='w-8 h-8 animate-spin text-[#6A38C2]' />
                        </div>
                    ) : (
                        <Table>
                            <TableCaption>A comprehensive list of platform users</TableCaption>
                            <TableHeader className="bg-gray-50/80">
                                <TableRow>
                                    <TableHead>User / Candidate</TableHead>
                                    <TableHead>Education & College</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Joined</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-10 text-gray-400">
                                            No users found matching your search.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredUsers.map((u) => {
                                        const college = u.profile?.education?.college;
                                        return (
                                            <TableRow key={u._id} className="hover:bg-purple-50/20 transition-colors">
                                                <TableCell>
                                                    <div className='flex items-center gap-3'>
                                                        <Avatar className="border border-purple-100">
                                                            <AvatarImage src={u.profile?.profilePhoto || "https://github.com/shadcn.png"} />
                                                        </Avatar>
                                                        <div>
                                                            <button
                                                                onClick={() => handleViewProfile(u)}
                                                                className='font-bold text-gray-900 text-sm hover:text-[#6A38C2] hover:underline text-left block'
                                                            >
                                                                {u.fullname}
                                                            </button>
                                                            {u.role === 'student' && (
                                                                <span className="text-[11px] text-purple-700 bg-purple-50 px-1.5 py-0.2 rounded font-medium">
                                                                    {u.profile?.experienceYears || "Fresher"}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </TableCell>

                                                <TableCell>
                                                    {college?.name || college?.degree ? (
                                                        <div>
                                                            <p className="text-xs font-semibold text-gray-800 line-clamp-1">
                                                                {college?.degree} {college?.branch && `(${college?.branch})`}
                                                            </p>
                                                            <div className="flex items-center gap-1.5 mt-0.5">
                                                                <span className="text-[11px] text-gray-500 truncate max-w-[130px]">{college?.name}</span>
                                                                {college?.cgpa && (
                                                                    <span className="text-[10px] font-bold text-[#6A38C2] bg-purple-50 px-1 rounded">
                                                                        {college.cgpa} CGPA
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 italic">Not added</span>
                                                    )}
                                                </TableCell>

                                                <TableCell>
                                                    {u.role === 'recruiter' ? (
                                                        <Badge className="bg-purple-100 text-[#6A38C2] hover:bg-purple-100 border-none font-semibold">
                                                            Recruiter
                                                        </Badge>
                                                    ) : (
                                                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-none font-semibold">
                                                            Student
                                                        </Badge>
                                                    )}
                                                </TableCell>

                                                <TableCell>
                                                    <div className="text-xs text-gray-600">
                                                        <p>{u.email}</p>
                                                        <p className="text-gray-400">{u.phoneNumber || "N/A"}</p>
                                                    </div>
                                                </TableCell>

                                                <TableCell className="text-xs text-gray-500">
                                                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : "N/A"}
                                                </TableCell>

                                                <TableCell className="text-right">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleViewProfile(u)}
                                                        className="text-xs h-8 px-2.5 gap-1.5 text-[#6A38C2] border-purple-200 hover:bg-purple-50"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" /> View Details
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>

            {/* CANDIDATE DETAILS DIALOG */}
            <CandidateDetailsDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                candidate={selectedUser}
            />
        </div>
    )
}

export default Users
