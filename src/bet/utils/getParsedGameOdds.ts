import { SingleLiigaGame } from "interfaces/liiga";

export default function getParsedGameOdds(
  game: SingleLiigaGame
): { oddsHomeTeam: number | null; oddsAwayTeam: number | null; oddsTie: number | null } {
  const oddsHomeTeamRaw = game?.game?.gamblingEvent?.homeTeamOdds;
  const oddsAwayTeamRaw = game?.game?.gamblingEvent?.awayTeamOdds;
  const tieOddsRaw = game?.game?.gamblingEvent?.tieOdds;

  const oddsHomeTeam = parseOdds(oddsHomeTeamRaw);
  const oddsAwayTeam = parseOdds(oddsAwayTeamRaw);
  const oddsTie = parseOdds(tieOddsRaw);

  return {
    oddsHomeTeam: !isNaN(oddsHomeTeam) ? oddsHomeTeam : null,
    oddsAwayTeam: !isNaN(oddsAwayTeam) ? oddsAwayTeam : null,
    oddsTie: !isNaN(oddsTie) ? oddsTie : null,
  };
}

function parseOdds(oddsRaw: number): number {
  return oddsRaw / 100;
}
