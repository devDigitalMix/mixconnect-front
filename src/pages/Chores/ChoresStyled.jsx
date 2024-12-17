import styled from "styled-components";

export const ChoresStyled = styled.section`
  position: relative;
  max-width: 1200px;
  padding: 40px 10px 50px;
  width: 100%;
  display: grid;
  justify-items: center;
  gap: 30px;
  #novaTarefa {
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    transition: all.3s;
    &:hover {
      filter: hue-rotate(280deg);
      filter: saturate(1000%) drop-shadow(0 0 5px #4441c8);
    }
    &:active {
      transform: scale(0.9);
      transition: transform 0.1s;
    }
  }
`;

export const ChoresContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 40px;
  a {
    height: 100px;
    max-width: 250px;
    width: 100%;
    border-radius: 12px;
    font-size: 1.2rem;
    cursor: pointer;
    position: relative;
    background-color: var(--dark);
    padding: 1px;
    #nb {
      position: absolute;
      bottom: 0;
      left: 0;
    }
    #nt {
      position: absolute;
      right: 0;
      top: 0;
    }
    .choreContent {
      position: relative;
      z-index: 4;
      background-color: var(--dark);
      width: 100%;
      border-radius: 10px;
      height: 98px;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all.3s;
    }
    &:hover {
      box-shadow: 0 0 10px 1px var(--main);
    }
  }
`;

export const CreateChoreModal = styled.form`
  background-color: var(--dark);
  display: grid;
  justify-items: center;
  position: relative;
  z-index: 100;
  gap: 20px;
  border: 1px solid var(--main);
  padding: 30px;
  position: fixed;
  border-radius: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  h4 {
    font-size: 1.5em;
  }
`;
