# Development Roadmap: Employee Productivity & Work Update Management System

> **System:** Employee Productivity & Work Update Management System  
> **Author & Mentor:** Lubaba (লুবাবা)  
> **Student & Developer:** HMk Borhan Uddin  
> **Pedagogical Strategy:** Step-by-Step Milestone-Driven Development with Zero Technical Assumptions

---

## 1. Master Milestone Overview

| Milestone | Title | Focus Area | Status |
| :---: | :--- | :--- | :---: |
| **M0** | **Project Planning & Architecture** | System Design, Security, Privacy, Schemas | **COMPLETED** |
| **M1** | **Development Environment Setup** | Tooling verification, Next.js bootstrap | **COMPLETED** |
| **M2** | **Frontend Foundation (Demo Data)** | Dashboard UI, Layout, Pages, Components | **COMPLETED** |
| **M3** | **Database Architecture (Supabase)** | PostgreSQL Tables, Relational Schema, RLS | *Next Up* |
| **M4** | **Authentication & Authorization** | Supabase Auth, RBAC (Admin, Manager, Employee) | *Pending* |
| **M5** | **Backend REST API Tier** | Ingestion & Management Endpoints, Validation | *Pending* |
| **M6** | **Admin Dashboard Integration** | Connect Web UI to Real Database & API | *Pending* |
| **M7** | **Employee Desktop App (Python)** | Windows Client, Session Timer, Idle Detector | *Pending* |
| **M8** | **Controlled Screenshot System** | Policy Capture, Private Storage, Signed URLs | *Pending* |
| **M9** | **Alerts, Events & Reporting** | Neutral Event Engine, Daily/Weekly Reports | *Pending* |
| **M10**| **Security & Compliance Audit** | Pen-testing, Vulnerability Check, Bangladesh PDPA | *Pending* |
| **M11**| **End-to-End System Testing** | Desktop -> API -> Storage -> Web Verification | *Pending* |
| **M12**| **Production Deployment & Handover** | Vercel / Cloud Setup, Operational Manual | *Pending* |

---

## 2. Detailed Milestone Specifications

---

### Milestone 0: Project Planning & Architecture (Current Milestone)
* **What we are building:** The entire conceptual blueprint, architecture diagrams, security guidelines, organizational privacy policy draft, and step-by-step development roadmap.
* **Why we need it:** Without a rock-solid plan and ethical architecture, building a productivity tracking system risks violating employee privacy, creating legal liabilities, and producing buggy, spaghetti code.
* **Technical Concepts Taught in Bangla:**
  * **Architecture (আর্কিটেকচার):** একটি পুরো সফটওয়্যারের প্রতিটি অংশ (ডেক্সটপ অ্যাপ, সার্ভার, ডাটাবেজ) কীভাবে একে অপরের সাথে যুক্ত থাকবে তার সার্বিক নকশা।
  * **Zero Trust (জিরো ট্রাস্ট):** সার্ভার কখনো ডেক্সটপ অ্যাপের পাঠানো ডেটাকে অন্ধের মতো বিশ্বাস করবে না; সবকিছু যাচাই করবে।
  * **RBAC (Role-Based Access Control):** ব্যবহারকারীর পদমর্যাদা (Admin, Manager, Employee) অনুযায়ী নির্দিষ্ট সুযোগ-সুবিধা নিয়ন্ত্রণ করা।
* **Deliverables:**
  * `PROJECT_PLAN.md`
  * `ARCHITECTURE.md`
  * `SECURITY.md`
  * `PRIVACY_POLICY_DRAFT.md`
  * `DEVELOPMENT_ROADMAP.md`
* **Definition of Done:** All five governance documents created; architecture explained to Borhan Bhai in simple Bengali; awaiting explicit command before proceeding.

---

