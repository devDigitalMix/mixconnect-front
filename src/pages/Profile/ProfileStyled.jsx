import styled from "styled-components";

export const ProfileContainer = styled.section`
  background: linear-gradient(to right, #c5c3ff 0%, #a3a0f8 50%, #4441c8 100%);
  border-radius: 12px;
  padding: 1px;
  width: 100%;
  max-width: 1200px;
`;

export const ProfileStyled = styled.div`
  padding: 20px;
  background-color: var(--dark);
  border-radius: 12px;
  width: 100%;
  display: grid;
`;

export const TopProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

export const ProfileAvatar = styled.div`
  display: grid;
  justify-items: center;
  gap: 10px;
  #avatar {
    width: 100px;
    height: 100px;
    border-radius: 100%;
    object-fit: cover;
    box-shadow: 0 0 0 1px var(--main);
  }
  img:not(#avatar) {
    cursor: pointer;
  }
`;

export const ProfileData = styled.div`
  display: grid;
  gap: 1px;
  h2 {
    font-size: 1.4rem;
  }
  h3 {
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
  align-items: start;
  gap: 50px;
  div {
    width: 100%;
    max-width: 300px;
    display: grid;
    gap: 10px;
    h4 {
      color: var(--main);
      font-family: Audiowide;
      font-size: 1.2rem;
    }
    p {
      background-color: #313131;
      padding: 8px 10px 5px;
      border-radius: 5px;
      max-width: 300px;
    }
    p + p {
      /* margin-top: 10px; */
    }
  }
`;
