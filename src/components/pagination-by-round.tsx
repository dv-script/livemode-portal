"use client";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useState } from "react";
import { toOrdinal } from "@/utils/toOrdinal";

interface IPaginationByRoundProps {
  maxRound: number | null;
}

export function PaginationByRound({ maxRound }: IPaginationByRoundProps) {
  const [currentRound, setCurrentRound] = useState(1);

  function handleNextRound() {
    if (maxRound && currentRound < maxRound) setCurrentRound((prev) => prev + 1);
  }

  function handlePreviousRound() {
    if (currentRound > 1) setCurrentRound((prev) => prev - 1);
  }

  return (
    <div className="flex flex-row items-center gap-1 justify-between">
      <button
        onClick={handlePreviousRound}
        disabled={currentRound === 1 && true}
        className="border-none text-xl bg-transparent outline-none p-2 disabled:text-zinc-400"
      >
        <FaAngleLeft />
      </button>
      <span className="text-xl font-semibold">{toOrdinal(currentRound)} Round</span>
      <button
        onClick={handleNextRound}
        disabled={maxRound ? currentRound === maxRound && true : true}
        className="border-none text-xl bg-transparent outline-none p-2 disabled:text-zinc-400"
      >
        <FaAngleRight />
      </button>
    </div>
  );
}
