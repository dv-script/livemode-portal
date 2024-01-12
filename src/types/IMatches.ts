import { ITeamDetails } from "./ITeamDetails";

interface IPlacar {
  id: number;
  golsMandante: number;
  golsVisitante: number;
  penaltisMandante: number | null;
  penaltisVisitante: number | null;
  empate: boolean;
  vitoriaMandante: boolean;
  derrotaVisitante: boolean;
  derrotaMandante: boolean;
  vitoriaVisitante: boolean;
  golsMandanteWo: number | null;
  golsVisitanteWo: number | null;
  decisaoPenaltisCertoMandante: number;
  decisaoPenaltisCertoVisitante: number;
  decisaoPenaltisErradoMandante: number;
  decisaoPenaltisErradoVisitante: number;
}

interface ISDEPartida {
  jogo_id: number;
  sede_id: number | null;
  arbitro_auxiliar_1_id: number | null;
  arbitro_auxiliar_2_id: number | null;
  equipe_mandante_id: number;
  equipe_visitante_id: number;
  tecnico_mandante_id: number | null;
  arbitro_principal_id: number | null;
  tecnico_visitante_id: number | null;
}

interface IChronology {
  calendarType: string;
  id: string;
}

interface IDateOfMatch {
  nano: number;
  dayOfYear: number;
  dayOfWeek: string;
  month: string;
  dayOfMonth: number;
  year: number;
  monthValue: number;
  hour: number;
  minute: number;
  second: number;
  chronology: IChronology;
}

export interface IMatch {
  homeTeamDetails?: ITeamDetails;
  awayTeamDetails?: ITeamDetails;
  rodada: number;
  idArbitro: number | null;
  fase: string;
  renda: number | null;
  placar: IPlacar;
  hasNarracao: boolean;
  temCartaoAmareloTecnicoMandante: boolean;
  temCartaoAmareloTecnicoVisitante: boolean;
  temCartaoVermelhoTecnicoMandante: boolean;
  temCartaoVermelhoTecnicoVisitante: boolean;
  quantidadeCartaoAmareloComissaoMandante: number | null;
  quantidadeCartaoVermelhoComissaoMandante: number | null;
  quantidadeCartaoAmareloComissaoVisitante: number | null;
  quantidadeCartaoVermelhoComissaoVisitante: number | null;
  sequenciaPartida: number | null;
  idEquipeMandante: number;
  idTecnicoMandante: number | null;
  tecnicoMandante: string | null;
  idEquipeVisitante: number;
  idTecnicoVisitante: number | null;
  tecnicoVisitante: string | null;
  idEstadio: number;
  periodoJogo: string;
  partidaEncerrada: boolean;
  estadio: string;
  hasScout: boolean;
  idPeriodoJogo: number;
  grupo: string;
  idCampeonato: number;
  sde: ISDEPartida;
  nomeDaTaca: string;
  tempoReal: boolean;
  dataIndefinida: boolean;
  horaIndefinida: boolean;
  dataDaPartida: IDateOfMatch;
  dataDaPartidaIso: string;
  arbitro: string | null;
  publico: number | null;
  playoffChave: number | null;
  id: number;
}