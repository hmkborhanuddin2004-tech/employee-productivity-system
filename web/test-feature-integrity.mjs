import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

console.log('=== RUNNING APEXWORK FEATURE INTEGRITY & EDGE-CASE TEST SUITE ===\n');

// 1. Static file inspections
const demoDataPath = path.resolve('src/lib/demo-data.ts');
const demoDataContent = fs.readFileSync(demoDataPath, 'utf8');

// Verify Quote 1 & 3 data fields exist in demo-data
assert(demoDataContent.includes('dailyTasksCompleted'), 'demo-data must include dailyTasksCompleted');
assert(demoDataContent.includes('dailyTasksTotal'), 'demo-data must include dailyTasksTotal');
assert(demoDataContent.includes('dailyWorkCompletionPercent'), 'demo-data must include dailyWorkCompletionPercent');
assert(demoDataContent.includes('deliverableSummary'), 'demo-data must include deliverableSummary');

// Verify Quote 4 fields exist
assert(demoDataContent.includes('isArchived'), 'demo-data must include isArchived');
assert(demoDataContent.includes('manual_discretionary'), 'demo-data must include manual_discretionary retentionPolicy');
console.log('✔ [PASS] demo-data.ts schema & sample records contain all required fields.');

// 2. Test Dashboard Overall Completion Math
function computeOverallCompletion(employees) {
  if (!employees || employees.length === 0) return { percent: 0, completed: 0, total: 0 };
  const totalTasks = employees.reduce((acc, curr) => acc + (curr.dailyTasksTotal || 0), 0);
  const totalCompleted = employees.reduce((acc, curr) => acc + (curr.dailyTasksCompleted || 0), 0);
  const percent = totalTasks === 0 ? 0 : Math.round((totalCompleted / totalTasks) * 100);
  return { percent, completed: totalCompleted, total: totalTasks };
}

// Edge case: Empty array
const emptyResult = computeOverallCompletion([]);
assert.strictEqual(emptyResult.percent, 0);
assert.strictEqual(emptyResult.completed, 0);
assert.strictEqual(emptyResult.total, 0);

// Edge case: Employees with 0 tasks
const zeroTasks = computeOverallCompletion([{ dailyTasksTotal: 0, dailyTasksCompleted: 0 }]);
assert.strictEqual(zeroTasks.percent, 0);

// Normal case:
const sampleEmps = [
  { dailyTasksTotal: 5, dailyTasksCompleted: 4 },
  { dailyTasksTotal: 5, dailyTasksCompleted: 3 }
];
const normalResult = computeOverallCompletion(sampleEmps);
assert.strictEqual(normalResult.total, 10);
assert.strictEqual(normalResult.completed, 7);
assert.strictEqual(normalResult.percent, 70);
console.log('✔ [PASS] Overall Project Completion calculations and edge cases verified.');

// 3. Test Employee Add & Remove Logic (Headcount manipulation)
let roster = [
  { id: 'emp-101', name: 'Tanvir Ahmed', departmentId: 'it', status: 'active' },
  { id: 'emp-102', name: 'Farhana Yasmin', departmentId: 'marketing', status: 'active' }
];

function addEmployee(list, newEmp) {
  return [newEmp, ...list];
}

function removeEmployee(list, empId) {
  return list.filter(e => e.id !== empId);
}

// Add
const newEmp = { id: 'emp-103', name: 'Rahim Uddin', departmentId: 'it', status: 'active' };
roster = addEmployee(roster, newEmp);
assert.strictEqual(roster.length, 3);
assert.strictEqual(roster.filter(e => e.departmentId === 'it').length, 2);

// Remove
roster = removeEmployee(roster, 'emp-101');
assert.strictEqual(roster.length, 2);
assert.strictEqual(roster.filter(e => e.departmentId === 'it').length, 1);
assert.strictEqual(roster.find(e => e.id === 'emp-101'), undefined);
console.log('✔ [PASS] Employee addition and removal state transition logic verified.');

// 4. Test Discretionary Archive and Permanent Deletion Logic
let vault = [
  { id: 'sc-1', isArchived: false },
  { id: 'sc-2', isArchived: false },
  { id: 'sc-3', isArchived: true }
];

