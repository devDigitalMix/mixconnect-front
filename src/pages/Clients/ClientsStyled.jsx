import styled from "styled-components";

export const ClientsStyled = styled.section`
  max-width: 1200px;
  width: 100%;
  margin: o auto;
`;
export const ClientHeader = styled.div`
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;
export const ClientBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  align-items: center;
  width: 100%;
`;
export const AClient = styled.article`
  max-width: 340px;
  width: 100%;
  height: 267px;
  background: var(--linear);
  padding: 1px;
  border-radius: 12px;
`;

export const ClientContent = styled.div`
  height: 100%;
  width: 100%;
  background-color: var(--dark);
  padding: 20px;
  border-radius: 12px;
`;
