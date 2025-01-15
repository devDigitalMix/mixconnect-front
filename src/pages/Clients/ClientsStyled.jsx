import styled from "styled-components";

export const ClientsStyled = styled.section`
  max-width: 1200px;
  width: 100%;
  padding-bottom: 50px;
  margin: o auto;
`;
export const ClientHeader = styled.div`
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  form {
    margin-left: auto;
    display: flex;
    gap: 10px;
  }

  .clientsOpt {
    a {
      margin-left: 10px;
      text-decoration: underline;
      font-style: italic;
      &:hover {
        color: var(--main);
      }
    }
  }
  @media only screen and (max-width: 530px) {
    flex-direction: column;
    justify-content: center;
    gap: 25px;
  }
`;
export const ClientBody = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  gap: 10px 40px;
  align-items: center;
  overflow-y: hidden;
  width: 100%;
  & > a {
    max-width: 370px;
    width: 100%;
    min-height: 267px;
  }
  @media only screen and (max-width: 1090px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;
export const AClient = styled.article`
  background: var(--cantoEsq);
  padding: 1px;
  border-radius: 12px;
  max-width: 370px;
  width: 100%;
  min-height: 267px;
  margin-bottom: 30px;
`;

export const ClientContent = styled.div`
  height: 100%;
  min-height: 267px;
  width: 100%;
  background-color: #111111e1;
  padding: 20px;
  border-radius: 12px;
  display: grid;
`;

export const ClientHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  h2 {
    font-size: 1.25rem;
  }
  p {
    color: var(--main);
    font-family: var(--font);
    font-size: 1.2rem;
  }
  .clientLogo {
    width: 100%;
    max-width: 100px;
    height: 100px;
    border-radius: 100%;
    object-fit: cover;
    box-shadow: 0 0 0 2px var(--main);
  }
`;

export const AddClientModal = styled.form`
  width: 100%;
  height: 0;
  transform: translateY(-100%);
  transition: all 0.5s;

  & > * {
    transform: scale(0);
    transition: none;
    transition-delay: 0;
  }

  &.active {
    height: 355px;
    transform: translateY(0);
    margin-bottom: 30px;

    & > * {
      transform: scale(1);
      transition: all 0.5s;
      transition-delay: 0.1s;
    }
    @media only screen and (max-width: 991px) {
      height: 503px;
    }
    @media only screen and (max-width: 751px) {
      height: 820px;
    }
  }

  background-color: var(--dark);
  padding: 30px 20px;
  border-radius: 12px;
  border: 1px solid var(--main);
  display: grid;
  gap: 30px;
  grid-column: 1 / 4;

  @media only screen and (max-width: 1090px) {
    grid-column: 1 / 3;
  }
  @media only screen and (max-width: 750px) {
    grid-column: 1;
  }

  & > input {
    max-width: 300px;
    width: 100%;
    background-color: transparent;
    border: none;
    margin: 0 auto;
    text-align: center;
    font-size: 1.5rem;
    font-family: var(--font);
    color: var(--main);
  }
  .custom-loader {
    max-width: fit-content;
    margin: 0 auto;
  }
  .clientInfo {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    gap: 20px;
    @media only screen and (max-width: 990px) {
      grid-template-columns: 1fr 1fr;
    }
    @media only screen and (max-width: 750px) {
      grid-template-columns: 1fr;
    }
    div {
      max-width: 300px;
      display: grid;
      width: 100%;
      label {
        font-style: italic;
        font-weight: 700;
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
      option {
        font-style: normal;
      }
    }
  }
`;

export const FiltroModal = styled.form`
  transform: translate(-50%, -50%);
  background-color: var(--dark);
  border: 1px solid var(--main);
  justify-items: center;
  border-radius: 12px;
  max-width: 500px;
  position: fixed;
  display: grid;
  padding: 20px;
  z-index: 10;
  width: 100%;
  left: 50%;
  gap: 20px;
  top: 50%;
  #close {
    position: absolute;
    transition: 0.3s;
    cursor: pointer;
    padding: 5px;
    right: 15px;
    top: 10px;
    &:hover {
      color: var(--main);
    }
  }
  .value {
    display: flex;
    align-items: center;
    position: relative;
    gap: 10px;
    font-size: 1.25rem;
    font-weight: 500;
    right: 25px;
    input {
      height: 25px;
      cursor: pointer;
      width: 25px;
      position: relative;
      z-index: 3;
      opacity: 0;
    }
    input:checked + .checkbox {
      transform: rotate(180deg);
    }
  }
  .checkbox {
    display: block;
    position: absolute;
    z-index: 1;
    transition: all.3s;
    left: 4px;
  }
  div:not(.custom-loader, .value) {
    display: grid;
    text-align: center;
    width: 100%;
    max-width: 250px;
    text-align: center;
    label {
      font-size: 1.25rem;
      font-weight: 500;
    }
    select {
      background-color: #f9f8fe !important;
      color: var(--dark);
      outline: none;
      padding: 8px 10px 5px;
      max-height: 37px;
      font-weight: 600;
      border-radius: 6px;
    }
    option {
      font-weight: 600;
      text-align: center;
    }
  }
`;

export const PageButtons = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
  p {
    padding: 5px;
    cursor: pointer;
  }
  /* div {
    display: flex;
    align-items: center;
    gap: 10px;
  } */
`;