### Milestone 1: Development Environment Setup
* **What we are building:** Verify and configure Node.js, npm, Python, Git, and create the initial Next.js project skeleton.
* **Why we need it:** Before writing code, our computer needs the proper runtime engines installed and ready to build modern web and desktop apps.
* **Technical Concepts Taught in Bangla:**
  * **Node.js:** ব্রাউজারের বাইরে কম্পিউটারে জাভাস্ক্রিপ্ট/টাইপস্ক্রিপ্ট কোড চালানোর ইঞ্জিন।
  * **npm (Node Package Manager):** সফটওয়্যার তৈরির জন্য বিশ্বের বিভিন্ন ডেভেলপারদের তৈরি করা তৈরি-উপকরণ (Libraries) নামানোর ডিজিটাল দোকান।
  * **Next.js:** রিঅ্যাক্ট (React)-এর ওপর ভিত্তি করে তৈরি আধুনিক ফ্রেমওয়ার্ক যা ওয়েবসাইট ও সার্ভার এপিআই একসাথে বানাতে দেয়।
* **Files Created/Modified:** `package.json`, `tsconfig.json`, `tailwind.config.js`, `src/app/page.tsx`.
* **Definition of Done:** Next.js development server boots successfully on `http://localhost:3000` and displays the starter welcome screen.

---

### Milestone 2: Frontend Foundation (Demo Data)
* **What we are building:** The complete visual user interface (UI) of the web dashboard with clean demo data:
  * **Company Public Landing Page:** Professional homepage showcasing company identity, services, and secure Team Portal login link.
  * **Master Navigation Sidebar & Header:** Intuitive executive controls and breadcrumbs.
  * **Executive Overview Dashboard:** Live counters (Active, Idle, Offline) with real-time shift indicators.
  * **Department Portfolios:** Departmental breakdown (IT, Marketing, Accounts, HR) featuring individual employee profile cards and daily task feeds.
  * **Shift Roster & Schedule UI:** Visual schedule planner mapping employee shifts (e.g. 9:00 AM – 6:00 PM, Night Shift).
  * **Monthly Visual Analytics & Graphs:** Interactive charts (Active hours, Idle distribution, Monthly trend lines).
  * **Audited Screenshot Gallery:** Date-picker, shift filter, and zoom modal with 15-minute ephemeral link simulation.
  * **Policy Configuration & Settings UI:** Retention controls, idle sensitivity, and screenshot frequency sliders.
* **Why we need it:** By building the UI first with demo data, we can interactively review and polish the user experience (UX) before connecting complex databases.
* **Technical Concepts Taught in Bangla:**
  * **Component (কম্পোনেন্ট):** একটি ওয়েবসাইটের পুনর্ব্যবহারযোগ্য ছোট অংশ (যেমন বাটন, সাইডবার, কার্ড)।
  * **Tailwind CSS:** ক্লাসের মাধ্যমে দ্রুত সুন্দর এবং আধুনিক ডিজাইন করার সিএসএস ফ্রেমওয়ার্ক।
  * **Mock Data (মক ডেটা):** আসল ডাটাবেজের বদলে টেস্টিংয়ের জন্য ব্যবহৃত কৃত্রিম বা ডামি তথ্য।
  * **Data Visualization (গ্রাফ/চার্ট):** জটিল সংখ্যার হিসাবকে চোখের সামনে সহজ রঙিন পাই-চার্ট ও বার-চার্ট আকারে ফুটিয়ে তোলা।
* **Definition of Done:** All dashboard pages navigate smoothly without errors; responsive on both desktop and mobile viewports.

---

### Milestone 3: Database Architecture (Supabase PostgreSQL)
* **What we are building:** The relational database schema in Supabase with tables for users, employees, sessions, events, screenshots, policies, audit logs, and alerts.
* **Why we need it:** Applications need structured, ACID-compliant storage to reliably retain shift times, work reports, and security logs.
* **Technical Concepts Taught in Bangla:**
  * **Table (ছক):** ডেটা সাজিয়ে রাখার এক্সেল শিটের মতো টেবিল।
  * **Primary Key (প্রাইমারি কি):** প্রতিটি সারির একটি ইউনিক পরিচয়পত্র (ID)।
  * **Foreign Key (ফরেন কি):** এক টেবিলের সাথে অন্য টেবিলের সম্পর্ক তৈরি করার সেতু।
* **Definition of Done:** All tables, relationships, and Row-Level Security (RLS) policies successfully deployed in Supabase.

---

