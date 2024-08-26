import styled from "styled-components";

export const PlanStyled = styled.section`
  max-width: 1200px;
  width: 100%;
  article {
    cursor: pointer;
    &:hover {
    }
  }
`;

export const PlanHeader = styled.div``;
export const ExcludeModal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark);
  border: 2px solid var(--main);
  box-shadow: 0 15px 40px -20px var(--main);
  padding: 20px;
  border-radius: 12px;
  display: grid;
  justify-items: center;
  gap: 20px;
  z-index: 11;
  h2 {
    font-size: 1.5rem;
  }
  div {
    display: flex;
    gap: 10px;
  }
`;

export const CreatePlanModal = styled.form`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark);
  border: 2px solid var(--main);
  box-shadow: 0 15px 40px -20px var(--main);
  padding: 20px;
  border-radius: 12px;
  display: grid;
  justify-items: center;
  gap: 20px;
  z-index: 10;
  div {
    display: grid;
    justify-items: center;
  }
`;
export const PlanModal = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  background-color: var(--dark);
  padding: 20px;
  border: 2px solid var(--main);
  min-height: 300px;
  max-width: 400px;
  border-radius: 12px;
  width: 100%;
  display: grid;
  justify-items: start;
  text-align: center;
  gap: 10px;
  box-shadow: 0 15px 40px -20px var(--main);
  & > input {
    text-align: center;
    margin: 0 auto 10px;
    font-family: var(--font);
    color: var(--main);
    font-size: 1.5rem;
    text-transform: uppercase;
    background-color: transparent;
    border: none;
  }
  h4 {
    margin: 10px auto 0;
    font-size: 1.25rem;
    font-family: var(--font);
    color: var(--sec);
  }
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    input {
      background-color: var(--main);
      padding: 5px;
      border-radius: 3px;
      max-width: fit-content;
      padding: 5px;
      height: 30px;
      text-align: center;
    }
  }
  #close {
    position: absolute;
    left: 10px;
    top: 10px;
  }
  #exclude {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;
export const PlanBody = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
`;

export const PlanItem = styled.div`
  background: linear-gradient(to right, #c5c3ff 0%, #a3a0f8 50%, #4441c8 100%);
  border-radius: 12px;
  padding: 1px;
  width: 100%;
  max-width: 300px;
  transition: all.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.01) translateY(-2px);
    box-shadow: 0 0 8px 1px var(--main);
  }
  div {
    transition: all.3s;
    background-color: var(--dark);
    display: grid;
    justify-items: center;
    padding: 20px;
    gap: 20px;
    border-radius: 12px;
    h2 {
      font-size: 1.3rem;
      font-family: var(--font);
      text-transform: uppercase;
    }
    p {
      color: var(--main);
    }
    img {
      width: 100%;
      max-width: 100px;
      height: 100px;
      border-radius: 100%;
      object-fit: cover;
      box-shadow: 0 0 0 2px var(--main);
    }
  }
`;
export const Pages = styled.article`
  display: grid;
  justify-items: center;
  margin: 0 auto;
  gap: 10px;
`;
