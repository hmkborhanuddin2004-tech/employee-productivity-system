# Security Architecture & Compliance Guidelines

> **System:** Employee Productivity & Work Update Management System  
> **Document Status:** Comprehensive Security Framework (Milestone 0)  
> **Compliance Target:** Technical Controls aligned with the Bangladesh Personal Data Protection Act 2026  
> **Mandatory Notice:** *Requires review by a qualified legal/privacy professional before production deployment.*

---

## 1. Core Security Tenets

1. **Zero Trust Client Model:** The Employee Desktop Application runs in an untrusted end-user environment. The server **never** trusts desktop payloads implicitly. All incoming payloads (heartbeats, timestamps, images) are validated, sanitised, and strictly verified against active work session records.
2. **Principle of Least Privilege (PoLP):** Every entity (Employee, Manager, Admin, Service) has access strictly to the minimal data sets and operations necessary to carry out its role.
3. **Defense in Depth:** Security is enforced at multiple overlapping tiers: Network (TLS 1.3), Application (Next.js middleware, Zod schema validation), Database (PostgreSQL Row-Level Security), and Storage (private buckets + signed URLs).
4. **Accountability & Tamper-Proof Auditability:** Every sensitive access—especially viewing or exporting employee screenshots—generates an immutable audit record.

---

## 2. Role-Based Access Control (RBAC) Matrix

| Operational Capability | Employee | Manager / Supervisor | System Administrator |
| :--- | :---: | :---: | :---: |
| **Start / End Own Work Session** | YES | YES | YES |
| **Submit Own Work Updates** | YES | YES | YES |
| **View Own Sessions & Updates** | YES | YES | YES |
| **View Own Permitted Screenshots** | YES | YES | YES |
| **Request Deletion of Own Sensitive Capture** | YES | NO | NO |
| **View Team Real-Time Activity Status** | NO | YES (Assigned Team Only) | YES (All Teams) |
| **Review Team Screenshots & Reports** | NO | YES (Assigned Team Only) | YES (All Teams) |
| **Configure Monitoring Policies (Intervals/Idle)**| NO | NO | YES |
| **Configure Data Retention & Auto-Purge** | NO | NO | YES |
| **View Comprehensive System Audit Logs** | NO | NO | YES |
| **Manage Employee Accounts & Devices** | NO | NO | YES |

---

## 3. Storage & Screenshot Protection

Screenshots capture employee desktop environments and may unintentionally contain confidential organizational assets or personal details. Thus, the screenshot storage pipeline is fortified with high-grade safeguards:

1. **Non-Public Storage Bucket:**
   * The Supabase Storage bucket `employee-screenshots` is configured as strictly private (`public: false`).
   * Anonymous or unauthenticated HTTP requests receive `403 Forbidden`.
2. **Ephemeral Signed URLs (15-Minute Expiry):**
   * The application database stores only the relative storage path (e.g., `org_01/emp_402/2026-09-19/session_88/sc_142.webp`).
   * When an authorized Manager opens a screenshot, the server verifies permissions, logs the view event, and requests a short-lived **Cryptographic Signed URL** with a maximum Time-To-Live (TTL) of **15 minutes**.
   * The link expires automatically, preventing shared or leaked URLs from being accessed in the future.
3. **Client-Side Image Ingestion Hardening:**
   * Upload endpoints enforce a strict size cap (**maximum 2 MB per screenshot**).
   * Validated against allowed image MIME types (`image/jpeg`, `image/webp`).
   * Magic bytes verification is performed on the server to prevent disguised executable payloads (`.exe`, `.bat`, `.ps1`).

---

## 4. Audit Trail Architecture (`audit_logs`)

All administrative or managerial reads of sensitive data are permanently logged in an append-only table.

### Audit Log Schema Structure
```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES users(id) ON DELETE SET NULL,
    actor_role TEXT NOT NULL,
    action TEXT NOT NULL,          -- e.g., 'VIEW_SCREENSHOT', 'EXPORT_REPORT', 'UPDATE_POLICY'
    target_resource TEXT NOT NULL,  -- e.g., 'screenshots:sc_99182', 'employee:emp_101'
    metadata JSONB DEFAULT '{}'::jsonb, -- e.g., {'client_ip': '192.168.1.10', 'reason': 'Routine Review'}
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```
* **Immutability:** The `audit_logs` table has no `UPDATE` or `DELETE` API endpoints, preventing tampering or concealment of managerial actions.

---

## 5. Secrets Management & Environment Separation

* **Client Bundling Hygiene:** Never expose `SUPABASE_SERVICE_ROLE_KEY`, database connection strings, or administrative tokens to the Next.js client bundle.
* Only environment variables prefixed with `NEXT_PUBLIC_` (such as `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are accessible in frontend browser code.
* Desktop clients authenticate using unique per-device API keys/tokens (`Device-Token`) issued during employee registration, revocable at any moment by Administrators.

---

## 6. Technical Compliance Checklist (Bangladesh PDPA 2026 Alignment)

> [!IMPORTANT]
> **Legal Disclaimer:** The following technical checklist is an engineering control framework designed to facilitate compliance with data protection principles under the Bangladesh Personal Data Protection Act 2026. *Requires review by a qualified legal/privacy professional before production deployment.*

- [x] **Lawful & Fair Processing:** Monitoring is conducted solely within legitimate contractual workplace boundaries with advance disclosure.
- [x] **Transparency:** Desktop application provides continuous visual status indicators whenever a work session is actively tracking.
- [x] **Purpose Limitation:** Collected data is restricted to measuring work session duration, active/idle distribution, task submissions, and periodic quality review.
- [x] **Data Minimization:** No keylogging, no clipboard harvesting, no password recording, no personal email/chat scraping.
- [x] **Storage Limitation & Automated Purging:** Configurable automated retention rules (e.g., auto-deleting raw screenshots after 30 days while preserving statistical summaries).
- [x] **Integrity & Confidentiality:** Ephemeral access tokens, encrypted private storage, role-segregated database access, and TLS 1.3 transit encryption.
- [x] **Employee Subject Rights:** Employees maintain the right to inspect their own time logs, review captured screenshots, and flag unintended personal captures for administrative deletion.
- [x] **Breach Detection & Incident Logging:** System error logs and abnormal authentication attempts are retained and monitored.
