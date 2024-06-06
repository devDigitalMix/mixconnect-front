/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  deleteEmployee,
  getAllEmployees,
  userLogged,
} from "../../services/employeeService.js";
import { Card } from "../../components/Card/Card.jsx";
import { CreateEmployee } from "../../components/CreateEmployee/CreateEmployee.jsx";
import {
  EmployeeBody,
  EmployeeContainer,
  EmployeesHeader,
} from "./EmployeesStyled.jsx";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input/Input.jsx";
import { UserContext } from "../../Context/UserContent.jsx";

export default function Employees() {
  const { user, setUser } = useContext(UserContext);
  const [employees, setEmployees] = useState([]);
  const [createEmployeeModal, setCreateEmployeeModal] = useState(false);

  async function getEmployees() {
    const response = await getAllEmployees();
    setEmployees(response.data.results);
  }

  function handleClickCreate() {
    setCreateEmployeeModal(!createEmployeeModal);
  }

  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEmployees();
    if (Cookies.get("token")) findUserLogged();
  }, []);

  return (
    <>
      <EmployeesHeader>
        {(user.level == "lider" || user.level == "adm") && (
          <img
            src="/mais.svg"
            alt="Novo funcionário"
            onClick={handleClickCreate}
          />
        )}
        <Input type="text" placeholder="Procurar Funcionário" />
      </EmployeesHeader>
      {createEmployeeModal && (
        <CreateEmployee
          func={handleClickCreate}
          updateEmployees={getEmployees} // Passe a função para atualizar os funcionários
        />
      )}
      <EmployeeBody>
        {employees
          ? employees.map((item) => (
              <Link key={item.id} to={"/home/employee/" + item.id}>
                <EmployeeContainer>
                  <Card
                    name={item.name}
                    desc={item.desc}
                    email={item.email}
                    role={item.role}
                    whats={item.whatsapp}
                    imgSrc={item.avatar}
                  />
                </EmployeeContainer>
              </Link>
            ))
          : null}
      </EmployeeBody>
    </>
  );
}
