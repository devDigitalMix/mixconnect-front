import styled from "styled-components";

export const NpsItemSkeletonStyled = styled.div`
  max-width: 272px;
  width: 100%;
  padding: 15px 20px;
  background: var(--dark);
  border-radius: 10px;
  position: relative;
  display: grid;
  justify-items: center;
  text-align: center;
  img {
    width: 100%;
    max-width: 80px;
    min-width: 80px;
    height: 80px;
    border-radius: 100%;
    object-fit: cover;
  }
  & > div {
    display: grid;
    justify-items: center;
  }
`;
