import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import {
  ProfileAvatar,
  ProfileBody,
  ProfileContainer,
  ProfileData,
  ProfileStyled,
  ProfileUpdate,
  TopProfile,
  UploadAvatar,
} from "../Profile/ProfileStyled";
import {
  UpdateEmployeeAvatar,
  getEmployeeById,
  updateEmployeeService,
  userLogged,
} from "../../services/employeeService";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContent";
import { TopButtons } from "./EmployeeStyled";
import { Delete } from "../../components/Delete/Delete";
import { Input } from "../../components/Input/Input";

export function Employee() {
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [employee, setEmployee] = useState({});
  const [update, setUpdate] = useState(false);
  const [updateAvatar, setUpdateAvatar] = useState(false);
  const [socialMedia, setSocialMedia] = useState(employee.socialMedia || []);
  const [musicLink, setMusicLink] = useState(employee.music || "");
  const [deleteClick, setDeleteClick] = useState(false);

  function handleDeleteClick() {
    setDeleteClick(!deleteClick);
  }

  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

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
      await UpdateEmployeeAvatar(data, employee.id);
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
    setSocialMedia(employee.socialMedia || []); // Atualiza o estado quando o formulário é aberto
  }

  async function handleUpdate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.socialMedia = socialMedia.filter((item) => item.trim() !== "");
    if (!data.birthday) {
      data.birthday = employee.birthday;
    }
    try {
      await updateEmployeeService(data, employee.id);
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

  async function getEmployee() {
    const response = await getEmployeeById(id);
    setEmployee(response.data);
  }

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
  }, []);

  useEffect(() => {
    getEmployee();
  }, [update, updateAvatar, id]);

  useEffect(() => {
    if (employee.music) {
      getSpotifyTrackId(employee.music);
    }
  }, [employee.music]);

  return (
    <ProfileContainer>
      <ProfileStyled>
        {deleteClick && (
          <Delete
            name={employee.name}
            id={employee.id}
            func={handleDeleteClick}
          />
        )}
        {(user.level == "lider" || user.level == "adm") && (
          <TopButtons>
            <img src="/exclude.svg" alt="excluir" onClick={handleDeleteClick} />
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
          </TopButtons>
        )}
        <TopProfile>
          <ProfileAvatar>
            <img
              src={employee.avatar ? employee.avatar : "/avatar-default.png"}
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
              <Input type="file" name="avatar" id="avatar" />
            </UploadAvatar>
          </ProfileAvatar>
          <ProfileData>
            <h4>{employee.level}</h4>
            <h2>{employee.name}</h2>
            <h3>{employee.email}</h3>
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
                <Input type="text" name="name" defaultValue={employee.name} />
              </div>
              <div>
                <label htmlFor="role">Cargo:</label>
                <Input type="text" name="role" defaultValue={employee.role} />
              </div>
              <div>
                <label htmlFor="desc">Descrição:</label>
                <textarea
                  type="text"
                  name="desc"
                  defaultValue={employee.desc}
                ></textarea>
              </div>
              <div>
                <label htmlFor="birthday">Aniversário:</label>
                <Input
                  type="date"
                  name="birthday"
                  defaultValue={employee.birthday}
                />
              </div>
              <div>
                <label htmlFor="whatsapp">Whatsapp:</label>
                <Input
                  type="text"
                  name="whatsapp"
                  defaultValue={employee.whatsapp}
                />
              </div>
              <div>
                <label htmlFor="music">Link da Música:</label>
                <Input type="text" name="music" defaultValue={employee.music} />
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
              <button type="submit" className="btn">
                Salvar
              </button>
            </ProfileUpdate>
          </>
        ) : (
          <ProfileBody>
            <div>
              <h4>Cargo:</h4>
              <p>{employee.role}</p>
            </div>
            <div>
              <h4>Descrição:</h4>
              <p>{employee.desc}</p>
            </div>
            <div>
              <h4>Aniversário:</h4>
              <p>{formatDate(employee.birthday)}</p>
            </div>
            <div>
              <h4>Whatsapp:</h4>
              <p>{employee.whatsapp}</p>
            </div>
            <div>
              <h4>Redes Sociais:</h4>
              {employee.socialMedia
                ? employee.socialMedia.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))
                : null}
            </div>
          </ProfileBody>
        )}
      </ProfileStyled>
    </ProfileContainer>
  );
}
