/* eslint-disable no-unused-vars */
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  changeTaskService,
  createTaskService,
  getChoreById,
  updateChoreTitleService,
  updateTasksListService,
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
import { TaskSkeleton } from "../../components/TaskSkeleton/TaskSkeleton";

export function ChoreTasks() {
  const { choreId } = useParams();
  const { id } = useParams();
  const [chore, setChore] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createTaskModal, setCreateTaskModal] = useState(false);
  const [excludeModal, setExcludeModal] = useState(false);
  const [received, setReceived] = useState(false);
  const [locked, setLocked] = useState(true);
  const [articles, setArticles] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const choreTasksRef = useRef(null);

  async function getChore() {
    setReceived(false);
    try {
      const response = await getChoreById(choreId || id);
      setChore(response.data);
      setTasks(response.data.tasks);

      setIsLoading(false);
      setReceived(true);
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
    await updateChoreTitleService(choreId || id, data);
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
      await createTaskService(choreId || id, dataFinal);
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
        getChore();
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
        getChore();
      }
    }
  }

  function handleTaskMove(umaTask) {
    return (event) => {
      const taskRect = umaTask.getBoundingClientRect();
      const meio = (taskRect.bottom - taskRect.top) / 2;

      umaTask.style = `position: fixed; z-index: 3; top: ${
        event.clientY - meio
      }px`;
    };
  }

  function mover() {
    if (!locked) {
      const umaTask = event.target;

      if (umaTask.classList.contains("task")) {
        const articles = document.querySelectorAll("article");
        const taskRect = umaTask.getBoundingClientRect().top;
        let posicaoInicial = 0;

        for (const task of articles) {
          const taskTop = task.getBoundingClientRect().top;
          if (taskRect > taskTop) {
            posicaoInicial++;
          }
        }
        umaTask.style = `position: relative; z-index: 0; top: inherit`;

        const moveHandler = handleTaskMove(umaTask);

        const mouseUpHandler = async () => {
          document.removeEventListener("mousemove", moveHandler);
          document.removeEventListener("mouseup", mouseUpHandler);
          if (posicaoInicial > 0) {
            articles[posicaoInicial - 1].style.marginBottom = "0";
          }
          const taskRect = umaTask.getBoundingClientRect().top;
          umaTask.style = `position: relative; z-index: 0; top: inherit`;

          let posicaoFinal = 0;
          for (const task of articles) {
            const taskTop = task.getBoundingClientRect().top;
            if (taskRect > taskTop) {
              posicaoFinal++;
            }
          }

          let lista = tasks;
          for (let i = 0; i < lista.length; i++) {
            if (posicaoInicial < posicaoFinal) {
              if (
                lista[i].position > posicaoInicial &&
                lista[i].position <= posicaoFinal
              ) {
                lista[i].position = lista[i].position - 1;
              }
            } else if (posicaoInicial > posicaoFinal) {
              if (
                lista[i].position < posicaoInicial &&
                lista[i].position >= posicaoFinal
              ) {
                lista[i].position = lista[i].position + 1;
              }
            }
          }
          lista[posicaoInicial].position = posicaoFinal;

          const response = await updateTasksListService(chore._id, lista);
          setChore(response.data);
          setTasks(response.data.tasks);
        };

        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      }
    }
  }

  useEffect(() => {
    if (choreTasksRef.current && chore.tasks) {
      setArticles(choreTasksRef.current.querySelectorAll("article"));
    }
  }, [chore.tasks]);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      setLocked((prev) => !prev);
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
    else navigate("/");
    getChore();
  }, []);

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
          <img
            src="/voltar.svg"
            alt="voltar"
            title="Voltar"
            className="img-effect"
            onClick={() => navigate(-1)}
          />
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
          ) : (
            <Skeleton width="250px" height="25px" />
          )}
        </form>
        <ChoreTaskBtn2>
          {locked ? (
            <img
              src="/locked.svg"
              className="lock"
              onClick={() => setLocked(!locked)}
            />
          ) : (
            <img
              src="/unlocked.svg"
              className="lock"
              onClick={() => setLocked(!locked)}
            />
          )}
          <img
            src="/exclude.svg"
            alt="excluir"
            title="Excluir Trabalho"
            className="img-effect"
            onClick={excludeChoreClick}
          />
          <img
            src="/cancel.svg"
            alt="voltar"
            title="Voltar"
            className="img-effect"
            onClick={() => navigate(-1)}
          />
        </ChoreTaskBtn2>
      </ChoreTasksHeader>
      <ChoreTasksBody ref={choreTasksRef}>
        {received ? (
          chore.tasks ? (
            chore.tasks.map((task) => (
              <Task
                key={task._id}
                taskId={task._id}
                desc={task.desc}
                state={task.state}
                func={getChore}
                moverCima={() => moverCima(task)}
                moverBaixo={() => moverBaixo(task)}
                choreId={choreId || id}
                move={() => mover()}
              />
            ))
          ) : null
        ) : (
          <TaskSkeleton cards={4} />
        )}
      </ChoreTasksBody>
    </ChoreTasksStyled>
  );
}
