const routes = [
  { path: '/', expected: 'ApexWork Enterprise', expectedStatus: 200 },
  { path: '/dashboard', expected: 'Live Team Roster', expectedStatus: 200 },
  { path: '/dashboard/departments', expected: 'Department Portfolios', expectedStatus: 200 },
  { path: '/dashboard/roster', expected: 'Weekly Shift Deployment Matrix', expectedStatus: 200 },
  { path: '/dashboard/analytics', expected: 'Continuous 30-Day Shift Activity Timeline', expectedStatus: 200 },
  { path: '/dashboard/screenshots', expected: 'Audited Shift Screenshot Vault', expectedStatus: 200 },
  { path: '/dashboard/work-updates', expected: 'Daily Work Updates', expectedStatus: 200 },
  { path: '/dashboard/settings', expected: 'Policy Configuration', expectedStatus: 200 },
  { path: '/_not-found', expected: 'Page Not Found in Vault', expectedStatus: 404 }
];

async function checkRoutes() {
  let port = process.env.PORT;
  if (!port) {
    try {
      const test3000 = await fetch('http://localhost:3000/');
      if (test3000.status === 200) port = '3000';
    } catch {
      try {
        const test3006 = await fetch('http://localhost:3006/');
        if (test3006.status === 200) port = '3006';
      } catch {
        port = '3000';
      }
    }
  }
  if (!port) port = '3000';

  console.log(`Testing routes against http://localhost:${port}...`);
  let allOk = true;
  for (const r of routes) {
    try {
      const res = await fetch(`http://localhost:${port}${r.path}`);
      const text = await res.text();
      const containsExpected = text.includes(r.expected);
      const targetStatus = r.expectedStatus || 200;
      if (res.status === targetStatus && containsExpected) {
        console.log(`[PASS] ${r.path} -> HTTP ${res.status} (Verified content: "${r.expected}")`);
      } else {
        console.error(`[FAIL] ${r.path} -> HTTP ${res.status} (Expected ${targetStatus}), Content match: ${containsExpected}`);
        allOk = false;
      }
    } catch (err) {
      console.error(`[FAIL] ${r.path} -> ${err.message}`);
      allOk = false;
    }
  }
  if (allOk) {
    console.log('\n>>> ALL 9 ROUTES DEEPLY VERIFIED WITH EXPECTED HTTP STATUS AND VALID CONTENT! <<<');
    process.exit(0);
  } else {
    process.exit(1);
  }
}

checkRoutes();
