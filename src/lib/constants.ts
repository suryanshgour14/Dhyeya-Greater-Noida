import type { LucideIcon } from 'lucide-react';
import {
  Target, ListChecks, Layers, Star, Rocket, Info, BookOpen, Monitor,
  Building, FileText, Book, ClipboardList, Edit, Users, Download,
  HelpCircle, Bell, Trophy, Award, Calendar, CalendarDays, Newspaper,
  Crown, Users2, Settings, GraduationCap, MessageSquare, CheckCircle,
  IndianRupee, UserCheck, Zap, Video, Play,
  PenLine,
} from 'lucide-react';

// ─── Site ────────────────────────────────────────────────────────────────────
export const SITE_NAME = 'Dhyeya IAS Greater Noida';
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://dhyeyagreaternoida.com';

export const CONTACT_INFO = {
  address:
    'Dhyeya IAS, Plot No. 039A, Greater Noida – 201310, Gautam Buddh Nagar, Uttar Pradesh, India',
  phone: '+91 92053 36037',
  phone2: '+91 82998 99757',
  whatsapp: '+919205336037',
  email: 'dhyeyasansthanam@gmail.com',
  mapUrl:
    'https://www.google.com/maps/place/DHYEYA+IAS+Greater+Noida/@28.4688528,77.5072156,766m/data=!3m1!1e3!4m6!3m5!1s0x390cea04b83fccfd:0xce2b8195ec7b7d63!8m2!3d28.4688561!4d77.507212!16s%2Fg%2F11dyn8w7rl?hl=en',
  hours: 'Mon – Sat: 9:00 AM – 7:00 PM',
};

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/share/1EdHmVnrm9/',
  instagram: 'https://www.instagram.com/dhyeyaiasgreaternoida/',
  youtube: 'https://youtube.com/@dhyeyagrnoida?si=5mH8tgTqGYNnxsB2',
  twitter: 'https://twitter.com/dhyeyaias',
  telegram: 'https://t.me/dhyeyaiasgreaternoida',
};

// ─── Announcement ────────────────────────────────────────────────────────────
export const ANNOUNCEMENT_ITEMS: string[] = [];

// ─── Navigation ──────────────────────────────────────────────────────────────
export interface NavChild {
  label: string;
  href: string;
  icon?: LucideIcon;
  description?: string;
  isHeader?: boolean;
  fullWidth?: boolean;
  subLinks?: { label: string; href: string }[];
}

export interface NavItem {
  label: string;
  href: string;
  columns?: 1 | 2;
  alignRight?: boolean;
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'Our Mission', href: '/about#mission', icon: Target, description: 'Vision & purpose behind Dhyeya IAS' },
      { label: 'Aims & Objectives', href: '/about#aims', icon: ListChecks, description: 'What we strive to achieve' },
      { label: 'Methodology', href: '/about#methodology', icon: Layers, description: 'Our proven teaching approach' },
      { label: 'Why Dhyeya IAS', href: '/about#why', icon: Star, description: 'What makes us different' },
    ],
  },
  {
    label: 'Courses',
    href: '/courses',
    columns: 2,
    children: [
      { label: 'UPSC IAS Foundation', href: '/courses/upsc-ias-foundation', icon: GraduationCap, description: '15-month complete IAS foundation batch' },
      { label: 'UPPSC PCS Comprehensive', href: '/courses/uppsc-pcs-comprehensive', icon: Trophy, description: '1-year complete UPPCS PCS programme' },
      { label: 'Udaan 3-Year – IAS/PCS', href: '/courses/udaan-3-year-integrated', icon: Rocket, description: 'Flagship 3-year scholarship programme' },
      { label: 'Mentorship Program', href: '/courses/upsc-ias-mentorship', icon: UserCheck, description: 'Personalised 1-on-1 guidance', subLinks: [{ label: 'IAS', href: '/courses/upsc-ias-mentorship' }, { label: 'PCS', href: '/courses/uppsc-pcs-mentorship' }] },
      { label: 'CSAT Mastery – IAS/PCS', href: '/courses/csat-mastery', icon: ClipboardList, description: 'Paper II aptitude & reasoning prep' },
      { label: 'UPPCS Prelims Crash Course', href: '/courses/uppsc-prelims-crash-course', icon: Zap, description: 'Intensive fast-track UPPCS Prelims batch' },
      { label: 'UP Special Paper 5 & 6', href: '/courses/up-special-paper-5-6', icon: BookOpen, description: 'UPPCS Mains GS Paper 5 & 6 mastery' },
      { label: 'General Hindi – UPPSC', href: '/courses/uppsc-general-hindi', icon: Book, description: '30-day Hindi paper intensive' },
      { label: 'Mains Answer Writing', href: '/courses/uppsc-mains-answer-writing', icon: PenLine, description: '120-day evaluated writing programme' },
      { label: 'BPSC CCE Prep', href: '/courses/bpsc-cce-prep', icon: Award, description: 'Complete Bihar PCS CCE preparation' },
    ],
  },
  {
    label: 'Syllabus',
    href: '/syllabus',
    children: [
      { label: 'IAS', href: '/syllabus/ias', icon: GraduationCap, description: 'UPSC Civil Services syllabus' },
      { label: 'UPPSC', href: '/syllabus/uppsc', icon: FileText, description: 'UP PCS syllabus & exam pattern' },
      { label: 'UKPSC', href: '/syllabus/ukpsc', icon: Layers, description: 'Uttarakhand PCS syllabus' },
      { label: 'BPSC', href: '/syllabus/bpsc', icon: BookOpen, description: 'Bihar PCS syllabus & pattern' },
    ],
  },
  {
    label: 'Test Series',
    href: '/test-series',
    columns: 2,
    children: [
      { label: 'Live Tests', href: '/tests', icon: Monitor, description: 'Take live mock tests online', fullWidth: true },
      { label: 'Mains', href: '', isHeader: true },
      { label: 'Prelims', href: '', isHeader: true },
      { label: 'IAS Prelims', href: '/test-series/ias-prelims', icon: ClipboardList, description: 'GS + CSAT mock tests' },
      { label: 'IAS Mains', href: '/test-series/ias-mains', icon: Edit, description: 'Answer writing mock tests' },
      { label: 'UPPCS Prelims', href: '/test-series/uppcs-prelims', icon: ClipboardList, description: 'UP PCS prelims mock tests' },
      { label: 'UPPCS Mains', href: '/test-series/uppcs-mains', icon: Edit, description: 'UP PCS mains answer practice' },
      { label: 'UKPCS Prelims', href: '/test-series/ukpsc-prelims', icon: ClipboardList, description: 'Uttarakhand prelims series' },
      { label: 'UKPCS Mains', href: '/test-series/ukpcs-mains', icon: Edit, description: 'Uttarakhand mains series' },
    ],
  },
  {
    label: 'Student Zone',
    href: '/student-zone',
    columns: 2,
    alignRight: true,
    children: [
      { label: 'Batch Details', href: '/student-zone/batches', icon: Users },
      { label: 'Free Resources', href: '/student-zone/resources', icon: Download },
      { label: 'UPSC FAQs', href: '/student-zone/faqs', icon: HelpCircle },
      { label: 'Live Test', href: '/tests', icon: Monitor },
      { label: 'Latest Notifications', href: '/student-zone/notifications', icon: Bell },
      { label: 'Test Results', href: '/student-zone/results', icon: Trophy },
    ],
  },
  {
    label: 'Current Affairs',
    href: '/current-affairs',
    alignRight: true,
    children: [
      { label: 'Daily Current Affairs', href: '/current-affairs/daily', icon: Calendar, description: "Today's key news for UPSC" },
      { label: 'Monthly Magazine', href: '/magazine', icon: Newspaper, description: 'In-depth monthly compilation' },
    ],
  },
  {
    label: 'Team',
    href: '/team',
    alignRight: true,
    children: [
      { label: 'Directors', href: '/team#directors', icon: Crown, description: 'Leadership & vision' },
      { label: 'Advisory Board', href: '/team#advisory', icon: Users2, description: 'IAS officers & experts' },
      { label: 'Mock Interview Panel', href: '/team#interview-panel', icon: MessageSquare, description: 'Personality test prep' },
      { label: 'Administration', href: '/team#admin', icon: Settings, description: 'Operations & support' },
    ],
  },
];

// ─── Stats ────────────────────────────────────────────────────────────────────
export const STATS = [
  { value: 15000, suffix: '+', label: 'Students Trained', iconName: 'Users' },
  { value: 5000, suffix: '+', label: 'Selections in IAS / PCS', iconName: 'Trophy' },
  { value: 25, suffix: '+', label: 'Expert Faculty', iconName: 'GraduationCap' },
  { value: 20, suffix: '+', label: 'Years of Experience', iconName: 'Star' },
] as const;

// ─── Toppers ─────────────────────────────────────────────────────────────────
export interface Topper {
  id: string;
  name: string;
  rank: string;
  exam: string;
  photo: string;
}

