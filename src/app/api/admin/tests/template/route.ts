import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';

export async function GET() {
  const wb = XLSX.utils.book_new();

  const rows = [
    [
      'section', 'question_en',
      'option_a_en', 'option_b_en', 'option_c_en', 'option_d_en',
      'correct', 'question_hi',
      'option_a_hi', 'option_b_hi', 'option_c_hi', 'option_d_hi',
      'explanation_en', 'explanation_hi',
    ],
    [
      'General Studies',
      'Who is known as the Father of the Indian Constitution?',
      'Jawaharlal Nehru',
      'B.R. Ambedkar',
      'Sardar Patel',
      'Rajendra Prasad',
      'b',
      'भारतीय संविधान के जनक के रूप में किसे जाना जाता है?',
      'जवाहरलाल नेहरू',
      'बी.आर. अम्बेडकर',
      'सरदार पटेल',
      'राजेंद्र प्रसाद',
      'Dr. B.R. Ambedkar drafted the Indian Constitution and is widely regarded as its chief architect.',
      'डॉ. बी.आर. अम्बेडकर ने भारतीय संविधान का मसौदा तैयार किया और उन्हें इसका मुख्य वास्तुकार माना जाता है।',
    ],
    [
      'Current Affairs',
      'Which country hosted the G20 Summit in 2023?',
      'Brazil',
      'South Africa',
      'India',
      'USA',
      'c',
      '2023 में G20 शिखर सम्मेलन की मेजबानी किस देश ने की?',
      'ब्राज़ील',
      'दक्षिण अफ्रीका',
      'भारत',
      'अमेरिका',
      'India hosted the G20 Summit 2023 in New Delhi in September 2023.',
      'भारत ने सितंबर 2023 में नई दिल्ली में G20 शिखर सम्मेलन 2023 की मेजबानी की।',
    ],
  ];

  const ws = XLSX.utils.aoa_to_sheet(rows);

  // Column widths
  ws['!cols'] = [
    { wch: 20 }, { wch: 60 },
    { wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 30 },
    { wch: 10 }, { wch: 60 },
    { wch: 30 }, { wch: 30 }, { wch: 30 }, { wch: 30 },
    { wch: 60 }, { wch: 60 },
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
