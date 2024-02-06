export interface IScout {
  games: number;
  sidePassAccurate: number;
  ballPossessionByQuadrant: Record<string, number>;
  assistToShot: number;
  redCard: number;
  yellowCard: number;
  crossAccurate: number;
  crossNotAccurate: number;
  saveOrBlock: number;
  hardSave: number;
  tackleAccurate: number;
  tackleNotAccurate: number;
  dribbleAccurate: number;
  dribbleNotAccurate: number;
  foulRecieved: number;
  shotOnTarget: number;
  shotOffTarget: number;
  ownGoal: number;
  ownGoalOtherTeam: number;
  goalFor: number;
  goalAgainst: number;
  offside: number;
  interceptionAccurate: number;
  interceptionNotAccurate: number;
  longPassAccurate: number;
  longPassNotAccurate: number;
  passAccurate: number;
  passNotAccurate: number;
  penaltyAgainst: number;
  penaltyFor: number;
  lossBallPossession: number;
  ballPossession: number;
  idChampionship: number;
  idTeam: number;
  assistToGoal: number;
  rebound: number;
  sidePassNotAccurate: number;
  percBallPossessionByQuadrant: Record<string, number>;
  cornerFor: number;
  cornerAgainst: number;
  foul: number;
}