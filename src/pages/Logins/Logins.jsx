import { useEffect, useState } from "react";
import { createLogin, getLoginsService } from "../../services/loginService";
import {
  CreateLogin,
  LoginItem,
  LoginsBody,
  LoginsHeader,
  LoginsStyled,
} from "./LoginsStyled";
import { Input } from "../../components/Input/Input";

export default function Logins() {
  const [logins, setLogins] = useState([]);
  const [viewPassword, setViewPassword] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  async function getLogins() {
    const response = await getLoginsService();
    setLogins(response.data.results);
  }

  function handleClickCreate() {
    setCreateModal(!createModal);
  }

  async function handleCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        data[key] = data[key].trim();
        if (data[key] === "") {
          alert(`Preencha os campos necessários.`);
        }
      }
    }
    await createLogin(data);
    setCreateModal(false);
    getLogins();
  }

  useEffect(() => {
    getLogins();
  }, []);

  return (
    <LoginsStyled>
      {createModal && (
        <CreateLogin onSubmit={handleCreate}>
          <img
            src="/cancel.svg"
            alt="cancel"
            draggable="false"
            className="img-effect"
            onClick={handleClickCreate}
          />
          <div>
            <label htmlFor="client">Cliente:</label>
            <Input type="text" name="client" />
          </div>
          <div>
            <label htmlFor="platform">Plataforma:</label>
            <Input type="text" name="platform" />
          </div>
          <div>
            <label htmlFor="clientLogin">Login do Cliente:</label>
            <Input type="text" name="clientLogin" />
          </div>
          <div>
            <label htmlFor="clientPassword">Senha do Cliente:</label>
            <Input type="text" name="clientPassword" />
          </div>
          <button type="submit" className="btn">
            Enviar
          </button>
        </CreateLogin>
      )}
      <LoginsHeader>
        <img
          src="/mais.svg"
          alt="Novo funcionário"
          title="Novo funcionário"
          className="img-effect"
          onClick={handleClickCreate}
        />
      </LoginsHeader>
      <LoginsBody>
        {logins.map((login, index) => (
          <LoginItem key={index} onClick={() => setViewPassword(!viewPassword)}>
            <h2>{login.client}</h2>
            <h2>{login.platform}</h2>
            <h2>{login.clientLogin}</h2>
            {viewPassword ? (
              <h2>{login.clientPassword}</h2>
            ) : (
              <h2>•••••••••••</h2>
            )}
          </LoginItem>
        ))}
      </LoginsBody>
    </LoginsStyled>
  );
}
