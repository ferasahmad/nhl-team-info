"use client";
import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { CombinedTeamInfo } from "../../types";
import { fetchCombinedTeamInfo } from "../../api";
import {
  Table,
  TableBody,
  TableData,
  TableHead,
  TableRow,
  TableDetail,
  TableLabel,
} from "../../components/Table";
import LoadingIndicator from "../../components/LoadingIndicator";

const LeagueSummary: React.FC = () => {
  const router = useRouter();
  const [teams, setTeams] = useState<CombinedTeamInfo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleFetchTeams = useCallback(async () => {
    try {
      const response = await fetchCombinedTeamInfo();
      setTeams(response);
    } catch (error) {
      setError("Failed to fetch team data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleFetchTeams();
  }, [handleFetchTeams]);

  const onClickViewTableDetails = useCallback(
    (triCode: string) => {
      router.push(`/team/${triCode}`);
    },
    [router]
  );

  return (
    <Container>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableData>
                <TableLabel>Team Name</TableLabel>
              </TableData>
              <TableData>
                <TableLabel>Wins</TableLabel>
              </TableData>
              <TableData>
                <TableLabel>Losses</TableLabel>
              </TableData>
              <TableData>
                <TableLabel>Ties</TableLabel>
              </TableData>
              <TableData />
            </TableRow>
          </TableHead>
          <TableBody>
            {teams &&
              teams.map((team) => (
                <TableRow key={team.id}>
                  <TableData>
                    <TableDetail>
                      {team.teamFullName ?? "Undefined"}
                    </TableDetail>
                  </TableData>
                  <TableData>
                    <TableDetail>{team.wins ?? 0}</TableDetail>
                  </TableData>
                  <TableData>
                    <TableDetail>{team.losses ?? 0}</TableDetail>
                  </TableData>
                  <TableData>
                    <TableDetail>{team.ties ?? 0}</TableDetail>
                  </TableData>
                  <TableData>
                    <Button
                      onClick={() => onClickViewTableDetails(team.triCode)}
                      aria-label={`View stats for ${team.teamFullName}`}
                    >
                      View Stats
                    </Button>
                  </TableData>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  background: #4281a4;
  color: white;
  font-family: ChakraPetch;
  &:hover {
    background: #306080;
  }
`;

const Message = styled.p`
  margin-top: 20px;
  font-size: 18px;
`;

export default LeagueSummary;
