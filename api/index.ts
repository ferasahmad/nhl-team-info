import { Team, TeamDetails, CombinedTeamInfo, ClubStats } from "../types";

const apiRequest = async <T>(url: string): Promise<T | null> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(
        `Error fetching data from ${url}: ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`API request error: ${error}`);
    return null;
  }
};

const combineTeamInfo = (
  summary: Team[],
  details: TeamDetails[]
): CombinedTeamInfo[] => {
  return summary
    .map((teamSummary) => {
      const teamDetails = details.find(
        (detail) => detail.fullName === teamSummary.teamFullName
      );

      if (!teamDetails) {
        console.warn(`Details not found for team: ${teamSummary.teamFullName}`);
        return null;
      }

      return {
        id: teamDetails.id,
        teamFullName: teamSummary.teamFullName,
        wins: teamSummary.wins,
        losses: teamSummary.losses,
        gamesPlayed: teamSummary.gamesPlayed,
        points: teamSummary.points,
        ties: teamSummary.ties,
        triCode: teamDetails.triCode,
      };
    })
    .filter((item): item is CombinedTeamInfo => item !== null);
};

export const fetchCombinedTeamInfo = async (): Promise<
  CombinedTeamInfo[] | null
> => {
  const summaryUrl = "https://api.nhle.com/stats/rest/en/team/summary";
  const detailsUrl = "https://api.nhle.com/stats/rest/en/team";

  try {
    const teamSummaryData = await apiRequest<{ data: Team[] }>(summaryUrl);
    const teamDetailsData = await apiRequest<{ data: TeamDetails[] }>(
      detailsUrl
    );

    if (!teamSummaryData || !teamDetailsData) {
      throw new Error("Failed to fetch team data");
    }

    return combineTeamInfo(teamSummaryData.data, teamDetailsData.data);
  } catch (error) {
    console.error(`Error fetching combined team information: ${error}`);
    return null;
  }
};

export const fetchClubStats = async (
  teamTriCode: string
): Promise<ClubStats[] | null> => {
  const url = `https://api-web.nhle.com/v1/club-stats-season/${teamTriCode}`;
  try {
    return await apiRequest<ClubStats[]>(url);
  } catch (error) {
    console.error(`Error fetching club stats for ${teamTriCode}: ${error}`);
    return null;
  }
};
