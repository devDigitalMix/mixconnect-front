import styled from "styled-components";

export const InputSpace = styled.input`
  background-color: #f9f8fe !important;
  color: var(--dark);
  outline: none;
  padding: 8px 10px 5px;
  max-height: 37px;
  font-weight: 600;
  border-radius: 6px;
  width: 100%;
  max-width: 300px;
  resize: vertical;
  &::placeholder {
    font-style: italic;
  }
`;
