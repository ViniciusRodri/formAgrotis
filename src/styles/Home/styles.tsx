import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 50px 50px;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0px 1px 3px 0px #00000042;
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 5px 10px;
  background-color: #00796b;

  .title {
    font-size: 18px;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 5px 10px;

  .row {
    display: flex;
    align-items: baseline;
    gap: 20px;

    .error {
      color: red;
      font-size: 12px;
    }
  }
`;

export const Alert = styled.div`
  margin: 0 20px;
`;
