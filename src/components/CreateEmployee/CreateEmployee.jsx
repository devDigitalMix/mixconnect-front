import { CreateEmployeeService } from "../../services/employeeService";
import { CreateEmployeeStyled } from "./CreateEmployeeStyled";

/* eslint-disable no-unused-vars */
export function CreateEmployee() {
  async function handleCreate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    try {
      await CreateEmployeeService(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <CreateEmployeeStyled>
      <form onSubmit={handleCreate} encType="multipart/form-data">
        <div>
          <label htmlFor="name">Nome:</label>
          <input type="text" name="name" />
        </div>
        <div>
          <label htmlFor="email">email:</label>
          <input type="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input type="password" name="password" />
        </div>
        <div>
          <label htmlFor="role">Cargo:</label>
          <input type="text" name="role" />
        </div>
        <div>
          <label htmlFor="whatsapp">Whatsapp:</label>
          <input type="text" name="whatsapp" />
        </div>
        <div>
          <div>
            <label htmlFor="level">Nivel:</label>
            <input type="text" name="level" />
          </div>
          <label htmlFor="desc">Descrição:</label>
          <textarea name="desc"></textarea>
        </div>
        <button type="submit">Manda</button>
      </form>
    </CreateEmployeeStyled>
  );
}
