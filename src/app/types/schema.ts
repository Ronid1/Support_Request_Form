import { z } from "zod";

export const issueTypes = [
  "Bug Report",
  "Feature Request",
  "General Inquiry",
] as const;

export const tags = ["UI", "Backend", "Performance"] as const;

export const schema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  issueType: z.enum(issueTypes),
  tags: z.optional(z.array(z.enum(tags))),
  stepsToReproduce: z
    .array(
      z.object({
        text: z.string().min(5),
      })
    )
    .min(1),
});

export type FormFields = z.infer<typeof schema>;
