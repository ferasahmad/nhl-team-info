"use client";
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { fetchClubStats } from "../../../../api";
import { ClubStats } from "../../../../types";
import {
  Table,
  TableBody,
  TableData,
  TableRow,
} from "../../../../components/Table";
import { TableHead } from "@mui/material";

const Team = ({ params }: { params: { teamTriCode: string } }) => {
  const { teamTriCode } = params;
  const [stats, setStats] = useState<ClubStats[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (teamTriCode) {
      handleFetchStats(teamTriCode);
    }
  }, [teamTriCode]);

  const handleFetchStats = async (teamTriCode: string) => {
    try {
      const response = await fetchClubStats(teamTriCode);
      setStats(response);
    } catch (error) {
      setError("Failed to fetch team stats.");
    } finally {
      setLoading(false);
    }
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
          stats && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableData>Season</TableData>
                  <TableData>Game Types</TableData>
                </TableRow>
              </TableHead>
              <TableBody>
                {stats.map((item) => (
                  <TableRow key={item.season}>
                    <TableData>{item.season}</TableData>
                    <TableData>{item.gameTypes.join(", ")}</TableData>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )
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

const Message = styled.p`
  margin-top: 20px;
  font-size: 18px;
`;

export default Team;
