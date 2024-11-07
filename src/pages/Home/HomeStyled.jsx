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
  @media only screen and (max-width: 900px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const MainBody = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px 20px;
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
  height: 192px;
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
  justify-items: center;
  gap: 10px;
  width: 100%;
`;
export const GuardaGraph = styled.section`
  background: var(--cantoDir);
  border-radius: 10px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 570px) {
    flex-wrap: wrap-reverse;
    width: 100%;
    justify-content: center;
  }
`;

export const Graph = styled.div`
  max-width: fit-content;
  padding-bottom: 4px;
  border-radius: 8px;
  overflow-y: hidden;
  max-height: 268px;
  width: 100%;
  background: var(--dark);
  @media only screen and (max-width: 570px) {
    border-radius: 0 0 8px 8px;
  }

  iframe {
    border: none;
    background: var(--dark);
  }
`;
export const GraphBtns = styled.div`
  background: var(--dark);
  border-radius: 8px;
  padding: 10px;
  max-width: 200px;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: start;
  @media only screen and (max-width: 570px) {
    height: inherit;
    max-width: 600px;
    border-radius: 8px 8px 0 0;
  }
  button {
    max-width: 45px;
    width: 100%;
    gap: 5px;
    display: grid;
    justify-items: center;
    & > span {
      height: 45px;
      max-width: 45px;
      width: 100%;
      background: var(--linear);
      padding: 6px;
      border-radius: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      & > span {
        background: var(--dark);
        transition: all.3s;
        padding: 0px;
        border-radius: 30px;
      }
    }
    p {
      text-align: center;
      font-size: 1rem;
      font-weight: 500;
    }
    &.active {
      & > span span {
        padding: 16px;
      }
    }
  }
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
  gap: 50px;
  justify-content: center;
  background-color: var(--dark);
  padding: 10px 20px;
  width: 100%;
  border-radius: 7px;

  @media only screen and (max-width: 570px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px 50px;
    padding: 20px;
  }
`;
export const GuardaBodyInfo = styled.div`
  background: var(--cantoDir);
  padding: 2px;
  max-width: 512px;
  width: 100%;
  border-radius: 8px;
`;
