import styled from "styled-components";

export const SendPropostaContainer = styled.section`
  background-color: #000000c3;
  padding: 30px 0;
  width: 100%;
  .entregaveisHeader {
    display: grid;
    justify-items: center;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 50px;
    h4 {
      position: relative;
      max-width: 940px;
      top: 20px;
      background: linear-gradient(to bottom, #a9a7ff 0%, #a9a7ff16 100%);
      background-clip: text;
      color: transparent;
      line-height: 1.1em;
      padding-top: 10px;
      filter: brightness(0.3);
      font-size: 50px;
      font-weight: 700;
      span {
        font-size: 30px;
        font-weight: 400;
      }
      i {
        font-size: 45px;
        font-weight: 400;
      }
    }
    h3 {
      font-size: 80px;
      font-weight: 700;
      max-width: 1100px;
      line-height: 1em;
    }
    p {
      font-size: 30px;
      margin-top: 15px;
      opacity: 0.8;
      max-width: 1185px;
    }
    @media only screen and (max-width: 500px) {
      h4 {
        font-size: 25px;
        top: 15px;
        span {
          font-size: 20px;
        }
        i {
          font-size: 35px;
          font-weight: 400;
        }
      }
      h3 {
        font-size: 45px;
      }
      p {
        font-size: 20px;
      }
    }
  }
`;

export const SendPropostaHeader = styled.header`
  display: grid;
  justify-items: center;
  gap: 20px;
  & > img {
    margin-top: 15px;
  }
  .headerInfo {
    display: grid;
    gap: 10px;
    h2 {
      font-size: 32px;
      font-style: italic;
      color: #a1a1a1;
      span {
        font-weight: 600;
        color: #fff;
        font-size: 45px;
      }
      &:last-child {
        margin-left: auto;
        text-align: right;
      }
    }
    h1 {
      font-size: 90px;
      font-weight: 700;
      line-height: 1em;
    }
    @media only screen and (max-width: 500px) {
      h2 {
        font-size: 22px;
        span {
          font-weight: 600;
          color: #fff;
          font-size: 27px;
        }
      }
      h1 {
        font-size: 50px;
        text-align: center;
      }
    }
  }
`;

export const PropostaCards = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 30px;
  .card {
    position: relative;
    z-index: 1;
    & > p {
      font-size: 30px;
      font-family: var(--font2);
      margin-left: auto;
      text-align: right;
      margin-right: 15px;
      @media only screen and (max-width: 500px) {
        font-size: 20px;
      }
    }
  }
  .cardContent {
    background: #1e1e1e;
    padding: 10px 25px;
    border-radius: 30px;
    min-height: 175px;
    min-width: 444px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    flex-direction: column;
    position: relative;
    &::after,
    &::before {
      content: "";
      position: absolute;
      height: 101%;
      width: 100.5%;
      z-index: -10;
      top: 49.9%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 30px;
      background: conic-gradient(
        from 230deg,
        #adaafab5 25deg,
        transparent 60deg,
        transparent 140deg,
        #adaafac1 180deg,
        transparent 240deg
      );
    }
    p {
      font-size: 25px;
      font-style: italic;
      color: var(--sec);
      margin-right: auto;
      &.red {
        color: #ffbfbf;
      }
    }
    h3 {
      font-size: 70px;
      font-weight: 700;
      line-height: 1.1em;
      text-align: center;
      margin: 0 auto;
      display: flex;
      gap: 5px;
      sup {
        font-size: 50px;
        font-weight: 400;
        position: relative;
        bottom: 15px;
        &:first-child {
          font-size: 35px;
        }
      }
      span {
        font-size: 25px;
        font-style: italic;
        font-weight: 400;
        position: relative;
        top: 5px;
      }
    }
    @media only screen and (max-width: 500px) {
      min-width: 44px;
      min-height: 145px;
      p {
        font-size: 20px;
      }
      h3 {
        font-size: 40px;
        sup {
          font-size: 30px;
          bottom: 10px;
          &:first-child {
            font-size: 25px;
          }
        }
        span {
          font-size: 20px;
        }
      }
    }
  }
`;

export const PropostaDetails = styled.ul`
  max-width: 970px;
  margin: 0 auto;
  margin-top: 60px;
  display: grid;
  gap: 30px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    div {
      display: flex;
      gap: 20px;
      align-items: center;
      h2 {
        font-size: 30px;
        font-weight: 600;
        font-style: italic;
        max-width: 620px;
        line-height: 1.2em;
      }
    }
    h3 {
      font-family: var(--font);
      font-size: 36px;
    }
    @media only screen and (max-width: 700px) {
      flex-direction: column;
      text-align: center;
      margin-bottom: 30px;
      div {
        flex-direction: column;
        h2 {
          font-size: 20px;
        }
      }
    }
  }
