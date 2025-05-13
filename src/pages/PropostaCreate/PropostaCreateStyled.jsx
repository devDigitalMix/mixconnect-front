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
    gap: 25px;
    align-items: end;
    .mainLabel {
      font-size: 18px;
      text-transform: uppercase;
      span {
        color: var(--sec);
      }
    }
    .inputQuant {
      border: none;
      padding: 5px 5px 5px;
      padding-left: 15px;
      max-width: 70px;
      border-radius: 5px;
      color: var(--dark);
      font-family: var(--font2);
      text-align: center;
    }
    .dobras {
      display: flex;
      gap: 3px;
      .inputQuant {
        padding-left: 5px;
      }
    }
    input {
      font-family: var(--font2);
    }
    label {
      font-size: 15px;
      font-weight: 500;
    }
    .guardaInput {
      display: flex;
      gap: 3px;
    }
    & + h3 {
      margin-top: 30px;
    }
    .guardaGrupo {
      div {
        align-items: center;
        display: flex;
      }
    }
    &.redesSection {
      margin-top: 30px;
      gap: 20px 60px;
      h3 {
        font-size: 18px;
        letter-spacing: 1px;
        text-transform: uppercase;
      }
    }
    select {
      font-size: 18px;
      font: var(--font2);
      font-style: italic;
    }
  }
  & > h3 {
    font-size: 18px;
    text-transform: uppercase;
    letter-spacing: 1px;
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
