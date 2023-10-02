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
    [key: string]: number;
  };
  goalsSoFarInSeason: number;
  videoClipUrl: string;
  videoThumbnailUrl: string;
}

export interface SingleLiigaGame {
  game: {
    id: number;
    season: number;
    start: string;
    homeTeam: SingleGameTeam;
    awayTeam: SingleGameTeam;
    winningShotCompetitionEvents: any[];
    periods: SingleGamePeriod[];
    finishedType: string;
    started: boolean;
    ended: boolean;
    gameTime: number;
    spectators: number;
    buyTicketsUrl: string;
    gamblingEvent: GamblingEvent;
    cacheUpdateDate: string;
    stale: boolean;
    serie: string;
  };
  awards: any[];
  homeTeamPlayers: LiigaPlayer[]
  awayTeamPlayers: LiigaPlayer[]
}

export interface GamblingEvent {
  homeTeamOdds: number;
  awayTeamOdds: number;
  tieOdds: number;
  url: string;
}

export interface SingleGamePeriod {
  index: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  category: string;
  startTime: number;
  endTime: number;
}

export interface SingleGameTeam {
  teamId: string;
  teamPlaceholder: string | null;
  teamName: string;
  goals: number;
  timeOut: any | null;
  goalEvents: any[];
  penaltyEvents: any[];
  goalKeeperEvents: any[];
  goalKeeperChanges: any[];
  powerplayInstances: number;
  powerplayGoals: number;
  shortHandedInstances: number;
  shortHandedGoals: number;
  ranking: any | null;
  gameStartDateTime: string;
}

export interface LiigaPlayer {
  id: number;
  teamId: string;
  teamName: string;
  line: any | null;
  countryOfBirth: string;
  placeOfBirth: string;
  dateOfBirth: string;
  nationality: string;
  firstName: string;
  lastName: string;
  role: string;
  roleCode: string;
  handedness: string;
  height: number;
  weight: number;
  captain: boolean;
  rookie: boolean;
  alternateCaptain: boolean;
  jersey: number;
  pictureUrl: string;
  injured: boolean;
  suspended: boolean;
  awards: any | null;
  sponsors: any | null;
}
