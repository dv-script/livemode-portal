import { ScoutsByMatch } from "@/app/commentary-live-system/match/_components/scouts-by-match";

interface PageProps {
  params: {
    id: number;
  };
}

export default async function Page(props: PageProps) {
  const matchId = props.params.id;

  return (
    <main className="flex bg-gray-100">
      <div className="flex flex-col gap-4 py-4 px-2 max-w-[1300px] mx-auto w-full">
        <ScoutsByMatch matchId={matchId} />
      </div>
    </main>
  );
}
