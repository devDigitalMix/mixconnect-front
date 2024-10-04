/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  deleteEmployee,
  getAllEmployees,
  getEmployeesByName,
  userLogged,
} from "../../services/employeeService.js";
import { Card } from "../../components/Card/Card.jsx";
import { CreateEmployee } from "../../components/CreateEmployee/CreateEmployee.jsx";
import {
  EmployeeBody,
  EmployeeContainer,
  EmployeesHeader,
  Felipe,
} from "./EmployeesStyled.jsx";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input/Input.jsx";
import { UserContext } from "../../Context/UserContent.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputNav } from "../../components/Navbar/NavbarStyled.jsx";
import { searchSchema } from "../../schemas/searchSchema.js";

export default function Employees() {
  const { user, setUser } = useContext(UserContext);
  const [employees, setEmployees] = useState([]);
  const [createEmployeeModal, setCreateEmployeeModal] = useState(false);
  const [search, setSearch] = useState(false);
  const [felipe, setFelipe] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
  });

  async function onSearch(data) {
    const { name } = data;
    const validNames = ["fe", "fel", "feli", "felip", "felipe"];

    if (validNames.includes(name.toLowerCase())) {
      setFelipe(true);
    } else {
      setFelipe(false);
    }
    const response = await getEmployeesByName(name);
    setEmployees(response.data.results);
    setSearch(true);
    reset();
  }

  async function getEmployees() {
    const response = await getAllEmployees();
    setEmployees(response.data.results);
    setSearch(false);
    setFelipe(false);
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
        {felipe && (
          <Felipe>
            <h2>O Felipe é calvo</h2>
            <img src="/felipe.jpg" />
          </Felipe>
        )}
        {(user.level == "Líder" || user.level == "adm") && (
          <img
            src="/mais.svg"
            alt="Novo funcionário"
            title="Novo funcionário"
            className="img-effect"
            onClick={handleClickCreate}
          />
        )}
        <form onSubmit={handleSubmit(onSearch)}>
          {search && (
            <img
              src="/no-filter.svg"
              alt="desfazer filtro"
              title="Desfazer Filtro"
              className="img-effect"
              onClick={getEmployees}
            />
          )}
          <InputNav className="input-search-space">
            <button type="submit">
              <i className="bi bi-search"></i>
            </button>
            <input
              {...register("name")}
              type="text"
              placeholder="Procurar Funcionário"
            />
          </InputNav>
        </form>
      </EmployeesHeader>
      {createEmployeeModal && (
        <CreateEmployee
          func={handleClickCreate}
          updateEmployees={getEmployees}
        />
      )}
      <EmployeeBody>
        {employees &&
          employees.map((item) => (
            <Link key={item.id} to={"/home/employee/" + item.id}>
              <EmployeeContainer>
                <Card
                  name={item.name}
                  desc={item.desc}
                  role={item.role}
                  imgSrc={item.avatar}
                />
              </EmployeeContainer>
            </Link>
          ))}
      </EmployeeBody>
    </>
  );
}
