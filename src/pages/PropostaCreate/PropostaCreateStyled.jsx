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
    align-items: end;
    & > div {
      max-width: 300px;
    }
    .extraDiv {
      display: grid;
      gap: 5px;
      transition: 0.3s;
      position: relative;
      z-index: 2;
      margin-bottom: 15px;
      .remove {
        position: absolute;
        z-index: -1;
        right: 0;
        top: 50%;
        transform: translateY(-50%) scale(0);
        background-color: red;
        width: 35px;
        height: 35px;
        display: flex;
        align-items: center;
        font-weight: 700;
        padding-top: 2px;
        justify-content: center;
        font-family: var(--font);
        border-radius: 50px;
        &:hover {
          background-color: #fff;
          box-shadow: 0 0 0 2px red inset;
          color: red;
        }
      }
      textarea {
        border: none;
        color: var(--dark);
        font-family: var(--font2);
        max-width: 300px;
        width: 100%;
        border-radius: 5px;
        padding: 5px 10px;
        outline: none;
      }
      .extraImage {
        margin-top: 10px;
        label {
          transition: 0.3s;
          cursor: pointer;
          padding: 10px 15px;
        }
        input {
          max-width: 300px;
          width: 100%;
          opacity: 0;
          transform: scale(0);
          height: 0;
          width: 0;
        }
      }
      &:hover {
        padding-right: 45px;
        .remove {
          transform: translateY(-50%) scale(1);
        }
      }
    }
    .mainLabel {
      font-size: 18px;
      text-transform: uppercase;
      span {
        color: var(--sec);
      }
    }
    #prazo {
      input {
        max-width: 70px;
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
      img {
        cursor: pointer;
      }
    }
    .inputContainer {
      display: grid;
      .guardaInput + label {
        margin-top: 15px;
      }
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
      align-items: start;
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
