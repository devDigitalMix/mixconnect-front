import styled from "styled-components";

export const AChore = styled.article`
  height: 100px;
  max-width: 250px;
  width: 100%;
  border-radius: 12px;
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
  background-color: var(--dark);
  padding: 1px;
  #nb {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  #nt {
    position: absolute;
    right: 0;
    top: 0;
  }
`;
export const ChoreContent = styled.div`
  position: relative;
  z-index: 4;
  background-color: var(--dark);
  width: 100%;
  border-radius: 10px;
  height: 98px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all.3s;
`;
