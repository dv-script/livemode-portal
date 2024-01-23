import { getTeamById } from "@/actions/data/get-team-by-id";
import { getTopScorers } from "@/actions/data/get-top-scorers";
import { getPlayersById } from "@/actions/data/get-players-by-id";
import { IFetchPlayerResponse } from "@/types/IFetchPlayerResponse";
import { IFetchTeamResponse } from "@/types/IFetchTeamResponse";
import { IFetchTopScorersResponse } from "@/types/IFetchTopScorersResponse";
import { ITopScorer } from "@/types/ITopScorer";
import Image from "next/image";
import { getBlobPlayers } from "@/actions/data/get-blob-players";
import avatarNoImage from "@/assets/avatarNoImage.png";

export async function TopScorersTable() {
  const topScorers = (await getTopScorers()) as IFetchTopScorersResponse;

  const topScorersWithPlayerData = await Promise.all(
    topScorers.data.map(async (topScorer: ITopScorer) => {
      const playerResponse = await getPlayersById(topScorer.idPlayer);
      const teamResponse = await getTeamById(topScorer.idTeam);
      const playersBlob = await getBlobPlayers();

      const player = (playerResponse as IFetchPlayerResponse).data;
      const team = (teamResponse as IFetchTeamResponse).data;

      const playerUrlBlob = playersBlob?.find((player) =>
        player.url.endsWith(`${topScorer.idPlayer}.png`)
      )?.url;

      return {
        ...topScorer,
        teamDetails: team,
        playerDetails: player,
        playerImage: playerUrlBlob,
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
          <tbody>
            {topScorersWithPlayerDataFiltered.map((topScorer, index) => {
              const showPosition =
                index === 0 ||
                topScorer.position !==
                  topScorersWithPlayerData[index - 1].position;

              return (
                <tr
                  key={topScorer.idPlayer}
                  className="border-y-1 flex gap-4 justify-between items-center"
                >
                  <td className="px-4 py-2">
                    <div className="flex gap-2 items-center flex-1">
                      {showPosition ? (
                        <span className="text-2xl text-zinc-500 min-w-6">
                          {topScorer.position}
                        </span>
                      ) : (
                        <span className="text-2xl text-zinc-500 min-w-6" />
                      )}
                      <div className="relative flex items-center justify-center overflow-hidden rounded-full bg-zinc-50 min-w-14 min-h-14">
                        {topScorer.playerImage ? (
                          <Image
                            src={topScorer.playerImage}
                            alt={`${topScorer.player} picture`}
                            fill
                            className="object-cover object-super-top scale-300 transition duration-300 ease-in-out hover:scale-275"
                          />
                        ) : (
                          <Image
                            src={avatarNoImage}
                            alt="No image available"
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="relative flex items-center justify-center min-w-12 min-h-12">
                        <Image
                          src={topScorer.teamDetails.urlLogo}
                          alt={`${topScorer.teamDetails.name}'s logo`}
                          fill
                          className="bg-cover object-cover"
                        />
                      </div>

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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
