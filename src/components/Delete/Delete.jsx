/* eslint-disable react/prop-types */
import { useState } from "react";
import { deleteEmployee } from "../../services/employeeService";
import { Input } from "../Input/Input";
import { DeleteStyled } from "./DeleteStyled";
import { useNavigate } from "react-router-dom";

export function Delete(props) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  async function handleDelete(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    try {
      if (data.text == `excluir-${props.name}`) {
        await deleteEmployee(props.id);
        setShowModal(true);
        setTimeout(() => {
          setShowModal(false);
          navigate("/home/employees");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <DeleteStyled onSubmit={handleDelete}>
      {!showModal ? (
        <>
          <img src="/cancel.svg" alt="cancelar" onClick={props.func} />
          <h2>
            Tem certeza que deseja excluir o funcionário{" "}
            <strong>{props.name}</strong>?
          </h2>
          <h3>
            Se sim, digite <i>excluir-{props.name}</i>
          </h3>
          <Input type="text" name="text" />
          <button type="submit" className="btn">
            Excluir
          </button>
        </>
      ) : (
        <>
          <h2>
            <strong>{props.name}</strong> excluído com sucesso!
          </h2>
        </>
      )}
    </DeleteStyled>
  );
}
