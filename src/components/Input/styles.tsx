import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  width: 100%;

  p {
    color: red;
    font-size: 12px;
    margin: 5px;
    padding: 5px;
  }

  .error {
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;
