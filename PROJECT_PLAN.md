# Project Plan: Employee Productivity & Work Update Management System

> **Document Status:** Official Architecture & Planning Draft (Milestone 0)  
> **System Classification:** Transparent Workplace Productivity & Accountability System (Non-Covert)  
> **Compliance Benchmark:** Bangladesh Personal Data Protection Act 2026 (Technical Compliance Framework)  
> **Target Platform:** Windows 10/11 Desktop Client (Python Prototype) + Modern Web Dashboard (Next.js, TypeScript, Tailwind CSS, Supabase)

---

## 1. Executive Summary & Philosophy

The **Employee Productivity & Work Update Management System** is an organizational tool engineered to facilitate transparent productivity tracking, seamless daily work-update submissions, and verifiable accountability during official working hours. 

### Core Ethos: Trust Through Transparency (No Covert Surveillance)
Unlike clandestine spyware or invasive surveillance tools, this system operates under strict ethical guidelines:
1. **Zero Concealment:** The desktop client runs visibly with an active status icon, explicit session controls, and clear visual indicators when monitoring is underway.
2. **Centralized Web Portal Over Telegram Bot:** Telegram is deliberately avoided for bulk screenshots and daily reporting. Pushing thousands of employee screenshots into Telegram creates unmanageable notification clutter, security vulnerabilities, and zero data organization. Instead, a dedicated Web Portal organizes all data into Department Portfolios, Shift Rosters, and Audited Date-wise Galleries.
3. **Automated Shift & Roster Synchronization:** The central database maintains employee work schedules (e.g. 9:00 AM – 6:00 PM, night shifts). The desktop client connects to the web backend, detects the scheduled duty hours, and automatically activates the work session when the shift begins—logging shift adherence seamlessly.
4. **Consent & Policy-First:** No activity recording or screenshot capture can activate until the employee reviews and acknowledges the organizational **Privacy & Monitoring Policy**.
5. **No Keylogging or Password Harvesting:** The system does **not** record keystrokes, intercept chats, read passwords, or collect personal communications.
6. **No Automated Disciplinary Actions:** Idle time is an operational metric, not proof of negligence. Objective monthly analytics and graphs are surfaced for human supervisors.

---

## 2. Technical Stack & Architectural Overview

```
+-------------------------------------------------------------+
|               Employee Desktop Application                  |
|  - Platform: Windows 10/11 (Python Prototype)               |
|  - UI: Visible Session Timer & Monitoring Status            |
|  - Logic: Active/Idle Tracker (pynput/ctypes - No Keylog)   |
|  - Screen Engine: Policy-Compliant Capture (Pillow/PyAutoGUI)|
|  - Resilience: Local SQLite Queue for Network Dropouts     |
+------------------------------+------------------------------+
                               |
                   HTTPS (TLS 1.3) REST API
                               |
                               v
+-------------------------------------------------------------+
|                Backend API & Serverless Layer               |
|  - Framework: Next.js API Routes (Node.js/TypeScript)       |
|  - Security: JWT Validation, RBAC Enforcement, Rate Limiting|
|  - Business Logic: Session Verification, Audit Dispatcher    |
+------------------------------+------------------------------+
                               |
               +---------------+---------------+
               |                               |
               v                               v
+-----------------------------+ +-----------------------------+
|   Supabase PostgreSQL DB    | |   Supabase Private Storage  |
| - Users, Roles, Sessions    | | - Restricted Screenshot     |
| - Activity & Audit Logs     | |   Bucket (Non-Public)       |
| - Row-Level Security (RLS)  | | - Short-lived Signed URLs   |
+-----------------------------+ +-----------------------------+
                               ^
                               |
+------------------------------+------------------------------+
|               Admin & Manager Web Dashboard                 |
|  - Framework: Next.js (App Router), TypeScript, Tailwind CSS|
|  - Features: Live Employee Status, Work Updates,            |
|    Audited Screenshot Review, Policy Config, Analytics      |
+-------------------------------------------------------------+
```

