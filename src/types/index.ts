export interface Course {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  overview?: string;
  duration: string;
  medium: 'hindi' | 'english' | 'bilingual';
  fee: number;
  seats: number;
  seatsLeft?: number;
  category: 'foundation' | 'prelims' | 'mains' | 'interview' | 'optional';
  image?: SanityImage;
  featured?: boolean;
}

export interface Faculty {
  _id: string;
  name: string;
  designation: string;
  specialization: string;
  experience: string;
  bio?: string;
  image?: SanityImage;
  order?: number;
}

export interface Topper {
  _id: string;
  name: string;
  rank: string;
  year: number;
  exam: 'UPSC CSE' | 'UPPCS' | 'Other';
  service?: string;
  optional?: string;
  image?: SanityImage;
  message?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  body?: PortableTextBlock[];
  category: string;
  publishedAt: string;
  mainImage?: SanityImage;
}

export interface Batch {
  _id: string;
  title: string;
  course: { title: string; slug: { current: string } };
  startDate: string;
  medium: string;
  seats: number;
  seatsLeft: number;
  fee: number;
}

export interface Magazine {
  _id: string;
  title: string;
  month: string;
  year: number;
  coverImage?: SanityImage;
  pdfFile?: { asset: { url: string } };
}

export interface SanityImage {
  asset: { _ref: string; url?: string };
  alt?: string;
}

export interface PortableTextBlock {
  _type: string;
  _key: string;
  children?: Array<{ text: string; marks?: string[] }>;
  style?: string;
}
