"use client";
import React, { useEffect, useState } from "react";
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

const LeagueSummary: React.FC = () => {
  const router = useRouter();
  const [teams, setTeams] = useState<CombinedTeamInfo[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    handleFetchTeams();
  }, []);

  const handleFetchTeams = async () => {
    try {
      const response = await fetchCombinedTeamInfo();
      setTeams(response);
    } catch (error) {
      setError("Failed to fetch team data.");
    } finally {
      setLoading(false);
    }
  };

  const onClickViewTableDetails = (triCode: string) => {
    router.push(`/team/${triCode}`);
  };

  return (
    <>
      <Header>
        <Title>ICE INTEL</Title>
      </Header>
      <Container>
        {loading ? (
          <Message>Loading...</Message>
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
                      >
                        View Details
                      </Button>
                    </TableData>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </Container>
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4281a4;
  padding: 20px 0;
  width: 100%;
`;

const Title = styled.h1`
  color: white;
`;

const Button = styled.button`
  padding: 10px 15px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  background: #4281a4;
  color: white;
  &:hover {
    background: #306080;
  }
`;

const Message = styled.p`
  margin-top: 20px;
  font-size: 18px;
`;

export default LeagueSummary;
