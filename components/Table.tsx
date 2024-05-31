import styled from "@emotion/styled";

export const Table = styled.table`
  background: white;
  border-radius: 20px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
`;

export const TableHead = styled.thead`
  background: #f5f5f5;
`;

export const TableData = styled.td`
  flex: 1;
  padding: 10px;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid #d8d8d8;
  justify-content: space-between;
  align-items: center;
`;

export const TableLabel = styled.p`
  font-weight: 700;
  text-align: center;
`;

export const TableDetail = styled.p`
  text-align: center;
`;
