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
    console.error("API request error:", error);
    return null;
  }
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

    const combinedInfo: CombinedTeamInfo[] = teamSummaryData.data
      .map((summary) => {
        const details = teamDetailsData.data.find(
          (detail) => detail.fullName === summary.teamFullName
        );

        if (!details) {
          return null;
        }

        return {
          id: details.id,
          teamFullName: summary.teamFullName,
          wins: summary.wins,
          losses: summary.losses,
          gamesPlayed: summary.gamesPlayed,
          points: summary.points,
          ties: summary.ties,
          triCode: details.triCode,
        };
      })
      .filter((item): item is CombinedTeamInfo => item !== null);

    return combinedInfo;
  } catch (error) {
    console.error("Error fetching combined team information:", error);
    return null;
  }
};

export const fetchClubStats = async (teamTriCode: string) => {
  const url = `https://api-web.nhle.com/v1/club-stats-season/${teamTriCode}`;
  return await apiRequest<ClubStats[]>(url);
};
