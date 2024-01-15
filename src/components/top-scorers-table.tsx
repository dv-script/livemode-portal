import { fetchTopScorers, fetchPlayerById, fetchTeamById } from "@/lib/fetcher";
import { IFetchPlayerResponse } from "@/types/IFetchPlayerResponse";
import { IFetchTeamResponse } from "@/types/IFetchTeamResponse";
import { IFetchTopScorersResponse } from "@/types/IFetchTopScorersResponse";
import { ITopScorer } from "@/types/ITopScorer";
import Image from "next/image";

export async function TopScorersTable() {
  const topScorers = (await fetchTopScorers()) as IFetchTopScorersResponse;

  const topScorersWithPlayerData = await Promise.all(
    topScorers.data.map(async (topScorer: ITopScorer) => {
      const player = (await fetchPlayerById(
        topScorer.idPlayer
      )) as IFetchPlayerResponse;
      const team = (await fetchTeamById(
        topScorer.idTeam
      )) as IFetchTeamResponse;
      return {
        ...topScorer,
        teamDetails: team.data,
        playerDetails: player.data,
      };
    })
  );

  const topScorersWithPlayerDataFiltered = topScorersWithPlayerData.filter(
    (topScorer) => topScorer.position <= 10
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col bg-white gap-4 py-6 rounded-lg shadow-md overflow-x-auto hover:shadow-xl transition duration-300 ease-in-out lg:px-4">
        <span className="text-2xl px-4 font-semibold text-left uppercase">
          Top Scorers
        </span>
        <table className="table-auto w-full">
          <thead>
            <tr className="text-sm border-y-1 text-zinc-500 flex gap-4 justify-between">
              <th className="px-4 font-normal py-2 uppercase ">Ranking</th>
              <th className="px-4 font-normal py-2 uppercase ">Goals</th>
            </tr>
          </thead>
          {topScorersWithPlayerDataFiltered.map((topScorer, index) => {
            const showPosition =
              index === 0 ||
              topScorer.position !==
                topScorersWithPlayerData[index - 1].position;

            return (
              <tbody key={topScorer.idPlayer}>
                <tr className="border-y-1 flex gap-4 justify-between items-center">
                  <td className="px-4 py-2">
                    <div className="flex gap-2 items-center">
                      {showPosition ? (
                        <span className="text-2xl text-zinc-500 min-w-6">
                          {topScorer.position}
                        </span>
                      ) : (
                        <span className="text-2xl text-zinc-500 min-w-6"></span>
                      )}
                      <Image
                        src={""}
                        alt={`Image from ${topScorer.player}`}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <Image
                        src={topScorer.teamDetails.urlLogo}
                        alt={`Logo from ${topScorer.teamDetails.name}`}
                        width={40}
                        height={40}
                      />
                      <div className="flex flex-col">
                        <span className="">{topScorer.playerDetails.name}</span>
                        <span className="text-sm text-zinc-500">
                          {topScorer.playerDetails.position}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">{topScorer.goals}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
