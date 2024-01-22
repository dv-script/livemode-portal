import { fetchMatches } from "@/lib/fetcher";
import { IFetchMatchesResponse } from "@/types/IFetchMatchesResponse";
import { MatchesByRound } from "@/components/matches-by-round";
import { PaginationByRound } from "@/components/pagination-by-round";
import { StandingsTable } from "@/components/standings-table";
import { TopScorersTable } from "@/components/top-scorers-table";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const allMatches = (await fetchMatches()) as IFetchMatchesResponse;
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
  const allMatches = (await fetchMatches()) as IFetchMatchesResponse;
  const maxRound = allMatches.data.slice(-1)[0].round;

  return (
    <main className="flex bg-gray-100">
      <div className="flex flex-col gap-4 py-4 px-2 max-w-[1300px] overflow-hidden mx-auto md:grid grid-cols-12">
        <div className="col-span-8">
          <StandingsTable />
        </div>
        <div className="col-span-4">
          <PaginationByRound maxRound={maxRound} />
          <div className="py-4">
            <MatchesByRound allMatches={allMatches} />
          </div>
        </div>
        <div className="col-span-12">
          <TopScorersTable />
        </div>
      </div>
    </main>
  );
}
