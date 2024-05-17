import styled from "styled-components";

export const HomeBody = styled.section`
  max-width: 1200px;
  padding: 50px 20px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 1rem;
`;

export const HomeHeader = styled.section`
  max-width: 1200px;
  width: 100%;
  padding: 50px 20px 0px;
  margin: 0 auto;
`;

export const EmployeeContainer = styled.article``;

export const EmployeeBtns = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
  button {
    background: #1e1e1e;
    color: #f2f2f2;
    padding: 5px 10px;
    border-radius: 5px;
  }
`;
