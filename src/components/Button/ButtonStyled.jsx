import styled from "styled-components";

export const ButtonSpace = styled.button`
  background-color: var(--main);
  border-radius: 3px;
  color: var(--light);
  padding: 4px 20px;
  border: 1px solid var(--main);
  max-width: fit-content;
  text-transform: uppercase;

  &:hover {
    background-color: var(--light);
    color: var(--main);
  }
`;
