# kdmweb.ai — agency website

Single-page, lead-generation-first marketing site for the kdmweb.ai studio.
Built with **Next.js (App Router) + TypeScript + Tailwind CSS**.

## Run it

> Requires **Node.js 18.18+** (LTS recommended). Install from https://nodejs.org, then
> restart your terminal so `node` and `npm` are on PATH.

```bash
npm install      # install dependencies
npm run dev      # start the dev server → http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Edit the brand (one file)

`src/config/brand.ts` is the single source of truth for **colors, fonts, email, and links**.
Change a hex there and the whole site updates (Tailwind reads from it).

Fill in these before launch (all marked with `// TODO` in the code):

- `email` — your real inbox (currently `hello@kdmweb.ai`); this is the `mailto:` target everywhere.
- `booking` — set `provider` (`"calcom"` or `"calendly"`) and paste your scheduling link into
  `url` to turn the "Book a free call" buttons into a real scheduler. While `url` is empty, those
  buttons smooth-scroll to the contact form (never a dead end).
- `social` — Instagram / LinkedIn / X / GitHub links (empty ones are hidden in the footer automatically).

## Where things live

```
src/
├─ config/brand.ts        # ← colors, fonts, email, booking + social links (edit here)
├─ content/site.ts        # ← all copy + case studies (swap here)
├─ app/                   # layout (fonts, SEO, JSON-LD), page, globals, sitemap, robots
│  └─ api/contact/        # server route — emails leads via Resend
├─ components/sections/   # Header, Hero, Services, ProblemSolution, Process, Work, About, Contact, Footer, MobileContactBar
├─ components/booking/    # BookingScripts + InlineBooking (Cal.com / Calendly)
├─ components/ui/         # Button, BookCallButton, Section, Container, Eyebrow, Reveal
├─ components/Logo.tsx    # inline SVG logo
├─ hooks/useInView.ts     # scroll-reveal (respects prefers-reduced-motion)
└─ lib/                   # leadSchema (zod), email (Resend), booking, links, cn
```

## Contact form → email (Resend)

The form posts to a server route at `src/app/api/contact/route.ts`, which emails you via
[Resend](https://resend.com). Validation runs client- **and** server-side; there's a honeypot plus
a basic per-IP rate limit for spam. If sending fails, the form shows an error with a visible
`mailto:` fallback so no lead is lost. Send logic is isolated in `src/lib/email.ts` (swap providers
there).

**Setup**

1. Create a free account at https://resend.com.
2. **Verify a sender:** under *Domains*, add `kdmweb.ai` and the DNS records Resend shows — this
   lets you send from `hello@kdmweb.ai`. (To test quickly, skip this and use `onboarding@resend.dev`
   as the from address.)
3. Create an API key under *API Keys*.
4. Copy `.env.local.example` → `.env.local` and fill in:
   ```
   RESEND_API_KEY=re_xxxxxxxx
   CONTACT_TO_EMAIL=you@yourinbox.com
   CONTACT_FROM_EMAIL=hello@kdmweb.ai     # a verified sender (or onboarding@resend.dev)
   ```
5. Restart `npm run dev` and submit the form — the email lands in `CONTACT_TO_EMAIL`, and hitting
   **Reply** goes straight to the visitor.

**In production (Vercel):** add the same three variables under *Project → Settings → Environment
Variables*, then redeploy. `.env.local` is gitignored — never commit real keys.

## Book a call

Scheduling lives in `src/config/brand.ts` under `booking`:

```ts
booking: {
  provider: "calcom",   // "calcom" (recommended) or "calendly" — one-line switch
  url: "",              // paste your link, e.g. "https://cal.com/your-name/intro"
}
```

Paste your link and **every "Book a free call" button opens the scheduler** (Cal.com modal /
Calendly popup), plus an **embedded calendar appears in the Contact section**. Until `url` is set,
those buttons gracefully smooth-scroll to the contact form. Get a free link at https://cal.com
or https://calendly.com.

## Still to add

- `public/og.png` — a 1200×630 social-share image (referenced in metadata).
- Swap in your real About story in `src/content/site.ts`.
