import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
    Mail, 
    Contact, 
    Globe, 
    Github, 
    Code, 
    ExternalLink, 
    GraduationCap, 
    Briefcase, 
    FileText, 
    Download, 
    Award, 
    Trophy, 
    Building2,
    CheckCircle2,
    Check,
    X
} from 'lucide-react';

const formatUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return `https://${url}`;
};

const CandidateDetailsDialog = ({ open, setOpen, candidate, applicationId, currentStatus, onStatusUpdate }) => {
    if (!candidate) return null;

    const profile = candidate?.profile || {};
    const education = profile?.education || {};
    const college = education?.college;
    const twelfth = education?.twelfth;
    const tenth = education?.tenth;

    const hasCollege = college?.name || college?.degree;
    const hasTwelfth = twelfth?.school || twelfth?.board;
    const hasTenth = tenth?.school || tenth?.board;
    const hasEducation = hasCollege || hasTwelfth || hasTenth;

    const projects = profile?.projects || [];
    const experience = profile?.workExperience || [];
    const certifications = profile?.certifications || [];
    const achievements = profile?.achievements || [];
    const skills = profile?.skills || [];
    const isResume = !!profile?.resume;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0 bg-white rounded-2xl">
                {/* HERO HEADER */}
                <div className="p-6 bg-gradient-to-r from-purple-50 via-white to-purple-50/30 border-b border-gray-100">
                    <DialogHeader className="mb-2">
                        <DialogTitle className="text-xs uppercase tracking-widest text-[#6A38C2] font-bold">
                            Candidate Profile & Credentials
                        </DialogTitle>
                    </DialogHeader>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-2">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-16 w-16 border-2 border-purple-200 shadow-sm">
                                <AvatarImage src={profile?.profilePhoto || "https://github.com/shadcn.png"} alt={candidate?.fullname} />
                            </Avatar>
                            <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                    <h2 className="text-xl font-bold text-gray-900">{candidate?.fullname}</h2>
                                    <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-purple-100 text-[#6A38C2]">
                                        {profile?.experienceYears || "Fresher"}
                                    </span>
                                    {candidate?.role && (
                                        <Badge variant="outline" className="text-[11px] capitalize">
                                            {candidate.role}
                                        </Badge>
                                    )}
                                </div>
                                <p className="text-xs text-gray-600 mt-1 max-w-md">
                                    {profile?.bio || "No professional headline provided."}
                                </p>
                            </div>
                        </div>

                        {/* STATUS ACTION FOR JOB APPLICANTS */}
                        {applicationId && onStatusUpdate && (
                            <div className="flex items-center gap-2 self-end sm:self-center">
                                <Button
                                    size="sm"
                                    onClick={() => onStatusUpdate("Accepted", applicationId)}
                                    className={`text-xs gap-1 ${
                                        currentStatus?.toLowerCase() === 'accepted' 
                                            ? 'bg-green-600 text-white hover:bg-green-700' 
                                            : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                                    }`}
                                    variant="outline"
                                >
                                    <Check className="w-3.5 h-3.5" /> Accept
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={() => onStatusUpdate("Rejected", applicationId)}
                                    className={`text-xs gap-1 ${
                                        currentStatus?.toLowerCase() === 'rejected' 
                                            ? 'bg-red-600 text-white hover:bg-red-700' 
                                            : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100'
                                    }`}
                                    variant="outline"
                                >
                                    <X className="w-3.5 h-3.5" /> Reject
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* CONTACT & PROFILES BAR */}
                    <div className="mt-4 pt-4 border-t border-gray-200/60 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex flex-wrap items-center gap-4 text-gray-600">
                            <div className="flex items-center gap-1.5">
                                <Mail className="w-3.5 h-3.5 text-gray-400" />
                                <a href={`mailto:${candidate?.email}`} className="hover:underline">{candidate?.email}</a>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Contact className="w-3.5 h-3.5 text-gray-400" />
                                <span>{candidate?.phoneNumber || "N/A"}</span>
                            </div>
                        </div>

                        {/* CODING & SOCIAL PROFILES */}
                        <div className="flex flex-wrap items-center gap-2">
                            {profile?.linkedin && (
                                <a
                                    href={formatUrl(profile.linkedin)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors border border-blue-200"
                                >
                                    <Globe className="w-3 h-3" /> LinkedIn
                                    <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                            )}
                            {profile?.github && (
                                <a
                                    href={formatUrl(profile.github)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded hover:bg-gray-200 transition-colors border border-gray-300"
                                >
                                    <Github className="w-3 h-3" /> GitHub
                                    <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                            )}
                            {profile?.leetcode && (
                                <a
                                    href={formatUrl(profile.leetcode)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-amber-50 text-amber-800 rounded hover:bg-amber-100 transition-colors border border-amber-200"
                                >
                                    <Code className="w-3 h-3" /> LeetCode
                                    <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                            )}
                            {profile?.portfolio && (
                                <a
                                    href={formatUrl(profile.portfolio)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-purple-50 text-purple-700 rounded hover:bg-purple-100 transition-colors border border-purple-200"
                                >
                                    <Globe className="w-3 h-3" /> Portfolio
                                    <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* BODY CONTENT */}
                <div className="p-6 space-y-6">
                    {/* EDUCATION SECTION */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                            <GraduationCap className="w-4 h-4 text-[#6A38C2]" /> Education Background
                        </h3>
                        {!hasEducation ? (
                            <p className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded-lg">No education background submitted.</p>
                        ) : (
                            <div className="space-y-3">
                                {hasCollege && (
                                    <div className="p-3.5 rounded-xl border border-purple-100 bg-purple-50/40">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6A38C2]">College / University</span>
                                                <h4 className="font-bold text-gray-900 text-sm">{college?.name || "College Name N/A"}</h4>
                                                <p className="text-xs text-gray-700 mt-0.5 font-medium">
                                                    {college?.degree} {college?.branch && `— ${college?.branch}`}
                                                </p>
                                            </div>
                                            {college?.gradYear && (
                                                <span className="text-xs bg-white text-gray-600 px-2 py-0.5 rounded border border-purple-100">
                                                    Graduating: {college?.gradYear}
                                                </span>
                                            )}
                                        </div>
                                        {college?.cgpa && (
                                            <div className="mt-2.5 inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white text-xs font-bold text-purple-900 border border-purple-200">
                                                <span>CGPA / SGPA:</span>
                                                <span className="text-[#6A38C2]">{college?.cgpa}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {hasTwelfth && (
                                        <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/70">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase">Class XII (Senior Secondary)</span>
                                            <h5 className="font-bold text-xs text-gray-800 mt-0.5">{twelfth?.school || "School N/A"}</h5>
                                            <div className="flex items-center justify-between text-xs text-gray-600 mt-1.5">
                                                <span>Board: <strong>{twelfth?.board || "NA"}</strong></span>
                                                {twelfth?.percentage && (
                                                    <span className="font-bold text-[#6A38C2]">{twelfth?.percentage}</span>
                                                )}
                                            </div>
                                            {twelfth?.year && (
                                                <span className="text-[11px] text-gray-400 block mt-0.5">Passing Year: {twelfth?.year}</span>
                                            )}
                                        </div>
                                    )}

                                    {hasTenth && (
                                        <div className="p-3 rounded-xl border border-gray-200 bg-gray-50/70">
                                            <span className="text-[10px] font-bold text-gray-500 uppercase">Class X (Secondary)</span>
                                            <h5 className="font-bold text-xs text-gray-800 mt-0.5">{tenth?.school || "School N/A"}</h5>
                                            <div className="flex items-center justify-between text-xs text-gray-600 mt-1.5">
                                                <span>Board: <strong>{tenth?.board || "NA"}</strong></span>
                                                {tenth?.percentage && (
                                                    <span className="font-bold text-[#6A38C2]">{tenth?.percentage}</span>
                                                )}
                                            </div>
                                            {tenth?.year && (
                                                <span className="text-[11px] text-gray-400 block mt-0.5">Passing Year: {tenth?.year}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* FEATURED PROJECTS */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                            <Code className="w-4 h-4 text-[#6A38C2]" /> Projects Portfolio ({projects.length})
                        </h3>
                        {projects.length === 0 ? (
                            <p className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded-lg">No projects submitted yet.</p>
                        ) : (
                            <div className="space-y-3">
                                {projects.map((proj, idx) => (
                                    <div key={idx} className="p-3.5 rounded-xl border border-gray-200 bg-white">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                            <h4 className="font-bold text-sm text-gray-900">{proj.title || `Project #${idx + 1}`}</h4>
                                            <div className="flex items-center gap-2">
                                                {proj.liveLink && (
                                                    <a
                                                        href={formatUrl(proj.liveLink)}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 bg-purple-50 text-[#6A38C2] rounded hover:bg-purple-100"
                                                    >
                                                        <ExternalLink className="w-3 h-3" /> Live Demo
                                                    </a>
                                                )}
                                                {proj.githubLink && (
                                                    <a
                                                        href={formatUrl(proj.githubLink)}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                                                    >
                                                        <Github className="w-3 h-3" /> GitHub
                                                    </a>
                                                )}
                                            </div>
                                        </div>

                                        {proj.techStack && (
                                            <div className="flex flex-wrap gap-1 mt-1.5">
                                                {proj.techStack.split(',').map((tech, tIdx) => (
                                                    <span key={tIdx} className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-700 rounded">
                                                        {tech.trim()}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {proj.description && (
                                            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                                                {proj.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* WORK EXPERIENCE */}
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                            <Briefcase className="w-4 h-4 text-[#6A38C2]" /> Experience & Internships
                        </h3>
                        {experience.length === 0 ? (
                            <p className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded-lg">Fresher / No prior professional experience listed.</p>
                        ) : (
                            <div className="space-y-3">
                                {experience.map((exp, idx) => (
                                    <div key={idx} className="p-3.5 rounded-xl border border-gray-200 bg-gray-50/50">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="font-bold text-sm text-gray-900">{exp.role || "Role"}</h4>
                                                <p className="text-xs font-semibold text-[#6A38C2] flex items-center gap-1 mt-0.5">
                                                    <Building2 className="w-3 h-3" /> {exp.company || "Company"}
                                                </p>
                                            </div>
                                            {exp.duration && (
                                                <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200 font-medium">
                                                    {exp.duration}
                                                </span>
                                            )}
                                        </div>
                                        {exp.description && (
                                            <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                                                {exp.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* SKILLS & CERTS GRID */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* SKILLS */}
                        <div className="p-4 rounded-xl border border-gray-200 bg-white">
                            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#6A38C2]" /> Technical Skills
                            </h4>
                            <div className="flex flex-wrap gap-1.5">
                                {skills.length > 0 ? (
                                    skills.map((skill, index) => (
                                        <span key={index} className="px-2 py-0.5 text-xs font-semibold rounded bg-purple-50 text-[#6A38C2] border border-purple-100">
                                            {skill}
                                        </span>
                                    ))
                                ) : (
                                    <span className="text-xs text-gray-400 italic">No skills listed</span>
                                )}
                            </div>
                        </div>

                        {/* RESUME CARD */}
                        <div className="p-4 rounded-xl border border-gray-200 bg-white flex flex-col justify-between">
                            <div>
                                <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                                    <FileText className="w-3.5 h-3.5 text-[#6A38C2]" /> Candidate Resume
                                </h4>
                                {isResume ? (
                                    <p className="text-xs font-medium text-gray-700 truncate" title={profile?.resumeOriginalName}>
                                        📄 {profile?.resumeOriginalName || "Resume.pdf"}
                                    </p>
                                ) : (
                                    <p className="text-xs text-gray-400 italic">No resume uploaded.</p>
                                )}
                            </div>
                            {isResume && (
                                <a
                                    href={profile.resume}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-3 inline-flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-bold rounded-lg bg-[#6A38C2] text-white hover:bg-[#5b30a6] transition-colors"
                                >
                                    <Download className="w-3.5 h-3.5" /> Download / View Resume
                                </a>
                            )}
                        </div>
                    </div>

                    {/* CERTIFICATIONS & ACHIEVEMENTS */}
                    {(certifications.length > 0 || achievements.length > 0) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* CERTIFICATIONS */}
                            {certifications.length > 0 && (
                                <div className="p-4 rounded-xl border border-gray-200 bg-white">
                                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                                        <Award className="w-3.5 h-3.5 text-[#6A38C2]" /> Certifications
                                    </h4>
                                    <div className="space-y-2">
                                        {certifications.map((cert, idx) => (
                                            <div key={idx} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100 text-xs">
                                                <div className="flex items-start justify-between">
                                                    <span className="font-bold text-gray-900">{cert.name}</span>
                                                    {cert.link && (
                                                        <a href={formatUrl(cert.link)} target="_blank" rel="noreferrer" className="text-[#6A38C2] hover:underline">
                                                            <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    )}
                                                </div>
                                                <p className="text-[11px] text-gray-500 mt-0.5">
                                                    {cert.issuer} {cert.issueDate && `• ${cert.issueDate}`}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ACHIEVEMENTS */}
                            {achievements.length > 0 && (
                                <div className="p-4 rounded-xl border border-gray-200 bg-white">
                                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
                                        <Trophy className="w-3.5 h-3.5 text-amber-500" /> Key Achievements
                                    </h4>
                                    <ul className="space-y-1.5">
                                        {achievements.map((ach, idx) => (
                                            <li key={idx} className="text-xs text-gray-700 flex items-start gap-1.5">
                                                <span className="text-amber-500 mt-0.5">✦</span>
                                                <span>{ach}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CandidateDetailsDialog;
