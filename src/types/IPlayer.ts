interface Birthday {
  chronology: {
    calendarType: string;
    id: string;
  };
  dayOfMonth: number;
  dayOfWeek: string;
  dayOfYear: number;
  hour: number;
  minute: number;
  month: string;
  monthValue: number;
  nano: number;
  second: number;
  year: number;
}

interface SDE {
  additionalProp1: number;
  additionalProp2: number;
  additionalProp3: number;
}

export interface IPlayer {
  birthday: Birthday;
  fake: boolean;
  heightMts: string;
  id: number;
  idNationalTeam: number;
  idPosition: number;
  idTeam: number;
  inserted: string;
  jerseyNumber: string;
  name: string;
  nationalTeam: string;
  nickname: string;
  number: string;
  position: string;
  sde: SDE;
  summoned: boolean;
  team: string;
  updated: string;
  weightKgs: string;
}
