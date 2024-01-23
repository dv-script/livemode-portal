import { IMatch } from "@/types/IMatch";
import { formatDateAbbreviation } from "@/utils/formatDateAbbreviation";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

interface IMatchCardProps {
  matchesFilteredByRound: IMatch[];
}

export function MatchCard({ matchesFilteredByRound }: IMatchCardProps) {
  return (
    <>
      {matchesFilteredByRound.map((match: IMatch) => {
        const isLive = match.realtime;
        const notStarted = match.gameTime === "Não Inic.";

        return (
          <Link
            href={
              !notStarted ? `/commentary-live-system/match/${match.id}` : ""
            }
            key={match.id}
            className="mx-auto w-full flex flex-col flex-nowrap gap-4 py-6 px-4 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 ease-in-out"
          >
            <div className="flex flex-col items-center justify-center">
              <span className="text-sm whitespace-nowrap">
                {formatDateAbbreviation(new Date(match.isoDate))}
              </span>
              <span className="text-sm whitespace-nowrap text-zinc-500">
                {match.stadium}
              </span>
            </div>
            <div className="flex flex-col gap-1 items-center">
              <div className="flex flex-row gap-4 justify-center items-center font-bold text-xl text-zinc-600">
                <div className="flex items-center gap-2">
                  <Image
                    src={match.homeTeamDetails?.urlLogo || ""}
                    alt={`Logo ${match.homeTeamDetails?.name}`}
                    draggable={false}
                    width={40}
                    height={40}
                  />
                  <Tooltip
                    content={match.homeTeamDetails?.name}
                    color="default"
                    radius="sm"
                  >
                    <span className="font-semibold text-zinc-400">
                      {match.homeTeamDetails?.initials}
                    </span>
                  </Tooltip>
                </div>
                {!notStarted ? (
                  <div className="flex items-center gap-1">
                    <span>{match.gameScore.goalsHome}</span>
                    <span>x</span>
                    <span>{match.gameScore.goalsAway}</span>
                  </div>
                ) : (
                  <span>x</span>
                )}
                <div className="flex items-center gap-2">
                  <Tooltip
                    content={match.awayTeamDetails?.name}
                    color="default"
                    radius="sm"
                  >
                    <span className="font-semibold text-zinc-400">
                      {match.awayTeamDetails?.initials}
                    </span>
                  </Tooltip>
                  <Image
                    src={match.awayTeamDetails?.urlLogo || ""}
                    alt={`Logo ${match.awayTeamDetails?.name}`}
                    draggable={false}
                    width={40}
                    height={40}
                  />
                </div>
              </div>
              {isLive ? (
                <div className="flex flex-row gap-1 text-sm w-fit items-center bg-red-600 text-white rounded-xl px-2 py-1">
                  <span className="rounded-full bg-white w-2 h-2"></span>
                  <span>Live</span>
                </div>
              ) : (
                <p className="text-sm">{match.gameTime}</p>
              )}
            </div>
            <div className="flex flex-row gap-2 justify-center items-center">
              {!notStarted ? (
                <span className="text-xs text-gray-400 hover:underline">
                  See details
                </span>
              ) : (
                <span className="text-xs text-gray-400">
                  Details not available
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </>
  );
}
