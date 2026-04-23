import { z } from "zod";

const campaignInputSchema = z.object({
  businessName: z.string().min(2).max(120),
  offerDetails: z.string().min(10).max(500),
  city: z.string().min(2).max(120),
  link: z.string().url(),
  visualStyle: z.string().min(2).max(120)
});

export type CampaignInputPayload = z.infer<typeof campaignInputSchema>;

export function parseCampaignInput(input: unknown) {
  return campaignInputSchema.parse(input);
}
