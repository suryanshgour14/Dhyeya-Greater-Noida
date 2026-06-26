-- Run AFTER uploading the PDFs to the 'resources' Supabase Storage bucket.
-- File paths below must exactly match what Supabase Storage shows after upload.

insert into resources (title, description, category, file_path, file_size_kb, is_active) values

  (
    'Ghanachakra UPPSC Preview – General Studies',
    'Complete GS preview for UPPSC aspirants by Ghanachakra',
    'UPPCS Notes',
    'Ghanachakra_UPPSC_Preview_General_Studies.pdf',
    11258,
    true
  ),
  (
    'GC Science Pointer',
    'Comprehensive science pointer notes for GS Paper I',
    'GS Notes',
    'GC_SCIENCE POINTER.pdf',
    20447,
    true
  ),
  (
    'GC Indian History',
    'Indian History notes for UPSC & State PCS',
    'GS Notes',
    'GC_Indian_History.pdf',
    8910,
    true
  ),
  (
    'GC Indian Polity',
    'Indian Polity notes for UPSC & State PCS',
    'GS Notes',
    'GC_Indian Polity.pdf',
    6982,
    true
  ),
  (
    'GC History Pointer',
    'Quick-revision History pointer notes',
    'GS Notes',
    'GC_HISTORY POINTER.pdf',
    3300,
    true
  ),
  (
    'UP GK Previous Year Questions (English)',
    'UP General Knowledge previous year questions in English',
    'Previous Year Papers',
    'UP GK PYQ ENG.pdf',
    6481,
    true
  ),
  (
    'GS Pointers – Indian Polity',
    'Quick-revision Indian Polity GS pointers',
    'GS Notes',
    'GS pointers Indian Polity.pdf',
    12602,
    true
  ),
  (
    'Ghatnachakra General Science Part 7 – 2025',
    'General Science Part 7 (2025 edition) by Ghatnachakra',
    'GS Notes',
    'Ghatnachakra_General_Science_Part_7_2025.pdf',
    10133,
    true
  );
