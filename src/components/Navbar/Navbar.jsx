/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ErrorSpan, Header, Nav, NavMenu, PerfilMenu } from "./NavbarStyled";
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
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const [activeButton, setActiveButton] = useState(null);

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

  function handleButtonClick(buttonName) {
    setActiveButton(buttonName);
  }

  useEffect(() => {
    if (Cookies.get("token")) findUserLogged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {user && (
        <Header>
          <div>
            <Nav>
              <Link to={"/home"} onClick={() => handleButtonClick("")}>
                <img src="/logo.svg" alt="MixConnect" draggable="false" />
              </Link>
              <NavMenu>
                <Link to={"/home/clients"}>
                  <button
                    className={activeButton === "clients" ? "active" : ""}
                    onClick={() => handleButtonClick("clients")}
                  >
                    CLIENTES
                  </button>
                </Link>
                <Link to={"/home/employees"}>
                  <button
                    className={activeButton === "employees" ? "active" : ""}
                    onClick={() => handleButtonClick("employees")}
                  >
                    FUNCIONÁRIOS
                  </button>
                </Link>
                {/* <button
                className={activeButton === "playbook" ? "active" : ""}
                onClick={() => handleButtonClick("playbook")}
              >
                PLAYBOOK
              </button> */}
                {(user.level == "Líder" || user.level == "adm") && (
                  <Link to={"/home/plans"}>
                    <button
                      className={activeButton === "plans" ? "active" : ""}
                      onClick={() => handleButtonClick("plans")}
                    >
                      PLANOS
                    </button>
                  </Link>
                )}
                {(user.level == "Líder" || user.level == "adm") && (
                  <Link to={"/home/acessos"}>
                    <button
                      className={activeButton === "access" ? "active" : ""}
                      onClick={() => handleButtonClick("access")}
                    >
                      ACESSOS
                    </button>
                  </Link>
                )}
              </NavMenu>
              <PerfilMenu>
                <Link
                  to={"/home/profile"}
                  onClick={() => handleButtonClick("")}
                >
                  <img src={user.avatar} id="perfil-img" draggable="false" />
                </Link>
                <button onClick={signout}>
                  <img src="/logout.svg" alt="Sair" title="Sair" />
                </button>
              </PerfilMenu>
            </Nav>
          </div>
        </Header>
      )}
      <Outlet />
    </>
  );
}
