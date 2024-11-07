import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContent";
import {
  UpdateEmployeeAvatar,
  updateEmployeeService,
  userLogged,
} from "../../services/employeeService";
import Cookies from "js-cookie";
import {
  ProfileAvatar,
  ProfileBody,
  ProfileBottom,
  ProfileContainer,
  ProfileData,
  ProfileStyled,
  ProfileUpdate,
  TopProfile,
  UploadAvatar,
} from "./ProfileStyled";
import { Input } from "../../components/Input/Input";
import { Link } from "react-router-dom";
import { Felipe } from "../Employees/EmployeesStyled";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [update, setUpdate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [updateAvatar, setUpdateAvatar] = useState(false);
  const [socialMedia, setSocialMedia] = useState(user.socialMedia || []);
  const [musicLink, setMusicLink] = useState(user.music || "");
  const [felipe, setFelipe] = useState(false);

  var cont = 0;

  async function handleUpdateAvatar(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const allowedFormats = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedFormats.includes(data.avatar.type)) {
      alert("Formato de arquivo não permitido.");
      return;
    }

    try {
      await UpdateEmployeeAvatar(data, user._id);
      setUpdateAvatar(!updateAvatar);
    } catch (error) {
      console.log(error);
    }
  }

  function updateAvatarClick(e) {
    if (update && e.target == document.getElementById("cancelaAvatar")) {
      setUpdateAvatar(!updateAvatar);
    }
    setUpdateAvatar(!updateAvatar);
  }

  const getSpotifyTrackId = (url) => {
    if (url) {
      const match = url.match(/track\/([a-zA-Z0-9]+)/);
      setMusicLink(match ? match[1] : null);
    }
  };

  const handleAddSocialMedia = () => {
    setSocialMedia([...socialMedia, ""]);
  };

  const handleSocialMediaChange = (index, event) => {
    const newSocialMedia = [...socialMedia];
    newSocialMedia[index] = event.target.value;
    setSocialMedia(newSocialMedia);
  };

  function updateForm() {
    setUpdate(!update);
    setSocialMedia(user.socialMedia || []); // Atualiza o estado quando o formulário é aberto
  }

  function mamao() {
    if (cont >= 9) {
      setFelipe(true);
    }
    cont++;
  }

  async function handleUpdate(event) {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.socialMedia = socialMedia.filter((item) => item.trim() !== "");
    if (!data.birthday) {
      data.birthday = user.birthday;
    }
    try {
      await updateEmployeeService(data, user._id);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  }

  function formatDate(data) {
    const date = new Date(data);
    const dia = String(date.getDate() + 1).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    const dataAtt = `${dia}/${mes}/${ano}`;
    return dataAtt;
  }

  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
  }, [update, updateAvatar]);

  useEffect(() => {
    if (user.music) {
      getSpotifyTrackId(user.music);
    }
  }, [user.music]);

  return (
    <>
      <ProfileContainer>
        {felipe && (
          <Felipe>
            <h2>O Felipe é calvo</h2>
            <img src="/felipe.jpg" />
          </Felipe>
        )}
        <ProfileStyled>
          {!update ? (
            <img
              src="/update-profile.svg"
              alt="update"
              className="img-effect"
              draggable="false"
              onClick={updateForm}
            />
          ) : (
            <img
              src="/cancel.svg"
              alt="cancel"
              className="img-effect"
              draggable="false"
              onClick={updateForm}
            />
          )}
          <TopProfile>
            <ProfileAvatar>
              <img
                src={user.avatar ? user.avatar : "/avatar-default.png"}
                alt="avatar"
                id="avatarImg"
                draggable="false"
              />
              <UploadAvatar
                onSubmit={handleUpdateAvatar}
                encType="multipart/form-data"
              >
                <label htmlFor="avatar" onClick={updateAvatarClick}>
                  <img
                    src="/upload-avatar.svg"
                    alt="Upload"
                    draggable="false"
                    style={updateAvatar ? { opacity: 0 } : {}}
                  />
                </label>
                {updateAvatar && (
                  <>
                    <button type="submit"></button>
                    <button
                      id="cancelaAvatar"
                      onClick={updateAvatarClick}
                    ></button>
                  </>
                )}
                <input type="file" name="avatar" id="avatar" />
              </UploadAvatar>
            </ProfileAvatar>
            <ProfileData>
              <h4 onClick={mamao}>{user.level}</h4>
              <h2>{user.name}</h2>
              <h3>{user.email}</h3>
            </ProfileData>
            {musicLink != "" && (
              <iframe
                src={`https://open.spotify.com/embed/track/${musicLink}`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            )}
          </TopProfile>
          {update ? (
            <>
              <ProfileUpdate onSubmit={handleUpdate}>
                <div>
                  <label htmlFor="name">Nome:</label>
                  <Input type="text" name="name" defaultValue={user.name} />
                </div>
                <div>
                  <label htmlFor="role">Cargo:</label>
                  <Input type="text" name="role" defaultValue={user.role} />
                </div>
                <div>
                  <label htmlFor="desc">Descrição:</label>
                  <textarea
                    type="text"
                    name="desc"
                    defaultValue={user.desc}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="birthday">Aniversário:</label>
                  <Input
                    type="date"
                    name="birthday"
                    defaultValue={user.birthday}
                  />
                </div>
                <div>
                  <label htmlFor="whatsapp">Whatsapp:</label>
                  <Input
                    type="text"
                    name="whatsapp"
                    defaultValue={user.whatsapp}
                  />
                </div>
                <div>
                  <label htmlFor="music">Link da Música:</label>
                  <Input type="text" name="music" defaultValue={user.music} />
                </div>
                <div>
                  <label htmlFor="socialMedia">Redes Sociais:</label>
                  {socialMedia.map((item, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <Input
                        type="text"
                        name={`socialMedia-${index}`}
                        value={item}
                        onChange={(e) => handleSocialMediaChange(index, e)}
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    className="addInput"
                    onClick={handleAddSocialMedia}
                  ></button>
                </div>
                {!isLoading ? (
                  <button type="submit" className="btn">
                    Salvar
                  </button>
                ) : (
                  <div className="custom-loader"></div>
                )}
              </ProfileUpdate>
            </>
          ) : (
            <>
              <ProfileBody>
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
                  <p>{formatDate(user.birthday)}</p>
                </div>
                <div>
                  <h4>Whatsapp:</h4>
                  <p>{user.whatsapp}</p>
                </div>
                <div>
                  <h4>Redes Sociais:</h4>
                  {user.socialMedia
                    ? user.socialMedia.map((item, index) => (
                        <p key={index}>{item}</p>
                      ))
                    : null}
                </div>
              </ProfileBody>
              <ProfileBottom>
                <Link to={`/home/chores/`}>
                  <button className="btn">TAREFAS</button>
                </Link>
              </ProfileBottom>
            </>
          )}
        </ProfileStyled>
      </ProfileContainer>
    </>
  );
}
