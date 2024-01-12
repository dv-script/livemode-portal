import { fetchMatches } from "@/lib/fetcher";
import { IFetchMatchesResponse } from "@/types/IFetchMatchesResponse";
import { PaginationByRound } from "@/components/pagination-by-round";
import { MatchesByRound } from "@/components/matches-by-round";
import { unstable_noStore } from "next/cache";

export default async function Page() {
  unstable_noStore();
  const allMatches = await fetchMatches() as IFetchMatchesResponse;

  return (
    <main className="flex bg-gray-100">
      <div className="flex flex-col gap-4 py-4 px-2 max-w-[1300px] mx-auto">
        <PaginationByRound maxRound={allMatches.data.slice(-1)[0].rodada} />
        <div className="flex flex-wrap gap-4">
          <MatchesByRound allMatches={allMatches}/>
        </div>
      </div>
    </main>
  );
}
