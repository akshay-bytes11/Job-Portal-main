import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { User } from "./models/user.model.js";
import { Company } from "./models/company.model.js";
import { Job } from "./models/job.model.js";

dotenv.config({});

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // 1. Get or create Admin / Recruiter
        let recruiter = await User.findOne({ email: "ranveersrivastava.cs@gmail.com" });
        if (!recruiter) {
            recruiter = await User.findOne({ email: "recruiter@example.com" });
        }
        if (!recruiter) {
            const hashedPassword = await bcrypt.hash("Admin@2026!", 10);
            recruiter = await User.create({
                fullname: "Ranveer Srivastava (Admin)",
                email: "ranveersrivastava.cs@gmail.com",
                phoneNumber: 9876543210,
                password: hashedPassword,
                role: "recruiter",
                profile: {
                    profilePhoto: "https://github.com/shadcn.png",
                    bio: "Platform Owner & Administrator"
                }
            });
            console.log("Created admin recruiter: ranveersrivastava.cs@gmail.com");
        } else {
            console.log("Using recruiter account:", recruiter.email);
        }

        // 2. Create 12 Diverse Top Companies
        const companiesData = [
            {
                name: "Google",
                description: "Global technology leader specializing in search, AI, cloud computing, and operating systems.",
                website: "https://google.com",
                location: "Bangalore",
                logo: "https://www.google.com/favicon.ico",
                userId: recruiter._id
            },
            {
                name: "Microsoft",
                description: "Multinational software and cloud pioneer building Azure, Windows, and enterprise AI tools.",
                website: "https://microsoft.com",
                location: "Hyderabad",
                logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
                userId: recruiter._id
            },
            {
                name: "Amazon",
                description: "Global e-commerce and cloud infrastructure leader powering millions of businesses via AWS.",
                website: "https://amazon.com",
                location: "Delhi NCR",
                logo: "https://www.amazon.com/favicon.ico",
                userId: recruiter._id
            },
            {
                name: "Netflix",
                description: "World-class streaming entertainment service with advanced recommendation algorithms.",
                website: "https://netflix.com",
                location: "Remote",
                logo: "https://assets.nflxext.com/ffe/siteui/common/icons/nficon2016.ico",
                userId: recruiter._id
            },
            {
                name: "Uber",
                description: "Pioneering mobility and delivery platform operating high-scale real-time dispatch systems.",
                website: "https://uber.com",
                location: "Hyderabad",
                logo: "https://www.uber.com/favicon.ico",
                userId: recruiter._id
            },
            {
                name: "Adobe",
                description: "Creative software powerhouse behind Photoshop, Illustrator, and enterprise digital experiences.",
                website: "https://adobe.com",
                location: "Delhi NCR",
                logo: "https://www.adobe.com/favicon.ico",
                userId: recruiter._id
            },
            {
                name: "Flipkart",
                description: "One of India's leading digital commerce ecosystems with cutting-edge supply chain tech.",
                website: "https://flipkart.com",
                location: "Bangalore",
                logo: "https://www.flipkart.com/favicon.ico",
                userId: recruiter._id
            },
            {
                name: "Razorpay",
                description: "India's premier full-stack financial solutions and digital payments infrastructure company.",
                website: "https://razorpay.com",
                location: "Bangalore",
                logo: "https://razorpay.com/favicon.ico",
                userId: recruiter._id
            },
            {
                name: "Zomato",
                description: "Leading food delivery and restaurant discovery service serving millions daily.",
                website: "https://zomato.com",
                location: "Delhi NCR",
                logo: "https://www.zomato.com/favicon.ico",
                userId: recruiter._id
            },
            {
                name: "Swiggy",
                description: "India's leading on-demand convenience and hyper-local grocery platform.",
                website: "https://swiggy.com",
                location: "Bangalore",
                logo: "https://www.swiggy.com/favicon.ico",
                userId: recruiter._id
            },
            {
                name: "Jio Platforms",
                description: "Digital transformation leader connecting over 400 million telecom and cloud customers.",
                website: "https://jio.com",
                location: "Mumbai",
                logo: "https://www.jio.com/favicon.ico",
                userId: recruiter._id
            },
            {
                name: "Tata Consultancy Services",
                description: "Global IT services, consulting, and business solutions organization.",
                website: "https://tcs.com",
                location: "Pune",
                logo: "https://www.tcs.com/favicon.ico",
                userId: recruiter._id
            }
        ];

        const companies = [];
        for (const cData of companiesData) {
            let existing = await Company.findOne({ name: cData.name });
            if (!existing) {
                existing = await Company.create(cData);
            } else {
                existing.userId = recruiter._id;
                await existing.save();
            }
            companies.push(existing);
        }
        console.log(`Created/Verified ${companies.length} companies.`);

        const getCompany = (name) => companies.find(c => c.name === name)?._id;

        // 3. Create 18 Diverse Jobs across Tech, Data, Analytics & Cloud
        const sampleJobs = [
            // Data Science & AI
            {
                title: "Data Scientist",
                description: "Build predictive models and recommendation engines to personalize user content at massive scale.",
                requirements: ["Python", "Machine Learning", "Scikit-Learn", "PyTorch", "SQL", "Pandas"],
                salary: 32,
                experienceLevel: 3,
                location: "Remote",
                jobType: "Full-Time",
                position: 3,
                company: getCompany("Netflix"),
                created_by: recruiter._id
            },
            {
                title: "Senior Data Scientist",
                description: "Lead research and deployment of large language models (LLMs) and computer vision architectures.",
                requirements: ["Deep Learning", "LLMs", "NLP", "TensorFlow", "Python", "Kubernetes"],
                salary: 36,
                experienceLevel: 5,
                location: "Bangalore",
                jobType: "Full-Time",
                position: 2,
                company: getCompany("Google"),
                created_by: recruiter._id
            },
            {
                title: "Machine Learning Engineer",
                description: "Train, evaluate, and productionize generative AI models for next-generation creative tools.",
                requirements: ["PyTorch", "Python", "C++", "Docker", "Model Quantization", "MLOps"],
                salary: 27,
                experienceLevel: 3,
                location: "Delhi NCR",
                jobType: "Full-Time",
                position: 2,
                company: getCompany("Adobe"),
                created_by: recruiter._id
            },

            // Data Engineering
            {
                title: "Data Engineer",
                description: "Design and maintain high-throughput streaming pipelines processing billions of telemetry events daily.",
                requirements: ["Apache Spark", "Python", "Kafka", "SQL", "Airflow", "AWS EMR"],
                salary: 24,
                experienceLevel: 3,
                location: "Hyderabad",
                jobType: "Full-Time",
                position: 3,
                company: getCompany("Uber"),
                created_by: recruiter._id
            },
            {
                title: "Lead Data Engineer",
                description: "Architect cloud data warehouses, lakehouses, and real-time streaming architectures across AWS & Snowflake.",
                requirements: ["Snowflake", "Redshift", "Airflow", "Python", "dbt", "System Design"],
                salary: 35,
                experienceLevel: 5,
                location: "Delhi NCR",
                jobType: "Full-Time",
                position: 2,
                company: getCompany("Amazon"),
                created_by: recruiter._id
            },

            // Business & Data Analytics
            {
                title: "Business Analyst",
                description: "Collaborate with product leaders to translate consumer behavioral metrics into strategic growth decisions.",
                requirements: ["SQL", "Tableau", "PowerBI", "Excel", "Data Modeling", "Business Acumen"],
                salary: 14,
                experienceLevel: 2,
                location: "Bangalore",
                jobType: "Full-Time",
                position: 4,
                company: getCompany("Flipkart"),
                created_by: recruiter._id
            },
            {
                title: "Data Analyst",
                description: "Analyze restaurant delivery performance, user retention curves, and order conversion funnels.",
                requirements: ["Python", "SQL", "Advanced Excel", "Metabase", "A/B Testing"],
                salary: 9,
                experienceLevel: 1,
                location: "Delhi NCR",
                jobType: "Full-Time",
                position: 5,
                company: getCompany("Zomato"),
                created_by: recruiter._id
            },
            {
                title: "Business Intelligence Analyst",
                description: "Develop enterprise-wide KPI dashboards and optimize automated ETL data pipelines.",
                requirements: ["PowerBI", "SQL Server", "DAX", "ETL Pipelines", "Data Warehousing"],
                salary: 8,
                experienceLevel: 1,
                location: "Pune",
                jobType: "Full-Time",
                position: 6,
                company: getCompany("Tata Consultancy Services"),
                created_by: recruiter._id
            },
            {
                title: "Financial Data Analyst",
                description: "Conduct financial variance modeling, revenue forecasts, and subscriber billing analytics.",
                requirements: ["Financial Modeling", "Python", "SQL", "Excel VBA", "Forecasting"],
                salary: 11,
                experienceLevel: 2,
                location: "Mumbai",
                jobType: "Full-Time",
                position: 3,
                company: getCompany("Jio Platforms"),
                created_by: recruiter._id
            },

            // DevOps & Cloud
            {
                title: "DevOps Engineer",
                description: "Automate zero-downtime CI/CD deployment pipelines and scale multi-region Kubernetes clusters.",
                requirements: ["Kubernetes", "Docker", "Terraform", "AWS", "GitHub Actions", "Prometheus"],
                salary: 20,
                experienceLevel: 3,
                location: "Bangalore",
                jobType: "Full-Time",
                position: 3,
                company: getCompany("Razorpay"),
                created_by: recruiter._id
            },
            {
                title: "Cloud Infrastructure Engineer",
                description: "Build secure, compliant cloud foundations and manage infrastructure as code.",
                requirements: ["Azure", "Terraform", "Linux", "CI/CD", "Shell Scripting", "Networking"],
                salary: 21,
                experienceLevel: 3,
                location: "Hyderabad",
                jobType: "Full-Time",
                position: 2,
                company: getCompany("Microsoft"),
                created_by: recruiter._id
            },

            // Software & Web Development
            {
                title: "Frontend Developer",
                description: "Join our core product engineering team to build accessible, high-performance web applications in React.",
                requirements: ["React", "JavaScript", "TypeScript", "TailwindCSS", "Redux"],
                salary: 18,
                experienceLevel: 2,
                location: "Bangalore",
                jobType: "Full-Time",
                position: 3,
                company: getCompany("Google"),
                created_by: recruiter._id
            },
            {
                title: "Backend Developer",
                description: "Design and implement scalable microservices, low-latency RESTful APIs, and event-driven backends.",
                requirements: ["Node.js", "Express", "MongoDB", "System Design", "Kafka"],
                salary: 22,
                experienceLevel: 3,
                location: "Hyderabad",
                jobType: "Full-Time",
                position: 3,
                company: getCompany("Microsoft"),
                created_by: recruiter._id
            },
            {
                title: "FullStack Developer",
                description: "Lead end-to-end features spanning cloud backend microservices and responsive web applications.",
                requirements: ["React", "Node.js", "MongoDB", "Docker", "AWS", "GraphQL"],
                salary: 26,
                experienceLevel: 4,
                location: "Delhi NCR",
                jobType: "Full-Time",
                position: 2,
                company: getCompany("Amazon"),
                created_by: recruiter._id
            },
            {
                title: "Frontend Developer",
                description: "Create fluid, animated UI components and customer-facing web apps for millions of daily active diners.",
                requirements: ["React", "Redux", "HTML5", "CSS3", "Next.js"],
                salary: 10,
                experienceLevel: 1,
                location: "Delhi NCR",
                jobType: "Full-Time",
                position: 4,
                company: getCompany("Zomato"),
                created_by: recruiter._id
            },
            {
                title: "Backend Developer",
                description: "Optimize high-throughput order dispatch pipelines, driver matching, and geospatial search services.",
                requirements: ["Node.js", "Microservices", "Redis", "PostgreSQL", "Kafka"],
                salary: 14,
                experienceLevel: 2,
                location: "Bangalore",
                jobType: "Full-Time",
                position: 2,
                company: getCompany("Swiggy"),
                created_by: recruiter._id
            },
            {
                title: "Junior Frontend Developer",
                description: "Great entry-level opportunity for aspiring frontend developers to learn from top engineering mentors.",
                requirements: ["HTML", "CSS", "JavaScript", "React Basics", "Git"],
                salary: 5,
                experienceLevel: 0,
                location: "Pune",
                jobType: "Full-Time",
                position: 5,
                company: getCompany("Zomato"),
                created_by: recruiter._id
            },
            {
                title: "Senior Backend Engineer",
                description: "Architect distributed storage services, consensus algorithms, and ultra-reliable cloud primitives.",
                requirements: ["Node.js", "Go", "Distributed Systems", "Kubernetes", "gRPC"],
                salary: 28,
                experienceLevel: 5,
                location: "Mumbai",
                jobType: "Full-Time",
                position: 2,
                company: getCompany("Microsoft"),
                created_by: recruiter._id
            }
        ];

        // Replace jobs with complete new catalog
        await Job.deleteMany({});
        await Job.insertMany(sampleJobs);
        console.log(`Successfully seeded ${sampleJobs.length} jobs across ${companies.length} companies!`);

        process.exit(0);
    } catch (error) {
        console.error("Seeding error:", error);
        process.exit(1);
    }
};

seedData();