`;

export const Entregaveis = styled.section`
  display: grid;
  justify-items: center;
  margin-top: 60px;
  position: relative;
  .roxo {
    box-shadow: 0 0 250px 60px var(--main);
    width: 0;
    height: 0;
    display: block;
    position: absolute;
    bottom: 100px;
    left: 0;
  }
  .roxo2 {
    bottom: 50%;
    left: 0;
  }
  .roxo3 {
    bottom: inherit;
    top: 100px;
    left: 0;
  }
  .roxo4 {
    bottom: inherit;
    top: 33%;
    left: inherit;
    right: 0;
  }
  .roxo5 {
    bottom: 33%;
    left: inherit;
    right: 0;
  }
  ul {
    display: grid;
    gap: 30px;
    max-width: 1110px;
    margin-top: 60px;
    li {
      display: flex;
      align-items: center;
      position: relative;
      gap: 10px;
      h3 {
        font-size: 100px;
        font-weight: 900;
        line-height: 0.6em;
        padding-top: 23px;
        background: linear-gradient(to bottom, #a9a7ff 0%, #a9a7ff16 100%);
        background-clip: text;
        color: transparent;
        filter: brightness(0.2);
      }
      div {
        display: grid;
        gap: 10px;
        h4 {
          font-size: 30px;
          font-weight: 900;
          line-height: 1.2em;
        }
        p {
          font-size: 26px;
          font-style: italic;
          max-width: 870px;
          line-height: 1.2em;
        }
      }
    }
    @media only screen and (max-width: 650px) {
      gap: 220px;
      margin-top: 150px;
      li {
        img {
          position: absolute;
          left: 50%;
          top: -150px;
          transform: translateX(-50%);
        }
        div {
          h4 {
            font-size: 25px;
          }
          p {
            font-size: 20px;
          }
        }
      }
    }
  }
`;

export const Vantagens = styled.section`
  position: relative;
  & > img {
    position: absolute;
    right: 0px;
    bottom: 0;
  }
  margin-top: 60px;
  @media only screen and (max-width: 900px) {
    & > img {
      position: absolute;
      right: 0px;
      bottom: -10px;
      transform: translateY(100%);
      max-width: 200px;
    }
    margin-bottom: 260px;
  }
`;

export const Lista = styled.ul`
  display: grid;
  gap: 40px;
  max-width: 908px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  li {
    display: flex;
    gap: 20px;
    align-items: center;
    font-size: 40px;
    font-weight: 600;
    opacity: 0.82;
  }
  @media only screen and (max-width: 800px) {
    padding: 0 10px;
    li {
      display: flex;
      gap: 20px;
      align-items: center;
      font-size: 25px;
      color: var(--light);
      img:first-child {
        max-width: 25px;
      }
      img:nth-child(2) {
        max-width: 70px;
      }
    }
  }
`;

export const Marketing = styled.section`
  margin-top: 60px;
  background: url(/marketing-bg.webp) no-repeat top right / cover;
  position: relative;
  & > img {
    position: absolute;
    right: 0px;
    bottom: -20px;
  }
  @media only screen and (max-width: 650px) {
    background: url(/marketing-bg.webp) no-repeat center center / cover;
    & > img {
      position: absolute;
      right: 0px;
      bottom: 0px;
      max-width: 220px;
    }
    padding-bottom: 450px;
    .roxo {
      box-shadow: 0 0 250px 60px var(--main);
      width: 0;
      height: 0;
      display: block;
      position: absolute;
      bottom: 100px;
    }
  }
`;

export const Depoimentos = styled.section`
  display: grid;
  justify-items: center;
  text-align: center;
  margin: 0 auto;
  margin-top: 200px;
  position: relative;
  & > img {
    position: absolute;
    left: 0px;
    top: -80px;
  }
  .depoimentosContainer {
    display: grid;
    justify-items: center;
    gap: 15px;
  }
  .aceitarProposta {
    margin-top: 40px;
    max-width: 1037px;
    display: grid;
    gap: 20px;
    p {
      font-size: 25px;
      filter: brightness(0.82);
    }
    .btn {
      max-width: 960px;
      width: 100%;
      font-size: 45px;
      padding: 20px 20px 10px;
      font-weight: 400;
      border-radius: 20px;
      &:hover {
        color: var(--main);
        box-shadow: 0 0 50px 45px var(--light) inset;
      }
      margin-bottom: 20px;
    }
  }
  @media only screen and (max-width: 650px) {
    & > img {
      top: -80px;
      max-width: 230px;
    }
    .aceitarProposta {
      margin-top: 40px;
      max-width: 1037px;
      display: grid;
      gap: 20px;
      p {
        font-size: 20px;
      }
      .btn {
        max-width: 960px;
        width: 100%;
        font-size: 35px;
        padding: 20px 20px 10px;
        font-weight: 400;
        border-radius: 20px;
        &:hover {
          color: var(--main);
          box-shadow: 0 0 50px 45px var(--light) inset;
        }
        margin-bottom: 20px;
      }
    }
  }
`;
