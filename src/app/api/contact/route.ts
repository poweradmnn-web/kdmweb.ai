import { NextResponse } from "next/server";
import { z } from "zod";
import { leadSchema } from "@/lib/leadSchema";
import { sendLeadEmail } from "@/lib/email";

// Reuse the form schema, plus a honeypot field bots tend to fill but humans don't.
const serverSchema = leadSchema.extend({
  company_website: z.string().optional(), // honeypot
});

// ── Basic in-memory rate limit (per server instance) ──────────────────────
// Enough to blunt casual abuse. For limits that hold across serverless
// instances, back this with a shared store (e.g. Upstash Redis). TODO if needed.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_REQUESTS;
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd ? fwd.split(",")[0] : "").trim() || "unknown";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = serverSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again." },
      { status: 400 },
    );
  }

  // Honeypot filled → pretend success without sending (don't tip off bots).
  if (parsed.data.company_website && parsed.data.company_website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { ok: false, error: "Too many requests — please try again in a few minutes." },
      { status: 429 },
    );
  }

  try {
    const { company_website: _honeypot, ...lead } = parsed.data;
    void _honeypot;
    await sendLeadEmail(lead);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { ok: false, error: "Could not send right now — please email us directly." },
      { status: 500 },
    );
  }
}
