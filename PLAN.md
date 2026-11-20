# IBRAR AI STUDIO — Product Roadmap

Bilingual (English/Hindi) AI creation platform. Each milestone is a small, self-contained release.

## ✅ Milestone 1 — Product surface (done)
- Branded homepage: "Your Imagination, Powered by AI" hero, prompt box that hands off to the studio, tools grid, concept-art gallery, how-it-works, pricing, FAQ.
- Creation Studio (`/create?tool=…`) with complete interfaces for all 7 tools. Tools needing an AI provider are clearly badged **Needs AI API** and never show fake output.
- Hindi Text-to-Speech works today via the browser's Web Speech API.
- Dashboard (`/dashboard`) on sample data from `src/lib/fixtures.ts`.
- Login / signup screens (UI only), Free / Premium / Studio pricing (INR, monthly/yearly).
- Full EN/हिंदी language switch, persisted per device.

## Milestone 2 — Accounts (Netlify Identity)
- Wire `/login` and `/signup` to `@netlify/identity` (email + Google), password recovery.
- Protect `/dashboard` and `/create` generation actions; show the signed-in user in the header.

## Milestone 3 — Data model (Netlify Database + Blobs)
- Tables: `profiles` (plan, credits), `generations` (tool, prompt, status, output key), `credit_ledger`.
- Store generated media in Netlify Blobs; swap `src/lib/fixtures.ts` for real queries.
- Daily free-credit reset (scheduled function).

## Milestone 4 — AI Chat + Text-to-Image (Netlify AI Gateway)
- Server routes call the AI Gateway (no keys in the browser): streaming chat assistant (Hindi/English) and Gemini image generation.
- Credit deduction per request, rate limiting, prompt safety filtering.

## Milestone 5 — Photo editing
- Background removal, enhance, restore, upscale via image models; before/after viewer.

## Milestone 6 — Voice, premium Hindi TTS, Talking Photo
- Integrate a voice provider (e.g. ElevenLabs) for studio-quality English/Hindi voices and downloadable audio.
- Talking photo (lip-sync) provider integration; long jobs run in background functions with status polling.

## Milestone 7 — Image to Video
- Video model integration via background functions; progress UI and gallery playback.

## Milestone 8 — Monetization
- Payment provider (Razorpay or Stripe) checkout for Premium/Studio, webhooks updating plan + credits, invoices, plan management page.
- Watermarking for Free exports.

## Milestone 9 — Polish & growth
- PWA install for Android/iPhone, share to WhatsApp/Instagram, public gallery, SEO pages per tool, analytics.
