"use client";
import { IMatch } from "@/types/IMatch";
import { toOrdinal } from "@/utils/toOrdinal";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { MatchCard } from "./match-card";

interface IMatchesByRoundProps {
  detailedMatches: IMatch[];
  maxRound: number;
}

export function MatchesByRound({
  detailedMatches,
  maxRound,
}: IMatchesByRoundProps) {
  const initialRound =
    detailedMatches.find((match: IMatch) => match.gameTime === "Não Inic.")
      ?.round || 1;
  const [currentRound, setCurrentRound] = useState(initialRound);

  function handleNextRound() {
    if (maxRound && currentRound < maxRound)
      setCurrentRound((prev) => prev + 1);
  }

  function handlePreviousRound() {
    if (currentRound > 1) setCurrentRound((prev) => prev - 1);
  }

  const matchesFilteredByRound = detailedMatches.filter(
    (match: IMatch) => match.round === currentRound
  );

  return (
    <>
      <div className="flex flex-row items-center gap-1 justify-between">
        <Button
          onClick={handlePreviousRound}
          disabled={currentRound === 1 && true}
          isIconOnly
          radius="full"
        >
          <FaAngleLeft />
        </Button>
        <span className="text-xl font-semibold">
          {toOrdinal(currentRound)} Round
        </span>
        <Button
          onClick={handleNextRound}
          disabled={maxRound ? currentRound === maxRound && true : true}
          isIconOnly
          radius="full"
        >
          <FaAngleRight />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2 py-4 md:flex-col md:w-full">
        <MatchCard matchesFilteredByRound={matchesFilteredByRound} />
      </div>
    </>
  );
}
