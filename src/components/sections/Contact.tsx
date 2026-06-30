"use client";

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, ArrowRight, CalendarCheck, CheckCircle2, Mail } from "lucide-react";
import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Button, { buttonClasses } from "@/components/ui/Button";
import BookCallButton from "@/components/ui/BookCallButton";
import InlineBooking from "@/components/booking/InlineBooking";
import { brand } from "@/config/brand";
import { contact } from "@/content/site";
import { leadSchema, type Lead } from "@/lib/leadSchema";
import { mailtoHref } from "@/lib/links";
import { isBookingEnabled } from "@/lib/booking";
import { cn } from "@/lib/cn";

const fieldBase =
  "w-full rounded-xl border border-line bg-ink px-4 py-3 text-sm text-fg placeholder:text-muted/70 transition-colors focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const honeypotRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Lead>({
    resolver: zodResolver(leadSchema),
    mode: "onTouched",
  });

  const onSubmit = async (data: Lead) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company_website: honeypotRef.current?.value ?? "" }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error || "Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contact" labelledBy="contact-heading">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        {/* Left: copy + low-friction alternatives */}
        <div>
          <Eyebrow>{contact.eyebrow}</Eyebrow>
          <h2 id="contact-heading" className="mt-5 text-2xl font-semibold sm:text-3xl">
            {contact.heading}
          </h2>
          <p className="mt-4 max-w-md text-base text-muted">{contact.subhead}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a
              href={mailtoHref()}
              className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 transition-colors hover:border-accent/40"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 text-accent">
                <Mail size={18} aria-hidden />
              </span>
              <span>
                <span className="block text-xs text-muted">{contact.emailPrompt}</span>
                <span className="block font-mono text-sm text-fg">{brand.email}</span>
              </span>
            </a>

            <BookCallButton
              ariaLabel="Book a free call"
              className="group flex items-center gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-left transition-colors hover:border-accent/40"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-surface-2 text-accent">
                <CalendarCheck size={18} aria-hidden />
              </span>
              <span>
                <span className="block text-xs text-muted">No obligation</span>
                <span className="block text-sm text-fg">{contact.bookPrompt}</span>
              </span>
            </BookCallButton>
          </div>
        </div>

        {/* Right: the form / success state */}
        <div className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
          {status === "success" ? (
            <div role="status" className="flex flex-col items-start py-6">
              <CheckCircle2 size={40} className="text-accent" aria-hidden />
              <h3 className="mt-4 text-lg font-semibold">{contact.success.heading}</h3>
              <p className="mt-2 text-sm text-muted">{contact.success.body}</p>
              <BookCallButton
                ariaLabel="Book a free call"
                className={buttonClasses("primary", "md", "mt-6")}
              >
                <CalendarCheck size={16} aria-hidden />
                Book a free call
              </BookCallButton>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
              {/* Honeypot — hidden from people, tempting to bots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                <label>
                  Company website (leave blank)
                  <input ref={honeypotRef} type="text" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" required error={errors.name?.message} htmlFor="name">
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={cn(fieldBase, errors.name && "border-red-400/60")}
                    {...register("name")}
                  />
                </Field>

                <Field label="Email" required error={errors.email?.message} htmlFor="email">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={cn(fieldBase, errors.email && "border-red-400/60")}
                    {...register("email")}
                  />
                </Field>
              </div>

              <Field label="Company" htmlFor="company" optional>
                <input
                  id="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Company name"
                  className={fieldBase}
                  {...register("company")}
                />
              </Field>

              <Field label="What do you need?" htmlFor="need" optional>
                <select id="need" className={cn(fieldBase, "appearance-none")} {...register("need")}>
                  <option value="">Select one…</option>
                  {contact.needOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Message" htmlFor="message" optional>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="A sentence or two about your project…"
                  className={cn(fieldBase, "resize-y")}
                  {...register("message")}
                />
              </Field>

              {status === "error" && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm text-red-200"
                >
                  <AlertCircle size={18} aria-hidden className="mt-0.5 shrink-0" />
                  <span>
                    Couldn&apos;t send your message. Please email us directly at{" "}
                    <a href={mailtoHref()} className="font-mono underline">
                      {brand.email}
                    </a>
                    .
                  </span>
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={status === "loading"}
                className="mt-1 w-full"
              >
                {status === "loading" ? "Sending…" : contact.submitLabel}
                {status !== "loading" && <ArrowRight size={18} aria-hidden />}
              </Button>

              <p className="text-center text-xs text-muted">{contact.reassurance}</p>
            </form>
          )}
        </div>
      </div>

      {/* Embedded scheduler — appears once a booking link is set in brand.ts. */}
      {isBookingEnabled() && (
        <div className="mt-14 border-t border-line pt-12">
          <h3 className="text-lg font-semibold">Prefer to pick a time now?</h3>
          <p className="mt-1 text-sm text-muted">
            Grab a slot that works for you — no back-and-forth.
          </p>
          <div className="mt-6">
            <InlineBooking />
          </div>
        </div>
      )}
    </Section>
  );
}

function Field({
  label,
  htmlFor,
  children,
  error,
  required,
  optional,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
  optional?: boolean;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-1.5 text-sm text-fg">
        {label}
        {required && <span className="text-accent">*</span>}
        {optional && <span className="text-xs text-muted">(optional)</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
