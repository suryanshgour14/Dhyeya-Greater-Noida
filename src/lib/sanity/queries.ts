import { groq } from 'next-sanity';

export const coursesQuery = groq`
  *[_type == "course"] | order(order asc) {
    _id,
    title,
    slug,
    description,
    duration,
    medium,
    fee,
    seats,
    category,
    image,
    featured
  }
`;

export const courseBySlugQuery = groq`
  *[_type == "course" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    overview,
    syllabus,
    duration,
    medium,
    fee,
    seats,
    category,
    image,
    faculty[]->{name, designation, image}
  }
`;

export const facultyQuery = groq`
  *[_type == "faculty"] | order(order asc) {
    _id,
    name,
    designation,
    specialization,
    experience,
    bio,
    image
  }
`;

export const toppersQuery = groq`
  *[_type == "toppers"] | order(rank asc) {
    _id,
    name,
    rank,
    year,
    exam,
    service,
    optional,
    image,
    message
  }
`;

export const currentAffairsQuery = groq`
  *[_type == "currentAffairs"] | order(publishedAt desc) {
    _id,
    title,
    titleHi,
    slug,
    excerpt,
    excerptHi,
    category,
    gsRelevance,
    tags,
    isImportant,
    publishedAt,
    mainImage
  }
`;

export const currentAffairsByCategory = groq`
  *[_type == "currentAffairs" && category == $category] | order(publishedAt desc) {
    _id,
    title,
    titleHi,
    slug,
    excerpt,
    excerptHi,
    category,
    gsRelevance,
    tags,
    isImportant,
    publishedAt,
    mainImage
  }
`;

export const currentAffairsBySlugQuery = groq`
  *[_type == "currentAffairs" && slug.current == $slug][0] {
    _id,
    title,
    titleHi,
    slug,
    excerpt,
    excerptHi,
    body,
    bodyHi,
    category,
    gsRelevance,
    tags,
    isImportant,
    publishedAt,
    mainImage
  }
`;

export const relatedCurrentAffairsQuery = groq`
  *[_type == "currentAffairs" && category == $category && slug.current != $slug] | order(publishedAt desc) [0..3] {
    _id,
    title,
    slug,
    excerpt,
    category,
    publishedAt,
    mainImage
  }
`;

export const batchesQuery = groq`
  *[_type == "batches" && isActive == true] | order(startDate asc) {
    _id,
    title,
    course->{title, slug},
    startDate,
    medium,
    seats,
    seatsLeft,
    fee
  }
`;

export const magazinesQuery = groq`
  *[_type == "magazine"] | order(year desc, publishedAt desc) {
    _id,
    title,
    slug,
    month,
    year,
    issueNumber,
    coverImage,
    description,
    topics,
    pageCount,
    pdfFile,
    isFree,
    publishedAt
  }
`;

export const announcementsQuery = groq`
  *[_type == "announcements" && isActive == true] | order(priority desc) {
    _id,
    text,
    link,
    isActive
  }
`;
