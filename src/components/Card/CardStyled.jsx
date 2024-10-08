import styled from "styled-components";

export const CardContainer = styled.article`
  background: linear-gradient(to right, #c5c3ff 0%, #a3a0f8 50%, #4441c8 100%);
  border-radius: 12px;
  padding: 1px;
  width: 100%;
  max-width: 1200px;
  transition: all.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.01) translateY(-2px);
    box-shadow: 0 0 8px 1px var(--main);
  }
`;

export const CardStyled = styled.div`
  transition: all.3s;
  background-color: var(--dark);
  width: 100%;
  display: flex;
  padding: 20px;
  gap: 20px;
  border-radius: 12px;
  div {
    display: flex;
    justify-content: center;
    flex-direction: column;
    h2 {
      font-size: 1rem;
      font-family: var(--font);
      text-transform: uppercase;
    }
    p {
      color: var(--main);
    }
  }
  img {
    width: 100%;
    max-width: 100px;
    height: 100px;
    border-radius: 100%;
    object-fit: cover;
    /* box-shadow: 0 0 0 2px var(--main); */
  }
`;
