import styled from "styled-components";

export const TaskStyled = styled.article`
  position: relative;
  background-color: var(--dark);
  box-shadow: 0 0 0 1px var(--main) inset;
  border-radius: 12px;
  width: 100%;
  padding: 15px;
  height: 120px;
  display: flex;
  gap: 15px;
  align-items: center;
  span {
    display: block;
    width: 25px;
    height: 25px;
    cursor: pointer;
    border-radius: 5px;
  }
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
  }
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
  bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  button {
    opacity: 0;
  }
`;

export const UpdateDescStyled = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
`;
