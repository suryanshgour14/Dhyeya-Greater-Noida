-- Rename English-only option columns to _en suffix (bilingual schema)
ALTER TABLE questions RENAME COLUMN option_a TO option_a_en;
ALTER TABLE questions RENAME COLUMN option_b TO option_b_en;
ALTER TABLE questions RENAME COLUMN option_c TO option_c_en;
ALTER TABLE questions RENAME COLUMN option_d TO option_d_en;

-- Add Hindi option columns and bilingual explanations
ALTER TABLE questions
  ADD COLUMN IF NOT EXISTS option_a_hi text,
  ADD COLUMN IF NOT EXISTS option_b_hi text,
  ADD COLUMN IF NOT EXISTS option_c_hi text,
  ADD COLUMN IF NOT EXISTS option_d_hi text,
  ADD COLUMN IF NOT EXISTS explanation_en text,
  ADD COLUMN IF NOT EXISTS explanation_hi text;
