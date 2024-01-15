"use client";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useState } from "react";

interface IPaginationByRoundProps {
  maxRound: number;
}

export function PaginationByRound({ maxRound }: IPaginationByRoundProps) {
  const [selectedRound, setSelectedRound] = useState(1);

  function handleNextRound() {
    if (selectedRound < maxRound) setSelectedRound((prev) => prev + 1);
  }

  function handlePreviousRound() {
    if (selectedRound > 1) setSelectedRound((prev) => prev - 1);
  }

  return (
    <div className="flex flex-row items-center gap-1">
      <button
        onClick={handlePreviousRound}
        disabled={selectedRound === 1 && true}
        className="border-none text-xl bg-transparent outline-none p-2 disabled:text-zinc-400"
      >
        <FaAngleLeft />
      </button>
      <span className="text-xl font-semibold">{selectedRound} Round</span>
      <button
        onClick={handleNextRound}
        disabled={selectedRound === maxRound - 1 && true}
        className="border-none text-xl bg-transparent outline-none p-2 disabled:text-zinc-400"
      >
        <FaAngleRight />
      </button>
    </div>
  );
}
