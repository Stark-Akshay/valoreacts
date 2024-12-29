import z from "zod";

// Zod Schema Definition
export const DataSchema = z.object({
  _id: z.string(),
  url: z.string(),
  rank: z.string(),
  riotID: z.string(),
});

export const ValidRanks: string[] = [
  "Iron",
  "Bronze",
  "Gold",
  "Platinum",
  "Diamond",
  "Ascendant",
  "Immortal",
  "Radiant",
];

export type DataIncoming = z.infer<typeof DataSchema>;
