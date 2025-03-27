import styled from "styled-components";

export const AllNpsContainer = styled.section`
  display: grid;
  justify-items: center;
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 30px 10px;
  position: relative;
  & > h2 {
    font-size: 1.5rem;
    font-weight: 600;
  }
  .img-effect {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  #npsInputClient {
    position: absolute;
    right: 0;
  }
`;
export const NpsContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px 30px;
  max-width: 1200px;
  width: 100%;
  justify-content: center;
`;
export const NpsUnit = styled.div`
  max-width: 272px;
  width: 100%;
  padding: 15px 20px;
  background: var(--dark);
  border-radius: 10px;
  position: relative;
  /* border: 1px solid var(--main); */

  &::after,
  &::before {
    content: "";
    position: absolute;
    height: 103%;
    width: 101.5%;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    opacity: 0;
    background: ${(props) =>
      `conic-gradient(from ${props.angle}deg, transparent 70%, var(--main))`};
    transition: opacity 1s ease;
  }
  &:hover {
    &::after,
    &::before {
      transition: opacity 0.6s ease;
      opacity: 1;
      background: ${(props) =>
        `conic-gradient(from ${props.angle}deg, transparent 70%, var(--main))`};
    }
  }

  &::before {
    filter: blur(1.5rem);
  }
  cursor: pointer;
  transition: all.3s;

  .respondido {
    color: var(--sec);
  }
  .aberto {
    color: #bab3cf;
  }
  h2 {
    font-size: 1.2rem;
    color: var(--main);
  }
`;
