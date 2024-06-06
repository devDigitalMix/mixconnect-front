/* eslint-disable react/prop-types */
import { useState } from "react";
import { createEmployeeService } from "../../services/employeeService";
import { Input } from "../Input/Input";
import { Label } from "../Label/Label";
import {
  ContainCreate,
  CreateEmployeeStyled,
  CreateForm,
} from "./CreateEmployeeStyled";
import { ErrorSpan } from "../ErrorSpan/ErrorSpan";

export function CreateEmployee(props) {
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");

  async function handleCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Verificação dos campos necessários
    const requiredFields = [
      "name",
      "role",
      "email",
      "password",
      "whatsapp",
      "desc",
    ];
    for (let field of requiredFields) {
      if (!data[field] || data[field].trim() === "") {
        setError(true);
        setErrorText(`Por favor, preencha o campo ${field} corretamente.`);
        return;
      }
    }

    try {
      await createEmployeeService(data);

      // Chamando a função passada via props após a criação bem-sucedida
      props.func();
      props.updateEmployees();

      if (error) {
        setError(false);
      }
    } catch (error) {
      setError(true);
      setErrorText(error.response.data);
    }
  }

  return (
    <CreateEmployeeStyled>
      <CreateForm onSubmit={handleCreate} encType="multipart/form-data">
        <img src="/cancel.svg" alt="cancelar" onClick={props.func} />
        {error && <ErrorSpan text={errorText} />}
        <ContainCreate>
          <div>
            <Label htmlFor="name" text="Nome:" />
            <Input type="text" name="name" required={true} />
          </div>
          <div>
            <Label htmlFor="level" text="Nível:" />
            <select name="level">
              <option value="Base">Base</option>
              <option value="Líder">Líder</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div>
            <Label htmlFor="role" text="Cargo:" />
            <Input type="text" name="role" required={true} />
          </div>
          <div>
            <Label htmlFor="email" text="E-mail:" />
            <Input type="email" name="email" required={true} />
          </div>
          <div>
            <Label htmlFor="password" text="Senha:" />
            <Input
              type="password"
              name="password"
              required={true}
              autoComplete="new-password"
            />
          </div>
          <div>
            <Label htmlFor="whatsapp" text="Whatsapp:" />
            <Input type="text" name="whatsapp" required={true} />
          </div>
          <div>
            <Label htmlFor="birthday" text="Aniversário:" />
            <Input type="date" name="birthday" />
          </div>
          <div>
            <Label htmlFor="desc" text="Descrição:" />
            <textarea name="desc" required={true}></textarea>
          </div>
        </ContainCreate>
        <button type="submit" className="btn">
          Confirmar
        </button>
      </CreateForm>
    </CreateEmployeeStyled>
  );
}
