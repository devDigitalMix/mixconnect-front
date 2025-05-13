import styled from "styled-components";

export const InputSpace = styled.input`
  background-color: #f9f8fe !important;
  color: var(--dark);
  outline: none;
  border: none;
  font-size: 1rem;
  font-style: normal;
  padding: 10px 10px 8px;
  height: 40px;
  border-radius: 5px;
  width: 100%;
  max-width: 300px;
  resize: vertical;
  &::placeholder {
    font-size: 1rem;
    font-style: italic;
    color: #2f2e2fb9;
  }
  &.invalidInput {
    background-color: #686769 !important;
    color: var(--light);
    &::placeholder {
      color: var(--light);
    }
  }
`;
