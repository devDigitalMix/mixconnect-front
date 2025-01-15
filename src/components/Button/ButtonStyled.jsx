import styled from "styled-components";

export const ButtonSpace = styled.button`
  background: linear-gradient(to left, #c5c3ff 0%, #a3a0f8 49%, #4441c8 100%);
  max-width: fit-content;
  margin: 0 auto;
  padding: 7px 20px 3px;
  max-width: 205px;
  width: 100%;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 1.25rem;
  border-radius: 5px;
  color: var(--light);
  box-shadow: 0 0 0 0px var(--light) inset;
  &:hover {
    color: var(--main);
    box-shadow: 0 0 30px 20px var(--light) inset;
  }
`;
