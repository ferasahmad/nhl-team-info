"use client";
import styled from "@emotion/styled";
import Image from "next/image";

const Header: React.FC = () => {
  return (
    <Container>
      <Image src="/images/hockey.png" width={50} height={50} alt="" />
      <Title>ICE INTEL</Title>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4281a4;
  padding: 20px 0;
  width: 100%;
`;

const Title = styled.h1`
  color: white;
  font-size: 50px;
  margin-left: 10px;
`;

export default Header;
