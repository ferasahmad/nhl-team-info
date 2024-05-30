export type Team = {
  faceoffWinPct: number | null;
  gamesPlayed: number;
  goalsAgainst: number;
  goalsAgainstPerGame: number;
  goalsFor: number;
  goalsForPerGame: number;
  losses: number;
  otLosses: number | null;
  penaltyKillNetPct: number;
  penaltyKillPct: number;
  pointPct: number;
  points: number;
  powerPlayNetPct: number;
  powerPlayPct: number;
  regulationAndOtWins: number;
  seasonId: number;
  shotsAgainstPerGame: number;
  shotsForPerGame: number;
  teamFullName: string;
  teamId: number;
  ties: number | null;
  wins: number;
  winsInRegulation: number;
  winsInShootout: number;
};

export type TeamDetails = {
  id: number;
  franchiseId: number;
  fullName: string;
  leagueId: number;
  rawTricode: string;
  triCode: string;
};

export type CombinedTeamInfo = {
  id: number;
  teamFullName: string;
  wins: number;
  losses: number;
  gamesPlayed: number;
  points: number;
  ties: number | null;
  triCode: string;
};
