import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { Loader2, Briefcase, Users, CheckCircle, XCircle, Clock, Eye } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import CandidateDetailsDialog from './CandidateDetailsDialog'

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentApplications, setRecentApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [selectedAppId, setSelectedAppId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);

    const handleViewCandidate = (applicant, appId, status) => {
        setSelectedCandidate(applicant);
        setSelectedAppId(appId);
        setSelectedStatus(status);
        setDialogOpen(true);
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${JOB_API_END_POINT}/stats`, { withCredentials: true });
                if (res.data.success) {
                    setStats(res.data.stats);
                    setRecentApplications(res.data.recentApplications);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div>
                <Navbar />
                <div className='flex items-center justify-center h-screen'>
                    <Loader2 className='h-8 w-8 animate-spin text-[#6A38C2]' />
                </div>
            </div>
        )
    }

    const statCards = [
        { label: 'Total Jobs', value: stats?.totalJobs || 0, icon: <Briefcase className='w-8 h-8 text-[#6A38C2]' />, bg: 'bg-purple-50 border-purple-200' },
        { label: 'Total Applicants', value: stats?.totalApplicants || 0, icon: <Users className='w-8 h-8 text-blue-600' />, bg: 'bg-blue-50 border-blue-200' },
        { label: 'Pending', value: stats?.pending || 0, icon: <Clock className='w-8 h-8 text-yellow-600' />, bg: 'bg-yellow-50 border-yellow-200' },
        { label: 'Accepted', value: stats?.accepted || 0, icon: <CheckCircle className='w-8 h-8 text-green-600' />, bg: 'bg-green-50 border-green-200' },
        { label: 'Rejected', value: stats?.rejected || 0, icon: <XCircle className='w-8 h-8 text-red-600' />, bg: 'bg-red-50 border-red-200' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4'>
                <h1 className='font-bold text-2xl mb-8 text-gray-900'>Recruiter Dashboard</h1>

                {/* Stats Cards */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10'>
                    {statCards.map((card, index) => (
                        <div key={index} className={`p-5 rounded-xl border ${card.bg} flex flex-col items-center gap-2 shadow-sm bg-white`}>
                            {card.icon}
                            <p className='text-2xl font-bold'>{card.value}</p>
                            <p className='text-xs font-semibold uppercase tracking-wider text-gray-500'>{card.label}</p>
                        </div>
                    ))}
                </div>

                {/* Recent Applications */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h2 className='font-bold text-xl mb-4 text-gray-900'>Recent Applications</h2>
                    {recentApplications.length === 0 ? (
                        <p className='text-gray-400 py-6 text-center'>No applications received yet.</p>
                    ) : (
                        <Table>
                            <TableHeader className="bg-gray-50/80">
                                <TableRow>
                                    <TableHead>Applicant</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Job Title</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentApplications.map((app) => (
                                    <TableRow key={app._id} className="hover:bg-purple-50/20 transition-colors">
                                        <TableCell>
                                            <button
                                                onClick={() => handleViewCandidate(app?.applicant, app._id, app.status)}
                                                className="font-bold text-gray-900 text-sm hover:text-[#6A38C2] hover:underline text-left block"
                                            >
                                                {app?.applicant?.fullname}
                                            </button>
                                        </TableCell>
                                        <TableCell className="text-gray-600 text-xs">{app?.applicant?.email}</TableCell>
                                        <TableCell className="font-medium text-xs">{app?.job?.title}</TableCell>
                                        <TableCell className="text-gray-600 text-xs">{app?.job?.company?.name}</TableCell>
                                        <TableCell className="text-xs text-gray-500">{app?.createdAt?.split("T")[0]}</TableCell>
                                        <TableCell>
                                            <Badge className={
                                                app.status === 'accepted' ? 'bg-green-100 text-green-800 border-none' :
                                                app.status === 'rejected' ? 'bg-red-100 text-red-800 border-none' :
                                                'bg-yellow-100 text-yellow-800 border-none'
                                            }>
                                                {app.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleViewCandidate(app?.applicant, app._id, app.status)}
                                                className="text-xs h-8 px-2.5 gap-1 text-[#6A38C2] border-purple-200 hover:bg-purple-50"
                                            >
                                                <Eye className="w-3.5 h-3.5" /> View Profile
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </div>
            </div>

            {/* CANDIDATE DETAILS DIALOG */}
            <CandidateDetailsDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                candidate={selectedCandidate}
                applicationId={selectedAppId}
                currentStatus={selectedStatus}
            />
        </div>
    )
}

export default Dashboard
