import styled from "styled-components";

export const ProfileContainer = styled.section`
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
  @media only screen and (max-width: 610px) {
    margin: 20px 0 50px;
  }
`;

export const ProfileStyled = styled.div`
  padding: 20px;
  @media only screen and (max-width: 390px) {
    padding: 20px 10px;
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
`;

export const TopProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  max-width: 1108px;
  width: 100%;
  margin: 0 auto;
  iframe {
    border-radius: 12px;
    max-width: 300px;
    max-height: 100px;
    margin-left: auto;
    margin-right: 30px;
    margin-top: 30px;
  }
  @media only screen and (max-width: 780px) {
    flex-direction: column;
    justify-content: center;
    gap: 15px;
    text-align: center;
    iframe {
      margin-right: auto;
    }
  }

  .voltar {
    position: absolute;
    left: 6px;
    top: 6px;
    /* max-width: 23px; */
  }
`;

export const LabelImg = styled.label`
  background: url(${(props) => props.$avatar}) no-repeat center center;
  background-size: cover;
  width: 100%;
  max-width: 100px;
  min-width: 100px;
  height: 100px;
  border-radius: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: 0.3s;
  overflow: hidden;
  position: relative;
  &:hover {
    /* backdrop-filter: brightness(30%); */
    img {
      opacity: 1;
      filter: brightness(200%) saturate(900%);

      box-shadow: 0 0 60px 60px #000000ca, 0 0 25px 1px #000 inset;
    }
  }
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25px;
    transition: 0.3s;
    opacity: 0;
  }
  input {
    position: relative;
    z-index: 10;
    cursor: pointer;
    width: 100%;
    max-width: 100px;
    min-width: 100px;
    height: 100px;
    border-radius: 100%;
    object-fit: cover;
    opacity: 0;
  }
`;

export const ProfileAvatar = styled.div`
  display: grid;
  justify-items: center;
  gap: 10px;
  #avatarImg {
    width: 100%;
    max-width: 100px;
    min-width: 100px;
    height: 100px;
    border-radius: 100%;
    object-fit: cover;
    /* box-shadow: 0 0 0 2px var(--main); */
  }
`;

export const UploadAvatar = styled.form`
  position: relative;
  button {
    position: absolute;
    bottom: 0px;
    height: 20px;
    width: 20px;
    z-index: 10;
  }
  button:not(#cancelaAvatar) {
    left: -17px;
    background: url("/confirm-avatar.svg") no-repeat center center;
    background-size: contain;
  }
  #cancelaAvatar {
    margin-left: 12px;
    background: url("/cancel.svg") no-repeat center center;
    background-size: contain;
  }
  input {
    display: none;
  }
`;

export const ProfileData = styled.div`
  display: grid;
  gap: 1px;
  div {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    width: 100%;
  }
  h4 {
    font-size: 1.25rem;
    font-weight: 500;
    text-transform: uppercase;
    color: var(--main);
    font-family: var(--font2);
  }
  a {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #ffffffd6;
  }
`;

export const ProfileBody = styled.div`
  width: 100%;
  padding: 50px 20px 30px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  @media only screen and (min-width: 630px) and (max-width: 1060px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (max-width: 629px) {
    grid-template-columns: 1fr;
    padding: 50px 0 70px;
  }
  align-items: start;
  gap: 50px;
  & > div {
    width: 100%;
    max-width: 300px;
    display: grid;
    gap: 10px;
    h4 {
      font-weight: 700;
    }

    p,
    a {
      background-color: #313131;
      padding: 15px 10px 12px;
      border-radius: 5px;
      max-width: 300px;
      overflow: hidden;
      font-size: 0.85rem;
    }
    p + p {
      /* margin-top: 10px; */
    }
  }
`;

export const ProfileUpdate = styled.form`
  width: 100%;
  padding: 50px 20px 70px;
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  @media only screen and (min-width: 630px) and (max-width: 1060px) {
    grid-template-columns: 1fr 1fr;
  }
  @media only screen and (max-width: 629px) {
    padding: 50px 0 70px;
    grid-template-columns: 1fr;
  }
  align-items: start;
  gap: 20px 50px;

  label {
    font-style: italic;
    font-weight: 700;
  }
  & > div {
    width: 100%;
    max-width: 300px;
    display: grid;
    gap: 10px;

    textarea {
      background-color: #f9f8fe !important;
      color: var(--dark);
      outline: none;
      border: none;
      font-size: 0.75rem;
      font-style: normal;
      padding: 10px 10px 8px;
      min-height: 90px;
      border-radius: 5px;
      width: 100%;
      max-width: 300px;
      resize: vertical;
      &::placeholder {
        font-size: 0.75rem;
        font-style: italic;
        color: #2f2e2f;
      }
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
  button.btn {
    position: absolute;
    left: 50%;
    bottom: 0px;
    transform: translate(-50%);
  }
  .custom-loader {
    position: absolute;
    left: calc(50% - 15px);
    bottom: 0px;
  }
  .addInput {
    background: url("/mais.svg") no-repeat center center;
    background-size: contain;
    height: 25px;
    width: 25px;
    margin: 0 auto;
  }
`;
export const ProfileBottom = styled.div`
  display: flex;
  justify-content: center;
`;
