import { fetchTeamById } from "@/lib/fetcher";
import { IFetchMatchesResponse } from "@/types/IFetchMatchesResponse";
import { IFetchTeamResponse } from "@/types/IFetchTeamResponse";
import { IMatch } from "@/types/IMatch";
import { ITeamDetails } from "@/types/ITeamDetails";
import { formatDateAbbreviation } from "@/utils/formatDateAbbreviation";
import Image from "next/image";
import Link from "next/link";

interface IMatchesByRoundProps {
  allMatches: IFetchMatchesResponse;
}

export async function MatchesByRound({ allMatches }: IMatchesByRoundProps) {
  const matchesFilteredByRound = allMatches.data.filter(
    (match: IMatch) => match.round === 3
  );

  const teamIds = new Set(
    matchesFilteredByRound.flatMap((match: IMatch) => [
      match.idTeamHome,
      match.idTeamAway,
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
    homeTeamDetails: teamDetailsMap[match.idTeamHome],
    awayTeamDetails: teamDetailsMap[match.idTeamAway],
  }));

  return (
    <>
      {detailedMatches.map((match: IMatch) => {
        const isLive = match.realtime;
        const notStarted = match.gameTime === "Não iniciado";

        return (
          <Link
            href={
              notStarted ? `/commentary-live-system/match/${match.id}` : ""
            }
            key={match.id}
            className="mx-auto flex-1 flex flex-col flex-nowrap gap-4 py-6 px-4 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
          >
            <div className="flex gap-2 items-center">
              <span className="text-sm whitespace-nowrap">
                {formatDateAbbreviation(new Date(match.isoDate))}
              </span>
              <span className="text-sm">-</span>
              <span className="text-sm whitespace-nowrap">
                {match.stadium}
              </span>
              {isLive && (
                <div className="flex flex-row gap-1 text-sm w-fit items-center bg-red-600 text-white rounded-xl px-2 py-1">
                  <span className="rounded-full bg-white w-2 h-2"></span>
                  <span>Ao vivo</span>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center">
              <div className="flex flex-row gap-4 justify-center items-center font-bold text-xl text-zinc-600">
                <div className="flex items-center gap-2">
                  <Image
                    src={match.homeTeamDetails?.urlLogo || ""}
                    alt={`Logo ${match.homeTeamDetails?.name}`}
                    width={30}
                    height={30}
                  />
                  <span className="font-semibold text-zinc-400">
                    {match.homeTeamDetails?.initials}
                  </span>
                </div>
                {!notStarted && (
                  <div className="flex items-center gap-1">
                    <span>{match.gameScore.goalsHome}</span>
                    <span>x</span>
                    <span>{match.gameScore.goalsAway}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-zinc-400">
                    {match.awayTeamDetails?.initials}
                  </span>
                  <Image
                    src={match.awayTeamDetails?.urlLogo || ""}
                    alt={`Logo ${match.awayTeamDetails?.name}`}
                    width={30}
                    height={30}
                  />
                </div>
              </div>
              <p className="text-xs">{match.gameTime}</p>
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
              {!notStarted ? (
                <span className="text-xs text-gray-400 hover:underline">
                  See details
                </span>
              ) : (
                <span className="text-xs text-gray-400">
                  Details not avaible
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </>
  );
}