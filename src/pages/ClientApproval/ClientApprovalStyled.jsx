import styled from "styled-components";

export const ClientApprovalContainer = styled.section`
  background-color: var(--dark);
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 50px;
  @media only screen and (max-width: 560px) {
    padding: 30px 10px;
  }
`;

export const ClientApprovalHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  h1 {
    font-size: 1.55rem;
  }
  img {
    position: absolute;
    right: 0;
  }
  #voltar {
    left: 10px;
  }
`;

export const CreateApprovalModal = styled.form`
  opacity: 0;
  height: 0;
  transform: scale(0);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  &.active {
    margin-bottom: 30px;
    transform: scale(1);
    height: inherit;
    /* height: 530px; */
    opacity: 1;
  }
  & > label {
    font-weight: 600;
    font-family: var(--font2);
    font-size: 1.3rem;
    line-height: 1em;
  }
  .image-label {
    z-index: 2;
    background-color: #ebebeb;
    max-width: 350px;
    width: 100%;
    height: 438px;
    display: grid;
    grid-template-areas: "stack";
    & > * {
      grid-area: stack;
    }
    #drop-file {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 12px;
      border: 2px dashed #636363;
      transition: all.3s;
    }
    input {
      opacity: 0;
    }
    transition: all.3s;
    &.active {
      background-color: #95b1ff;
      #drop-file {
        margin: 15px;
      }
    }
  }
`;

export const FileContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
`;

export const ClientApprovalBody = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: start;
  & > a {
    display: grid;
    gap: 10px;
    max-width: 300px;
    border: 2px solid grey;
    position: relative;
    filter: grayscale(100%);
    &::after {
      content: "Em Aprovação";
      font-size: 1.2rem;
      text-shadow: 0 0 2px #000, 0 0 2px #000, 0 0 2px #000;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    &.approved {
      border: 2px solid #76ffbd;
      filter: none;
      &::after {
        content: "";
      }
    }
    &.denied {
      border: 2px solid #d20e0e;
      filter: grayscale(50%);
      &::after {
        content: "Rejeitado";
      }
    }
    border-radius: 10px;
    img {
      border-radius: 8px;
    }
  }

  @media only screen and (max-width: 560px) {
    & > a {
      display: grid;
      gap: 10px;
      max-width: 175px;
      &::after {
        font-size: 1rem;
        text-align: center;
      }
    }
  }
`;
