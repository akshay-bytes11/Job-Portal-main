import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { 
    Contact, 
    Mail, 
    Pen, 
    GraduationCap, 
    Briefcase, 
    Award, 
    Globe, 
    Github, 
    Code, 
    ExternalLink, 
    FileText, 
    Download, 
    Building2, 
    Calendar, 
    Trophy,
    BookOpen,
    CheckCircle2
} from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const formatUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
};

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const profile = user?.profile;
    const isResume = !!profile?.resume;
    const education = profile?.education;

    const hasCollege = education?.college?.name || education?.college?.degree;
    const hasTwelfth = education?.twelfth?.school || education?.twelfth?.board;
    const hasTenth = education?.tenth?.school || education?.tenth?.board;
    const hasAnyEducation = hasCollege || hasTwelfth || hasTenth;

    const hasSocialLinks = profile?.linkedin || profile?.github || profile?.leetcode || profile?.portfolio;

    return (
        <div className="bg-gray-50 min-h-screen pb-16">
            <Navbar />
            
            <div className="max-w-5xl mx-auto px-4 mt-6 space-y-6">
                {/* HERO / HEADER CARD */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm relative overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                            <Avatar className="h-24 w-24 border-4 border-purple-50 shadow-md">
                                <AvatarImage src={profile?.profilePhoto || "https://github.com/shadcn.png"} alt={user?.fullname} />
                            </Avatar>
                            <div>
                                <div className="flex items-center gap-3 flex-wrap">
                                    <h1 className="font-bold text-2xl text-gray-900">{user?.fullname || "Student"}</h1>
                                    <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-[#6A38C2]">
                                        {profile?.experienceYears || "Fresher"}
                                    </span>
                                </div>
                                <p className="text-gray-600 text-sm mt-1 max-w-xl">
                                    {profile?.bio || "No bio added yet. Click edit to introduce yourself to top recruiters."}
                                </p>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mt-3">
                                    <div className="flex items-center gap-1.5">
                                        <Mail className="w-3.5 h-3.5 text-gray-400" />
                                        <span>{user?.email}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Contact className="w-3.5 h-3.5 text-gray-400" />
                                        <span>{user?.phoneNumber || "Not provided"}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button 
                            onClick={() => setOpen(true)} 
                            className="self-start md:self-center bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 gap-2 shadow-sm"
                            variant="outline"
                        >
                            <Pen className="w-4 h-4 text-[#6A38C2]" /> Edit Profile
                        </Button>
                    </div>

                    {/* SOCIAL & CODING LINKS BAR */}
                    <div className="mt-6 pt-5 border-t border-gray-100 flex flex-wrap items-center gap-2.5">
                        <span className="text-xs font-semibold text-gray-500 mr-1 uppercase tracking-wider">Profiles:</span>
                        {profile?.linkedin && (
                            <a
                                href={formatUrl(profile.linkedin)}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors border border-blue-100"
                            >
                                <Globe className="w-3.5 h-3.5" /> LinkedIn
                                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                            </a>
                        )}
                        {profile?.github && (
                            <a
                                href={formatUrl(profile.github)}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors border border-gray-200"
                            >
                                <Github className="w-3.5 h-3.5" /> GitHub
                                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                            </a>
                        )}
                        {profile?.leetcode && (
                            <a
                                href={formatUrl(profile.leetcode)}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-amber-50 text-amber-800 rounded-md hover:bg-amber-100 transition-colors border border-amber-200"
                            >
                                <Code className="w-3.5 h-3.5" /> LeetCode
                                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                            </a>
                        )}
                        {profile?.portfolio && (
                            <a
                                href={formatUrl(profile.portfolio)}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition-colors border border-purple-200"
                            >
                                <Globe className="w-3.5 h-3.5" /> Portfolio
                                <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                            </a>
                        )}
                        {!hasSocialLinks && (
                            <button
                                onClick={() => setOpen(true)}
                                className="text-xs text-[#6A38C2] hover:underline font-medium"
                            >
                                + Add LinkedIn, GitHub, LeetCode, or Portfolio link
                            </button>
                        )}
                    </div>
                </div>

                {/* 2-COLUMN MAIN CONTENT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* LEFT 2 COLUMNS: EDUCATION, PROJECTS, EXPERIENCE */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* EDUCATION SECTION */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <GraduationCap className="w-5 h-5 text-[#6A38C2]" /> Education Background
                                </h2>
                                <button onClick={() => setOpen(true)} className="text-xs text-[#6A38C2] hover:underline font-medium">
                                    Edit
                                </button>
                            </div>

                            {!hasAnyEducation ? (
                                <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <p className="text-sm text-gray-500">No educational details added yet.</p>
                                    <Button onClick={() => setOpen(true)} variant="outline" size="sm" className="mt-2 text-xs text-[#6A38C2] border-[#6A38C2]">
                                        Add College, 12th & 10th Details
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {/* College Card */}
                                    {hasCollege && (
                                        <div className="p-4 rounded-xl border border-purple-100 bg-purple-50/40">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <span className="text-xs font-semibold uppercase tracking-wider text-[#6A38C2]">Higher Education</span>
                                                    <h3 className="font-bold text-gray-900 text-base mt-0.5">
                                                        {education?.college?.name || "College / University"}
                                                    </h3>
                                                    <p className="text-sm text-gray-700 mt-0.5 font-medium">
                                                        {education?.college?.degree} {education?.college?.branch && `— ${education?.college?.branch}`}
                                                    </p>
                                                </div>
                                                {education?.college?.gradYear && (
                                                    <span className="text-xs bg-white text-gray-600 px-2.5 py-1 rounded-md border border-purple-100 font-medium">
                                                        Class of {education?.college?.gradYear}
                                                    </span>
                                                )}
                                            </div>
                                            {education?.college?.cgpa && (
                                                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white text-xs font-bold text-purple-800 border border-purple-200">
                                                    <span>CGPA / SGPA:</span>
                                                    <span className="text-[#6A38C2]">{education?.college?.cgpa}</span>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Schooling Cards (12th & 10th) */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {hasTwelfth && (
                                            <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/70">
                                                <span className="text-xs font-semibold text-gray-500 uppercase">Class XII (Senior Secondary)</span>
                                                <h4 className="font-bold text-sm text-gray-800 mt-1">{education?.twelfth?.school || "School"}</h4>
                                                <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
                                                    <span>Board: <strong className="text-gray-800">{education?.twelfth?.board || "NA"}</strong></span>
                                                    {education?.twelfth?.percentage && (
                                                        <span className="font-bold text-[#6A38C2]">{education?.twelfth?.percentage}</span>
                                                    )}
                                                </div>
                                                {education?.twelfth?.year && (
                                                    <span className="text-[11px] text-gray-400 block mt-1">Passing Year: {education?.twelfth?.year}</span>
                                                )}
                                            </div>
                                        )}

                                        {hasTenth && (
                                            <div className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/70">
                                                <span className="text-xs font-semibold text-gray-500 uppercase">Class X (Secondary)</span>
                                                <h4 className="font-bold text-sm text-gray-800 mt-1">{education?.tenth?.school || "School"}</h4>
                                                <div className="flex items-center justify-between text-xs text-gray-600 mt-2">
                                                    <span>Board: <strong className="text-gray-800">{education?.tenth?.board || "NA"}</strong></span>
                                                    {education?.tenth?.percentage && (
                                                        <span className="font-bold text-[#6A38C2]">{education?.tenth?.percentage}</span>
                                                    )}
                                                </div>
                                                {education?.tenth?.year && (
                                                    <span className="text-[11px] text-gray-400 block mt-1">Passing Year: {education?.tenth?.year}</span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FEATURED PROJECTS SECTION */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Code className="w-5 h-5 text-[#6A38C2]" /> Featured Projects
                                </h2>
                                <button onClick={() => setOpen(true)} className="text-xs text-[#6A38C2] hover:underline font-medium">
                                    + Add / Edit
                                </button>
                            </div>

                            {(!profile?.projects || profile?.projects?.length === 0) ? (
                                <div className="text-center py-6 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <p className="text-sm text-gray-500">Showcase your technical capability with personal or academic projects.</p>
                                    <Button onClick={() => setOpen(true)} variant="outline" size="sm" className="mt-2 text-xs text-[#6A38C2] border-[#6A38C2]">
                                        Add Your First Project
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {profile.projects.map((proj, idx) => (
                                        <div key={idx} className="p-4 rounded-xl border border-gray-200 hover:border-purple-200 transition-colors bg-white">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                                <h3 className="font-bold text-gray-900 text-base">{proj.title || `Project #${idx + 1}`}</h3>
                                                <div className="flex items-center gap-2">
                                                    {proj.liveLink && (
                                                        <a
                                                            href={formatUrl(proj.liveLink)}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-purple-50 text-[#6A38C2] rounded-md hover:bg-purple-100 transition-colors"
                                                        >
                                                            <ExternalLink className="w-3 h-3" /> Live Demo
                                                        </a>
                                                    )}
                                                    {proj.githubLink && (
                                                        <a
                                                            href={formatUrl(proj.githubLink)}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors"
                                                        >
                                                            <Github className="w-3 h-3" /> GitHub
                                                        </a>
                                                    )}
                                                </div>
                                            </div>

                                            {proj.techStack && (
                                                <div className="flex flex-wrap gap-1.5 mt-2">
                                                    {proj.techStack.split(',').map((tech, tIdx) => (
                                                        <span key={tIdx} className="px-2 py-0.5 text-[11px] font-medium bg-gray-100 text-gray-700 rounded">
                                                            {tech.trim()}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}

                                            {proj.description && (
                                                <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                                                    {proj.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* WORK EXPERIENCE SECTION */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                    <Briefcase className="w-5 h-5 text-[#6A38C2]" /> Experience & Internships
                                </h2>
                                <button onClick={() => setOpen(true)} className="text-xs text-[#6A38C2] hover:underline font-medium">
                                    + Add / Edit
                                </button>
                            </div>

                            {(!profile?.workExperience || profile?.workExperience?.length === 0) ? (
                                <div className="text-center py-5 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                                    <p className="text-sm text-gray-500">No work experience or internships added yet.</p>
                                    <span className="text-xs text-gray-400 block mt-1">Freshers can showcase projects, hackathons, and certifications instead.</span>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {profile.workExperience.map((exp, idx) => (
                                        <div key={idx} className="p-4 rounded-xl border border-gray-200 bg-gray-50/50">
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                                <div>
                                                    <h3 className="font-bold text-gray-900 text-base">{exp.role || "Role"}</h3>
                                                    <p className="text-xs font-semibold text-[#6A38C2] flex items-center gap-1 mt-0.5">
                                                        <Building2 className="w-3.5 h-3.5" /> {exp.company || "Company"}
                                                    </p>
                                                </div>
                                                {exp.duration && (
                                                    <span className="text-xs text-gray-500 bg-white px-2.5 py-1 rounded-md border border-gray-200 font-medium self-start">
                                                        {exp.duration}
                                                    </span>
                                                )}
                                            </div>
                                            {exp.description && (
                                                <p className="text-xs text-gray-600 mt-2.5 leading-relaxed">
                                                    {exp.description}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* RIGHT 1 COLUMN: SKILLS, RESUME, CERTS, ACHIEVEMENTS */}
                    <div className="space-y-6">
                        {/* RESUME CARD */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2 mb-3">
                                <FileText className="w-4 h-4 text-[#6A38C2]" /> Student Resume
                            </h2>
                            {isResume ? (
                                <div className="p-3.5 bg-purple-50/60 border border-purple-100 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-8 h-8 text-[#6A38C2] shrink-0" />
                                        <div className="overflow-hidden">
                                            <p className="text-xs font-semibold text-gray-800 truncate" title={profile?.resumeOriginalName || "Resume.pdf"}>
                                                {profile?.resumeOriginalName || "Candidate Resume.pdf"}
                                            </p>
                                            <span className="text-[11px] text-gray-500">Verified PDF Document</span>
                                        </div>
                                    </div>
                                    <a
                                        href={profile.resume}
                                        target="_blank"
                                        rel="noreferrer"
                                        download
                                        className="mt-3 w-full inline-flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg bg-[#6A38C2] text-white hover:bg-[#5b30a6] transition-colors shadow-sm"
                                    >
                                        <Download className="w-3.5 h-3.5" /> Download / View Resume
                                    </a>
                                </div>
                            ) : (
                                <div className="p-4 bg-gray-50 border border-dashed border-gray-200 rounded-xl text-center">
                                    <p className="text-xs text-gray-500 mb-2">No resume uploaded yet.</p>
                                    <Button onClick={() => setOpen(true)} size="sm" variant="outline" className="text-xs text-[#6A38C2] border-[#6A38C2]">
                                        Upload Resume (PDF)
                                    </Button>
                                </div>
                            )}
                        </div>

                        {/* SKILLS CARD */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-[#6A38C2]" /> Skills & Technologies
                                </h2>
                                <button onClick={() => setOpen(true)} className="text-xs text-[#6A38C2] hover:underline font-medium">
                                    Edit
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {profile?.skills && profile?.skills.length > 0 ? (
                                    profile.skills.map((skill, index) => (
                                        <span 
                                            key={index}
                                            className="px-2.5 py-1 text-xs font-semibold rounded-md bg-purple-50 text-[#6A38C2] border border-purple-100"
                                        >
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-gray-400 italic">No skills listed yet. Add technical skills to match relevant job postings.</span>
                                )}
                            </div>
                        </div>

                        {/* CERTIFICATIONS CARD */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                    <Award className="w-4 h-4 text-[#6A38C2]" /> Certifications & Licenses
                                </h2>
                                <button onClick={() => setOpen(true)} className="text-xs text-[#6A38C2] hover:underline font-medium">
                                    + Add
                                </button>
                            </div>
                            {(!profile?.certifications || profile?.certifications?.length === 0) ? (
                                <p className="text-xs text-gray-400 italic">No certifications added. Add AWS, Google, Coursera or HackerRank certifications.</p>
                            ) : (
                                <div className="space-y-3">
                                    {profile.certifications.map((cert, idx) => (
                                        <div key={idx} className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
                                            <div className="flex items-start justify-between gap-1">
                                                <h4 className="text-xs font-bold text-gray-900">{cert.name}</h4>
                                                {cert.link && (
                                                    <a
                                                        href={formatUrl(cert.link)}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-xs text-[#6A38C2] hover:underline shrink-0"
                                                    >
                                                        <ExternalLink className="w-3 h-3" />
                                                    </a>
                                                )}
                                            </div>
                                            <p className="text-[11px] text-gray-600 mt-0.5">
                                                {cert.issuer} {cert.issueDate && `• ${cert.issueDate}`}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* ACHIEVEMENTS CARD */}
                        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-amber-500" /> Honors & Achievements
                                </h2>
                                <button onClick={() => setOpen(true)} className="text-xs text-[#6A38C2] hover:underline font-medium">
                                    Edit
                                </button>
                            </div>
                            {(!profile?.achievements || profile?.achievements?.length === 0) ? (
                                <p className="text-xs text-gray-400 italic">No achievements listed yet. (e.g. Hackathons, Competitions, Problem Solving Milestones)</p>
                            ) : (
                                <ul className="space-y-2">
                                    {profile.achievements.map((ach, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-xs text-gray-700">
                                            <span className="text-amber-500 mt-0.5">✦</span>
                                            <span>{ach}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>

                {/* APPLIED JOBS SECTION */}
                <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">Applied Jobs History</h2>
                    <AppliedJobTable />
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile