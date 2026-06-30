import { brand } from "@/config/brand";

/** Prefilled mailto link so a click opens the user's mail app ready to send. */
export function mailtoHref(opts?: { subject?: string; body?: string }): string {
  const subject = opts?.subject ?? "Project enquiry — kdmweb.ai";
  const body =
    opts?.body ??
    "Hi kdmweb.ai team,\n\nHere's what I'm looking to build:\n\n- What I need: \n- Timeline: \n- Anything else: \n\nThanks!";
  const params = new URLSearchParams({ subject, body });
  return `mailto:${brand.email}?${params.toString()}`;
}
