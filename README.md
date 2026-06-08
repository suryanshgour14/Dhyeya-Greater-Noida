# Dhyeya IAS Greater Noida — Website

A full-stack Next.js 14 website for **Dhyeya IAS Greater Noida** UPSC coaching institute, built with App Router, TypeScript, and a modern tech stack.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Shadcn/UI |
| Animations | Framer Motion + Lenis Smooth Scroll |
| i18n | next-intl (English + Hindi) |
| Auth & DB | Supabase |
| CMS | Sanity.io |
| Images | Cloudinary |
| Forms | React Hook Form + Zod |
| Email | EmailJS |

## Quick Start

### 1. Install dependencies

```bash
cd dhyeya-greater-noida
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Fill in all values in `.env.local`:
- **Supabase**: Create project at supabase.com → copy URL & anon key
- **Sanity**: Create project at sanity.io → copy project ID
- **Cloudinary**: Create account → copy cloud name
- **EmailJS**: Create account → set up service & template

### 3. Run development server

```bash
npm run dev
```

Open http://localhost:3000/en in your browser.

### 4. Sanity Studio

Visit http://localhost:3000/studio to manage all content.

## Project Structure

```
src/
├── app/[locale]/          # All pages (en/hi routes)
├── components/
│   ├── layout/            # Navbar, Footer, AnnouncementBar
│   ├── home/              # Homepage sections
│   ├── courses/           # Course components
│   ├── faculty/           # Faculty cards
│   ├── toppers/           # Results/toppers
│   ├── blog/              # Current affairs
│   ├── forms/             # All forms with validation
│   ├── shared/            # Reusable utilities
│   ├── animations/        # Framer Motion wrappers
│   └── ui/                # Shadcn components
├── lib/
│   ├── supabase/          # Browser + server clients
│   ├── sanity/            # Client, queries, image helper
│   ├── validations.ts     # Zod schemas
│   ├── constants.ts       # Site-wide constants
│   └── utils.ts           # cn(), formatDate(), etc.
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript interfaces
└── i18n/                  # next-intl config
locales/
├── en/                    # 8 English JSON files
└── hi/                    # 8 Hindi JSON files
sanity/
├── schemas/               # 7 Sanity document schemas
├── sanity.config.ts       # Studio config
└── sanity.cli.ts          # CLI config
```

## Available Routes

| Route | Description |
|---|---|
| `/en` | Homepage |
| `/en/courses` | Course listing |
| `/en/courses/[slug]` | Course detail |
| `/en/about` | About page |
| `/en/faculty` | Faculty page |
| `/en/results` | Toppers & results |
| `/en/current-affairs` | Blog listing |
| `/en/current-affairs/[slug]` | Article detail |
| `/en/magazine` | Monthly magazine |
| `/en/contact` | Contact page |
| `/en/login` | Student login |
| `/en/signup` | Registration |
| `/en/dashboard` | Protected student portal |
| `/studio` | Sanity CMS Studio |

Replace `en` with `hi` for Hindi versions.

## Supabase Database Setup

Run these SQL commands in your Supabase SQL editor:

```sql
-- Profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  name text,
  phone text,
  email text,
  enrolled_courses text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enquiries table
create table enquiries (
  id bigserial primary key,
  name text not null,
  email text not null,
  phone text not null,
  course text,
  message text,
  status text default 'new' check (status in ('new','contacted','converted','closed')),
  created_at timestamptz default now()
);

-- Row Level Security
alter table profiles enable row level security;
alter table enquiries enable row level security;

create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Anyone can insert enquiry" on enquiries for insert with check (true);
```

## Deployment

```bash
npm run build
```

Deploy to Vercel — connect your repo and add environment variables in the dashboard.

## License

© 2024 Dhyeya IAS Greater Noida. All rights reserved.
