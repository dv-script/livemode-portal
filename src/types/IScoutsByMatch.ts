import { IScout } from "./IScout";
import { ITeam } from "./ITeam";

export interface IScoutsByMatch {
  idMatch: number;
  homeTeam: IScoutsByTeam[];
  awayTeam: IScoutsByTeam[];
}

export interface IScoutsByTeam {
  teamDetails?: ITeam;
  scoutInChampionship?: IScout;
  sidePassAccurate: number;
  ballPossessionByQuadrant: QuadrantData;
  assistToShot: number;
  redCard: number;
  yellowCard: number;
  crossAccurate: number;
  penaltySave: number;
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
  idTeam: number;
  assistToGoal: number;
  idMatch: number;
  rebound: number;
  sidePassNotAccurate: number;
  percBallPossessionByQuadrant: QuadrantData;
  cornerFor: number;
  cornerAgainst: number;
  foul: number;
}

interface QuadrantData {
  [key: string]: number;
}
