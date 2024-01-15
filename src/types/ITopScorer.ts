import { IPlayer } from "./IPlayer";
import { ITeam } from "./ITeam";

export interface ITopScorer {
  teamDetails?: ITeam;
  playerDetails?: IPlayer;
  idChampionship: number;
  idTeam: number;
  player: string;
  team: string;
  position: number;
  idPlayer: number;
  goals: number;
}
