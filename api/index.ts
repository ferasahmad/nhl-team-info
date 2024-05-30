import { Team, TeamDetails, CombinedTeamInfo } from "../types";

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

  const teamSummaryData = await apiRequest<{ data: Team[] }>(summaryUrl);
  const teamDetailsData = await apiRequest<{ data: TeamDetails[] }>(detailsUrl);

  if (!teamSummaryData || !teamDetailsData) {
    return null;
  }

  const combinedInfo: CombinedTeamInfo[] = teamSummaryData.data
    .map((summary) => {
      const details = teamDetailsData.data.find(
        (detail) => detail.fullName === summary.teamFullName
      );

      if (details) {
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
      }

      return null;
    })
    .filter((item) => item !== null) as CombinedTeamInfo[];

  return combinedInfo;
};

fetchCombinedTeamInfo().then((data) => {
  if (data) {
    console.log(data);
  } else {
    console.error("Failed to fetch combined team information.");
  }
});

export const fetchTeams = async (): Promise<Team[] | null> => {
  const url = "https://api.nhle.com/stats/rest/en/team/summary";
  return await apiRequest<Team[]>(url);
};
