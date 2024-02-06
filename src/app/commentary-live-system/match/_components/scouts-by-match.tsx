import { getScoutsByMatch } from "@/data/get-scouts-by-match";
import { getTeamById } from "@/data/get-team-by-id";
import { IFetchScoutsByMatch } from "@/types/IFetchScoutsByMatch";
import { IFetchTeamResponse } from "@/types/IFetchTeamResponse";
import { IScoutsByMatch } from "@/types/IScoutsByMatch";
import { getAllScouts } from "@/data/get-all-scouts";
import { IFetchAllScouts } from "@/types/IFetchAllScouts";
import { IScout } from "@/types/IScout";
import { ScoutsData } from "../[id]/_components/scouts-data";

interface IScoutsByMatchProps {
  matchId: number;
}

export async function ScoutsByMatch({ matchId }: IScoutsByMatchProps) {
  const allScoutsResponse = (await getAllScouts()) as IFetchAllScouts;
  const allScouts = allScoutsResponse.data as IScout[];

  const scoutsByMatchReponse = (await getScoutsByMatch(
    matchId
  )) as IFetchScoutsByMatch;
  const scoutsByMatch = scoutsByMatchReponse.data as IScoutsByMatch;
  const teamHomeScouts = scoutsByMatch.homeTeam;
  const teamAwayScouts = scoutsByMatch.awayTeam;

  const teamHomeScoutsWithTeamDetails = await Promise.all(
    teamHomeScouts.map(async (scout) => {
      const teamResponse = await getTeamById(scout.idTeam);
      const team = (teamResponse as IFetchTeamResponse).data;
      const scoutInChampionship = allScouts.find(
        (scout) => scout.idTeam === team.id
      );

      return {
        ...scout,
        teamDetails: team,
        scoutInChampionship: scoutInChampionship,
      };
    })
  );

  const teamAwayScoutsWithTeamDetails = await Promise.all(
    teamAwayScouts.map(async (scout) => {
      const teamResponse = await getTeamById(scout.idTeam);
      const team = (teamResponse as IFetchTeamResponse).data;
      const scoutInChampionship = allScouts.find(
        (scout) => scout.idTeam === team.id
      );

      return {
        ...scout,
        teamDetails: team,
        scoutInChampionship: scoutInChampionship,
      };
    })
  );

  return (
    <div className="flex flex-col p-6 bg-white rounded-md gap-4">
      <h1 className="text-xl font-semibold">Scouts</h1>
      <div className="grid grid-cols-2 gap-4">
        <ScoutsData
          teamHomeScoutsWithTeamDetails={teamHomeScoutsWithTeamDetails}
          teamAwayScoutsWithTeamDetails={teamAwayScoutsWithTeamDetails}
        />
      </div>
    </div>
  );
}
