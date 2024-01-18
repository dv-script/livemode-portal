import { fetchStandings } from "@/lib/fetcher";
import { IFetchStandingsResponse } from "@/types/IFetchStandingsResponse";
import { IStanding } from "@/types/IStanding";

export async function StandingsTable() {
  const standings = (await fetchStandings()) as IFetchStandingsResponse;
  const standingsByGroup: Record<string, IStanding[]> = standings.data.reduce(
    (acc, standings) => {
      acc[standings.groupname] = [
        ...(acc[standings.groupname] || []),
        standings,
      ];
      return acc;
    },
    {} as Record<string, IStanding[]>
  );

  return (
    <div className="flex flex-col gap-4">
      {Object.entries(standingsByGroup).map(([groupname, standings]) => (
        <div
          key={groupname}
          className="flex flex-col bg-white gap-4 mx-4 py-6 rounded-lg shadow-md overflow-x-auto hover:shadow-xl transition duration-300 ease-in-out lg:px-4"
        >
          <span className="sticky left-0 text-2xl px-4 font-semibold text-left uppercase">
            Group {groupname}
          </span>
          <table className="table-auto w-full">
            <thead>
              <tr className="text-sm border-y-1 text-zinc-500">
                <th className="px-4 font-normal py-2 uppercase text-left bg-white sticky left-0">
                  Classification
                </th>
                <th className="px-4 font-normal py-2 uppercase ">P</th>
                <th className="px-4 font-normal py-2 uppercase ">G</th>
                <th className="px-4 font-normal py-2 uppercase ">W</th>
                <th className="px-4 font-normal py-2 uppercase ">D</th>
                <th className="px-4 font-normal py-2 uppercase ">L</th>
                <th className="px-4 font-normal py-2 uppercase ">GF</th>
                <th className="px-4 font-normal py-2 uppercase ">GA</th>
                <th className="px-4 font-normal py-2 uppercase ">GD</th>
                <th className="px-4 font-normal py-2 uppercase ">%</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((standing: IStanding) => {
                const teamClassified = standing.position <= 2;

                return (
                  <tr key={standing.id} className="text-center hover:shadow-md duration-100">
                    <td className="border-y-1 px-4 py-2 text-left bg-white sticky left-0">
                      <div className="flex items-center gap-2">
                        {teamClassified ? (
                          <span className="text-sm text-blue-500 min-w-3">
                            {standing.position}
                          </span>
                        ) : (
                          <span className="text-sm min-w-3">{standing.position}</span>
                        )}
                        <span className="text-sm">{standing.team}</span>
                      </div>
                    </td>
                    <td className="border-y-1 bg-zinc-200/35 font-semibold px-4 py-2">
                      {standing.points}
                    </td>
                    <td className="border-y-1 px-4 py-2">
                      {standing.gamesPlayed}
                    </td>
                    <td className="border-y-1 bg-zinc-200/35 px-4 py-2">
                      {standing.wins}
                    </td>
                    <td className="border-y-1 px-4 py-2">{standing.draws}</td>
                    <td className="border-y-1 bg-zinc-200/35 px-4 py-2">
                      {standing.losses}
                    </td>
                    <td className="border-y-1 px-4 py-2">
                      {standing.goalsFor}
                    </td>
                    <td className="border-y-1 bg-zinc-200/35 px-4 py-2">
                      {standing.goalsAgainst}
                    </td>
                    <td className="border-y-1 px-4 py-2">
                      {standing.goalsDifference}
                    </td>
                    <td className="border-y-1 bg-zinc-200/35 px-4 py-2">
                      {standing.efficiency}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
