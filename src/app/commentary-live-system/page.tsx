import { getMatches } from "@/actions/data/get-matches";
import { IFetchMatchesResponse } from "@/types/IFetchMatchesResponse";
import { MatchesByRound } from "@/components/matches-by-round";
import { StandingsTable } from "@/components/standings-table";
import { TopScorersTable } from "@/components/top-scorers-table";
import { Metadata } from "next";
import { IMatch } from "@/types/IMatch";
import { IFetchTeamResponse } from "@/types/IFetchTeamResponse";
import { getTeamById } from "@/actions/data/get-team-by-id";
import { ITeam } from "@/types/ITeam";

export async function generateMetadata(): Promise<Metadata> {
  const allMatches = (await getMatches()) as IFetchMatchesResponse;
  const matchOfTheDay = allMatches.data.find(
    (match) => match.date.toString() === new Date().toDateString()
  );

  if (matchOfTheDay) {
    return {
      title: `FPF - ${matchOfTheDay.teamHome} vs ${matchOfTheDay.teamAway}`,
      description: `Catch the latest updates from the ${matchOfTheDay.teamHome} vs ${matchOfTheDay.teamAway} match.`,
    };
  } else {
    return {
      title: "FPF - Commentary Live System",
      description:
        "Catch the latest updates from the FPF Commentary Live System.",
    };
  }
}

export default async function Page() {
  const allMatches = (await getMatches()) as IFetchMatchesResponse;
  const maxRound = allMatches.data.slice(-2)[0].round;

  const teamIds = new Set(
    allMatches.data.flatMap((match: IMatch) => [
      match.idTeamHome,
      match.idTeamAway,
    ])
  );

  const teamsDetails: IFetchTeamResponse[] = await Promise.all(
    Array.from(teamIds).map(getTeamById)
  );

  const teamDetailsMap: Record<string, ITeam> = teamsDetails.reduce(
    (acc, teamResponse) => {
      acc[teamResponse.data.id] = teamResponse.data;
      return acc;
    },
    {} as Record<string, ITeam>
  );

  const detailedMatches = allMatches.data.map((match: IMatch) => ({
    ...match,
    homeTeamDetails: teamDetailsMap[match.idTeamHome],
    awayTeamDetails: teamDetailsMap[match.idTeamAway],
  }));

  return (
    <main className="flex bg-gray-100">
      <div className="flex flex-col gap-4 py-4 px-2 max-w-[1300px] overflow-hidden mx-auto md:grid grid-cols-12">
        <div className="col-span-8">
          <StandingsTable />
        </div>
        <div className="col-span-4">
          <MatchesByRound
            detailedMatches={detailedMatches}
            maxRound={maxRound}
          />
        </div>
        <div className="col-span-12">
          <TopScorersTable />
        </div>
      </div>
    </main>
  );
}
