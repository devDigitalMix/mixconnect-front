/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContent";
import { userLogged } from "../../services/employeeService";
import Cookies from "js-cookie";
import {
  ProfileAvatar,
  ProfileBody,
  ProfileContainer,
  ProfileData,
  ProfileStyled,
  TopProfile,
} from "./ProfileStyled";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);

  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ProfileContainer>
        <ProfileStyled>
          <TopProfile>
            <ProfileAvatar>
              <img
                src={user.avatar ? user.avatar : "/avatar-default.png"}
                alt="avatar"
                id="avatar"
              />
              <img src="/upload-avatar.svg" alt="" />
            </ProfileAvatar>
            <ProfileData>
              <h4>{user.level}</h4>
              <h2>{user.name}</h2>
              <h3>{user.email}</h3>
            </ProfileData>
          </TopProfile>
          <ProfileBody>
            {/* <div>
              <h4>Nível:</h4>
              <p>{user.level}</p>
            </div> */}
            <div>
              <h4>Cargo:</h4>
              <p>{user.role}</p>
            </div>
            <div>
              <h4>Descrição:</h4>
              <p>{user.desc}</p>
            </div>
            <div>
              <h4>Aniversário:</h4>
              <p>{user.birthday}</p>
            </div>
            <div>
              <h4>Whatsapp:</h4>
              <p>{user.whatsapp}</p>
            </div>
            <div>
              <h4>Redes Sociais:</h4>
              {user.socialMedia
                ? user.socialMedia.map((item) => <p key={item}>{item}</p>)
                : null}
            </div>
          </ProfileBody>
        </ProfileStyled>
      </ProfileContainer>
    </>
  );
}
