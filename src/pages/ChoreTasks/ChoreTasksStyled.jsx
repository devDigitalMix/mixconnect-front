import styled from "styled-components";

export const ChoreTasksStyled = styled.section`
  max-width: 1200px;
  padding: 20px 10px 50px;
  width: 100%;
  display: grid;
  gap: 30px;
  justify-items: center;
`;
export const ChoreTasksHeader = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  h4 {
    font-size: 1.5rem;
    text-align: center;
    border-bottom: 2px solid var(--main);
  }
  & > img:first-child {
    position: absolute;
    cursor: pointer;
    right: 10px;
  }
`;
export const ChoreTasksBody = styled.div`
  width: 100%;
  display: grid;
  gap: 15px;
`;

export const CreateTaskModalStyled = styled.form`
  position: fixed;
  top: 50%;
  z-index: 10;
  left: 50%;
  display: grid;
  justify-items: center;
  gap: 15px;
  border-radius: 12px;
  padding: 20px;
  transform: translate(-50%, -50%);
  background-color: var(--dark);
  box-shadow: 0 0 0 1px var(--main) inset;
  h5 {
    font-size: 1.4rem;
  }
  span {
    position: absolute;
    top: 10px;
    cursor: pointer;
    right: 10px;
  }
`;

export const ChoreTasksButtons = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ExcludeChoreModal = styled.div`
  position: fixed;
  top: 50%;
  z-index: 10;
  left: 50%;
  display: grid;
  justify-items: center;
  gap: 15px;
  max-width: 300px;
  text-align: center;
  border-radius: 12px;
  padding: 20px;
  transform: translate(-50%, -50%);
  background-color: var(--dark);
  box-shadow: 0 0 0 1px var(--main) inset;
  div {
    display: flex;
    gap: 15px;
  }
`;