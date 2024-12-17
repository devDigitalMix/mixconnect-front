import styled from "styled-components";

export const DeletedCLientBtns = styled.div`
  position: absolute;
  right: 120px;
  top: 20px;
  display: flex;
  gap: 15px;
  button {
    font-family: var(--font2);
    font-weight: 400;
    font-size: 1.2rem;
    &:hover {
      color: var(--main);
    }
  }
`;
