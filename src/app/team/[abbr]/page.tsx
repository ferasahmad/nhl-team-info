"use client";
import React from "react";
import styled from "@emotion/styled";

const Team: React.FC = () => {
  return (
    <>
      <Header>
        <Title>ICE INTEL</Title>
      </Header>
      <Container></Container>
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

export default Team;