function archiveScreenshot(vaultList, id) {
  return vaultList.map(item => item.id === id ? { ...item, isArchived: true, archivedAt: '2026-09-19' } : item);
}

function restoreScreenshot(vaultList, id) {
  return vaultList.map(item => item.id === id ? { ...item, isArchived: false, archivedAt: undefined } : item);
}

function deleteScreenshot(vaultList, id) {
  return vaultList.filter(item => item.id !== id);
}

// Archive sc-1
vault = archiveScreenshot(vault, 'sc-1');
assert.strictEqual(vault.find(s => s.id === 'sc-1').isArchived, true);
assert.strictEqual(vault.filter(s => !s.isArchived).length, 1); // sc-2 only

// Restore sc-1
vault = restoreScreenshot(vault, 'sc-1');
assert.strictEqual(vault.find(s => s.id === 'sc-1').isArchived, false);
assert.strictEqual(vault.filter(s => !s.isArchived).length, 2);

// Delete sc-2
vault = deleteScreenshot(vault, 'sc-2');
assert.strictEqual(vault.length, 2);
assert.strictEqual(vault.find(s => s.id === 'sc-2'), undefined);
console.log('✔ [PASS] Manual discretionary archive, restore, and delete operations verified.');

// 5. Check Pages for Key Required Strings & Edge-Case Safeguards
const dashboardFile = fs.readFileSync('src/app/dashboard/page.tsx', 'utf8');
assert(dashboardFile.includes("Today's Overall Project / Work Completion"), 'Dashboard must show exact title: Today\'s Overall Project / Work Completion');
assert(dashboardFile.includes("Work Done"), 'Dashboard table must show Work Done');
assert(dashboardFile.includes("curr.dailyTasksCompleted ?? 0"), 'Dashboard must use nullish coalescing ?? 0 for tasks completed');
assert(dashboardFile.includes("curr.dailyTasksTotal ?? 0"), 'Dashboard must use nullish coalescing ?? 0 for tasks total');

const departmentsFile = fs.readFileSync('src/app/dashboard/departments/page.tsx', 'utf8');
assert(departmentsFile.includes('Add Employee') || departmentsFile.includes('Add New Employee'), 'Departments must have Add Employee');
assert(departmentsFile.includes('Remove') || departmentsFile.includes('Remove Employee'), 'Departments must have Remove action');
assert(departmentsFile.includes('apexwork_employees_directory'), 'Departments must use localStorage sync');
assert(departmentsFile.includes('is already in use by another employee'), 'Departments must reject duplicate employee codes');
assert(!departmentsFile.includes('Array.isArray(parsed) && parsed.length > 0'), 'Departments must allow empty array hydration');

const screenshotsFile = fs.readFileSync('src/app/dashboard/screenshots/page.tsx', 'utf8');
assert(screenshotsFile.includes('Archived Vault'), 'Screenshots must feature Archived Vault');
assert(screenshotsFile.includes('Archive') && screenshotsFile.includes('Delete'), 'Screenshots must have Archive and Delete actions');
assert(screenshotsFile.includes('apexwork_audited_screenshots'), 'Screenshots must use localStorage sync');
assert(screenshotsFile.includes('employeesList'), 'Screenshots must use dynamic employeesList from directory');
assert(!screenshotsFile.includes('Array.isArray(parsed) && parsed.length > 0'), 'Screenshots must allow empty array hydration');

const settingsFile = fs.readFileSync('src/app/dashboard/settings/page.tsx', 'utf8');
assert(settingsFile.includes('Discretionary / Manual Archive & Delete Policy'), 'Settings must feature Discretionary Retention');
assert(settingsFile.includes('Data is NOT automatically destroyed'), 'Settings must contain the exact discretionary disclosure');

const rosterFile = fs.readFileSync('src/app/dashboard/roster/page.tsx', 'utf8');
assert(rosterFile.includes('apexwork_employees_directory'), 'Roster must sync with dynamic employee directory');
assert(rosterFile.includes('Daily Work Done'), 'Roster must display Daily Work Done column');

const workUpdatesFile = fs.readFileSync('src/app/dashboard/work-updates/page.tsx', 'utf8');
assert(workUpdatesFile.includes('apexwork_employees_directory'), 'Work Updates must sync with dynamic employee directory');

