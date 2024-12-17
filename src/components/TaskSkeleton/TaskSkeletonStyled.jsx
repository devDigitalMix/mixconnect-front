import styled from "styled-components";

export const ATask = styled.article`
  border-radius: 12px;
  width: 100%;
  max-width: 1180px;
  background-color: var(--dark);
  padding: 15px;
  height: 120px;
  display: flex;
  align-items: center;
  box-shadow: 0 0 0 1px var(--main);
`;
export const TaskSkeletonContent = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  .box {
    width: 25px;
    height: 25px;
    border-radius: 5px;
    display: block;
    background-color: var(--light);
  }
`;
