import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContent";
import {
  UpdateEmployeeService,
  userLogged,
} from "../../services/employeeService";
import Cookies from "js-cookie";
import {
  ProfileAvatar,
  ProfileBody,
  ProfileContainer,
  ProfileData,
  ProfileStyled,
  ProfileUpdate,
  TopProfile,
} from "./ProfileStyled";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [update, setUpdate] = useState(false);
  const [socialMedia, setSocialMedia] = useState(user.socialMedia || []);
  const [musicLink, setMusicLink] = useState(user.music || "");

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

  async function handleUpdate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.socialMedia = socialMedia.filter((item) => item.trim() !== ""); // Remove entradas vazias
    try {
      await UpdateEmployeeService(data, user._id);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  }

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
    getSpotifyTrackId(user.music);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleUpdate]);

  return (
    <>
      <ProfileContainer>
        <ProfileStyled>
          {!update ? (
            <img
              src="/update-profile.svg"
              alt="update"
              draggable="false"
              onClick={updateForm}
            />
          ) : (
            <img
              src="/cancel.svg"
              alt="cancel"
              draggable="false"
              onClick={updateForm}
            />
          )}
          <TopProfile>
            <ProfileAvatar>
              <img
                src={user.avatar ? user.avatar : "/avatar-default.png"}
                alt="avatar"
                id="avatar"
                draggable="false"
              />
              <img src="/upload-avatar.svg" alt="Upload" draggable="false" />
            </ProfileAvatar>
            <ProfileData>
              <h4>{user.level}</h4>
              <h2>{user.name}</h2>
              <h3>{user.email}</h3>
            </ProfileData>
            {musicLink != "" && (
              <iframe
                style={{
                  borderRadius: 12,
                  maxWidth: 300,
                  marginLeft: "auto",
                  marginRight: 40,
                }}
                src={`https://open.spotify.com/embed/track/${musicLink}?utm_source=generator`}
                width="100%"
                height="152"
                frameBorder="0"
                allowfullscreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            )}
          </TopProfile>
          {update ? (
            <>
              <ProfileUpdate onSubmit={handleUpdate}>
                <div>
                  <label htmlFor="role">Cargo:</label>
                  <input type="text" name="role" defaultValue={user.role} />
                </div>
                <div>
                  <label htmlFor="desc">Descrição:</label>
                  <input type="text" name="desc" defaultValue={user.desc} />
                </div>
                <div>
                  <label htmlFor="birthday">Aniversário:</label>
                  <input
                    type="text"
                    name="birthday"
                    defaultValue={user.birthday}
                  />
                </div>
                <div>
                  <label htmlFor="whatsapp">Whatsapp:</label>
                  <input
                    type="text"
                    name="whatsapp"
                    defaultValue={user.whatsapp}
                  />
                </div>
                <div>
                  <label htmlFor="name">Nome:</label>
                  <input type="text" name="name" defaultValue={user.name} />
                </div>
                <div>
                  <label htmlFor="music">Link da Música:</label>
                  <input type="text" name="music" defaultValue={user.music} />
                </div>
                <div>
                  <label htmlFor="socialMedia">Redes Sociais:</label>
                  {socialMedia.map((item, index) => (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <input
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
                <button type="submit" className="btn">
                  Salvar
                </button>
              </ProfileUpdate>
            </>
          ) : (
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
                <p>{user.birthday}</p>
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
          )}
        </ProfileStyled>
      </ProfileContainer>
    </>
  );
}
