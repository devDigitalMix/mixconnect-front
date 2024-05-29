/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ErrorSpan, Header, Nav, NavMenu } from "./NavbarStyled";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../Button/Button";
// import { searchSchema } from "../../schemas/searchSchema";
import { userLogged } from "../../services/employeeService";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserContext } from "../../Context/UserContent";

export function Navbar() {
  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(searchSchema),
  // });
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  // function onSearch(data) {
  //   const { title } = data;
  //   navigate(`/search/${title}`);
  //   reset();
  // }
  async function findUserLogged() {
    try {
      const response = await userLogged();
      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  function signout() {
    Cookies.remove("token");
    setUser(undefined);
    navigate("/");
  }

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header>
        <div>
          <Nav>
            <Link to={"/home"}>
              <img src="/logo.svg" alt="MixConnect" />
            </Link>
            <NavMenu>
              <button>CLIENTES</button>
              <button>FUNCIONÁRIOS</button>
              <button>PLAYBOOK</button>
              <button>EVENTOS</button>
              <button>LOGINS</button>
            </NavMenu>
            <Link to={"/home/profile"}>
              <img src={user.avatar} id="perfil-img" />
            </Link>
          </Nav>
        </div>
      </Header>
      <Outlet />
    </>
  );
}
