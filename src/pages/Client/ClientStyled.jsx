import styled from "styled-components";

export const ClientStyled = styled.section``;
export const ClientStyledContent = styled.section``;

export const DeleteClientStyled = styled.form`
  width: 100%;
  max-width: 500px;
  position: fixed;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark);
  border: 2px solid var(--main);
  border-radius: 12px;
  padding: 40px;
  display: grid;
  justify-items: center;
  gap: 10px;
  text-align: center;
  h2 {
    font-size: 1.2rem;
    strong {
      color: var(--main);
    }
  }
  h3 {
    i {
      color: var(--main);
    }
  }
  img:first-child {
    position: absolute;
    right: 10px;
    top: 10px;
    transition: all.3s;
    cursor: pointer;
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

export const Drive = styled.a`
  margin-left: auto;
  margin-right: 100px;
  color: #a3a0f8;
`;
