import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal, Eye, ExternalLink, Globe, Github, Code, GraduationCap, CheckCircle, XCircle } from 'lucide-react';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { setAllApplicants } from '@/redux/applicationSlice';
import axios from 'axios';
import CandidateDetailsDialog from './CandidateDetailsDialog';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);
    const dispatch = useDispatch();

    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [selectedAppId, setSelectedAppId] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleViewProfile = (candidate, appId, status) => {
        setSelectedCandidate(candidate);
        setSelectedAppId(appId);
        setSelectedStatus(status);
        setOpenDialog(true);
    };

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
                // Optimistically update Redux store
                if (applicants?.applications) {
                    const updatedApps = applicants.applications.map(app => 
                        app._id === id ? { ...app, status: status.toLowerCase() } : app
                    );
                    dispatch(setAllApplicants({ ...applicants, applications: updatedApps }));
                }
                setSelectedStatus(status.toLowerCase());
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <Table>
                <TableCaption>A comprehensive list of applicants for this position</TableCaption>
                <TableHeader className="bg-gray-50/80">
                    <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Education & CGPA</TableHead>
                        <TableHead>Profiles</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Applied Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {(!applicants?.applications || applicants.applications.length === 0) ? (
                        <TableRow>
                            <TableCell colSpan={8} className="text-center py-10 text-gray-400">
                                No applicants have applied for this job yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        applicants.applications.map((item) => {
                            const applicant = item?.applicant;
                            const profile = applicant?.profile;
                            const college = profile?.education?.college;
                            const status = item?.status || 'pending';

                            return (
                                <TableRow key={item._id} className="hover:bg-purple-50/20 transition-colors">
                                    {/* CANDIDATE INFO */}
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-10 w-10 border border-purple-100">
                                                <AvatarImage src={profile?.profilePhoto || "https://github.com/shadcn.png"} />
                                            </Avatar>
                                            <div>
                                                <button
                                                    onClick={() => handleViewProfile(applicant, item._id, status)}
                                                    className="font-bold text-gray-900 text-sm hover:text-[#6A38C2] hover:underline text-left block"
                                                >
                                                    {applicant?.fullname}
                                                </button>
                                                <span className="text-[11px] font-medium text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded">
                                                    {profile?.experienceYears || "Fresher"}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    {/* EDUCATION & CGPA */}
                                    <TableCell>
                                        {college?.name || college?.degree ? (
                                            <div>
                                                <p className="text-xs font-semibold text-gray-800 line-clamp-1">
                                                    {college?.degree} {college?.branch && `(${college?.branch})`}
                                                </p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-[11px] text-gray-500 truncate max-w-[130px]">{college?.name}</span>
                                                    {college?.cgpa && (
                                                        <span className="text-[10px] font-bold text-[#6A38C2] bg-purple-50 px-1 rounded">
                                                            {college.cgpa} CGPA
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-gray-400 italic">Not specified</span>
                                        )}
                                    </TableCell>

                                    {/* CODING & SOCIAL PROFILES */}
                                    <TableCell>
                                        <div className="flex items-center gap-1.5">
                                            {profile?.linkedin && (
                                                <a href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`} target="_blank" rel="noreferrer" title="LinkedIn" className="p-1 rounded text-blue-600 hover:bg-blue-50">
                                                    <Globe className="w-3.5 h-3.5" />
                                                </a>
                                            )}
                                            {profile?.github && (
                                                <a href={profile.github.startsWith('http') ? profile.github : `https://${profile.github}`} target="_blank" rel="noreferrer" title="GitHub" className="p-1 rounded text-gray-800 hover:bg-gray-100">
                                                    <Github className="w-3.5 h-3.5" />
                                                </a>
                                            )}
                                            {profile?.leetcode && (
                                                <a href={profile.leetcode.startsWith('http') ? profile.leetcode : `https://${profile.leetcode}`} target="_blank" rel="noreferrer" title="LeetCode" className="p-1 rounded text-amber-700 hover:bg-amber-50">
                                                    <Code className="w-3.5 h-3.5" />
                                                </a>
                                            )}
                                            {profile?.portfolio && (
                                                <a href={profile.portfolio.startsWith('http') ? profile.portfolio : `https://${profile.portfolio}`} target="_blank" rel="noreferrer" title="Portfolio" className="p-1 rounded text-purple-700 hover:bg-purple-50">
                                                    <ExternalLink className="w-3.5 h-3.5" />
                                                </a>
                                            )}
                                            {!profile?.linkedin && !profile?.github && !profile?.leetcode && !profile?.portfolio && (
                                                <span className="text-xs text-gray-400">—</span>
                                            )}
                                        </div>
                                    </TableCell>

                                    {/* CONTACT */}
                                    <TableCell>
                                        <div className="text-xs space-y-0.5">
                                            <p className="text-gray-800">{applicant?.email}</p>
                                            <p className="text-gray-500">{applicant?.phoneNumber || "N/A"}</p>
                                        </div>
                                    </TableCell>

                                    {/* RESUME */}
                                    <TableCell>
                                        {profile?.resume ? (
                                            <a
                                                className="text-xs font-semibold text-[#6A38C2] hover:underline inline-flex items-center gap-1"
                                                href={profile.resume}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                📄 Resume
                                            </a>
                                        ) : (
                                            <span className="text-xs text-gray-400">NA</span>
                                        )}
                                    </TableCell>

                                    {/* APPLIED DATE */}
                                    <TableCell className="text-xs text-gray-500">
                                        {item?.createdAt ? new Date(item.createdAt).toLocaleDateString() : "NA"}
                                    </TableCell>

                                    {/* STATUS */}
                                    <TableCell>
                                        <Badge className={`text-xs capitalize ${
                                            status === 'accepted' 
                                                ? 'bg-green-100 text-green-800 hover:bg-green-100 border-none'
                                                : status === 'rejected'
                                                ? 'bg-red-100 text-red-800 hover:bg-red-100 border-none'
                                                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-none'
                                        }`}>
                                            {status}
                                        </Badge>
                                    </TableCell>

                                    {/* ACTIONS */}
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleViewProfile(applicant, item._id, status)}
                                                className="text-xs h-8 px-2.5 gap-1.5 text-[#6A38C2] border-purple-200 hover:bg-purple-50"
                                            >
                                                <Eye className="w-3.5 h-3.5" /> View Profile
                                            </Button>

                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="w-4 h-4 text-gray-600" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-36 p-1.5" align="end">
                                                    <p className="text-[11px] font-bold text-gray-400 px-2 py-1 uppercase tracking-wider">Change Status</p>
                                                    {shortlistingStatus.map((s, idx) => (
                                                        <button
                                                            key={idx}
                                                            onClick={() => statusHandler(s, item._id)}
                                                            className={`w-full text-left px-2 py-1.5 text-xs rounded hover:bg-gray-100 flex items-center gap-2 ${
                                                                s === 'Accepted' ? 'text-green-700 font-medium' : 'text-red-700 font-medium'
                                                            }`}
                                                        >
                                                            {s === 'Accepted' ? <CheckCircle className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                                            {s}
                                                        </button>
                                                    ))}
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    )}
                </TableBody>
            </Table>

            {/* CANDIDATE DETAILS MODAL */}
            <CandidateDetailsDialog
                open={openDialog}
                setOpen={setOpenDialog}
                candidate={selectedCandidate}
                applicationId={selectedAppId}
                currentStatus={selectedStatus}
                onStatusUpdate={statusHandler}
            />
        </div>
    )
}

export default ApplicantsTable