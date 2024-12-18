import styled from "styled-components";

export const DeletedClientsStyled = styled.section`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;
export const DeletedClientsHeader = styled.header`
  margin-bottom: 20px;
  a {
    max-width: fit-content;
  }
`;
export const DeletedClientsBody = styled.main`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  gap: 40px;
  align-items: center;
  overflow-y: hidden;
  width: 100%;
  & > a {
    max-width: 370px;
    width: 100%;
    min-height: 267px;
  }
  @media only screen and (max-width: 1090px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (max-width: 750px) {
    grid-template-columns: 1fr;
  }
`;
export const AClientDeleted = styled.article`
  background: var(--cantoEsq);
  padding: 1px;
  border-radius: 12px;
  max-width: 370px;
  width: 100%;
  min-height: 267px;
  filter: grayscale(60%);
`;
export const ClientDeletedContent = styled.div`
  height: 100%;
  min-height: 267px;
  width: 100%;
  background-color: #111111e1;
  padding: 20px;
  border-radius: 12px;
  display: grid;
`;
export const ClientDeletedHead = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  h2 {
    font-size: 1.25rem;
  }
  p {
    color: var(--main);
    font-family: var(--font);
    font-size: 1.2rem;
  }
  .clientLogo {
    width: 100%;
    max-width: 100px;
    height: 100px;
    border-radius: 100%;
    object-fit: cover;
    box-shadow: 0 0 0 2px var(--main);
  }
`;
