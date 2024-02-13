export interface ChampionMasteryDTO {
  puuid: string;
  championPointsUntilNextLevel: number;
  championId: string;
  lastPlayTime: number;
  championLevel: number;
  summonerId: string;
  championPoints: number;
  championPointsSinceLastLevel: number;
  tokensEarned: number;
  chestGranted: boolean;
  name?: string;
  image?: string;
}
