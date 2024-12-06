import styled from "styled-components";

export const ProfileContainer = styled.section`
  background: linear-gradient(to right, #c5c3ff 0%, #a3a0f8 50%, #4441c8 100%);
  border-radius: 12px;
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
  border-radius: 12px;
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
  iframe {
    border-radius: 12px;
    max-width: 300px;
    margin-left: auto;
    margin-right: 40px;
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
    max-width: 23px;
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
  img:not(#avatarImg) {
    cursor: pointer;
    transition: all.3s;
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
  h2 {
    font-size: 1.4rem;
    width: 100%;
    font-family: var(--font);
  }
  h3,
  a {
    font-size: 0.9rem;
    color: var(--main);
  }
  h4 {
    color: #7a7a7a;
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
      color: var(--main);
      font-family: Audiowide;
      font-size: 1.2rem;
    }

    p,
    a {
      background-color: #313131;
      padding: 8px 10px 5px;
      border-radius: 5px;
      max-width: 300px;
      overflow: hidden;
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
  gap: 50px;

  label {
    color: var(--sec);
    font-family: var(--font);
    font-size: 1.2rem;
  }
  & > div {
    width: 100%;
    max-width: 300px;
    display: grid;
    gap: 10px;

    textarea {
      background-color: var(--light);
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
  }
  select {
    color: var(--dark);
    background-color: var(--light);
    padding: 8px 10px;
    font-family: var(--font2);
    font-weight: 600;
    border-radius: 13px;
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
