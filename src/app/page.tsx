"use client";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/navigation";
import { CombinedTeamInfo } from "../../types";
import { fetchCombinedTeamInfo } from "../../api";

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

  const onClickViewDetails = (triCode: string) => {
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
                  <Label>Team Name</Label>
                </TableData>
                <TableData>
                  <Label>Wins</Label>
                </TableData>
                <TableData>
                  <Label>Losses</Label>
                </TableData>
                <TableData>
                  <Label>Ties</Label>
                </TableData>
                <TableData />
              </TableRow>
            </TableHead>
            <TableBody>
              {teams &&
                teams.map((team) => (
                  <TableRow key={team.id}>
                    <TableData>
                      <Detail>{team.teamFullName ?? "Undefined"}</Detail>
                    </TableData>
                    <TableData>
                      <Detail>{team.wins ?? 0}</Detail>
                    </TableData>
                    <TableData>
                      <Detail>{team.losses ?? 0}</Detail>
                    </TableData>
                    <TableData>
                      <Detail>{team.ties ?? 0}</Detail>
                    </TableData>
                    <TableData>
                      <Button onClick={() => onClickViewDetails(team.triCode)}>
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

const Table = styled.table`
  background: white;
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background: #f5f5f5;
`;

const TableData = styled.td`
  flex: 1;
  padding: 10px;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #d8d8d8;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.p`
  font-weight: 700;
  text-align: center;
`;

const Detail = styled.p`
  text-align: center;
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
