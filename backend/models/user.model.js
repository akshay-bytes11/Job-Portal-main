import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['student','recruiter'],
        required:true
    },
    profile:{
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, // URL to resume file
        resumeOriginalName:{type:String},
        company:{type:mongoose.Schema.Types.ObjectId, ref:'Company'}, 
        profilePhoto:{
            type:String,
            default:""
        },
        // Professional & Coding Links
        linkedin: { type: String, default: "" },
        github: { type: String, default: "" },
        leetcode: { type: String, default: "" },
        portfolio: { type: String, default: "" },

        // Work Experience
        experienceYears: { type: String, default: "Fresher" },
        workExperience: [{
            company: String,
            role: String,
            duration: String,
            description: String
        }],

        // Education Details
        education: {
            college: {
                name: { type: String, default: "" },
                degree: { type: String, default: "" },
                branch: { type: String, default: "" },
                cgpa: { type: String, default: "" },
                gradYear: { type: String, default: "" }
            },
            twelfth: {
                school: { type: String, default: "" },
                board: { type: String, default: "" },
                percentage: { type: String, default: "" },
                year: { type: String, default: "" }
            },
            tenth: {
                school: { type: String, default: "" },
                board: { type: String, default: "" },
                percentage: { type: String, default: "" },
                year: { type: String, default: "" }
            }
        },

        // Projects Portfolio
        projects: [{
            title: String,
            description: String,
            techStack: String,
            liveLink: String,
            githubLink: String
        }],

        // Certifications & Achievements
        certifications: [{
            name: String,
            issuer: String,
            issueDate: String,
            link: String
        }],
        achievements: [{ type: String }]
    },
},{timestamps:true});
export const User = mongoose.model('User', userSchema);