# IBRAR AI STUDIO

**Your Imagination, Powered by AI.** A bilingual (English / हिंदी) AI creation platform for text-to-image, image-to-video, photo editing, talking photos, voice generation, Hindi text-to-speech and an AI chat assistant — with Free and Premium plans.

This release is the full frontend product surface. Tools that require an external AI provider are clearly marked **Needs AI API** and show no fabricated output. Hindi TTS already works using the device's built-in speech engine.

## Screens
- `/` — homepage with prompt box, tools, gallery, pricing, FAQ
- `/create` — Creation Studio (`?tool=text-to-image|image-to-video|photo-edit|talking-photo|voice|chat|hindi-tts`)
- `/dashboard` — user dashboard (sample data)
- `/pricing` — Free / Premium / Studio plans
- `/login`, `/signup` — account screens (UI preview)

## Tech
TanStack Start (React 19), Tailwind CSS 4, shadcn/ui, lucide-react, deployed on Netlify. Showcase images are served through Netlify Image CDN.

## Run locally
```bash
pnpm install
netlify dev   # or: pnpm dev
```

## Security
No API keys are used in the browser. All future AI calls go through server routes using Netlify AI Gateway or server-side environment variables.

## Roadmap
See [PLAN.md](PLAN.md): accounts → database → AI chat & images → photo editing → voices & talking photo → video → payments → PWA/growth.
