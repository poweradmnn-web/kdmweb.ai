import { z } from "zod";

/**
 * Lead form shape + validation. Only name and email are required — everything
 * else is optional to keep the form a 2-minute job.
 */
export const leadSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address"),
  company: z.string().trim().optional(),
  need: z.string().optional(),
  message: z.string().trim().optional(),
});

export type Lead = z.infer<typeof leadSchema>;
