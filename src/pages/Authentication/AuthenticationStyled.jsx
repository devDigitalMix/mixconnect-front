import styled from "styled-components";

export const AuthContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 715px;
  width: 100%;
  margin: 0 auto;
  & > div {
    width: 100%;
    min-height: 573px;
    padding: 1px;
    background-color: var(--dark);
    border-radius: 10px;
    position: relative;
    #card-b-bottom {
      position: absolute;
      bottom: 0;
      left: 0;
    }
    #card-b-top {
      position: absolute;
      top: 0;
      right: 0;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    width: 100%;
    label {
      display: block;
      font-size: 1.25rem;
      font-weight: 700;
      max-width: fit-content;
    }
    input {
      width: 100%;
      max-width: none;
      &::placeholder {
        color: #0000006a;
      }
    }
    img {
      filter: invert(100%) hue-rotate(180deg);
    }
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 10px;
  gap: 1rem;
  background-color: var(--dark);
  border-radius: 10px;
  color: white;
  width: 100%;
  min-height: 573px;
  position: relative;
  z-index: 5;
  div:not(.custom-loader) {
    max-width: 375px;
    width: 100%;
    position: relative;
    article {
      position: relative;
    }
    #pass {
      height: 20px;
      width: 20px;
      display: block;
      position: absolute;
      bottom: 9px;
      right: 10px;
      cursor: pointer;
    }
  }
  img {
    margin-bottom: 10px;
  }
`;
