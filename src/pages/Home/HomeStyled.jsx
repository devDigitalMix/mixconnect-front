import styled from "styled-components";

export const HomeContainer = styled.section`
  background: linear-gradient(to right, #c5c3ff 0%, #a3a0f8 50%, #4441c8 100%);
  border-radius: 12px;
  padding: 1px;
  width: 100%;
  max-width: 1200px;
  margin: 0 0 50px;
  @media only screen and (max-width: 610px) {
    margin: 50px 0 50px;
  }
`;

export const HomeBody = styled.section`
  background-color: var(--dark);
  border-radius: 12px;
  padding: 20px;
  width: 100%;
`;
