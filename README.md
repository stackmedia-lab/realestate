# Havenly — Real Estate Website

Production-ready Next.js 14 + Sanity CMS real estate marketplace inspired by Realtor.com.

## Features
- Home, Listings (with filters), Property Detail (gallery, map, agent card), Agents directory + profiles, Blog (Portable Text), Mortgage Calculator, Favorites (localStorage), About, Contact
- Sanity Studio embedded at `/studio` with schemas for Property, Agent, Post, City
- Mock data fallback so the site works instantly without Sanity
- Tailwind, Framer Motion, lucide-react, fully responsive
- Vercel-ready (`vercel.json`)

## Quick Start

```bash
npm install
npm run dev          # http://localhost:3000
```

## Sanity setup (optional)

1. Install Sanity CLI: `npm install -g sanity@latest`
2. Create project: `sanity init` — pick "production" dataset
3. Copy `.env.example` → `.env.local` and paste your `NEXT_PUBLIC_SANITY_PROJECT_ID`
4. Visit `/studio` in your running app to manage content
5. Add CORS origin in https://sanity.io/manage → API → CORS: add `http://localhost:3000` and your Vercel URL

## Vercel deployment

```bash
npm install -g vercel
vercel              # follow prompts
vercel --prod       # promote to production
```

Or via dashboard: import the repo on vercel.com — framework auto-detects as Next.js.

Environment variables to add in Vercel:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET` (production)
- `NEXT_PUBLIC_SANITY_API_VERSION` (2024-01-01)

## CLI cheatsheet

| Tool | Command |
|------|---------|
| Next dev | `npm run dev` |
| Next build | `npm run build` |
| Sanity init | `sanity init` |
| Sanity deploy studio | `sanity deploy` |
| Vercel deploy | `vercel --prod` |
