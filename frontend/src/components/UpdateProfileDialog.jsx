import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2, User, GraduationCap, Briefcase, Award, Plus, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [activeTab, setActiveTab] = useState('basic');

    const [input, setInput] = useState({
        fullname: user?.fullname || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile?.skills?.join(", ") || "",
        linkedin: user?.profile?.linkedin || "",
        github: user?.profile?.github || "",
        leetcode: user?.profile?.leetcode || "",
        portfolio: user?.profile?.portfolio || "",
        experienceYears: user?.profile?.experienceYears || "Fresher",
        file: null,

        // Education
        collegeName: user?.profile?.education?.college?.name || "",
        collegeDegree: user?.profile?.education?.college?.degree || "",
        collegeBranch: user?.profile?.education?.college?.branch || "",
        collegeCgpa: user?.profile?.education?.college?.cgpa || "",
        collegeGradYear: user?.profile?.education?.college?.gradYear || "",

        twelfthSchool: user?.profile?.education?.twelfth?.school || "",
        twelfthBoard: user?.profile?.education?.twelfth?.board || "",
        twelfthPercentage: user?.profile?.education?.twelfth?.percentage || "",
        twelfthYear: user?.profile?.education?.twelfth?.year || "",

        tenthSchool: user?.profile?.education?.tenth?.school || "",
        tenthBoard: user?.profile?.education?.tenth?.board || "",
        tenthPercentage: user?.profile?.education?.tenth?.percentage || "",
        tenthYear: user?.profile?.education?.tenth?.year || "",

        // Experience & Projects
        workExperience: user?.profile?.workExperience || [],
        projects: user?.profile?.projects || [],
        certifications: user?.profile?.certifications || [],
        achievements: user?.profile?.achievements?.join(", ") || ""
    });

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    // Dynamic Projects Helpers
    const addProject = () => {
        setInput({
            ...input,
            projects: [
                ...input.projects,
                { title: "", description: "", techStack: "", liveLink: "", githubLink: "" }
            ]
        });
    };

    const removeProject = (index) => {
        const updated = input.projects.filter((_, i) => i !== index);
        setInput({ ...input, projects: updated });
    };

    const projectChangeHandler = (index, field, value) => {
        const updated = [...input.projects];
        updated[index] = { ...updated[index], [field]: value };
        setInput({ ...input, projects: updated });
    };

    // Dynamic Experience Helpers
    const addExperience = () => {
        setInput({
            ...input,
            workExperience: [
                ...input.workExperience,
                { company: "", role: "", duration: "", description: "" }
            ]
        });
    };

    const removeExperience = (index) => {
        const updated = input.workExperience.filter((_, i) => i !== index);
        setInput({ ...input, workExperience: updated });
    };

    const experienceChangeHandler = (index, field, value) => {
        const updated = [...input.workExperience];
        updated[index] = { ...updated[index], [field]: value };
        setInput({ ...input, workExperience: updated });
    };

    // Dynamic Certifications Helpers
    const addCertification = () => {
        setInput({
            ...input,
            certifications: [
                ...input.certifications,
                { name: "", issuer: "", issueDate: "", link: "" }
            ]
        });
    };

    const removeCertification = (index) => {
        const updated = input.certifications.filter((_, i) => i !== index);
        setInput({ ...input, certifications: updated });
    };

    const certificationChangeHandler = (index, field, value) => {
        const updated = [...input.certifications];
        updated[index] = { ...updated[index], [field]: value };
        setInput({ ...input, certifications: updated });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        formData.append("linkedin", input.linkedin);
        formData.append("github", input.github);
        formData.append("leetcode", input.leetcode);
        formData.append("portfolio", input.portfolio);
        formData.append("experienceYears", input.experienceYears);

        // Structured Education
        const educationData = {
            college: {
                name: input.collegeName,
                degree: input.collegeDegree,
                branch: input.collegeBranch,
                cgpa: input.collegeCgpa,
                gradYear: input.collegeGradYear
            },
            twelfth: {
                school: input.twelfthSchool,
                board: input.twelfthBoard,
                percentage: input.twelfthPercentage,
                year: input.twelfthYear
            },
            tenth: {
                school: input.tenthSchool,
                board: input.tenthBoard,
                percentage: input.tenthPercentage,
                year: input.tenthYear
            }
        };
        formData.append("education", JSON.stringify(educationData));
        formData.append("workExperience", JSON.stringify(input.workExperience));
        formData.append("projects", JSON.stringify(input.projects));
        formData.append("certifications", JSON.stringify(input.certifications));

        // Achievements split by comma
        const achievementsArray = input.achievements
            ? input.achievements.split(",").map(a => a.trim()).filter(Boolean)
            : [];
        formData.append("achievements", JSON.stringify(achievementsArray));

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                setOpen(false);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-6 bg-white rounded-xl" onInteractOutside={() => setOpen(false)}>
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-900">Edit Candidate Profile & Portfolio</DialogTitle>
                </DialogHeader>

                {/* Tab Navigation */}
                <div className="flex border-b border-gray-200 mt-2">
                    <button
                        type="button"
                        onClick={() => setActiveTab('basic')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                            activeTab === 'basic' ? 'border-[#6A38C2] text-[#6A38C2]' : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <User className="w-4 h-4" /> Basic & Links
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('education')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                            activeTab === 'education' ? 'border-[#6A38C2] text-[#6A38C2]' : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <GraduationCap className="w-4 h-4" /> Education
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('experience')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                            activeTab === 'experience' ? 'border-[#6A38C2] text-[#6A38C2]' : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <Briefcase className="w-4 h-4" /> Experience & Projects
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('skills')}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold border-b-2 transition-colors ${
                            activeTab === 'skills' ? 'border-[#6A38C2] text-[#6A38C2]' : 'border-transparent text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        <Award className="w-4 h-4" /> Skills, Certs & Resume
                    </button>
                </div>

                <form onSubmit={submitHandler} className="space-y-6 pt-4">
                    {/* TAB 1: BASIC INFO & SOCIAL LINKS */}
                    {activeTab === 'basic' && (
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-xs font-semibold uppercase text-gray-600">Full Name</Label>
                                    <Input
                                        name="fullname"
                                        value={input.fullname}
                                        onChange={changeEventHandler}
                                        className="mt-1"
                                        placeholder="e.g. Ranveer Srivastava"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs font-semibold uppercase text-gray-600">Email Address</Label>
                                    <Input
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        className="mt-1"
                                        placeholder="ranveer@example.com"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs font-semibold uppercase text-gray-600">Phone Number</Label>
                                    <Input
                                        name="phoneNumber"
                                        value={input.phoneNumber}
                                        onChange={changeEventHandler}
                                        className="mt-1"
                                        placeholder="+91 9876543210"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs font-semibold uppercase text-gray-600">Experience Level</Label>
                                    <Input
                                        name="experienceYears"
                                        value={input.experienceYears}
                                        onChange={changeEventHandler}
                                        className="mt-1"
                                        placeholder="e.g. Fresher / 1 Year / 2 Years"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label className="text-xs font-semibold uppercase text-gray-600">Bio / Professional Headline</Label>
                                <Input
                                    name="bio"
                                    value={input.bio}
                                    onChange={changeEventHandler}
                                    className="mt-1"
                                    placeholder="e.g. Computer Science Student | Aspiring FullStack & Cloud Developer"
                                />
                            </div>

                            <hr className="my-3 border-gray-100" />
                            <h4 className="text-sm font-bold text-gray-900">Professional & Coding Profiles</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label className="text-xs font-medium text-gray-600">LinkedIn URL</Label>
                                    <Input
                                        name="linkedin"
                                        value={input.linkedin}
                                        onChange={changeEventHandler}
                                        className="mt-1"
                                        placeholder="https://linkedin.com/in/username"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs font-medium text-gray-600">GitHub Profile URL</Label>
                                    <Input
                                        name="github"
                                        value={input.github}
                                        onChange={changeEventHandler}
                                        className="mt-1"
                                        placeholder="https://github.com/username"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs font-medium text-gray-600">LeetCode / Coding Profile</Label>
                                    <Input
                                        name="leetcode"
                                        value={input.leetcode}
                                        onChange={changeEventHandler}
                                        className="mt-1"
                                        placeholder="https://leetcode.com/username"
                                    />
                                </div>
                                <div>
                                    <Label className="text-xs font-medium text-gray-600">Portfolio Website</Label>
                                    <Input
                                        name="portfolio"
                                        value={input.portfolio}
                                        onChange={changeEventHandler}
                                        className="mt-1"
                                        placeholder="https://yourportfolio.dev"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 2: EDUCATION DETAILS */}
                    {activeTab === 'education' && (
                        <div className="space-y-6">
                            {/* College / University */}
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                                    <GraduationCap className="w-4 h-4 text-[#6A38C2]" /> College / University Details
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="md:col-span-2">
                                        <Label className="text-xs text-gray-600">College / University Name</Label>
                                        <Input
                                            name="collegeName"
                                            value={input.collegeName}
                                            onChange={changeEventHandler}
                                            placeholder="e.g. National Institute of Technology / Delhi University"
                                            className="mt-1 bg-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-600">Degree</Label>
                                        <Input
                                            name="collegeDegree"
                                            value={input.collegeDegree}
                                            onChange={changeEventHandler}
                                            placeholder="e.g. B.Tech / BCA / MCA / B.Sc"
                                            className="mt-1 bg-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-600">Branch / Specialization</Label>
                                        <Input
                                            name="collegeBranch"
                                            value={input.collegeBranch}
                                            onChange={changeEventHandler}
                                            placeholder="e.g. Computer Science & Engineering"
                                            className="mt-1 bg-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-600">CGPA / SGPA</Label>
                                        <Input
                                            name="collegeCgpa"
                                            value={input.collegeCgpa}
                                            onChange={changeEventHandler}
                                            placeholder="e.g. 8.7 / 10"
                                            className="mt-1 bg-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-600">Graduation Year</Label>
                                        <Input
                                            name="collegeGradYear"
                                            value={input.collegeGradYear}
                                            onChange={changeEventHandler}
                                            placeholder="e.g. 2026"
                                            className="mt-1 bg-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Class 12th */}
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-bold text-gray-900 mb-3">Class XII (Senior Secondary)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="md:col-span-2">
                                        <Label className="text-xs text-gray-600">School Name</Label>
                                        <Input
                                            name="twelfthSchool"
                                            value={input.twelfthSchool}
                                            onChange={changeEventHandler}
                                            placeholder="e.g. Delhi Public School"
                                            className="mt-1 bg-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-600">Board</Label>
                                        <Input
                                            name="twelfthBoard"
                                            value={input.twelfthBoard}
                                            onChange={changeEventHandler}
                                            placeholder="e.g. CBSE / ICSE / State Board"
                                            className="mt-1 bg-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-600">Percentage / Grade</Label>
                                        <Input
                                            name="twelfthPercentage"
                                            value={input.twelfthPercentage}
                                            onChange={changeEventHandler}
                                            placeholder="e.g. 89.4%"
                                            className="mt-1 bg-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Class 10th */}
                            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                <h4 className="text-sm font-bold text-gray-900 mb-3">Class X (Secondary School)</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="md:col-span-2">
                                        <Label className="text-xs text-gray-600">School Name</Label>
                                        <Input
                                            name="tenthSchool"
                                            value={input.tenthSchool}
                                            onChange={changeEventHandler}
                                            placeholder="e.g. St. Xavier's High School"
                                            className="mt-1 bg-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-600">Board</Label>
                                        <Input
                                            name="tenthBoard"
                                            value={input.tenthBoard}
                                            onChange={changeEventHandler}
                                            placeholder="e.g. CBSE / ICSE"
                                            className="mt-1 bg-white"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs text-gray-600">Percentage / CGPA</Label>
                                        <Input
                                            name="tenthPercentage"
                                            value={input.tenthPercentage}
                                            onChange={changeEventHandler}
                                            placeholder="e.g. 92%"
                                            className="mt-1 bg-white"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB 3: WORK EXPERIENCE & PROJECTS */}
                    {activeTab === 'experience' && (
                        <div className="space-y-6">
                            {/* Projects */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-sm font-bold text-gray-900">Featured Projects</h4>
                                    <Button type="button" variant="outline" size="sm" onClick={addProject} className="text-xs flex items-center gap-1 text-[#6A38C2] border-[#6A38C2]">
                                        <Plus className="w-3 h-3" /> Add Project
                                    </Button>
                                </div>

                                {input.projects.length === 0 ? (
                                    <p className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded-md">No projects added yet. Click "+ Add Project" to showcase your best work.</p>
                                ) : (
                                    input.projects.map((proj, idx) => (
                                        <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-3 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-gray-700">Project #{idx + 1}</span>
                                                <button type="button" onClick={() => removeProject(idx)} className="text-red-500 hover:text-red-700">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <Input
                                                    placeholder="Project Title (e.g. E-Commerce Platform)"
                                                    value={proj.title}
                                                    onChange={(e) => projectChangeHandler(idx, "title", e.target.value)}
                                                    className="bg-white"
                                                />
                                                <Input
                                                    placeholder="Tech Stack (e.g. React, Node.js, MongoDB)"
                                                    value={proj.techStack}
                                                    onChange={(e) => projectChangeHandler(idx, "techStack", e.target.value)}
                                                    className="bg-white"
                                                />
                                                <Input
                                                    placeholder="Live Demo Link"
                                                    value={proj.liveLink}
                                                    onChange={(e) => projectChangeHandler(idx, "liveLink", e.target.value)}
                                                    className="bg-white"
                                                />
                                                <Input
                                                    placeholder="GitHub Repo Link"
                                                    value={proj.githubLink}
                                                    onChange={(e) => projectChangeHandler(idx, "githubLink", e.target.value)}
                                                    className="bg-white"
                                                />
                                            </div>
                                            <Input
                                                placeholder="Brief project description & impact"
                                                value={proj.description}
                                                onChange={(e) => projectChangeHandler(idx, "description", e.target.value)}
                                                className="bg-white"
                                            />
                                        </div>
                                    ))
                                )}
                            </div>

                            <hr className="border-gray-100 my-4" />

                            {/* Work Experience */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-sm font-bold text-gray-900">Internships & Work Experience</h4>
                                    <Button type="button" variant="outline" size="sm" onClick={addExperience} className="text-xs flex items-center gap-1 text-[#6A38C2] border-[#6A38C2]">
                                        <Plus className="w-3 h-3" /> Add Experience
                                    </Button>
                                </div>

                                {input.workExperience.length === 0 ? (
                                    <p className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded-md">No work experience listed yet (perfect for freshers!). Click "+ Add Experience" if applicable.</p>
                                ) : (
                                    input.workExperience.map((exp, idx) => (
                                        <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-3 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-gray-700">Experience #{idx + 1}</span>
                                                <button type="button" onClick={() => removeExperience(idx)} className="text-red-500 hover:text-red-700">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                                <Input
                                                    placeholder="Company Name"
                                                    value={exp.company}
                                                    onChange={(e) => experienceChangeHandler(idx, "company", e.target.value)}
                                                    className="bg-white"
                                                />
                                                <Input
                                                    placeholder="Role (e.g. SDE Intern)"
                                                    value={exp.role}
                                                    onChange={(e) => experienceChangeHandler(idx, "role", e.target.value)}
                                                    className="bg-white"
                                                />
                                                <Input
                                                    placeholder="Duration (e.g. Jun 2024 - Aug 2024)"
                                                    value={exp.duration}
                                                    onChange={(e) => experienceChangeHandler(idx, "duration", e.target.value)}
                                                    className="bg-white"
                                                />
                                            </div>
                                            <Input
                                                placeholder="Key contributions & learnings"
                                                value={exp.description}
                                                onChange={(e) => experienceChangeHandler(idx, "description", e.target.value)}
                                                className="bg-white"
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}

                    {/* TAB 4: SKILLS, CERTS & RESUME */}
                    {activeTab === 'skills' && (
                        <div className="space-y-6">
                            <div>
                                <Label className="text-xs font-semibold uppercase text-gray-600">Technical Skills (Comma separated)</Label>
                                <Input
                                    name="skills"
                                    value={input.skills}
                                    onChange={changeEventHandler}
                                    className="mt-1"
                                    placeholder="React, Node.js, Python, MongoDB, Docker, SQL, TailwindCSS"
                                />
                            </div>

                            {/* Certifications */}
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-sm font-bold text-gray-900">Certifications & Licenses</h4>
                                    <Button type="button" variant="outline" size="sm" onClick={addCertification} className="text-xs flex items-center gap-1 text-[#6A38C2] border-[#6A38C2]">
                                        <Plus className="w-3 h-3" /> Add Certificate
                                    </Button>
                                </div>

                                {input.certifications.length === 0 ? (
                                    <p className="text-xs text-gray-400 italic bg-gray-50 p-3 rounded-md">No certifications added. Add AWS, Coursera, Meta, or HackerRank certificates.</p>
                                ) : (
                                    input.certifications.map((cert, idx) => (
                                        <div key={idx} className="p-4 bg-gray-50 border border-gray-200 rounded-lg mb-3 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold text-gray-700">Certificate #{idx + 1}</span>
                                                <button type="button" onClick={() => removeCertification(idx)} className="text-red-500 hover:text-red-700">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                <Input
                                                    placeholder="Certificate Name (e.g. AWS Certified Developer)"
                                                    value={cert.name}
                                                    onChange={(e) => certificationChangeHandler(idx, "name", e.target.value)}
                                                    className="bg-white"
                                                />
                                                <Input
                                                    placeholder="Issuer (e.g. Amazon Web Services, Coursera)"
                                                    value={cert.issuer}
                                                    onChange={(e) => certificationChangeHandler(idx, "issuer", e.target.value)}
                                                    className="bg-white"
                                                />
                                                <Input
                                                    placeholder="Issue Date (e.g. Aug 2024)"
                                                    value={cert.issueDate}
                                                    onChange={(e) => certificationChangeHandler(idx, "issueDate", e.target.value)}
                                                    className="bg-white"
                                                />
                                                <Input
                                                    placeholder="Credential URL / Link"
                                                    value={cert.link}
                                                    onChange={(e) => certificationChangeHandler(idx, "link", e.target.value)}
                                                    className="bg-white"
                                                />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div>
                                <Label className="text-xs font-semibold uppercase text-gray-600">Key Achievements / Awards (Comma separated)</Label>
                                <Input
                                    name="achievements"
                                    value={input.achievements}
                                    onChange={changeEventHandler}
                                    className="mt-1"
                                    placeholder="Smart India Hackathon Finalist, Solved 500+ LeetCode problems, 5-Star Coder on HackerRank"
                                />
                            </div>

                            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                <Label className="text-xs font-semibold uppercase text-gray-600 block mb-1">Upload New Resume (PDF)</Label>
                                <Input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={fileChangeHandler}
                                    className="bg-white"
                                />
                                <p className="text-xs text-gray-400 mt-1">Upload your latest PDF resume. Recruiters will be able to review and download it directly.</p>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="border-t pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button type="submit" className="bg-[#6A38C2] hover:bg-[#5b30a6] text-white min-w-28">
                            {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Save Profile"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default UpdateProfileDialog;