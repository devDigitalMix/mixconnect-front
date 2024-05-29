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
    border-radius: 50px;
    background: linear-gradient(
      to right,
      #c5c3ff 0%,
      #a3a0f8 50%,
      #4441c8 100%
    );
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 25px;
    width: 100%;
    label {
      display: block;
      font-family: Audiowide;
      color: var(--main);
      font-size: 1.25rem;
      max-width: fit-content;
    }
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding: 2rem 10px;
  gap: 1rem;
  background-color: var(--dark);
  border-radius: 50px;
  color: white;
  width: 100%;
  min-height: 573px;
  div {
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
    margin-bottom: 60px;
  }
`;