export const TOPPERS: Topper[] = [
  { id: '1',  name: 'Kanishak Kataria',   rank: 'AIR 01',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/fMWXbFosdw4tyk2ChjpUA4wN6StCMj3SbitYdT8i.png' },
  { id: '2',  name: 'Junaid Ahmed',        rank: 'AIR 03',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/6I66eXXGGRC0230LySjema7Pewe7AcByRIncmdrK.png' },
  { id: '3',  name: 'Saumya Pandey',       rank: 'AIR 04',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/oLNEE4sanXA7ANnHbwEu9iNuMfQP0hs862h6XHqP.png' },
  { id: '4',  name: 'Lok Bandhu',          rank: 'AIR 07',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/YoQY8FW9WbzRFsV4BiIuIDfG6iAGnqBsN0U5Rr49.png' },
  { id: '5',  name: 'Suryapal Gangwar',    rank: 'AIR 08',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/RRcALYfxiPmJP3hOFgtd9kDPDPmjAKsVdX4NCpmT.png' },
  { id: '6',  name: 'Jaiprakash Maurya',   rank: 'AIR 09',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/d2SJZqRFC7nWgKapAdsRPTqrqvVkLkW92mPW6n9i.png' },
  { id: '7',  name: 'Mahesh Kumar',        rank: 'AIR 14',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/WayNnDayeeCxhdROoRxiilZvwoyErja7JaSLNKP3.png' },
  { id: '8',  name: 'Shivani Goyal',       rank: 'AIR 15',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/OcRookF1Kruunyg8QYAXPulckNd8bt4MgYEFDjrw.png' },
  { id: '9',  name: 'Shweta Singhal',      rank: 'AIR 17',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/ZbILFw85fCp7YjJqB3GdzJSm9IOZRPVp6FGf1ORa.png' },
  { id: '10', name: 'Sriman Hukla',        rank: 'AIR 18',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/h8t1bySN7Jarm0zFdJCP1K3bcG7cllM6vWRGdbO7.png' },
  { id: '11', name: 'Priyanka Niranjan',   rank: 'AIR 20',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/VlY4dLixvHY6B5YbNMS1YpnoeY1xcPmi1D7nH6uV.png' },
  { id: '12', name: 'Adesh Titarmare',     rank: 'AIR 21',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/ICwx75jPLmtIivfHuv4OMXV0XufCF6F8zL2oLym5.png' },
  { id: '13', name: 'Neha Prakash',        rank: 'AIR 22',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/nryoQD5Wij65eVEL2JQDVYYss3B0GLXTbXsFOWD9.png' },
  { id: '14', name: 'Anuraj Jain',         rank: 'AIR 24',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/muJtU99iOUzJkjSzsWJCSiPzyyg0h8j71F1aOXWn.png' },
  { id: '15', name: 'Dibya Jyoti Parida',  rank: 'AIR 26',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/CiL6zuBdffB1jCLmNzCKtng2XcOAEIqvgl5WNtDr.png' },
  { id: '16', name: 'Karamveer Sharma',    rank: 'AIR 28',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/Eg93Dh1CdS0n3Jt8tOK51wOYQ1iAJk6BxNXs5dkU.png' },
  { id: '17', name: 'Anjanay Kumar',       rank: 'AIR 29',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/AgR1OxUxzhdd30DWFELcCF3rKV7yezeiMPy1UkCL.png' },
  { id: '18', name: 'Pari Bishnoi',        rank: 'AIR 30',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/s59c5GbI5jaOFL03ul8iY3ExQynCLhfRKh4oOlqJ.png' },
  { id: '19', name: 'Ganga Singh',         rank: 'AIR 33',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/RoJYBaW91P9XhiWozn7CXYjlwWx1pKpvEshkBRtA.png' },
  { id: '20', name: 'Arun Raj',            rank: 'AIR 34',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/Lngb4U9s4B1qBuPDnK6ssmDTdHSCrLcPJPDogDCR.png' },
  { id: '21', name: 'Arnav Mishra',        rank: 'AIR 56',  exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/pz0G0fO4nK11yRHoYft6vOjKLzD0FkTA6jD2cTdW.png' },
  { id: '22', name: 'Zufishan Haque',      rank: 'AIR 193', exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/r6yb4dnkz4Atfb1u88YoCI7zKARrjV4dX5mzgeLy.png' },
  { id: '23', name: 'Rajat Singh',         rank: 'AIR 379', exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/uVRUucG3OrglRClwyd7kCeqdhL9iPZCJsPtAfeMo.png' },
  { id: '24', name: 'Pankaj Verma',        rank: 'AIR 515', exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/s9gAVfKsm7JpMjnNLSvalUVCjDGgI174yejfuULh.png' },
  { id: '25', name: 'Rohit Kardam',        rank: 'AIR 517', exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/4o7fE9NrZjVRnaXDZk2hRqVRHHc5lxGFqjltXG72.png' },
  { id: '26', name: 'Adarsh Patel',        rank: 'AIR 520', exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/6wI91pG14AhRBYUIfjSedycrptWslHcHlchAadHu.png' },
  { id: '27', name: 'Vipin Dubay',         rank: 'AIR 708', exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/jt8QfCojoruZKRqg3oVskUGViTQ8bYv0bVMsoCC8.png' },
  { id: '28', name: 'Ayush Agrawal',       rank: 'AIR 822', exam: 'UPSC CSE', photo: 'https://www.dhyeyaias.com/storage/media/0gynj7zmNbkT65vxRV5Hyxy9ARJ2J3xRRknI2ygN.png' },
];

// ─── Homepage Courses ────────────────────────────────────────────────────────
export interface HomeCourse {
  id: string;
  title: string;
  description: string;
  Icon: LucideIcon;
  features: string[];
  href: string;
  badge?: string;
  color: string;
}

export const HOME_COURSES: HomeCourse[] = [
  {
    id: 'classroom',
    title: 'Classroom Programme',
    description: 'Immersive face-to-face learning with India\'s top UPSC faculty in our smart classrooms.',
    Icon: Users,
    features: ['Daily 6–8 hrs of lectures', 'Personal doubt sessions', 'Printed study material'],
    href: '/courses/classroom',
    color: 'blue',
  },
  {
    id: 'udaan',
    title: 'Dhyeya IAS Udaan',
    description: 'Flagship scholarship programme with up to ₹2 Lakh waiver for meritorious aspirants.',
    Icon: Rocket,
    features: ['Scholarship up to ₹2 Lakh', 'Top-ranked faculty', 'Limited seats'],
    href: '/courses/udaan',
    badge: 'Flagship',
    color: 'gold',
  },
  {
    id: 'online-pen',
    title: 'Online / Pen Drive',
    description: 'Recorded video lectures and live sessions accessible anywhere, anytime on any device.',
    Icon: Monitor,
    features: ['HD recorded lectures', 'Lifetime access', 'Online test series'],
    href: '/courses/online',
    color: 'blue',
  },
  {
    id: 'distance',
    title: 'Distance Learning',
    description: 'Comprehensive postal study material delivered to your doorstep with online support.',
    Icon: BookOpen,
    features: ['Monthly printed modules', 'Postal delivery', 'Doubt clearing helpline'],
    href: '/courses/distance',
    color: 'orange',
  },
  {
    id: 'online-courses',
    title: 'Live Online Courses',
    description: 'Real-time interactive classes with live Q&A, recorded backup, and peer learning.',
    Icon: Video,
    features: ['Live interactive sessions', 'Recorded backup', 'Chat-based Q&A'],
    href: '/courses/live-online',
    color: 'blue',
  },
  {
    id: 'offline-courses',
    title: 'Offline Batch',
    description: 'Traditional classroom experience with state-of-the-art infrastructure in Greater Noida.',
    Icon: Building,
    features: ['Modern classrooms', 'Well-stocked library', 'Hostel facility available'],
    href: '/courses/offline',
    color: 'gold',
  },
];

// ─── Course Detail Types ──────────────────────────────────────────────────────
export type CourseCategory = 'IAS' | 'PCS' | 'IAS+PCS';
export type CoursePhase = 'Foundation' | 'Prelims' | 'Mains' | 'Interview' | 'All Phases';

export interface CourseModule {
  name: string;
  topics: string[];
}

export interface CourseFeature {
  title: string;
  description: string;
  iconName: string;
}

export interface CourseRoadmapPhase {
  period: string;
  title: string;
  items: string[];
}

export interface Course {
  slug: string;
  title: string;
  subtitle: string;
  category: CourseCategory;
  phase: CoursePhase;
  duration: string;
  fee: number;
  emi?: string;
  seats: number;
  batchStart?: string;
  badge?: string;
  tagline: string;
  description: string;
  highlights: { label: string; value: string }[];
  modules: CourseModule[];
  features: CourseFeature[];
  whoFor: string[];
  roadmap: CourseRoadmapPhase[];
  faqs: { q: string; a: string }[];
  accentColor: 'blue' | 'gold' | 'orange';
  isFeatured?: boolean;
  isNew?: boolean;
}

export const COURSES: Course[] = [
  // ── 1. 15-Month GS Foundation ─────────────────────────────────────────────
  {
    slug: 'upsc-ias-foundation',
    title: '15-Month GS Foundation Batch',
    subtitle: 'UPSC Civil Services Examination',
    category: 'IAS',
    phase: 'Foundation',
    duration: '15 months',
    fee: 110000,
    emi: '₹1,20,000 in installments',
    seats: 60,
    batchStart: 'July 2026',
    badge: 'Bestseller',
    tagline: 'Transform your aspiration into achievement - concept to AIR',
    description:
      'The UPSC Civil Services Examination demands more than just hard work; it requires a strategic, phased, and deeply analytical approach. The Dhyeya IAS 15-Month Comprehensive GS Foundation Batch is meticulously engineered to take you from absolute basics to advanced Mains answer writing and Interview readiness. Whether you are a college student or a dedicated full-time aspirant, this master program provides the exact roadmap, mentorship, and rigorous practice needed to clear the exam in your first structured attempt.',
    highlights: [
      { label: 'Duration', value: '15 Months' },
      { label: 'Prelims Mocks', value: '35+ FLTs' },
      { label: 'Mains Tests', value: '12 Evaluated' },
      { label: 'Evaluation', value: 'Within 72 hrs' },
    ],
    modules: [
      {
        name: 'Prelims GS Paper I',
        topics: ['Indian History & Culture', 'Indian & World Geography', 'Indian Polity & Governance', 'Economic Development', 'Environment & Ecology', 'Science & Technology', 'Current Affairs'],
      },
      {
        name: 'Mains GS Papers I & II',
        topics: ['Indian Heritage & Culture', 'Modern & World History', 'Society & Social Issues', 'Indian & World Geography', 'Governance & Polity', 'International Relations'],
      },
      {
        name: 'Mains GS Papers III & IV',
        topics: ['Economic Development & Agriculture', 'Science, Tech & Environment', 'Security & Disaster Management', 'Ethics, Integrity & Aptitude', 'Case Studies & Applications'],
      },
      {
        name: 'Essay & Answer Writing',
        topics: ['Essay Structure & Strategy', 'Daily Answer Practice', 'Faculty-Evaluated Copies', 'Model Answers', 'Peer Review Sessions'],
      },
      {
        name: 'CSAT Paper II',
        topics: ['Reading Comprehension', 'Quantitative Aptitude', 'Logical Reasoning', 'Decision Making', 'Full-length CSAT Mocks'],
      },
    ],
    features: [
      { title: 'Integrated NCERT-to-Advanced Pedagogy', description: 'Topics are seamlessly scaled from basics to advanced level and mapped to previous years\' Mains questions from Day 1', iconName: 'GraduationCap' },
      { title: 'Daily Current Affairs Integration', description: 'Dedicated weekly sessions linking newspaper reading directly to your static syllabus - answers always relevant and data-backed', iconName: 'Newspaper' },
      { title: 'Dual-Tier Mentorship', description: 'Academic mentors for immediate doubt clearance + Strategic mentors (officers/veterans) for time management and mental conditioning', iconName: 'Users' },
      { title: 'Premium Study Material', description: 'Exclusive updated Dhyeya IAS study booklets and lecture handouts covering the complete GS syllabus', iconName: 'BookOpen' },
      { title: 'Daily Answer Writing (DAW)', description: 'Daily Mains answer practice with expert faculty evaluation from Phase 2 onwards', iconName: 'Edit' },
      { title: 'Full-Length Mock Series', description: '35+ Prelims FLTs with all-India ranking + 12 Mains tests evaluated within 72 hours', iconName: 'ClipboardList' },
    ],
    whoFor: [
      'Undergraduates, working professionals transitioning to civil services, and dedicated aspirants looking for a highly disciplined, end-to-end preparation ecosystem',
      'Fresh graduates (any stream) targeting IAS, IPS, or IFS in their first structured attempt',
      'Previous UPSC aspirants who need a complete reset with expert guidance and proper structure',
      'Students who want to start early and build a rock-solid conceptual base before exam pressure kicks in',
    ],
    roadmap: [
      { period: 'Phase 1 - Months 1–3', title: 'The Foundation', items: ['NCERT Basics, Core Polity, Physical Geography, and Macro-Economics', 'Weekly conceptual MCQ quizzes and basic answer structuring workshops', 'CSAT Paper II introduction and reading habit formation', 'Current affairs newspaper reading discipline established'] },
      { period: 'Phase 2 - Months 4–10', title: 'Core GS Mastery', items: ['Advanced GS Papers I, II, III, and IV covered in depth', 'Daily Answer Writing (DAW) with expert faculty feedback begins', 'Static syllabus integrated with dynamic current affairs issues', 'Sectional tests with all-India performance ranking'] },
      { period: 'Phase 3 - Months 11–12', title: 'Pre-Mains Convergence', items: ['Ethics (GS 4) Case Studies and Essay Writing Workshops', 'Current Affairs compilation and theme-based integration', 'High-yield revision modules for all GS papers', 'Essay practice: 2 essays per week with full faculty evaluation'] },
      { period: 'Phase 4 - Months 13–14', title: 'Prelims Bootcamp', items: ['35+ Full-Length Prelims Mock Tests (Sectional and Full-Length) with all-India ranking', 'Intensive MCQ practice - CSAT mastery, Economic Survey, Budget, and India Year Book', 'Previous year paper analysis for the last 10 years', 'Elimination techniques for Assertion-Reasoning and statement-based questions'] },
      { period: 'Phase 5 - Month 15', title: 'Mains Simulation', items: ['12 Full-Length Mains Tests evaluated within 72 hours', 'Time-bound exam-condition simulations and speed-writing drills', 'Faculty-evaluated copies returned with detailed marks and written feedback', 'Final rank-building strategy session and interview preparation guidance'] },
    ],
    faqs: [
      { q: 'Is this batch suitable for beginners?', a: 'Yes. This is a foundation batch that starts from the basics. No prior coaching experience is required.' },
      { q: 'Will optional subjects be covered?', a: 'The batch covers complete GS and provides optional subject selection guidance. Separate optional batches run alongside.' },
      { q: 'What if I miss a class?', a: 'All lectures are recorded and available on the student portal within 24 hours. You will never fall behind.' },
      { q: 'Is there a scholarship available?', a: 'Yes. The UDAAN scholarship provides up to ₹2 Lakh fee waiver based on merit. Contact our admission office for details.' },
      { q: 'What is the medium of instruction?', a: 'Primarily English with bilingual support in Hindi for those who prefer it.' },
    ],
    accentColor: 'blue',
    isFeatured: true,
  },
  // ── 2. 1-Year UPPSC PCS Comprehensive ────────────────────────────────────
  {
    slug: 'uppsc-pcs-comprehensive',
    title: '1-Year UPPSC PCS Comprehensive',
    subtitle: 'UP Provincial Civil Services Examination',
    category: 'PCS',
    phase: 'All Phases',
    duration: '12 months',
    fee: 81000,
    emi: '₹90,000 in installments',
    seats: 60,
    batchStart: 'August 2026',
    badge: 'Popular',
    tagline: 'Complete UPPSC PCS preparation - Prelims to Interview in one batch',
    description:
      'The UPPSC PCS examination is one of the most competitive state-level examinations in India. The Dhyeya IAS 1-Year Comprehensive PCS Batch is purpose-built for UP aspirants - covering the entire Samanya Adhyayan syllabus, exclusive UP Special Papers 5 & 6, Compulsory General Hindi, Essay, and Answer Writing across all Mains papers. The bilingual teaching approach ensures that aspirants from both Hindi-medium and English-medium backgrounds can excel without compromise.',
    highlights: [
      { label: 'Duration', value: '12 Months' },
      { label: 'Batch Size', value: '60 Students' },
      { label: 'Mock Tests', value: '25+ FLTs' },
      { label: 'Selection Rate', value: '62%' },
    ],
    modules: [
      {
        name: 'UP Samanya Adhyayan (Prelims)',
        topics: ['UP History & Culture', 'UP Geography', 'UP Economy & Schemes', 'UP Current Affairs', 'National GS & Polity', 'Environment & Science'],
      },
      {
        name: 'Mains Samanya Adhyayan (All Papers)',
        topics: ['SA Paper I - History, Geography, Society', 'SA Paper II - Polity & Governance', 'SA Paper III - Economy, Tech & Environment', 'SA Paper IV - Ethics & GS', 'Answer writing strategy for each paper'],
      },
      {
        name: 'General Hindi (Compulsory)',
        topics: ['Hindi Vyakaran (Grammar)', 'Nibandh (Essay)', 'Hindi Sahitya (Literature)', 'Translation & Anuvad', 'Saar-lekhan (Summary)'],
      },
      {
        name: 'UP Special Papers 5 & 6',
        topics: ['UP History, Society & Culture', 'UP Polity & Administration', 'UP Economy, Agriculture & Infrastructure', 'UP Geography, Environment & Biodiversity', 'Data-rich answer writing for UP-specific questions'],
      },
    ],
    features: [
      { title: 'GS 5 & 6 Mastery', description: 'Dedicated modules for UPPSC-exclusive GS Papers 5 and 6 - UP History, UP Economy, UP Geography, and UP Polity with district-level data and map work', iconName: 'Target' },
      { title: 'General Hindi Excellence', description: 'Compulsory General Hindi taught by language specialists - Vyakaran, Nibandh, Anuvad, and Saar-lekhan with daily evaluated practice', iconName: 'Book' },
      { title: 'Exam-Calibrated Answer Writing', description: 'Answers trained to UPPSC examiner expectations - presentation, word limit, structure, and UP-specific data integration from Day 1', iconName: 'Edit' },
      { title: 'Premium Study Material', description: 'Exclusive Dhyeya IAS UPPSC booklets with bilingual notes covering GS, UP Special, General Hindi, and Essay papers', iconName: 'BookOpen' },
      { title: 'Dual Mentorship', description: 'Subject faculty for academic doubt clearance + PCS officer mentors for strategic guidance and time management', iconName: 'Users' },
    ],
    whoFor: [
      'UP domicile aspirants targeting SDM, DSP, BDO, ACMO, Finance Officer, Treasury Officer, and other Group A & B PCS posts',
      'Graduates comfortable in Hindi medium who want a structured, bilingual, end-to-end PCS preparation system',
      'Previous UPPSC attempt holders who want expert re-direction and a completely structured re-attempt',
      'Aspirants appearing in both UPSC CSE and UPPSC PCS who want efficient dual-exam coverage',
    ],
    roadmap: [
      { period: 'Phase 1 - Months 1–3', title: 'Foundation & Static Core', items: ['Complete UPPSC SA foundation - History, Geography, Polity, Economy', 'NCERT-to-advanced progression for all core topics', 'Current affairs integration from Day 1', 'Daily MCQ practice with chapter-wise sectional tests'] },
      { period: 'Phase 2 - Months 4–7', title: 'UP Special & Mains Depth', items: ['GS Papers 5 & 6 (UP Special) mastery - deep UP-specific content', 'SA Papers I–IV in-depth Mains coverage', 'Daily Answer Writing (DAW) begins - 5 evaluated answers per day', 'Sectional mock tests with all-India UPPSC ranking'] },
      { period: 'Phase 3 - Months 8–10', title: 'Mains Edge & General Hindi', items: ['Compulsory General Hindi intensive - Vyakaran, Nibandh, Anuvad, Saar-lekhan', 'Exam-calibrated answer writing framework for all SA papers', 'Essay & Paper VI preparation with model answers', 'Mid-programme comprehensive mock series'] },
      { period: 'Phase 4 - Months 11–12', title: 'Targeted Prelims Bootcamp', items: ['25+ Full-Length Prelims Mocks (UPPSC pattern) with detailed analysis', 'Previous year paper deep-analysis (last 10 years)', 'Rapid full-syllabus revision with high-yield modules', 'Final mock interview panel by serving PCS officers'] },
    ],
    faqs: [
      { q: 'Is this batch taught in Hindi or English?', a: 'Bilingual. Teaching is primarily in Hindi with English support. Notes are available in both languages.' },
      { q: 'Does this batch help with UPSC CSE as well?', a: 'The GS content largely overlaps with UPSC CSE Prelims, helping dual aspirants prepare efficiently.' },
      { q: 'What posts can I get through UPPSC PCS?', a: 'SDM, DSP, BDO, ACMO, Finance Officer, District Commandant, Treasury Officer, and 50+ other Group A and B posts.' },
      { q: 'What is the age eligibility?', a: 'Age 21–40 for unreserved category; relaxation for SC/ST/OBC/EWS as per UP Government norms.' },
    ],
    accentColor: 'gold',
    isFeatured: true,
  },
  // ── 3. 3-Year UDAAN Integrated ────────────────────────────────────────────
  {
    slug: 'udaan-3-year-integrated',
    title: '3-Year Integrated UDAAN Programme',
    subtitle: 'UPSC CSE + UPPSC PCS Integrated',
    category: 'IAS+PCS',
    phase: 'Foundation',
    duration: '36 months',
    fee: 253700,
    emi: '₹2,99,999 in installments',
    seats: 30,
    batchStart: 'July 2026',
    badge: 'Flagship',
    tagline: 'One programme, multiple services - build your civil services career from the ground up',
    description:
      'The Dhyeya IAS 3-Year Integrated UDAAN Programme is the institute\'s flagship offering - a fully synchronized, end-to-end preparation ecosystem designed for aspirants who want to pursue both UPSC CSE and UPPSC PCS without any compromise. Unlike standalone batches, the UDAAN programme is intelligently scheduled to run alongside a college academic year, ensuring no conflict between degree obligations and exam preparation. With a merit-based scholarship of up to ₹2 Lakh, UDAAN makes world-class civil services coaching accessible to deserving candidates from all economic backgrounds.',
    highlights: [
      { label: 'Duration', value: '3 Years' },
      { label: 'Batch Size', value: '30 Students' },
      { label: 'Scholarship', value: 'Up to ₹2 Lakh' },
      { label: 'Coverage', value: 'IAS + PCS + More' },
    ],
    modules: [
      {
        name: 'Year 1 - Foundation',
        topics: ['Complete GS Foundation (History, Geo, Polity, Economy)', 'Environment & Science', 'CSAT Paper II foundation', 'Current Affairs Integration', 'Multi-exam orientation: IAS, PCS, RO/ARO, SSC CGL, CAPF'],
      },
      {
        name: 'Year 2 - Advanced Core',
        topics: ['Advanced GS Papers I–IV (UPSC + UPPSC pattern)', 'Daily Answer Writing (DAW) - 5 evaluated answers per day', 'UP-special content integration (Papers 5 & 6)', 'Comprehensive mock test series'],
      },
      {
        name: 'Year 3 - Specialization & Edge',
        topics: ['UP Special GS Papers 5 & 6 mastery', 'Compulsory General Hindi & Essay preparation', 'Full mock series - UPSC CSE + UPPSC PCS', 'CAPF / SSC CGL / UPPSC RO-ARO targeted preparation', 'Interview preparation and personality development'],
      },
    ],
    features: [
      { title: 'Synchronized College Timeline', description: 'Batch schedule is intelligently designed around the college academic calendar - no conflict between degree and exam preparation', iconName: 'Clock' },
      { title: 'Phased Skill Development', description: 'Year 1 builds conceptual foundation; Year 2 develops analytical and writing skills; Year 3 delivers exam-specific edge across multiple civil services', iconName: 'TrendingUp' },
      { title: 'Comprehensive Study Kit', description: 'All-inclusive premium study kit: Dhyeya IAS booklets, lecture handouts, current affairs modules, and practice question banks for both UPSC CSE and UPPSC PCS', iconName: 'BookOpen' },
      { title: 'Dual-Tier Mentorship', description: 'Academic mentors for subject-level doubt clearance + Strategic mentors (officers/veterans) for time management, mental conditioning, and multi-exam planning', iconName: 'Users' },
    ],
    whoFor: [
      'Undergraduates (final year or recent graduates) who want to begin civil services preparation early and use college years productively',
      'Aspirants targeting both UPSC CSE (IAS/IPS/IFS) and UPPSC PCS (SDM, DSP, BDO) simultaneously without splitting preparation',
      'Economically deserving students who qualify for the UDAAN merit scholarship (up to ₹2 Lakh fee waiver)',
      'Those who want maximum personalized attention in a small, focused batch of 30 students',
    ],
    roadmap: [
      { period: 'Year 1', title: 'Foundation & Multi-Exam Orientation', items: ['Complete NCERT-to-advanced base: History, Geography, Polity, Economy, Science', 'CSAT aptitude foundation and daily practice drills', 'Multi-exam orientation - IAS, PCS, RO/ARO, SSC CGL, CAPF strategy sessions', 'Current affairs reading habit and newspaper analysis discipline established'] },
      { period: 'Year 2', title: 'Advanced Core & Analytical Application', items: ['Advanced GS Papers I–IV covered in depth (UPSC + UPPSC pattern)', 'Daily Answer Writing (DAW) begins - 5 evaluated answers per day', 'UP-Special content integration - GS Papers 5 & 6 deep coverage', 'Mid-programme comprehensive mock series with all-India ranking'] },
      { period: 'Year 3', title: 'Specialization, Mock Series & Interview Edge', items: ['UP Special GS Papers 5 & 6 mastery and compulsory General Hindi & Essay', 'Full comprehensive mock test series for UPSC CSE + UPPSC PCS', 'CAPF / SSC CGL / UPPSC RO-ARO targeted preparation modules', 'Personality development, mock panel interviews, and final strategy sessions'] },
    ],
    faqs: [
      { q: 'What is UDAAN and who qualifies?', a: 'UDAAN is Dhyeya\'s merit scholarship scheme. Students who score above 70% in the admission test receive fee waivers up to ₹2 Lakh.' },
      { q: 'Is the batch residential?', a: 'Non-residential, but hostel facility is available nearby. The institute assists in finding accommodation.' },
      { q: 'Can I join this after Year 1 of another batch?', a: 'The 3-year integrated programme is available only as a fresh enrolment. However, standalone 15-month and 1-year batches are available separately.' },
      { q: 'Does this guarantee a selection?', a: 'No coaching institute can guarantee selection. However, UDAAN students have consistently shown 70%+ interview conversion rate.' },
    ],
    accentColor: 'orange',
    isFeatured: true,
  },
  // ── 4. UPSC CSE Mentorship ────────────────────────────────────────────────
  {
    slug: 'upsc-ias-mentorship',
    title: '6-Month UPSC CSE Mentorship',
    subtitle: 'Personalised UPSC Guidance Programme',
    category: 'IAS',
    phase: 'All Phases',
    duration: '6 months',
    fee: 45000,
    emi: '₹51,000 in installments',
    seats: 20,
    batchStart: 'Rolling',
    tagline: 'Personalised guidance from officers who cleared UPSC - built around your specific gaps',
    description:
      'UPSC CSE is not a test of knowledge alone - it is a test of strategy, articulation, and mental conditioning. The Dhyeya IAS 6-Month UPSC CSE Mentorship Programme is designed for serious aspirants who have a base preparation but need expert direction to convert it into a selection. Through intensive 1-on-1 sessions, micro-targeted study schedules, granular answer evaluation, and psychological conditioning, this programme ensures every hour of your preparation is optimized for the specific gaps that are holding you back.',
    highlights: [
      { label: 'Duration', value: '6 Months' },
      { label: 'Daily Practice', value: '4 Mains Qs' },
      { label: 'Mock Exams', value: '12 Evaluated' },
      { label: 'Evaluation', value: 'Within 48 hrs' },
    ],
    modules: [
      {
        name: 'Personalised Study Plan',
        topics: ['Initial diagnostic assessment and gap analysis', 'Subject-wise micro-targeted study schedule', 'Weekly revision targets with milestone tracking', 'Monthly progression dashboard review'],
      },
      {
        name: 'Answer Writing & Review',
        topics: ['Daily 4 Mains answers written and evaluated', 'Line-by-line faculty feedback on every answer', 'Model answer comparisons with marks breakdown', 'Essay mentoring - 2 essays per week with full evaluation'],
      },
      {
        name: 'Strategy & Mock Exams',
        topics: ['Prelims MCQ speed drills - 100 questions per day', 'Mains paper prioritisation and cross-paper strategy', 'Curated value-addition kits for high-scoring topics', '12 Full-Length Mock Exams evaluated within 48 hours'],
      },
    ],
    features: [
      { title: '1-on-1 Mentoring', description: 'Weekly 60-minute dedicated one-on-one sessions with a senior mentor (UPSC veteran or faculty with top-rank experience) - not group sessions, not recorded modules', iconName: 'Users' },
      { title: 'Micro-Targeted Schedules', description: 'A customised daily and weekly study plan built specifically around your gap areas - not a generic template, but a schedule engineered for your profile', iconName: 'Target' },
      { title: 'Granular Answer Evaluation', description: 'Every answer evaluated at word level - marks breakdown, language, structure, factual errors, and missing dimensions all flagged with written comments', iconName: 'FileCheck' },
      { title: 'Psychological Conditioning', description: 'Monthly strategy and mindset sessions to manage exam pressure, build consistency, and develop the mental stamina required for a 6-hour Mains day', iconName: 'Brain' },
      { title: 'Curated Value-Addition Kits', description: 'Exclusive topic-wise data kits, quotations, case studies, and current affairs capsules to elevate your answers from average to top-scorer level', iconName: 'BookOpen' },
    ],
    whoFor: [
      'Serious UPSC aspirants on their 2nd or 3rd attempt who need strategic re-direction and expert feedback - not more content, but better strategy',
      'Self-studiers with strong basics (3+ months of solid preparation) who need granular evaluation to identify and fix specific answer-writing gaps',
      'Mains-cleared aspirants preparing for the UPSC Personality Test (Interview) who need structured personality development and mock practice',
      'Working professionals who need a highly flexible, personalised mentoring structure that works around their schedule',
    ],
    roadmap: [
      { period: 'Phase 1 - Months 1–2', title: 'High-Yield Consolidation', items: ['Full diagnostic test and detailed subject-wise gap analysis', 'Micro-targeted 6-month study plan activated from Week 1', 'High-yield topic identification for Prelims MCQ edge', 'First 1-on-1 mentor session - strengths, weaknesses, strategy roadmap'] },
      { period: 'Phase 2 - Month 3', title: 'Applied Analytical Edge', items: ['Deep GS content application for Mains answer writing', 'Daily 4 Mains questions evaluated with line-by-line feedback', 'Curated value-addition kits deployed for high-scoring topics', 'Monthly progression dashboard review with mentor'] },
      { period: 'Phase 3 - Month 4', title: 'Essay & Articulation Labs', items: ['2 essays per week - full evaluation with marks and written comments', 'Ethics & GS Paper IV articulation and case study workshops', 'Cross-paper integration and presentation structure improvement', 'Psychological conditioning sessions begin'] },
      { period: 'Phase 4 - Month 5', title: 'Prelims Elimination Drill', items: ['Intensive MCQ speed drills - 100 questions per day', 'High-yield topic rapid revision with curated elimination strategy', 'Full-length Prelims mock series with all-India ranking', 'CSAT qualifying strategy - score 33% guaranteed path'] },
      { period: 'Phase 5 - Month 6', title: 'Grand Mains Simulation', items: ['12 Full-Length Mock Exams evaluated within 48 hours', 'Faculty-returned copies with detailed marks and written feedback', 'Final progression dashboard review with mentor', 'Interview guidance, personality test prep, and final selection strategy'] },
    ],
    faqs: [
      { q: 'Is this for freshers?', a: 'No. This programme is designed for aspirants who already have at least 3–4 months of self-study and need expert direction, not from scratch teaching.' },
      { q: 'Can I do this alongside another batch?', a: 'Yes. Many students take mentorship alongside the Foundation batch or while self-studying for an upcoming attempt.' },
      { q: 'How are sessions conducted?', a: 'Sessions are primarily offline at our Greater Noida centre. Online sessions are available on request.' },
      { q: 'Who are the mentors?', a: 'Mentors are senior Dhyeya faculty who have either cleared UPSC CSE themselves or have 10+ years of UPSC coaching experience.' },
    ],
    accentColor: 'blue',
  },
  // ── 5. UPPSC PCS Mentorship ───────────────────────────────────────────────
  {
    slug: 'uppsc-pcs-mentorship',
    title: '6-Month UPPSC PCS Mentorship',
    subtitle: 'Personalised PCS Guidance Programme',
    category: 'PCS',
    phase: 'All Phases',
    duration: '6 months',
    fee: 40000,
    emi: '₹45,000 in installments',
    seats: 20,
    batchStart: 'Rolling',
    tagline: 'Personalised PCS guidance by serving officers - built around UP, built around you',
    description:
      'Clearing the UPPSC PCS examination demands mastery of UP-specific content, impeccable Hindi language skills, and a highly structured answer writing approach. The Dhyeya IAS 6-Month UPPSC PCS Mentorship Programme is a completely personalised guidance system - with daily study schedules, aggressive answer writing practice, Hindi paper coaching, and a Performance Dashboard that tracks your progress across all SA papers and General Hindi. Guided by PCS officers who have sat in the very same exam hall, this programme gives you the insider edge.',
    highlights: [
      { label: 'Duration', value: '6 Months' },
      { label: 'Prelims Mocks', value: '15 FLTs' },
      { label: 'Mains Tests', value: '8 Evaluated' },
      { label: 'Evaluation', value: 'Within 48 hrs' },
    ],
    modules: [
      {
        name: 'Personalised Study Plan',
        topics: ['Initial assessment & detailed gap identification', 'Customised UPPSC-focused daily schedule', 'Hindi and GS balance planning', 'Monthly milestone review with mentor'],
      },
      {
        name: 'Aggressive Answer Writing',
        topics: ['5 evaluated SA answers daily (Mon–Fri)', 'Line-by-line faculty feedback with marks breakdown', 'General Hindi composition weekly with evaluation', 'Essay writing practice with model answer analysis'],
      },
      {
        name: 'Mock Series & Interviews',
        topics: ['15 Full-Length Prelims Mocks (UPPSC pattern)', '8 Mains Tests evaluated within 48 hours', 'UPPSC board simulation mock interview', 'Performance dashboard review and final strategy'],
      },
    ],
    features: [
      { title: 'Personalised Daily Schedules', description: 'A daily study plan engineered from your initial gap analysis - not a generic template but a schedule built around your specific weak areas in SA papers and General Hindi', iconName: 'Target' },
      { title: '1-on-1 Mentoring', description: 'Weekly one-on-one sessions with a PCS officer mentor - someone who has cleared the actual UPPSC board and understands the examiner\'s expectations', iconName: 'Users' },
      { title: 'Aggressive Answer Writing', description: '5 evaluated SA answers every day with overnight turnaround - answers returned next morning with marks, written feedback, and a model answer for comparison', iconName: 'Edit' },
      { title: 'Hindi & UP Special Focus', description: 'Dedicated weekly General Hindi evaluation (Vyakaran, Nibandh, Anuvad) plus UP Special Papers 5 & 6 deep-dive with district-level data and UP map work', iconName: 'Book' },
      { title: 'Performance Dashboards', description: 'Monthly dashboard showing your score trajectory across each SA paper, General Hindi, and mock tests - a visual, data-driven view of your preparation progress', iconName: 'TrendingUp' },
    ],
    whoFor: [
      'UPPSC aspirants on their 2nd or 3rd attempt who need structured expert re-direction and intensive answer writing improvement',
      'Mains-cleared candidates preparing specifically for the PCS board interview who need personality assessment and mock practice',
      'Self-studiers who have GS knowledge but struggle with UPPSC-specific answer structure, Hindi writing, and UP-specific content',
      'Working professionals wanting a flexible yet highly intensive personalised PCS preparation system',
    ],
    roadmap: [
      { period: 'Phase 1 - Months 1–2', title: 'Personalised Syllabus Mapping', items: ['Complete UPPSC syllabus audit and subject-wise gap mapping', 'Personalised daily study schedule creation and activation', 'UP-specific content priority planning: GS Papers 5 & 6, current affairs', 'Mentor pairing, first weekly 1-on-1 session, Performance Dashboard set up'] },
      { period: 'Phase 2 - Month 3', title: 'UP Edge & Current Affairs', items: ['UP Special Papers 5 & 6 deep-dive: UP History, Economy, Geography, Administration', 'Weekly SA answer submissions with line-by-line feedback from Day 1', 'UP current affairs weekly digest, discussion, and integration into answers', 'District-level UP knowledge drills - maps, data, schemes, budget'] },
      { period: 'Phase 3 - Month 4', title: 'Aggressive Mains Acceleration', items: ['Aggressive answer writing - 5 evaluated answers every day (Mon–Fri drill)', 'General Hindi weekly composition with evaluation - Vyakaran, Nibandh, Anuvad', 'Essay writing practice and model answer analysis sessions', 'Monthly Performance Dashboard review with mentor strategy session'] },
      { period: 'Phase 4 - Month 5', title: 'Prelims Elimination Drill', items: ['15 Targeted Prelims Mocks (UPPSC pattern) with all-India ranking', 'High-yield MCQ speed revision and elimination technique drills', 'PYQ pattern analysis for last 10 years - trend-based preparation', 'CSAT Paper II qualifying strategy and targeted practice'] },
      { period: 'Phase 5 - Month 6', title: 'Final Simulation & Board Prep', items: ['8 Full-Length Mains Tests evaluated within 48 hours', 'UPPSC board simulation mock interview with PCS officer panel', 'Personality assessment, interview debrief, and improvement plan', 'Final Performance Dashboard review and selection strategy session'] },
    ],
    faqs: [
      { q: 'Is this batch for first-time aspirants?', a: 'Best suited for aspirants who have at least 3–4 months of UPPSC preparation and want expert feedback and direction.' },
      { q: 'Is the medium Hindi or English?', a: 'Primarily Hindi as the UPPSC exam is primarily Hindi-medium. English support is available.' },
      { q: 'Who conducts the mock interviews?', a: 'A panel of former UPPSC board members and serving PCS officers conduct the mock interviews.' },
      { q: 'Can I enrol alongside another coaching batch?', a: 'Yes. This is designed to complement your current preparation, not replace it.' },
    ],
    accentColor: 'gold',
  },
  // ── 6. CSAT Mastery ───────────────────────────────────────────────────────
  {
    slug: 'csat-mastery',
    title: '4-Month CSAT Mastery Programme',
    subtitle: 'UPSC & UPPSC Paper II Preparation',
    category: 'IAS+PCS',
    phase: 'Prelims',
    duration: '4 months',
    fee: 22000,
    emi: '₹25,000 in installments',
    seats: 80,
    batchStart: 'September 2026',
    tagline: 'Turn CSAT from a qualifying barrier into a scoring advantage',
    description:
      'Thousands of UPSC and UPPSC aspirants work incredibly hard on General Studies only to be eliminated at the Prelims stage by a paper they neglected - CSAT (Paper II). The Dhyeya IAS 4-Month CSAT Mastery Programme is a focused, non-intimidating programme that takes students from zero aptitude background to confident 120+ scorers. With a non-math-background-friendly approach, integrated IAS & PCS preparation, time-optimization techniques, and comprehensive practice kits, this programme ensures CSAT never becomes the reason you don\'t clear Prelims.',
    highlights: [
      { label: 'Duration', value: '4 Months' },
      { label: 'Batch Size', value: '80 Students' },
      { label: 'Mock Tests', value: '10+ FLTs' },
      { label: 'Pass Rate', value: '95%' },
    ],
    modules: [
      {
        name: 'Quantitative Aptitude',
        topics: ['Number System & Simplification (Class 10 level start)', 'Percentage, Ratio & Proportion', 'Profit & Loss, Time-Speed-Distance', 'Data Interpretation - charts, tables, graphs', 'Short-trick methods for every topic type'],
      },
      {
        name: 'Logical Reasoning',
        topics: ['Series & Analogies', 'Syllogism and Venn Diagrams', 'Coding-Decoding', 'Blood Relations, Puzzles & Seating Arrangements', 'Pattern-based elimination techniques'],
      },
      {
        name: 'Reading Comprehension',
        topics: ['UPSC-style complex passage types', 'Inference, tone, and author intent questions', 'Speed reading and vocabulary-in-context techniques', '3 daily RC passages from Day 1', 'Decision Making - ethical and situational aptitude'],
      },
    ],
    features: [
      { title: 'Non-Math Background Friendly', description: 'Curriculum starts from Class 10 level basics - designed for Arts and Humanities graduates who have not touched Maths in years. No background required, confidence guaranteed', iconName: 'GraduationCap' },
      { title: 'Integrated IAS & PCS Approach', description: 'Covers both UPSC CSE Paper II and UPPSC Prelims Paper II simultaneously - one course, complete qualifying paper preparation for two major exams', iconName: 'Layers' },
      { title: 'Time-Optimization Techniques', description: 'Speed-accuracy drills, section-wise time allocation strategy, and elimination technique workshops - because CSAT is also a time management test', iconName: 'Clock' },
      { title: 'Comprehensive Practice Kits', description: '50-question daily practice sets, 12 full-length CSAT mock tests, topic-wise question banks, and previous year paper analysis - the most comprehensive practice material available', iconName: 'ClipboardList' },
    ],
    whoFor: [
      'UPSC and UPPSC aspirants from Arts, Humanities, or social science backgrounds who have not studied Maths since Class 10 - this course starts from your level',
      'Aspirants who have cleared Prelims GS Paper I comfortably but struggle with CSAT Paper II and want to eliminate that risk permanently',
      'Students who missed Prelims by a thin margin and suspect CSAT was the reason - get targeted practice with a proven strategy',
      'Anyone who wants to add CSAT alongside their GS preparation without doubling study hours',
    ],
    roadmap: [
      { period: 'Phase 1 - Month 1', title: 'Number Engine & Basic Aptitude', items: ['Number system, simplification, percentage - from Class 10 foundation', 'Ratio, proportion, profit & loss with short-trick methods', 'Daily 50-question practice sets (UPSC CSAT pattern)', 'Week-4 sectional test with detailed performance analysis'] },
      { period: 'Phase 2 - Month 2', title: 'Advanced Quant & Logic Mastery', items: ['Time-Speed-Distance, DI - charts, tables, graphs', 'Complex puzzles, seating arrangements, blood relations', 'Syllogism, coding-decoding - pattern-based approach', 'Full Quant + Reasoning combined mock test with analysis'] },
      { period: 'Phase 3 - Month 3', title: 'Comprehension & Decision Making', items: ['RC intensive - 3 UPSC-style passages every day', 'Speed reading, inference, and author-tone techniques', 'Decision Making strategy - ethical and situational aptitude practice sets', 'Combined section mocks with speed and accuracy measurement'] },
      { period: 'Phase 4 - Month 4', title: 'Simulation & Time-Optimization', items: ['10+ Full-Length CSAT Mock Tests (UPSC + UPPSC pattern)', 'Time-optimization workshops - section-wise allocation strategy', 'Weak area targeted revision from performance data', 'Final exam-day strategy, attempt order, and risk-management session'] },
    ],
    faqs: [
      { q: 'Is CSAT qualifying or merit-based?', a: 'CSAT (GS Paper II) is qualifying only - you need 66/200 (33%) to clear it. But failing CSAT disqualifies your GS Paper I score.' },
      { q: 'Is prior Maths knowledge needed?', a: 'No. We start from Class 10 basics. Students from all backgrounds (Arts, Commerce, Science) have succeeded with our approach.' },
      { q: 'Is this batch separate from GS coaching?', a: 'Yes. This is a standalone CSAT course. You can take it alongside any GS batch or self-study.' },
      { q: 'Will the same material work for UPPSC CSAT?', a: 'Yes. The pattern and syllabus are identical, making this course perfectly applicable for UPPSC Prelims Paper II as well.' },
    ],
    accentColor: 'orange',
    isNew: true,
  },
  // ── 7. UPPCS Prelims Crash Course ─────────────────────────────────────────
  {
    slug: 'uppsc-prelims-crash-course',
    title: '4-Month UPPCS Prelims Crash Course',
    subtitle: 'UPPSC Preliminary Examination',
    category: 'PCS',
    phase: 'Prelims',
    duration: '4 months',
    fee: 25000,
    emi: '₹30,000 in installments',
    seats: 80,
    batchStart: 'October 2026',
    badge: 'Exam-Ready',
    tagline: 'Last-mile UPPSC Prelims preparation - reverse-engineered from the exam itself',
    description:
      'The UPPSC Preliminary Examination tests a very specific set of skills: speed, accuracy, and deep familiarity with UP-specific content. The Dhyeya IAS 4-Month UPPCS Prelims Crash Course is not a general GS batch - it is an exam-reverse-engineered programme that identifies exactly what the UPPSC question paper demands and delivers it with speed. With Ratta-Mar memory modules for static facts, integrated UP Current Affairs, a CSAT safety net, and proven elimination techniques, this course ensures you walk into the exam hall with maximum confidence and minimum knowledge gaps.',
    highlights: [
      { label: 'Duration', value: '4 Months' },
      { label: 'Mock Tests', value: '15 Simulators' },
      { label: 'Daily MCQs', value: '100/day' },
      { label: 'PYQ Analysis', value: '10 Years' },
    ],
    modules: [
      {
        name: 'UP History, Culture & Polity',
        topics: ['UP Historical Periods - Ancient, Medieval, Modern', 'UP Art, Architecture & Cultural Heritage', 'Freedom Movement in UP', 'UP Constitutional & Administrative Framework'],
      },
      {
        name: 'UP Geography, Economy & Schemes',
        topics: ['UP Physical Geography - rivers, climate, soil, forests', 'Districts, Divisions & Industrial Corridors', 'UP Economy, Agriculture, MSMEs & Budget', 'UP State Schemes, Reports & Government Initiatives'],
      },
      {
        name: 'National GS & Current Affairs',
        topics: ['Indian Polity & Constitution', 'Indian Economy - Budget, Economic Survey', 'Environment & Ecology, Science & Technology', '6-month UP + National Current Affairs Crash Module', 'International events, Government reports, schemes'],
      },
    ],
    features: [
      { title: 'Reverse-Engineered Pedagogy', description: 'Teaching is built backwards from the UPPSC question paper - last 10 years PYQs are dissected to identify high-frequency topics, and the course covers those topics first with maximum depth', iconName: 'ListChecks' },
      { title: 'Ratta-Mar Modules', description: 'Specially designed memory retention modules for static facts that dominate UPPSC Prelims - districts, rivers, wildlife sanctuaries, schemes, rankings, and data-heavy topics', iconName: 'Zap' },
      { title: 'UP Current Affairs Integration', description: '6-month UP + National current affairs covered in a rapid-fire format - government schemes, sports, appointments, international events - with daily newspaper analysis sessions', iconName: 'Newspaper' },
      { title: 'CSAT Safety Net', description: 'Dedicated CSAT Paper II module in Month 4 with targeted practice and qualifying strategy - ensuring you never get eliminated by the Paper II cutoff', iconName: 'Shield' },
      { title: 'Elimination Techniques', description: 'Proven MCQ elimination techniques for Assertion-Reasoning, statement-based, and match-the-following questions - significantly improving accuracy without additional knowledge', iconName: 'Target' },
    ],
    whoFor: [
      'UPPSC Prelims aspirants who have completed GS foundation preparation and need an intensive, structured last-mile revision and mock series',
      'Students who are 3–4 months away from the UPPSC Prelims exam and want the highest possible MCQ score in minimum time',
      'Previous UPPSC non-qualifiers who know the content but need better strategy, speed, and elimination technique',
      'Aspirants who want maximum mock tests (15 full-length simulators) and daily MCQ practice to build exam-day confidence',
    ],
    roadmap: [
      { period: 'Phase 1 - Month 1', title: 'Core Scoring Engine', items: ['UPPSC PYQ reverse-engineering from last 10 years - high-frequency topic mapping', 'UP History, Culture & Polity sprint sessions with Ratta-Mar modules', 'Daily 100 MCQ practice begins from Day 1 (UPPSC exam pattern)', 'Week-4 sectional test with detailed performance analysis'] },
      { period: 'Phase 2 - Month 2', title: 'UP Special & Dynamic GS', items: ['UP Geography, Economy, Schemes & Budget deep-dive', 'Ratta-Mar memory modules for data-heavy static topics', 'National GS sprint: Polity, Economy, Science & Tech', 'Sectional mock tests with all-India UPPSC ranking'] },
      { period: 'Phase 3 - Month 3', title: 'Current Affairs Vault', items: ['6-month UP + National Current Affairs rapid crash course', 'Government reports, international events, sports & appointments', '5 Full-Length Prelims Simulators (UPPSC pattern)', 'Elimination technique workshops - Assertion-Reasoning, statement sets'] },
      { period: 'Phase 4 - Month 4', title: 'CSAT Safety Net & Final Simulation', items: ['CSAT Paper II qualifying strategy with targeted practice sessions', '10 Full-Length Prelims Simulators with cutoff prediction analysis', 'Time management - optimal attempt strategy and risk assessment', 'Final exam-day strategy, sequence planning, and last-day revision'] },
    ],
    faqs: [
      { q: 'What is the medium of instruction?', a: 'Bilingual - primarily Hindi with English support to match the UPPSC exam pattern.' },
      { q: 'How many mock tests are included?', a: '15 full-length UPPCS Prelims pattern simulators, each with detailed performance analysis and all-India ranking.' },
      { q: 'Is this a standalone course?', a: 'Yes, but it can also be taken alongside the 1-Year PCS Comprehensive as an add-on for intensive Prelims practice.' },
      { q: 'What happens if Prelims is postponed?', a: 'Our content remains valid through the next exam cycle. Recorded access continues for 6 months beyond the course end date.' },
    ],
    accentColor: 'gold',
  },
  // ── 8. UP Special Paper 5 & 6 ────────────────────────────────────────────
  {
    slug: 'up-special-paper-5-6',
    title: '4-Month UP Special Paper 5 & 6',
    subtitle: 'UPPSC Mains - GS Papers 5 & 6 Exclusive',
    category: 'PCS',
    phase: 'Mains',
    duration: '4 months',
    fee: 25000,
    emi: '₹30,000 in installments',
    seats: 60,
    batchStart: 'Rolling',
    tagline: 'Master the UP-exclusive papers that define your UPPSC merit rank',
    description:
      'UPPSC Mains GS Papers 5 and 6 are unique to Uttar Pradesh - covering UP History, Polity, Society, Economy, Geography, and Environment. Together they carry 400 marks and are the most differentiating papers in the UPPSC merit list. Yet most aspirants prepare them casually. The Dhyeya IAS 4-Month UP Special Paper 5 & 6 Programme brings together meticulous syllabus mapping, UP Map mastery, data-rich value addition, intensive answer drills, and exclusive booklets to ensure you score at the top of these papers - the papers that separate rank-holders from also-rans.',
    highlights: [
      { label: 'Duration', value: '4 Months' },
      { label: 'Marks Weight', value: '400 Marks' },
      { label: 'Mock Exams', value: '6 Full-Length' },
      { label: 'Daily Writing', value: 'Evaluated' },
    ],
    modules: [
      {
        name: 'GS Paper 5 - UP History, Society & Polity',
        topics: ['UP Ancient, Medieval & Modern History', 'UP Art, Architecture, Culture & Literature', 'Social structure, caste dynamics, minority issues, women & child welfare', 'UP Constitutional & Administrative Framework', 'Law and order, internal security, border management in UP'],
      },
      {
        name: 'GS Paper 6 - UP Economy, Geography & Environment',
        topics: ['UP Economy - agriculture, MSMEs, investment corridors, industrial development', 'Infrastructure - roads, power, UPEIDA, smart cities, urban development', 'UP Physical Geography - rivers, climate zones, soil types, forest cover', 'UP Environment, ecology & biodiversity conservation', 'UP Budget, fiscal data, schemes - data-rich answer writing'],
      },
    ],
    features: [
      { title: 'Syllabus Mapping', description: 'Complete UPPSC Papers 5 & 6 syllabus mapped against previous year question papers - ensuring every class covers only what the examiner actually tests', iconName: 'ListChecks' },
      { title: 'UP Map Mastery', description: 'Dedicated UP Map sessions covering all 75 districts, 18 divisions, major rivers, wildlife sanctuaries, industrial corridors, expressways, and key geographical features', iconName: 'Globe' },
      { title: 'Data-Rich Value Addition', description: 'Every answer enriched with the latest UP economic data, budget figures, scheme statistics, and government reports - the kind of data that earns top marks from UPPSC examiners', iconName: 'TrendingUp' },
      { title: 'Answer Drills', description: 'Daily evaluated answer writing for Papers 5 & 6 - UP-specific questions with faculty feedback, marks breakdown, and model answer for comparison after every session', iconName: 'Edit' },
      { title: 'Exclusive Booklets', description: 'Dhyeya IAS exclusive UP Special booklets with comprehensive coverage of Papers 5 & 6 - updated with current budget, schemes, and data for the upcoming examination cycle', iconName: 'BookOpen' },
    ],
    whoFor: [
      'UPPSC Mains aspirants who want to maximize their score in the UP-exclusive GS Papers 5 & 6 (400 marks) which define merit rank',
      'Aspirants who have prepared general GS well but feel their UP-specific content is shallow and needs dedicated focused coverage',
      'Students who cleared SA Papers I–IV but lost marks in Papers 5 & 6 due to weak UP-specific data and answer structure',
      'Anyone who wants to add a focused Paper 5 & 6 programme alongside their ongoing UPPSC Mains preparation',
    ],
    roadmap: [
      { period: 'Phase 1 - Month 1', title: 'UP History, Polity & Society - GS Paper 5 Part A', items: ['UP ancient, medieval, and modern history - detailed coverage', 'UP art, architecture, cultural heritage, and literature', 'UP constitutional and administrative framework and governance', 'Daily evaluated answer writing begins from Day 1'] },
      { period: 'Phase 2 - Month 2', title: 'Social Dynamics & Internal Security - GS Paper 5 Part B', items: ['Social structure, caste dynamics, minority issues, women & child welfare in UP', 'Law and order, extremism, border management, and internal security in UP', 'Human rights, social justice, and state welfare schemes', 'Mock test: Paper 5 (Parts A & B combined format with evaluation)'] },
      { period: 'Phase 3 - Month 3', title: 'UP Economy & Infrastructure - GS Paper 6 Part A', items: ['UP economy - agriculture, MSMEs, investment corridors, industrial development', 'Infrastructure deep-dive: roads, power, UPEIDA, urban development, smart cities', 'UP Budget, schemes, fiscal data - data-rich answers with latest figures', '"UP Map" mastery sessions - districts, rivers, industries, expressways'] },
      { period: 'Phase 4 - Month 4', title: 'Geography, Environment & Full Simulation', items: ['UP physical geography - rivers, climate, soil, forests, biodiversity', 'Environment, ecology & conservation challenges specific to UP', '6 Full-Length Mock Exams (Paper 5 + 6 combined format with evaluation)', 'Data-rich value addition techniques and final answer quality workshop'] },
    ],
    faqs: [
      { q: 'Is this taught in Hindi or English?', a: 'Bilingual - primarily Hindi to match UPPSC exam medium, with English support for English-medium aspirants.' },
      { q: 'How are answers evaluated?', a: 'Every answer submission is evaluated by the faculty with marks, detailed comments, data additions, and a model answer for comparison.' },
      { q: 'Can I join this if my UP knowledge is weak?', a: 'Yes. The course starts from the basics of each UP topic and builds systematically. The exclusive booklets cover everything you need.' },
      { q: 'Is this only for UPPSC or also useful for UPSC?', a: 'This course is specifically designed for UPPSC Mains Papers 5 & 6. Some UP content overlaps with UPSC GS but the primary focus is UPPSC.' },
    ],
    accentColor: 'gold',
  },
  // ── 9. 30-Day General Hindi Intensive ────────────────────────────────────
  {
    slug: 'uppsc-general-hindi',
    title: '30-Day General Hindi Intensive',
    subtitle: 'UPPSC Mains - Compulsory Paper V',
    category: 'PCS',
    phase: 'Mains',
    duration: '30 days',
    fee: 10000,
    emi: '₹12,000 in installments',
    seats: 100,
    batchStart: 'Rolling',
    badge: 'New',
    tagline: 'सामान्य हिन्दी में निपुणता - 30 दिनों में संपूर्ण तैयारी',
    description:
      'सामान्य हिन्दी (General Hindi) UPPSC मुख्य परीक्षा का अनिवार्य प्रश्नपत्र है - और यही वह पेपर है जहाँ सबसे अधिक अंक गँवाए जाते हैं। Dhyeya IAS का 30-Day General Hindi Intensive Course इस समस्या का सीधा समाधान है। 30 दिनों में व्याकरण, अनुवाद, सारलेखन, पत्र-लेखन और निबंध - सभी प्रमुख घटकों को UPPSC पेपर-V के प्रारूप के अनुसार कवर किया जाता है। प्रतिदिन 3 घंटे की गहन कक्षाएँ, रोज़ाना मूल्यांकित अभ्यास, और 4 पूर्ण प्रश्नपत्र - यह कोर्स उन अभ्यर्थियों के लिए सर्वोत्तम है जो मुख्य परीक्षा से पहले हिन्दी पेपर में ठोस सुधार चाहते हैं।',
    highlights: [
      { label: 'Duration', value: '30 Days' },
      { label: 'Daily Classes', value: '3 Hours' },
      { label: 'Mock Tests', value: '4 Full-Length' },
      { label: 'Evaluation', value: 'Daily + Strict' },
    ],
    modules: [
      {
        name: 'व्याकरण स्प्रिंट (Grammar Sprint)',
        topics: ['संधि एवं समास (Sandhi & Samas)', 'कारक एवं वाच्य (Karak & Vachya)', 'मुहावरे एवं लोकोक्तियाँ (Muhavare & Lokoktiyan)', 'वाक्य शुद्धि - त्रुटि सुधार (Vakya Shuddhi)', 'अलंकार एवं रस (Alankar & Ras)'],
      },
      {
        name: 'लेखन कौशल (Writing Skills)',
        topics: ['अनुवाद - English to Hindi (Anuvad)', 'सारलेखन (Saar-lekhan - Summary Writing)', 'पत्र-लेखन - औपचारिक एवं अनौपचारिक (Patra-lekhan)', 'निबंध-लेखन (Nibandh - Short Essay)', 'UPPSC पेपर V प्रारूप अभ्यास'],
      },
    ],
    features: [
      { title: 'प्रतिदिन 3 घंटे की गहन कक्षाएँ', description: 'हर दिन 3 घंटे की कक्षाएँ - पाठ्यक्रम के उच्च-महत्व वाले विषयों पर केंद्रित, UPPSC प्रारूप के अनुसार संचालित', iconName: 'Clock' },
      { title: 'व्याकरण स्प्रिंट (प्रथम 15 दिन)', description: 'पहले 15 दिनों में संपूर्ण हिन्दी व्याकरण - संधि, समास, कारक, वाच्य, अलंकार, रस - परीक्षा-केंद्रित अभ्यास के साथ', iconName: 'Zap' },
      { title: 'रोज़ाना मूल्यांकित लेखन अभ्यास', description: 'प्रतिदिन अनुवाद, सारलेखन एवं रचना अभ्यास - प्रत्येक को शिक्षक द्वारा अंकों और टिप्पणियों के साथ मूल्यांकित किया जाता है', iconName: 'PenLine' },
      { title: 'आदर्श उत्तर एवं पूर्व वर्ष विश्लेषण', description: 'पिछले वर्षों के UPPSC Paper V के प्रश्न, उत्तर, अंक एवं परीक्षक टिप्पणियाँ - प्रत्येक दिन साझा की जाती हैं', iconName: 'FileCheck' },
    ],
    whoFor: [
      'UPPSC मुख्य परीक्षा के अभ्यर्थी जो परीक्षा से 30–45 दिन पहले हिन्दी पेपर की लक्षित और गहन तैयारी करना चाहते हैं',
      'अंग्रेज़ी माध्यम के छात्र जिन्हें UPPSC के लिए हिन्दी लेखन कौशल में शीघ्र सुधार की आवश्यकता है',
      'वे अभ्यर्थी जो इसे किसी अन्य कोचिंग के साथ पूरक के रूप में जोड़ना चाहते हैं',
      'Prelims उत्तीर्ण कर चुके छात्र जिनके पास Mains से पहले 30–45 दिन का समय है',
    ],
    roadmap: [
      { period: 'Days 1–7', title: 'व्याकरण एवं शब्द ज्ञान', items: ['संधि, समास, कारक, वाच्य - संपूर्ण कवरेज', 'मुहावरे एवं लोकोक्तियाँ (Idioms & Proverbs)', 'वाक्य शुद्धि - त्रुटि सुधार अभ्यास (Error Correction Drills)', 'प्रतिदिन शब्द भण्डार अभ्यास - क्यूरेटेड शब्द सूची के साथ'] },
      { period: 'Days 8–14', title: 'पठन बोध एवं सारलेखन', items: ['सारलेखन (Summary Writing) - प्रतिदिन अभ्यास', 'हिन्दी पठन बोध परिच्छेद (Reading Comprehension Passages)', 'संदर्भ में शब्द अर्थ - क्यूरेटेड शब्द संग्रह', 'प्रत्येक अभ्यास उसी दिन मूल्यांकित एवं वापस किया जाता है'] },
      { period: 'Days 15–22', title: 'पत्र-लेखन एवं अनुवाद', items: ['पत्र-लेखन - औपचारिक एवं अनौपचारिक प्रारूप', 'अनुवाद (English → Hindi) - प्रतिदिन अभ्यास', 'सामान्य पत्र प्रारूपों के लिए तैयार-उपयोग टेम्प्लेट', 'UPPSC Paper V प्रारूप के अनुसार पूर्ण अभ्यास सेट'] },
      { period: 'Days 23–30', title: 'मुहावरे, निबंध एवं पूर्ण प्रश्नपत्र', items: ['मुहावरे एवं लोकोक्तियाँ - रिवीजन स्प्रिंट', 'लघु निबंध-लेखन (Short Nibandh) - प्रतिदिन अभ्यास', '4 पूर्ण 3-घंटे के मॉक टेस्ट (UPPSC Paper V प्रारूप)', 'कड़ा मूल्यांकन - विस्तृत अंक एवं फीडबैक के साथ'] },
    ],
    faqs: [
      { q: 'क्या 30 दिन हिन्दी पेपर के लिए पर्याप्त हैं?', a: 'जिन अभ्यर्थियों की बुनियाद ठीक है और जिन्हें लक्षित पुनरीक्षण की आवश्यकता है, उनके लिए 30 दिन में उल्लेखनीय सुधार संभव है।' },
      { q: 'Is this only for UPPSC or also UPSC?', a: 'This is specifically designed for UPPSC Mains Paper V (General Hindi). UPSC CSE does not have a mandatory Hindi paper.' },
      { q: 'Can I attend this alongside another batch?', a: 'Yes. This 30-day course is designed as a supplement. You can attend it alongside any ongoing batch.' },
      { q: 'Are classes online or offline?', a: 'Classes are held offline at our Greater Noida centre. Online option available for outstation students on request.' },
    ],
    accentColor: 'gold',
    isNew: true,
  },
  // ── 10. 120-Day Mains Answer Writing ─────────────────────────────────────
  {
    slug: 'uppsc-mains-answer-writing',
    title: '120-Day Mains Answer Writing',
    subtitle: 'UPPSC Mains Evaluated Writing Programme',
    category: 'PCS',
    phase: 'Mains',
    duration: '120 days',
    fee: 15000,
    emi: '₹16,000 in installments',
    seats: 60,
    batchStart: 'Rolling',
    tagline: 'Write to the rank - 120 days of daily evaluated UPPSC Mains practice',
    description:
      'In the UPPSC Mains examination, it is not what you know - it is how you write it. The Dhyeya IAS 120-Day Mains Answer Writing Programme is designed as the single highest-impact intervention for UPPSC Mains aspirants. Over 4 months, you write 5 evaluated answers every day, receive overnight feedback, and progressively master the UPPCS format alignment, UP Map & Data integration, Micro-Evaluation framework, and General Hindi focus that examiners reward. With model answers from top scorers and weekly class-wide review sessions, this programme transforms knowledge into marks.',
    highlights: [
      { label: 'Duration', value: '120 Days' },
      { label: 'Answers/Day', value: '5 Evaluated' },
      { label: 'Weekly Cycle', value: 'M–F + Sat Audit' },
      { label: 'Final Mock', value: '1 Full Mains' },
    ],
    modules: [
      {
        name: 'SA Papers I & II - History, Geography & Polity',
        topics: ['History, Geography, Society answer writing', 'Polity & Governance answer framework', 'UP-specific content integration in every answer', 'Introduction, conclusion, and presentation techniques'],
      },
      {
        name: 'SA Papers III & IV - Economy, Ethics & Environment',
        topics: ['Economy, Technology & Environment answers', 'Ethics, Integrity & Case Studies answers', 'Data and current affairs integration', 'UPPSC format and word-limit discipline'],
      },
      {
        name: 'UP Special Papers 5 & 6 + Essay',
        topics: ['UP-specific answer writing: History, Economy, Geography, Society', 'UP Map & Data integration in every UP-specific answer', 'Essay & Paper VI answer writing (300-word format)', 'Model essay analysis and vocabulary enrichment'],
      },
    ],
    features: [
      { title: 'UPPCS Format Alignment', description: 'Every answer is trained to UPPSC examiner expectations - structure, word limit, presentation, and UP-specific content integration from Day 1, not as an afterthought', iconName: 'Target' },
      { title: 'UP Map & Data Integration', description: 'Every UP-specific answer includes district-level data, scheme statistics, budget figures, and geographical references - the data-rich approach that separates top scorers from the rest', iconName: 'Globe' },
      { title: 'Micro-Evaluation Framework', description: 'Faculty evaluates at the micro level - word choice, factual accuracy, missing dimensions, structure issues, and language precision - not just a broad score but word-level written feedback', iconName: 'FileCheck' },
      { title: 'Model Answers', description: 'Top-scoring model answers shared after every session - same question, higher-scoring version - so you understand exactly what the examiner wanted and where marks were gained', iconName: 'Star' },
      { title: 'General Hindi Focus', description: 'Hindi language quality tracked throughout - weekly Hindi composition integrated into the programme alongside SA papers, with special attention to vocabulary, sentence structure, and fluency', iconName: 'Book' },
    ],
    whoFor: [
      'UPPSC Mains aspirants who want the most systematic, evaluated answer writing practice available - 5 answers every day for 120 days with overnight faculty feedback',
      'Aspirants who cleared Prelims and are now preparing seriously for Mains - especially those who feel their writing quality does not match their knowledge level',
      'Students who struggle with UPPSC-specific answer structure, word limit discipline, data integration, and UP-specific content application',
      'Anyone who wants to significantly and measurably improve their UPPSC Mains score through daily deliberate practice',
    ],
    roadmap: [
      { period: 'Days 1–30', title: 'Foundation & Core GS (SA Papers I & II)', items: ['History, Geography, Society answer writing - 5 answers daily from Day 1', 'Polity & Governance answer framework - UPPCS format alignment established', 'Daily Mon–Fri writing drill; Saturday audit session with mentor; Sunday consolidation', 'UPPSC format discipline: structure, word limit, introduction, conclusion techniques'] },
      { period: 'Days 31–60', title: 'Dynamics & Ethics (SA Papers III & IV)', items: ['Economy, Technology, Environment answers with current data integration', 'Ethics, Integrity & Case Studies - UPPSC-level scenario practice', 'Mid-programme faculty review and strategy session', 'Micro-Evaluation framework deployed - word-level feedback on every answer'] },
      { period: 'Days 61–90', title: 'UP Special Mastery (GS Papers 5 & 6)', items: ['UP-specific answer writing for Papers 5 & 6 - dedicated section', 'UP Map & Data Integration: districts, schemes, budget data in every relevant answer', 'Cross-paper mixed practice - combining SA papers I–IV with Papers 5 & 6', 'Full mock Paper 5 or 6 attempt with complete evaluation and model answers'] },
      { period: 'Days 91–105', title: 'Essay, Language & Articulation', items: ['Essay & Paper VI answer writing - 300-word format with faculty evaluation', 'Vocabulary and language precision drills - General Hindi quality improvement', 'Micro-Evaluation Framework: best-answer bank creation for revision', 'Weekly Hindi composition integrated to maintain language quality'] },
      { period: 'Days 106–120', title: 'Grand Simulation', items: ['Full Mains Mock Test across all SA papers - evaluated with final performance report', 'Common mistakes workshop - class-wide review of recurring errors', 'Model answer comparison: where marks were gained and lost', 'Final exam-day strategy, time management, and answer attempt sequence'] },
    ],
    faqs: [
      { q: 'Can I join this without completing the full 1-year batch?', a: 'Yes. This is a standalone answer writing programme. You should have reasonable GS knowledge to benefit from it.' },
      { q: 'How are answers evaluated?', a: 'Physical copies are collected daily, evaluated overnight by faculty, and returned next morning with marks and written feedback.' },
      { q: 'Is this online or offline?', a: 'Primarily offline at our Greater Noida centre for physical copy submission. Online option (PDF submission) available.' },
      { q: 'What language should I write answers in?', a: 'Hindi or English - your choice. Faculty evaluates in both languages.' },
    ],
    accentColor: 'gold',
  },
  // ── 11. BPSC CCE Complete Prep ────────────────────────────────────────────
  {
    slug: 'bpsc-cce-prep',
    title: 'BPSC CCE Complete Preparation',
    subtitle: 'Bihar Public Service Commission - Combined Competitive Examination',
    category: 'PCS',
    phase: 'All Phases',
    duration: '12 months',
    fee: 95000,
    emi: '₹8,000/month',
    seats: 60,
    batchStart: 'August 2026',
    badge: 'New',
    tagline: 'End-to-end BPSC CCE preparation - Prelims to Personality Test, Bihar to the top',
    description:
      'The Bihar Public Service Commission Combined Competitive Examination (BPSC CCE) is conducted in three successive stages: a qualifying Prelims (150 MCQs, 150 marks, 2 hours with 0.25 negative marking), descriptive Mains (GS Paper I + GS Paper II + Essay Paper = 900 merit marks), and the Personality Test Interview (120 marks) - totalling 1020 merit marks. The Dhyeya IAS BPSC CCE Complete Preparation programme is purpose-built for Bihar aspirants, covering every stage with Bihar-specific content integration, bilingual teaching, structured answer writing practice, and mock interview preparation. From Ancient Bihar history to Bihar\'s current economic indicators, every class is calibrated to what the BPSC examiner rewards.',
    highlights: [
      { label: 'Total Merit', value: '1020 Marks' },
      { label: 'Mains Papers', value: '3 Merit Papers' },
      { label: 'Prelims Mocks', value: '20+ FLTs' },
      { label: 'Interview Prep', value: 'Included' },
    ],
    modules: [
      {
        name: 'BPSC Prelims - General Studies (150 Marks)',
        topics: [
          'Current Events - National, International & Bihar-specific Developments',
          'History of India & Bihar - Ancient, Medieval & Modern; National Movement & Bihar\'s Contribution',
          'Geography of India & Bihar - Physical, Natural Resources, Social & Economic Geography',
          'Indian Polity & Economy - Constitution, Panchayati Raj, Public Policy, Bihar Economic Policies',
          'General Mental Ability - Reasoning, Logical Thinking & Basic Mathematics',
          'General Science - Everyday Science & Day-to-day Applications',
        ],
      },
      {
        name: 'Mains GS Paper I - Modern History, Culture & Current Events (300 Marks)',
        topics: [
          'Modern History of India from mid-18th century - British rule, expansion, and colonial policies',
          'Various Freedom Movements and Cultural Aspects of India',
          'Bihar\'s Modern History and Contribution to the Freedom Struggle',
          'Contemporary Events of National and International Importance',
          'Statistical Analysis - deriving conclusions from graphs, diagrams, and statistical data',
          'Identifying deficiencies, limitations, and inconsistencies in presented information',
        ],
      },
      {
        name: 'Mains GS Paper II - Polity, Economy, Geography & Science (300 Marks)',
        topics: [
          'Indian Polity - Political System, Governance, Constitution & State Institutions',
          'Bihar\'s Political Dynamics, State Administration & Governance Structures',
          'Indian Economy - Key Policies, Agriculture, Industrial Sectors & Economic Planning',
          'Bihar Economy - Its Structure, Indicators & Relation to the National Economy',
          'Geography of India - Detailed Knowledge of Physical & Economic Features',
          'Role & Impact of Science and Technology in India\'s Socio-Economic Development',
        ],
      },
      {
        name: 'Essay Paper (300 Marks)',
        topics: [
          'General Social, Economic, Political & Cultural Issues',
          'Bihar-specific Essay - State Culture, Issues, History & Development',
          'Philosophical & Reflective Themes',
          'Essay Structure - Clear Thinking, Sound Arguments & Structured Presentation',
          'Language Quality, Vocabulary & Insightful Content Development',
        ],
      },
      {
        name: 'Qualifying Papers - General Hindi & Optional Subject',
        topics: [
          'General Hindi: Essay Writing (Nibandh), Grammar - Syntax, Vocabulary & Usage',
          'Sentence Construction, Précis Writing (Saar-lekhan) & Reading Comprehension',
          'Minimum qualifying marks: 30% (30/100) in General Hindi',
          'Optional Subject (MCQ-based, qualifying): Strategy for History, Geography, Public Administration, Sociology & Literature',
          'Optional Subject Syllabus Orientation - PG level coverage for chosen subject',
        ],
      },
    ],
    features: [
      {
        title: 'Bihar-Centric Content Integration',
        description: 'Every GS topic is taught with dedicated Bihar-specific layers - Bihar history, Bihar geography, Bihar economy, and Bihar polity - the differentiating factor that determines BPSC Mains rank',
        iconName: 'Target',
      },
      {
        title: 'All Three Stages Covered',
        description: 'End-to-end preparation across all three BPSC CCE stages - qualifying Prelims (150 marks, 2 hrs, negative marking), merit Mains (900 marks across 3 papers), and Personality Test Interview (120 marks)',
        iconName: 'Layers',
      },
      {
        title: 'Essay Paper Mastery',
        description: 'Dedicated Essay paper preparation covering Social, Economic, Bihar-specific, and Philosophical themes with weekly evaluated essays - building the clear arguments and structured presentation that earn top marks',
        iconName: 'Edit',
      },
      {
        title: 'Prelims Pattern Calibration',
        description: '150 MCQs in 2 hours with 0.25 negative marking - speed-accuracy drills and elimination techniques specifically calibrated to BPSC Prelims to maximize correct attempts and minimize negative marking losses',
        iconName: 'ClipboardList',
      },
      {
        title: 'General Hindi & Optional Strategy',
        description: 'Qualifying General Hindi coaching covering Grammar, Essay, Précis, and Comprehension at Class 10 level, plus dedicated strategy sessions for the Optional Subject MCQ qualifying paper',
        iconName: 'Book',
      },
      {
        title: 'Mock Personality Test Preparation',
        description: 'Structured Interview preparation assessing communication skills, leadership qualities, general awareness, mental alertness, and integrity - with mock panel interviews by experienced mentors and IAS/PCS officers',
        iconName: 'Users',
      },
    ],
    whoFor: [
      'Bihar domicile aspirants targeting Bihar Administrative Service (SDM), Bihar Police Service (DSP), Block Development Officer, CDPO, District Revenue Officer, and other BPSC Group A & B posts',
      'Graduates from any stream who want a structured, end-to-end BPSC CCE preparation system covering all three examination stages in one programme',
      'Previous BPSC attempt holders seeking expert re-direction, deeper Bihar-specific content, and intensive essay and answer writing improvement',
      'Aspirants who want integrated Bihar and national GS preparation with both English and Hindi medium bilingual support',
    ],
    roadmap: [
      {
        period: 'Phase 1 - Months 1–3',
        title: 'Foundation & Bihar Core',
        items: [
          'Complete BPSC CCE syllabus mapping - Prelims and Mains integrated coverage plan activated',
          'Bihar History (Ancient to Modern), Bihar Geography, Bihar Polity & Economy - deep foundation build',
          'National GS Core: Indian History, Indian Polity, Indian Economy, Environment & Science',
          'Daily current affairs with Bihar-specific focus and 50 MCQs daily from Day 1',
        ],
      },
      {
        period: 'Phase 2 - Months 4–7',
        title: 'Mains Depth & Evaluated Answer Writing',
        items: [
          'GS Paper I - Modern History of India, Bihar\'s freedom struggle contribution, Contemporary Events',
          'GS Paper II - Indian Polity & Governance, Bihar economy, Geography, Science & Technology',
          'Daily Answer Writing (DAW) begins - 4 evaluated answers per day with faculty feedback',
          'Essay Paper focus - one full evaluated essay per week with structure, argument, and language review',
        ],
      },
      {
        period: 'Phase 3 - Months 8–10',
        title: 'Qualifying Papers & Mid-Mock Series',
        items: [
          'General Hindi intensive - Grammar (Vyakaran), Essay (Nibandh), Précis, Sentence Construction, Comprehension',
          'Optional Subject strategy session + targeted MCQ practice for the chosen subject',
          '10 Full-Length Prelims Mock Tests (BPSC pattern) with detailed performance analysis',
          'Bihar & National Current Affairs vault - 6-month rapid crash module with integration sessions',
        ],
      },
      {
        period: 'Phase 4 - Months 11–12',
        title: 'Prelims Bootcamp & Personality Test',
        items: [
          '20+ Full-Length BPSC Prelims Simulators (150 MCQs, 2 hours, negative marking) with cutoff prediction',
          'Speed, accuracy & elimination technique drills - Assertion-Reasoning, match-the-following, statement sets',
          'Personality Test preparation: mock panel interviews, communication skills, mental alertness sessions',
          'Final revision sprint - high-yield Bihar data, recent developments, and exam-day strategy',
        ],
      },
    ],
    faqs: [
      {
        q: 'How is the final BPSC CCE merit list calculated?',
        a: 'The final merit list is based on Mains merit marks (900) + Interview marks (120) = 1020 total. Prelims is qualifying only and marks are not counted for the merit list.',
      },
      {
        q: 'Is the Optional Subject paper counted for final merit?',
        a: 'No. The Optional Subject paper is now MCQ-based and qualifying only - you must clear the minimum marks threshold (which varies by category) but these marks do not contribute to the merit list.',
      },
      {
        q: 'What is the minimum required in General Hindi?',
        a: 'Candidates must score at least 30% (30 out of 100) in General Hindi to qualify. These marks are not counted for the final merit list.',
      },
      {
        q: 'What posts can I get through BPSC CCE?',
        a: 'Bihar Administrative Service (SDM equivalent), Bihar Police Service (DSP), Block Development Officer, Child Development Project Officer, District Revenue Officer, and 50+ other Group A and B administrative posts in Bihar.',
      },
      {
        q: 'Is the batch taught in Hindi or English?',
        a: 'Bilingual - teaching is primarily in Hindi with English support, matching the bilingual nature of the BPSC CCE examination.',
      },
    ],
    accentColor: 'orange',
    isNew: true,
  },
];

// ─── Notifications ────────────────────────────────────────────────────────────
export interface NotificationItem {
  id: string;
  date: string;
  title: string;
  desc: string;
  isNew?: boolean;
}

export const NOTIFICATIONS_DATA = {
  tests: [
    { id: 't1', date: '15 Nov', title: 'All India Prelims Mock Test #8', desc: 'GS Paper I & II - 400 marks, 2+2 hrs', isNew: true },
    { id: 't2', date: '20 Nov', title: 'Mains Answer Writing Test #12', desc: 'GS Paper III - Economy & Environment' },
    { id: 't3', date: '25 Nov', title: 'CSAT Practice Test #5', desc: 'Full syllabus, 200 marks', isNew: true },
    { id: 't4', date: '01 Dec', title: 'Optional Sociology Test #3', desc: 'Paper I - Sociological Thinkers' },
    { id: 't5', date: '05 Dec', title: 'All India Mock Test #9', desc: 'Combined Prelims Full Mock', isNew: true },
  ] as NotificationItem[],
  exams: [
    { id: 'e1', date: '26 May', title: 'UPSC CSE Prelims 2025', desc: 'Official notification expected in Feb 2025', isNew: true },
    { id: 'e2', date: 'Sep 2025', title: 'UPSC CSE Mains 2025', desc: 'Tentative dates for written examination' },
    { id: 'e3', date: '15 Dec', title: 'UPPCS Prelims 2024', desc: 'State civil services preliminary exam' },
    { id: 'e4', date: 'Jan 2025', title: 'UPSC CMS 2025', desc: 'Combined Medical Services exam' },
    { id: 'e5', date: 'Mar 2025', title: 'CAPF AC Exam 2025', desc: 'Central Armed Police Forces exam', isNew: true },
  ] as NotificationItem[],
  whatsNew: [
    { id: 'w1', date: '12 Nov', title: 'UDAAN 2025 Scholarship Test', desc: 'Register for up to ₹2L scholarship waiver', isNew: true },
    { id: 'w2', date: '10 Nov', title: 'New Faculty: Dr. R.K. Singh Joins', desc: 'Former IAS, expert in GS Paper II' },
    { id: 'w3', date: '08 Nov', title: 'October Current Affairs PDF Released', desc: 'Download free 80-page compilation' },
    { id: 'w4', date: '05 Nov', title: 'IAS Olympiad 2025 Open', desc: 'Class 6–12 students, ₹50K prizes', isNew: true },
    { id: 'w5', date: '01 Nov', title: 'New Batch: Hindi Medium GS', desc: 'Starting December 1 - only 40 seats' },
  ] as NotificationItem[],
};

// ─── Study Materials ──────────────────────────────────────────────────────────
export interface StudyMaterial {
  id: string;
  title: string;
  Icon: LucideIcon;
  color: 'blue' | 'gold' | 'orange';
  href: string;
  tag: string;
}

export const STUDY_MATERIALS_DATA: StudyMaterial[] = [
  { id: 'sm1', title: 'Daily Pre-PARE', Icon: Target, color: 'blue', href: '/resources/daily-prepare', tag: 'Daily' },
  { id: 'sm2', title: 'Daily MCQs', Icon: CheckCircle, color: 'gold', href: '/resources/daily-mcqs', tag: 'Daily' },
  { id: 'sm3', title: 'Info Pedia', Icon: Info, color: 'orange', href: '/resources/info-pedia', tag: 'Weekly' },
  { id: 'sm4', title: 'Brain Booster', Icon: Zap, color: 'blue', href: '/resources/brain-booster', tag: 'Daily' },
  { id: 'sm5', title: 'Yojana Gist', Icon: FileText, color: 'gold', href: '/resources/yojana', tag: 'Monthly' },
  { id: 'sm6', title: 'Kurukshetra Gist', Icon: Book, color: 'orange', href: '/resources/kurukshetra', tag: 'Monthly' },
  { id: 'sm7', title: 'Daily News Videos', Icon: Play, color: 'blue', href: '/resources/news-videos', tag: 'Daily' },
  { id: 'sm8', title: 'Daily Static MCQs', Icon: ListChecks, color: 'gold', href: '/resources/static-mcqs', tag: 'Daily' },
  { id: 'sm9', title: 'News Analysis', Icon: Newspaper, color: 'orange', href: '/resources/news-analysis', tag: 'Daily' },
];

// ─── Faculty / Team ───────────────────────────────────────────────────────────
export interface FacultyMember {
  id: string;
  name: string;
  designation: string;
  subject: string;
  experience: string;
  category: 'directors' | 'faculty' | 'interview';
  photo: string;
}

export const FACULTY_MEMBERS: FacultyMember[] = [
  { id: 'f1', name: 'Dr. Arvind Kumar', designation: 'Director & Founder', subject: 'IAS (Retd.) | Public Admin.', experience: '25+ yrs', category: 'directors', photo: '/images/faculty/f1.jpg' },
  { id: 'f2', name: 'Mrs. Sunita Agarwal', designation: 'Co-Director', subject: 'IPS (Retd.) | GS Paper III', experience: '20+ yrs', category: 'directors', photo: '/images/faculty/f2.jpg' },
  { id: 'f3', name: 'Dr. R.K. Singh', designation: 'Senior Faculty', subject: 'IAS (Retd.) | Polity & Governance', experience: '18+ yrs', category: 'faculty', photo: '/images/faculty/f3.jpg' },
  { id: 'f4', name: 'Prof. Meena Sharma', designation: 'Faculty - History', subject: 'M.Phil, JNU | Modern India', experience: '15+ yrs', category: 'faculty', photo: '/images/faculty/f4.jpg' },
  { id: 'f5', name: 'Mr. Rohit Saxena', designation: 'Faculty - Economy', subject: 'IES Officer | Indian Economy', experience: '12+ yrs', category: 'faculty', photo: '/images/faculty/f5.jpg' },
  { id: 'f6', name: 'Dr. Priti Verma', designation: 'Faculty - Geography', subject: 'PhD Geography | Physical Geo.', experience: '10+ yrs', category: 'faculty', photo: '/images/faculty/f6.jpg' },
  { id: 'f7', name: 'Mr. Sanjeev Tomar', designation: 'Interview Panelist', subject: 'IAS (Retd.) | Personality Dev.', experience: '22+ yrs', category: 'interview', photo: '/images/faculty/f7.jpg' },
  { id: 'f8', name: 'Mrs. Deepali Joshi', designation: 'Interview Panelist', subject: 'IFS (Retd.) | Communication', experience: '16+ yrs', category: 'interview', photo: '/images/faculty/f8.jpg' },
];

// ─── Testimonials (text-only, no photos) ─────────────────────────────────────
export interface Testimonial {
  id: string;
  name: string;
  achievement: string;        // e.g. "AIR 01 • UPSC" or "UPPCS 2024 • Rank 02 (SDM)"
  exam: 'UPSC' | 'UPPCS';
  quote: string;
  featured?: boolean;         // shown in the homepage carousel
}

export const TESTIMONIALS: Testimonial[] = [
  { id: 't1', name: 'Kanishak Kataria', achievement: 'AIR 01 • UPSC', exam: 'UPSC', featured: true,
    quote: 'Dhyeya IAS provided me with a disciplined preparation strategy and continuous mentor support.' },
  { id: 't2', name: 'Junaid Ahmed', achievement: 'AIR 03 • UPSC', exam: 'UPSC', featured: true,
    quote: "The faculty's depth of knowledge and the rigorous test series sharpened my answers for the final exam." },
  { id: 't3', name: 'Saumya Pandey', achievement: 'AIR 04 • UPSC', exam: 'UPSC', featured: true,
    quote: 'Consistent mentorship and timely feedback on my answer writing made all the difference.' },
  { id: 't4', name: 'Ananaya Trivedi', achievement: 'UPPCS 2024 • Rank 02 (SDM)', exam: 'UPPCS', featured: true,
    quote: 'The structured mentorship and answer writing sessions kept me focused throughout my preparation.' },
  { id: 't5', name: 'Anamika Mishra', achievement: 'UPPCS 2024 • Rank 04 (SDM)', exam: 'UPPCS', featured: true,
    quote: "Dhyeya's UP-specific material and General Hindi guidance gave me a clear edge in the Mains exam." },
  { id: 't6', name: 'Deepti Verma', achievement: 'UPPCS 2024 • Rank 06 (SDM)', exam: 'UPPCS', featured: true,
    quote: 'From prelims strategy to interview guidance, every stage was backed by personal attention.' },
  { id: 't7', name: 'Pari Bishnoi', achievement: 'AIR 30 • UPSC', exam: 'UPSC', featured: true,
    quote: 'The disciplined environment and quality of daily current affairs kept my preparation on track.' },
  { id: 't8', name: 'Sonali Singh', achievement: 'UPPCS 2024 • Rank 32 (SDM)', exam: 'UPPCS', featured: true,
    quote: 'Regular evaluated tests and one-on-one mentorship helped me convert hard work into a selection.' },
  { id: 't9', name: 'Lok Bandhu', achievement: 'AIR 07 • UPSC', exam: 'UPSC',
    quote: "The institute's roadmap simplified a vast syllabus into a clear, achievable plan." },
  { id: 't10', name: 'Mahesh Kumar', achievement: 'AIR 14 • UPSC', exam: 'UPSC',
    quote: 'Comprehensive notes and regular revision tests made my prelims preparation rock solid.' },
  { id: 't11', name: 'Shivani Goyal', achievement: 'AIR 15 • UPSC', exam: 'UPSC',
    quote: 'Mock interviews with experienced panelists prepared me thoroughly for the personality test.' },
  { id: 't12', name: 'Priyanka Niranjan', achievement: 'AIR 20 • UPSC', exam: 'UPSC',
    quote: 'Continuous mentorship kept me motivated even during the toughest phase of preparation.' },
];

// ─── Featured Alumni Visits (real photographs) ───────────────────────────────
export interface AchieverVisit {
  id: string;
  name: string;
  achievement: string;
  photo: string;
  caption: string;
}

export const ACHIEVER_VISITS: AchieverVisit[] = [
  {
    id: 'av1',
    name: 'Junaid Ahmed',
    achievement: 'AIR 03 • UPSC',
    photo: 'https://res.cloudinary.com/dl9t48lyt/image/upload/v1782474606/WhatsApp_Image_2026-04-28_at_14.26.22_umyvid.jpg',
    caption: 'Junaid Ahmed visited Dhyeya IAS to interact with aspirants and shared his preparation strategy, answer writing techniques, and interview experience.',
  },
  {
    id: 'av2',
    name: 'Saumya Pandey',
    achievement: 'AIR 04 • UPSC',
    photo: 'https://res.cloudinary.com/dl9t48lyt/image/upload/v1782474606/WhatsApp_Image_2026-04-28_at_14.25.09_qnhezc.jpg',
    caption: 'Saumya Pandey visited Dhyeya IAS to mentor future civil service aspirants and discuss effective preparation strategies, revision methods, and interview guidance.',
  },
  {
    id: 'av3',
    name: 'UPPCS 2024 Selections',
    achievement: 'UPPCS 2024 • Selected Officers',
    photo: 'https://res.cloudinary.com/dl9t48lyt/image/upload/v1782474663/WhatsApp_Image_2026-04-21_at_23.55.58_q333gq.jpg',
    caption: 'Our UPPCS 2024 selected students celebrating their success at Dhyeya IAS — a proud moment for the entire Dhyeya family.',
  },
];

// ─── Blog Posts ───────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  slug: string;
  image: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'How to Build a 12-Month UPSC Study Plan That Actually Works',
    excerpt: 'Most aspirants fail not because of lack of intelligence but because of poor planning. Here is a data-backed month-by-month roadmap for UPSC 2025.',
    category: 'Strategy',
    date: 'Nov 10, 2024',
    readTime: '8 min read',
    slug: 'upsc-12-month-study-plan',
    image: '/images/blog/b1.jpg',
  },
  {
    id: 'b2',
    title: "Understanding India's Federal Structure for UPSC Mains GS Paper II",
    excerpt: "Centre-State relations, constitutional provisions, fiscal federalism - a comprehensive analysis for UPSC Mains with model answer frameworks.",
    category: 'Polity',
    date: 'Nov 8, 2024',
    readTime: '12 min read',
    slug: 'federal-structure-upsc-mains',
    image: '/images/blog/b2.jpg',
  },
  {
    id: 'b3',
    title: 'Climate Change & India: Environment Questions for UPSC Prelims 2025',
    excerpt: 'Comprehensive notes on climate agreements, India\'s NDC targets, National Action Plan on Climate Change, and 100+ likely prelims questions.',
    category: 'Environment',
    date: 'Nov 5, 2024',
    readTime: '10 min read',
    slug: 'climate-change-india-upsc-2025',
    image: '/images/blog/b3.jpg',
  },
];

// ─── Products / Store ────────────────────────────────────────────────────────
export interface Product {
  id: string;
  title: string;
  author: string;
  originalPrice: number;
  salePrice: number;
  badge?: string;
  image: string;
}

export const PRODUCTS: Product[] = [
  { id: 'p1', title: 'UPSC CSE Complete Guide 2025', author: 'Dhyeya IAS Editorial Team', originalPrice: 1499, salePrice: 999, badge: 'Bestseller', image: '/images/store/p1.jpg' },
  { id: 'p2', title: 'Indian Polity & Constitution Notes', author: 'Dr. R.K. Singh', originalPrice: 699, salePrice: 499, badge: 'New', image: '/images/store/p2.jpg' },
  { id: 'p3', title: 'Current Affairs Annual Compilation 2024', author: 'Dhyeya IAS', originalPrice: 899, salePrice: 599, badge: 'Bestseller', image: '/images/store/p3.jpg' },
  { id: 'p4', title: 'Geography of India - Comprehensive Notes', author: 'Dr. Priti Verma', originalPrice: 599, salePrice: 449, image: '/images/store/p4.jpg' },
  { id: 'p5', title: 'Ethics, Integrity & Aptitude GS Paper IV', author: 'Dhyeya IAS', originalPrice: 799, salePrice: 549, badge: 'New', image: '/images/store/p5.jpg' },
  { id: 'p6', title: 'CSAT Mathematics & Reasoning', author: 'Dhyeya IAS', originalPrice: 499, salePrice: 349, image: '/images/store/p6.jpg' },
];

// ─── YouTube Videos ───────────────────────────────────────────────────────────
export interface VideoItem {
  id: string;
  title: string;
  views: string;
  date: string;
  thumbnail: string;
  videoId: string;
}

export const VIDEOS_DATA: VideoItem[] = [
  { id: 'v1', title: 'UPSC CSE 2025 - Complete Strategy in 60 Minutes', views: '2.4L views', date: 'Nov 12, 2024', thumbnail: '/images/videos/v1.jpg', videoId: 'dQw4w9WgXcQ' },
  { id: 'v2', title: 'Daily Current Affairs - November 13 | The Hindu Analysis', views: '98K views', date: 'Nov 13, 2024', thumbnail: '/images/videos/v2.jpg', videoId: 'dQw4w9WgXcQ' },
  { id: 'v3', title: 'How I Scored 130+ in UPSC Prelims GS Paper I - AIR 12 Priya Sharma', views: '3.1L views', date: 'Nov 10, 2024', thumbnail: '/images/videos/v3.jpg', videoId: 'dQw4w9WgXcQ' },
];

// ─── Student Zone Quick Access ────────────────────────────────────────────────
export interface StudentZoneItem {
  id: string;
  title: string;
  Icon: LucideIcon;
  href: string;
  color: string;
}

// Mirrors the navbar "Student Zone" dropdown — keep these in sync.
export const STUDENT_ZONE_ITEMS: StudentZoneItem[] = [
  { id: 'sz1', title: 'Batch Details', Icon: Users, href: '/student-zone/batches', color: 'blue' },
  { id: 'sz2', title: 'Free Resources', Icon: Download, href: '/student-zone/resources', color: 'gold' },
  { id: 'sz3', title: 'UPSC FAQs', Icon: HelpCircle, href: '/student-zone/faqs', color: 'orange' },
  { id: 'sz4', title: 'Live Test', Icon: Monitor, href: '/tests', color: 'blue' },
  { id: 'sz5', title: 'Latest Notifications', Icon: Bell, href: '/student-zone/notifications', color: 'gold' },
  { id: 'sz6', title: 'Test Results', Icon: Trophy, href: '/student-zone/results', color: 'orange' },
];

// ─── Why Choose Us ────────────────────────────────────────────────────────────
export const WHY_US_FEATURES = [
  { icon: GraduationCap, title: 'Expert Faculty', desc: 'Learn from IAS/IPS officers and subject specialists with decades of experience.' },
  { icon: Trophy, title: 'Proven Results', desc: '5000+ selections in IAS/PCS across 20 years - our results speak for us.' },
  { icon: BookOpen, title: 'Study Material', desc: 'Comprehensive, regularly updated notes covering the entire UPSC syllabus.' },
  { icon: UserCheck, title: 'Personal Mentorship', desc: 'One-on-one guidance sessions to identify and overcome your weaknesses.' },
  { icon: Building, title: 'Modern Infrastructure', desc: 'Smart classrooms, digital library, and a focused learning environment.' },
  { icon: IndianRupee, title: 'Affordable Fees', desc: 'Quality coaching at transparent pricing. Scholarships available for deserving candidates.' },
] as const;

// ─── App Features (Download App section) ─────────────────────────────────────
export const APP_FEATURES = [
  'Access 500+ hours of recorded video lectures',
  'Daily current affairs & MCQ practice tests',
  'Live doubt-clearing sessions with faculty',
  'Track your progress with detailed analytics',
] as const;