### Milestone 4: Authentication & Authorization (RBAC)
* **What we are building:** Secure login, session management, and role-based route guards for Admin, Manager, and Employee.
* **Why we need it:** Ensures confidential employee information is strictly partitioned and inaccessible to unauthorized individuals.
* **Technical Concepts Taught in Bangla:**
  * **Authentication (AuthN):** আপনি আসলে কে তা নিশ্চিত করা (লগইন করা)।
  * **Authorization (AuthZ):** লগইন করার পর আপনার কী কী দেখার বা করার অধিকার আছে তা নিয়ন্ত্রণ করা।
* **Definition of Done:** Admin, Manager, and Employee accounts can log in; unauthorized pages are properly blocked with `403 Forbidden`.

---

### Milestone 5: Backend & REST API Tier
* **What we are building:** Secure Next.js API endpoints for session start/stop, heartbeats, work updates, and screenshot metadata.
* **Why we need it:** Acts as the secure conduit connecting both the desktop clients and web frontend to the database.
* **Technical Concepts Taught in Bangla:**
  * **REST API:** ইন্টারনেটের মাধ্যমে ডেটা চাওয়া এবং পাঠানোর আন্তর্জাতিক প্রমিত নিয়ম।
  * **Payload (JSON):** সফটওয়্যারের ভেতর দিয়ে পাঠানো মূল তথ্যের প্যাকেট।
* **Definition of Done:** API endpoints tested with automated tests and cURL/Postman, returning appropriate HTTP status codes (200, 201, 400, 401).

---

### Milestone 6: Admin Dashboard Integration
* **What we are building:** Replacing demo data in the web dashboard with live queries connected to Supabase and the Next.js API.
* **Why we need it:** Enables managers to see real-time updates and real employee records.
* **Definition of Done:** Dashboard reflects real sessions created via API; status cards update dynamically.

---

### Milestone 7: Employee Desktop App (Windows Python Prototype)
* **What we are building:** The native Windows desktop application with visible session controls, non-invasive idle detection, and offline queue.
* **Why we need it:** Runs directly on employee workstations to measure shift duration and detect activity engagement without spying.
* **Technical Concepts Taught in Bangla:**
  * **System Tray:** উইন্ডোজের ঘড়ির পাশে ছোট আইকন আকারে ব্যাকগ্রাউন্ডে অ্যাপ চালু রাখা।
  * **OS Hook / Timer:** উইন্ডোজ থেকে ইনপুট সময় গণনা করার বিল্ট-ইন পদ্ধতি।
* **Definition of Done:** Python app runs, shows active/idle status, sends heartbeats, and pauses properly.

---

### Milestone 8: Controlled Screenshot System
* **What we are building:** Policy-governed desktop screen capture, secure multipart image upload to private Supabase Storage, and ephemeral signed URL generation.
* **Why we need it:** Provides verifiable work evidence for managers while protecting employee confidentiality through short-lived access links.
* **Definition of Done:** Desktop captures screen on schedule; uploads to private storage; manager can view image via 15-min signed link with audit record.

---

### Milestone 9: Alerts, Neutral Events & Reporting
* **What we are building:** Systemic notification engine for idle thresholds and connection drops, paired with daily and weekly work summaries.
* **Why we need it:** Converts raw data into clear, neutral management summaries without punitive or biased automation.
* **Definition of Done:** Daily summary report generates accurately; idle intervals are labeled objectively.

---

### Milestone 10: Security & Compliance Audit
* **What we are building:** Full security verification covering penetration vulnerabilities, secret leakages, storage access controls, and Bangladesh PDPA compliance.
* **Why we need it:** Guarantees that the system cannot be compromised or misused before deployment.
* **Definition of Done:** Security checklist passes 100%; no secrets exposed in client bundles.

---

### Milestone 11: End-to-End System Testing
* **What we are building:** Complete integration test simulating a realistic workday: Desktop Clock-In -> Heartbeat -> Idle Event -> Screenshot Upload -> Manager Review -> Shift End.
* **Why we need it:** Confirms that all moving parts cooperate smoothly without human intervention.
* **Definition of Done:** Full lifecycle completes with zero data loss or unhandled exceptions.

---

### Milestone 12: Production Deployment & Handover
* **What we are building:** Deployment of the web dashboard and API to Vercel/Cloud, compiling the desktop app to `.exe`, and delivering user manuals.
* **Why we need it:** Transitioning the software from a local development environment to an enterprise production system.
* **Definition of Done:** Cloud URL live with HTTPS; desktop installer `.exe` ready for employee workstations.
