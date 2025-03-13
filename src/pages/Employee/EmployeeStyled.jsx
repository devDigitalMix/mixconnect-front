import styled from "styled-components";

export const TopButtons = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  gap: 10px;
  div {
    display: flex;
    gap: 10px;
  }
  a:first-child {
    margin-right: 10px;
  }
  a {
    display: flex;
    align-items: center;
  }
`;
