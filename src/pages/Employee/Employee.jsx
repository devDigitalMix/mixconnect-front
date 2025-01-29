import { Link, useNavigate, useParams } from "react-router-dom";
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
  deactivateEmployeeService,
  getEmployeeById,
  updateEmployeeService,
  userLogged,
} from "../../services/employeeService";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContent";
import { TopButtons } from "./EmployeeStyled";
import { Delete } from "../../components/Delete/Delete";
import { Input } from "../../components/Input/Input";
import { Label } from "../../components/Label/Label";
import { ErrorSpan } from "../../components/ErrorSpan/ErrorSpan";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function Employee() {
  const { id } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [employee, setEmployee] = useState({});
  const [update, setUpdate] = useState(false);
  const [updateAvatar, setUpdateAvatar] = useState(false);
  const [socialMedia, setSocialMedia] = useState(employee.socialMedia || []);
  const [musicLink, setMusicLink] = useState(employee.music || "");
  const [deleteClick, setDeleteClick] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    const file = formData.get("avatar"); // Obtém o arquivo de imagem diretamente do FormData

    const allowedFormats = [
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp",
      "image/svg+xml",
    ];

    if (!allowedFormats.includes(file.type)) {
      alert("Formato de arquivo não permitido.");
      return;
    }

    const maxSizeInBytes = 5 * 1024 * 1024;
    if (file.size > maxSizeInBytes) {
      alert("O arquivo é muito grande. O tamanho máximo permitido é 5 MB.");
      return;
    }

    try {
      const data = Object.fromEntries(formData.entries());
      await UpdateEmployeeAvatar(data, employee.id);
      setUpdateAvatar(!updateAvatar);
      if (error) {
        setError(false);
      }
    } catch (error) {
      setError(true);
      setErrorText(error.response.data);
    }
  }

  async function deactivateEmployee() {
    await deactivateEmployeeService(employee.id);
    getEmployee();
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
    setSocialMedia(employee.socialMedia || []);
  }

  async function handleUpdate(event) {
    setIsLoading(true);
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    data.socialMedia = socialMedia.filter((item) => item.trim() !== "");
    if (!data.birthday) {
      data.birthday = employee.birthday;
    }
    if (data.password == "") {
      data.password = undefined;
    }
    const requiredFields = ["name", "role", "whatsapp", "desc"];
    for (let field of requiredFields) {
      if (!data[field] || data[field].trim() === "") {
        setError(true);
        if (field === "name") {
          setErrorText(`Por favor, preencha o campo Nome corretamente.`);
        } else if (field === "role") {
          setErrorText(`Por favor, preencha o campo Cargo corretamente.`);
        } else if (field === "password") {
          setErrorText(`Por favor, preencha o campo Senha corretamente.`);
        } else if (field === "desc") {
          setErrorText(`Por favor, preencha o campo Descrição corretamente.`);
        } else {
          setErrorText(`Por favor, preencha o campo ${field} corretamente.`);
        }
        return;
      }
    }
    try {
      await updateEmployeeService(data, employee.id);
      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  }

  function formatDate(data) {
    var date = new Date(data);
    date.setHours(date.getHours() + 3);
    const dia = String(date.getDate()).padStart(2, "0");
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
    else navigate("/");
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
    <ProfileContainer $isactive={employee.active}>
      <img src="/grande-bottom.png" id="grande-bottom" />
      <img src="/grande-top.png" id="grande-top" />
      <ProfileStyled>
        {deleteClick && (
          <Delete
            name={employee.name}
            id={employee.id}
            func={handleDeleteClick}
          />
        )}
        <TopButtons>
          {((user.level == "Líder" && employee.level == "Base") ||
            user.level == "Admin") && (
            <div>
              <img
                src="/exclude.svg"
                alt="excluir"
                className="img-effect"
                onClick={handleDeleteClick}
              />
              {!update ? (
                <img
                  src="/update-profile.svg"
                  alt="update"
                  draggable="false"
                  className="img-effect"
                  onClick={updateForm}
                />
              ) : (
                <img
                  src="/cancel.svg"
                  alt="cancel"
                  draggable="false"
                  className="img-effect"
                  onClick={updateForm}
                />
              )}
            </div>
          )}
          {/* style={update ? { transform: "scale(0)" } : undefined} */}
          {!update && (
            <Link to={"/home/employees"}>
              <img
                src="/cancel.svg"
                alt="voltar"
                className="voltar img-effect"
              />
            </Link>
          )}
        </TopButtons>
        <TopProfile>
          <ProfileAvatar>
            <img
              src={employee.avatar ? employee.avatar : "/avatar-default.png"}
              alt="avatar"
              id="avatarImg"
              draggable="false"
            />
            {(user.level == "Líder" || user.level == "Admin") && (
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
            )}
          </ProfileAvatar>
          <ProfileData>
            <h4>{employee.level || <Skeleton width="70px" />}</h4>
            <h2>{employee.name || <Skeleton width="200px" />}</h2>
            <h3>{employee.email || <Skeleton width="200px" />}</h3>
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
            {error && <ErrorSpan text={errorText} />}
            <ProfileUpdate onSubmit={handleUpdate}>
              <div>
                <Label htmlFor="name" text="Nome:" />
                <Input type="text" name="name" defaultValue={employee.name} />
              </div>
              <div>
                <Label htmlFor="role" text="Cargo:" />
                <Input type="text" name="role" defaultValue={employee.role} />
              </div>
              <div>
                <Label htmlFor="desc" text="Descrição:" />
                <textarea
                  type="text"
                  name="desc"
                  defaultValue={employee.desc}
                ></textarea>
              </div>
              <div>
                <Label htmlFor="birthday" text="Aniversário:" />
                <Input
                  type="date"
                  name="birthday"
                  defaultValue={employee.birthday}
                />
              </div>
              <div>
                <Label htmlFor="whatsapp" text="Whatsapp:" />
                <Input
                  type="text"
                  name="whatsapp"
                  defaultValue={employee.whatsapp}
                />
              </div>
              <div>
                <Label htmlFor="music" text="Link da Música:" />
                <Input type="text" name="music" defaultValue={employee.music} />
              </div>
              {user.level == "Admin" && (
                <div>
                  <Label htmlFor="password" text="Senha:" />
                  <Input type="text" name="password" />
                </div>
              )}
              <div>
                <Label htmlFor="socialMedia" text="Redes Sociais:" />
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
          <ProfileBody>
            <div>
              <h4>Cargo:</h4>
              <p>{employee.role || <Skeleton width="200px" />}</p>
            </div>
            <div>
              <h4>Descrição:</h4>
              <p>{employee.desc || <Skeleton width="200px" />}</p>
            </div>
            <div>
              <h4>Aniversário:</h4>
              <p>
                {formatDate(employee.birthday) || <Skeleton width="200px" />}
              </p>
            </div>
            <div>
              <h4>Whatsapp:</h4>
              <p>{employee.whatsapp || <Skeleton width="200px" />}</p>
            </div>
            {employee.socialMedia != "" && (
              <div>
                <h4>Redes Sociais:</h4>
                {employee.socialMedia &&
                  employee.socialMedia.map((item, index) => (
                    <p key={index}>{item}</p>
                  ))}
              </div>
            )}
          </ProfileBody>
        )}
        {(user.level === "Admin" || user.level === "Líder") &&
          !update &&
          (employee.active ? (
            <button onClick={deactivateEmployee} className="btn">
              Desativar
            </button>
          ) : (
            <button onClick={deactivateEmployee} className="btn">
              Ativar
            </button>
          ))}
      </ProfileStyled>
    </ProfileContainer>
  );
}
