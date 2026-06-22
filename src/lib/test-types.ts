// Shared TypeScript types for the test-series feature

export interface DBTest {
  id: string;
  title: string;
  title_hi: string | null;
  exam_type: string | null;
  total_duration_min: number;
  marks_per_q: number;
  negative_marks: number;
  sectional_timing: boolean;
  is_free: boolean;
  status: 'draft' | 'published';
  created_by: string | null;
  created_at: string;
}

export interface DBSection {
  id: string;
  test_id: string;
  name: string;
  name_hi: string | null;
  order_index: number;
  duration_min: number | null;
}

export interface DBQuestion {
  id: string;
  test_id: string;
  section_id: string;
  order_index: number;
  question_en: string;
  question_hi: string | null;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct: 'a' | 'b' | 'c' | 'd';
  created_at: string;
}

export type ClientQuestion = Omit<DBQuestion, 'correct'>;

export interface DBAttempt {
  id: string;
  student_id: string;
  test_id: string;
  started_at: string;
  submitted_at: string | null;
  status: 'in_progress' | 'submitted' | 'auto_submitted';
  score: number | null;
  total_correct: number | null;
  total_wrong: number | null;
  total_skipped: number | null;
  time_taken_sec: number | null;
  blur_count: number;
  progress: AttemptProgress | null;
  created_at: string;
}

export interface AttemptProgress {
  answers: Record<string, string>;       // questionId -> 'a'|'b'|'c'|'d'|''
  marked: string[];                       // questionIds marked for review
  visited: string[];                      // questionIds visited
  currentQ: string | null;
  sectionDeadlines?: Record<string, string>; // sectionId -> ISO time
  timePerQ?: Record<string, number>;     // questionId -> seconds
}

export interface DBAnswer {
  id: string;
  attempt_id: string;
  question_id: string;
  section_id: string;
  selected_option: string | null;
  is_correct: boolean;
  time_spent_sec: number;
}

// Excel row shape after parsing
export interface ParsedQuestion {
  rowNum: number;
  section: string;
  question_en: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct: string;
  question_hi: string;
  errors: string[];
}

export interface TestWithCounts extends DBTest {
  section_count: number;
  question_count: number;
}
