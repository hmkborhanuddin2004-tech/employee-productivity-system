export type Language = 'en' | 'bn';

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    bn: string;
  };
}

export const TRANSLATIONS: TranslationDictionary = {
  // Global & Brand
  'brand.name': {
    en: 'ApexWork Enterprise',
    bn: 'অ্যাপেক্সওয়ার্ক এন্টারপ্রাইজ'
  },
  'brand.tagline': {
    en: 'Smart Shift Telemetry & Productivity',
    bn: 'স্মার্ট শিফট টেলিমেট্রি ও প্রোডাক্টিভিটি'
  },
  'common.language': {
    en: 'Language',
    bn: 'ভাষা'
  },
  'common.search': {
    en: 'Search',
    bn: 'অনুসন্ধান'
  },
  'common.all': {
    en: 'All',
    bn: 'সকল'
  },
  'common.active': {
    en: 'Active',
    bn: 'সক্রিয়'
  },
  'common.idle': {
    en: 'Idle',
    bn: 'নিষ্ক্রিয়'
  },
  'common.break': {
    en: 'Break',
    bn: 'বিরতি'
  },
  'common.offline': {
    en: 'Offline',
    bn: 'অফলাইন'
  },
  'common.save': {
    en: 'Save Changes',
    bn: 'পরিবর্তন সংরক্ষণ করুন'
  },
  'common.cancel': {
    en: 'Cancel',
    bn: 'বাতিল'
  },
  'common.confirm': {
    en: 'Confirm',
    bn: 'নিশ্চিত করুন'
  },
  'common.delete': {
    en: 'Delete',
    bn: 'মুছুন'
  },
  'common.archive': {
    en: 'Archive',
    bn: 'আর্কাইভ'
  },
  'common.restore': {
    en: 'Restore',
    bn: 'পুনরুদ্ধার'
  },
  'common.view': {
    en: 'View',
    bn: 'দেখুন'
  },
  'common.status': {
    en: 'Status',
    bn: 'স্ট্যাটাস'
  },
  'common.department': {
    en: 'Department',
    bn: 'বিভাগ'
  },
  'common.employee': {
    en: 'Employee',
    bn: 'কর্মী'
  },
  'common.employees': {
    en: 'Employees',
    bn: 'জন কর্মী'
  },
  'common.shift': {
    en: 'Shift',
    bn: 'শিফট'
  },
  'common.tasks': {
    en: 'Tasks',
    bn: 'টি কাজ'
  },
  'common.completed': {
    en: 'Completed',
    bn: 'সম্পন্ন'
  },
  'common.in_progress': {
    en: 'In Progress',
    bn: 'চলমান'
  },
  'common.pending': {
    en: 'Pending',
    bn: 'অপেক্ষমাণ'
  },
  'common.blocked': {
    en: 'Blocked',
    bn: 'স্থগিত'
  },
  'common.actions': {
    en: 'Actions',
    bn: 'পদক্ষেপ'
  },
  'common.export_csv': {
    en: 'Export CSV',
    bn: 'সিএসভি এক্সপোর্ট'
  },
  'common.restore_defaults': {
    en: 'Restore Defaults',
    bn: 'ডিফল্ট পুনরুদ্ধার'
  },
  'common.close': {
    en: 'Close',
    bn: 'বন্ধ করুন'
  },
  'common.dhaka_bst': {
    en: 'DHAKA BST (GMT+6)',
    bn: 'ঢাকা BST (GMT+6)'
  },
  'common.of': {
    en: 'of',
    bn: 'এর'
  },
  'common.hours': {
    en: 'hours',
    bn: 'ঘণ্টা'
  },
  'common.hrs': {
    en: 'hrs',
    bn: 'ঘণ্টা'
  },
  'common.team': {
    en: 'Team',
    bn: 'কর্মী'
  },
  'common.members': {
    en: 'Members',
    bn: 'সদস্য'
  },
  'common.staff': {
    en: 'Staff',
    bn: 'কর্মী'
  },
  'common.done': {
    en: 'Done',
    bn: 'সম্পন্ন'
  },
  'common.left': {
    en: 'left',
    bn: 'বাকি'
  },
  'common.reset_filters': {
    en: 'Reset All Filters',
    bn: 'সব ফিল্টার রিসেট করুন'
  },

  // Quota & Deliverables status labels
  'Target Met': {
    en: 'Target Met',
    bn: 'লক্ষ্য অর্জিত'
  },
  'On Track': {
    en: 'On Track',
    bn: 'সঠিক গতিতে'
  },
  'Behind Schedule': {
    en: 'Behind Schedule',
    bn: 'পিছিয়ে রয়েছে'
  },
  'No Quota Set': {
    en: 'No Quota Set',
    bn: 'কোটা নির্ধারিত হয়নি'
  },

  // Department Names & Descriptions
  'Engineering & IT': {
    en: 'Engineering & IT',
    bn: 'ইঞ্জিনিয়ারিং ও আইটি'
  },
  'Digital Marketing & Growth': {
    en: 'Digital Marketing & Growth',
    bn: 'ডিজিটাল মার্কেটিং ও গ্রোথ'
  },
  'Accounts & Corporate Finance': {
    en: 'Accounts & Corporate Finance',
    bn: 'অ্যাকাউন্টস ও করপোরেট ফিন্যান্স'
  },
  'Human Resources & Talent': {
    en: 'Human Resources & Talent',
    bn: 'হিউম্যান রিসোর্সেস ও ট্যালেন্ট'
  },
  'Creative & Media Production': {
    en: 'Creative & Media Production',
    bn: 'ক্রিয়েটিভ ও মিডিয়া প্রোডাকশন'
  },
  'Core software engineering, desktop agents, automation scripts, and cloud infrastructure.': {
    en: 'Core software engineering, desktop agents, automation scripts, and cloud infrastructure.',
    bn: 'কোর সফটওয়্যার ইঞ্জিনিয়ারিং, ডেস্কটপ এজেন্ট, অটোমেশন স্ক্রিপ্ট ও ক্লাউড অবকাঠামো।'
  },
  'Performance campaigns, social engagement, content creation, and brand outreach.': {
    en: 'Performance campaigns, social engagement, content creation, and brand outreach.',
    bn: 'পারফরম্যান্স ক্যাম্পেইন, সোশ্যাল এনগেজমেন্ট, কন্টেন্ট তৈরি ও ব্র্যান্ড আউটরিচ।'
  },
  'Financial audits, payroll disbursement, tax filings, and fiscal reporting.': {
    en: 'Financial audits, payroll disbursement, tax filings, and fiscal reporting.',
    bn: 'আর্থিক অডিট, বেতন বিতরণ, ট্যাক্স ফাইলিং ও রাজস্ব প্রতিবেদন।'
  },
  'People operations, shift policy compliance, talent acquisition, and employee well-being.': {
    en: 'People operations, shift policy compliance, talent acquisition, and employee well-being.',
    bn: 'পিপল অপারেশনস, শিফট পলিসি কমপ্লায়েন্স, রিক্রুটমেন্ট ও কর্মীদের কল্যাণ।'
  },
  'Motion design, UI/UX asset rendering, product photography, and video storytelling.': {
    en: 'Motion design, UI/UX asset rendering, product photography, and video storytelling.',
    bn: 'মোশন ডিজাইন, ইউআই/ইউএক্স অ্যাসেট রেন্ডারিং, প্রোডাক্ট ফটোগ্রাফি ও ভিডিও স্টোরিটেলিং।'
  },

  // Shift Names
  'Morning Standard Shift': {
    en: 'Morning Standard Shift',
    bn: 'মর্নিং স্ট্যান্ডার্ড শিফট'
  },
  'Evening Support Shift': {
    en: 'Evening Support Shift',
    bn: 'ইভনিং সাপোর্ট শিফট'
  },
  'Flexible Remote Shift': {
    en: 'Flexible Remote Shift',
    bn: 'ফ্লেক্সিবল রিমোট শিফট'
  },

  // Days of Week
  'day.sun': {
    en: 'Sun',
    bn: 'রবি'
  },
  'day.mon': {
    en: 'Mon',
    bn: 'সোম'
  },
  'day.tue': {
    en: 'Tue',
    bn: 'মঙ্গল'
  },
  'day.wed': {
    en: 'Wed',
    bn: 'বুধ'
  },
  'day.thu': {
    en: 'Thu',
    bn: 'বৃহঃ'
  },
  'day.fri': {
    en: 'Fri',
    bn: 'শুক্র'
  },
  'day.sat': {
    en: 'Sat',
    bn: 'শনি'
  },
  'Sun': {
    en: 'Sunday',
    bn: 'রবিবার'
  },
  'Mon': {
    en: 'Monday',
    bn: 'সোমবার'
  },
  'Tue': {
    en: 'Tuesday',
    bn: 'মঙ্গলবার'
  },
  'Wed': {
    en: 'Wednesday',
    bn: 'বুধবার'
  },
  'Thu': {
    en: 'Thursday',
    bn: 'বৃহস্পতিবার'
  },
  'Fri': {
    en: 'Friday',
    bn: 'শুক্রবার'
  },
  'Sat': {
    en: 'Saturday',
    bn: 'শনিবার'
  },

  // Months
  'September 2026': {
    en: 'September 2026',
    bn: 'সেপ্টেম্বর ২০২৬'
  },
  'August 2026': {
    en: 'August 2026',
    bn: 'আগস্ট ২০২৬'
  },
  'July 2026': {
    en: 'July 2026',
    bn: 'জুলাই ২০২৬'
  },
  'month.september_2026': {
    en: 'September 2026',
    bn: 'সেপ্টেম্বর ২০২৬'
  },
  'month.august_2026': {
    en: 'August 2026',
    bn: 'আগস্ট ২০২৬'
  },
  'month.july_2026': {
    en: 'July 2026',
    bn: 'জুলাই ২০২৬'
  },

  // Trigger Reasons
  'Routine Shift Interval': {
    en: 'Routine Shift Interval',
    bn: 'রুটিন শিফট ব্যবধান'
  },
  'Prolonged Inactivity Check': {
    en: 'Prolonged Inactivity Check',
    bn: 'দীর্ঘ নিষ্ক্রিয়তা যাচাই'
  },
  'Shift Check-in': {
    en: 'Shift Check-in',
    bn: 'শিফট চেক-ইন'
  },
  'Task Milestone Submission': {
    en: 'Task Milestone Submission',
    bn: 'কাজের মাইলস্টোন জমা'
  },

  // Navigation Links
  'nav.overview': {
    en: 'Overview',
    bn: 'সারসংক্ষেপ'
  },
  'nav.overview_dashboard': {
    en: 'Overview Dashboard',
    bn: 'সারসংক্ষেপ ড্যাশবোর্ড'
  },
  'nav.departments': {
    en: 'Department Portfolios',
    bn: 'বিভাগীয় পোর্টফোলিও'
  },
  'nav.roster': {
    en: 'Shift Roster & Schedule',
    bn: 'শিফট রোস্টার ও শিডিউল'
  },
  'nav.roster_planner': {
    en: 'Shift Roster Planner',
    bn: 'শিফট রোস্টার প্ল্যানার'
  },
  'nav.analytics': {
    en: 'Monthly Analytics',
    bn: 'মাসিক অ্যানালিটিক্স'
  },
  'nav.analytics_visual': {
    en: 'Monthly Visual Analytics',
    bn: 'মাসিক ভিজ্যুয়াল অ্যানালিটিক্স'
  },
  'nav.screenshots': {
    en: 'Screenshot Vault',
    bn: 'স্ক্রিনশট ভল্ট'
  },
  'nav.work_updates': {
    en: 'Work Updates Feed',
    bn: 'কাজের আপডেট ফিড'
  },
  'nav.settings': {
    en: 'Policy & Settings',
    bn: 'নীতিমালা ও সেটিংস'
  },
  'nav.public_site': {
    en: 'Public Company Site',
    bn: 'পাবলিক কোম্পানি সাইট'
  },
  'nav.enter_portal': {
    en: 'Enter Management Portal',
    bn: 'ম্যানেজমেন্ট পোর্টালে প্রবেশ'
  },
  'nav.launch_portal': {
    en: 'Launch Management Portal',
    bn: 'ম্যানেজমেন্ট পোর্টাল চালু করুন'
  },
  'nav.features': {
    en: 'Features',
    bn: 'ফিচারসমূহ'
  },
  'nav.shift_system': {
    en: 'Shift Automation',
    bn: 'শিফট অটোমেশন'
  },
  'nav.privacy_ethics': {
    en: 'Privacy & Ethics',
    bn: 'প্রাইভেসি ও নীতিমালা'
  },
  'nav.privacy_first': {
    en: 'Privacy First',
    bn: 'প্রাইভেসি প্রথম'
  },

  // Header & Sidebar & Command Palette
  'header.shift_live': {
    en: 'Morning Shift Live',
    bn: 'মর্নিং শিফট চলমান'
  },
  'header.supervisor_view': {
    en: 'Supervisor View',
    bn: 'সুপারভাইজার ভিউ'
  },
  'header.search_placeholder': {
    en: 'Quick search employee, route, shift...',
    bn: 'দ্রুত খুঁজুন কর্মী, রুট, শিফট...'
  },
  'header.active_counter': {
    en: 'Active:',
    bn: 'সক্রিয়:'
  },
  'header.role_admin': {
    en: 'Executive Admin',
    bn: 'এক্সিকিউটিভ অ্যাডমিন'
  },
  'header.role_supervisor': {
    en: 'Department Supervisor',
    bn: 'ডিপার্টমেন্ট সুপারভাইজার'
  },
  'header.simulate_portal_view': {
    en: 'Simulate Portal View',
    bn: 'পোর্টাল ভিউ সিমুলেট করুন'
  },
  'header.notifications': {
    en: 'System Notifications',
    bn: 'সিস্টেম নোটিফিকেশন'
  },
  'header.notif_handover_title': {
    en: 'Shift Handover Imminent',
    bn: 'শিফট হস্তান্তর আসন্ন'
  },
  'header.notif_handover_desc': {
    en: 'Evening Support Shift starts at 02:00 PM BST. Client triggers primed across 6 workstations.',
    bn: 'ইভনিং সাপোর্ট শিফট দুপুর ০২:০০ টায় শুরু হবে। ৬টি ওয়ার্কস্টেশনে ক্লায়েন্ট ট্রিগার প্রস্তুত।'
  },
  'header.notif_purge_title': {
    en: 'Retention Auto-Purge Done',
    bn: 'রিটেনশন অটো-পার্জ সম্পন্ন'
  },
  'header.notif_purge_desc': {
    en: '42 screenshots older than 30 days securely permanently deleted from S3 storage bucket.',
    bn: '৩০ দিনের পুরোনো ৪২টি স্ক্রিনশট S3 স্টোরেজ বাকেট থেকে স্থায়ীভাবে মুছে ফেলা হয়েছে।'
  },
  'header.chief_architect': {
    en: 'Chief Architect',
    bn: 'চিফ আর্কিটেক্ট'
  },
  'header.palette_search_placeholder': {
    en: 'Type to search employees, navigation, or features...',
    bn: 'কর্মী, পেজ বা ফিচার খুঁজতে লিখুন...'
  },
  'header.modules_pages': {
    en: 'Modules & Pages',
    bn: 'মডিউল ও পেজসমূহ'
  },
  'header.team_members': {
    en: 'Team Members',
    bn: 'দলের সদস্যবৃন্দ'
  },
  'header.press_esc': {
    en: 'Press ESC to exit',
    bn: 'বের হতে ESC চাপুন'
  },
  'header.quick_navigator': {
    en: 'Quick Navigator',
    bn: 'কুইক নেভিগেটর'
  },
  'header.active_pill': {
    en: 'Active',
    bn: 'সক্রিয়'
  },
  'header.new_notif_count': {
    en: '2 New',
    bn: '২টি নতুন'
  },

  // Sidebar
  'sidebar.workspace_management': {
    en: 'Workspace Management',
    bn: 'ওয়ার্কস্পেস ম্যানেজমেন্ট'
  },
  'sidebar.zero_covert_title': {
    en: 'Zero Covert Monitoring',
    bn: 'গোপন নজরদারি সম্পূর্ণ নিষিদ্ধ'
  },
  'sidebar.zero_covert_desc': {
    en: 'No keystroke loggers. Screen captures are interval-audited & automatically masked for sensitive windows.',
    bn: 'কোনো কিস্ট্রোক লগার নেই। স্ক্রিন ক্যাপচার নির্দিষ্ট বিরতিতে অডিট হয় এবং সংবেদনশীল উইন্ডো স্বয়ংক্রিয়ভাবে মাস্ক করা হয়।'
  },

  // Footer
  'footer.desc': {
    en: 'Ethical, automated employee shift tracking and productivity telemetry platform engineered for modern engineering, marketing, and finance teams.',
    bn: 'আধুনিক ইঞ্জিনিয়ারিং, মার্কেটিং ও ফিন্যান্স দলের জন্য তৈরি নৈতিক ও স্বয়ংক্রিয় শিফট ট্র্যাকিং এবং টেলিমেট্রি প্ল্যাটফর্ম।'
  },
  'footer.portal_modules': {
    en: 'Portal Modules',
    bn: 'পোর্টাল মডিউল'
  },
  'footer.gov_privacy': {
    en: 'Governance & Privacy',
    bn: 'গভর্ন্যান্স ও প্রাইভেসি'
  },
  'footer.charter': {
    en: 'Employee Privacy Charter',
    bn: 'কর্মী প্রাইভেসি সনদ'
  },
  'footer.vault_policy': {
    en: 'Ephemeral S3 Vault Policy',
    bn: 'নিরাপদ S3 ভল্ট পলিসি'
  },
  'footer.purge_standards': {
    en: '30-Day Auto-Purge Standards',
    bn: '৩০-দিনের অটো-পার্জ মানদণ্ড'
  },
  'footer.labor_code': {
    en: 'Bangladesh Labor Code Compliance',
    bn: 'বাংলাদেশ শ্রম আইন সম্মতি'
  },
  'footer.security_infra': {
    en: 'Security Infrastructure',
    bn: 'নিরাপত্তা অবকাঠামো'
  },
  'footer.security_desc': {
    en: 'Screenshots use AES-256 at rest, pre-signed tokens expire in 15 minutes, and local client shuts off automatically outside assigned shift hours.',
    bn: 'স্ক্রিনশট AES-256 এনক্রিপশনে সুরক্ষিত থাকে, প্রি-সাইন্ড টোকেনের মেয়াদ ১৫ মিনিট এবং নির্ধারিত শিফটের বাইরে ক্লায়েন্ট নিজে থেকেই বন্ধ থাকে।'
  },
  'footer.copyright': {
    en: 'All rights reserved. Dhaka, Bangladesh.',
    bn: 'সর্বস্বত্ব সংরক্ষিত। ঢাকা, বাংলাদেশ।'
  },
  'footer.tagline': {
    en: 'Built with precision for ethical enterprise teamwork',
    bn: 'নৈতিক এন্টারপ্রাইজ টিমওয়ার্কের জন্য নিখুঁতভাবে তৈরি'
  },

  // Public Landing Page (app/page.tsx)
  'landing.badge': {
    en: 'Next-Gen Enterprise Productivity Architecture',
    bn: 'নেক্সট-জেন এন্টারপ্রাইজ প্রোডাক্টিভিটি আর্কিটেকচার'
  },
  'landing.badge_location': {
    en: 'Dhaka & Global',
    bn: 'ঢাকা ও গ্লোবাল'
  },
  'landing.hero_title_1': {
    en: 'Smart Shift Tracking,',
    bn: 'স্মার্ট শিফট ট্র্যাকিং,'
  },
  'landing.hero_title_highlight': {
    en: 'Automated Daemons',
    bn: 'স্বয়ংক্রিয় ডিমন'
  },
  'landing.hero_title_2': {
    en: '& Transparent Analytics.',
    bn: 'ও স্বচ্ছ অ্যানালিটিক্স।'
  },
  'landing.hero_subtitle': {
    en: 'The desktop agent wakes up automatically at shift time, logs active time objectively, and stores interval screenshots in an audited web vault. Zero keyloggers, zero personal spying.',
    bn: 'ডেস্কটপ এজেন্ট শিফটের সময়ে স্বয়ংক্রিয়ভাবে চালু হয়, কর্মঘণ্টা নিরপেক্ষভাবে রেকর্ড করে এবং অডিটেড ওয়েব ভল্টে স্ক্রিনশট সংরক্ষণ করে। কোনো কিলগার নেই, কোনো ব্যক্তিগত নজরদারি নেই।'
  },
  'landing.how_it_works': {
    en: 'How Auto-Launch Works',
    bn: 'অটো-লঞ্চ যেভাবে কাজ করে'
  },
  'landing.trust_auto_start': {
    en: 'Auto-Start on Shift Time',
    bn: 'শিফটের সময়ে স্বয়ংক্রিয় শুরু'
  },
  'landing.trust_web_vault': {
    en: 'Centralized Web Vault (No Telegram Mess)',
    bn: 'কেন্দ্রীভূত ওয়েব ভল্ট (টেলিগ্রামের ঝামেলামুক্ত)'
  },
  'landing.trust_zero_keystroke': {
    en: 'Zero Keystroke Logging',
    bn: 'কিস্ট্রোক রেকর্ডিং সম্পূর্ণ মুক্ত'
  },
  'landing.telemetry_gateway': {
    en: 'Live Telemetry Gateway',
    bn: 'লাইভ টেলিমেট্রি গেটওয়ে'
  },
  'landing.active_now': {
    en: 'Active Now',
    bn: 'বর্তমানে সক্রিয়'
  },
  'landing.shift_hours_today': {
    en: 'Shift Hours Today',
    bn: 'আজকের শিফট ঘণ্টা'
  },
  'landing.monthly_activity': {
    en: 'Monthly Activity',
    bn: 'মাসিক অ্যাক্টিভিটি'
  },
  'landing.vault_security': {
    en: 'Vault Security',
    bn: 'ভল্ট সিকিউরিটি'
  },
  'landing.expiring_links': {
    en: 'Expiring Links',
    bn: 'মেয়াদোত্তীর্ণ লিংক'
  },
  'landing.assigned_shift': {
    en: 'Assigned Shift',
    bn: 'নির্ধারিত শিফট'
  },
  'landing.live_status': {
    en: 'Live Status',
    bn: 'লাইভ স্ট্যাটাস'
  },
  'landing.features_tag': {
    en: 'Core Capabilities',
    bn: 'মূল সক্ষমতা'
  },
  'landing.features_title': {
    en: 'Designed to Solve Real Workplace Challenges',
    bn: 'বাস্তব কর্মক্ষেত্রের চ্যালেঞ্জ সমাধানে নির্মিত'
  },
  'landing.features_subtitle': {
    en: 'Built specifically to replace cumbersome Telegram bot channels with a clean, centralized web application and smart desktop daemons.',
    bn: 'ঝামেলাপূর্ণ টেলিগ্রাম বট চ্যানেলের বদলে একটি গোছানো ও কেন্দ্রীভূত ওয়েব অ্যাপ এবং স্মার্ট ডেস্কটপ এজেন্ট ব্যবহারের জন্য বিশেষভাবে তৈরি।'
  },
  'landing.feat1_title': {
    en: 'Automated Shift Daemon',
    bn: 'স্বয়ংক্রিয় শিফট ডিমন'
  },
  'landing.feat1_desc': {
    en: 'Employees do not need to remember to check in. The desktop client reads the company roster, wakes up when their shift starts (e.g. 09:00 AM), and runs neutrally in the background.',
    bn: 'কর্মীদের চেক-ইন করার কথা মনে রাখতে হয় না। ডেস্কটপ ক্লায়েন্ট কোম্পানির রোস্টার পড়ে এবং শিফট শুরু হলে (যেমন সকাল ০৯:০০ টায়) স্বয়ংক্রিয়ভাবে ব্যাকগ্রাউন্ডে চালু হয়।'
  },
  'landing.feat1_meta': {
    en: 'Zero Manual Overhead',
    bn: 'কোনো ম্যানুয়াল ঝামেলা নেই'
  },
  'landing.feat2_title': {
    en: 'Audited Web Vault',
    bn: 'অডিটেড ওয়েব ভল্ট'
  },
  'landing.feat2_desc': {
    en: 'No more messy Telegram group dumps. Screenshots are stored in secure S3 buckets, accessed via 15-minute expiring pre-signed URLs, and auto-purged permanently after 30 days.',
    bn: 'টেলিগ্রাম গ্রুপে আর বিশৃঙ্খল স্ক্রিনশট ডাম্প নয়। স্ক্রিনশট সুরক্ষিত S3 বাকেটে সংরক্ষিত থাকে, ১৫ মিনিটের মেয়াদি লিংকে খোলা যায় এবং ৩০ দিন পর স্বয়ংক্রিয়ভাবে মুছে যায়।'
  },
  'landing.feat2_meta': {
    en: '15-Min Expiring Links',
    bn: '১৫ মিনিটের মেয়াদি লিংক'
  },
  'landing.feat3_title': {
    en: 'Objective Monthly Graphs',
    bn: 'বস্তুনিষ্ঠ মাসিক গ্রাফ'
  },
  'landing.feat3_desc': {
    en: 'The web application aggregates monthly hours, active vs. idle ratio, and individual performance ratings automatically. Management gets clean visual charts at a glance.',
    bn: 'ওয়েব অ্যাপ্লিকেশন স্বয়ংক্রিয়ভাবে মাসিক ঘণ্টা, সক্রিয় বনাম নিষ্ক্রিয় সময়ের অনুপাত ও একক পারফরম্যান্স রেটিং হিসাব করে দেয়।'
  },
  'landing.feat3_meta': {
    en: 'Interactive 30-Day Trends',
    bn: 'ইন্টারেক্টিভ ৩০ দিনের ট্রেন্ড'
  },
  'landing.shift_sync_tag': {
    en: 'Intelligent Synchronization',
    bn: 'ইন্টেলিজেন্ট সিঙ্ক্রোনাইজেশন'
  },
  'landing.shift_sync_title': {
    en: 'How the Desktop Client Synchronizes with the Web Roster',
    bn: 'ডেস্কটপ ক্লায়েন্ট যেভাবে ওয়েব রোস্টারের সাথে সিঙ্ক করে'
  },
  'landing.shift_step1_title': {
    en: 'Shift Schedule Ingestion:',
    bn: 'শিফট শিডিউল পর্যবেক্ষণ:'
  },
  'landing.shift_step1_desc': {
    en: "The desktop agent checks with the central web portal for today's assigned shift (e.g. 09:00 AM - 06:00 PM).",
    bn: 'ডেস্কটপ এজেন্ট সেন্ট্রাল ওয়েব পোর্টাল থেকে আজকের নির্ধারিত শিফটের তথ্য নেয় (যেমন সকাল ০৯:০০ - সন্ধ্যা ০৬:০০)।'
  },
  'landing.shift_step2_title': {
    en: 'Automatic Start:',
    bn: 'স্বয়ংক্রিয় শুরু:'
  },
  'landing.shift_step2_desc': {
    en: 'Once the clock reaches shift time, the client automatically switches to Active mode. No manual buttons need to be pressed.',
    bn: 'ঘড়িতে শিফটের সময় হওয়ার সাথে সাথেই ক্লায়েন্ট নিজে থেকেই অ্যাক্টিভ মোডে চলে যায়। কোনো ম্যানুয়াল বাটন চাপতে হয় না।'
  },
  'landing.shift_step3_title': {
    en: 'Zero-Overhead Idle Sensor:',
    bn: 'জিরো-ওভারহেড আইডল সেন্সর:'
  },
  'landing.shift_step3_desc': {
    en: 'Uses native Windows GetLastInputInfo to detect inactivity beyond 10 minutes, protecting accurate productivity metrics.',
    bn: '১০ মিনিটের বেশি নিষ্ক্রিয়তা শনাক্ত করতে উইন্ডোজের নেটিভ GetLastInputInfo ব্যবহার করে নির্ভুল প্রোডাক্টিভিটি হিসাব রাখে।'
  },
  'landing.shift_step4_title': {
    en: 'Automatic Shutdown on Shift End:',
    bn: 'শিফট শেষে স্বয়ংক্রিয় বন্ধ:'
  },
  'landing.shift_step4_desc': {
    en: 'When 06:00 PM arrives, the tracking agent unhooks and shuts down. No off-hours monitoring.',
    bn: 'সন্ধ্যা ০৬:০০ টা বাজলেই ট্র্যাকিং এজেন্ট বন্ধ হয়ে যায়। শিফট শেষ হলে কোনো নজরদারি থাকে না।'
  },
  'landing.shifts_profile_title': {
    en: 'Active Standard Shift Profiles',
    bn: 'সক্রিয় স্ট্যান্ডার্ড শিফট প্রোফাইল'
  },
  'landing.team_org_tag': {
    en: 'Team Organization',
    bn: 'টিম অর্গানাইজেশন'
  },
  'landing.team_org_title': {
    en: 'Dedicated Department Portfolios',
    bn: 'ডেডিকেটেড বিভাগীয় পোর্টফোলিও'
  },
  'landing.team_org_subtitle': {
    en: 'Every department has its own live headcount, productivity score, and daily task deliverable feed.',
    bn: 'প্রতিটি বিভাগের রয়েছে নিজস্ব লাইভ কর্মী সংখ্যা, প্রোডাক্টিভিটি স্কোর এবং দৈনিক কাজের ডেলিভারেবল ফিড।'
  },
  'landing.ethics_tag': {
    en: 'Trust & Compliance',
    bn: 'আস্থা ও কমপ্লায়েন্স'
  },
  'landing.ethics_title': {
    en: 'Privacy-First Architecture: What We NEVER Track',
    bn: 'প্রাইভেসি-ফার্স্ট আর্কিটেকচার: যা আমরা কখনোই ট্র্যাক করি না'
  },
  'landing.ethics_subtitle': {
    en: 'Built with respect for employee dignity. Strict boundary enforcement hard-coded into the client.',
    bn: 'কর্মীর আত্মমর্যাদার প্রতি শ্রদ্ধা রেখে তৈরি। ক্লায়েন্ট কোডে কঠোর গোপনীয়তা বজায় রাখা হয়েছে।'
  },
  'landing.eth1_title': {
    en: 'Zero Keystroke Logging',
    bn: 'কিস্ট্রোক রেকর্ডিং সম্পূর্ণ মুক্ত'
  },
  'landing.eth1_desc': {
    en: 'Passwords, private messages, and personal writings are completely invisible. No keylogger is installed.',
    bn: 'পাসওয়ার্ড, ব্যক্তিগত বার্তা ও লেখা সম্পূর্ণ অদৃশ্য থাকে। কোনো কিলগার ইনস্টল করা হয় না।'
  },
  'landing.eth2_title': {
    en: 'No Webcam or Audio',
    bn: 'ওয়েবক্যাম বা অডিও সম্পূর্ণ নিষিদ্ধ'
  },
  'landing.eth2_desc': {
    en: 'Hardware access to microphones and webcams is strictly prohibited by our zero-trust agent policy.',
    bn: 'আমাদের জিরো-ট্রাস্ট এজেন্ট নীতিতে মাইক্রোফোন ও ওয়েবক্যাম হার্ডওয়্যার অ্যাক্সেস পুরোপুরি নিষিদ্ধ।'
  },
  'landing.eth3_title': {
    en: '30-Day Auto Purge',
    bn: '৩০-দিনের স্বয়ংক্রিয় অপসারণ'
  },
  'landing.eth3_desc': {
    en: 'Old telemetry and screenshots are permanently wiped from the storage bucket after 30 days.',
    bn: 'পুরোনো টেলিমেট্রি এবং স্ক্রিনশট ৩০ দিন পর স্টোরেজ বাকেট থেকে স্থায়ীভাবে মুছে ফেলা হয়।'
  },
  'landing.eth4_title': {
    en: 'Auto-Blur Sensitive Apps',
    bn: 'সংবেদনশীল অ্যাপ স্বয়ংক্রিয় ব্লার'
  },
  'landing.eth4_desc': {
    en: 'Banking tabs, payroll records, and sensitive passwords are automatically masked before upload.',
    bn: 'ব্যাংকিং ট্যাব, বেতন বিবরণী এবং সংবেদনশীল পাসওয়ার্ড আপলোড হওয়ার আগেই স্বয়ংক্রিয়ভাবে ব্লার বা মাস্ক হয়ে যায়।'
  },
  'landing.cta_title': {
    en: 'Ready to Explore the Management Dashboard?',
    bn: 'ম্যানেজমেন্ট ড্যাশবোর্ড দেখতে প্রস্তুত?'
  },
  'landing.cta_desc': {
    en: 'Inspect active shifts, employee portfolios, automated roster timetables, and audited screenshots right now.',
    bn: 'সক্রিয় শিফট, কর্মীদের পোর্টফোলিও, স্বয়ংক্রিয় রোস্টার সময়সূচি এবং অডিট করা স্ক্রিনশট এখনই দেখুন।'
  },

  // Overview Dashboard (app/dashboard/page.tsx)
  'dashboard.live_control': {
    en: 'Live Operations Control',
    bn: 'লাইভ অপারেশনস কন্ট্রোল'
  },
  'dashboard.title': {
    en: 'Shift Productivity & Telemetry Dashboard',
    bn: 'শিফট প্রোডাক্টিভিটি ও টেলিমেট্রি ড্যাশবোর্ড'
  },
  'dashboard.subtitle': {
    en: 'Real-time active work telemetry, automated shift auto-start status, and ethical non-intrusive activity audits.',
    bn: 'রিয়েল-টাইম কাজের টেলিমেট্রি, স্বয়ংক্রিয় শিফট শুরুর স্ট্যাটাস এবং গোপনীয়তা রক্ষা করে অ্যাক্টিভিটি অডিট।'
  },
  'dashboard.broadcast_btn': {
    en: 'Broadcast Notice',
    bn: 'জরুরি নোটিশ প্রচার'
  },
  'dashboard.kpi_active': {
    en: 'Active Now',
    bn: 'বর্তমানে সক্রিয়'
  },
  'dashboard.kpi_idle': {
    en: 'Idle / Inactive',
    bn: 'নিষ্ক্রিয় / অলস সময়'
  },
  'dashboard.kpi_hours': {
    en: 'Shift Hours Today',
    bn: 'আজকের শিফট ঘণ্টা'
  },
  "Today's Overall Project / Work Completion": {
    en: "Today's Overall Project / Work Completion",
    bn: 'আজকের সার্বিক প্রকল্প / কাজের সমাপ্তি'
  },
  'dashboard.kpi_completion': {
    en: "Today's Overall Project / Work Completion",
    bn: 'আজকের সার্বিক প্রকল্প / কাজের সমাপ্তি'
  },
  'dashboard.kpi_score': {
    en: 'Monthly Activity Score',
    bn: 'মাসিক অ্যাক্টিভিটি স্কোর'
  },
  'Live Team Roster': {
    en: 'Live Team Roster',
    bn: 'লাইভ টিম রোস্টার'
  },
  'dashboard.roster_title': {
    en: 'Live Team Roster',
    bn: 'লাইভ টিম রোস্টার'
  },
  'dashboard.heartbeat_subtext': {
    en: 'Continuous telemetry heartbeats every 10 seconds',
    bn: 'প্রতি ১০ সেকেন্ডে স্বয়ংক্রিয় টেলিমেট্রি হার্টবিট'
  },
  'dashboard.col_employee': {
    en: 'Employee',
    bn: 'কর্মী'
  },
  'dashboard.col_shift_window': {
    en: 'Shift Window',
    bn: 'শিফট উইন্ডো'
  },
  'dashboard.col_status': {
    en: 'Status',
    bn: 'স্ট্যাটাস'
  },
  'Work Done': {
    en: 'Work Done',
    bn: 'সম্পন্ন কাজ'
  },
  'dashboard.col_work_done': {
    en: 'Work Done',
    bn: 'সম্পন্ন কাজ'
  },
  'dashboard.col_logged': {
    en: 'Logged',
    bn: 'লগড সময়'
  },
  'dashboard.col_heartbeat': {
    en: 'Heartbeat',
    bn: 'হার্টবিট'
  },
  'dashboard.col_portfolio': {
    en: 'Portfolio',
    bn: 'পোর্টফোলিও'
  },
  'dashboard.shift_autorun_title': {
    en: 'Shift Auto-Run Status',
    bn: 'শিফট অটো-রান স্ট্যাটাস'
  },
  'dashboard.daemon_synced': {
    en: 'Client Daemon Synced',
    bn: 'ক্লায়েন্ট ডিমন সিঙ্কড'
  },
  'dashboard.morning_shift_elapsed': {
    en: 'Morning Shift Elapsed:',
    bn: 'মর্নিং শিফটের অতিবাহিত সময়:'
  },
  'dashboard.shift_autorun_desc': {
    en: 'Desktop client automatically started at 09:00 AM on employee work stations. Grace period: 10 mins.',
    bn: 'সকাল ০৯:০০ টায় কর্মীদের ওয়ার্কস্টেশনে ডেস্কটপ ক্লায়েন্ট স্বয়ংক্রিয়ভাবে চালু হয়েছে। গ্রেস পিরিয়ড: ১০ মিনিট।'
  },
  'dashboard.recent_captures_title': {
    en: 'Recent Audited Captures',
    bn: 'সাম্প্রতিক অডিট ক্যাপচার'
  },
  'dashboard.expiring_signed_links': {
    en: '15-min expiring signed links',
    bn: '১৫ মিনিটের মেয়াদি স্বাক্ষরিত লিংক'
  },
  'dashboard.auto_purge_30d': {
    en: 'Auto-Purge 30d',
    bn: '৩০ দিনে অটো-পার্জ'
  },
  'dashboard.masked': {
    en: 'Masked',
    bn: 'মাস্কড'
  },
  'dashboard.no_employees_found': {
    en: 'No employees found matching selected department and status filters.',
    bn: 'নির্বাচিত বিভাগ ও স্ট্যাটাস ফিল্টারে কোনো কর্মী পাওয়া যায়নি।'
  },
  'dashboard.reset_all_filters': {
    en: 'Reset All Filters',
    bn: 'সব ফিল্টার রিসেট করুন'
  },
  'dashboard.target_hours_label': {
    en: 'Target: 64.0 hrs',
    bn: 'টার্গেট: ৬৪.০ ঘণ্টা'
  },
  'dashboard.target_score_label': {
    en: 'Target: >90% compliant',
    bn: 'টার্গেট: >৯০% কমপ্লায়েন্ট'
  },
  'dashboard.week_change_positive': {
    en: '+1.4% this week',
    bn: '+১.৪% এই সপ্তাহে'
  },
  'dashboard.completed_tasks_summary': {
    en: 'tasks completed today',
    bn: 'টি কাজ আজ সম্পন্ন হয়েছে'
  },
  'dashboard.sensor_active': {
    en: 'Sensor Active',
    bn: 'সেন্সর সক্রিয়'
  },
  'dashboard.on_break': {
    en: 'On Break',
    bn: 'বিরতিতে'
  },

  // Broadcast Modal (Dashboard)
  'dashboard.broadcast_modal_title': {
    en: 'Broadcast Announcement to Active Employees',
    bn: 'সক্রিয় কর্মীদের কাছে জরুরি নোটিশ প্রচার'
  },
  'dashboard.broadcast_modal_subtitle': {
    en: 'Desktop client notification will pop up on shift agents',
    bn: 'শিফট কর্মীদের ডেস্কটপ এজেন্টে নোটিফিকেশন পপ-আপ হবে'
  },
  'dashboard.notice_message_label': {
    en: 'Notice Message',
    bn: 'নোটিশ বার্তা'
  },
  'dashboard.broadcast_placeholder': {
    en: 'e.g. All-hands sprint retrospective starts today at 04:30 PM. Please save ongoing work.',
    bn: 'যেমন: আজকের অল-হ্যান্ডস স্প্রিন্ট রেট্রোস্পেক্টিভ বিকেল ০৪:৩০ এ শুরু হবে। অনুগ্রহ করে চলমান কাজ সংরক্ষণ করুন।'
  },
  'dashboard.send_broadcast': {
    en: 'Send Broadcast',
    bn: 'নোটিশ পাঠান'
  },
  'dashboard.announcement_broadcasted': {
    en: 'Announcement Broadcasted!',
    bn: 'নোটিশ সফলভাবে প্রচার করা হয়েছে!'
  },
  'dashboard.announcement_sent_to': {
    en: 'Sent to all currently active desktop applications.',
    bn: 'বর্তমানে সক্রিয় সকল ডেস্কটপ অ্যাপ্লিকেশনে পাঠানো হয়েছে।'
  },

  // Screenshot Audit Modal (Dashboard)
  'dashboard.screenshot_audit_title': {
    en: 'Screenshot Audit',
    bn: 'স্ক্রিনশট অডিট'
  },
  'dashboard.trigger_reason_label': {
    en: 'Trigger Reason:',
    bn: 'ট্রিগারের কারণ:'
  },
  'dashboard.audit_code_label': {
    en: 'Security Audit Code:',
    bn: 'সিকিউরিটি অডিট কোড:'
  },

  // Employee Detailed Portfolio Modal (Dashboard)
  'dashboard.employee_portfolio': {
    en: 'Portfolio',
    bn: 'পোর্টফোলিও'
  },
  'dashboard.today_logged': {
    en: 'Today Logged',
    bn: 'আজকের লগড সময়'
  },
  'dashboard.monthly_activity_stat': {
    en: 'Monthly Activity',
    bn: 'মাসিক অ্যাক্টিভিটি'
  },
  'dashboard.productivity_rating': {
    en: 'Productivity rating',
    bn: 'প্রোডাক্টিভিটি রেটিং'
  },
  'dashboard.idle_ratio': {
    en: 'Idle Ratio',
    bn: 'নিষ্ক্রিয় অনুপাত'
  },
  'dashboard.across_30_days': {
    en: 'Across 30 days',
    bn: 'বিগত ৩০ দিনে'
  },
  'dashboard.auto_trigger': {
    en: 'Auto-Trigger',
    bn: 'অটো-ট্রিগার'
  },
  'dashboard.scheduled': {
    en: 'Scheduled',
    bn: 'নির্ধারিত'
  },
  'dashboard.desktop_app_sync': {
    en: 'Desktop App Sync',
    bn: 'ডেস্কটপ অ্যাপ সিঙ্ক'
  },
  'dashboard.adjust_quota_btn': {
    en: 'Adjust Quota / View Tasks',
    bn: 'কোটা সমন্বয় / কাজসমূহ দেখুন'
  },
  'dashboard.daily_deliverable_progress': {
    en: 'Daily Deliverable Progress:',
    bn: 'দৈনিক কাজের অগ্রগতি:'
  },
  'dashboard.today_deliverable_heading': {
    en: "Today's Deliverable:",
    bn: 'আজকের প্রধান ডেলিভারেবল:'
  },
  'dashboard.latest_task_update': {
    en: 'Latest Task Update',
    bn: 'সর্বশেষ কাজের আপডেট'
  },
  'dashboard.project_tag': {
    en: 'Project:',
    bn: 'প্রকল্প:'
  },
  'dashboard.privacy_guarantee_text': {
    en: 'Privacy Guarantee: Keystrokes are never logged. Heartbeats only monitor active window titles and input idle delta.',
    bn: 'গোপনীয়তার নিশ্চয়তা: কিস্ট্রোক কখনোই রেকর্ড করা হয় না। হার্টবিট শুধুমাত্র সক্রিয় উইন্ডোর শিরোনাম ও নিষ্ক্রিয় সময় পর্যবেক্ষণ করে।'
  },
  'dashboard.last_heartbeat': {
    en: 'Last seen',
    bn: 'সর্বশেষ সক্রিয়'
  },

  // Individual Work & Quota Ledger Section
  'Individual Employee Work & Quota Ledger': {
    en: 'Individual Employee Work & Quota Ledger',
    bn: 'স্বতন্ত্র কর্মী কাজের হিসাব ও কোটা লেজার'
  },
  'dashboard.ledger_title': {
    en: 'Individual Employee Work & Quota Ledger',
    bn: 'স্বতন্ত্র কর্মী কাজের হিসাব ও কোটা লেজার'
  },
  'dashboard.ledger_tag': {
    en: 'কাজের সীমা ও স্বতন্ত্র কাজের হিসাব',
    bn: 'কাজের সীমা ও স্বতন্ত্র কাজের হিসাব'
  },
  'dashboard.ledger_desc': {
    en: "Boss & Manager view to monitor each team member's assigned work quota (কাজের সীমা), deliverables accomplished, and completion progress percentages.",
    bn: 'বস ও ম্যানেজার ভিউ: প্রতিটি কর্মীর জন্য নির্ধারিত কাজের সীমা (কোটা), সম্পন্ন কাজের ফলাফল ও অগ্রগতির শতকরা হার পর্যবেক্ষণ।'
  },
  'dashboard.ledger_total_quotas': {
    en: 'Total Quotas',
    bn: 'মোট কাজের কোটা'
  },
  'dashboard.ledger_completed_tasks': {
    en: 'Completed Tasks',
    bn: 'সম্পন্ন হওয়া কাজ'
  },
  'dashboard.ledger_target_met': {
    en: 'Target Met',
    bn: 'লক্ষ্য অর্জিত'
  },
  'dashboard.ledger_behind': {
    en: 'Behind Schedule',
    bn: 'পিছিয়ে রয়েছে'
  },
  'dashboard.ledger_search_placeholder': {
    en: 'Search employee, code, role, or department...',
    bn: 'কর্মী, কোড, পদবি বা বিভাগ খুঁজুন...'
  },
  'dashboard.no_ledger_match': {
    en: 'No employees found matching the quota ledger filter.',
    bn: 'কোটা লেজার ফিল্টারের সাথে কোনো কর্মী মেলেনি।'
  },
  'dashboard.reset_filters': {
    en: 'Reset Ledger Filters',
    bn: 'লেজার ফিল্টার রিসেট করুন'
  },
  'Assigned Work Quota / Target (কাজের সীমা)': {
    en: 'Assigned Work Quota / Target (কাজের সীমা)',
    bn: 'নির্ধারিত কাজের সীমা / টার্গেট (কাজের সীমা)'
  },
  'Tasks Completed so far': {
    en: 'Tasks Completed so far',
    bn: 'সম্পন্ন হওয়া কাজের সংখ্যা'
  },
  'Quota Completion %': {
    en: 'Quota Completion %',
    bn: 'কোটা সমাপ্তির হার %'
  },
  'View Breakdown': {
    en: 'View Breakdown',
    bn: 'বিস্তারিত দেখুন'
  },
  'Decrease daily quota by 1': {
    en: 'Decrease daily quota by 1',
    bn: 'দৈনিক কোটা ১ কমান'
  },
  'Increase daily quota by 1': {
    en: 'Increase daily quota by 1',
    bn: 'দৈনিক কোটা ১ বাড়ান'
  },

  // Department Portfolios (app/dashboard/departments/page.tsx)
  'Department Portfolios': {
    en: 'Department Portfolios',
    bn: 'বিভাগীয় পোর্টফোলিও'
  },
  'departments.title': {
    en: 'Department Portfolios & Employee Directories',
    bn: 'বিভাগীয় পোর্টফোলিও ও কর্মী তালিকা'
  },
  'departments.subtitle': {
    en: 'Manage staffing headcount, assigned shifts, monthly activity ratios, and daily work completion progress.',
    bn: 'কর্মী সংখ্যা, নির্ধারিত শিফট, মাসিক পারফরম্যান্স অনুপাত এবং দৈনিক কাজের অগ্রগতি ব্যবস্থাপনা করুন।'
  },
  'departments.hierarchy_badge': {
    en: 'Organizational Hierarchy',
    bn: 'প্রাতিষ্ঠানিক পদবিন্যাস'
  },
  'departments.search_placeholder': {
    en: 'Search employee, role, or code...',
    bn: 'কর্মী, পদবি বা কোড দিয়ে খুঁজুন...'
  },
  'Add Employee': {
    en: 'Add Employee',
    bn: 'কর্মী যোগ করুন'
  },
  'departments.add_employee': {
    en: '+ Add Employee',
    bn: '+ কর্মী যোগ করুন'
  },
  'Work Quota / Target (কাজের সীমা):': {
    en: 'Work Quota / Target (কাজের সীমা):',
    bn: 'কাজের সীমা / টার্গেট (কাজের সীমা):'
  },
  'Completed:': {
    en: 'Completed:',
    bn: 'সম্পন্ন:'
  },
  'Edit Quota / View Tasks': {
    en: 'Edit Quota / View Tasks',
    bn: 'কোটা এডিট / কাজসমূহ দেখুন'
  },
  'Remove': {
    en: 'Remove',
    bn: 'মুছুন'
  },
  'departments.headcount': {
    en: 'Headcount',
    bn: 'কর্মী সংখ্যা'
  },
  'departments.online_now': {
    en: 'Active Now',
    bn: 'অনলাইনে আছেন'
  },
  'departments.avg_score': {
    en: 'Avg Score',
    bn: 'গড় স্কোর'
  },
  'departments.dept_lead': {
    en: 'Department Lead:',
    bn: 'বিভাগীয় প্রধান:'
  },
  'departments.corp_operations': {
    en: 'ApexWork Corporate Operations',
    bn: 'অ্যাপেক্সওয়ার্ক করপোরেট অপারেশনস'
  },
  'departments.corp_desc': {
    en: 'Cross-functional enterprise deployment across Engineering, Growth Marketing, Corporate Finance, HR, and Creative Media.',
    bn: 'ইঞ্জিনিয়ারিং, গ্রোথ মার্কেটিং, করপোরেট ফিন্যান্স, এইচআর ও ক্রিয়েটিভ মিডিয়া জুড়ে বিস্তৃত এন্টারপ্রাইজ কার্যক্রম।'
  },
  'departments.total_staff': {
    en: 'Total Staff',
    bn: 'মোট কর্মী'
  },
  'departments.divisions': {
    en: 'Divisions',
    bn: 'বিভাগসমূহ'
  },
  'departments.active_stat': {
    en: 'active',
    bn: 'জন সক্রিয়'
  },
  'departments.monthly_active_ratio': {
    en: 'Monthly Active Ratio',
    bn: 'মাসিক সক্রিয় অনুপাত'
  },
  'departments.idle_stat': {
    en: 'Idle:',
    bn: 'নিষ্ক্রিয়:'
  },
  'departments.today_stat': {
    en: 'Today:',
    bn: 'আজ:'
  },
  'departments.no_employees_found': {
    en: 'No Employees Found',
    bn: 'কোনো কর্মী পাওয়া যায়নি'
  },
  'departments.no_match_desc': {
    en: 'No team members match this filter.',
    bn: 'এই ফিল্টারের সাথে কোনো কর্মীর তথ্য মেলেনি।'
  },
  'departments.reset_filters': {
    en: 'Reset Filters',
    bn: 'ফিল্টার রিসেট করুন'
  },
  'departments.add_employee_here': {
    en: 'Add Employee Here',
    bn: 'এখানে কর্মী যোগ করুন'
  },
  'departments.lead_label': {
    en: 'Lead:',
    bn: 'প্রধান:'
  },
  'departments.shift_verified': {
    en: 'Shift Verified',
    bn: 'শিফট যাচাইকৃত'
  },
  'departments.active_score': {
    en: 'Active Score',
    bn: 'অ্যাক্টিভ স্কোর'
  },
  'departments.no_deliverable': {
    en: 'No deliverable reported',
    bn: 'কোনো ফলাফল নথিভুক্ত নেই'
  },
  'departments.latest_progress_update': {
    en: 'Latest Progress Update',
    bn: 'সর্বশেষ কাজের অগ্রগতি'
  },
  'departments.portfolio': {
    en: 'Portfolio',
    bn: 'পোর্টফোলিও'
  },
  'departments.edit_quota': {
    en: 'Edit Quota',
    bn: 'কোটা এডিট'
  },
  'departments.remove_title': {
    en: 'Remove Employee from Directory',
    bn: 'তালিকা থেকে কর্মী অপসারণ করুন'
  },
  'departments.edit_quota_tasks': {
    en: 'Edit Quota and View Tasks',
    bn: 'কোটা এডিট ও কাজসমূহ দেখুন'
  },

  // Add Employee Modal (Departments)
  'departments.add_modal_title': {
    en: 'Add New Employee',
    bn: 'নতুন কর্মী যোগ করুন'
  },
  'departments.add_modal_subtitle': {
    en: 'Expand team directory, assign department and shift, and configure daily tasks',
    bn: 'টিমে নতুন কর্মী অন্তর্ভুক্ত করুন, বিভাগ ও শিফট নির্ধারণ করুন এবং কাজের কোটা সেট করুন'
  },
  'departments.full_name': {
    en: 'Full Name *',
    bn: 'পুরো নাম *'
  },
  'departments.employee_code': {
    en: 'Employee Code *',
    bn: 'কর্মী কোড *'
  },
  'departments.department_select': {
    en: 'Department *',
    bn: 'বিভাগ *'
  },
  'departments.role_designation': {
    en: 'Designation / Role *',
    bn: 'পদবি / দায়িত্ব *'
  },
  'departments.assigned_shift': {
    en: 'Assigned Shift *',
    bn: 'নির্ধারিত শিফট *'
  },
  'departments.initial_telemetry_status': {
    en: 'Initial Telemetry Status',
    bn: 'প্রাথমিক টেলিমেট্রি স্ট্যাটাস'
  },
  'departments.status_active_online': {
    en: 'Active Now (Online)',
    bn: 'বর্তমানে সক্রিয় (অনলাইন)'
  },
  'departments.quota_deliverables_setup': {
    en: 'Work Quota / Target (কাজের সীমা) & Deliverables Setup',
    bn: 'কাজের সীমা (কোটা) ও ডেলিভারেবল কনফিগারেশন'
  },
  'departments.work_quota_target_label': {
    en: 'Work Quota / Target (কাজের সীমা) *',
    bn: 'কাজের সীমা / টার্গেট (কাজের সীমা) *'
  },
  'departments.initial_tasks_completed': {
    en: 'Initial Tasks Completed',
    bn: 'প্রাথমিক সম্পন্ন কাজ'
  },
  'departments.current_deliverable_summary': {
    en: 'Current Deliverable Summary',
    bn: 'বর্তমান কাজের বিবরণী'
  },
  'departments.save_add_employee': {
    en: 'Save & Add Employee',
    bn: 'সংরক্ষণ ও কর্মী যুক্ত করুন'
  },
  'departments.duplicate_code_error': {
    en: 'is already in use by another employee. Please provide a unique code.',
    bn: 'অন্য একজন কর্মী ব্যবহার করছেন। অনুগ্রহ করে একটি ইউনিক কোড দিন।'
  },

  // Confirm Removal Modal (Departments)
  'departments.remove_modal_title': {
    en: 'Confirm Removal of Employee',
    bn: 'কর্মী অপসারণ নিশ্চিত করুন'
  },
  'departments.remove_modal_subtitle': {
    en: 'Adjust headcount and remove from active organizational directory',
    bn: 'কর্মী সংখ্যা সমন্বয় করুন এবং সক্রিয় তালিকা থেকে অপসারণ করুন'
  },
  'departments.permanent_directory_removal': {
    en: 'Permanent Directory Removal',
    bn: 'স্থায়ী তালিকা অপসারণ'
  },
  'departments.confirm_remove_p1': {
    en: 'Are you sure you want to remove',
    bn: 'আপনি কি নিশ্চিত যে আপনি'
  },
  'departments.confirm_remove_p2': {
    en: 'This will dynamically decrease the department headcount, active counters, and update company roster matrices across all dashboard views.',
    bn: 'এটি স্বয়ংক্রিয়ভাবে বিভাগীয় কর্মী সংখ্যা, সক্রিয় কাউন্টার হ্রাস করবে এবং পুরো ড্যাশবোর্ডে শিফট রোস্টার আপডেট করবে।'
  },
  'departments.confirm_removal_btn': {
    en: 'Confirm Removal',
    bn: 'অপসারণ নিশ্চিত করুন'
  },

  // Employee Details Modal (Departments)
  'departments.current_active_assignment': {
    en: 'Current Active Assignment',
    bn: 'বর্তমান সক্রিয় অ্যাসাইনমেন্ট'
  },
  'departments.client_trigger_specification': {
    en: 'Client Trigger Specification',
    bn: 'ক্লায়েন্ট ট্রিগার স্পেসিফিকেশন'
  },
  'departments.desktop_autostart_label': {
    en: 'Desktop Auto-Start:',
    bn: 'ডেস্কটপ অটো-স্টার্ট:'
  },
  'departments.enabled_shift_start': {
    en: 'Enabled (On Shift Start)',
    bn: 'সক্রিয় (শিফট শুরুর সময়ে)'
  },
  'departments.grace_window_label': {
    en: 'Grace Check-in Window:',
    bn: 'গ্রেস চেক-ইন উইন্ডো:'
  },
  'departments.idle_threshold_label': {
    en: 'Idle Trigger Threshold:',
    bn: 'আইডল ট্রিগার থ্রেশহোল্ড:'
  },
  'departments.data_vault_policy_label': {
    en: 'Data Vault Policy:',
    bn: 'ডেটা ভল্ট পলিসি:'
  },
  'departments.discretionary_governance': {
    en: 'Discretionary Manual Governance',
    bn: 'বিবেচনামূলক ম্যানুয়াল পরিচালনা'
  },
  'departments.privacy_statement': {
    en: 'Employee Privacy Statement: ApexWork does not log keystrokes, personal chats, or record ambient audio/webcam feeds.',
    bn: 'কর্মী প্রাইভেসি সনদ: অ্যাপেক্সওয়ার্ক কখনো কিস্ট্রোক, ব্যক্তিগত চ্যাট বা রুমের অডিও/ভিডিও রেকর্ড করে না।'
  },

  // Shift Roster (app/dashboard/roster/page.tsx)
  'Weekly Shift Deployment Matrix': {
    en: 'Weekly Shift Deployment Matrix',
    bn: 'সাপ্তাহিক শিফট মোতায়েন ম্যাট্রিক্স'
  },
  'Daily Work Done': {
    en: 'Daily Work Done',
    bn: 'দৈনিক সম্পন্ন কাজ'
  },
  'roster.title': {
    en: 'Shift Roster & Automated Desktop Trigger Planner',
    bn: 'শিফট রোস্টার ও স্বয়ংক্রিয় ডেস্কটপ ট্রিগার প্ল্যানার'
  },
  'roster.subtitle': {
    en: "Employees' desktop clients automatically launch and sync telemetry during assigned shifts. Zero manual check-in required.",
    bn: 'নির্ধারিত শিফটে কর্মীদের ডেস্কটপ ক্লায়েন্ট নিজে থেকেই চালু হয়ে টেলিমেট্রি সিঙ্ক করে। কোনো ম্যানুয়াল চেকিংয়ের প্রয়োজন নেই।'
  },
  'roster.daemon_scheduler_badge': {
    en: 'Daemon Auto-Scheduler',
    bn: 'ডিমন অটো-শিডিউলার'
  },
  'roster.scheduler_synced': {
    en: 'Scheduler Synchronized',
    bn: 'শিডিউলার সিঙ্ক্রোনাইজড'
  },
  'roster.shift_profiles_active': {
    en: 'Shift Profiles Active',
    bn: 'টি শিফট প্রোফাইল সক্রিয়'
  },
  'roster.auto_start_enabled': {
    en: 'Auto-Start Enabled',
    bn: 'অটো-স্টার্ট সক্রিয়'
  },
  'roster.hours_short': {
    en: 'hrs',
    bn: 'ঘণ্টা'
  },
  'roster.grace_window': {
    en: 'Grace Window',
    bn: 'গ্রেস উইন্ডো'
  },
  'roster.mins_tolerance': {
    en: 'mins tolerance',
    bn: 'মিনিট ছাড়'
  },
  'roster.working_days': {
    en: 'Working Days',
    bn: 'কার্যদিবস'
  },
  'roster.assigned_team': {
    en: 'Assigned Team',
    bn: 'নির্ধারিত দল'
  },
  'roster.working': {
    en: 'Working',
    bn: 'কর্মরত'
  },
  'roster.off': {
    en: 'Off',
    bn: 'ছুটি'
  },
  'roster.matrix_subtitle': {
    en: 'Automated desktop trigger states mapped by workday schedule',
    bn: 'কাজের দিন অনুযায়ী স্বয়ংক্রিয় ডেস্কটপ ট্রিগার অবস্থা'
  },
  'roster.col_employee_code': {
    en: 'Employee / Code',
    bn: 'কর্মী / কোড'
  },
  'roster.col_shift_track': {
    en: 'Shift Track',
    bn: 'শিফট ট্র্যাক'
  },
  'roster.col_schedule': {
    en: 'Schedule',
    bn: 'সময়সূচি'
  },
  'roster.col_daemon_status': {
    en: 'Auto-Start Daemon Status',
    bn: 'অটো-স্টার্ট ডিমন স্ট্যাটাস'
  },
  'roster.col_shift_today': {
    en: 'Shift Today',
    bn: 'আজকের শিফট'
  },
  'roster.no_scheduled_shift': {
    en: 'No Scheduled Shift',
    bn: 'কোনো শিফট নির্ধারিত নেই'
  },
  'roster.daemon_trigger_active': {
    en: 'Daemon Trigger Active',
    bn: 'ডিমন ট্রিগার সক্রিয়'
  },
  'roster.daemon_active': {
    en: 'Daemon Trigger Active',
    bn: 'ডিমন ট্রিগার সক্রিয়'
  },
  'roster.daemon_suspended': {
    en: 'Scheduled Rest Day (Daemon Suspended)',
    bn: 'নির্ধারিত ছুটির দিন (ডিমন স্থগিত)'
  },
  'roster.how_it_works_title': {
    en: 'How the Automatic Trigger Works:',
    bn: 'স্বয়ংক্রিয় ট্রিগার যেভাবে কাজ করে:'
  },
  'roster.how_it_works_desc': {
    en: "When the employee's shift begins (e.g. 09:00 AM BST), the local Windows background daemon automatically initializes session tracking. If the computer is switched on, it checks in with the server. If the employee takes a short break within the 10-minute grace window, it is logged neutrally. On designated off-days (e.g., Sunday for standard shifts or Friday for remote shifts), the daemon remains completely suspended.",
    bn: 'কর্মীর শিফট শুরু হওয়ার সাথে সাথে (যেমন সকাল ০৯:০০ BST) লোকাল উইন্ডোজ ব্যাকগ্রাউন্ড ডিমন স্বয়ংক্রিয়ভাবে সেশন শুরু করে। কম্পিউটার চালু থাকলে এটি সার্ভারে চেক-ইন করে। ১০ মিনিটের অনুমোদিত বিরতির সময় নিরপেক্ষভাবে রেকর্ড হয়। নির্ধারিত ছুটির দিনে ডিমন পুরোপুরি নিষ্ক্রিয় থাকে।'
  },

  // Monthly Analytics (app/dashboard/analytics/page.tsx)
  'Continuous 30-Day Shift Activity Timeline': {
    en: 'Continuous 30-Day Shift Activity Timeline',
    bn: 'ধারাবাহিক ৩০ দিনের শিফট অ্যাক্টিভিটি টাইমলাইন'
  },
  'analytics.title': {
    en: 'Monthly Productivity Trends & Visual Analytics',
    bn: 'মাসিক প্রোডাক্টিভিটি ট্রেন্ডস ও ভিজ্যুয়াল অ্যানালিটিক্স'
  },
  'analytics.subtitle': {
    en: 'Objective metrics derived from active window engagement and idle timers across the entire month. Neutral, transparent, and fair.',
    bn: 'সারা মাসের সক্রিয় উইন্ডো ও আইডল টাইমারের বস্তুনিষ্ঠ তথ্য। নিরপেক্ষ, স্বচ্ছ ও ন্যায্য।'
  },
  'analytics.badge': {
    en: 'Aggregated Enterprise Telemetry',
    bn: 'সমন্বিত এন্টারপ্রাইজ টেলিমেট্রি'
  },
  'analytics.hours_breakdown': {
    en: 'Hours Breakdown',
    bn: 'ঘণ্টার বিভাজন'
  },
  'analytics.score_mode': {
    en: 'Score %',
    bn: 'স্কোর %'
  },
  'analytics.total_active_hours': {
    en: 'Total Active Hours (MTD)',
    bn: 'মোট সক্রিয় ঘণ্টা (চলতি মাস)'
  },
  'analytics.kpi_active_hours': {
    en: 'Total Active Hours (MTD)',
    bn: 'মোট সক্রিয় ঘণ্টা (চলতি মাস)'
  },
  'analytics.total_idle': {
    en: 'Total Inactive / Idle',
    bn: 'মোট নিষ্ক্রিয় সময়'
  },
  'analytics.kpi_idle_hours': {
    en: 'Total Inactive / Idle',
    bn: 'মোট নিষ্ক্রিয় সময়'
  },
  'analytics.team_score': {
    en: 'Team Productivity Score',
    bn: 'দলীয় প্রোডাক্টিভিটি স্কোর'
  },
  'analytics.kpi_score': {
    en: 'Team Productivity Score',
    bn: 'দলীয় প্রোডাক্টিভিটি স্কোর'
  },
  'analytics.autolaunch_rate': {
    en: 'Shift Auto-Launch Rate',
    bn: 'শিফট অটো-লঞ্চ হার'
  },
  'analytics.kpi_launch_rate': {
    en: 'Shift Auto-Launch Rate',
    bn: 'শিফট অটো-লঞ্চ হার'
  },
  'analytics.mtd_logged': {
    en: 'Month-to-date logged',
    bn: 'চলতি মাসে এ পর্যন্ত রেকর্ডকৃত'
  },
  'analytics.within_threshold': {
    en: 'Within 10% threshold',
    bn: '১০% সীমার মধ্যে রয়েছে'
  },
  'analytics.target_score': {
    en: 'Target: >90.0%',
    bn: 'টার্গেট: >৯০.০%'
  },
  'analytics.auto_starts': {
    en: 'Automated client starts',
    bn: 'স্বয়ংক্রিয় ক্লায়েন্ট সূচনা'
  },
  'analytics.chart_title': {
    en: 'Continuous 30-Day Shift Activity Timeline (September 2026)',
    bn: 'ধারাবাহিক ৩০ দিনের শিফট অ্যাক্টিভিটি টাইমলাইন (সেপ্টেম্বর ২০২৬)'
  },
  'analytics.chart_subtitle': {
    en: 'Hover over bars to inspect daily active time, idle breakdown, and team scores (Days 1–19 Telemetry, Days 20–30 Scheduled)',
    bn: 'প্রতিদিনের সক্রিয় সময়, আইডল বিভাজন ও টিম স্কোর দেখতে বারের ওপর মাউস নিন (১-১৯ দিন টেলিমেট্রি, ২০-৩০ দিন নির্ধারিত)'
  },
  'analytics.legend_active_hours': {
    en: 'Active Hours',
    bn: 'সক্রিয় ঘণ্টা'
  },
  'analytics.legend_idle_hours': {
    en: 'Idle Hours',
    bn: 'নিষ্ক্রিয় ঘণ্টা'
  },
  'analytics.legend_projected': {
    en: 'Projected / Scheduled',
    bn: 'প্রত্যাশিত / নির্ধারিত'
  },
  'analytics.day_inspector': {
    en: 'Day Inspector',
    bn: 'দিন ভিত্তিক নিরীক্ষা'
  },
  'analytics.daily_active_time': {
    en: 'Daily Active Time',
    bn: 'দৈনিক সক্রিয় সময়'
  },
  'analytics.daily_idle_time': {
    en: 'Daily Idle Time',
    bn: 'দৈনিক নিষ্ক্রিয় সময়'
  },
  'analytics.productivity_index': {
    en: 'Productivity Index',
    bn: 'প্রোডাক্টিভিটি ইনডেক্স'
  },
  'analytics.top_contributors': {
    en: 'Top Departmental Contributors',
    bn: 'শীর্ষ অবদানকারী কর্মীগণ'
  },
  'analytics.rank_monthly_activity': {
    en: 'Ranked by monthly objective shift activity scores',
    bn: 'মাসিক বস্তুনিষ্ঠ শিফট অ্যাক্টিভিটি স্কোরের ভিত্তিতে র‍্যাঙ্কিং'
  },
  'analytics.mode_hours': {
    en: 'Hours (Active/Idle)',
    bn: 'ঘণ্টা (সক্রিয়/নিষ্ক্রিয়)'
  },
  'analytics.mode_score': {
    en: 'Score %',
    bn: 'স্কোর %'
  },
  'analytics.legend_active': {
    en: 'Active Work',
    bn: 'সক্রিয় কাজ'
  },
  'analytics.legend_idle': {
    en: 'Idle / Break',
    bn: 'নিষ্ক্রিয় / বিরতি'
  },
  'analytics.legend_score': {
    en: 'Productivity Score',
    bn: 'প্রোডাক্টিভিটি স্কোর'
  },
  'analytics.date': {
    en: 'Date',
    bn: 'তারিখ'
  },
  'analytics.projected': {
    en: 'Projected',
    bn: 'প্রত্যাশিত'
  },
  'analytics.today_live': {
    en: 'Today Live',
    bn: 'আজকের লাইভ'
  },
  'analytics.active_work': {
    en: 'Active Work',
    bn: 'সক্রিয় কাজ'
  },
  'analytics.idle_break': {
    en: 'Idle / Break',
    bn: 'নিষ্ক্রিয় / বিরতি'
  },
  'analytics.productivity_score': {
    en: 'Productivity Score',
    bn: 'প্রোডাক্টিভিটি স্কোর'
  },
  'analytics.hover_hint': {
    en: 'Hover over any day bar above to see specific active/idle breakdown and shift scores.',
    bn: 'দৈনিক সক্রিয়/নিষ্ক্রিয় বিভাজন ও শিফট স্কোর দেখতে ওপরের বারের ওপর মাউস রাখুন।'
  },
  'analytics.scale_hours': {
    en: 'Scale: 0 — 10.0 Hours/Day',
    bn: 'স্কেল: ০ — ১০.০ ঘণ্টা/দিন'
  },
  'analytics.scale_score': {
    en: 'Scale: 0 — 100% Score',
    bn: 'স্কেল: ০ — ১০০% স্কোর'
  },
  'analytics.dept_activity_index': {
    en: 'Departmental Activity Index',
    bn: 'বিভাগীয় অ্যাক্টিভিটি সূচক'
  },
  'analytics.september_avg': {
    en: 'September Average',
    bn: 'সেপ্টেম্বর মাসের গড়'
  },
  'analytics.score_label': {
    en: 'Score',
    bn: 'স্কোর'
  },
  'departments.employees_assigned': {
    en: 'Employees Assigned',
    bn: 'জন কর্মী নিয়োজিত'
  },
  'analytics.ranked_by_activity': {
    en: 'Ranked by Activity %',
    bn: 'অ্যাক্টিভিটি % অনুযায়ী ক্রমানুসারে'
  },

  // Screenshot Vault (app/dashboard/screenshots/page.tsx)
  'Audited Shift Screenshot Vault': {
    en: 'Audited Shift Screenshot Vault',
    bn: 'অডিটেড শিফট স্ক্রিনশট ভল্ট'
  },
  'Archived Vault': {
    en: 'Archived Vault',
    bn: 'আর্কাইভকৃত ভল্ট'
  },
  'Archive': {
    en: 'Archive',
    bn: 'আর্কাইভ'
  },
  'Delete': {
    en: 'Delete',
    bn: 'মুছুন'
  },
  'screenshots.title': {
    en: 'Audited Shift Screenshot Vault',
    bn: 'অডিটেড শিফট স্ক্রিনশট ভল্ট'
  },
  'screenshots.subtitle': {
    en: 'Cryptographically pre-signed, temporary captures taken strictly during active shift intervals. Protected by zero-trust policies.',
    bn: 'শুধুমাত্র শিফটের সময়ে নেওয়া সাময়িক স্ক্রিন ক্যাপচার। জিরো-ট্রাস্ট নিরাপত্তায় সুরক্ষিত।'
  },
  'screenshots.active_tab': {
    en: 'Active Screenshots',
    bn: 'সক্রিয় স্ক্রিনশটসমূহ'
  },
  'screenshots.archived_tab': {
    en: 'Archived Vault',
    bn: 'আর্কাইভকৃত ভল্ট'
  },
  'screenshots.trigger_capture': {
    en: 'Trigger Test Capture',
    bn: 'টেস্ট ক্যাপচার ট্রিগার'
  },
  'screenshots.refresh_links': {
    en: 'Refresh Signed Links',
    bn: 'স্বাক্ষরিত লিংক রিফ্রেশ'
  },
  'screenshots.inspect': {
    en: 'Audit Inspect',
    bn: 'অডিট পরীক্ষা'
  },
  'screenshots.filter_dept': {
    en: 'Department',
    bn: 'বিভাগ'
  },
  'screenshots.filter_shift': {
    en: 'Shift',
    bn: 'শিফট'
  },
  'screenshots.filter_employee': {
    en: 'Employee',
    bn: 'কর্মী'
  },
  'screenshots.filter_trigger': {
    en: 'Trigger Reason',
    bn: 'ট্রিগারের কারণ'
  },
  'screenshots.filter_date': {
    en: 'Date',
    bn: 'তারিখ'
  },
  'screenshots.search_placeholder': {
    en: 'Search window titles, apps, employees...',
    bn: 'উইন্ডো শিরোনাম, অ্যাপ বা কর্মী খুঁজুন...'
  },
  'screenshots.archive_title': {
    en: 'Archive Capture to Discretionary Vault',
    bn: 'ক্যাপচারটি আর্কাইভ ভল্টে স্থানান্তর করুন'
  },
  'screenshots.delete_title': {
    en: 'Permanently Delete Capture',
    bn: 'ক্যাপচারটি স্থায়ীভাবে মুছে ফেলুন'
  },
  'screenshots.view_full': {
    en: 'View Full',
    bn: 'সম্পূর্ণ দেখুন'
  },
  'screenshots.compliance_title': {
    en: 'Compliance & Discretionary Vault Controls',
    bn: 'কমপ্লায়েন্স ও বিবেচনামূলক ভল্ট নিয়ন্ত্রণ'
  },
  'screenshots.compliance_desc': {
    en: 'All captured images are encrypted at rest with AES-256 and stored in private object buckets. Pre-signed URLs are valid for a maximum of 15 minutes before invalidating. Data is NOT automatically destroyed; administrators and managers retain discretionary control to manually Archive or Permanently Delete records according to company review.',
    bn: 'সকল ক্যাপচারকৃত ছবি AES-256 এনক্রিপশনে প্রাইভেট অবজেক্ট বাকেটে সংরক্ষিত থাকে। প্রি-সাইন্ড ইউআরএল সর্বোচ্চ ১৫ মিনিট কার্যকর থাকে। ডেটা স্বয়ংক্রিয়ভাবে ধ্বংস হয় না; প্রশাসনিক রিভিউ সাপেক্ষে ম্যানুয়ালি আর্কাইভ বা মুছে ফেলার পূর্ণ নিয়ন্ত্রণ বজায় থাকে।'
  },
  'screenshots.audited_capture': {
    en: 'Audited Capture',
    bn: 'অডিটেড ক্যাপচার'
  },
  'screenshots.resolution': {
    en: 'Resolution',
    bn: 'রেজোলিউশন'
  },
  'screenshots.audit_id': {
    en: 'Audit Record ID',
    bn: 'অডিট রেকর্ড আইডি'
  },
  'screenshots.recorded_ledger': {
    en: 'Recorded on compliance ledger',
    bn: 'কমপ্লায়েন্স লেজারে সংরক্ষিত'
  },
  'screenshots.trigger_class': {
    en: 'Trigger Classification',
    bn: 'ট্রিগার শ্রেণিবিভাগ'
  },
  'screenshots.policy_interval': {
    en: 'Shift policy interval verified',
    bn: 'শিফট পলিসি ব্যবধান যাচাইকৃত'
  },
  'screenshots.vault_status': {
    en: 'Vault Status',
    bn: 'ভল্ট স্ট্যাটাস'
  },
  'screenshots.active_vault': {
    en: 'Active Vault',
    bn: 'সক্রিয় ভল্ট'
  },
  'screenshots.discretionary_retention': {
    en: 'Discretionary Retention',
    bn: 'বিবেচনামূলক সংরক্ষণ'
  },
  'screenshots.privacy_filter_active': {
    en: 'Privacy Filter Active: This capture detected financial data or password forms and was automatically blurred prior to cloud ingestion.',
    bn: 'প্রাইভেসি ফিল্টার সক্রিয়: এই ক্যাপচারে আর্থিক ডেটা বা পাসওয়ার্ড ফর্ম শনাক্ত হওয়ায় ক্লাউডে আসার পূর্বেই স্বয়ংক্রিয়ভাবে ব্লার করা হয়েছে।'
  },
  'screenshots.admin_controls': {
    en: 'Administrative Discretionary Controls:',
    bn: 'প্রশাসনিক বিবেচনামূলক নিয়ন্ত্রণসমূহ:'
  },
  'screenshots.restore_to_active': {
    en: 'Restore to Active Vault',
    bn: 'সক্রিয় ভল্টে পুনরুদ্ধার করুন'
  },
  'screenshots.archive_to_vault': {
    en: 'Archive to Vault',
    bn: 'ভল্টে আর্কাইভ করুন'
  },
  'screenshots.permanently_delete': {
    en: 'Permanently Delete',
    bn: 'স্থায়ীভাবে মুছুন'
  },

  // Delete Screenshot Modal
  'screenshots.confirm_deletion_title': {
    en: 'Confirm Deletion of Audited Capture',
    bn: 'অডিটেড ক্যাপচার মুছে ফেলা নিশ্চিত করুন'
  },
  'screenshots.confirm_deletion_subtitle': {
    en: 'Permanent discretionary removal from cloud storage vault',
    bn: 'ক্লাউড স্টোরেজ ভল্ট থেকে স্থায়ী বিবেচনামূলক অপসারণ'
  },
  'screenshots.manual_deletion_heading': {
    en: 'Manual Discretionary Deletion',
    bn: 'ম্যানুয়াল বিবেচনামূলক অপসারণ'
  },
  'screenshots.confirm_delete_p1': {
    en: 'Are you sure you want to permanently delete capture record',
    bn: 'আপনি কি নিশ্চিত যে আপনি ক্যাপচার রেকর্ড'
  },
  'screenshots.confirm_delete_p2': {
    en: 'for employee',
    bn: 'কর্মী'
  },
  'screenshots.confirm_delete_p3': {
    en: 'This action is permanent and will remove the image file and associated telemetry audit record from storage.',
    bn: 'এই পদক্ষেপটি স্থায়ী এবং এটি স্টোরেজ থেকে ইমেজ ফাইল ও সংশ্লিষ্ট টেলিমেট্রি অডিট রেকর্ড সম্পূর্ণরূপে মুছে ফেলবে।'
  },
  'screenshots.confirm_permanent_delete': {
    en: 'Confirm Permanent Deletion',
    bn: 'স্থায়ী অপসারণ নিশ্চিত করুন'
  },

  // Simulate Desktop Capture Modal
  'screenshots.simulate_title': {
    en: 'Simulate Desktop Client Screen Capture',
    bn: 'ডেস্কটপ ক্লায়েন্ট স্ক্রিন ক্যাপচার সিমুলেট করুন'
  },
  'screenshots.simulate_subtitle': {
    en: 'Test the client capture engine, automated watermarking, and privacy blur filters',
    bn: 'ক্লায়েন্ট ক্যাপচার ইঞ্জিন, ওয়াটারমার্ক এবং প্রাইভেসি ব্লার ফিল্টার পরীক্ষা করুন'
  },
  'screenshots.capture_ingested': {
    en: 'Workstation Capture Ingested!',
    bn: 'ওয়ার্কস্টেশন ক্যাপচার সংরক্ষিত হয়েছে!'
  },
  'screenshots.capture_ingested_desc': {
    en: 'Encrypted capture securely added to S3 vault with 15-minute expiring link.',
    bn: 'এনক্রিপ্টেড ক্যাপচারটি ১৫ মিনিটের মেয়াদি লিংকসহ সুরক্ষিতভাবে ভল্টে যোগ করা হয়েছে।'
  },
  'screenshots.target_workstation': {
    en: 'Target Employee Workstation',
    bn: 'টার্গেট কর্মী ওয়ার্কস্টেশন'
  },
  'screenshots.foreground_app': {
    en: 'Active Foreground App',
    bn: 'সক্রিয় ফোরগ্রাউন্ড অ্যাপ'
  },
  'screenshots.trigger_event': {
    en: 'Trigger Event',
    bn: 'ট্রিগার ইভেন্ট'
  },
  'screenshots.trigger_routine': {
    en: 'Routine Shift Interval',
    bn: 'রুটিন শিফট ব্যবধান'
  },
  'screenshots.trigger_inactivity': {
    en: 'Prolonged Inactivity Check',
    bn: 'দীর্ঘ নিষ্ক্রিয়তা যাচাই'
  },
  'screenshots.trigger_checkin': {
    en: 'Shift Check-in',
    bn: 'শিফট চেক-ইন'
  },
  'screenshots.trigger_milestone': {
    en: 'Task Milestone Submission',
    bn: 'কাজের মাইলস্টোন জমা'
  },
  'screenshots.sim_window_title': {
    en: 'Simulated Window Title',
    bn: 'সিমুলেটেড উইন্ডো শিরোনাম'
  },
  'screenshots.apply_autoblur': {
    en: 'Apply Sensitive Data Auto-Blur Filter',
    bn: 'সংবেদনশীল তথ্যে অটো-ব্লার ফিল্টার প্রয়োগ করুন'
  },
  'screenshots.apply_autoblur_desc': {
    en: 'Blurs content before transmission to protect privacy',
    bn: 'প্রাইভেসি সুরক্ষায় প্রেরণের পূর্বেই কন্টেন্ট ব্লার করে'
  },
  'screenshots.execute_capture': {
    en: 'Execute Test Capture',
    bn: 'টেস্ট ক্যাপচার সম্পন্ন করুন'
  },

  // Daily Work Updates (app/dashboard/work-updates/page.tsx)
  'Daily Work Updates': {
    en: 'Daily Work Updates',
    bn: 'দৈনিক কাজের আপডেট'
  },
  'work_updates.title': {
    en: 'Daily Work Updates',
    bn: 'দৈনিক কাজের আপডেট'
  },
  'work_updates.subtitle': {
    en: 'Shift Work Deliverable Feed & Daily Standups',
    bn: 'শিফট কাজের ফলাফল ফিড ও দৈনিক স্ট্যান্ডআপ'
  },
  'work_updates.post_btn': {
    en: '+ Post Daily Work Update',
    bn: '+ দৈনিক কাজের আপডেট পোস্ট করুন'
  },
  'work_updates.total_logs': {
    en: 'Total Logs',
    bn: 'মোট কাজের লগ'
  },
  'work_updates.search_placeholder': {
    en: 'Search updates, projects, milestones, employees...',
    bn: 'আপডেট, প্রজেক্ট, মাইলস্টোন বা কর্মী খুঁজুন...'
  },
  'work_updates.all_departments': {
    en: 'All Departments',
    bn: 'সকল বিভাগ'
  },
  'work_updates.all_status': {
    en: 'All Status',
    bn: 'সব স্ট্যাটাস'
  },

  // Post Daily Work Update Modal
  'updates.modal_title': {
    en: 'Post Shift Task Update',
    bn: 'শিফট কাজের আপডেট পোস্ট করুন'
  },
  'updates.modal_subtitle': {
    en: 'Record your milestone progress into the team shift ledger',
    bn: 'টিমের শিফট লেজারে আপনার কাজের অগ্রগতি রেকর্ড করুন'
  },
  'updates.employee_account': {
    en: 'Employee Account',
    bn: 'কর্মী অ্যাকাউন্ট'
  },
  'updates.task_title': {
    en: 'Task Title',
    bn: 'কাজের শিরোনাম'
  },
  'updates.project_name': {
    en: 'Project Name',
    bn: 'প্রকল্পের নাম'
  },
  'updates.hours_spent': {
    en: 'Hours Spent',
    bn: 'ব্যয়িত ঘণ্টা'
  },
  'updates.deliverable_url': {
    en: 'Deliverable / PR / Report URL (Optional)',
    bn: 'ডেলিভারেবল / পিআর / রিপোর্ট লিংক (ঐচ্ছিক)'
  },
  'updates.progress_status': {
    en: 'Progress Status',
    bn: 'কাজের অগ্রগতি'
  },
  'updates.blocked_awaiting': {
    en: 'Blocked / Awaiting Review',
    bn: 'স্থগিত / পর্যালোচনার অপেক্ষায়'
  },
  'updates.detailed_explanation': {
    en: 'Detailed Explanation',
    bn: 'বিস্তারিত বিবরণ'
  },
  'updates.submit_work_log': {
    en: 'Submit Work Log',
    bn: 'কাজের লগ জমা দিন'
  },

  // Settings & Policy (app/dashboard/settings/page.tsx)
  'Policy Configuration': {
    en: 'Policy Configuration',
    bn: 'পলিসি কনফিগারেশন'
  },
  'settings.title': {
    en: 'Policy Configuration & Discretionary Data Governance',
    bn: 'পলিসি কনফিগারেশন ও বিবেচনামূলক তথ্য পরিচালনা'
  },
  'settings.subtitle': {
    en: 'Fine-tune idle detection thresholds, screenshot intervals, auto-launch grace periods, and discretionary manual archiving policies.',
    bn: 'আইডল শনাক্তকরণের সময়সীমা, স্ক্রিনশট বিরতি, গ্রেস পিরিয়ড এবং বিবেচনামূলক ম্যানুয়াল সংরক্ষণ নীতিমালা নিয়ন্ত্রণ করুন।'
  },
  'settings.governance_badge': {
    en: 'Governance & Compliance Guardrails',
    bn: 'গভর্ন্যান্স ও কমপ্লায়েন্স সুরক্ষাবলয়'
  },
  'settings.discretionary_mode_badge': {
    en: 'Manual Discretionary Mode',
    bn: 'ম্যানুয়াল বিবেচনামূলক মোড'
  },
  'settings.saved_toast': {
    en: 'Policy parameters deployed & persisted in browser storage!',
    bn: 'পলিসি সফলভাবে কার্যকর ও ব্রাউজারে সংরক্ষিত হয়েছে!'
  },
  'Discretionary / Manual Archive & Delete Policy': {
    en: 'Discretionary / Manual Archive & Delete Policy',
    bn: 'বিবেচনামূলক / ম্যানুয়াল আর্কাইভ ও ডিলিট পলিসি'
  },
  'Data is NOT automatically destroyed': {
    en: 'Data is NOT automatically destroyed; administrators and managers retain discretionary control to manually Archive or Permanently Delete records according to company review.',
    bn: 'প্রশাসনিক পর্যালোচনা ছাড়া তথ্য স্বয়ংক্রিয়ভাবে ধ্বংস করা হয় না; কোম্পানির নিয়ম অনুযায়ী ম্যানুয়ালি আর্কাইভ বা স্থায়ীভাবে মুছে ফেলার পূর্ণ নিয়ন্ত্রণ বজায় থাকে।'
  },
  'settings.preservation_desc': {
    en: 'Data preservation is managed under strict administrative discretion rather than blind automated destruction.',
    bn: 'নির্বিচারে স্বয়ংক্রিয় ধ্বংসের বদলে কঠোর প্রশাসনিক বিবেচনার ভিত্তিতে তথ্য সংরক্ষণ করা হয়।'
  },
  'settings.retention_notice_heading': {
    en: 'Permanent Retention Notice',
    bn: 'স্থায়ী সংরক্ষণ বিজ্ঞপ্তি'
  },
  'settings.preservation_vault_desc': {
    en: 'Workstation screenshots, activity telemetry, and shift milestone records are safely preserved in the compliance vault. Deletion or archival only occurs when explicitly initiated by an authorized administrator.',
    bn: 'ওয়ার্কস্টেশন স্ক্রিনশট, অ্যাক্টিভিটি টেলিমেট্রি ও শিফট রেকর্ড কমপ্লায়েন্স ভল্টে সুরক্ষিত থাকে। অনুমোদিত অ্যাডমিনের সুনির্দিষ্ট নির্দেশ ছাড়া কখনোই মোছা হয় না।'
  },
  'settings.manual_archive_mode': {
    en: 'Manual Archive Mode (Discretionary)',
    bn: 'ম্যানুয়াল আর্কাইভ মোড (বিবেচনামূলক)'
  },
  'settings.manual_archive_desc': {
    en: 'Recommended standard: Automated destruction disabled. Audited files remain in active storage until team managers explicitly trigger archive or deletion.',
    bn: 'প্রস্তাবিত মানদণ্ড: স্বয়ংক্রিয় ধ্বংস নিষ্ক্রিয়। দলনেতা বা ম্যানেজার নির্দেশ না দেওয়া পর্যন্ত অডিট ফাইল সক্রিয় স্টোরেজে অক্ষত থাকে।'
  },
  'settings.zero_risk_loss': {
    en: 'Zero Risk of Unintended Data Loss',
    bn: 'অনাকাঙ্ক্ষিত তথ্য হারানোর কোনো ঝুঁকি নেই'
  },
  'settings.scheduled_purge_mode': {
    en: 'Scheduled Cloud Purge Window',
    bn: 'নির্ধারিত ক্লাউড পার্জ উইন্ডো'
  },
  'settings.scheduled_purge_desc': {
    en: 'Applies automated object expiration only after a designated time interval (e.g. 30–90 days) for organizations with statutory data purging mandates.',
    bn: 'নির্দিষ্ট সময়সীমা (যেমন ৩০-৯০ দিন) পর অবজেক্ট অপসারণ কেবল তখনই কার্যকর হয় যখন প্রতিষ্ঠানের আইনি বাধ্যবাধকতা থাকে।'
  },
  'settings.window_label': {
    en: 'Window:',
    bn: 'সময়সীমা:'
  },
  'settings.days': {
    en: 'Days',
    bn: 'দিন'
  },
  'settings.discretionary_operations': {
    en: 'Discretionary Record Operations',
    bn: 'বিবেচনামূলক রেকর্ড অপারেশনস'
  },
  'settings.discretionary_operations_desc': {
    en: 'Perform immediate manual vault actions on existing shift records',
    bn: 'বিদ্যমান শিফট রেকর্ডের ওপর তাৎক্ষণিক ম্যানুয়াল ভল্ট পদক্ষেপ গ্রহণ করুন'
  },
  'settings.archive_selected': {
    en: 'Archive Selected Records',
    bn: 'নির্বাচিত রেকর্ড আর্কাইভ করুন'
  },
  'settings.permanent_delete': {
    en: 'Permanent Manual Deletion',
    bn: 'স্থায়ী ম্যানুয়াল অপসারণ'
  },
  'settings.telemetry_thresholds_title': {
    en: 'Shift Telemetry & Interval Thresholds',
    bn: 'শিফট টেলিমেট্রি ও সময় ব্যবধান সীমা'
  },
  'settings.telemetry_thresholds_desc': {
    en: 'These settings control when the Windows background agent pauses active time, schedules audited captures, and applies grace windows.',
    bn: 'এই সেটিংসগুলো নিয়ন্ত্রণ করে কখন উইন্ডোজ ব্যাকগ্রাউন্ড এজেন্ট সময় গণনা স্থগিত করবে, স্ক্রিনশট নেবে ও ছাড়ের সময় প্রযোজ্য হবে।'
  },
  'settings.idle_threshold_label': {
    en: 'Inactivity / Idle Threshold',
    bn: 'নিষ্ক্রিয়তা / আইডল থ্রেশহোল্ড'
  },
  'settings.idle_threshold_desc': {
    en: "Duration without keyboard/mouse input before state switches to 'Idle'",
    bn: 'কিবোর্ড বা মাউস স্পর্শ না করলে যত মিনিট পর স্ট্যাটাস নিষ্ক্রিয় হবে'
  },
  'settings.minutes': {
    en: 'Minutes',
    bn: 'মিনিট'
  },
  'settings.strict': {
    en: 'Strict',
    bn: 'কঠোর'
  },
  'settings.standard_rec': {
    en: 'Standard Recommended',
    bn: 'স্ট্যান্ডার্ড প্রস্তাবিত'
  },
  'settings.relaxed': {
    en: 'Relaxed',
    bn: 'সহনশীল'
  },
  'settings.tray_notification': {
    en: 'Desktop Tray Notification On Capture',
    bn: 'ক্যাপচারের সময় ডেস্কটপ ট্রে নোটিফিকেশন'
  },
  'settings.tray_notification_desc': {
    en: "Displays an unobtrusive notification on employee's screen whenever a routine screenshot is captured, ensuring zero covert surprise.",
    bn: 'রুটিন স্ক্রিনশট নেওয়ার সময় কর্মীর স্ক্রিনে স্পষ্ট নোটিফিকেশন প্রদর্শন করে, যা গোপন নজরদারির শঙ্কা দূর করে।'
  },
  'settings.keylogger_disabled': {
    en: 'Keystroke Logging (Hard-Coded Disabled)',
    bn: 'কিস্ট্রোক লগিং (স্থায়ীভাবে নিষ্ক্রিয়)'
  },
  'settings.keylogger_desc': {
    en: 'ApexWork architecture physically omits keylogging drivers. Passwords and messages are never intercepted.',
    bn: 'অ্যাপেক্সওয়ার্ক আর্কিটেকচারে কোনো কিলগার ড্রাইভার নেই। পাসওয়ার্ড ও বার্তা কখনো রেকর্ড হয় না।'
  },
  'settings.webcam_disabled': {
    en: 'Audio & Webcam Surveillance (Hard-Coded Disabled)',
    bn: 'অডিও ও ওয়েবক্যাম নজরদারি (স্থায়ীভাবে নিষ্ক্রিয়)'
  },
  'settings.webcam_desc': {
    en: 'Hardware webcam and microphone access is prohibited by software sandbox policy.',
    bn: 'সফটওয়্যার স্যান্ডবক্স পলিসি দ্বারা ওয়েবক্যাম ও মাইক্রোফোন অ্যাক্সেস সম্পূর্ণ নিষিদ্ধ।'
  },
  'settings.reset_defaults': {
    en: 'Reset to Recommended Defaults',
    bn: 'প্রস্তাবিত ডিফল্ট সেটিংস ফিরিয়ে আনুন'
  },
  'settings.deploy_policy': {
    en: 'Deploy & Enforce Policy',
    bn: 'পলিসি কার্যকর ও সংরক্ষণ করুন'
  },
  'settings.modal_archive_title': {
    en: 'Archive Selected Records to Vault',
    bn: 'নির্বাচিত রেকর্ড ভল্টে আর্কাইভ করুন'
  },
  'settings.modal_archive_subtitle': {
    en: 'Discretionary storage operation — moves captures into long-term protected vault',
    bn: 'বিবেচনামূলক স্টোরেজ কার্যক্রম — ক্যাপচার দীর্ঘমেয়াদি সুরক্ষিত ভল্টে স্থানান্তর'
  },
  'settings.archive_confirm_heading': {
    en: 'Manual Archiving Confirmation',
    bn: 'ম্যানুয়াল আর্কাইভিং নিশ্চয়তা'
  },
  'settings.archive_confirm_p1': {
    en: 'You are initiating a manual discretionary archive operation on existing telemetry captures. Archived records are securely segregated into the Archived Vault and will remain available for future compliance audits.',
    bn: 'আপনি বিদ্যমান টেলিমেট্রি ক্যাপচারের ওপর ম্যানুয়াল বিবেচনামূলক আর্কাইভ কার্যক্রম শুরু করছেন। আর্কাইভকৃত রেকর্ড নিরাপদ ভল্টে সংরক্ষিত থাকবে এবং ভবিষ্যতের অডিটের জন্য পাওয়া যাবে।'
  },
  'settings.confirm_archive': {
    en: 'Confirm & Archive Records',
    bn: 'নিশ্চিত করুন ও রেকর্ড আর্কাইভ করুন'
  },
  'settings.purge_modal_subtitle': {
    en: 'Authoritative permanent purge of archived records from compliance vault',
    bn: 'কমপ্লায়েন্স ভল্ট থেকে আর্কাইভকৃত রেকর্ড স্থায়ীভাবে অপসারণ'
  },
  'settings.delete_warning_heading': {
    en: 'Permanent Deletion Warning',
    bn: 'স্থায়ী অপসারণের সতর্কতা'
  },
  'settings.delete_warning_p1': {
    en: 'This action will permanently delete all archived vault items from cloud storage and local persistent storage. Active screenshots will remain untouched.',
    bn: 'এই পদক্ষেপটি ক্লাউড ও লোকাল স্টোরেজ থেকে সকল আর্কাইভকৃত রেকর্ড স্থায়ীভাবে মুছে ফেলবে। সক্রিয় স্ক্রিনশট অক্ষত থাকবে।'
  },
  'settings.delete_warning_p2': {
    en: 'Once permanently deleted by administrator discretion, this telemetry cannot be recovered.',
    bn: 'প্রশাসকের ইচ্ছায় একবার স্থায়ীভাবে মুছে ফেলা হলে, এই টেলিমেট্রি আর কখনোই পুনরুদ্ধার করা যাবে না।'
  },

  // Individual Work Ledger Modal (src/components/dashboard/IndividualWorkLedgerModal.tsx)
  'Itemized Shift Deliverables': {
    en: 'Itemized Shift Deliverables',
    bn: 'আইটেমভিত্তিক শিফট ডেলিভারেবল'
  },
  'Work Quota / Target (কাজের সীমা)': {
    en: 'Work Quota / Target (কাজের সীমা)',
    bn: 'কাজের সীমা / টার্গেট (কাজের সীমা)'
  },
  'Set Assigned Work Quota (কাজের সীমা)': {
    en: 'Set Assigned Work Quota (কাজের সীমা)',
    bn: 'নির্ধারিত কাজের সীমা (কোটা) সেট করুন'
  },
  'ledger.target_label': {
    en: 'Target',
    bn: 'টার্গেট'
  },
  'ledger.quota_desc': {
    en: 'Boss/Manager adjustable daily deliverable target limit with instant percentage recalculation.',
    bn: 'বস/ম্যানেজার দ্বারা সহজে পরিবর্তনযোগ্য দৈনিক কাজের সীমা এবং তাৎক্ষণিক শতকরা হিসাব।'
  },
  'ledger.tasks_per_day': {
    en: 'Tasks / Day',
    bn: 'টি কাজ / দিন'
  },
  'ledger.presets': {
    en: 'Presets',
    bn: 'প্রিসেট'
  },
  'ledger.completed_vs_quota': {
    en: 'Completed vs Quota',
    bn: 'সম্পন্ন বনাম কোটা'
  },
  'ledger.target_achieved': {
    en: '🎉 Target quota 100% achieved!',
    bn: '🎉 কোটা টার্গেট ১০০% সম্পন্ন হয়েছে!'
  },
  'ledger.tasks_remaining': {
    en: 'tasks remaining to reach target',
    bn: 'টি কাজ বাকি আছে টার্গেটে পৌঁছাতে'
  },
  'ledger.fulfilled': {
    en: 'Fulfilled',
    bn: 'অর্জিত'
  },
  'ledger.toast_saved': {
    en: 'Quota and individual work ledger changes saved to directory!',
    bn: 'কাজের কোটা ও ব্যক্তিগত লেজারের পরিবর্তন তালিকায় সংরক্ষিত হয়েছে!'
  },
  'ledger.items_listed': {
    en: 'Items Listed',
    bn: 'টি কাজ তালিকাভুক্ত'
  },
  'ledger.deliverables_for': {
    en: 'Specific itemized tasks, completion timestamps, and deliverable summaries for',
    bn: 'সুনির্দিষ্ট কাজ, সমাপ্তির সময় এবং ফলাফল বিবরণী:'
  },
  'ledger.add_task': {
    en: 'Add New Task',
    bn: 'নতুন কাজ যোগ করুন'
  },
  'ledger.assign_new_deliverable': {
    en: 'Assign New Deliverable / Task',
    bn: 'নতুন ডেলিভারেবল / কাজ নির্ধারণ'
  },
  'ledger.task_title': {
    en: 'Task Title',
    bn: 'কাজের শিরোনাম'
  },
  'ledger.project_name': {
    en: 'Project Name',
    bn: 'প্রকল্পের নাম'
  },
  'ledger.deliverable_note': {
    en: 'Deliverable Note / Summary',
    bn: 'কাজের ফলাফল নোট / সারসংক্ষেপ'
  },
  'ledger.deliverable_url': {
    en: 'Deliverable URL (Optional)',
    bn: 'ডেলিভারেবল লিংক (ঐচ্ছিক)'
  },
  'ledger.initial_status': {
    en: 'Initial Status',
    bn: 'প্রাথমিক স্ট্যাটাস'
  },
  'ledger.save_task': {
    en: 'Save & Append Task',
    bn: 'সংরক্ষণ ও কাজ যোগ করুন'
  },
  'ledger.no_tasks': {
    en: 'No itemized tasks on file for this employee.',
    bn: 'এই কর্মীর জন্য এখনো কোনো নির্দিষ্ট কাজের তালিকা নেই।'
  },
  'ledger.click_add_task': {
    en: 'Click "+ Add New Task" to build an itemized deliverable breakdown.',
    bn: 'কাজের বিস্তারিত তালিকা তৈরি করতে "+ নতুন কাজ যোগ করুন" বাটনে ক্লিক করুন।'
  },
  'ledger.deliverable': {
    en: 'Deliverable',
    bn: 'ডেলিভারেবল'
  },
  'ledger.link': {
    en: 'Link',
    bn: 'লিংক'
  },
  'ledger.left': {
    en: 'left',
    bn: 'বাকি'
  },

  // Mockup Component
  'mockup.privacy_masked': {
    en: 'Privacy Masked',
    bn: 'গোপনীয়তার স্বার্থে মাস্কড'
  },
  'mockup.financial_masked_title': {
    en: 'Financial / Sensitive App Masked',
    bn: 'আর্থিক / সংবেদনশীল অ্যাপ মাস্ক করা হয়েছে'
  },
  'mockup.financial_masked_desc': {
    en: 'Privacy Policy #3 enforced: Window containing sensitive data auto-blurred.',
    bn: 'প্রাইভেসি পলিসি #৩ কার্যকর: সংবেদনশীল তথ্যযুক্ত উইন্ডো স্বয়ংক্রিয়ভাবে ব্লার করা হয়েছে।'
  },
  'mockup.audited_badge': {
    en: 'AUDITED',
    bn: 'যাচাইকৃত'
  },

  // Additional Missing System Translations
  'common.done_close': {
    en: 'Done & Close',
    bn: 'সম্পন্ন ও বন্ধ করুন'
  },
  'common.all_departments': {
    en: 'All Departments',
    bn: 'সকল বিভাগ'
  },
  'footer.gateway_ver': {
    en: 'ApexWork Telemetry Gateway v2.4 (Encrypted WSS / HTTPS)',
    bn: 'অ্যাপেক্সওয়ার্ক টেলিমেট্রি গেটওয়ে v২.৪ (এনক্রিপ্টেড ডব্লিউএসএস / এইচটিটিপিএস)'
  },
  'footer.server_time': {
    en: 'Server Time: Dhaka BST (GMT+6)',
    bn: 'সার্ভার সময়: ঢাকা BST (GMT+6)'
  },
  'footer.zero_keystroke_enforced': {
    en: 'Zero Keystroke Policy: Enforced',
    bn: 'জিরো কিস্ট্রোক নীতি: কার্যকর'
  },
  'Individual Work Ledger & Quota': {
    en: 'Individual Work Ledger & Quota',
    bn: 'ব্যক্তিগত কাজের খতিয়ান ও কোটা'
  },
  'ledger.mark_in_progress': {
    en: 'Mark In Progress',
    bn: 'চলমান হিসেবে চিহ্নিত করুন'
  },
  'ledger.mark_completed': {
    en: 'Mark Completed',
    bn: 'সম্পন্ন হিসেবে চিহ্নিত করুন'
  },
  'ledger.privacy_notice': {
    en: 'Verified Ethical Work Tracking: Tasks are linked to active shift timestamps and window focus telemetry. Keystroke surveillance is hard-coded disabled.',
    bn: 'যাচাইকৃত নৈতিক কর্ম-পর্যবেক্ষণ: কাজগুলো সক্রিয় শিফট সময় ও উইন্ডো ফোকাস টেলিমেট্রির সাথে যুক্ত। কিস্ট্রোক নজরদারি স্থায়ীভাবে নিষ্ক্রিয়।'
  },

  // Screenshots Vault Missing Keys
  'screenshots.signed_vault_badge': {
    en: 'Ephemerally Signed Storage Vault',
    bn: 'ক্ষণস্থায়ী স্বাক্ষরিত স্টোরেজ ভল্ট'
  },
  'screenshots.discretionary_badge': {
    en: 'Manual Discretionary Governance',
    bn: 'ম্যানুয়াল বিবেচনামূলক পরিচালনা'
  },
  'screenshots.simulate_capture': {
    en: 'Simulate Desktop Capture',
    bn: 'ডেস্কটপ ক্যাপচার সিমুলেট করুন'
  },
  'screenshots.refresh_urls': {
    en: 'Refresh URLs',
    bn: 'ইউআরএল রিফ্রেশ করুন'
  },
  'screenshots.policy_enforced': {
    en: 'Manual Discretionary Retention Policy Enforced',
    bn: 'ম্যানুয়াল বিবেচনামূলক সংরক্ষণ নীতি কার্যকর'
  },
  'screenshots.policy_desc': {
    en: 'Data is NOT automatically destroyed; administrators and managers retain discretionary control to manually Archive or Permanently Delete records according to company review.',
    bn: 'প্রশাসনিক পর্যালোচনা ছাড়া তথ্য স্বয়ংক্রিয়ভাবে ধ্বংস করা হয় না; কোম্পানির পর্যালোচনা অনুযায়ী ম্যানুয়ালি আর্কাইভ বা স্থায়ীভাবে মুছে ফেলার পূর্ণ নিয়ন্ত্রণ বজায় থাকে।'
  },
  'screenshots.restore_default_captures': {
    en: 'Restore Default Captures',
    bn: 'ডিফল্ট ক্যাপচার ফিরিয়ে আনুন'
  },
  'screenshots.refresh_notice': {
    en: 'All 15-minute S3 pre-signed cryptographic tokens have been securely re-authorized.',
    bn: 'সকল ১৫ মিনিটের এস৩ প্রি-সাইনড ক্রিপ্টোগ্রাফিক টোকেন নিরাপদে পুনরায় অনুমোদন করা হয়েছে।'
  },
  'screenshots.active_screenshots': {
    en: 'Active Screenshots',
    bn: 'সক্রিয় স্ক্রিনশট'
  },
  'screenshots.all_dates': {
    en: 'All Dates',
    bn: 'সকল তারিখ'
  },
  'screenshots.today_date': {
    en: 'Today (Sep 19, 2026)',
    bn: 'আজ (১৯ সেপ্টেম্বর, ২০২৬)'
  },
  'screenshots.yesterday_date': {
    en: 'Yesterday (Sep 18, 2026)',
    bn: 'গতকাল (১৮ সেপ্টেম্বর, ২০২৬)'
  },
  'screenshots.all_shifts': {
    en: 'All Shift Profiles',
    bn: 'সকল শিফট প্রোফাইল'
  },
  'screenshots.all_employees': {
    en: 'All Employees',
    bn: 'সকল কর্মী'
  },
  'screenshots.all_triggers': {
    en: 'All Trigger Types',
    bn: 'সকল ট্রিগার ধরণ'
  },
  'screenshots.reset_filter': {
    en: 'Reset',
    bn: 'রিসেট'
  },
  'screenshots.no_archived': {
    en: 'No Archived Records Found',
    bn: 'কোনো আর্কাইভ রেকর্ড পাওয়া যায়নি'
  },
  'screenshots.no_captures': {
    en: 'No Audited Captures Found',
    bn: 'কোনো নিরীক্ষিত ক্যাপচার পাওয়া যায়নি'
  },
  'screenshots.no_archived_desc': {
    en: 'No captures have been archived to the vault yet. You can manually archive any active screenshot anytime.',
    bn: 'ভল্টে এখনো কোনো ক্যাপচার আর্কাইভ করা হয়নি। আপনি যেকোনো সময় সক্রিয় স্ক্রিনশট আর্কাইভ করতে পারেন।'
  },
  'screenshots.no_captures_desc': {
    en: 'No screenshot files in the cloud vault match your current filter combination.',
    bn: 'বর্তমান ফিল্টার অনুযায়ী ক্লাউড ভল্টে কোনো স্ক্রিনশট ফাইল পাওয়া যায়নি।'
  },
  'screenshots.clear_filters': {
    en: 'Clear Filter Criteria',
    bn: 'ফিল্টার শর্ত মুছুন'
  },
  'screenshots.inspect_capture': {
    en: 'Inspect Audited Capture',
    bn: 'নিরীক্ষিত ক্যাপচার পরিদর্শন করুন'
  },
  'screenshots.window_label': {
    en: 'Window:',
    bn: 'উইন্ডো:'
  },
  'screenshots.restore_title': {
    en: 'Restore Capture to Active Vault',
    bn: 'ক্যাপচারটি পুনরায় সক্রিয় ভল্টে ফিরিয়ে আনুন'
  },

  // Settings Missing Keys
  'settings.screenshot_freq_label': {
    en: 'Audited Screenshot Frequency',
    bn: 'নিরীক্ষিত স্ক্রিনশটের ব্যবধান'
  },
  'settings.screenshot_freq_desc': {
    en: 'Randomized interval inside scheduled shift window',
    bn: 'নির্ধারিত শিফট চলাকালে এলোমেলো সময় ব্যবধান'
  },
  'settings.frequent': {
    en: 'Frequent',
    bn: 'ঘন ঘন'
  },
  'settings.balanced': {
    en: 'Balanced',
    bn: 'ভারসাম্যপূর্ণ'
  },
  'settings.minimal': {
    en: 'Minimal',
    bn: 'সর্বনিম্ন'
  },
  'settings.url_lifespan_label': {
    en: 'Pre-Signed URL Lifespan',
    bn: 'প্রি-সাইনড ইউআরএল মেয়াদ'
  },
  'settings.url_lifespan_desc': {
    en: 'Temporary S3 access token',
    bn: 'সাময়িক এস৩ অ্যাক্সেস টোকেন'
  },
  'settings.grace_window_label': {
    en: 'Auto-Start Grace Window',
    bn: 'অটো-স্টার্ট গ্রেস সময়'
  },
  'settings.grace_window_desc': {
    en: 'Shift start check-in tolerance',
    bn: 'শিফট শুরুর চেক-ইন শিথিলতা'
  },
  'settings.review_window_label': {
    en: 'Discretionary Review Window',
    bn: 'বিবেচনামূলক পর্যালোচনা চক্র'
  },
  'settings.review_window_desc': {
    en: 'Audit timeline review cycle',
    bn: 'অডিট টাইমলাইন পর্যালোচনা চক্র'
  },
  'settings.privacy_safeguards_title': {
    en: 'Ethical Privacy Safeguards & Compliance Rules',
    bn: 'নৈতিক গোপনীয়তা সুরক্ষা ও নীতিমালা'
  },
  'settings.privacy_safeguards_desc': {
    en: 'Transparent guardrails ensuring dignity, legal compliance, and employee trust.',
    bn: 'স্বচ্ছ নিয়মনীতি যা কর্মীদের মর্যাদা, আইনি কমপ্লায়েন্স ও বিশ্বাস নিশ্চিত করে।'
  },
  'settings.auto_mask_apps': {
    en: 'Auto-Mask Sensitive & Financial Applications',
    bn: 'সংবেদনশীল ও আর্থিক অ্যাপ স্বয়ংক্রিয় মাস্কিং'
  },
  'settings.auto_mask_desc': {
    en: "Automatically blurs Excel files with 'Payroll', banking portals, password managers, and personal browser tabs before transmission.",
    bn: "'পে-রোল' যুক্ত এক্সেল, ব্যাংকিং পোর্টাল, পাসওয়ার্ড ম্যানেজার ও ব্যক্তিগত ট্যাব স্বয়ংক্রিয়ভাবে ব্লার করে প্রেরণ করা হয়।"
  },
  'settings.badge_discretionary_gov': {
    en: 'DISCRETIONARY GOVERNANCE',
    bn: 'বিবেচনামূলক পরিচালনা'
  },
  'settings.badge_admin_access': {
    en: 'ADMIN ACCESS ONLY',
    bn: 'শুধুমাত্র অ্যাডমিন প্রবেশাধিকার'
  },
  'settings.badge_non_negotiable': {
    en: 'NON-NEGOTIABLE',
    bn: 'অপরিবর্তনীয়'
  },
  'settings.badge_permanently_blocked': {
    en: 'PERMANENTLY BLOCKED',
    bn: 'স্থায়ীভাবে নিষিদ্ধ'
  },

  // Daily Work Updates Missing Keys
  'updates.blocked_status': {
    en: 'Blocked / Needs Review',
    bn: 'স্থগিত / পর্যালোচনা প্রয়োজন'
  },
  'updates.badge': {
    en: 'Shift Deliverables Ledger',
    bn: 'শিফট ডেলিভারেবল খতিয়ান'
  },
  'updates.title': {
    en: 'Daily Work Updates & Task Accomplishments',
    bn: 'দৈনিক কাজের আপডেট ও অর্জিত মাইলস্টোন'
  },
  'updates.subtitle': {
    en: 'Real-time activity submissions directly linked to employee shift sessions and verified against active telemetry.',
    bn: 'কর্মীদের শিফট সেশনের সাথে সরাসরি সংযুক্ত এবং সক্রিয় টেলিমেট্রি দ্বারা যাচাইকৃত রিয়েল-টাইম কাজের বিবরণী।'
  },
  'updates.post_update': {
    en: 'Post Shift Update',
    bn: 'শিফট আপডেট পোস্ট করুন'
  },
  'updates.kpi_completed': {
    en: 'Milestones Completed',
    bn: 'অর্জিত মাইলস্টোন'
  },
  'updates.kpi_in_flight': {
    en: 'Ongoing In-Flight',
    bn: 'চলমান কার্যক্রম'
  },
  'updates.kpi_blockers': {
    en: 'Blockers Flagged',
    bn: 'চিহ্নিত প্রতিবন্ধকতা'
  },
  'updates.search_placeholder': {
    en: 'Search update title, project, description or employee...',
    bn: 'কাজের শিরোনাম, প্রকল্প, বিবরণ বা কর্মী খুঁজুন...'
  },
  'updates.all_statuses': {
    en: 'All Statuses',
    bn: 'সকল স্ট্যাটাস'
  },
  'updates.no_updates': {
    en: 'No Work Updates Found',
    bn: 'কোনো কাজের আপডেট পাওয়া যায়নি'
  },
  'updates.no_updates_desc': {
    en: 'No employee updates match your current filter query.',
    bn: 'বর্তমান ফিল্টারের সাথে কোনো কর্মীর আপডেট মিলেনি।'
  },
  'updates.reset_filters': {
    en: 'Reset Search & Filters',
    bn: 'সার্চ ও ফিল্টার রিসেট করুন'
  },
  'updates.logged': {
    en: 'Logged',
    bn: 'নথিভুক্ত'
  },
  'updates.time_dedicated': {
    en: 'Time Dedicated',
    bn: 'ব্যয়িত সময়'
  },
  'updates.view_deliverable': {
    en: 'View Deliverable Link',
    bn: 'ডেলিভারেবল লিংক দেখুন'
  },
  'updates.placeholder_task_title': {
    en: 'e.g. Completed database index optimization for telemetry table',
    bn: 'যেমন: টেলিমেট্রি টেবিলের ডেটাবেজ ইনডেক্স অপটিমাইজেশন সম্পন্ন'
  },
  'updates.placeholder_project_name': {
    en: 'e.g. Core Productivity Agent',
    bn: 'যেমন: কোর প্রোডাক্টিভিটি এজেন্ট'
  },
  'updates.placeholder_deliverable_url': {
    en: 'e.g. https://github.com/apexwork/desktop-client/pull/45',
    bn: 'যেমন: https://github.com/apexwork/desktop-client/pull/45'
  },
  'updates.placeholder_description': {
    en: 'Detail specific milestones achieved, Pull Request IDs, or obstacles encountered...',
    bn: 'অর্জিত সুনির্দিষ্ট মাইলস্টোন, পিআর আইডি বা কোনো বাধার সম্মুখীন হলে তার বিবরণ দিন...'
  },
  // Anti-Evasion & Fake Work Protection System
  'antievation.title': {
    en: 'Anti-Evasion & Fake Work Protection System',
    bn: 'ফাঁকিবাজি ও ভুয়া কাজ প্রতিরোধ সিস্টেম'
  },
  'antievation.badge': {
    en: 'Anti-Evasion Engine Active',
    bn: 'ফাঁকিবাজি প্রতিরোধ ইঞ্জিন সক্রিয়'
  },
  'antievation.density_meter': {
    en: '⚡ Activity Density %',
    bn: '⚡ সক্রিয়তা ঘনত্ব %'
  },
  'antievation.avg_density': {
    en: 'Average Team Activity Density',
    bn: 'গড় টিম সক্রিয়তা ঘনত্ব'
  },
  'antievation.high_engagement': {
    en: 'High Engagement (70-100%)',
    bn: 'তীব্র সক্রিয় (৭০-১০০%)'
  },
  'antievation.moderate_engagement': {
    en: 'Moderate Engagement (40-69%)',
    bn: 'পরিমিত সক্রিয় (৪০-৬৯%)'
  },
  'antievation.ghost_inactivity': {
    en: 'Ghost Inactivity / Suspicious (<30%)',
    bn: 'সন্দেহজনক ভুয়া উপস্থিতি (<৩০%)'
  },
  'antievation.flagged_media': {
    en: '⚠️ Media / Non-Work Window Flagged',
    bn: '⚠️ ভিডিও/বিনোদন উইন্ডো সনাক্ত'
  },
  'antievation.randomized_interval_badge': {
    en: 'Randomized Unpredictable Interval (Anti-Evasion Enabled)',
    bn: 'অপ্রত্যাশিত র্যান্ডম ব্যবধান (ফাঁকিবাজি প্রতিরোধ সক্রিয়)'
  },
  'antievation.randomized_shutter': {
    en: 'Randomized Shutter',
    bn: 'র্যান্ডম শাটার'
  },
  'antievation.phone_scrolling_alert': {
    en: 'Window open but virtually zero interaction (phone scrolling / fake presence)',
    bn: 'উইন্ডো খোলা কিন্তু কার্যত শূন্য সক্রিয়তা (মোবাইল স্ক্রোলিং / ভুয়া উপস্থিতি)'
  },
  'antievation.foreground_process': {
    en: 'Foreground Process',
    bn: 'সক্রিয় প্রসেস উইন্ডো'
  },
  'antievation.keystrokes': {
    en: 'Keystrokes',
    bn: 'কীবোর্ড চাপ'
  },
  'antievation.mouse_clicks': {
    en: 'Mouse Clicks',
    bn: 'মাউস ক্লিক'
  },
  'antievation.scroll_events': {
    en: 'Scrolls',
    bn: 'স্ক্রোল'
  },
  'antievation.scenario_a': {
    en: 'Scenario A: Normal Active Work',
    bn: 'দৃশ্যপট ১: স্বাভাবিক সক্রিয় কাজ'
  },
  'antievation.scenario_b': {
    en: 'Scenario B: Ghost Presence / Phone Scrolling',
    bn: 'দৃশ্যপট ২: ভুয়া উপস্থিতি / মোবাইল স্ক্রোলিং'
  },
  'antievation.scenario_c': {
    en: 'Scenario C: Background Video / Media Playing',
    bn: 'দৃশ্যপট ৩: ব্যাকগ্রাউন্ডে ভিডিও/গান চালু'
  },
  'antievation.scenario_a_desc': {
    en: 'High engagement (88%), genuine typing & clicks',
    bn: 'তীব্র সক্রিয়তা (৮৮%), বাস্তব টাইপিং ও মাউস ক্লিক'
  },
  'antievation.scenario_b_desc': {
    en: 'Excel open, 4% density, 0 keystrokes (phone scrolling)',
    bn: 'এক্সেল খোলা কিন্তু ৪% সক্রিয়তা, ০ কীবোর্ড চাপ (মোবাইল ব্রাউজিং)'
  },
  'antievation.scenario_c_desc': {
    en: 'YouTube stream playing in foreground during shift',
    bn: 'কাজের শিফটে ফোরগ্রাউন্ডে ইউটিউব ভিডিও চলছে'
  },
  'antievation.load_preset': {
    en: 'Load Preset Scenario',
    bn: 'প্রিসেট লোড করুন'
  },
  'antievation.flagged_hours': {
    en: 'Flagged Inactive / Media Hours',
    bn: 'ফ্ল্যাগযুক্ত নিষ্ক্রিয়/বিনোদন সময়'
  },
  'antievation.genuine_rate': {
    en: 'Genuine Work Rate',
    bn: 'প্রকৃত কাজের হার'
  },
  'antievation.density_threshold': {
    en: 'Density Threshold',
    bn: 'ঘনত্ব সীমা'
  },
  'antievation.filter_all': {
    en: 'All Authenticity Levels',
    bn: 'সকল সক্রিয়তা মাত্রা'
  },
  'antievation.filter_flagged': {
    en: 'Flagged Evasion Only',
    bn: 'শুধুমাত্র ফ্ল্যাগযুক্ত ফাঁকিবাজি'
  },
  'antievation.filter_high': {
    en: 'High Engagement Only (>=70%)',
    bn: 'শুধুমাত্র তীব্র সক্রিয় (>=৭০%)'
  },
  'antievation.filter_ghost': {
    en: 'Ghost Inactivity Only (<30%)',
    bn: 'শুধুমাত্র ভুয়া উপস্থিতি (<৩০%)'
  },
  'High Engagement': {
    en: 'High Engagement',
    bn: 'তীব্র সক্রিয়'
  },
  'Moderate Engagement': {
    en: 'Moderate Engagement',
    bn: 'পরিমিত সক্রিয়'
  },
  'Ghost Inactivity / Suspicious': {
    en: 'Ghost Inactivity / Suspicious',
    bn: 'সন্দেহজনক ভুয়া উপস্থিতি'
  },
  'Randomized Interval': {
    en: 'Randomized Interval',
    bn: 'র্যান্ডম ব্যবধান'
  },
  'Media / Non-Work Window Flagged': {
    en: 'Media / Non-Work Window Flagged',
    bn: 'ভিডিও/বিনোদন উইন্ডো সনাক্ত'
  },
  'Ghost Inactivity / Low Interaction': {
    en: 'Ghost Inactivity / Low Interaction',
    bn: 'ভুয়া উপস্থিতি / স্বল্প মিথস্ক্রিয়া'
  },
  'antievation.why_title': {
    en: 'Why Traditional Fixed Screenshots Fail',
    bn: 'কেন সনাতন নির্দিষ্ট ব্যবধানের স্ক্রিনশট ব্যর্থ হয়'
  },
  'antievation.why_desc': {
    en: 'When workers know a screenshot takes place every 15 minutes, they can easily switch to a work document or pretend to work right at that minute, then return to phone scrolling or video watching. Our 4-pillar system combines randomized unpredictable shutter timing, keystroke/mouse activity density metering, foreground process title inspection, and media interception to guarantee genuine workplace productivity.',
    bn: 'কর্মীরা যখন জানে প্রতি ১৫ মিনিট পর পর স্ক্রিনশট নেওয়া হবে, তখন তারা স্ক্রিনশটের ঠিক সেই মুহূর্তে কাজের উইন্ডোতে ফিরে আসে এবং স্ক্রিনশট নেওয়ার পর মোবাইল টিপে বা ভিডিও দেখে। আমাদের ৪-স্তরের সুরক্ষাব্যবস্থায় র্যান্ডম অপ্রত্যাশিত শাটার, কীবোর্ড ও মাউসের মিথস্ক্রিয়া ঘনত্ব বিশ্লেষণ, ফোরগ্রাউন্ড উইন্ডো টাইটেল পর্যবেক্ষণ ও মিডিয়া শনাক্তকরণ একসাথে কাজ করে ভুয়া উপস্থিতি শতভাগ রুখে দেয়।'
  }
};

export function getTranslation(key: string, lang: Language, fallback?: string): string {
  if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
    return TRANSLATIONS[key][lang];
  }
  return fallback !== undefined ? fallback : (TRANSLATIONS[key]?.en || key);
}