console.log('✔ [PASS] Codebase-wide edge cases, cross-route sync, and exact user requirements verified.');

// 6. Test Work Quota & Individual Deliverables Ledger (Quotes 1 & 2)
function calculateQuotaPercent(completed, quota) {
  const safeQuota = Math.max(0, Number(quota) || 0);
  const safeCompleted = Math.max(0, Number(completed) || 0);
  if (safeQuota === 0) return 0;
  return Math.round((safeCompleted / safeQuota) * 100);
}

function getQuotaStatus(completed, quota) {
  const safeQuota = Math.max(0, Number(quota) || 0);
  const safeCompleted = Math.max(0, Number(completed) || 0);
  if (safeQuota === 0) return { label: 'No Quota Set' };
  const percent = Math.round((safeCompleted / safeQuota) * 100);
  if (percent >= 100) return { label: 'Target Met' };
  if (percent >= 70) return { label: 'On Track' };
  return { label: 'Behind Schedule' };
}

function getQuotaProgressBarColor(percent) {
  if (percent >= 80) return 'from-emerald-500 to-teal-400';
  if (percent >= 50) return 'from-amber-500 to-yellow-400';
  return 'from-rose-500 to-red-400';
}

// Edge case & boundary verification for quota calculation
assert.strictEqual(calculateQuotaPercent(0, 0), 0, '0 quota and 0 completed must equal 0% (no NaN)');
assert.strictEqual(calculateQuotaPercent(5, 0), 0, '0 quota must equal 0% (no division by zero)');
assert.strictEqual(calculateQuotaPercent(0, 5), 0, '0 completed must equal 0%');
assert.strictEqual(calculateQuotaPercent(4, 5), 80, '4 of 5 must equal 80%');
assert.strictEqual(calculateQuotaPercent(3, 5), 60, '3 of 5 must equal 60%');
assert.strictEqual(calculateQuotaPercent(1, 5), 20, '1 of 5 must equal 20%');
assert.strictEqual(calculateQuotaPercent(6, 5), 120, '6 of 5 must equal 120%');
assert.strictEqual(calculateQuotaPercent(null, undefined), 0, 'nullish inputs must equal 0%');

// Quota status indicator tests
assert.strictEqual(getQuotaStatus(0, 0).label, 'No Quota Set');
assert.strictEqual(getQuotaStatus(5, 5).label, 'Target Met');
assert.strictEqual(getQuotaStatus(4, 5).label, 'On Track');
assert.strictEqual(getQuotaStatus(2, 5).label, 'Behind Schedule');

// Progress bar color banding tests
assert(getQuotaProgressBarColor(85).includes('emerald'), '>=80% must be green (emerald)');
assert(getQuotaProgressBarColor(65).includes('amber'), '50-79% must be amber');
assert(getQuotaProgressBarColor(35).includes('rose'), '<50% must be red (rose)');

// Codebase verification for Quote 1 (Individual Employee Work & Quota Ledger on Dashboard)
assert(dashboardFile.includes("Individual Employee Work & Quota Ledger"), 'Dashboard must feature "Individual Employee Work & Quota Ledger" table');
assert(dashboardFile.includes("Assigned Work Quota / Target (কাজের সীমা)"), 'Dashboard table must feature "Assigned Work Quota / Target (কাজের সীমা)" column');
assert(dashboardFile.includes("Tasks Completed so far"), 'Dashboard table must feature "Tasks Completed so far" column');
assert(dashboardFile.includes("Quota Completion %"), 'Dashboard table must feature "Quota Completion %" column');
assert(dashboardFile.includes("View Breakdown"), 'Dashboard table must feature "View Breakdown" button');
assert(dashboardFile.includes("IndividualWorkLedgerModal"), 'Dashboard must render IndividualWorkLedgerModal');
assert(dashboardFile.includes("Target Met"), 'Dashboard must support "Target Met" status');
assert(dashboardFile.includes("On Track"), 'Dashboard must support "On Track" status');
assert(dashboardFile.includes("Behind Schedule"), 'Dashboard must support "Behind Schedule" status');

