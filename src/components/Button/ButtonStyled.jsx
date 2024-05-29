import styled from "styled-components";

export const ButtonSpace = styled.button`
  background-color: var(--main);
  border-radius: 10px;
  color: var(--light);
  padding: 13px 10px 10px;
  border: 1px solid var(--main);
  max-width: fit-content;
  text-transform: uppercase;
  max-width: 205px;
  width: 100%;
  font-size: 1.25rem;
  font-weight: 700;

  &:hover {
    background-color: var(--light);
    color: var(--main);
  }
`;
