/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import {
  createLogin,
  deleteLoginService,
  getLoginById,
  getLoginsService,
  searchLogins,
  updateLogin,
} from "../../services/loginService";
import {
  CreateLogin,
  LoginItem,
  LoginsBody,
  LoginsHeader,
  LoginsStyled,
} from "./LoginsStyled";
import { Input } from "../../components/Input/Input";
import { ExcludeModal } from "../Plans/PlanStyled";
import { InputNav } from "../../components/Navbar/NavbarStyled";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "../../schemas/searchSchema";

export default function Logins() {
  const [logins, setLogins] = useState([]);
  const [viewPassword, setViewPassword] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [updatingLogin, setUpdatingLogin] = useState({});
  const [search, setSearch] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
  });

  async function onSearch(data) {
    const { name } = data;
    const response = await searchLogins(name);
    setLogins(response.data.results);
    setSearch(true);
    reset();
  }

  async function getLogins() {
    const response = await getLoginsService();
    setLogins(response.data.results);
    setSearch(false);
  }

  async function updateClick(id) {
    const response = await getLoginById(id);
    setUpdatingLogin(response.data);
    setUpdateModal(true);
  }

  async function deleteLoginClick(id) {
    const response = await getLoginById(id);
    setUpdatingLogin(response.data);
    setDeleteModal(true);
  }

  async function deleteLogin() {
    await deleteLoginService(updatingLogin.id);
    setUpdatingLogin({});
    setDeleteModal(false);
    getLogins();
  }

  async function handleUpdate(event) {
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
    await updateLogin(data, updatingLogin.id);
    setUpdateModal(false);
    setUpdatingLogin({});
    getLogins();
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
      {deleteModal && (
        <ExcludeModal>
          <h2>Tem Certeza?</h2>
          <div>
            <button className="btn danger" onClick={deleteLogin}>
              excluir
            </button>
            <button className="btn" onClick={() => setDeleteModal(false)}>
              voltar
            </button>
          </div>
        </ExcludeModal>
      )}
      {updateModal && (
        <CreateLogin onSubmit={handleUpdate}>
          <img
            src="/cancel.svg"
            alt="cancel"
            draggable="false"
            className="img-effect"
            onClick={() => setUpdateModal(false)}
          />
          <div>
            <label htmlFor="client">Cliente:</label>
            <Input
              type="text"
              name="client"
              defaultValue={updatingLogin.client}
            />
          </div>
          <div>
            <label htmlFor="platform">Plataforma:</label>
            <Input
              type="text"
              name="platform"
              defaultValue={updatingLogin.platform}
            />
          </div>
          <div>
            <label htmlFor="clientLogin">Login do Cliente:</label>
            <Input
              type="text"
              name="clientLogin"
              defaultValue={updatingLogin.clientLogin}
            />
          </div>
          <div>
            <label htmlFor="clientPassword">Senha do Cliente:</label>
            <Input
              type="text"
              name="clientPassword"
              defaultValue={updatingLogin.clientPassword}
            />
          </div>
          <button type="submit" className="btn">
            Enviar
          </button>
        </CreateLogin>
      )}
      {createModal && (
        <CreateLogin onSubmit={handleCreate}>
          <img
            src="/cancel.svg"
            alt="cancel"
            draggable="false"
            className="img-effect"
            onClick={() => setCreateModal(!createModal)}
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
          onClick={() => setCreateModal(!createModal)}
        />
        {!viewPassword ? (
          <img
            src="../../../public/hide-password.svg"
            className="hide"
            title="Mostrar Senhas"
            onClick={() => setViewPassword(!viewPassword)}
          />
        ) : (
          <img
            src="../../../public/view-password.svg"
            className="hide"
            title="Esconder Senhas"
            onClick={() => setViewPassword(!viewPassword)}
          />
        )}
        <form onSubmit={handleSubmit(onSearch)}>
          {search && (
            <img
              src="/no-filter.svg"
              alt="desfazer filtro"
              title="Desfazer Filtro"
              className="img-effect"
              onClick={getLogins}
            />
          )}
          <InputNav className="input-search-space">
            <button type="submit">
              <i className="bi bi-search"></i>
            </button>
            <input
              {...register("name")}
              type="text"
              placeholder="Procurar Funcionário"
            />
          </InputNav>
        </form>
      </LoginsHeader>
      <LoginsBody>
        {logins ? (
          logins.map((login, index) => (
            <LoginItem key={index}>
              <div className="login-settings">
                <img
                  src="../../../public/update-profile.svg"
                  className="img-effect"
                  onClick={() => updateClick(login.id)}
                />
                <img
                  src="../../../public/exclude.svg"
                  className="img-effect"
                  onClick={() => deleteLoginClick(login.id)}
                />
              </div>
              <h2>{login.client}</h2>
              <h2>{login.platform}</h2>
              <h2>{login.clientLogin}</h2>
              {viewPassword ? (
                <h2>{login.clientPassword}</h2>
              ) : (
                <h2>•••••••••••</h2>
              )}
            </LoginItem>
          ))
        ) : (
          <h2>Nenhum acesso encontrado</h2>
        )}
      </LoginsBody>
    </LoginsStyled>
  );
}
