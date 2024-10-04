import styled from "styled-components";

export const LoginsStyled = styled.section`
  max-width: 1200px;
  width: 100%;
  display: grid;
  gap: 20px;
`;
export const LoginsBody = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
`;
export const LoginsHeader = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  .hide {
    cursor: pointer;
    max-width: 35px;
    filter: invert(60%);
  }
  form {
    margin-left: auto;
    display: flex;
    gap: 15px;
  }
`;
export const LoginItem = styled.article`
  background-color: var(--dark);
  border: 1px solid var(--main);
  padding: 20px;
  border-radius: 12px;
  max-width: fit-content;
  max-width: 300px;
  width: 100%;
  min-height: 150px;
  position: relative;
  & > * {
    max-width: fit-content;
  }

  .login-settings {
    position: absolute;
    right: 5px;
    top: 5px;
    opacity: 0;
    display: grid;
    gap: 10px;
    cursor: pointer;
    transition: all.3s;
    img {
      max-width: 30px;
    }
  }
  &:hover {
    .login-settings {
      opacity: 1;
    }
  }
`;

export const CreateLogin = styled.form`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background-color: var(--dark);
  border: 1px solid var(--main);
  border-radius: 12px;
  padding: 25px;
  display: grid;
  gap: 20px;
  img {
    max-width: 25px;
    position: absolute;
    right: 5px;
    top: 5px;
  }
  div {
    display: grid;
    gap: 5px;
    label {
      font-size: 1.2rem;
    }
  }
`;
