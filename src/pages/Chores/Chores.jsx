/* eslint-disable no-unused-vars */
import { Link, useParams } from "react-router-dom";
import { createchore, userLogged } from "../../services/employeeService";
import { useContext, useEffect, useState } from "react";
import { ChoresContent, ChoresStyled, CreateChoreModal } from "./ChoresStyled";
import { Input } from "../../components/Input/Input";
import { getChoreById } from "../../services/choreService";
import { UserContext } from "../../Context/UserContent";
import Cookies from "js-cookie";
import { ChoreTasksButtons } from "../ChoreTasks/ChoreTasksStyled";

export function Chores() {
  const { user, setUser } = useContext(UserContext);
  const [chores, setChores] = useState([]);
  const [choreModal, setChoreModal] = useState(false);

  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getEmployeeChores() {
    if (!user || !user.chores) {
      console.log("User or chores not found");
      return;
    }

    try {
      const choresList = await Promise.all(
        user.chores.map(async (chore) => {
          const aChore = await getChoreById(chore);
          return aChore.data;
        })
      );
      setChores(choresList);
    } catch (error) {
      console.log("Error fetching chores", error);
    }
  }

  async function handleCreateChore(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    if (!data.title || data.title.trim() === "") {
      alert("O campo está vazio ou contém apenas espaços.");
      return;
    }
    try {
      const response = await createchore(user._id, data);
      setChoreModal(false);
      chores.push(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function clickCreateChore() {
    setChoreModal(!choreModal);
  }

  useEffect(() => {
    if (Cookies.get("token")) {
      findUserLogged();
    }
  }, []);

  useEffect(() => {
    if (user) {
      getEmployeeChores();
    }
  }, [user]);

  return (
    <ChoresStyled>
      <ChoreTasksButtons>
        <Link to="/home/profile">
          <img
            src="/voltar.svg"
            alt="voltar"
            title="voltar"
            className="img-effect"
          />
        </Link>
        <img
          src="/mais.svg"
          alt="Nova tarefa"
          title="Novo tarefa"
          className="img-effect"
          onClick={clickCreateChore}
        />
      </ChoreTasksButtons>
      {choreModal && (
        <CreateChoreModal onSubmit={handleCreateChore}>
          <h4>Novo Trabalho</h4>
          <Input type="text" placeholder="Título" name="title" />
          <button className="btn" type="submit">
            Salvar
          </button>
        </CreateChoreModal>
      )}
      <ChoresContent>
        {chores.length > 0 && chores[0]._id ? (
          chores.map((chore) => (
            <Link
              key={chore._id}
              style={chore._id ? { display: "flex" } : { display: "none" }}
              to={"/home/chores/" + chore._id}
            >
              <h2>{chore.title}</h2>
            </Link>
          ))
        ) : (
          <h3>Não há afazeres</h3>
        )}
      </ChoresContent>
    </ChoresStyled>
  );
}
