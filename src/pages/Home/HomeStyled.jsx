import styled from "styled-components";

export const HomeBody = styled.section`
  border-radius: 12px;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: start;
`;

export const MainBody = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;
export const GuardaMainData = styled.article`
  background: var(--cantoEsq);
  border-radius: 10px;
  max-width: 255px;
  width: 100%;
  padding: 2px;
`;
export const MainData = styled.div`
  background-color: var(--dark);
  height: 190px;
  max-width: 255px;
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  h3 {
    font-weight: 900;
    line-height: 1em;
    font-size: 4.37rem;
    position: relative;
    img {
      position: absolute;
      right: -10px;
      bottom: 50%;
      transform: translate(100%, 50%);
    }
  }
  h2 {
    font-weight: 500;
  }
`;

export const BodyContent = styled.section`
  display: grid;
  gap: 40px;
  width: 100%;
`;

export const AData = styled.article`
  max-width: 75px;
  width: 100%;
  gap: 5px;
  display: grid;
  justify-items: center;
  h3 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 500;
  }
`;

export const DataNumber = styled.div`
  height: 75px;
  max-width: 75px;
  width: 100%;
  background: var(--linear);
  padding: 6px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  h4 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    font-weight: 900;
    background-color: var(--dark);
    padding: 5px;
    padding-left: 5px;
    padding-top: 7px;
    max-width: 55px;
    width: 100%;
    height: 55px;
    border-radius: 50px;
  }
`;
export const BodyInfo = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  background-color: var(--dark);
  padding: 20px;
  width: 100%;
  border-radius: 7px;
`;
export const GuardaBodyInfo = styled.div`
  background: var(--cantoDir);
  padding: 2px;
  max-width: 512px;
  width: 100%;
  border-radius: 8px;
`;
