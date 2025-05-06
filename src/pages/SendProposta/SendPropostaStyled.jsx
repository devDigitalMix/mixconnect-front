import styled from "styled-components";

export const SendPropostaContainer = styled.section`
  margin-bottom: 50px;
  margin-top: 50px;
  background-color: #00000060;
  padding: 30px;
  border-radius: 10px;
  display: grid;
  gap: 10px;
  max-width: 1000px;
  & > div {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    & + h3 {
      margin-top: 20px;
    }
    & > div {
      div {
        align-items: center;
        display: flex;
      }
    }
  }
  & > h3 {
    font-size: 20px;
    font-weight: 600;
    font-family: var(--font2);
  }
  .button-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    .btn-approve {
      background-color: var(--sec);
      color: var(--dark);
      padding: 8px 15px 5px;
      font-size: 22px;
      font-weight: 600;
      border-radius: 10px;
    }
    .btn-reject {
      background-color: var(--danger);
      color: var(--dark);
      padding: 8px 15px 5px;
      font-size: 22px;
      font-weight: 600;
      border-radius: 10px;
    }
  }
`;
