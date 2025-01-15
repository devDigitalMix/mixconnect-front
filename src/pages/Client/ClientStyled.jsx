import styled from "styled-components";

export const DeleteClientStyled = styled.form`
  width: 100%;
  max-width: 500px;
  position: fixed;
  z-index: 3;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark);
  border: 2px solid var(--main);
  border-radius: 12px;
  padding: 40px;
  display: grid;
  justify-items: center;
  gap: 20px;
  text-align: center;
  h2 {
    font-size: 1.2rem;
    strong {
      color: var(--main);
    }
  }
  h3 {
    i {
      color: var(--main);
    }
  }
  & > div {
    display: grid;
    gap: 5px;
    width: 100%;
    max-width: 300px;
  }
  .deleteBtns {
    display: flex;
    gap: 15px;
    justify-content: center;
    align-items: center;
    .btn {
      margin: 0;
    }
  }
  select {
    background-color: #f9f8fe !important;
    color: var(--dark);
    outline: none;
    border: none;
    font-size: 0.75rem;
    font-style: italic;
    padding: 8px 10px;
    height: 40px;
    border-radius: 5px;
    width: 100%;
    max-width: 300px;
    resize: vertical;
  }
  option {
    font-style: normal;
  }
  img:first-child {
    position: absolute;
    right: 10px;
    top: 10px;
    transition: all.3s;
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

export const Drive = styled.a`
  margin-left: auto;
  margin-right: 100px;
  color: #a3a0f8;
`;
