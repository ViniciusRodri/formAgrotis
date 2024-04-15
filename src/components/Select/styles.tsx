import styled from "styled-components";

export const infoSelect = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;

  p {
    opacity: 0.5;
    padding: 0;
    margin: 0;
  }
`;

export const Error = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;

  p {
    color: red;
    font-size: 12px;
    margin: 5px;
    padding: 5px;
  }
`;
