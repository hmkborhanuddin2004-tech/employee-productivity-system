# Workplace Productivity & Monitoring Policy (Draft Template)

> **Document Status:** Technical Organizational Policy Draft (Milestone 0)  
> **System Scope:** Employee Productivity & Work Update Management System  
> **Regulatory Reference:** Bangladesh Personal Data Protection Act 2026 (Compliance Alignment)  
> **Important Notice:** *This document is a technical policy draft for organizational governance. It does not constitute formal legal advice and must be reviewed and customized by qualified legal/human resources counsel prior to production adoption.*

---

## 1. Statement of Purpose & Principles

This organization respects employee autonomy, dignity, and personal privacy. The **Employee Productivity & Work Update Management System** is established to:
* Provide objective, verifiable visibility into team workload and capacity.
* Facilitate transparent reporting of daily tasks and deliverables.
* Ensure fair compensation for remote, hybrid, and in-office work sessions.
* Identify operational bottlenecks and streamline project workflows.

**Guiding Principle:** This software is a transparent productivity management tool, **not** a stealth surveillance mechanism. All monitoring activities are visible, bounded, and governed by this written policy.

---

## 2. When Monitoring is Active (Strict Temporal Boundaries)

* **Employee-Initiated Only:** Monitoring occurs **solely** when an employee explicitly clicks **"Start Shift"** within the Desktop Application.
* **Instant Inactivity on Session End:** The moment the employee clicks **"End Shift"** or pauses for a break, all telemetry, activity tracking, and screenshot mechanisms cease immediately.
* **Zero After-Hours Surveillance:** No background monitoring, tracking, or network communication occurs outside active work sessions.

---

## 3. Scope of Data Collection

### 3.1 Data Explicitly Collected
1. **Work Session Telemetry:** Session initiation timestamp, completion timestamp, and total accumulated shift duration.
2. **Activity Engagement Metric:** Aggregated active duration vs. idle duration.
   * *Mechanism:* Evaluates the time elapsed since the last user input (mouse move or key press) using operating system event timers.
3. **Daily Work Updates:** Task summaries, progress descriptions, and project tags voluntarily submitted by the employee.
4. **Policy-Governed Screenshots:** Still visual captures of the primary desktop display, captured at configurable intervals (e.g., once every 10–15 minutes) exclusively while a work session is active.
5. **System Metadata:** Workstation device name, operating system version, and client software version to ensure software integrity and security.

### 3.2 Data Explicitly FORBIDDEN & NOT Collected
To safeguard employee privacy and corporate security, the system is architecturally prohibited from collecting:
* ❌ **No Keystroke Logging (Keylogging):** The system does not capture, read, or record the actual characters, words, or text typed by the employee.
* ❌ **No Password or Credential Capture:** The software does not hook into credential managers or password input fields.
* ❌ **No Private Communication Scraping:** Personal messaging applications (e.g., WhatsApp, Messenger, personal email) are neither inspected nor scraped.
* ❌ **No Audio, Microphone, or Webcam Access:** No webcam video or room audio is ever recorded or accessed.
* ❌ **No Personal File Inspection:** The desktop application does not scan or upload documents from personal directories.

---

## 4. Screenshot Rules & Protocols

1. **Triggering Criteria:** Screenshots are captured automatically at randomized or scheduled intervals (as designated in organizational settings) solely during active shifts.
2. **Visual Notification:** The desktop application maintains a visible status tray icon indicating active monitoring. A subtle visual prompt notifies the employee when an upload occurs.
3. **Personal Privacy Safeguard:** Employees are encouraged to pause tracking before opening personal tabs (such as online banking or medical portals). If a sensitive personal detail is inadvertently captured, employees retain the immediate right to trigger a **"Redaction/Deletion Request"** via their portal.
4. **Viewing Access:** Only authorized supervisors and designated Human Resources personnel have access to review screenshots. Every view event is recorded in an immutable audit log.

---

## 5. Idle Time Interpretation Guidelines

> [!NOTE]
> **Operational Guidance for Managers:** Idle time (inactivity of mouse/keyboard) **must never** be automatically interpreted as misconduct, dereliction of duty, or cheating.

Legitimate workplace activities frequently involve zero computer input, including:
* Reviewing printed documents, architectural plans, or technical books.
* Participating in voice or video client calls.
* In-person collaborative discussions and brainstorming sessions.
* Analytical problem-solving and architectural sketching.

Supervisors are prohibited from issuing disciplinary actions based solely on automated idle metrics without conducting a personal, contextual conversation with the employee.

---

## 6. Data Retention, Purging & Access Control

* **Screenshot Retention Limit:** Raw screenshot files are automatically and permanently purged from cloud storage after **30 days** (or the period configured in organizational retention settings).
* **Statistical Data Retention:** Numerical records (total shift hours, active hours, task titles) are retained for **12 months** for payroll, attendance, and project billing audits.
* **Audit Trail Retention:** Security audit logs (tracking who accessed screenshots or updated policies) are retained for **24 months** to maintain regulatory compliance.

---

## 7. Employee Rights & Subject Access

In accordance with data protection best practices and the Bangladesh Personal Data Protection Act 2026:
1. **Right to Access:** Employees have full access to view their own recorded work sessions, activity distribution, submitted updates, and captured screenshots.
2. **Right to Rectification:** Employees may submit corrections for forgotten clock-outs or inaccurate session classifications.
3. **Right to Deletion of Accidental Captures:** Employees may flag any captured screenshot containing confidential personal information (e.g., personal bank statement or personal message) for immediate managerial review and permanent deletion.
4. **Right to Dispute:** Disputed idle classifications may be contested with documented explanation of offline duties.

---

## 8. Digital Acknowledgement & Consent Protocol

Prior to enabling desktop tracking for any employee:
1. The employee must be presented with this policy document within the Web Dashboard.
2. The employee reviews and submits a digital acknowledgement ("I have read, understood, and acknowledge the monitoring policy").
3. The system generates a cryptographic **Consent Record** containing:
   * `employee_id`
   * `policy_version`
   * `acknowledgement_timestamp`
   * `ip_address`
4. The Desktop Application checks for a valid consent record before permitting the employee to initiate their first tracking session.
