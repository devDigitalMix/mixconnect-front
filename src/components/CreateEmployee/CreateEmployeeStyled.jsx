import styled from "styled-components";

export const CreateEmployeeStyled = styled.section`
  background: linear-gradient(to right, #c5c3ff 0%, #a3a0f8 50%, #4441c8 100%);
  padding: 1px;
  max-width: 1200px;
  width: 100%;
  margin: 0 0 20px;
  border-radius: 12px;
`;

export const CreateForm = styled.form`
  padding: 40px 40px 30px;
  background-color: var(--dark);
  width: 100%;
  border-radius: 12px;
  display: grid;
  position: relative;
  .btn {
    margin: 40px auto 0px;
  }
  & > img:first-child {
    position: absolute;
    right: 10px;
    transition: 0.3s;
    top: 10px;
    cursor: pointer;
    &:hover {
      filter: hue-rotate(280deg);
      filter: saturate(1000%) drop-shadow(0 0 5px #4441c8);
    }
    &:active {
      transform: scale(0.9);
      transition: transform 0.1s;
    }
  }
`;

export const ContainCreate = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: start;
  width: 100%;
  gap: 25px;
  div {
    width: 100%;
    display: grid;
    max-width: 300px;
  }
  textarea {
    background-color: #beb1fd;
    color: var(--dark);
    outline: none;
    padding: 8px 10px 5px;
    max-height: none;
    font-weight: 600;
    border-radius: 6px;
    max-width: 300px;
    resize: vertical;
    min-height: 90px;
  }
  select {
    background-color: #beb1fd;
    color: var(--dark);
    outline: none;
    padding: 8px 10px 5px;
    max-height: 37px;
    font-weight: 600;
    border-radius: 6px;
    width: 100%;
    max-width: 300px;
    resize: vertical;
  }
`;
