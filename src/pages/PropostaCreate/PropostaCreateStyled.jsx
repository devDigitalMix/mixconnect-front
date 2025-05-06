import styled from "styled-components";

export const PropostaContainer = styled.form`
  margin-bottom: 50px;
  background-color: #00000060;
  padding: 30px;
  border-radius: 10px;
  display: grid;
  gap: 10px;
  max-width: 1000px;
  .formSection {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    .inputQuant {
      border: none;
      padding: 5px 5px 2px;
      max-width: 100px;
      border-radius: 10px;
      color: var(--dark);
    }
    .guardaInput {
      display: flex;
      gap: 6px;
    }
    & + h3 {
      margin-top: 20px;
    }
    .guardaGrupo {
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
  & > button {
    margin: 0 auto;
    margin-top: 20px;
  }
  select {
    background-color: #f9f8fe !important;
    border-radius: 5px;
    font-style: italic;
    font-size: 0.75rem;
    color: var(--dark);
    padding: 8px 10px;
    max-width: 300px;
    resize: vertical;
    outline: none;
    border: none;
    height: 40px;
    width: 100%;
  }
`;