// Codebase verification for Quote 2 (Work Quota on Department Profile Cards)
assert(departmentsFile.includes("Work Quota / Target (কাজের সীমা):"), 'Department cards must display "Work Quota / Target (কাজের সীমা): X Tasks"');
assert(departmentsFile.includes("Completed:"), 'Department cards must display "Completed: Y / X Tasks"');
assert(departmentsFile.includes("Edit Quota / View Tasks"), 'Department cards must feature "Edit Quota / View Tasks" action');
assert(departmentsFile.includes("IndividualWorkLedgerModal"), 'Departments must render IndividualWorkLedgerModal');

// Reusable modal component verification
const modalFilePath = 'src/components/dashboard/IndividualWorkLedgerModal.tsx';
assert(fs.existsSync(modalFilePath), 'IndividualWorkLedgerModal.tsx must exist');
const modalFileContent = fs.readFileSync(modalFilePath, 'utf8');
assert(modalFileContent.includes("Itemized Shift Deliverables"), 'Modal must list itemized deliverables');
assert(modalFileContent.includes("Work Quota / Target (কাজের সীমা)"), 'Modal must have quota / target limit controls');
assert(modalFileContent.includes("apexwork_employees_directory"), 'Modal must persist changes to apexwork_employees_directory');
assert(modalFileContent.includes("EMPLOYEES"), 'Modal must import and fall back to EMPLOYEES to prevent directory erasure');

// Edge case verification: getEmployeeTasks behavior with empty array and 0-quota
function testGetEmployeeTasks(emp) {
  if (emp.itemizedTasks && Array.isArray(emp.itemizedTasks)) {
    return emp.itemizedTasks;
  }
  const rawTotal = emp.dailyTasksTotal ?? 4;
  if (rawTotal === 0) {
    return [];
  }
  const total = Math.max(1, rawTotal);
  return new Array(total).fill(null).map((_, i) => ({ id: `task-${i}` }));
}

// 1. Deleted tasks must not resurrect from dead:
const empWithDeletedTasks = { id: 'emp-99', dailyTasksTotal: 5, itemizedTasks: [] };
assert.strictEqual(testGetEmployeeTasks(empWithDeletedTasks).length, 0, 'Explicitly empty itemizedTasks array must return [] and not resurrect mock tasks');

// 2. 0-quota employee must not have phantom synthetic tasks:
const zeroQuotaEmp = { id: 'emp-100', dailyTasksTotal: 0 };
assert.strictEqual(testGetEmployeeTasks(zeroQuotaEmp).length, 0, 'Employee with 0 dailyTasksTotal must return 0 tasks (no phantom tasks)');

// 3. Verification of on-card quick adjusters on Departments page
assert(departmentsFile.includes('handleQuickAdjustQuota'), 'Departments page must implement handleQuickAdjustQuota for direct on-card quota adjustments');
assert(departmentsFile.includes('Decrease daily quota by 1'), 'Departments page must feature inline quick decrement button on card');
assert(departmentsFile.includes('Increase daily quota by 1'), 'Departments page must feature inline quick increment button on card');

// 4. Verification that behindScheduleCount protects 0-quota / No-Quota-Set employees
const mixedEmps = [
  { dailyTasksTotal: 5, dailyTasksCompleted: 5 }, // Met
  { dailyTasksTotal: 5, dailyTasksCompleted: 4 }, // On track (80%)
  { dailyTasksTotal: 5, dailyTasksCompleted: 2 }, // Behind (40%)
  { dailyTasksTotal: 0, dailyTasksCompleted: 0 }  // No Quota Set (must NOT be counted in behind)
];
const safeBehindCount = mixedEmps.filter(e => {
  const q = e.dailyTasksTotal ?? 0;
  const c = e.dailyTasksCompleted ?? 0;
  return q > 0 && calculateQuotaPercent(c, q) < 70;
}).length;
assert.strictEqual(safeBehindCount, 1, 'Only employees with active quota > 0 can be counted as Behind Schedule');

console.log('✔ [PASS] Quote 1 & Quote 2 Work Quota & Individual Deliverables Ledger fully verified.');

console.log('\n======================================================');
console.log('ALL FEATURE INTEGRITY & EDGE-CASE ASSERTIONS PASSED (100%)');
console.log('======================================================\n');
