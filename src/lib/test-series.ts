// ─── Test Series Data ────────────────────────────────────────────────────────

export interface TestScheduleRow {
  id: string;
  date?: string;
  time?: string;
  type: string;
  topic: string;
  syllabus: string;
  syllabusHindi?: string;
  marks?: string;
}

export interface TestSeriesSection {
  title: string;
  description?: string;
  schedule: TestScheduleRow[];
}

export interface TestSeries {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  accentColor: 'blue' | 'gold' | 'orange';
  // `discounted` is what gets charged and must equal products.price_inr in
  // Supabase; `original` is the cosmetic strikethrough. See docs/PAYMENTS_CHECKLIST.md.
  fee?: { original: number; discounted: number };
  totalTests: number;
  startDate?: string;
  duration?: string;
  sections: TestSeriesSection[];
  executionNotes?: string[];
  highlights: { label: string; value: string }[];
}

export const TEST_SERIES: TestSeries[] = [

  // ── 1. IAS Prelims Test Series ─────────────────────────────────────────────
  {
    slug: 'ias-prelims',
    title: 'IAS Prelims Test Series 2026–27',
    subtitle: 'UPSC Civil Services Preliminary Examination',
    tagline: 'Comprehensive 40-week schedule - 30 tests from foundation to simulation',
    description:
      'A professionally structured, week-by-week IAS Prelims Test Series starting July 5, 2026. This 40-week timeline systematically schedules 30 tests, strategically placing high-intensity Full-Length Tests (FLTs) and CSAT papers closer to the actual exam season in early 2027. Each Sunday test deepens your subject mastery, builds speed, and sharpens elimination instincts.',
    accentColor: 'blue',
    fee: { original: 4999, discounted: 2999 },
    totalTests: 30,
    startDate: 'July 5, 2026',
    duration: '40 Weeks (Jul 2026 – Mar 2027)',
    highlights: [
      { label: 'Total Tests', value: '30' },
      { label: 'Duration', value: '40 Weeks' },
      { label: 'Starts', value: 'Jul 5, 2026' },
      { label: 'Format', value: 'Sectional + FLT + CSAT' },
    ],
    executionNotes: [
      'Tests are scheduled every Sunday morning - block that time in your calendar and treat it as a real exam day.',
      'After each test, spend equal time reviewing model answers, checking time management, and identifying gaps.',
      'Phase 4 (Jan–Feb 2027) runs both GS Paper 1 and CSAT back-to-back - this is essential for building exam-day stamina.',
    ],
    sections: [
      {
        title: 'Phase 1: The Static Foundation',
        description: 'Sundays: Jul 5 – Sep 6, 2026 | Focus: Master core subjects block-by-block. Use these 10 weeks to build an unshakeable conceptual framework.',
        schedule: [
          { id: 'ST-01', date: 'July 5, 2026', type: 'Sectional', topic: 'Polity I', syllabus: 'Constitutional Framework, Preamble, Fundamental Rights, DPSP, Duties, Amendments.' },
          { id: 'ST-02', date: 'July 12, 2026', type: 'Sectional', topic: 'Polity II', syllabus: 'Parliament, Executive, Judiciary, State Govts, Local Bodies, Constitutional Bodies.' },
          { id: 'ST-03', date: 'July 19, 2026', type: 'Sectional', topic: 'History I', syllabus: 'Ancient India, Medieval India, and Indian Art & Culture.' },
          { id: 'ST-04', date: 'July 26, 2026', type: 'Sectional', topic: 'History II', syllabus: 'Modern Indian History (1757 to 1947) & National Movement.' },
          { id: 'ST-05', date: 'Aug 2, 2026', type: 'Sectional', topic: 'Geography I', syllabus: 'Physical Geography (Geomorphology, Climatology, Oceanography), World & Human Geography.' },
          { id: 'ST-06', date: 'Aug 9, 2026', type: 'Sectional', topic: 'Geography II', syllabus: 'Indian Geography (Physical, Rivers, Climate, Resources, Agriculture, Mapping).' },
          { id: 'ST-07', date: 'Aug 16, 2026', type: 'Sectional', topic: 'Economy I', syllabus: 'Macro Core (National Income, Inflation, Banking, Monetary Policy, Fiscal Policy).' },
          { id: 'ST-08', date: 'Aug 23, 2026', type: 'Sectional', topic: 'Economy II', syllabus: 'Structural (External Sector, Trade, WTO, Poverty, Inclusion, Demographics).' },
          { id: 'ST-09', date: 'Aug 30, 2026', type: 'Sectional', topic: 'Environment', syllabus: 'Ecosystems, Biodiversity, Pollution, Climate Change, Treaties, National Parks.' },
          { id: 'ST-10', date: 'Sept 6, 2026', type: 'Sectional', topic: 'Science & Tech', syllabus: 'Space, Defense, Biotech, Nanotech, IT, AI, Basic Physics/Chemistry/Biology.' },
        ],
      },
      {
        title: 'Phase 2: CSAT Foundations & Current Affairs',
        description: 'Sundays: Sep 13 – Nov 15, 2026 | Focus: Building aptitude skills and consolidating dynamic news. Taking these incrementally prevents late-stage panic.',
        schedule: [
          { id: 'CSAT-01', date: 'Sept 13, 2026', type: 'CSAT Sub-Sec', topic: 'Quantitative Aptitude I', syllabus: 'Number System, HCF/LCM, Percentages, Profit & Loss, Averages.' },
          { id: 'CSAT-02', date: 'Sept 20, 2026', type: 'CSAT Sub-Sec', topic: 'Logical Reasoning I', syllabus: 'Blood Relations, Seating Arrangements, Coding, Syllogisms.' },
          { id: 'CA-01', date: 'Sept 27, 2026', type: 'Current Affairs', topic: 'Current Affairs Jun–Sep 2025', syllabus: 'Comprehensive Current Affairs: June 2025 to September 2025.' },
          { id: 'CSAT-03', date: 'Oct 4, 2026', type: 'CSAT Sub-Sec', topic: 'Reading Comprehension I', syllabus: 'Inference, Assumptions, Crucial Message extraction.' },
          { id: 'CSAT-04', date: 'Oct 11, 2026', type: 'CSAT Sub-Sec', topic: 'Quantitative Aptitude II', syllabus: 'Time/Work, Speed/Distance, Permutation & Combination, Probability, Data Interpretation.' },
          { id: 'CA-02', date: 'Oct 18, 2026', type: 'Current Affairs', topic: 'Current Affairs Oct 2025–Jan 2026', syllabus: 'Comprehensive Current Affairs: October 2025 to January 2026.' },
          { id: 'CSAT-05', date: 'Oct 25, 2026', type: 'CSAT Sub-Sec', topic: 'Logical Reasoning II', syllabus: 'Clocks, Calendars, Puzzles, Non-Verbal Reasoning, Data Sufficiency.' },
          { id: 'CA-03', date: 'Nov 1, 2026', type: 'Current Affairs', topic: 'Current Affairs Feb–May 2026', syllabus: 'Comprehensive Current Affairs: February 2026 to May 2026.' },
          { id: 'CA-04', date: 'Nov 8, 2026', type: 'Current Affairs', topic: 'Union Budget & Economic Survey', syllabus: 'Union Budget 2026 & Economic Survey 2025–26 Special.' },
          { id: 'CA-05', date: 'Nov 15, 2026', type: 'Current Affairs', topic: 'Annual Round-up Mock', syllabus: '12-Month Current Affairs Marathon - Full Annual Review.' },
        ],
      },
      {
        title: 'Phase 3: Interim Revision & Stamina Building',
        description: 'Sundays: Nov 22, 2026 – Jan 17, 2027 | Focus: Transitioning into full syllabus coverage. Testing concepts comprehensively while building baseline paper-solving speed.',
        schedule: [
          { id: 'FLT-01', date: 'Nov 22, 2026', type: 'Full Length', topic: 'GS Paper 1 - Full Syllabus', syllabus: 'Full Syllabus (Basic Level Simulator) - All topics.' },
          { id: 'FLT-02', date: 'Nov 29, 2026', type: 'Full Length', topic: 'GS Paper 1 - Full Syllabus', syllabus: 'Full Syllabus (Basic Level Simulator) - All topics.' },
          { id: 'FLT-03', date: 'Dec 6, 2026', type: 'Full Length', topic: 'GS Paper 1 - Full Syllabus', syllabus: 'Full Syllabus (Basic Level Simulator) - All topics.' },
          { id: 'FLT-04', date: 'Dec 13, 2026', type: 'Full Length', topic: 'GS Paper 1 - Full Syllabus', syllabus: 'Full Syllabus (Basic Level Simulator) - All topics.' },
          { id: 'FLT-05', date: 'Dec 20, 2026', type: 'Full Length', topic: 'GS Paper 1 - Full Syllabus', syllabus: 'Full Syllabus (Basic Level Simulator) - All topics.' },
          { id: 'FLT-06', date: 'Dec 27, 2026', type: 'Full Length', topic: 'GS Paper 1 - Full Syllabus (Advanced)', syllabus: 'Full Syllabus (Advanced Level Simulator) - All topics.' },
          { id: 'FLT-07', date: 'Jan 3, 2027', type: 'Full Length', topic: 'GS Paper 1 - Full Syllabus (Advanced)', syllabus: 'Full Syllabus (Advanced Level Simulator) - All topics.' },
          { id: 'FLT-08', date: 'Jan 10, 2027', type: 'Full Length', topic: 'GS Paper 1 - Full Syllabus (Advanced)', syllabus: 'Full Syllabus (Advanced Level Simulator) - All topics.' },
          { id: 'FLT-09', date: 'Jan 17, 2027', type: 'Full Length', topic: 'GS Paper 1 - Full Syllabus (Advanced)', syllabus: 'Full Syllabus (Advanced Level Simulator) - All topics.' },
          { id: 'BREAK', date: 'Jan 24, 2027', type: 'Strategy Break', topic: 'Mid-Series Strategy Review', syllabus: 'No test - dedicated week for performance review, gap analysis, and strategy recalibration.' },
        ],
      },
      {
        title: 'Phase 4: Ultimate Exam Simulation',
        description: 'Sundays: Jan 31 – Feb 28, 2027 | Focus: True UPSC replication. Students take both papers back-to-back to master mental fatigue.',
        schedule: [
          { id: 'Combo-1', date: 'Jan 31, 2027', type: 'Full Length + CSAT', topic: 'FLT-10 (GS Paper 1) + CSAT-06 (Full Length)', syllabus: 'Morning: GS Paper 1 Mock (9:30–11:30 AM) | Afternoon: Full-Length Aptitude Mock (2:30–4:30 PM).' },
          { id: 'Combo-2', date: 'Feb 7, 2027', type: 'Full Length + CSAT', topic: 'FLT-11 (GS Paper 1) + CSAT-07 (Full Length)', syllabus: 'Morning: GS Paper 1 Mock (9:30–11:30 AM) | Afternoon: Full-Length Aptitude Mock (2:30–4:30 PM).' },
          { id: 'Combo-3', date: 'Feb 14, 2027', type: 'Full Length + CSAT', topic: 'FLT-12 (GS Paper 1) + CSAT-08 (Full Length)', syllabus: 'Morning: GS Paper 1 Mock (9:30–11:30 AM) | Afternoon: Full-Length Aptitude Mock (2:30–4:30 PM).' },
          { id: 'Combo-4', date: 'Feb 21, 2027', type: 'Full Length + CSAT', topic: 'FLT-13 (GS Paper 1) + CSAT-09 (Full Length)', syllabus: 'Morning: GS Paper 1 Mock (9:30–11:30 AM) | Afternoon: Full-Length Aptitude Mock (2:30–4:30 PM).' },
          { id: 'Combo-5', date: 'Feb 28, 2027', type: 'Full Length + CSAT', topic: 'FLT-14 (GS Paper 1) + CSAT-10 (Full Length)', syllabus: 'Morning: GS Paper 1 Mock (9:30–11:30 AM) | Afternoon: Full-Length Aptitude Mock (2:30–4:30 PM).' },
        ],
      },
      {
        title: 'Phase 5: The Grand Finale',
        description: 'Sunday: March 7, 2027 | Focus: The final benchmark exam before students go into their final independent revision cycle.',
        schedule: [
          { id: 'FLT-15', date: 'March 7, 2027', type: 'Full Length - All India', topic: 'All-India Open Mock (GS Paper 1)', syllabus: 'Final predictive simulator covering the full UPSC CSE Prelims syllabus.' },
        ],
      },
    ],
  },

  // ── 2. IAS Mains Test Series ───────────────────────────────────────────────
  {
    slug: 'ias-mains',
    title: 'IAS Mains Answer Writing Test Series',
    subtitle: 'UPSC Civil Services Main Examination',
    tagline: '16-set programme - from micro-topic mastery to exam-level stamina',
    description:
      'A 16-set program designed to systematically transition you from micro-topic mastery to exam-level stamina. The program is balanced symmetrically: 8 Sectional Tests to build content and structure, followed by 8 Full-Length Tests (FLTs) to master time management and copy completion. Each set runs as two complete cycles of GS Papers 1–4 to train your brain to recall vast information under high pressure.',
    accentColor: 'blue',
    fee: { original: 15999, discounted: 8999 },
    totalTests: 16,
    highlights: [
      { label: 'Total Sets', value: '16' },
      { label: 'Sectional Tests', value: '8' },
      { label: 'Full-Length Tests', value: '8' },
      { label: 'Each Paper', value: '250 Marks / 3 Hrs' },
    ],
    executionNotes: [
      'The 7-Minute / 11-Minute Split: For the FLTs, train yourself to finish a 10-mark question (150 words) within 7 minutes, and a 15-mark question (250 words) within 11 minutes.',
      'The "Post-Mortem" Review: Spend double the time analyzing your evaluated copies compared to the time spent writing. Check if you addressed all sub-parts of each question.',
      'Data & Diagram Integration: Use Phase 1 to curate standard diagrams (maps of India, supply-chain flowcharts, hub-and-spoke models for ethics) so that drawing them during Phase 2 becomes second nature.',
    ],
    sections: [
      {
        title: 'Phase 1: Sectional Content Builders (Sets 1 to 8)',
        description: 'Focus: Master core answer structures, learn introduction-body-conclusion templates, and focus on high-yield themes across specific parts of the GS papers.',
        schedule: [
          { id: 'Set 01', type: 'Sectional', topic: 'GS Paper 1 (Part A)', syllabus: 'History & Culture: Art & Culture, Modern Indian History, Freedom Struggle, Post-Independence, and World History.' },
          { id: 'Set 02', type: 'Sectional', topic: 'GS Paper 1 (Part B)', syllabus: 'Geography & Society: Physical & Indian Geography, Natural Resources, Geopolitical features, Indian Society, Diversity, and Women Empowerment.' },
          { id: 'Set 03', type: 'Sectional', topic: 'GS Paper 2 (Part A)', syllabus: 'Polity & Constitution: Constitutional Framework, Amendments, Federal Structure, Parliament & State Legislatures, Executive & Judiciary.' },
          { id: 'Set 04', type: 'Sectional', topic: 'GS Paper 2 (Part B)', syllabus: 'Governance & IR: Statutory/Regulatory bodies, Welfare Schemes, Citizen\'s Charters, NGO/SHG roles, and International Relations/Bilateral Treaties.' },
          { id: 'Set 05', type: 'Sectional', topic: 'GS Paper 3 (Part A)', syllabus: 'Economy & Agriculture: Indian Economy, Resource Mobilization, Budgeting, Inclusive Growth, Cropping Patterns, Subsidies, and Food Processing.' },
          { id: 'Set 06', type: 'Sectional', topic: 'GS Paper 3 (Part B)', syllabus: 'Security, S&T, Environment: Science & Tech developments, Biodiversity, Climate Change, Disaster Management, and Internal Security challenges.' },
          { id: 'Set 07', type: 'Sectional', topic: 'GS Paper 4 (Part A)', syllabus: 'Ethics Theory: Ethics and Human Interface, Attitude, Aptitude, Emotional Intelligence, and Moral Thinkers.' },
          { id: 'Set 08', type: 'Sectional', topic: 'GS Paper 4 (Part B)', syllabus: 'Ethics Case Studies: Applied case studies focusing on administrative dilemmas, public probity, corruption, and stakeholder analysis.' },
        ],
      },
      {
        title: 'Phase 2: Full-Length Simulators - Cycle 1 (Sets 9 to 12)',
        description: 'Focus: Write 20 questions in 3 hours. First complete cycle of GS Papers 1–4.',
        schedule: [
          { id: 'Set 09', type: 'Full Length', topic: 'GS Paper 1 (FLT-1)', syllabus: 'Complete Syllabus: History, Society, and Geography.', marks: '250 Marks / 3 Hours' },
          { id: 'Set 10', type: 'Full Length', topic: 'GS Paper 2 (FLT-1)', syllabus: 'Complete Syllabus: Polity, Governance, Social Justice, and IR.', marks: '250 Marks / 3 Hours' },
          { id: 'Set 11', type: 'Full Length', topic: 'GS Paper 3 (FLT-1)', syllabus: 'Complete Syllabus: Economy, Environment, S&T, and Security.', marks: '250 Marks / 3 Hours' },
          { id: 'Set 12', type: 'Full Length', topic: 'GS Paper 4 (FLT-1)', syllabus: 'Complete Syllabus: Full Theory & 6 Applied Case Studies.', marks: '250 Marks / 3 Hours' },
        ],
      },
      {
        title: 'Phase 2: Full-Length Simulators - Cycle 2 (Sets 13 to 16)',
        description: 'Focus: The Final Marathon. Advanced UPSC-level simulation of GS Papers 1–4.',
        schedule: [
          { id: 'Set 13', type: 'Full Length', topic: 'GS Paper 1 (FLT-2)', syllabus: 'Full Syllabus Simulation (Advanced/UPSC Level).', marks: '250 Marks / 3 Hours' },
          { id: 'Set 14', type: 'Full Length', topic: 'GS Paper 2 (FLT-2)', syllabus: 'Full Syllabus Simulation (Advanced/UPSC Level).', marks: '250 Marks / 3 Hours' },
          { id: 'Set 15', type: 'Full Length', topic: 'GS Paper 3 (FLT-2)', syllabus: 'Full Syllabus Simulation (Advanced/UPSC Level).', marks: '250 Marks / 3 Hours' },
          { id: 'Set 16', type: 'Full Length', topic: 'GS Paper 4 (FLT-2)', syllabus: 'Full Syllabus Simulation (Advanced/UPSC Level).', marks: '250 Marks / 3 Hours' },
        ],
      },
    ],
  },

  // ── 3. UPPCS Mains Test Series ─────────────────────────────────────────────
  {
    slug: 'uppcs-mains',
    title: 'UPPCS Mains Test Series',
    subtitle: 'UP Provincial Civil Services Main Examination',
    tagline: '18-test programme aligned with the revised UPPCS pattern - GS 5 & GS 6 included',
    description:
      'This schedule is strictly aligned with the latest UPPCS pattern, which removed optional subjects and introduced General Studies Paper 5 and Paper 6 (UP Special). The program is divided into two phases: Phase 1 focuses on micro-detailing through 10 Sectional Tests, and Phase 2 builds exam stamina through 8 Full-Length Tests.',
    accentColor: 'gold',
    fee: { original: 9999, discounted: 6999 },
    totalTests: 18,
    highlights: [
      { label: 'Total Tests', value: '18' },
      { label: 'Sectional Tests', value: '10' },
      { label: 'Full-Length Tests', value: '8' },
      { label: 'UP Special Tests', value: 'ST 09, 10 + FLT 07, 08' },
    ],
    executionNotes: [
      'Pacing the Sectional Tests: Aim to write one sectional test every 5 to 7 days. Use the days in between to rigorously revise the specific syllabus block for the upcoming test.',
      'Transition to FLTs: Do not wait until you feel "100% prepared" to start the FLTs. Begin the FLTs at least 45 days before your actual Mains exam.',
      'The "UP Special" Edge: Papers 5 and 6 are relatively new and heavily determine your rank. Treat ST 09, ST 10, FLT 07, and FLT 08 with the highest priority. Keep your UP government datasets, budget highlights, and state schemes thoroughly updated.',
    ],
    sections: [
      {
        title: 'Phase 1: Sectional Tests (10 Tests)',
        description: 'The goal of this phase is to break down the massive GS syllabus into manageable chunks, allowing you to master specific themes, build your content reservoir, and practice time management on a micro-level.',
        schedule: [
          { id: 'ST 01', type: 'Sectional', topic: 'GS Paper 1 (Part A)', syllabus: 'Indian Art & Culture, Modern Indian History, Freedom Struggle, Post-Independence Consolidation, World History, Indian Society.' },
          { id: 'ST 02', type: 'Sectional', topic: 'GS Paper 1 (Part B)', syllabus: 'Physical Geography, Natural Resources, Geography of India and the World, Human Migration, Ocean Resources.' },
          { id: 'ST 03', type: 'Sectional', topic: 'GS Paper 2 (Part A)', syllabus: 'Indian Constitution, Historical Underpinnings, Functions of Executive/Legislature/Judiciary, Representation of People\'s Act.' },
          { id: 'ST 04', type: 'Sectional', topic: 'GS Paper 2 (Part B)', syllabus: 'Governance, Transparency, Social Justice, Welfare Schemes, NGOs, International Relations & Bilateral Agreements.' },
          { id: 'ST 05', type: 'Sectional', topic: 'GS Paper 3 (Part A)', syllabus: 'Economic Planning in India, NITI Aayog, Agriculture, Subsidies, Food Processing, Land Reforms, Infrastructure.' },
          { id: 'ST 06', type: 'Sectional', topic: 'GS Paper 3 (Part B)', syllabus: 'Science & Technology, Space & IT, Environment Conservation, Disaster Management, Internal Security Challenges.' },
          { id: 'ST 07', type: 'Sectional', topic: 'GS Paper 4 (Part A)', syllabus: 'Ethics & Human Interface, Attitude, Aptitude, Foundational Values for Civil Service, Emotional Intelligence.' },
          { id: 'ST 08', type: 'Sectional', topic: 'GS Paper 4 (Part B)', syllabus: 'Contributions of Moral Thinkers, Public/Civil Service Values, Probity in Governance, Applied Case Studies.' },
          { id: 'ST 09', type: 'Sectional - UP Special', topic: 'GS Paper 5 (UP Special 1)', syllabus: 'UP History, Architecture, Political System, Governance, Local Self-Government, Land Reforms, Internal Security in UP.' },
          { id: 'ST 10', type: 'Sectional - UP Special', topic: 'GS Paper 6 (UP Special 2)', syllabus: 'UP Economy, Demography, Agriculture, Geography, National Parks, Environment, Science & Tech Innovations in UP.' },
        ],
      },
      {
        title: 'Phase 2: Full-Length Tests (8 Tests)',
        description: 'The goal of this phase is to simulate the exact conditions of the actual UPPCS Mains. It is highly recommended to write these in pairs (two tests a day: 9:30 AM–12:30 PM and 2:00 PM–5:00 PM) to build the physical and mental stamina required for the real exam.',
        schedule: [
          { id: 'FLT 01', type: 'Full Length', topic: 'General Hindi', syllabus: 'Comprehensive syllabus covering Grammar, Letter Writing, Precis, and Unseen Passages.', marks: '150 Marks' },
          { id: 'FLT 02', type: 'Full Length', topic: 'Essay', syllabus: '3 Sections (Literature/Culture, Science/Economy, National/International Events). Write 3 essays.', marks: '150 Marks' },
          { id: 'FLT 03', type: 'Full Length', topic: 'GS Paper 1', syllabus: 'Comprehensive FLT: History, Geography, and Society.', marks: '200 Marks' },
          { id: 'FLT 04', type: 'Full Length', topic: 'GS Paper 2', syllabus: 'Comprehensive FLT: Polity, Governance, Social Justice, and IR.', marks: '200 Marks' },
          { id: 'FLT 05', type: 'Full Length', topic: 'GS Paper 3', syllabus: 'Comprehensive FLT: Economy, Environment, Science, and Security.', marks: '200 Marks' },
          { id: 'FLT 06', type: 'Full Length', topic: 'GS Paper 4', syllabus: 'Comprehensive FLT: Ethics, Integrity, and Aptitude (including Case Studies).', marks: '200 Marks' },
          { id: 'FLT 07', type: 'Full Length - UP Special', topic: 'GS Paper 5', syllabus: 'UP Special Comprehensive: UP History, Polity, and Governance.', marks: '200 Marks' },
          { id: 'FLT 08', type: 'Full Length - UP Special', topic: 'GS Paper 6', syllabus: 'UP Special Comprehensive: UP Economy, Geography, and Environment.', marks: '200 Marks' },
        ],
      },
    ],
  },

  // ── 4. UPPCS Prelims Test Series ───────────────────────────────────────────
  {
    slug: 'uppcs-prelims',
    title: 'UPPCS Prelims Test Series',
    subtitle: 'UP Provincial Civil Services Preliminary Examination',
    tagline: '15 full-length simulators targeting the UPPSC Prelims cut-off',
    description:
      'A targeted test series for the UPPCS Prelims designed around the exact exam pattern. With 5 sectional tests covering high-yield static and dynamic GS content and 10 full-length simulators, this series is engineered to push your score past the safety margin. Each test comes with UP-specific factual drills, previous year paper analysis, and detailed performance reports.',
    accentColor: 'gold',
    fee: { original: 2999, discounted: 1499 },
    totalTests: 15,
    highlights: [
      { label: 'Total Tests', value: '15' },
      { label: 'Sectional Tests', value: '5' },
      { label: 'Full-Length Simulators', value: '10' },
      { label: 'Daily MCQs', value: '100/day practice' },
    ],
    executionNotes: [
      'Prioritize UP-specific content: UP History, Geography, Economy, and State Schemes are the highest-yield areas and dominate the paper.',
      'Use the CSAT Safety Module included in the series to comfortably clear the 33% qualifying threshold.',
      'Analyze PYQs (last 10 years) alongside each test to identify which topic clusters the commission tests repeatedly.',
    ],
    sections: [
      {
        title: 'Phase 1: Sectional Tests - Core Scoring Engine',
        description: 'Focus: Break the UPPCS syllabus into strategic high-frequency blocks based on historical weightage.',
        schedule: [
          { id: 'ST-01', type: 'Sectional', topic: 'Indian Polity & History', syllabus: 'Indian Constitutional Framework, Articles & Amendments; Modern Indian History - chronologies, freedom movement, pacts.' },
          { id: 'ST-02', type: 'Sectional', topic: 'Physical & Indian Geography', syllabus: 'Physical Geography - landforms, rivers, climate; Indian Geography - mapping, minerals, agriculture.' },
          { id: 'ST-03', type: 'Sectional', topic: 'UP Special - GK & Schemes', syllabus: 'UP History & Culture, UP Districts, ODOP Scheme, Wildlife Sanctuaries, Census data, State Budget highlights.' },
          { id: 'ST-04', type: 'Sectional', topic: 'Environment & Science', syllabus: 'Ecology, Biodiversity, Climate Change, Environmental Laws; General Science - Biology focus, Science & Tech news.' },
          { id: 'ST-05', type: 'Sectional', topic: 'Current Affairs - UP & National', syllabus: '6-month UP and National Current Affairs; Government schemes, international events, latest reports.' },
        ],
      },
      {
        title: 'Phase 2: Full-Length Prelims Simulators (10 Tests)',
        description: 'Focus: Complete exam-pattern practice with GS Paper 1 + CSAT qualifying mock in the final tests. Build speed, accuracy, and negative-marking awareness.',
        schedule: [
          { id: 'FLT-01', type: 'Full Length', topic: 'UPPCS GS Paper 1 Simulator', syllabus: 'Full syllabus mock - Polity, History, Geography, Economy, Science & Environment (UP pattern).' },
          { id: 'FLT-02', type: 'Full Length', topic: 'UPPCS GS Paper 1 Simulator', syllabus: 'Full syllabus mock - with emphasis on UP Special content (History, Economy, Schemes, Geography).' },
          { id: 'FLT-03', type: 'Full Length', topic: 'UPPCS GS Paper 1 Simulator', syllabus: 'Full syllabus mock - current affairs integration heavy; 40% dynamic content.' },
          { id: 'FLT-04', type: 'Full Length', topic: 'UPPCS GS Paper 1 Simulator', syllabus: 'Advanced difficulty - assertion-reasoning, match-the-following, statement-based questions.' },
          { id: 'FLT-05', type: 'Full Length', topic: 'UPPCS GS Paper 1 Simulator', syllabus: 'PYQ-pattern mock - mirroring last 5 years UPPCS Prelims trends.' },
          { id: 'FLT-06', type: 'Full Length', topic: 'UPPCS GS Paper 1 Simulator', syllabus: 'UP Budget, Economic Survey, India State of Forest Report, Agriculture & Mineral Data heavy.' },
          { id: 'FLT-07', type: 'Full Length', topic: 'UPPCS GS Paper 1 Simulator', syllabus: 'Full syllabus - Advanced level mock (close to actual difficulty).' },
          { id: 'FLT-08', type: 'Full Length', topic: 'UPPCS GS Paper 1 Simulator', syllabus: 'Full syllabus - Advanced level mock with all-India comparative ranking.' },
          { id: 'FLT-09', type: 'Full Length + CSAT', topic: 'GS Paper 1 + CSAT Safety Module', syllabus: 'Combined GS Paper 1 + CSAT qualifying strategy mock (Interpersonal Skills, Decision Making, Hindi Grammar basics).' },
          { id: 'FLT-10', type: 'Full Length + CSAT', topic: 'Grand Finale Mock - GS + CSAT', syllabus: 'Final predictive mock simulating actual UPPCS Prelims. Cutoff prediction and risk analysis included.' },
        ],
      },
    ],
  },

  // ── 5. UKPCS Prelims Test Series ───────────────────────────────────────────
  {
    slug: 'ukpsc-prelims',
    title: 'UKPCS Prelims Test Series 2026',
    subtitle: 'Uttarakhand Appar PCS Preliminary Examination',
    tagline: 'उत्तराखंड की धरती से, सपनों की ऊँचाई तक - 22 tests starting 15 June 2026',
    description:
      'उत्तराखंड लोक सेवा आयोग (UKPSC) के नवीनतम पाठ्यक्रम और परीक्षा पद्धति पर पूर्णतः आधारित। Fully based on the latest syllabus and exam pattern of the Uttarakhand Public Service Commission (UKPSC). The test series provides 10 dedicated sectional tests focusing specifically on Uttarakhand Special (UK Special) - उत्तराखंड विशेष पर विशेष ध्यान - comprehensive coverage of Current Affairs keeping in mind the trends of previous years (विगत वर्षों के रुझानों को ध्यान में रखकर), and detailed evaluation with authentic explanatory answer keys (विस्तृत मूल्यांकन एवं प्रामाणिक व्याख्यात्मक उत्तर पत्रक) for each question paper.',
    accentColor: 'orange',
    fee: { original: 1999, discounted: 1499 },
    totalTests: 22,
    startDate: '15 June 2026',
    duration: 'Jun–Oct 2026',
    highlights: [
      { label: 'Total Tests', value: '22' },
      { label: 'UK Special', value: '10 Tests' },
      { label: 'Starts', value: '15 June 2026' },
      { label: 'Time', value: '9:30–11:30 AM' },
    ],
    executionNotes: [
      'Each test is held on a fixed date with a scheduled time slot of 9:30–11:30 AM. Treat each test date as your exam day.',
      'Detailed answer keys (Explanation Key) are provided after every test. Spend at least 2 hours reviewing the key and understanding the reasoning behind correct answers.',
      'Note: Test dates may be subject to minor changes based on circumstances. Students will be notified in advance of any date changes.',
    ],
    sections: [
      {
        title: 'Section 1: Sectional Tests - Uttarakhand Special / उत्तराखंड विशेष (10 Tests)',
        description: 'These 10 tests cover the entire Uttarakhand-specific syllabus - History, Geography, Polity, Economy, and Current Affairs of Uttarakhand. (ये 10 परीक्षाएं उत्तराखंड के इतिहास, भूगोल, राजव्यवस्था, अर्थव्यवस्था एवं समसामयिकी को संपूर्ण रूप से आच्छादित करती हैं।)',
        schedule: [
          { id: 'Test 01', date: '15 June 2026', time: '9:30–11:30 AM', type: 'UK Special', topic: 'History of Uttarakhand - I', syllabus: 'Prehistoric & proto-historic period; ancient tribes; Kuninda and Yaudheya dynasties; Kartikeyapura and Katyuri dynasties.', syllabusHindi: 'उत्तराखंड का इतिहास - प्रागैतिहासिक काल एवं आद्य-ऐतिहासिक काल; उत्तराखंड की प्राचीन जनजातियाँ; कर्तृकेयपुर राजवंश एवं कत्यूरी राजवंश' },
          { id: 'Test 02', date: '22 June 2026', time: '9:30–11:30 AM', type: 'UK Special', topic: 'History of Uttarakhand - II', syllabus: 'Parmar dynasty of Garhwal; Chand dynasty of Kumaon; Gorkha invasion, their rule, and policies in Uttarakhand.', syllabusHindi: 'गढ़वाल का परमार वंश; कुमाऊँ का चंद वंश; गोरखा आक्रमण और उत्तराखंड में उनका शासनकाल व नीतियां' },
          { id: 'Test 03', date: '29 June 2026', time: '9:30–11:30 AM', type: 'UK Special', topic: 'History of Uttarakhand - III', syllabus: 'British rule and administrative system; History and merger of Tehri State; Freedom movement in Uttarakhand; Role of Uttarakhand in national movements.', syllabusHindi: 'ब्रिटिश शासनकाल और प्रशासनिक व्यवस्था; टिहरी रियासत का इतिहास एवं विलय; उत्तराखंड में स्वतंत्रता आंदोलन: 1857 का प्रथम स्वतंत्रता संग्राम; भारत के राष्ट्रीय आंदोलनों में उत्तराखंड की भूमिका एवं जन-आंदोलन' },
          { id: 'Test 04', date: '06 July 2026', time: '9:30–11:30 AM', type: 'UK Special', topic: 'Geography of Uttarakhand - I', syllabus: 'Geographical location, relief, geological structure; Climatic conditions and drainage system (rivers, lakes, glaciers); Natural vegetation, forest resources, wildlife, national parks; Mineral resources and land use.', syllabusHindi: 'भौगोलिक स्थिति, उच्चावच और भूगर्भिक संरचना; जलवायु दशाएं एवं अपवाह तंत्र (नदियाँ, झीलें, ग्लेशियर); प्राकृतिक वनस्पति, वन संसाधन, वन्य जीवन एवं राष्ट्रीय उद्यान/अभयारण्य; खनिज संपदा एवं भू-उपयोग' },
          { id: 'Test 05', date: '13 July 2026', time: '9:30–11:30 AM', type: 'UK Special', topic: 'Geography of Uttarakhand - II', syllabus: 'Agriculture, animal husbandry, and irrigation; Major cities, cultural heritage, and tourist places; Population and demographic features; SC/ST distribution; Transport, power resources, industrial development, natural disasters.', syllabusHindi: 'कृषि, पशुपालन एवं सिंचाई के साधन; प्रमुख नगर, सांस्कृतिक धरोहर एवं प्रमुख पर्यटन स्थल; जनसंख्या एवं जनसांख्यिकीय विशेषताएं; अनुसूचित जाति (SC) एवं अनुसूचित जनजाति (ST) वितरण; परिवहन तंत्र, विद्युत संसाधन, औद्योगिक विकास एवं प्राकृतिक आपदाएँ' },
          { id: 'Test 06', date: '20 July 2026', time: '9:30–11:30 AM', type: 'UK Special', topic: 'Polity of Uttarakhand - I', syllabus: 'Governance system, Governor, Legislative Assembly, Chief Minister and Council of Ministers; Centre-State relations, Public services, UKPSC; Audit, Advocate General, High Court; Constitutional provisions for SC/ST and minorities.', syllabusHindi: 'शासन प्रणाली, राज्यपाल, विधान सभा, मुख्यमंत्री एवं मंत्रिपरिषद; केंद्र-राज्य संबंध, लोक सेवाएं, उत्तराखंड लोक सेवा आयोग (UKPSC); लेखा-परीक्षा, महाधिवक्ता, उच्च न्यायालय; अल्पसंख्यकों एवं वंचित वर्गों (SC/ST) के लिए विशेष संवैधानिक व विधिक प्रावधान' },
          { id: 'Test 07', date: '27 July 2026', time: '9:30–11:30 AM', type: 'UK Special', topic: 'Polity of Uttarakhand - II', syllabus: 'Local self-government and Panchayati Raj system; Community Development and Public Policy; Rights-related issues (education, employment, development); Good Governance: Anti-corruption, Lokayukta, Citizen Charter, e-governance, RTI, Samadhan Scheme.', syllabusHindi: 'स्थानीय स्वशासन और पंचायती राज व्यवस्था; सामुदायिक विकास एवं सार्वजनिक नीति; अधिकार संबंधी मुद्दे (शिक्षा, रोजगार, विकास); सुशासन: भ्रष्टाचार निवारण, लोकायुक्त, नागरिक चार्टर, ई-गवर्नेंस, RTI, समाधान योजना' },
          { id: 'Test 08', date: '03 Aug 2026', time: '9:30–11:30 AM', type: 'UK Special', topic: 'Economy of Uttarakhand', syllabus: 'State budget main features, public finance and fiscal policy; Natural, biological, energy resources, trade, commerce, industry; Planned development, agriculture, livestock, food security; HDI, tourism industry, economic role of herbs and culture.', syllabusHindi: 'अर्थव्यवस्था और राज्य बजट की मुख्य विशेषताएं, सार्वजनिक वित्त व राजकोषीय नीति; प्राकृतिक, जैविक और ऊर्जा संसाधन, व्यापार, वाणिज्य एवं उद्योग; नियोजित विकास, कृषि, पशुधन एवं खाद्य सुरक्षा; मानव विकास सूचकांक (HDI), पर्यटन उद्योग, जड़ी-बूटियों एवं संस्कृति की आर्थिक भूमिका' },
          { id: 'Test 09', date: '10 Aug 2026', time: '9:30–11:30 AM', type: 'UK Special', topic: 'Uttarakhand - Special Facts', syllabus: 'Latest state budget and financial analysis; Uttarakhand State Economic Survey; Latest Census data of the state; Important welfare schemes and projects.', syllabusHindi: 'नवीनतम राज्य बजट एवं वित्तीय विश्लेषण; उत्तराखंड राज्य आर्थिक सर्वेक्षण; राज्य की नवीनतम जनगणना आंकड़े; महत्वपूर्ण जनकल्याणकारी योजनाएँ एवं परियोजनाएँ' },
          { id: 'Test 10', date: '17 Aug 2026', time: '9:30–11:30 AM', type: 'UK Special', topic: 'Uttarakhand Current Affairs', syllabus: 'State-specific important current events; National and international events/personalities related to Uttarakhand.', syllabusHindi: 'राज्य-विशिष्ट महत्वपूर्ण समसामयिक घटनाएँ; राष्ट्रीय एवं अंतर्राष्ट्रीय स्तर पर उत्तराखंड से जुड़े प्रमुख घटनाक्रम व व्यक्तित्व' },
        ],
      },
      {
        title: 'Section 2: Sectional Tests - General Studies / सामान्य अध्ययन (6 Tests)',
        description: 'These 6 tests cover national GS topics integrated with comprehensive current affairs coverage. (ये 6 परीक्षाएं राष्ट्रीय सामान्य अध्ययन के विषयों एवं व्यापक समसामयिक घटनाओं को आच्छादित करती हैं।)',
        schedule: [
          { id: 'Test 11', date: '23 Aug 2026', time: '9:30–11:30 AM', type: 'GS Sectional', topic: 'History + Current Affairs', syllabus: 'Ancient and Medieval Indian History & Culture; Modern Indian History & National Movement; Current Affairs: June 2025 to October 2025.', syllabusHindi: 'प्राचीन भारत एवं मध्यकालीन भारत का इतिहास व संस्कृति; आधुनिक भारत का इतिहास एवं भारतीय राष्ट्रीय आंदोलन; समसामयिक घटनाएँ: जून 2025 से अक्टूबर 2025' },
          { id: 'Test 12', date: '27 Aug 2026', time: '9:30–11:30 AM', type: 'GS Sectional', topic: 'Geography + Current Affairs', syllabus: 'Physical Geography - principles and processes; Geography of India - physical, social, economic; Human Geography; Current Affairs: November 2025 to January 2026.', syllabusHindi: 'भौतिक भूगोल - सिद्धांत एवं प्रक्रियाएं; भारत का भूगोल - भौतिक, सामाजिक व आर्थिक पहलू; मानव भूगोल; समसामयिक घटनाएँ: नवंबर 2025 से जनवरी 2026' },
          { id: 'Test 13', date: '02 Sep 2026', time: '9:30–11:30 AM', type: 'GS Sectional', topic: 'Economy + Current Affairs', syllabus: 'Economic policy, LPG reforms; FDI, inflation, inclusive growth; Poverty and unemployment programs, HDI; Union Budget, economic planning; International organizations (WTO, IMF, SAARC, BRICS); Current Affairs: February 2026 to April 2026.', syllabusHindi: 'आर्थिक नीति, आर्थिक सुधार, उदारीकरण, निजीकरण और वैश्वीकरण (LPG); FDI, मुद्रास्फीति, समावेशी विकास; गरीबी और बेरोजगारी उन्मूलन कार्यक्रम, HDI; केंद्रीय बजट; अंतर्राष्ट्रीय संगठन: WTO, IBRD, IMF, SAARC, ASEAN, BRICS, OPEC, FERA, FEMA, PMLA; समसामयिक घटनाएँ: फरवरी 2026 से अप्रैल 2026' },
          { id: 'Test 14', date: '06 Sep 2026', time: '9:30–11:30 AM', type: 'GS Sectional', topic: 'Indian Polity & Constitution + Current Affairs', syllabus: 'Parliamentary system, coalition politics, regionalism, communalism, naxalism; Welfare of SC/ST/OBC/Minorities; Gender Politics; Constitution making, Preamble, Fundamental Rights, DPSP; Constitutional bodies (ECI, CAG, Lokpal); Current Affairs: May 2026 to July 2026.', syllabusHindi: 'संसदीय प्रणाली, गठबंधन राजनीति, क्षेत्रवाद, जातिवाद, साम्प्रदायिकता, नक्सलवाद व आतंकवाद; SC/ST/OBC/Minorities का कल्याण; जेंडर पॉलिटिक्स; संविधान निर्माण, प्रस्तावना, मौलिक अधिकार; संवैधानिक व विधिक निकाय (ECI, CAG, लोकपाल, लोकायुक्त); समसामयिक घटनाएँ: मई 2026 से जुलाई 2026' },
          { id: 'Test 15', date: '12 Sep 2026', time: '9:30–11:30 AM', type: 'GS Sectional', topic: 'Science, Technology & Ecology + Current Affairs', syllabus: 'Basic Science (Physics, Chemistry, Biology) practical applications; IT, Space, Biotech, and Defense developments; Ecology, environment protection, biodiversity, climate change; Current Affairs: August 2026 special.', syllabusHindi: 'बुनियादी विज्ञान (Physics, Chemistry, Biology) के व्यावहारिक अनुप्रयोग; सूचना प्रौद्योगिकी, अंतरिक्ष, जैव-प्रौद्योगिकी एवं रक्षा क्षेत्र में विकास; पारिस्थितिकी, पर्यावरण संरक्षण, जैव-विविधता एवं जलवायु परिवर्तन; समसामयिक घटनाएँ: अगस्त 2026' },
          { id: 'Test 16', date: '16 Sep 2026', time: '9:30–11:30 AM', type: 'GS Sectional', topic: 'Complete Current Affairs - Full Year', syllabus: 'National and international important annual current events (Full Mock); Various global indices, military exercises, major summits, and awards.', syllabusHindi: 'राष्ट्रीय एवं अंतर्राष्ट्रीय महत्व की संपूर्ण वार्षिक समसामयिक घटनाएं (Full Mock); विभिन्न वैश्विक सूचकांक, सैन्य अभ्यास, प्रमुख शिखर सम्मेलन एवं पुरस्कार' },
        ],
      },
      {
        title: 'Section 3: CSAT Tests / सीसैट परीक्षाएं (2 Tests)',
        description: 'Civil Services Aptitude Test covering quantitative aptitude, logical reasoning, and language ability. (सिविल सेवा अभिवृत्ति परीक्षा - मात्रात्मक अभिरुचि, तार्किक तर्क शक्ति एवं भाषा योग्यता।)',
        schedule: [
          { id: 'Test 17', date: '18 Sep 2026', time: '9:30–11:30 AM', type: 'CSAT', topic: 'Quantitative Aptitude & Logical Reasoning', syllabus: 'Quantitative Aptitude (Arithmetic, Algebra, Data Interpretation); Logical & Analytical Reasoning; Decision Making.', syllabusHindi: 'Quantitative Aptitude (अंकगणित, बीजगणित, डेटा व्याख्या - DI); Logical & Analytical Reasoning (तार्किक और विश्लेषणात्मक तर्क शक्ति, निर्णय क्षमता)' },
          { id: 'Test 18', date: '21 Sep 2026', time: '9:30–11:30 AM', type: 'CSAT', topic: 'Language Ability (Hindi & English)', syllabus: 'General Hindi Grammar, Unseen Passage, Language Comprehension; General English Comprehension, Grammar, and Interpersonal Skills.', syllabusHindi: 'सामान्य हिन्दी व्याकरण, अपठित गद्यांश एवं भाषा बोध; General English Comprehension, Grammar and Interpersonal Skills' },
        ],
      },
      {
        title: 'Section 4: Full-Length Tests / पूर्ण-लंबाई परीक्षाएं (4 Tests)',
        description: 'Complete exam-pattern full-length mock tests based on actual UKPSC exam pattern. (वास्तविक UKPSC परीक्षा पैटर्न पर आधारित संपूर्ण मॉक परीक्षाएं।)',
        schedule: [
          { id: 'FLT 01', date: '24 Sep 2026', time: '9:30–11:30 AM', type: 'Full Length', topic: 'Full-Length Test 01', syllabus: 'Complete syllabus mock test based on actual UKPSC exam pattern (General Studies).', syllabusHindi: 'वास्तविक परीक्षा पैटर्न पर आधारित पूर्ण पाठ्यक्रम मॉक टेस्ट (सामान्य अध्ययन)' },
          { id: 'FLT 02', date: '27 Sep 2026', time: '9:30–11:30 AM', type: 'Full Length', topic: 'Full-Length Test 02', syllabus: 'Complete syllabus mock test based on actual UKPSC exam pattern (General Studies).', syllabusHindi: 'वास्तविक परीक्षा पैटर्न पर आधारित पूर्ण पाठ्यक्रम मॉक टेस्ट (सामान्य अध्ययन)' },
          { id: 'FLT 03', date: '30 Sep 2026', time: '9:30–11:30 AM', type: 'Full Length', topic: 'Full-Length Test 03', syllabus: 'Complete syllabus mock test based on actual UKPSC exam pattern (General Studies).', syllabusHindi: 'वास्तविक परीक्षा पैटर्न पर आधारित पूर्ण पाठ्यक्रम मॉक टेस्ट (सामान्य अध्ययन)' },
          { id: 'FLT 04', date: '02 Oct 2026', time: '9:30–11:30 AM', type: 'Full Length', topic: 'Full-Length Test 04', syllabus: 'Complete syllabus mock test based on actual UKPSC exam pattern (General Studies).', syllabusHindi: 'वास्तविक परीक्षा पैटर्न पर आधारित पूर्ण पाठ्यक्रम मॉक टेस्ट (सामान्य अध्ययन)' },
        ],
      },
    ],
  },

  // ── 6. UKPCS Mains Test Series ─────────────────────────────────────────────
  {
    slug: 'ukpcs-mains',
    title: 'UKPCS Mains Test Series',
    subtitle: 'Uttarakhand Civil Services Main Examination',
    tagline: 'Evaluated answer writing for Uttarakhand Mains - date-wise schedule',
    description:
      'A comprehensive Mains answer writing test series designed for the Uttarakhand Civil Services Main Examination. Covers all GS papers with special focus on Uttarakhand-specific content. Each test is evaluated by experienced faculty with detailed feedback on structure, presentation, and content quality.',
    accentColor: 'orange',
    fee: { original: 8999, discounted: 4999 },
    totalTests: 12,
    highlights: [
      { label: 'Total Tests', value: '12' },
      { label: 'Sectional Tests', value: '8' },
      { label: 'Full-Length Tests', value: '4' },
      { label: 'UK Special Tests', value: 'Included' },
    ],
    executionNotes: [
      'All answers are evaluated by faculty with marks and written feedback returned within 72 hours.',
      'Special focus on Uttarakhand-specific content integration in every answer, including state maps and data.',
      'For enquiry and schedule details, contact the Greater Noida centre.',
    ],
    sections: [
      {
        title: 'Phase 1: Sectional Tests (8 Tests)',
        description: 'Covers all GS papers including Uttarakhand Special. Master answer structure and content for each paper.',
        schedule: [
          { id: 'ST-01', type: 'Sectional', topic: 'GS Paper 1', syllabus: 'History, Culture, and Society - national and Uttarakhand-specific content.' },
          { id: 'ST-02', type: 'Sectional', topic: 'GS Paper 2', syllabus: 'Polity, Governance, and International Relations - national and Uttarakhand-specific content.' },
          { id: 'ST-03', type: 'Sectional', topic: 'GS Paper 3', syllabus: 'Economy, Science & Technology, Environment - national and Uttarakhand-specific content.' },
          { id: 'ST-04', type: 'Sectional', topic: 'GS Paper 4 (Ethics)', syllabus: 'Ethics, Integrity and Aptitude - theory and case studies.' },
          { id: 'ST-05', type: 'Sectional - UK Special', topic: 'GS Paper 5 (UK Special)', syllabus: 'Uttarakhand History, Culture, Polity, Governance, Administrative structure, Social issues.' },
          { id: 'ST-06', type: 'Sectional - UK Special', topic: 'GS Paper 6 (UK Special)', syllabus: 'Uttarakhand Economy, Geography, Environment, Agriculture, Tourism, Infrastructure.' },
          { id: 'ST-07', type: 'Sectional', topic: 'General Hindi', syllabus: 'Hindi Grammar, Letter Writing, Precis Writing, Translation, Essay (Hindi).' },
          { id: 'ST-08', type: 'Sectional', topic: 'Essay & General English', syllabus: 'Essay writing techniques, structure, and presentation; General English comprehension.' },
        ],
      },
      {
        title: 'Phase 2: Full-Length Tests (4 Tests)',
        description: 'Simulate full exam conditions. Evaluated copies returned within 72 hours.',
        schedule: [
          { id: 'FLT-01', type: 'Full Length', topic: 'GS Papers 1 & 2 Combined', syllabus: 'Full-length simulation: History, Geography, Society, Polity, Governance, and IR.', marks: '400 Marks / 3 Hours' },
          { id: 'FLT-02', type: 'Full Length', topic: 'GS Papers 3 & 4 Combined', syllabus: 'Full-length simulation: Economy, Environment, S&T, Security, Ethics and Case Studies.', marks: '400 Marks / 3 Hours' },
          { id: 'FLT-03', type: 'Full Length - UK Special', topic: 'GS Papers 5 & 6 Combined', syllabus: 'Full-length simulation: Complete Uttarakhand Special - History, Polity, Economy, Geography, Environment.', marks: '400 Marks / 3 Hours' },
          { id: 'FLT-04', type: 'Full Length', topic: 'Complete Mains Simulation', syllabus: 'Grand final mock covering all papers - including General Hindi and Essay.', marks: 'All Papers' },
        ],
      },
    ],
  },
];
