import z from "zod";

// Zod Schema Definition
export const DataSchema = z.object({
  _id: z.string(),
  url: z.string(),
  rank: z.string(),
  riotID: z.string(),
});

type RankType = {
  rankName: string;
  rankImg: string;
}[];

export const ValidRanks: RankType = [
  {
    rankName: "Iron",
    rankImg:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/3/smallicon.png",
  },
  {
    rankName: "Bronze",
    rankImg:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/6/smallicon.png",
  },
  {
    rankName: "Gold",
    rankImg:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/9/smallicon.png",
  },
  {
    rankName: "Platinum",
    rankImg:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/12/smallicon.png",
  },
  {
    rankName: "Diamond",
    rankImg:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/15/smallicon.png",
  },
  {
    rankName: "Ascendant",
    rankImg:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/18/smallicon.png",
  },
  {
    rankName: "Immortal",
    rankImg:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/21/smallicon.png",
  },
  {
    rankName: "Radiant",
    rankImg:
      "https://media.valorant-api.com/competitivetiers/03621f52-342b-cf4e-4f86-9350a49c6d04/24/smallicon.png",
  },
];

export type DataIncoming = z.infer<typeof DataSchema>;
