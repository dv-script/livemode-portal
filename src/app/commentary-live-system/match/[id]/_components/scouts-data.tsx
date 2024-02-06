import { IScoutsByTeam } from "@/types/IScoutsByMatch";
import { ScoutCard } from "./scout-card";

interface IScoutCardProps {
  teamHomeScoutsWithTeamDetails: IScoutsByTeam[];
  teamAwayScoutsWithTeamDetails: IScoutsByTeam[];
}

export function ScoutsData({
  teamHomeScoutsWithTeamDetails,
  teamAwayScoutsWithTeamDetails,
}: IScoutCardProps) {
  function renderScoutCard(
    scout: IScoutsByTeam[],
    reverse?: "flex-row-reverse"
  ) {
    return scout.map((scout) => {
      const totalPassesInGame = scout.passAccurate + scout.passNotAccurate;
      const passAccuratePercentage =
        (scout.passAccurate / totalPassesInGame) * 100;

      const totalPassesInChampionship = scout.scoutInChampionship
        ? scout.scoutInChampionship.passAccurate +
          scout.scoutInChampionship.passNotAccurate
        : 0;
      const averagePassesInChampionship = scout.scoutInChampionship
        ? Math.floor(
            totalPassesInChampionship / scout.scoutInChampionship.games
          )
        : 0;
      const passesAccuratedInChampionship = scout.scoutInChampionship
        ? Math.floor(
            scout.scoutInChampionship.passAccurate /
              scout.scoutInChampionship.games
          )
        : 0;
      const passesNotAccuratedInChampionship = scout.scoutInChampionship
        ? Math.floor(
            scout.scoutInChampionship.passNotAccurate /
              scout.scoutInChampionship.games
          )
        : 0;
      const passAccuratePercentageInChampionship = scout.scoutInChampionship
        ? Math.floor(
            (scout.scoutInChampionship.passAccurate /
              totalPassesInChampionship) *
              100
          )
        : 0;
      const inGameIsBetterThanAverageCondition =
        totalPassesInGame > averagePassesInChampionship ? true : false;

      return (
        <div className={`flex gap-4 flex-1 ${reverse}`} key={scout.idTeam}>
          <ScoutCard
            idTeam={scout.idTeam}
            teamDetails={scout.teamDetails}
            totalData={totalPassesInGame}
            dataAccurate={scout.passAccurate}
            dataNotAccurate={scout.passNotAccurate}
            dataAccuratePercentage={passAccuratePercentage}
            isBetter={inGameIsBetterThanAverageCondition}
            title="In game"
          />
          <ScoutCard
            idTeam={scout.idTeam}
            teamDetails={scout.teamDetails}
            totalData={averagePassesInChampionship}
            dataAccurate={passesAccuratedInChampionship}
            dataNotAccurate={passesNotAccuratedInChampionship}
            dataAccuratePercentage={passAccuratePercentageInChampionship}
            title="Team average"
          />
        </div>
      );
    });
  }

  return (
    <>
      {renderScoutCard(teamHomeScoutsWithTeamDetails)}
      {renderScoutCard(teamAwayScoutsWithTeamDetails, "flex-row-reverse")}
    </>
  );
}
