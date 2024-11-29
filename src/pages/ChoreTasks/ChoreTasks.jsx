/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  changeTaskService,
  createTaskService,
  getChoreById,
  updateChoreTitleService,
  updateTaskService,
  //   updateTaskState,
} from "../../services/choreService";
import Cookies from "js-cookie";
import {
  ChoreTaskBtn2,
  ChoreTasksBody,
  ChoreTasksButtons,
  ChoreTasksHeader,
  ChoreTasksStyled,
  CreateTaskModalStyled,
  ExcludeChoreModal,
} from "./ChoreTasksStyled";
import { Task } from "../../components/Task/Task";
import { Input } from "../../components/Input/Input";
import { excludeChore, userLogged } from "../../services/employeeService";
import { UserContext } from "../../Context/UserContent";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function ChoreTasks() {
  const { id } = useParams();
  const [chore, setChore] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [excludeModal, setExcludeModal] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function getChore() {
    try {
      const response = await getChoreById(id);
      setChore(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  function excludeChoreClick() {
    setExcludeModal(!excludeModal);
  }

  function handleClickCreate() {
    setCreateTaskModal(!createTaskModal);
  }
  async function handleExcludeChore() {
    await excludeChore(user._id, chore._id);
    navigate("/home/chores");
  }

  async function updateChoreTitle(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    if (!data.title || data.title.trim() === "") {
      alert("O campo está vazio ou contém apenas espaços.");
      return;
    }
    await updateChoreTitleService(id, data);
    getChore();
  }

  async function handleCreateTask(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    if (!data.desc || data.desc.trim() === "") {
      alert("O campo está vazio ou contém apenas espaços.");
      return;
    }
    const state = { state: "open" };
    const position = {
      position: chore.tasks.length > 0 ? chore.tasks.length : 0,
    };
    const dataFinal = { ...data, ...state, ...position };
    try {
      await createTaskService(id, dataFinal);
      setCreateTaskModal(false);
      getChore();
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

  async function moverCima(task) {
    if (task.position > 0) {
      var taskAntiga = chore.tasks[task.position - 1];

      const response = await changeTaskService(
        chore._id,
        task._id,
        taskAntiga._id,
        {
          position: task.position - 1,
          position2: task.position,
        }
      );

      if (response.data) {
        setChore(response.data);
      }
    }
  }

  async function moverBaixo(task) {
    if (task.position < chore.tasks.length - 1) {
      var taskAntiga = chore.tasks[task.position + 1];

      const response = await changeTaskService(
        chore._id,
        task._id,
        taskAntiga._id,
        {
          position: task.position + 1,
          position2: task.position,
        }
      );

      if (response.data) {
        setChore(response.data);
      }
    }
  }

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
    else navigate("/");
    getChore();
  }, [chore]);

  return (
    <ChoreTasksStyled>
      {excludeModal && (
        <ExcludeChoreModal>
          <h4>Tem certeza que deseja excluir esse trabalho?</h4>
          <div>
            <button className="btn danger" onClick={handleExcludeChore}>
              Excluir
            </button>
            <button className="btn neutral" onClick={excludeChoreClick}>
              Cancelar
            </button>
          </div>
        </ExcludeChoreModal>
      )}
      {createTaskModal && (
        <CreateTaskModalStyled onSubmit={handleCreateTask}>
          <span onClick={handleClickCreate}>X</span>
          <h5>Nova Tarefa</h5>
          <Input type="text" placeholder="Descrição da tarefa" name="desc" />
          <button type="submit" className="btn">
            Salvar
          </button>
        </CreateTaskModalStyled>
      )}
      <ChoreTasksHeader>
        <ChoreTasksButtons>
          <Link to="/home/chores/">
            <img
              src="/voltar.svg"
              alt="voltar"
              title="Voltar"
              className="img-effect"
            />
          </Link>
          <img
            src="/mais.svg"
            alt="Nova tarefa"
            title="Nova Tarefa"
            className="img-effect"
            onClick={handleClickCreate}
          />
        </ChoreTasksButtons>
        <form onSubmit={updateChoreTitle}>
          {chore.title ? (
            <input
              type="text"
              name="title"
              id="titleUpdate"
              defaultValue={chore.title}
            />
          ) : null}
        </form>

        <ChoreTaskBtn2>
          <img
            src="/exclude.svg"
            alt="excluir"
            title="Excluir Trabalho"
            className="img-effect"
            onClick={excludeChoreClick}
          />
        </ChoreTaskBtn2>
      </ChoreTasksHeader>
      <ChoreTasksBody>
        {chore.tasks
          ? chore.tasks.map((task) => (
              <Task
                key={task._id}
                taskId={task._id}
                desc={task.desc}
                state={task.state}
                func={getChore}
                moverCima={() => moverCima(task)}
                moverBaixo={() => moverBaixo(task)}
                choreId={id}
              />
            ))
          : null}
      </ChoreTasksBody>
    </ChoreTasksStyled>
  );
}
