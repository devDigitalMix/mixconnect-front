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
  form {
    display: flex;
    gap: 10px;
  }
`;

export const Felipe = styled.div`
  position: absolute;
  font-size: 3rem;
  left: 50%;
  transform: translate(-50%);
  display: grid;
  justify-items: center;
  z-index: 10;
  filter: drop-shadow(0 0 20px var(--main));
  img {
    box-shadow: 0 0 30px 2px var(--main);
  }
  animation: pisca 1s infinite;
  @keyframes pisca {
    50% {
      filter: drop-shadow(0 0 50px var(--main));
    }
  }
`;
