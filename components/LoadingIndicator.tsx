import React from "react";
import Image from "next/image";
import styled from "@emotion/styled";

const LoadingIndicator: React.FC = () => {
  return (
    <Spinner>
      <Image src="/images/hockey.png" width={50} height={50} alt="Loading" />
    </Spinner>
  );
};

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  animation: rotate 2s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default LoadingIndicator;
