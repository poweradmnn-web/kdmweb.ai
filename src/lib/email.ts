import type { Lead } from "./leadSchema";

/**
 * ── Email send logic (kept in ONE place so the provider is easy to swap) ──
 * Implemented with Resend's REST API (no SDK dependency). To move to another
 * provider (Postmark, SendGrid, SES, an SMTP relay, ...), replace the fetch
 * call in `sendLeadEmail` below and keep the same function signature.
 *
 * TODO: swap provider here if you ever move off Resend.
 */

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export type EmailConfig = { apiKey: string; to: string; from: string };

/** Reads + validates the email env vars. Throws a clear error if any are missing. */
export function getEmailConfig(): EmailConfig {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    throw new Error(
      "Email is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL and CONTACT_FROM_EMAIL in .env.local",
    );
  }
  return { apiKey, to, from };
}

export async function sendLeadEmail(lead: Lead): Promise<void> {
  const { apiKey, to, from } = getEmailConfig();

  const subject = `New enquiry from ${lead.name}${lead.company ? ` — ${lead.company}` : ""}`;

  const fields: Array<[string, string | undefined]> = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Company", lead.company],
    ["Needs", lead.need],
  ];
  const present = fields.filter(([, v]) => v && v.trim() !== "");

  const text =
    present.map(([k, v]) => `${k}: ${v}`).join("\n") +
    `\n\nMessage:\n${lead.message?.trim() || "(no message)"}`;

  const html = `
    <div style="font-family:system-ui,-apple-system,sans-serif;font-size:15px;color:#111;line-height:1.6">
      <h2 style="margin:0 0 12px">New enquiry — kdmweb.ai</h2>
      <table style="border-collapse:collapse">
        ${present
          .map(
            ([k, v]) =>
              `<tr><td style="padding:4px 16px 4px 0;color:#666;vertical-align:top">${k}</td>` +
              `<td style="padding:4px 0"><strong>${escapeHtml(v as string)}</strong></td></tr>`,
          )
          .join("")}
      </table>
      <p style="margin:16px 0 4px;color:#666">Message</p>
      <p style="margin:0;white-space:pre-wrap">${escapeHtml(lead.message?.trim() || "(no message)")}</p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email, // so you can just hit "Reply" to answer the visitor
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend API error ${res.status}: ${detail}`);
  }
}
