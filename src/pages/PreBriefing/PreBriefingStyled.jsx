import styled from "styled-components";

export const PreBriefingContainer = styled.section`
  max-width: 1200px;
  margin: 30px 0;
  width: 100%;
  background-color: var(--dark);
  padding: 30px;
  padding-top: 70px;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
`;

export const PreBriefingHeader = styled.header`
  display: flex;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 20px;
  width: 100%;
  left: 0;
  padding: 0 30px;
  .btn {
    margin: 0;
  }
`;

export const PreBriefingBody = styled.div`
  display: grid;
  gap: 50px;
  transition: all.8s;
  padding-top: 20px;
  div {
    display: grid;
    gap: 10px;
    strong {
      color: var(--main);
    }
    p:nth-child(1),
    p:nth-child(1) strong {
      font-size: 20px;
      font-family: var(--font2);
    }
  }

  &.esconde {
    transform: translate(-110%);
    opacity: 0;
  }
`;

export const PreBriefingRaw = styled.div`
  transform: translate(110%);
  transition: all.8s;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  position: absolute;
  padding: 30px;
  top: 70px;
  left: 0;
  width: 100%;
  gap: 20px;
  opacity: 0;

  @media only screen and (max-width: 770px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 30px 15px;
  }

  div {
    h3 {
      font-family: var(--font2);
      font-weight: 600;
      font-size: 18px;
    }
    p {
      background-color: #333;
      padding: 10px;
      padding-bottom: 7px;
      border-radius: 10px;
    }
  }

  &.active {
    transform: translate(0);
    opacity: 1;
  }
`;
