import emailjs from '@emailjs/browser';

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const ENQUIRY_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export interface EnquiryData {
  name: string;
  email: string;
  phone: string;
  course?: string;
  message?: string;
}

export async function sendEnquiry(data: EnquiryData) {
  return emailjs.send(SERVICE_ID, ENQUIRY_TEMPLATE_ID, data as unknown as Record<string, unknown>, PUBLIC_KEY);
}
