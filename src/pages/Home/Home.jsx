/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  EmployeeBtns,
  EmployeeContainer,
  HomeBody,
  HomeHeader,
} from "./HomeStyled.jsx";
import {
  deleteEmployee,
  getAllEmployees,
} from "../../services/employeeService.js";
import { Card } from "../../components/Card/Card.jsx";
import { Button } from "../../components/Button/Button.jsx";
import { CreateEmployee } from "../../components/CreateEmployee/CreateEmployee.jsx";
import { UpdateEmployee } from "../../components/UpdateEmployee/UpdateEmployee.jsx";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [createEmployeeModal, setCreateEmployeeModal] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  async function getEmployees() {
    const response = await getAllEmployees();
    setEmployees(response.data.results);
  }

  function handleClickUpdate(employeeId) {
    setSelectedEmployeeId(employeeId);
  }

  async function handleClickDelete(employeeId) {
    await deleteEmployee(employeeId);
  }

  function handleClickCreate() {
    setCreateEmployeeModal(!createEmployeeModal);
  }

  useEffect(() => {
    getEmployees();
  }, []);

  return (
    <>
      <HomeHeader>
        <Button
          type="button"
          text="Novo Funcionário"
          click={handleClickCreate}
        ></Button>
      </HomeHeader>
      <HomeBody>
        {createEmployeeModal && <CreateEmployee />}
        {employees
          ? employees.map((item) => (
              <EmployeeContainer key={item.id}>
                <Card
                  name={item.name}
                  desc={item.desc}
                  email={item.email}
                  role={item.role}
                  whats={item.whatsapp}
                  imgSrc={item.avatar}
                />
                <EmployeeBtns>
                  <Button
                    type="button"
                    text="Alterar"
                    click={() => handleClickUpdate(item.id)}
                  ></Button>
                  <Button
                    type="button"
                    text="Excluir"
                    click={() => handleClickDelete(item.id)}
                  ></Button>
                </EmployeeBtns>
                {selectedEmployeeId === item.id && (
                  <UpdateEmployee
                    click={() => handleClickUpdate(null)}
                    id={item.id}
                    name={item.name}
                    desc={item.desc}
                    email={item.email}
                    role={item.role}
                    whats={item.whatsapp}
                    imgSrc={item.avatar}
                  />
                )}
              </EmployeeContainer>
            ))
          : null}
      </HomeBody>
    </>
  );
}
