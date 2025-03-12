/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import {
  Arrows,
  SelectState,
  TaskBtns,
  TaskContent,
  TaskStyled,
  UpdateDescStyled,
} from "./TaskStyled";
import {
  deleteTaskService,
  getChoreById,
  updateTaskService,
} from "../../services/choreService";
import { Input } from "../Input/Input";

export function Task(props) {
  const [updateStateModal, setUpdateStateModal] = useState(false);
  const [excludeModal, setExcludeModal] = useState(false);
  const [updateDesc, setUpdateDesc] = useState(false);
  const [taskState, setTaskState] = useState(props.state);
  const [taskDesc, setTaskDesc] = useState(props.desc);
  const selectStateRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        selectStateRef.current &&
        !selectStateRef.current.contains(event.target)
      ) {
        setUpdateStateModal(false);
      }
    }

    if (updateStateModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [updateStateModal]);

  function clickUpdateState() {
    setUpdateStateModal(true);
  }

  async function excludeTask() {
    await deleteTaskService(props.choreId, props.taskId);
    props.func();
  }

  function updateTaskClick() {
    setUpdateDesc(!updateDesc);
  }

  async function handleUpdateDesc(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    await updateTaskService(props.choreId, props.taskId, data);
    setTaskDesc(data.desc);
    setUpdateDesc(false);
  }

  async function setState(e) {
    const state = { state: e.target.value };
    await updateTaskService(props.choreId, props.taskId, state);
    setTaskState(state.state);
    setUpdateStateModal(false);
  }

  return (
    <TaskStyled className="task" onMouseDown={props.move}>
      {/* <img src="/navgradbottom.png" id="nb" />
      <img src="/navgradtop.png" id="nt" /> */}
      <Arrows>
        <img
          src="/up-arrow.svg"
          title="Mover para cima"
          onClick={props.moverCima}
        />
        <img
          src="/down-arrow.svg"
          title="Mover para baixo"
          onClick={props.moverBaixo}
        />
      </Arrows>
      {!updateStateModal ? (
        <span className={taskState} onClick={clickUpdateState}></span>
      ) : (
        <SelectState ref={selectStateRef}>
          <div>
            <input type="radio" value="open" onClick={setState} />
            <span className="customRadio open"></span>
          </div>
          <div>
            <input type="radio" value="working" onClick={setState} />
            <span className="customRadio working"></span>
          </div>
          <div>
            <input type="radio" value="done" onClick={setState} />
            <span className="customRadio done"></span>
          </div>
        </SelectState>
      )}
      {!updateDesc ? (
        <h3>{taskDesc}</h3>
      ) : (
        <UpdateDescStyled onSubmit={handleUpdateDesc}>
          <Input type="text" defaultValue={taskDesc} name="desc" />
        </UpdateDescStyled>
      )}
      <TaskBtns>
        <button>
          <img
            src="/exclude-small.svg"
            alt="excluir tarefa"
            className="img-effect"
            title="Excluir Tarefa"
            onClick={excludeTask}
          />
        </button>
        <button>
          <img
            src="/upload-avatar.svg"
            alt="alterar tarefa"
            className="img-effect"
            title="Alterar Tarefa"
            onClick={updateTaskClick}
          />
        </button>
      </TaskBtns>
      {/* <TaskContent>
        
      </TaskContent> */}
    </TaskStyled>
  );
}
