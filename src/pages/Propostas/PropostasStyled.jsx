import styled from "styled-components";

export const PropostasContainer = styled.section`
  width: 100%;
  max-width: 1200px;
  padding: 30px 10px 60px;
`;
export const PropostasHeader = styled.header`
  display: flex;
  justify-content: space-between;
  max-width: 1088px;
  margin: 0 auto;
  margin-bottom: 40px;
  gap: 30px 20px;
  flex-wrap: wrap;
  @media only screen and (max-width: 1095px) {
    justify-content: center;
  }
  div {
    button {
      min-height: 86px;
      max-width: 327px;
      min-width: 327px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 50px;
      font-weight: 800;
      line-height: 1em;
      transition: 0.3s;
      background-color: #000;
      padding-top: 10px;
      border-radius: 5px;
      &.active {
        box-shadow: 0 0 0 2px #fff;
        max-width: 375px;
        min-width: 375px;
      }
      &.btnabertas {
        background: linear-gradient(
          to left,
          #c5c3ff 0%,
          #a3a0f8 49%,
          #4441c8 100%
        );
      }
      &.btnaprovadas {
        background: var(--sec);
      }
      &.btnexpiradas {
        background: #686769;
      }
      @media only screen and (max-width: 450px) {
        min-width: 250px;
        &.active {
          box-shadow: 0 0 0 2px #fff;
          max-width: 375px;
          min-width: 305px;
        }
      }
    }
  }
`;
export const PropostasBody = styled.div`
  background-color: #2f2f34;
  border-radius: 10px;
  max-width: 1092px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
  display: grid;
  gap: 20px;
  justify-items: center;
  & > h3 {
    font-weight: 800;
    font-size: 25px;
  }
`;
export const PropostaCard = styled.article`
  background: #edeaee;
  color: var(--dark);
  display: grid;
  grid-template-columns: 0.35fr 0.6fr 1fr 0.3fr;
  align-items: center;
  max-width: 983px;
  border-radius: 10px;
  padding: 10px 25px;
  width: 100%;
  gap: 40px;
  @media only screen and (max-width: 765px) {
    grid-template-columns: 1fr 1fr;
    justify-items: center;
    text-align: center;
    gap: 20px;
  }
  h4 {
    font-size: 25px;
    font-weight: 500;
    line-height: 1em;
    padding-top: 5px;
    strong {
      font-weight: 800;
    }
  }
  h2 {
    font-size: 25px;
    font-weight: 800;
    line-height: 1em;
    padding-top: 5px;
  }
  .time {
    display: grid;
    position: relative;
    line-height: 1.25em;
    font-weight: 500;
    p {
      font-size: 22px;
      padding-left: 30px;
    }
    span {
      font-size: 15px;
    }
  }
  @media only screen and (max-width: 450px) {
    grid-template-columns: 1fr;
    h2 {
      padding-top: 0;
    }
    .time {
      p {
        padding-left: 0;
      }
    }
  }
  .propostaBtns {
    display: flex;
    gap: 10px;
    position: relative;
    button,
    a {
      width: 40px;
      height: 40px;
      position: relative;
      z-index: 2;
      border-radius: 30px;
      &::before {
        content: "";
        background-color: #000;
        position: absolute;
        width: 30px;
        height: 30px;
        border-radius: 30px;
        transition: 0.3s;
        left: 3px;
        top: 3px;
        z-index: -1;
      }
    }
  }
`;
