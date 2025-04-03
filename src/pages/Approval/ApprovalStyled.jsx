import styled from "styled-components";

export const ApprovalStyled = styled.section`
  width: 100%;
  max-width: 1200px;
  display: grid;
  justify-items: center;
  gap: 0;
  background-color: #1e1e1e;
  border: 1px solid var(--main);
  padding: 20px;
  padding-top: 15px;
  border-radius: 10px;
  margin-bottom: 50px;
  position: relative;
  .images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    align-items: start;
    img {
      max-width: 350px;
    }
  }
  h4 {
    padding: 4px 20px 5px;
    font-weight: 600;
    font-family: var(--font2);
    font-size: 1.2rem;
    margin-bottom: 5px;
    letter-spacing: 1px;
    &.approved {
      color: var(--sec);
      text-shadow: 0 0 10px var(--sec);
    }
    &.denied {
      color: var(--danger);
      text-shadow: 0 0 10px var(--danger);
    }
  }
  #feedback {
    background: #141414;
    max-width: 400px;
    width: 100%;
    padding: 10px;
    min-height: 100px;
    border-radius: 10px;
    border: 2px solid var(--main);
  }
`;

export const ApprovalHeader = styled.header`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 30px;
  display: grid;
  justify-items: center;
  h2 {
    font-size: 1.4rem;
    font-weight: 600;
    font-family: var(--font2);
  }
  #voltar {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  #linkCliente {
    position: absolute;
    color: var(--main);
    right: 10px;
    top: 10px;
  }
`;
