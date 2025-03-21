import styled from "styled-components";

export const SendNpsContainer = styled.section`
  padding: 30px 10px;
`;
export const SendNpsContent = styled.form`
  display: grid;
  justify-items: center;
  gap: 20px;
  & > div:not(.guarda-rating) {
    display: grid;
    textarea {
      background-color: var(--dark);
      border: 1px solid var(--main);
      width: 500px;
      height: 100px;
      border-radius: 5px;
      padding: 7px 5px;
    }
  }
  & > div {
    margin-top: 45px;
    & + div {
      margin-top: 45px;
    }
  }
  .pontuacao {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }
  .guarda-rating {
    display: grid;
    justify-items: center;
    gap: 25px;
    & > label {
      text-align: center;
      margin: 0 auto;
    }
  }
  .custom-radio {
    background-color: var(--main);
    cursor: pointer;
    width: 20px;
    height: 20px;
    border-radius: 90px;
    box-shadow: 0 0 0 20px #eee inset;
    transition: 0.3s;
    pointer-events: none;
  }

  input:checked + .custom-radio {
    box-shadow: 0 0 0 3px #eee inset;
  }
  .uma-pontuacao {
    display: grid;
    justify-items: center;
    gap: 10px;
    position: relative;

    & > label {
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 2.275);
    }
    & > div {
      display: grid;
      justify-items: center;
      text-align: center;
      font-style: italic;
      position: relative;
      gap: 3px;
    }
    &:focus-within label {
      transform: scale(1.15);
    }
    input {
      position: absolute;
      cursor: pointer;
      left: 50%;
      top: calc(50% + 6.65px);
      transform: translate(-50%);
      opacity: 0;
    }
  }
`;
