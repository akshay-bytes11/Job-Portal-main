# 🚀 CareerPulse — Full-Stack Job Portal & Recruitment Platform

A scalable, production-ready Full-Stack MERN (MongoDB, Express.js, React, Node.js) Job Portal and Recruitment Management System featuring strict Role-Based Access Control (RBAC), real-time applicant tracking, recruiter analytics, cloud-based media storage, and server-side pagination.

---

## 🌟 Key Highlights

- **Dual User Architecture (RBAC):** Distinct, isolated experiences for Job Seekers (Students) and Recruiters (Admins) with protected routes and server-side authorization middleware.
- **Recruiter Analytics Dashboard:** Centralized management metrics displaying total job postings, candidate applications, and real-time hiring status breakdown (Accepted, Rejected, Pending).
- **Comprehensive Job & Company Management:** Recruiters can register companies, upload logos, post, update, and delete job listings, and review candidate resumes.
- **Candidate Job Discovery:** Multi-field search (title, description, location), dynamic salary range filtering (in LPA), and instant job bookmarking (Saved Jobs).
- **Performance Optimized:** Server-side pagination, debounced search filters, optimistic UI bookmark toggles, and animated shimmer skeleton loaders.
- **Cloud Media Storage:** Integrated with Cloudinary for handling candidate PDF resumes and company logos via Data URI streams.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite, Redux Toolkit, React Router DOM v6, TailwindCSS, Radix UI / Shadcn UI, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose ODM |
| **Authentication** | JSON Web Tokens (JWT) stored in HTTP-Only secure cookies, Bcrypt.js password hashing |
| **Cloud & Media** | Cloudinary API, Multer (Memory Storage), DataURI |

---

## 📂 Project Architecture

```txt
job-portal/
├── backend/
│   ├── controllers/         # Business logic (auth, company, job, application, savedJob)
│   ├── middlewares/         # Auth verification (JWT), RBAC (isRecruiter), Multer file upload
│   ├── models/              # Mongoose schemas (User, Company, Job, Application, SavedJob)
│   ├── routes/              # Express API endpoints
│   ├── utils/               # Database connection, Cloudinary config, DataURI parser
│   ├── seed.js              # Database seeder with sample companies & jobs
│   └── index.js             # Express app entry point
└── frontend/
    └── src/
        ├── components/      # UI components (Jobs, Filter, SavedJobs, Navbar, etc.)
        │   ├── admin/       # Recruiter pages (Dashboard, AdminJobs, Companies, Users, Applicants)
        │   ├── auth/        # Login & Signup forms
        │   ├── skeletons/   # Shimmer skeleton loading components
        │   └── ui/          # Accessible UI primitives (Shadcn/Radix)
        ├── hooks/           # Custom data fetching hooks (useGetAllJobs, useGetSavedJobs, etc.)
        ├── redux/           # Global state slices (authSlice, jobSlice, companySlice, savedJobSlice)
        └── utils/           # API endpoints and constant definitions
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **MongoDB** (Atlas connection string or local MongoDB instance)
- **Cloudinary Account** (Free tier for resume and logo uploads)

### 1. Clone the Repository

```bash
git clone [https://github.com/akshay-bytes11/job-portal.git](https://github.com/akshay-bytes11/job-portal.git)
cd job-portal
```

### 2. Backend Setup

1. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file in the `backend/` folder (or copy from `.env.example`):
   ```env
   PORT=8000
   MONGO_URI=your_mongodb_connection_string
   SECRET_KEY=your_jwt_secret_key
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   ```
3. *(Optional)* Seed the database with sample companies and jobs:
   ```bash
   node seed.js
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
   - Backend runs on `http://localhost:8000`

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd ../frontend
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
   - Frontend runs on `http://localhost:5173`

---

## 🔒 Role-Based Access Control & Demo Accounts

| Role | Default Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Admin / Recruiter** | `recruiter@careerpulse.com` | `Admin@2026!` | Access to Dashboard analytics, Post/Edit/Delete Jobs, Review Applicants, Manage Companies & Users. |
| **Student / Candidate** | `student@careerpulse.com` | `Student@2026!` | Browse Jobs, Filter by Location/Salary/Industry, Apply, Bookmark (Saved Jobs), Profile & Resume Upload. |

---

## 📡 Key API Endpoints

### 🔐 Authentication & Users
- `POST /api/v1/user/register` — Register a new student or recruiter
- `POST /api/v1/user/login` — Authenticate user and issue JWT cookie
- `GET /api/v1/user/logout` — Clear session cookie
- `POST /api/v1/user/profile/update` — Update candidate profile & upload resume (Protected)
- `GET /api/v1/user/all-users` — Fetch all registered users (Admin only)

### 💼 Jobs
- `GET /api/v1/job/get` — Public paginated job listings with keyword/salary filtering
- `GET /api/v1/job/get/:id` — Retrieve job details by ID
- `POST /api/v1/job/post` — Create a new job listing (Recruiter only)
- `PUT /api/v1/job/update/:id` — Modify an existing job listing (Recruiter only)
- `DELETE /api/v1/job/delete/:id` — Remove a job listing (Recruiter only)
- `GET /api/v1/job/stats` — Retrieve recruiter dashboard analytics (Recruiter only)

### 📑 Applications
- `POST /api/v1/application/apply/:id` — Apply for a job (Student only)
- `GET /api/v1/application/get` — Retrieve candidate's applied jobs (Student only)
- `GET /api/v1/application/:id/applicants` — View all applicants for a specific job (Recruiter only)
- `POST /api/v1/application/status/:id/update` — Accept or reject an application (Recruiter only)

### 🔖 Bookmarks (Saved Jobs)
- `POST /api/v1/saved-jobs/toggle/:jobId` — Save or unsave a job (Protected)
- `GET /api/v1/saved-jobs/my-saved-jobs` — Retrieve candidate's bookmarked jobs (Protected)

---

## 🛡️ Security & Reliability Best Practices

- **Strict HTTP-Only Cookie Session:** Mitigates Cross-Site Scripting (XSS) risks.
- **Fail-Safe Cloud Storage:** Cloudinary upload failures fall back gracefully without blocking user registration.
- **Atomic Operations & Unique Constraints:** Compound indexing prevents duplicate bookmarks and applications.
- **Environment Isolation:** Sensitive credentials, database connection URIs, and API keys are strictly excluded from version control via `.gitignore`.

---

## 👨‍💻 Author

**Akshay Jain**
- GitHub: [@akshay-bytes11](https://github.com/akshay-bytes11)

---

## 📄 License

This project is licensed under the ISC License.
