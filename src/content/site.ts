/**
 * All site copy lives here so it can be swapped without touching components.
 * TODO: replace placeholder case studies and the About story with real content.
 */

export const hero = {
  eyebrow: "Modern studio · AI as leverage",
  headline: "Websites, apps, and systems — shipped in weeks, not months.",
  subhead:
    "kdmweb.ai is a modern studio that builds custom digital products using AI as leverage. You get agency-grade quality at a fraction of the cost and timeline. Tell us what you need — we reply within 24 hours.",
  primaryCta: "Book a free call",
  secondaryCta: "Email us",
  microcopy: "No obligation · Reply within 24h",
} as const;

export const services = [
  {
    id: "websites",
    icon: "Globe",
    title: "Websites",
    problem:
      "Your site is your first impression, and a slow or dated one quietly costs you customers. We design and build fast, modern, conversion-focused websites that earn trust and drive action.",
    bullets: ["Marketing sites", "Landing pages", "E-commerce", "Redesigns"],
    cta: "Start a website project",
  },
  {
    id: "apps",
    icon: "AppWindow",
    title: "Apps",
    problem:
      "Got an idea, or a manual process begging to be an app? We build web and mobile apps — MVPs to full products — fast enough to test in the real market before your budget runs out.",
    bullets: ["Web apps", "MVPs", "Customer portals", "Dashboards"],
    cta: "Start an app project",
  },
  {
    id: "systems",
    icon: "Workflow",
    title: "Systems & Automations",
    problem:
      "Your team is drowning in manual work and disconnected tools. We build the internal systems, integrations, and automations that handle the busywork — so your people do the work that matters.",
    bullets: ["Internal tools", "Integrations", "Automations", "AI workflows"],
    cta: "Automate something",
  },
] as const;

export const problemSolution = {
  eyebrow: "Why kdmweb.ai",
  heading: "The old way vs. the kdmweb.ai way",
  rows: [
    {
      problem: "Agencies quote 3–6 months and a five-figure invoice before a pixel ships.",
      solution:
        "We scope in days and ship in weeks — senior people on your project, not juniors learning on your dime.",
    },
    {
      problem: "Freelancers are a gamble; no-code hits a wall the moment you need something custom.",
      solution: "You get custom, owned-by-you software — no platform lock-in, no ceiling.",
    },
    {
      problem: "You explain the brief ten times and still get something off.",
      solution:
        "We use AI to prototype fast, so you see and steer the real thing early — not when it's too late to change.",
    },
  ],
} as const;

export const process = {
  eyebrow: "Process",
  heading: "From idea to shipped — in four steps",
  steps: [
    {
      title: "Discovery call (free)",
      body: "A 30-minute call. You tell us what you need; we tell you straight whether and how we can build it, with a rough timeline and price.",
    },
    {
      title: "Scope & quote",
      body: "Within a couple of days: a clear plan, fixed scope, and a flat price. No surprises.",
    },
    {
      title: "Build (with AI leverage)",
      body: "We design and build in fast iterations, sharing real progress so you steer as we go — not at the end.",
    },
    {
      title: "Ship & support",
      body: "We launch, hand over, and stay available. You own everything we build.",
    },
  ],
} as const;

export const work = {
  eyebrow: "Selected work",
  heading: "Sites we've shipped",
  cases: [
    {
      client: "KDM Ventilation",
      sector: "Ventilation",
      result:
        "A modern, lead-generating site for a Stockholm ventilation company — clear service pages, a project gallery, and an easy free-inspection request form.",
      url: "https://kdmvent.se",
    },
    {
      client: "OS Properties",
      sector: "Property management",
      result:
        "A clear, service-led website for a Stockholm & Uppsala property management firm — service breakdowns, their four-step process, and an easy quote-request form.",
      url: "https://osproperties.se",
    },
  ],
} as const;

export const about = {
  eyebrow: "About",
  heading: "A small, senior studio built for speed",
  // TODO: swap in real founder name / story.
  body: "kdmweb.ai is a small, senior studio that builds digital products the modern way. We pair experienced designers and engineers with AI as leverage — automating the repetitive parts so our people spend their time on architecture, design, and the details that make a product great. The result is the quality you'd expect from a top agency, delivered faster and priced for businesses that can't justify a six-month engagement. No bloated teams, no endless meetings, no jargon — just the thing you need, built and shipped.",
  stats: [
    { value: "2–6 wks", label: "Typical delivery" },
    { value: "Flat", label: "Fixed-price scope" },
    { value: "100%", label: "You own the code" },
    { value: "<24h", label: "Reply time" },
  ],
} as const;

export const contact = {
  eyebrow: "Contact",
  heading: "Tell us what you need.",
  subhead:
    "Two minutes, no obligation. Fill the form or email us directly — we reply within 24 hours.",
  submitLabel: "Send it over",
  emailPrompt: "Prefer email?",
  bookPrompt: "Or book a free call",
  reassurance: "We'll never share your details.",
  needOptions: [
    "Website",
    "App",
    "System or automation",
    "Not sure yet",
  ],
  success: {
    heading: "Thanks — we'll reply within 24 hours.",
    body: "Want to skip the wait? Book a free call and we'll talk it through.",
  },
} as const;

export const footer = {
  blurb: "A modern studio building websites, apps, and systems with AI as leverage.",
  finalCtaHeading: "Have something to build?",
  finalCtaBody: "Tell us what you need — 2 minutes, no obligation.",
} as const;
