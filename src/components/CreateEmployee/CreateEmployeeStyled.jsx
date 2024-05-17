import styled from "styled-components";

export const CreateEmployeeStyled = styled.section`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2000;
  background-color: #fff;
  max-width: 500px;
  width: 100%;
  display: grid;
  justify-items: center;
  form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 25px;
    label {
      font-size: 1.1rem;
      display: block;
    }
    div {
      width: 100%;
      display: grid;
      justify-items: center;
    }
    input,
    textarea {
      max-width: 300px;
      width: 100%;
      padding: 5px;
      margin-top: 5px;
      border: none;
      outline: none;
      border-radius: 0.3em;
      box-shadow: 0 0 0px 1px #a3a3a3;
      &:focus {
        box-shadow: 0 0 2px 1px var(--main);
      }
    }
  }
`;
