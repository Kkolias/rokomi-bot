import { LiigaSeries } from "enums/liiga.enum";


export interface LiigaGame {
  id: number;
  season: number;
  start: string;
  end: string;
  homeTeam: GameTeam;
  awayTeam: GameTeam;
  finishedType: string;
  started: true;
  ended: true;
  gameTime: number;
  spectators: number;
  cacheUpdateDate: string;
  stale: boolean;
  serie: LiigaSeries;
}

export interface GameTeam {
    teamId: string;
    teamPlaceholder: string | null; // ?
    teamName: string;
    goals: number;
    timeOut: string | null; // ?
    goalEvents: GoalEvent[];
    powerplayInstances: number;
    powerplayGoals: number;
    shortHandedInstances: number;
    shortHandedGoals: number;
    ranking: number | null;
    gameStartDateTime: string;
  }

  export interface GoalEvent {
    scorerPlayerId: number;
    logTime: string;
    winningGoal: boolean;
    gameTime: number;
    period: number;
    eventId: number;
    goalTypes: string[];
    assistantPlayerIds: number[];
    plusPlayerIds: string;
    minusPlayerIds: string;
    homeTeamScore: number;
    awayTeamScore: number;
    assistsSoFarInSeason: {
      [key: string]: number
    };
    goalsSoFarInSeason: number;
    videoClipUrl: string;
    videoThumbnailUrl: string;
  }