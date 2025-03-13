import styled from "styled-components";

export const TaskStyled = styled.article`
  position: relative;
  background-color: var(--dark);
  border-radius: 12px;
  width: 100%;
  max-width: 1180px;
  padding: 1px;
  height: 120px;
  span {
    display: block;
    width: 25px;
    height: 25px;
    cursor: pointer;
    border-radius: 5px;
  }
  box-shadow: 0 0 0 1px var(--main);
  display: flex;
  gap: 15px;
  padding: 15px;
  align-items: center;
  /* #nb {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  #nt {
    position: absolute;
    right: 0;
    top: 0;
  } */
  .done {
    background-color: var(--sec);
  }
  .working {
    background-color: var(--main);
  }
  .open {
    background-color: var(--light);
  }
  &:hover {
    button {
      opacity: 1;
    }
    div {
      opacity: 1;
    }
  }
`;

export const TaskContent = styled.div`
  background-color: var(--dark);
  height: 118px;
  width: 100%;
  max-width: 1180px;
  position: relative;
  z-index: 3;
  border-radius: 10px;
`;

export const SelectState = styled.form`
  display: grid;
  justify-items: center;
  gap: 10px;
  align-items: center;
  position: relative;
  div {
    position: relative;
    display: grid;
    z-index: 1;
    justify-items: center;
    align-items: center;
    input {
      position: absolute;
      top: 50%;
      margin: 0;
      left: 50%;
      height: 25px;
      width: 25px;
      opacity: 0;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }
  }
  .customRadio {
    display: block;
    cursor: pointer;
    height: 25px;
    width: 25px;
    &.open {
      background-color: var(--light);
    }
    &.working {
      background-color: var(--main);
    }
    &.done {
      background-color: var(--sec);
    }
  }
`;

export const TaskBtns = styled.div`
  position: absolute;
  right: 20px;
  bottom: 50%;
  transform: translateY(50%);
  display: flex;
  flex-direction: column;
  gap: 15px;
  button {
    opacity: 0;
    img {
      height: 20px;
      width: 20px;
    }
    @media only screen and (max-width: 500px) {
      opacity: 1;
    }
  }
`;

export const UpdateDescStyled = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  input {
    max-width: 500px;
  }
`;

export const Arrows = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: all.3s;
  position: absolute;
  left: 0;
  transform: translateX(-100%);
  opacity: 0;
  img {
    cursor: pointer;
    &:hover {
      transition: all.3s;
      filter: drop-shadow(0 0 1px var(--main)) drop-shadow(0 0 1px var(--main))
        drop-shadow(0 0 1px var(--main)) contrast(150%);
    }
    &:active {
      transition: all.1s;
      transform: scale(0.9);
    }
  }
  @media only screen and (max-width: 500px) {
    opacity: 1;
  }
`;
