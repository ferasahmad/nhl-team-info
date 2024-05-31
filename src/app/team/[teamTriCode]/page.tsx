"use client";
import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import { fetchClubStats } from "../../../../api";
import { ClubStats } from "../../../../types";
import {
  Table,
  TableBody,
  TableData,
  TableDetail,
  TableLabel,
  TableRow,
} from "../../../../components/Table";
import { TableHead } from "@mui/material";
import LoadingIndicator from "../../../../components/LoadingIndicator";

const Team = ({ params }: { params: { teamTriCode: string } }) => {
  const { teamTriCode } = params;
  const [stats, setStats] = useState<ClubStats[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleFetchStats = useCallback(async (teamTriCode: string) => {
    try {
      const response = await fetchClubStats(teamTriCode);
      setStats(response);
    } catch (error) {
      setError("Failed to fetch team stats. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (teamTriCode) {
      handleFetchStats(teamTriCode);
    }
  }, [teamTriCode, handleFetchStats]);

  return (
    <Container>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        stats && (
          <Table>
            <TableHead>
              <TableRow>
                <TableData>
                  <TableLabel>Season</TableLabel>
                </TableData>
                <TableData>
                  <TableLabel>Game Types</TableLabel>
                </TableData>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((item) => (
                <TableRow key={item.season}>
                  <TableData>
                    <TableDetail>
                      {`${item.season.toString().slice(0, 4)}-${item.season
                        .toString()
                        .slice(4, 8)}`}
                    </TableDetail>
                  </TableData>
                  <TableData>
                    <TableDetail>
                      {item.gameTypes
                        .map((gt) => (gt === 2 ? "Regular Season" : "Playoffs"))
                        .join(", ")}
                    </TableDetail>
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
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

const Message = styled.p`
  margin-top: 20px;
  font-size: 18px;
`;

export default Team;
