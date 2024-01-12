interface ISDEEquipe {
  equipe_id: number;
}

export interface ITeamDetails {
  tecnico: string | null;
  nome: string;
  cidade: string;
  estado: string;
  isTimeGrande: boolean;
  urlLogo: string;
  selecao: boolean;
  torcedorNoSingular: string | null;
  torcedorNoPlural: string | null;
  timeFantasia: boolean;
  estadio: string;
  idTecnico: number | null;
  sde: ISDEEquipe;
  pais: string;
  sigla: string;
  id: number;
}