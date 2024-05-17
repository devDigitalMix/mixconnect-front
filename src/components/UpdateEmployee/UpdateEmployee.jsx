/* eslint-disable react/prop-types */
import { UpdateEmployeeService } from "../../services/employeeService";
import { UpdateForm } from "./UpdateEmployeeStyled";

export function UpdateEmployee(props) {
  async function handleUpdate(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    try {
      await UpdateEmployeeService(data, props.id);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <UpdateForm onSubmit={handleUpdate} encType="multipart/form-data">
      <p onClick={props.click}>X</p>
      <div>
        <label htmlFor="name">Nome:</label>
        <input type="text" name="name" defaultValue={props.name} />
      </div>
      <div>
        <label htmlFor="email">email:</label>
        <input type="email" name="email" defaultValue={props.email} />
      </div>
      <div>
        <label htmlFor="role">Cargo:</label>
        <input type="text" name="role" defaultValue={props.role} />
      </div>
      <div>
        <label htmlFor="whatsapp">Whatsapp:</label>
        <input type="text" name="whatsapp" defaultValue={props.whats} />
      </div>
      <div>
        <label htmlFor="avatar">Foto de Perfil</label>
        <input type="file" name="avatar" />
      </div>
      <div>
        <label htmlFor="desc">Descrição:</label>
        <textarea name="desc" defaultValue={props.desc}></textarea>
      </div>
      <button type="submit">Manda</button>
    </UpdateForm>
  );
}