### Technology Selection Rationale (Beginner-Friendly & Production-Ready)
* **Frontend/Backend (Next.js + TypeScript + Tailwind CSS):** Unifies web UI and server endpoints into a single, cohesive codebase. Eliminates the complexity of maintaining separate server and client repositories while providing industry-standard type safety.
* **Database & Storage (Supabase PostgreSQL):** Provides enterprise-grade relational modeling, built-in Authentication (Supabase Auth), Row-Level Security (RLS) policies, and private blob storage without requiring complex manual server administration.
* **Desktop Application (Python):** Offers straightforward access to Windows OS APIs (idle detection, display metrics, native notifications) using accessible libraries (`pynput`, `pyautogui`, `requests`, `tkinter`/`customtkinter`).

---

## 3. High-Level Feature Specifications

### 3.1 Employee Desktop Client (Windows)
* **Authentication / Registration:** Secure device-linked employee login using token-based authentication.
* **Explicit Session Control:** Prominent "Start Shift" and "End Shift" controls with session duration timer.
* **Visual Privacy Indicator:** Real-time indicator showing "Tracking Active", "Idle", or "Disconnected".
* **Work Update Submission:** Quick-entry modal for employees to submit hourly or end-of-day progress reports.
* **Activity & Idle State Detection:** Real-time activity heartbeat. If no keyboard/mouse activity occurs for a policy-defined threshold (e.g., 5 or 10 minutes), the session transitions to "Idle" without recording keystroke content.
* **Policy-Governed Screen Capture:** Captures screenshots at configurable intervals or defined events solely when permitted by policy.
* **Offline Resilience:** Local encrypted SQLite queue stores pending status pings and screenshots if Internet connectivity is lost, automatically synchronizing once connection is restored.

### 3.2 Admin & Manager Web Dashboard
* **Role-Based Access Control (RBAC):** Distinct permissions for Administrators (executives/HR), Managers (department supervisors), and Employees.
* **Real-Time Productivity Hub:** Live cards displaying Active, Idle, and Offline team members with session durations.
* **Daily Work Updates Ledger:** Organized feed of employee-submitted progress updates searchable by date, department, and task.
* **Audited Screenshot Gallery:** Chronologically sorted image gallery with employee metadata, trigger cause, and zoom view. Every view event is recorded in the system audit log.
* **Neutral Event Logging:** Time logs categorized neutrally (e.g., "Active Engagement", "Idle Interval", "Connection Interruption").
* **Policy & Retention Controls:** Administrative configuration panel to set idle thresholds, capture intervals, and automated data purging rules (e.g., 30-day screenshot retention).

---

## 4. Key Assumptions & Boundary Conditions

1. **Operating Environment:** The initial desktop prototype targets Windows 10/11 64-bit environments. Cross-platform support (macOS/Linux) can be abstracted in subsequent phases.
2. **Work Context Exclusivity:** Monitoring is strictly confined to employee work computers during contracted working hours.
3. **Network Dependability:** While the desktop client includes offline caching, regular dashboard updates assume periodic broadband connectivity.
4. **Legal Framework:** The system provides the technical controls necessary to support data protection principles (Bangladesh PDPA 2026), but actual compliance requires organizational alignment and legal counsel review.

---

## 5. Risk Assessment & Mitigation Matrix

| Risk Factor | Impact | Severity | Technical & Operational Mitigation |
| :--- | :--- | :--- | :--- |
| **Accidental Capture of Sensitive Data (Banking, Passwords)** | Privacy Violation | High | • Desktop client offers "Pause Session for Personal Break" button.<br>• Policy explicitly advises employees to minimize personal windows during active shifts.<br>• Redaction/deletion workflow enables employees to request immediate removal of unintended captures. |
| **Network Drops / Disconnections** | Data Loss | Medium | • Local SQLite queue caches events and captures locally.<br>• Exponential backoff and retry mechanism prevents server flooding when connection recovers. |
| **Unauthorized Screenshot Access** | Security Breach | Critical | • Private Supabase Storage bucket with zero public access.<br>• Short-lived (15-minute) signed URLs issued only to verified managers.<br>• Immutable audit log records every view event. |
| **Misinterpretation of Idle State** | Unfair Employee Evaluation | High | • System documentation and UI explicitly state that idle time includes phone calls, documentation reading, and offline tasks.<br>• No automated disciplinary penalties permitted by software design. |
