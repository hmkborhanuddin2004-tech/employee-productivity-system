import assert from 'node:assert';
import fs from 'node:fs';
import { TRANSLATIONS, getTranslation } from './src/lib/translations.ts';

console.log('=== RUNNING BILINGUAL TRANSLATION DEEP VERIFICATION ===\n');

// 1. Verify dictionary structure and content
const allKeys = Object.keys(TRANSLATIONS);
console.log(`Total dictionary keys registered: ${allKeys.length}`);
assert(allKeys.length >= 600, `Expected >= 600 keys, found ${allKeys.length}`);

let validBanglaKeys = 0;

for (const key of allKeys) {
  const entry = TRANSLATIONS[key];
  assert(entry, `Key "${key}" must have an entry`);
  assert(typeof entry.en === 'string' && entry.en.trim().length > 0, `Key "${key}" en must be non-empty`);
  assert(typeof entry.bn === 'string' && entry.bn.trim().length > 0, `Key "${key}" bn must be non-empty`);

  // Check for Bengali Unicode characters (\u0980-\u09FF)
  if (/[\u0980-\u09FF]/.test(entry.bn)) {
    validBanglaKeys++;
  }
}

console.log(`✔ [PASS] All ${allKeys.length} translation entries contain non-empty English & Bengali text.`);
console.log(`✔ [PASS] ${validBanglaKeys} of ${allKeys.length} entries contain authentic Bengali characters.`);

// 2. Test getTranslation function
assert.strictEqual(getTranslation('brand.name', 'en'), 'ApexWork Enterprise');
assert.strictEqual(getTranslation('brand.name', 'bn'), 'অ্যাপেক্সওয়ার্ক এন্টারপ্রাইজ');

assert.strictEqual(getTranslation('nav.enter_portal', 'en'), 'Enter Management Portal');
assert.strictEqual(getTranslation('nav.enter_portal', 'bn'), 'ম্যানেজমেন্ট পোর্টালে প্রবেশ');

assert.strictEqual(getTranslation('Work Quota / Target (কাজের সীমা)', 'en'), 'Work Quota / Target (কাজের সীমা)');
assert.strictEqual(getTranslation('Work Quota / Target (কাজের সীমা)', 'bn'), 'কাজের সীমা / টার্গেট (কাজের সীমা)');

assert.strictEqual(getTranslation('updates.post_update', 'en'), 'Post Shift Update');
assert.strictEqual(getTranslation('updates.post_update', 'bn'), 'শিফট আপডেট পোস্ট করুন');

assert.strictEqual(getTranslation('settings.badge_discretionary_gov', 'en'), 'DISCRETIONARY GOVERNANCE');
assert.strictEqual(getTranslation('settings.badge_discretionary_gov', 'bn'), 'বিবেচনামূলক পরিচালনা');

console.log('✔ [PASS] getTranslation successfully resolved key test cases for both "en" and "bn".');

// 3. Verify all UI components import useLanguage or LanguageContext
const clientComponentFiles = [
  'src/components/layout/Navbar.tsx',
  'src/components/layout/Footer.tsx',
  'src/components/common/LanguageSwitcher.tsx',
  'src/components/dashboard/Header.tsx',
  'src/components/dashboard/Sidebar.tsx',
  'src/components/dashboard/ScreenshotMockup.tsx',
  'src/components/dashboard/IndividualWorkLedgerModal.tsx',
  'src/app/page.tsx',
  'src/app/dashboard/layout.tsx',
  'src/app/dashboard/page.tsx',
  'src/app/dashboard/departments/page.tsx',
  'src/app/dashboard/roster/page.tsx',
  'src/app/dashboard/analytics/page.tsx',
  'src/app/dashboard/screenshots/page.tsx',
  'src/app/dashboard/work-updates/page.tsx',
  'src/app/dashboard/settings/page.tsx'
];

for (const file of clientComponentFiles) {
  assert(fs.existsSync(file), `File ${file} must exist`);
  const content = fs.readFileSync(file, 'utf8');
  assert(
    content.includes('useLanguage') || content.includes('LanguageProvider'),
    `File ${file} must connect to language context`
  );
}

console.log(`✔ [PASS] All ${clientComponentFiles.length} core UI files connected to language context.`);

// 4. Verify test-feature-integrity required strings are verbatim preserved
const reqChecks = [
  { file: 'src/app/dashboard/page.tsx', str: "Today's Overall Project / Work Completion" },
  { file: 'src/app/dashboard/page.tsx', str: "Work Done" },
  { file: 'src/app/dashboard/departments/page.tsx', str: "Work Quota / Target (কাজের সীমা):" },
  { file: 'src/app/dashboard/departments/page.tsx', str: "Completed:" },
  { file: 'src/app/dashboard/departments/page.tsx', str: "Edit Quota / View Tasks" },
  { file: 'src/app/dashboard/roster/page.tsx', str: "Weekly Shift Deployment Matrix" },
  { file: 'src/app/dashboard/roster/page.tsx', str: "Daily Work Done" },
  { file: 'src/app/dashboard/settings/page.tsx', str: "Discretionary / Manual Archive & Delete Policy" },
  { file: 'src/app/dashboard/settings/page.tsx', str: "Data is NOT automatically destroyed" },
  { file: 'src/components/dashboard/IndividualWorkLedgerModal.tsx', str: "Itemized Shift Deliverables" },
  { file: 'src/components/dashboard/IndividualWorkLedgerModal.tsx', str: "Work Quota / Target (কাজের সীমা)" }
];

for (const check of reqChecks) {
  const content = fs.readFileSync(check.file, 'utf8');
  assert(content.includes(check.str), `${check.file} must contain "${check.str}" verbatim`);
}

console.log(`✔ [PASS] All ${reqChecks.length} test-critical literal strings verified verbatim.`);
console.log('\n======================================================');
console.log('ALL BILINGUAL TRANSLATION ASSERTIONS PASSED (100%)');
console.log('======================================================\n');
