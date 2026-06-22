import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function GET() {
  const wb = XLSX.utils.book_new();

  const rows = [
    ['section', 'question_en', 'option_a', 'option_b', 'option_c', 'option_d', 'correct', 'question_hi'],
    [
      'General Studies',
      'Who is known as the Father of the Indian Constitution?',
      'Jawaharlal Nehru',
      'B.R. Ambedkar',
      'Sardar Patel',
      'Rajendra Prasad',
      'b',
      'भारतीय संविधान के जनक के रूप में किसे जाना जाता है?',
    ],
    [
      'Current Affairs',
      'Which country hosted the G20 Summit in 2023?',
      'Brazil',
      'South Africa',
      'India',
      'USA',
      'c',
      '',
    ],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Column widths
  ws['!cols'] = [
    { wch: 20 }, { wch: 60 }, { wch: 30 }, { wch: 30 },
    { wch: 30 }, { wch: 30 }, { wch: 10 }, { wch: 60 },
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Questions');

  const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

  return new NextResponse(buf, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="question_template.xlsx"',
    },
  });
}
