import styled from "styled-components";

export const EmployeeBody = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 20px;
`;
export const EmployeeContainer = styled.article`
  transition: all.3s;
  border-radius: 12px;
  &:hover {
    cursor: pointer;
    transform: scale(1.01) translateY(-2px);
    box-shadow: 0 0 8px 1px var(--main);
  }
`;

export const EmployeesHeader = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  margin: 10px auto 20px;
  justify-content: space-between;
  gap: 20px;
  input {
    margin-left: auto;
  }
  & > img:first-child {
    transition: all.3s;
    cursor: pointer;
    &:hover {
      filter: hue-rotate(280deg);
      filter: saturate(1000%) drop-shadow(0 0 5px #4441c8);
    }
    &:active {
      transform: scale(0.9);
      transition: transform 0.1s;
    }
  }
`;
