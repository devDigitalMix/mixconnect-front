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
import { SkeletonCard } from "../../components/SkeletonCard/SkeletonCard.jsx";

export default function Employees() {
  const { user, setUser } = useContext(UserContext);
  const [employees, setEmployees] = useState([]);
  const [createEmployeeModal, setCreateEmployeeModal] = useState(false);
  const [search, setSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
  });

  async function onSearch(data) {
    setIsLoading(true);
    const { name } = data;

    const response = await getEmployeesByName(name);
    setEmployees(response.data.results);
    setSearch(true);
    setIsLoading(false);
    reset();
  }

  async function getEmployees() {
    const response = await getAllEmployees();
    setEmployees(response.data.results);
    setSearch(false);
    setIsLoading(false);
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
        {(user.level == "Líder" || user.level == "Admin") && (
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
            {isLoading && <div className="custom-loader"></div>}
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
        {employees.length > 0 ? (
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
          ))
        ) : (
          <SkeletonCard cards={8}></SkeletonCard>
        )}
      </EmployeeBody>
    </>
  );
}
