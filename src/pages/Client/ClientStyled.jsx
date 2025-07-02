import styled from "styled-components";
export const ClientContainer = styled.section`
  #grande-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
  }
  #grande-top {
    position: absolute;
    top: 0;
    right: 0;
  }
  background-color: var(--dark);
  position: relative;
  border-radius: 10px;
  padding: 1px;
  width: 100%;
  max-width: 1200px;
  margin: 0 0 50px;
  margin-top: 30px;
  @media only screen and (max-width: 610px) {
    margin: 20px 0 50px;
  }
`;

export const ClientStyled = styled.section`
  .catButtons {
    position: absolute;
    top: -6px;
    left: 15px;
    display: flex;
    gap: 15px;
    transform: translateY(-50%);
    button {
      background-color: #333;
      box-shadow: 0 -20px 0 var(--dark) inset;
      &.active {
        background-color: var(--dark);
      }
      border-radius: 5px 5px 0 0;
      padding: 8px 10px 18px;
      &:hover {
        background-color: var(--main);
      }
    }
    @media only screen and (max-width: 560px) {
      gap: 0px;
    }
  }
  padding: 20px;
  @media only screen and (max-width: 780px) {
    padding-top: 70px;
  }
  @media only screen and (max-width: 390px) {
    padding: 70px 10px 20px;
  }
  background-color: var(--dark);
  border-radius: 10px;
  width: 100%;
  position: relative;
  display: grid;
  & > img {
    position: absolute;
    right: 10px;
    transition: all.3s;
    top: 10px;
    cursor: pointer;
  }
  .image-label {
    z-index: 2;
    width: 100px;
    height: 100px;
    display: grid;
    grid-template-areas: "stack";
    border-radius: 100px;
    & > * {
      grid-area: stack;
    }
    #drop-file {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 12px;
      transition: all.3s;
      border-radius: 100px;
    }
    input {
      opacity: 0 !important;
      max-width: 100px;
      height: 100px;
      border-radius: 100px;
    }
    transition: all.3s;
    &.active {
      background-color: #95b1ff;
      #drop-file {
        margin: 15px;
      }
    }
  }
`;
export const ClientBody = styled.section``;

export const ContatosModal = styled.form`
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--dark);
  border: 2px solid var(--main);
  border-radius: 10px;
  padding: 25px;
  .guardaContato {
    display: flex;
    position: relative;
    gap: 15px;
    & + .guardaContato {
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: var(--main);
        left: 50%;
        transform: translateX(-50%);
        top: -8px;
      }
    }
  }
  span {
    position: absolute;
    top: 10px;
    right: 10px;
    max-width: 25px;
  }
  display: grid;
  justify-items: center;
  gap: 25px;
`;

export const ClientSectionForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  margin-top: 40px;
  padding-bottom: 60px;

  .campo {
    h2 {
      font-weight: 600;
      font-family: var(--font2);
    }
    button {
      background-color: #333;
      max-width: 300px;
      padding: 11px 10px 8px;
      width: 100%;
      overflow: hidden;
      text-align: start;
      border-radius: 5px;
    }
  }
  .btn {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

export const ClientSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 30px;
  margin-top: 40px;
  @media only screen and (max-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
  .campo {
    h2 {
      font-weight: 600;
      font-family: var(--font2);
    }
    button {
      background-color: #333;
      max-width: 300px;
      padding: 11px 10px 8px;
      width: 100%;
      overflow: hidden;
      text-align: start;
      border-radius: 5px;
    }
  }
`;

export const DominioModal = styled.form`
  position: fixed;
  z-index: 10;
  top: 50%;
  left: 50%;
  max-width: 620px;
  width: 100%;
  transform: translate(-50%, -50%);
  background-color: #333;
  padding: 40px;
  padding-bottom: 90px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  border-radius: 10px;
  input[type="date"] {
    color: var(--dark);
    border: none;
    padding: 0 10px;
    border-radius: 5px;
    background-color: var(--light);
  }
  .custom-loader {
    position: absolute;
    bottom: 30px;
    left: calc(50% - 10px);
  }
  & > .btn {
    position: absolute;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
  }
  #cancel {
    position: absolute;
    top: 10px;
    right: 10px;
    max-width: 25px;
    cursor: pointer;
    transition: all 0.3s;
  }
  #exclude {
    position: absolute;
    top: 10px;
    right: 45px;
    max-width: 25px;
    cursor: pointer;
    transition: all 0.3s;
  }
`;
export const DeleteSiteModal = styled.div`
  position: fixed;
  z-index: 10;
  background-color: var(--dark);
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  padding: 20px;
  border-radius: 5px;
  text-align: center;
  h2 {
    font-size: 1.3rem;
  }
  .btns {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    .custom-loader {
      position: inherit;
      left: inherit;
    }
  }
`;
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

export const CreateNpsContainer = styled.section`
  position: fixed;
  top: 50%;
  background-color: var(--dark);
  right: 50%;
  padding: 30px 20px;
  border: 2px solid var(--main);
  border-radius: 10px;
  transform: translate(50%, -50%);
  display: flex;
  flex-wrap: wrap;
  z-index: 10;
  gap: 20px;
  justify-content: center;
  max-width: 570px;
  #fechaNps {
    position: absolute;
    right: 8px;
    top: 8px;
    max-width: 25px;
  }
  h3 {
    background-color: var(--main);
    cursor: pointer;
    max-width: 150px;
    width: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 10px 2px;
    transition: all.3s;
    border-radius: 6px;
    &:hover {
      background-color: #f2f2f2;
      color: var(--main);
    }
  }
`;
