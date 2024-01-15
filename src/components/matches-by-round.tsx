import { fetchTeamById } from "@/lib/fetcher";
import { IFetchMatchesResponse } from "@/types/IFetchMatchesResponse";
import { IFetchTeamResponse } from "@/types/IFetchTeamResponse";
import { IMatch } from "@/types/IMatches";
import { ITeamDetails } from "@/types/ITeamDetails";
import { formatDateAbbreviation } from "@/utils/formatDateAbbreviation";
import Image from "next/image";

export async function MatchesByRound({
  allMatches,
}: {
  allMatches: IFetchMatchesResponse;
}) {
  const matchesFilteredByRound = allMatches.data.filter(
    (match: IMatch) => match.rodada === 3
  );

  const teamIds = new Set(
    matchesFilteredByRound.flatMap((match: IMatch) => [
      match.idEquipeMandante,
      match.idEquipeVisitante,
    ])
  );

  const teamsDetails: IFetchTeamResponse[] = await Promise.all(
    Array.from(teamIds).map(fetchTeamById)
  );

  const teamDetailsMap: Record<string, ITeamDetails> = teamsDetails.reduce(
    (acc, teamResponse) => {
      acc[teamResponse.data.id] = teamResponse.data;
      return acc;
    },
    {} as Record<string, ITeamDetails>
  );

  const detailedMatches = matchesFilteredByRound.map((match: IMatch) => ({
    ...match,
    homeTeamDetails: teamDetailsMap[match.idEquipeMandante],
    awayTeamDetails: teamDetailsMap[match.idEquipeVisitante],
  }));

  return (
    <>
      {detailedMatches.map((match: IMatch) => {
        const isLive = match.tempoReal;

        return (
          <div
            key={match.id}
            className="mx-auto min-w-96 flex flex-col gap-4 py-4 px-2 bg-white rounded-md"
          >
            {isLive && (
              <div className="flex flex-row gap-1 w-fit items-center bg-red-700 text-white rounded-lg p-2">
                <span className="rounded-full bg-white w-2 h-2"></span>
                <span className="">Ao vivo</span>
              </div>
            )}
            <span className="text-sm whitespace-nowrap">
              {formatDateAbbreviation(new Date(match.dataDaPartidaIso))}
            </span>
            <div className="flex flex-col items-center">
              <div className="flex flex-row gap-1 justify-center items-center font-bold text-xl text-zinc-600">
                <div className="flex items-center gap-2">
                  <Image
                    src={match.homeTeamDetails?.urlLogo || ""}
                    alt={`Logo ${match.homeTeamDetails?.nome}`}
                    width={30}
                    height={30}
                  />
                  <span>{match.placar.golsMandante}</span>
                </div>
                <span>x</span>
                <div className="flex items-center gap-2">
                  <span>{match.placar.golsVisitante}</span>
                  <Image
                    src={match.awayTeamDetails?.urlLogo || ""}
                    alt={`Logo ${match.awayTeamDetails?.nome}`}
                    width={30}
                    height={30}
                  />
                </div>
              </div>
              <p className="text-xs">{match.periodoJogo}</p>
            </div>
          </div>
        );
      })}
    </>
  );
}
