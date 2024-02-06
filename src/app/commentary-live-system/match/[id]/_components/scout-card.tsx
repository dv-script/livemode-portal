import { ITeam } from "@/types/ITeam";
import { CircularProgress } from "@nextui-org/react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import Image from "next/image";

interface IScoutCardProps {
  idTeam: number;
  teamDetails?: ITeam;
  totalData: number | undefined;
  dataAccurate: number;
  dataNotAccurate: number;
  dataAccuratePercentage: number;
  title: string;
  isBetter?: boolean;
}

export function ScoutCard({
  idTeam,
  teamDetails,
  totalData,
  dataAccurate,
  dataNotAccurate,
  dataAccuratePercentage,
  title,
  isBetter,
}: IScoutCardProps) {
  return (
    <div
      key={idTeam}
      className="flex flex-col gap-2 p-4 bg-zinc-100 rounded-md w-full"
    >
      <div className="flex items-center gap-2">
        {teamDetails && (
          <Image
            src={teamDetails.urlLogo}
            alt={`${teamDetails.name} badge`}
            width={40}
            height={40}
          />
        )}
        <span className="text-sm font-semibold">{title}</span>
      </div>
      <div className="flex justify-between items-center gap-14">
        <div className="flex flex-col">
          <span className="text-2xl font-medium">{totalData}</span>
          <span className="text-tiny text-zinc-500">Total passes</span>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-1 items-start">
            <span className="text-sm font-semibold text-green-500">
              {dataAccurate}
            </span>
            {title === "In game" &&
              (isBetter ? (
                <FaArrowTrendUp className="text-green-500" />
              ) : (
                <FaArrowTrendDown className="text-zinc-400" />
              ))}
          </div>
          <div className="grid grid-cols-2 gap-1 items-start">
            <span className="text-sm font-semibold text-red-500">
              {dataNotAccurate}
            </span>
            {title === "In game" &&
              (isBetter ? (
                <FaArrowTrendUp className="text-green-500" />
              ) : (
                <FaArrowTrendDown className="text-zinc-400" />
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <CircularProgress
          classNames={{
            svg: "w-36 h-36 drop-shadow-md",
            indicator: "stroke-green-500",
            track: "stroke-white/40",
            value: "text-3xl font-bold",
          }}
          value={dataAccuratePercentage}
          strokeWidth={2}
          showValueLabel={true}
          aria-label={`Passes accurate percentage`}
        />
      </div>
    </div>
  );
}
