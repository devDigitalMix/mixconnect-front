import styled from "styled-components";

export const InputSpace = styled.input`
  background-color: #f9f8fe !important;
  color: var(--dark);
  outline: none;
  border: none;
  padding: 8px 10px;
  max-height: 37px;
  font-weight: 600;
  border-radius: 13px;
  width: 100%;
  max-width: 300px;
  resize: vertical;
  font-family: var(--font2);
  &::placeholder {
    font-style: italic;
    color: var(--main);
    font-weight: 400;
  }
`;
